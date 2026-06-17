#!/usr/bin/env node
/**
 * Full batch sync helper: save MCP chunk retrieve results and assemble.
 * Usage: node scripts/figma-sync-chunk-save.mjs Colors 66 132 0 < chunk0.json
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const [collection, start, end, index] = process.argv.slice(2)
const payload = JSON.parse(fs.readFileSync(0, 'utf8'))
const dir = path.join(root, '.tmp/chunks', `${collection}-${start}-${end}`)
fs.mkdirSync(dir, { recursive: true })
if (index === 'meta') {
  fs.writeFileSync(path.join(dir, 'meta.json'), JSON.stringify(payload.meta ?? payload, null, 2))
} else {
  fs.writeFileSync(path.join(dir, `chunk-${index}.json`), JSON.stringify(payload, null, 2))
}
console.log('saved', dir, index)
