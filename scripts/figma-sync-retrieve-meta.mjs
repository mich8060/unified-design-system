#!/usr/bin/env node
/** Emit use_figma code to retrieve stored batch meta from source. */
const [collection, start, end] = process.argv.slice(2)
const key = `${collection}-${start}-${end}`
const code = `return JSON.parse(figma.root.getSharedPluginData('uds.sync', ${JSON.stringify(key + '-meta')}));`
process.stdout.write(code)
