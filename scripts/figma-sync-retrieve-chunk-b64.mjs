#!/usr/bin/env node
/** Emit use_figma code returning base64-encoded vars for one stored chunk. */
const [collection, start, end, chunkIndex] = process.argv.slice(2)
const key = `${collection}-${start}-${end}`
const code = `
const NS = 'uds.sync';
const KEY = ${JSON.stringify(key)};
const INDEX = ${Number(chunkIndex)};
const varsJson = figma.root.getSharedPluginData(NS, KEY + '-chunk-' + INDEX);
if (!varsJson) return { error: 'missing chunk', key: KEY, chunk: INDEX };
const b64 = btoa(unescape(encodeURIComponent(varsJson)));
return { key: KEY, chunk: INDEX, len: varsJson.length, b64len: b64.length, b64 };
`
process.stdout.write(code)
