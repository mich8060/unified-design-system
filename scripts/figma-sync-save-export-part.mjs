#!/usr/bin/env node
/** Save export part MCP response text to part file. stdin: {part, text} */
import fs from 'node:fs'
import path from 'node:path'
const [collection, start, end] = process.argv.slice(2)
const parsed = JSON.parse(fs.readFileSync(0, 'utf8'))
const dir = `/tmp/export-parts/${collection}-${start}-${end}`
fs.mkdirSync(dir, { recursive: true })
const out = path.join(dir, `part-${parsed.part}.txt`)
fs.writeFileSync(out, parsed.text)
console.log(JSON.stringify({ out, textLen: parsed.text.length }))
