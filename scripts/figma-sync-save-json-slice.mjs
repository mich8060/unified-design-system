#!/usr/bin/env node
/** Save JSON slice from MCP retrieve-json-slice response file. */
import fs from 'node:fs'
import path from 'node:path'
const [collection, start, end, mcpFile] = process.argv.slice(2)
const parsed = JSON.parse(fs.readFileSync(mcpFile, 'utf8'))
const dir = `/tmp/json-slices/${collection}-${start}-${end}`
fs.mkdirSync(dir, { recursive: true })
const out = path.join(dir, `slice-${parsed.index}.txt`)
fs.writeFileSync(out, parsed.slice)
console.log(JSON.stringify({ out, index: parsed.index, len: parsed.slice.length }))
