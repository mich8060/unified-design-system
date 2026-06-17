#!/usr/bin/env node
/**
 * Emits use_figma code to retrieve one JSON slice for local assembly.
 * Usage: node scripts/figma-sync-retrieve-json-slice.mjs Colors 66 132 0
 */
const [collection, start, end, sliceIndex] = process.argv.slice(2)
const key = `${collection}-${start}-${end}`
const code = `
const NS = 'uds.sync';
const KEY = ${JSON.stringify(key)};
const INDEX = ${Number(sliceIndex)};
const metaJson = figma.root.getSharedPluginData(NS, KEY + '-json-meta');
if (!metaJson) return { error: 'missing json meta', key: KEY };
const meta = JSON.parse(metaJson);
if (INDEX >= meta.parts) return { done: true, key: KEY, parts: meta.parts, len: meta.len };
const slice = figma.root.getSharedPluginData(NS, KEY + '-json-' + INDEX);
if (!slice) return { error: 'missing json slice', key: KEY, index: INDEX };
return { key: KEY, index: INDEX, parts: meta.parts, len: meta.len, slice };
`
process.stdout.write(code)
