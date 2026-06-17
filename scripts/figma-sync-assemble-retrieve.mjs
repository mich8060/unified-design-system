#!/usr/bin/env node
/** Assemble export JSON from MCP chunk retrieve response files */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const [collection, start, end] = process.argv.slice(2)
const dir = path.join(root, '.tmp/mcp-chunks', `${collection}-${start}-${end}`)
const meta = JSON.parse(fs.readFileSync(path.join(dir, 'meta.json'), 'utf8'))
let json = ''
for (let i = 0; i < meta.parts; i++) {
  const resp = JSON.parse(fs.readFileSync(path.join(dir, `retrieve-${i}.json`), 'utf8'))
  json += resp.chunk
}
const payload = JSON.parse(json)
const out = path.join(root, `.tmp/figma-export/${collection}-${start}-${end}.json`)
fs.writeFileSync(out, JSON.stringify(payload, null, 2))
console.log(JSON.stringify({ file: path.relative(root, out), vars: payload.variables?.length ?? 0 }))
