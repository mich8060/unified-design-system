#!/usr/bin/env node
/** One-shot: save assembled export from retrieve-assembled MCP JSON file and process batch. */
import fs from 'node:fs'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const [collection, start, end, mcpFile] = process.argv.slice(2)
const raw = JSON.parse(fs.readFileSync(mcpFile, 'utf8'))
const payload = raw.variables ? raw : (raw.result ?? raw)
const mcpOut = `/tmp/mcp-${collection}-${start}-${end}.json`
fs.writeFileSync(mcpOut, JSON.stringify(payload))
const proc = spawnSync(
  process.execPath,
  ['scripts/figma-sync-process-batch.mjs', collection, start, end, mcpOut],
  { cwd: root, encoding: 'utf8' }
)
if (proc.status !== 0) {
  console.error(proc.stderr || proc.stdout)
  process.exit(proc.status ?? 1)
}
console.log(proc.stdout)
