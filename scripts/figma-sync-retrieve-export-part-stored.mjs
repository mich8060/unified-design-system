#!/usr/bin/env node
/** Emit code to retrieve one stored export part (text only). */
const [collection, start, end, partIndex] = process.argv.slice(2)
const key = `${collection}-${start}-${end}`
const code = `
const NS = 'uds.sync';
const KEY = ${JSON.stringify(key)};
const PART = ${Number(partIndex)};
const text = figma.root.getSharedPluginData(NS, KEY + '-export-' + PART);
const metaJson = figma.root.getSharedPluginData(NS, KEY + '-export-meta');
if (!text || !metaJson) return { error: 'missing export part', key: KEY, part: PART };
const meta = JSON.parse(metaJson);
return { part: PART, parts: meta.parts, len: meta.len, textLen: text.length, text };
`
process.stdout.write(code)
