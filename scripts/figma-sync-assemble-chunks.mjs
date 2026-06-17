#!/usr/bin/env node
/**
 * Assemble sharedPluginData chunks saved locally and write export JSON.
 * Usage: node scripts/figma-sync-assemble-chunks.mjs Colors 66 132 .tmp/chunks/Colors-66-132
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const [collection, start, end, chunkDir] = process.argv.slice(2)
const name = `${collection}-${start}-${end}`
const dir = path.resolve(root, chunkDir)
const meta = JSON.parse(fs.readFileSync(path.join(dir, 'meta.json'), 'utf8'))
let json = ''
for (let i = 0; i < meta.parts; i++) {
  const part = JSON.parse(fs.readFileSync(path.join(dir, `chunk-${i}.json`), 'utf8'))
  json += part.chunk
}
const payload = JSON.parse(json)
const out = path.join(root, `.tmp/figma-export/${name}.json`)
fs.mkdirSync(path.dirname(out), { recursive: true })
fs.writeFileSync(out, JSON.stringify(payload, null, 2))
console.log(JSON.stringify({ file: path.relative(root, out), vars: payload.variables?.length ?? 0 }))
