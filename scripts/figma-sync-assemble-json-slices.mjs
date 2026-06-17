#!/usr/bin/env node
/**
 * Assemble JSON slices into export file and generate import script.
 * Usage: node scripts/figma-sync-assemble-json-slices.mjs Colors 66 132 /tmp/json-slices/Colors-66-132
 */
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const [collection, start, end, sliceDir] = process.argv.slice(2)
const files = fs.readdirSync(sliceDir).filter((f) => f.startsWith('slice-') && f.endsWith('.txt')).sort((a, b) => {
  return Number(a.match(/slice-(\d+)/)[1]) - Number(b.match(/slice-(\d+)/)[1])
})
const json = files.map((f) => fs.readFileSync(path.join(sliceDir, f), 'utf8')).join('')
const payload = JSON.parse(json)

const exportDir = path.join(root, '.tmp/figma-export')
fs.mkdirSync(exportDir, { recursive: true })
const outFile = path.join(exportDir, `${collection}-${start}-${end}.json`)
fs.writeFileSync(outFile, JSON.stringify(payload, null, 2))
const mcpFile = `/tmp/mcp-${collection}-${start}-${end}.json`
fs.writeFileSync(mcpFile, json)

const importFile = `/tmp/import-${collection}-${start}-${end}.js`
const gen = spawnSync(process.execPath, ['scripts/figma-sync-gen-import.mjs', outFile], { cwd: root, encoding: 'utf8' })
if (gen.status !== 0) {
  console.error(gen.stderr || gen.stdout)
  process.exit(gen.status ?? 1)
}
fs.writeFileSync(importFile, gen.stdout)
console.log(JSON.stringify({ outFile, mcpFile, importFile, variables: payload.variables.length, importBytes: gen.stdout.length }, null, 2))
