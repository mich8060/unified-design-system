#!/usr/bin/env node
/**
 * Print import code for MCP use_figma on target.
 * Usage: node scripts/figma-sync-mcp-import.mjs Colors 132 198
 */
import fs from 'node:fs'
const [collection, start, end] = process.argv.slice(2)
const file = `/tmp/import-${collection}-${start}-${end}.js`
if (!fs.existsSync(file)) {
  console.error('Missing', file)
  process.exit(1)
}
const code = fs.readFileSync(file, 'utf8')
if (code.length > 50000) {
  console.error(JSON.stringify({ error: 'import too large', bytes: code.length, file }))
  process.exit(1)
}
console.log(JSON.stringify({ file, bytes: code.length }))
process.stdout.write(code)
