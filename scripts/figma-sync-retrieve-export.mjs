#!/usr/bin/env node
/**
 * Emits use_figma code to retrieve a stored export batch from shared plugin data.
 * Usage: node scripts/figma-sync-retrieve-export.mjs Colors 66 132
 */
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const [collection, start, end] = process.argv.slice(2)
if (!collection || start == null || end == null) {
  console.error('Usage: node scripts/figma-sync-retrieve-export.mjs <Collection> <start> <end>')
  process.exit(1)
}

const key = `${collection}-${start}-${end}`
const code = `
const NS = 'uds.sync';
const KEY = ${JSON.stringify(key)};
const json = figma.root.getSharedPluginData(NS, KEY);
if (!json) return { error: 'missing stored export', key: KEY };
const payload = JSON.parse(json);
return {
  collection: payload.collection?.name,
  range: payload.range,
  variables: payload.variables?.length ?? 0,
  payload,
};
`
process.stdout.write(code)
