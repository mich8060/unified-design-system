#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const [collection, start, end, srcFile] = process.argv.slice(2)
const payload = JSON.parse(fs.readFileSync(srcFile, 'utf8'))
const out = path.join(root, `.tmp/figma-export/${collection}-${start}-${end}.json`)
fs.mkdirSync(path.dirname(out), { recursive: true })
fs.writeFileSync(out, JSON.stringify(payload, null, 2))
console.error(`saved ${out} (${payload.variables?.length ?? 0} vars, first=${payload.variables?.[0]?.[0]})`)
