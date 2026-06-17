#!/usr/bin/env node
/**
 * Full chunk pipeline for one batch: expects chunks already in /tmp/chunks/<Collection>-<start>-<end>/
 * Or saves from MCP chunk JSON files in input dir.
 * Usage: node scripts/figma-sync-chunk-pipeline.mjs Colors 66 132 [/tmp/mcp-chunk-in]
 */
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const [collection, start, end, inDir] = process.argv.slice(2)
const chunkDir = `/tmp/chunks/${collection}-${start}-${end}`

if (inDir) {
  fs.mkdirSync(chunkDir, { recursive: true })
  const files = fs.readdirSync(inDir).filter((f) => f.endsWith('.json')).sort()
  for (const f of files) {
    const parsed = JSON.parse(fs.readFileSync(path.join(inDir, f), 'utf8'))
    const idx = parsed.chunk ?? Number(f.match(/(\d+)/)?.[0] ?? 0)
    fs.writeFileSync(path.join(chunkDir, `chunk-${idx}.json`), JSON.stringify(parsed))
  }
}

const asm = spawnSync(
  process.execPath,
  ['scripts/figma-sync-assemble-batch.mjs', collection, start, end, chunkDir],
  { cwd: root, encoding: 'utf8' }
)
if (asm.status !== 0) {
  console.error(asm.stderr || asm.stdout)
  process.exit(asm.status ?? 1)
}
console.log(asm.stdout)
