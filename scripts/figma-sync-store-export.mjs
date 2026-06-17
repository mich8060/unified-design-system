#!/usr/bin/env node
/**
 * Emits use_figma code that exports a batch and stores in shared plugin data.
 * Usage: node scripts/figma-sync-store-export.mjs Colors 66 132
 */
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const [collection, start, end] = process.argv.slice(2)
const exportCode = execSync(
  `node scripts/figma-sync-variables-export.mjs ${collection} ${start} ${end}`,
  { cwd: root }
).toString().trim()

const key = `${collection}-${start}-${end}`
const body = exportCode
  .replace(/\nreturn \{\n  collection:/, '\nconst payload = {\n  collection:')
  .replace(/\}\s*;\s*$/, `};
const CHUNK = 15;
const parts = Math.ceil(payload.variables.length / CHUNK);
for (let i = 0; i < parts; i++) {
  const start = i * CHUNK;
  figma.root.setSharedPluginData(NS, KEY + '-chunk-' + i, JSON.stringify(payload.variables.slice(start, start + CHUNK)));
}
figma.root.setSharedPluginData(NS, KEY + '-meta', JSON.stringify({
  collection: payload.collection,
  modeEntries: payload.modeEntries,
  range: payload.range,
  total: payload.total,
  vars: payload.variables.length,
  parts,
}));
return { stored: true, key: KEY, collection: payload.collection.name, range: payload.range, vars: payload.variables.length, parts };`)
const code = `
const NS = 'uds.sync';
const KEY = ${JSON.stringify(key)};
${body}`
process.stdout.write(code)
