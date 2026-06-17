#!/usr/bin/env node
/**
 * Run full export pipeline for all batches via MCP result files in .tmp/mcp-chunks/
 * Expects chunk files named: {Collection}-{start}-{end}.json (raw MCP export response)
 * Usage: node scripts/figma-sync-assemble-exports.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const chunkDir = path.join(root, '.tmp/mcp-chunks')
const exportDir = path.join(root, '.tmp/figma-export')

const PLAN = [
  { collection: 'Colors', total: 263, batchSize: 66 },
  { collection: 'Layout', total: 82, batchSize: 82 },
  { collection: 'Brand', total: 456, batchSize: 40 },
  { collection: 'Typography', total: 16, batchSize: 16 },
  { collection: 'Responsive', total: 38, batchSize: 38 },
]

fs.mkdirSync(exportDir, { recursive: true })
const results = []
for (const { collection, total, batchSize } of PLAN) {
  for (let start = 0; start < total; start += batchSize) {
    const end = Math.min(start + batchSize, total)
    const name = `${collection}-${start}-${end}`
    const chunkFile = path.join(chunkDir, `${name}.json`)
    const outFile = path.join(exportDir, `${name}.json`)
    if (!fs.existsSync(chunkFile)) {
      results.push({ name, status: 'missing' })
      continue
    }
    const payload = JSON.parse(fs.readFileSync(chunkFile, 'utf8'))
    fs.writeFileSync(outFile, JSON.stringify(payload, null, 2))
    results.push({ name, status: 'saved', vars: payload.variables?.length ?? 0 })
  }
}
console.log(JSON.stringify(results, null, 2))
