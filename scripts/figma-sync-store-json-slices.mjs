#!/usr/bin/env node
/**
 * Emits use_figma code to store assembled export JSON as retrievable slices.
 * Usage: node scripts/figma-sync-store-json-slices.mjs Colors 66 132
 */
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const [collection, start, end] = process.argv.slice(2)
const key = `${collection}-${start}-${end}`
const SLICE = 1500

const code = `
const NS = 'uds.sync';
const KEY = ${JSON.stringify(key)};
const SLICE = ${SLICE};
const metaJson = figma.root.getSharedPluginData(NS, KEY + '-meta');
if (!metaJson) return { error: 'missing batch meta', key: KEY };
const meta = JSON.parse(metaJson);
const variables = [];
for (let i = 0; i < meta.parts; i++) {
  const part = figma.root.getSharedPluginData(NS, KEY + '-chunk-' + i);
  if (!part) return { error: 'missing chunk', key: KEY, chunk: i };
  variables.push(...JSON.parse(part));
}
const payload = {
  collection: meta.collection,
  modeEntries: meta.modeEntries,
  range: meta.range,
  total: meta.total,
  variables,
};
const json = JSON.stringify(payload);
const parts = Math.ceil(json.length / SLICE);
for (let i = 0; i < parts; i++) {
  figma.root.setSharedPluginData(NS, KEY + '-json-' + i, json.slice(i * SLICE, (i + 1) * SLICE));
}
figma.root.setSharedPluginData(NS, KEY + '-json-meta', JSON.stringify({ parts, len: json.length, vars: variables.length }));
return { key: KEY, jsonParts: parts, jsonLen: json.length, vars: variables.length };
`
process.stdout.write(code)
