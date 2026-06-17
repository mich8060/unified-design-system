#!/usr/bin/env node
/**
 * Assemble export JSON from part text files.
 * Usage: node scripts/figma-sync-assemble-export-parts.mjs Colors 66 132 /tmp/export-parts/Colors-66-132
 */
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const [collection, start, end, partDir] = process.argv.slice(2)
const files = fs.readdirSync(partDir).filter((f) => f.startsWith('part-') && f.endsWith('.txt')).sort((a, b) => {
  return Number(a.match(/part-(\\d+)/)[1]) - Number(b.match(/part-(\\d+)/)[1])
})
const json = files.map((f) => fs.readFileSync(path.join(partDir, f), 'utf8')).join('')
const mcpFile = `/tmp/mcp-${collection}-${start}-${end}.json`
fs.writeFileSync(mcpFile, json)
const proc = spawnSync(process.execPath, ['scripts/figma-sync-process-batch.mjs', collection, start, end, mcpFile], {
  cwd: root,
  encoding: 'utf8',
})
console.log(proc.stdout)
if (proc.status !== 0) {
  console.error(proc.stderr)
  process.exit(proc.status ?? 1)
}
