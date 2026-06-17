#!/usr/bin/env node
/**
 * Save MCP chunk JSON files from stdin (JSON array) and assemble batch.
 * Usage: node scripts/figma-sync-batch-from-chunks.mjs Colors 66 132 < chunks.json
 */
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const [collection, start, end] = process.argv.slice(2)
const chunks = JSON.parse(fs.readFileSync(0, 'utf8'))
const chunkDir = `/tmp/chunks/${collection}-${start}-${end}`
fs.mkdirSync(chunkDir, { recursive: true })

for (const c of chunks) {
  const idx = c.chunk
  fs.writeFileSync(path.join(chunkDir, `chunk-${idx}.json`), JSON.stringify(c))
}

const asm = spawnSync(
  process.execPath,
  ['scripts/figma-sync-assemble-batch.mjs', collection, start, end, chunkDir],
  { cwd: root, encoding: 'utf8' }
)
process.stdout.write(asm.stdout)
if (asm.status !== 0) {
  process.stderr.write(asm.stderr || '')
  process.exit(asm.status ?? 1)
}
