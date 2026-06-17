#!/usr/bin/env node
/** Retrieve assembled export JSON in fixed-size parts from stored chunks. */
const [collection, start, end, partIndex, partSize] = process.argv.slice(2)
const key = `${collection}-${start}-${end}`
const part = Number(partIndex)
const size = Number(partSize ?? 2000)
const code = `
const NS = 'uds.sync';
const KEY = ${JSON.stringify(key)};
const PART = ${part};
const SIZE = ${size};
const metaJson = figma.root.getSharedPluginData(NS, KEY + '-meta');
if (!metaJson) return { error: 'missing meta', key: KEY };
const meta = JSON.parse(metaJson);
const variables = [];
for (let i = 0; i < meta.parts; i++) {
  variables.push(...JSON.parse(figma.root.getSharedPluginData(NS, KEY + '-chunk-' + i)));
}
const payload = {
  collection: meta.collection,
  modeEntries: meta.modeEntries,
  range: meta.range,
  total: meta.total,
  variables,
};
const json = JSON.stringify(payload);
const totalParts = Math.ceil(json.length / SIZE);
if (PART >= totalParts) return { done: true, key: KEY, totalParts, len: json.length };
return { key: KEY, part: PART, totalParts, len: json.length, text: json.slice(PART * SIZE, (PART + 1) * SIZE) };
`
process.stdout.write(code)
