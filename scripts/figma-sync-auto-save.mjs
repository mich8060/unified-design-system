#!/usr/bin/env node
/** Save export JSON from stdin using payload.range + collection.name */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const payload = JSON.parse(fs.readFileSync(0, 'utf8'))
const [start, end] = payload.range
const collection = payload.collection.name
const out = path.join(root, `.tmp/figma-export/${collection}-${start}-${end}.json`)
fs.mkdirSync(path.dirname(out), { recursive: true })
fs.writeFileSync(out, JSON.stringify(payload, null, 2))
console.log(JSON.stringify({ file: path.relative(root, out), vars: payload.variables?.length ?? 0 }))
