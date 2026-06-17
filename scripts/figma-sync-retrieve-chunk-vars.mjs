#!/usr/bin/env node
/** Emit use_figma code returning only variables array for one stored chunk. */
const [collection, start, end, chunkIndex] = process.argv.slice(2)
const key = `${collection}-${start}-${end}`
const code = `
const NS = 'uds.sync';
const KEY = ${JSON.stringify(key)};
const INDEX = ${Number(chunkIndex)};
const metaJson = figma.root.getSharedPluginData(NS, KEY + '-meta');
if (!metaJson) return { error: 'missing meta', key: KEY };
const meta = JSON.parse(metaJson);
const varsJson = figma.root.getSharedPluginData(NS, KEY + '-chunk-' + INDEX);
if (!varsJson) return { error: 'missing chunk', key: KEY, chunk: INDEX };
return JSON.parse(varsJson);
`
process.stdout.write(code)
