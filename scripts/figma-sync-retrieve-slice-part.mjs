#!/usr/bin/env node
/**
 * Retrieve a substring of a stored JSON slice (avoids MCP truncation).
 * Usage: node scripts/figma-sync-retrieve-slice-part.mjs Colors 66 132 0 0 800
 */
const [collection, start, end, sliceIndex, offset, length] = process.argv.slice(2)
const key = `${collection}-${start}-${end}`
const off = Number(offset)
const len = Number(length ?? 800)
const code = `
const NS = 'uds.sync';
const KEY = ${JSON.stringify(key)};
const INDEX = ${Number(sliceIndex)};
const OFF = ${off};
const LEN = ${len};
const metaJson = figma.root.getSharedPluginData(NS, KEY + '-json-meta');
if (!metaJson) return { error: 'missing json meta', key: KEY };
const meta = JSON.parse(metaJson);
const slice = figma.root.getSharedPluginData(NS, KEY + '-json-' + INDEX);
if (!slice) return { error: 'missing json slice', key: KEY, index: INDEX };
return {
  key: KEY,
  index: INDEX,
  off: OFF,
  total: slice.length,
  parts: meta.parts,
  text: slice.slice(OFF, OFF + LEN),
};
`
process.stdout.write(code)
