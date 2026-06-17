#!/usr/bin/env node
/** Assemble export JSON from stored export-b64 part files in /tmp/export-b64-parts/<key>/ */
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const [collection, start, end] = process.argv.slice(2)
const key = `${collection}-${start}-${end}`
const dir = `/tmp/export-b64-parts/${key}`
const files = fs.readdirSync(dir).filter((f) => f.startsWith('part-') && f.endsWith('.b64')).sort((a, b) => Number(a.match(/(\d+)/)[0]) - Number(b.match(/(\d+)/)[0]))
const json = files.map((f) => {
  const b64 = fs.readFileSync(path.join(dir, f), 'utf8').trim()
  return decodeURIComponent(escape(atob(b64)))
}).join('')
const mcpFile = `/tmp/mcp-${key}.json`
fs.writeFileSync(mcpFile, json)
const proc = spawnSync(process.execPath, ['scripts/figma-sync-process-batch.mjs', collection, start, end, mcpFile], {
  cwd: root,
  encoding: 'utf8',
})
console.log(proc.stdout)
if (proc.status !== 0) {
  console.error(proc.stderr)
  process.exit(proc.status ?? 1)
}
