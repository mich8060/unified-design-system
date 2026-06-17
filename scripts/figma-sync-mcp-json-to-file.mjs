#!/usr/bin/env node
/** Write stdin JSON to outfile. Usage: node figma-sync-mcp-json-to-file.mjs /path/out.json < in.json */
import fs from 'node:fs'
const out = process.argv[2]
if (!out) {
  console.error('Usage: node figma-sync-mcp-json-to-file.mjs <outfile>')
  process.exit(1)
}
const data = fs.readFileSync(0, 'utf8')
fs.writeFileSync(out, data)
const parsed = JSON.parse(data)
const count = Array.isArray(parsed) ? parsed.length : parsed.variables?.length
console.log(JSON.stringify({ out, count }))
