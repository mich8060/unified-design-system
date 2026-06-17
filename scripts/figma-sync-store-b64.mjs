#!/usr/bin/env node
/** Emit use_figma code to store b64-encoded chunks from stored export. */
const [collection, start, end] = process.argv.slice(2)
const key = `${collection}-${start}-${end}`
const code = `
const NS = 'uds.sync';
const KEY = ${JSON.stringify(key)};
const metaJson = figma.root.getSharedPluginData(NS, KEY + '-meta');
if (!metaJson) return { error: 'no meta', key: KEY };
const meta = JSON.parse(metaJson);
for (let i = 0; i < meta.parts; i++) {
  const varsJson = figma.root.getSharedPluginData(NS, KEY + '-chunk-' + i);
  if (!varsJson) return { error: 'missing chunk', key: KEY, chunk: i };
  figma.root.setSharedPluginData(NS, KEY + '-b64-' + i, btoa(unescape(encodeURIComponent(varsJson))));
}
return { stored: true, key: KEY, parts: meta.parts };
`
process.stdout.write(code)
