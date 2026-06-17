#!/usr/bin/env node
/**
 * Save one MCP chunk JSON response to chunk dir.
 * Usage: node scripts/figma-sync-save-mcp-chunk.mjs Colors 66 132 0 /tmp/in.json
 */
import fs from 'node:fs'
import path from 'node:path'

const [collection, start, end, chunkIndex, src] = process.argv.slice(2)
const dir = `/tmp/chunks/${collection}-${start}-${end}`
fs.mkdirSync(dir, { recursive: true })
const parsed = JSON.parse(fs.readFileSync(src, 'utf8'))
const out = path.join(dir, `chunk-${chunkIndex}.json`)
fs.writeFileSync(out, JSON.stringify(parsed))
console.log(JSON.stringify({ out, vars: parsed.variables?.length }))
