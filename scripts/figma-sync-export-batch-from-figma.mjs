#!/usr/bin/env node
/**
 * Combine saved chunk files into export JSON + import script.
 * Usage: node scripts/figma-sync-export-batch-from-figma.mjs Colors 66 132
 */
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const [collection, start, end] = process.argv.slice(2)
const chunkDir = `/tmp/chunks/${collection}-${start}-${end}`

if (!fs.existsSync(chunkDir)) {
  console.error('Missing chunk dir:', chunkDir)
  process.exit(1)
}

spawnSync(process.execPath, ['scripts/figma-sync-assemble-batch.mjs', collection, start, end, chunkDir], {
  cwd: root,
  stdio: 'inherit',
})
