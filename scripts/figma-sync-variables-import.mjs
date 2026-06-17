/**
 * Emits use_figma import script body from exported collection JSON file.
 * Usage: node scripts/figma-sync-variables-import.mjs .tmp/figma-export/Colors.json
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const jsonPath = process.argv[2]
if (!jsonPath) {
  console.error('Usage: node scripts/figma-sync-variables-import.mjs <export.json>')
  process.exit(1)
}

const payload = JSON.parse(fs.readFileSync(path.resolve(jsonPath), 'utf8'))

const code = `
const PAYLOAD = ${JSON.stringify(payload)};

function resolveValue(raw, varKey) {
  if (!raw) return null;
  if (raw[0] === 'C') return { r: raw[1], g: raw[2], b: raw[3], a: raw[4] };
  if (raw[0] === 'P') return raw[1];
  if (raw[0] === 'A') {
    const [, collectionName, name] = raw;
    if (!collectionName || !name) return null;
    const key = collectionName + '::' + name;
    const target = varKey.get(key);
    if (!target) return null;
    return figma.variables.createVariableAlias(target);
  }
  return null;
}

async function findCollection(name) {
  const all = await figma.variables.getLocalVariableCollectionsAsync();
  return all.find((c) => c.name === name) ?? null;
}

async function ensureCollection(meta, parentColl) {
  let coll = await findCollection(meta.name);
  const modeIds = {};

  if (meta.isExtension && parentColl) {
    if (!coll) coll = parentColl.extend(meta.name);
    for (const m of coll.modes) modeIds[m.name] = m.modeId;
    return { coll, modeIds };
  }

  if (!coll) {
    coll = figma.variables.createVariableCollection(meta.name);
    coll.renameMode(coll.modes[0].modeId, meta.modes[0]);
    modeIds[meta.modes[0]] = coll.modes[0].modeId;
    for (let i = 1; i < meta.modes.length; i++) {
      modeIds[meta.modes[i]] = coll.addMode(meta.modes[i]);
    }
  } else {
    for (const m of coll.modes) modeIds[m.name] = m.modeId;
    for (const name of meta.modes) {
      if (!modeIds[name]) modeIds[name] = coll.addMode(name);
    }
  }

  return { coll, modeIds };
}

const varKey = new Map();
for (const v of await figma.variables.getLocalVariablesAsync()) {
  const coll = (await figma.variables.getLocalVariableCollectionsAsync()).find((c) => c.id === v.variableCollectionId);
  if (coll) varKey.set(coll.name + '::' + v.name, v);
}

let parentColl = null;
if (PAYLOAD.collection.parentCollectionName) {
  parentColl = await findCollection(PAYLOAD.collection.parentCollectionName);
  if (!parentColl) return { error: 'parent collection missing', parent: PAYLOAD.collection.parentCollectionName };
}

const { coll, modeIds: baseModeIds } = await ensureCollection(PAYLOAD.collection, parentColl);

const extensionModeIds = {};
if (PAYLOAD.collection.extensions?.length && !PAYLOAD.collection.isExtension) {
  for (const extName of PAYLOAD.collection.extensions) {
    let ext = await findCollection(extName);
    if (!ext) ext = coll.extend(extName);
    extensionModeIds[extName] = {};
    for (const m of ext.modes) extensionModeIds[extName][m.name] = m.modeId;
  }
}

function modeIdForKey(key) {
  const [collectionName, modeName] = key.split('/');
  if (collectionName === PAYLOAD.collection.name) return baseModeIds[modeName];
  const extModes = extensionModeIds[collectionName];
  return extModes ? extModes[modeName] : null;
}

const created = [];
const updated = [];
for (const [name, resolvedType, scopes, hiddenFromPublishing, codeSyntax, valuesByMode] of PAYLOAD.variables) {
  const key = PAYLOAD.collection.name + '::' + name;
  let v = varKey.get(key);
  if (!v) {
    v = figma.variables.createVariable(name, coll, resolvedType);
    varKey.set(key, v);
    created.push(name);
  } else {
    updated.push(name);
  }
  v.scopes = scopes;
  v.hiddenFromPublishing = hiddenFromPublishing;
  if (codeSyntax) {
    for (const [platform, syntax] of Object.entries(codeSyntax)) {
      v.setVariableCodeSyntax(platform, syntax);
    }
  }
  for (const [modeKey, raw] of Object.entries(valuesByMode)) {
    const modeId = modeIdForKey(modeKey);
    if (!modeId) continue;
    const val = resolveValue(raw, varKey);
    if (val != null) v.setValueForMode(modeId, val);
  }
}

return {
  collection: PAYLOAD.collection.name,
  collectionId: coll.id,
  created: created.length,
  updated: updated.length,
  total: PAYLOAD.variables.length,
};
`

process.stdout.write(code)
