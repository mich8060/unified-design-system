/**
 * Emits a use_figma script body to set variable.scopes on all local variables.
 * Scopes match the Figma file manual configuration — see scripts/lib/figma-variable-scopes.snippet.js
 *
 *   node scripts/apply-figma-variable-scopes.mjs
 */
import { FIGMA_SCOPES_SNIPPET } from './lib/figma-variable-scopes.mjs'

const BODY = `${FIGMA_SCOPES_SNIPPET}
function scopesEqual(a, b) {
  if (a.length !== b.length) return false;
  const sa = [...a].sort();
  const sb = [...b].sort();
  return sa.every((x, i) => x === sb[i]);
}

const collections = await figma.variables.getLocalVariableCollectionsAsync();
const collById = new Map(collections.map((c) => [c.id, c]));
const allVars = await figma.variables.getLocalVariablesAsync();

const updated = [];
const unchanged = [];
const byTargetScope = {};

for (const v of allVars) {
  const coll = collById.get(v.variableCollectionId);
  const collectionName = coll?.name ?? '';
  const target = scopesForFigmaVariable(v.name, v.resolvedType, collectionName);
  const key = JSON.stringify(target);
  byTargetScope[key] = (byTargetScope[key] ?? 0) + 1;

  if (scopesEqual(v.scopes, target)) {
    unchanged.push(v.name);
    continue;
  }

  v.scopes = target;
  updated.push({ name: v.name, type: v.resolvedType, collection: collectionName, scopes: target });
}

return {
  total: allVars.length,
  updatedCount: updated.length,
  unchangedCount: unchanged.length,
  scopeDistribution: byTargetScope,
  sampleUpdated: updated.slice(0, 40),
};
`

process.stdout.write(BODY)
