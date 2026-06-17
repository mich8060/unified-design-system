#!/usr/bin/env node
/**
 * Write MCP chunk retrieve results to disk (agent pastes JSON files into /tmp/mcp-chunks-in/).
 * Usage: node scripts/figma-sync-write-chunk-files.mjs Colors 66 132 /tmp/mcp-chunks-in
 */
import fs from 'node:fs'
import path from 'node:path'

const [collection, start, end, inDir] = process.argv.slice(2)
const outDir = `/tmp/chunks/${collection}-${start}-${end}`
fs.mkdirSync(outDir, { recursive: true })
const files = fs.readdirSync(inDir).filter((f) => f.endsWith('.json')).sort()
for (const f of files) {
  const parsed = JSON.parse(fs.readFileSync(path.join(inDir, f), 'utf8'))
  const idx = parsed.chunk ?? Number(f.match(/(\d+)/)?.[0] ?? 0)
  fs.writeFileSync(path.join(outDir, `chunk-${idx}.json`), JSON.stringify(parsed))
}
console.log(JSON.stringify({ outDir, files: files.length }))
