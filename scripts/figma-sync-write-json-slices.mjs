#!/usr/bin/env node
/** Write JSON slice text files from MCP response objects (stdin: JSON array). */
import fs from 'node:fs'
import path from 'node:path'
const [collection, start, end] = process.argv.slice(2)
const items = JSON.parse(fs.readFileSync(0, 'utf8'))
const dir = `/tmp/json-slices/${collection}-${start}-${end}`
fs.mkdirSync(dir, { recursive: true })
for (const item of items) {
  const out = path.join(dir, `slice-${item.index}.txt`)
  fs.writeFileSync(out, item.slice)
  console.error(`slice-${item.index}: ${item.slice.length} chars`)
}
console.log(JSON.stringify({ dir, count: items.length }))
