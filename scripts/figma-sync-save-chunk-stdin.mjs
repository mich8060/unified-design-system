#!/usr/bin/env node
/** Save one MCP chunk response from stdin. Usage: ... Colors 66 132 0 < chunk.json */
import fs from 'node:fs'
import path from 'node:path'
const [collection, start, end, idx] = process.argv.slice(2)
const parsed = JSON.parse(fs.readFileSync(0, 'utf8'))
const dir = `/tmp/chunks/${collection}-${start}-${end}`
fs.mkdirSync(dir, { recursive: true })
const out = path.join(dir, `chunk-${idx}.json`)
fs.writeFileSync(out, JSON.stringify(parsed))
console.log(JSON.stringify({ out, vars: parsed.variables?.length, first: parsed.variables?.[0]?.[0] }))
