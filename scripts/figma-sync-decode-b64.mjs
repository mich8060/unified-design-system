#!/usr/bin/env node
/** Decode base64 parts from stdin JSON: { parts: [b64,...], out: "Colors-66-132" } */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const { parts, out } = JSON.parse(fs.readFileSync(0, 'utf8'))
const json = Buffer.from(parts.join(''), 'base64').toString('utf8')
const payload = JSON.parse(json)
const outPath = path.join(root, '.tmp/figma-export', `${out}.json`)
fs.mkdirSync(path.dirname(outPath), { recursive: true })
fs.writeFileSync(outPath, JSON.stringify(payload, null, 2))
console.log(JSON.stringify({ file: path.relative(root, outPath), vars: payload.variables?.length ?? 0 }))
