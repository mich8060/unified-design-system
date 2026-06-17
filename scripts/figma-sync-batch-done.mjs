#!/usr/bin/env node
/**
 * Orchestrate export→save→import for one batch.
 * Agent runs: MCP export on SOURCE → save JSON to .tmp/mcp-chunks/{name}.json → this script processes it.
 * Usage: node scripts/figma-sync-batch-done.mjs Colors 66 132
 */
import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const [collection, start, end] = process.argv.slice(2)
const name = `${collection}-${start}-${end}`
const chunkFile = path.join(root, '.tmp/mcp-chunks', `${name}.json`)
const exportFile = path.join(root, '.tmp/figma-export', `${name}.json`)

if (!fs.existsSync(chunkFile)) {
  console.error(`Missing ${chunkFile}`)
  process.exit(1)
}

const payload = JSON.parse(fs.readFileSync(chunkFile, 'utf8'))
fs.mkdirSync(path.dirname(exportFile), { recursive: true })
fs.writeFileSync(exportFile, JSON.stringify(payload, null, 2))

const importCode = execSync(
  `node scripts/figma-sync-variables-import.mjs .tmp/figma-export/${name}.json`,
  { cwd: root },
).toString()
const importFile = `/tmp/import-${name}.js`
fs.writeFileSync(importFile, importCode)

console.log(JSON.stringify({
  name,
  vars: payload.variables?.length ?? 0,
  exportFile: `.tmp/figma-export/${name}.json`,
  importFile,
  importSize: importCode.length,
}))
