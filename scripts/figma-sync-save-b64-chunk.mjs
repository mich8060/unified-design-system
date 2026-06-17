#!/usr/bin/env node
/** Save b64 MCP chunk response: stdin {chunk,b64} + meta sidecar path */
import fs from 'node:fs'
import path from 'node:path'
const [collection, start, end] = process.argv.slice(2)
const key = `${collection}-${start}-${end}`
const dir = `/tmp/b64-chunks/${key}`
fs.mkdirSync(dir, { recursive: true })
const parsed = JSON.parse(fs.readFileSync(0, 'utf8'))
const json = decodeURIComponent(escape(atob(parsed.b64)))
const out = path.join(dir, `chunk-${parsed.chunk}.json`)
fs.writeFileSync(out, json)
console.log(JSON.stringify({ out, vars: JSON.parse(json).length, b64len: parsed.b64len }))
