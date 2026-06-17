#!/usr/bin/env node
/**
 * Emits use_figma code to retrieve one chunk of a stored export batch.
 * Usage: node scripts/figma-sync-retrieve-chunk.mjs Colors 66 132 0
 */
const [collection, start, end, chunkIndex] = process.argv.slice(2)
if (!collection || start == null || end == null || chunkIndex == null) {
  console.error('Usage: node scripts/figma-sync-retrieve-chunk.mjs <Collection> <start> <end> <chunkIndex> [chunkSize]')
  process.exit(1)
}
const chunkSize = Number(process.argv[6] ?? 15)
const key = `${collection}-${start}-${end}`
const code = `
const NS = 'uds.sync';
const KEY = ${JSON.stringify(key)};
const INDEX = ${Number(chunkIndex)};
const CHUNK = ${chunkSize};
const metaJson = figma.root.getSharedPluginData(NS, KEY + '-meta');
if (!metaJson) return { error: 'missing stored export meta', key: KEY };
const meta = JSON.parse(metaJson);
if (INDEX >= meta.parts) return { done: true, key: KEY, total: meta.vars, chunk: INDEX, parts: meta.parts };
const varsJson = figma.root.getSharedPluginData(NS, KEY + '-chunk-' + INDEX);
if (!varsJson) return { error: 'missing chunk', key: KEY, chunk: INDEX };
return {
  key: KEY,
  chunk: INDEX,
  total: meta.vars,
  parts: meta.parts,
  start: INDEX * CHUNK,
  end: Math.min((INDEX + 1) * CHUNK, meta.vars),
  collection: meta.collection,
  modeEntries: meta.modeEntries,
  range: meta.range,
  batchTotal: meta.total,
  variables: JSON.parse(varsJson),
};
`
process.stdout.write(code)
