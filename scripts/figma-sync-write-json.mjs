#!/usr/bin/env node
import fs from 'node:fs'
const out = process.argv[2]
if (!out) {
  console.error('Usage: node figma-sync-write-json.mjs <outfile>')
  process.exit(1)
}
const data = fs.readFileSync(0, 'utf8')
fs.writeFileSync(out, data)
const parsed = JSON.parse(data)
console.log(JSON.stringify({ out, keys: Object.keys(parsed), vars: parsed.variables?.length }))
