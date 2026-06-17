#!/usr/bin/env node
/** Save chunk JSON files from inline MCP results. Usage: node figma-sync-save-chunks-from-mcp.mjs Colors 66 132 chunk0.json chunk1.json ... */
import fs from 'node:fs'
import path from 'node:path'

const [collection, start, end, ...files] = process.argv.slice(2)
const dir = `/tmp/chunks/${collection}-${start}-${end}`
fs.mkdirSync(dir, { recursive: true })
for (const f of files) {
  const parsed = JSON.parse(fs.readFileSync(f, 'utf8'))
  const idx = parsed.chunk ?? files.indexOf(f)
  const out = path.join(dir, `chunk-${idx}.json`)
  fs.writeFileSync(out, JSON.stringify(parsed))
  console.error(`saved ${out} (${parsed.variables?.length} vars)`)
}
