#!/usr/bin/env node
/**
 * Save MCP chunk JSON files and assemble batch.
 * Usage: node scripts/figma-sync-save-chunks.mjs Colors 66 132 /tmp/chunk-json-dir
 * chunk-json-dir contains chunk-0.json ... chunk-N.json
 */
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const [collection, start, end, inDir] = process.argv.slice(2)
const outDir = `/tmp/chunks/${collection}-${start}-${end}`
fs.mkdirSync(outDir, { recursive: true })

const files = fs.readdirSync(inDir).filter((f) => f.endsWith('.json')).sort()
for (const f of files) {
  const parsed = JSON.parse(fs.readFileSync(path.join(inDir, f), 'utf8'))
  const idx = parsed.chunk ?? Number(f.match(/(\d+)/)?.[0] ?? 0)
  fs.writeFileSync(path.join(outDir, `chunk-${idx}.json`), JSON.stringify(parsed))
}

const asm = spawnSync(
  process.execPath,
  ['scripts/figma-sync-assemble-batch.mjs', collection, start, end, outDir],
  { cwd: root, encoding: 'utf8' }
)
if (asm.status !== 0) {
  console.error(asm.stderr || asm.stdout)
  process.exit(asm.status ?? 1)
}
console.log(asm.stdout)
