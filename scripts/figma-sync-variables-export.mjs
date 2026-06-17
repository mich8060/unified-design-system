/**
 * Emits use_figma export script for one collection (compact payload).
 * Usage: node scripts/figma-sync-variables-export.mjs Colors [start] [end]
 */
const collectionName = process.argv[2]
const sliceStart = process.argv[3] != null ? Number(process.argv[3]) : null
const sliceEnd = process.argv[4] != null ? Number(process.argv[4]) : null
if (!collectionName) {
  console.error('Usage: node scripts/figma-sync-variables-export.mjs <CollectionName> [start] [end]')
  process.exit(1)
}

const code = `
const TARGET = ${JSON.stringify(collectionName)};

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
${sliceStart != null && sliceEnd != null ? `
const sliceStart = ${sliceStart};
const sliceEnd = ${sliceEnd};
const slice = vars.slice(sliceStart, sliceEnd);
` : 'const slice = vars;'}
return {
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
  ${sliceStart != null && sliceEnd != null ? 'range: [sliceStart, sliceEnd],\n  total: vars.length,' : ''}
  variables: slice.map((v) => {
    const valuesByMode = {};
    for (const entry of modeEntries) {
      const raw = v.valuesByMode[entry.modeId];
      if (raw != null) valuesByMode[entry.collection + '/' + entry.name] = serializeValue(raw, varById);
    }
    return [v.name, v.resolvedType, v.scopes, v.hiddenFromPublishing, v.codeSyntax, valuesByMode];
  }),
};
`

process.stdout.write(code)
