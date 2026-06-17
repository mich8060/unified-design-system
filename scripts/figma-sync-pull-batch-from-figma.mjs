#!/usr/bin/env node
/**
 * Print MCP use_figma codes for full batch pull workflow.
 * Usage: node scripts/figma-sync-pull-batch-from-figma.mjs Colors 66 132
 */
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const [collection, start, end] = process.argv.slice(2)
const key = `${collection}-${start}-${end}`

function run(script, args = []) {
  return spawnSync(process.execPath, [path.join('scripts', script), ...args], {
    cwd: root,
    encoding: 'utf8',
  }).stdout.trim()
}

console.log(JSON.stringify({
  key,
  store: run('figma-sync-store-export.mjs', [collection, start, end]),
  jsonSlices: run('figma-sync-store-json-slices.mjs', [collection, start, end]),
  assembled: run('figma-sync-retrieve-assembled.mjs', [collection, start, end]),
  chunkCount: Math.ceil((Number(end) - Number(start)) / 15),
}, null, 2))
