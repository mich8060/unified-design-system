#!/usr/bin/env node
/**
 * Read store script and print for MCP, or read import script for target MCP.
 * Usage:
 *   node scripts/figma-sync-read-script.mjs store Colors 66 132
 *   node scripts/figma-sync-read-script.mjs import Colors 66 132
 *   node scripts/figma-sync-read-script.mjs retrieve Colors 66 132 0
 */
import fs from 'node:fs'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const [kind, collection, start, end, chunkIndex] = process.argv.slice(2)

if (kind === 'store') {
  const file = `/tmp/figma-sync-store/store-${collection}-${start}-${end}.js`
  process.stdout.write(fs.readFileSync(file, 'utf8'))
} else if (kind === 'import') {
  const file = `/tmp/import-${collection}-${start}-${end}.js`
  process.stdout.write(fs.readFileSync(file, 'utf8'))
} else if (kind === 'retrieve') {
  const code = spawnSync(
    process.execPath,
    ['scripts/figma-sync-retrieve-chunk.mjs', collection, String(start), String(end), String(chunkIndex)],
    { cwd: root, encoding: 'utf8' }
  ).stdout
  process.stdout.write(code)
} else {
  console.error('Usage: node scripts/figma-sync-read-script.mjs <store|import|retrieve> ...')
  process.exit(1)
}
