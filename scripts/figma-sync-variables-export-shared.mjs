#!/usr/bin/env node
/**
 * Emit use_figma: export batch into sharedPluginData chunks.
 * Usage: node scripts/figma-sync-variables-export-shared.mjs Colors 0 66 store
 *        node scripts/figma-sync-variables-export-shared.mjs Colors 0 66 retrieve 0
 */
const [collectionName, start, endArg, mode = 'store', chunkIndex = '0'] = process.argv.slice(2)
const startN = Number(start)
const endN = Number(endArg)
const chunkN = Number(chunkIndex)
const NS = 'udsVarSync'
const PREFIX = `${collectionName}-${startN}-${endN}`

if (mode === 'store') {
  console.log(`
const TARGET = ${JSON.stringify(collectionName)};
const NS = ${JSON.stringify(NS)};
const PREFIX = ${JSON.stringify(PREFIX)};
const CHUNK = 8000;

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
const parts = Math.ceil(json.length / CHUNK) || 1;
for (let i = 0; i < parts; i++) {
  figma.root.setSharedPluginData(NS, PREFIX + '-chunk-' + i, json.slice(i * CHUNK, (i + 1) * CHUNK));
}
figma.root.setSharedPluginData(NS, PREFIX + '-meta', JSON.stringify({ parts, vars: payload.variables.length, range: payload.range, collection: payload.collection.name }));
return { stored: true, parts, vars: payload.variables.length, range: payload.range, collection: payload.collection.name };
`)
} else if (mode === 'retrieve') {
  console.log(`
const NS = ${JSON.stringify(NS)};
const PREFIX = ${JSON.stringify(PREFIX)};
const chunkIndex = ${chunkN};
const metaRaw = figma.root.getSharedPluginData(NS, PREFIX + '-meta');
if (!metaRaw) return { error: 'no meta' };
const meta = JSON.parse(metaRaw);
const chunk = figma.root.getSharedPluginData(NS, PREFIX + '-chunk-' + chunkIndex);
return { chunkIndex, parts: meta.parts, chunk, meta };
`)
} else if (mode === 'clear') {
  console.log(`
const NS = ${JSON.stringify(NS)};
const PREFIX = ${JSON.stringify(PREFIX)};
const metaRaw = figma.root.getSharedPluginData(NS, PREFIX + '-meta');
if (metaRaw) {
  const meta = JSON.parse(metaRaw);
  for (let i = 0; i < meta.parts; i++) figma.root.setSharedPluginData(NS, PREFIX + '-chunk-' + i, '');
  figma.root.setSharedPluginData(NS, PREFIX + '-meta', '');
}
return { cleared: true };
`)
} else {
  console.error('mode must be store|retrieve|clear')
  process.exit(1)
}
