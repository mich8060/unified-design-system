#!/usr/bin/env node
/** Save one /tmp/mcp-b64-N.json into b64-chunks dir. */
import fs from 'node:fs'
import path from 'node:path'
const [collection, start, end, inFile] = process.argv.slice(2)
const parsed = JSON.parse(fs.readFileSync(inFile, 'utf8'))
const key = `${collection}-${start}-${end}`
const dir = `/tmp/b64-chunks/${key}`
fs.mkdirSync(dir, { recursive: true })
const json = decodeURIComponent(escape(atob(parsed.b64)))
const out = path.join(dir, `chunk-${parsed.chunk}.json`)
fs.writeFileSync(out, json)
console.log(JSON.stringify({ out, vars: JSON.parse(json).length, b64len: parsed.b64.length }))
