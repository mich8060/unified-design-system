#!/usr/bin/env node
/**
 * Generate store scripts for all pending batches.
 */
import fs from 'node:fs'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = '/tmp/figma-sync-store'
fs.mkdirSync(outDir, { recursive: true })

const batches = [
  ['Colors', 66, 132],
  ['Colors', 132, 198],
  ['Colors', 198, 263],
  ['Layout', 0, 82],
  ['Brand', 0, 40],
  ['Brand', 40, 80],
  ['Brand', 80, 120],
  ['Brand', 120, 160],
  ['Brand', 160, 200],
  ['Brand', 200, 240],
  ['Brand', 240, 280],
  ['Brand', 280, 320],
  ['Brand', 320, 360],
  ['Brand', 360, 400],
  ['Brand', 400, 440],
  ['Brand', 440, 456],
  ['Typography', 0, 16],
  ['Responsive', 0, 38],
]

for (const [collection, start, end] of batches) {
  const id = `${collection}-${start}-${end}`
  const code = spawnSync(
    process.execPath,
    ['scripts/figma-sync-store-export.mjs', collection, String(start), String(end)],
    { cwd: root, encoding: 'utf8' }
  ).stdout
  fs.writeFileSync(path.join(outDir, `store-${id}.js`), code)
}
console.log(JSON.stringify({ outDir, count: batches.length }))
