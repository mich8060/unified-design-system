#!/usr/bin/env node
/**
 * Export batch via clientStorage chunks to avoid MCP truncation.
 * Usage: node scripts/figma-sync-variables-export-chunked.mjs Colors 0 66 [store|retrieve] [chunkIndex]
 */
import fs from 'node:fs'

const [collectionName, start, endArg, mode = 'store', chunkIndex = '0'] = process.argv.slice(2)
if (!collectionName) {
  console.error('Usage: export-chunked.mjs <Collection> <start> <end> [store|retrieve] [chunkIndex]')
  process.exit(1)
}

const startN = Number(start)
const endN = Number(endArg)
const chunkN = Number(chunkIndex)
const STORAGE_PREFIX = `uds-var-export-${collectionName}-${startN}-${endN}`

if (mode === 'store') {
  const code = `
const TARGET = ${JSON.stringify(collectionName)};
const STORAGE_PREFIX = ${JSON.stringify(STORAGE_PREFIX)};
const CHUNK_SIZE = 12000;

function serializeValue(val, varById) {
  if (val == null) return null;
  if (typeof val === 'object' && val.type === 'VARIABLE_ALIAS') {
    const t = varById.get(val.id);
    return t ? ['A', t.collectionName, t.name] : ['A', null, val.id];
  }
  if (typeof val === 'object' && 'r' in val) return ['C', val.r, val.g, val.b, val.a ?? 1];
  return ['P', val];
}

const collections = await figma.variables.getLocalVariableCollectionsAsync();
const allVars = await figma.variables.getLocalVariablesAsync();
const coll = collections.find((c) => c.name === TARGET);
if (!coll) return { error: 'collection not found', name: TARGET };

const collById = new Map(collections.map((c) => [c.id, c]));
const varById = new Map();
for (const v of allVars) {
  const c = collById.get(v.variableCollectionId);
  varById.set(v.id, { name: v.name, collectionName: c?.name ?? null });
}

const extColls = collections.filter((c) => c.isExtension && c.parentVariableCollectionId === coll.id);
const modeEntries = coll.modes.map((m) => ({ collection: coll.name, name: m.name, modeId: m.modeId }));
for (const ext of extColls) {
  for (const m of ext.modes) modeEntries.push({ collection: ext.name, name: m.name, modeId: m.modeId });
}

const vars = allVars.filter((v) => v.variableCollectionId === coll.id);
const slice = vars.slice(${startN}, ${endN});
const payload = {
  collection: {
    name: coll.name,
    modes: coll.modes.map((m) => m.name),
    hiddenFromPublishing: coll.hiddenFromPublishing,
    isExtension: coll.isExtension ?? false,
    parentCollectionName: coll.parentVariableCollectionId
      ? collections.find((c) => c.id === coll.parentVariableCollectionId)?.name ?? null
      : null,
    extensions: extColls.map((e) => e.name),
  },
  modeEntries,
  range: [${startN}, ${endN}],
  total: vars.length,
  variables: slice.map((v) => {
    const valuesByMode = {};
    for (const entry of modeEntries) {
      const raw = v.valuesByMode[entry.modeId];
      if (raw != null) valuesByMode[entry.collection + '/' + entry.name] = serializeValue(raw, varById);
    }
    return [v.name, v.resolvedType, v.scopes, v.hiddenFromPublishing, v.codeSyntax, valuesByMode];
  }),
};

const json = JSON.stringify(payload);
const parts = Math.ceil(json.length / CHUNK_SIZE) || 1;
for (let i = 0; i < parts; i++) {
  await figma.clientStorage.setAsync(STORAGE_PREFIX + '-' + i, json.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE));
}
await figma.clientStorage.setAsync(STORAGE_PREFIX + '-meta', JSON.stringify({ parts, vars: payload.variables.length, range: payload.range, collection: payload.collection.name }));
return { stored: true, parts, vars: payload.variables.length, range: payload.range, collection: payload.collection.name };
`
  process.stdout.write(code)
} else if (mode === 'retrieve') {
  const code = `
const STORAGE_PREFIX = ${JSON.stringify(STORAGE_PREFIX)};
const chunkIndex = ${chunkN};
const metaRaw = await figma.clientStorage.getAsync(STORAGE_PREFIX + '-meta');
if (!metaRaw) return { error: 'no meta' };
const meta = JSON.parse(metaRaw);
const chunk = await figma.clientStorage.getAsync(STORAGE_PREFIX + '-' + chunkIndex);
return { chunkIndex, parts: meta.parts, chunk, meta };
`
  process.stdout.write(code)
} else if (mode === 'assemble') {
  // local: assemble chunks from files and save export JSON
  const metaFile = process.argv[5]
  const meta = JSON.parse(fs.readFileSync(metaFile, 'utf8'))
  let json = ''
  for (let i = 0; i < meta.parts; i++) {
    const chunkFile = process.argv[6 + i]
    const { chunk } = JSON.parse(fs.readFileSync(chunkFile, 'utf8'))
    json += chunk
  }
  const payload = JSON.parse(json)
  const out = `.tmp/figma-export/${collectionName}-${startN}-${endN}.json`
  fs.mkdirSync('.tmp/figma-export', { recursive: true })
  fs.writeFileSync(out, JSON.stringify(payload, null, 2))
  console.log(JSON.stringify({ file: out, vars: payload.variables?.length ?? 0 }))
} else {
  console.error('Unknown mode:', mode)
  process.exit(1)
}
