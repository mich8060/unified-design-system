#!/usr/bin/env node
/**
 * Emits use_figma code to assemble all chunks from stored export on source file.
 * Usage: node scripts/figma-sync-retrieve-assembled.mjs Colors 66 132
 */
const [collection, start, end] = process.argv.slice(2)
if (!collection || start == null || end == null) {
  console.error('Usage: node scripts/figma-sync-retrieve-assembled.mjs <Collection> <start> <end>')
  process.exit(1)
}
const key = `${collection}-${start}-${end}`
const code = `
const NS = 'uds.sync';
const KEY = ${JSON.stringify(key)};
const metaJson = figma.root.getSharedPluginData(NS, KEY + '-meta');
if (!metaJson) return { error: 'missing stored export meta', key: KEY };
const meta = JSON.parse(metaJson);
const variables = [];
for (let i = 0; i < meta.parts; i++) {
  const part = figma.root.getSharedPluginData(NS, KEY + '-chunk-' + i);
  if (!part) return { error: 'missing chunk', key: KEY, chunk: i };
  variables.push(...JSON.parse(part));
}
return {
  collection: meta.collection,
  modeEntries: meta.modeEntries,
  range: meta.range,
  total: meta.total,
  variables,
};
`
process.stdout.write(code)
