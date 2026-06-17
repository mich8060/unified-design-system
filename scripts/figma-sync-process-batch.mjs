#!/usr/bin/env node
/**
 * Save MCP export JSON and generate import script.
 * Usage: node scripts/figma-sync-process-batch.mjs Colors 66 132 /tmp/mcp-Colors-66-132.json
 */
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const [collection, start, end, mcpJsonFile] = process.argv.slice(2)
if (!collection || start == null || end == null || !mcpJsonFile) {
  console.error('Usage: node scripts/figma-sync-process-batch.mjs <Collection> <start> <end> <mcp-json-file>')
  process.exit(1)
}

function unwrapPayload(raw) {
  const parsed = JSON.parse(raw)
  if (parsed?.variables && parsed?.collection) return parsed
  if (parsed?.result?.variables) return parsed.result
  if (typeof parsed?.content?.[0]?.text === 'string') {
    return JSON.parse(parsed.content[0].text)
  }
  if (typeof parsed?.text === 'string') {
    return JSON.parse(parsed.text)
  }
  return parsed
}

const exportDir = path.join(root, '.tmp/figma-export')
fs.mkdirSync(exportDir, { recursive: true })

const payload = unwrapPayload(fs.readFileSync(mcpJsonFile, 'utf8'))
const outFile = path.join(exportDir, `${collection}-${start}-${end}.json`)
fs.writeFileSync(outFile, JSON.stringify(payload, null, 2))

const importFile = `/tmp/import-${collection}-${start}-${end}.js`
const gen = spawnSync(
  process.execPath,
  ['scripts/figma-sync-gen-import.mjs', outFile],
  { cwd: root, encoding: 'utf8' }
)
if (gen.status !== 0) {
  console.error(gen.stderr || gen.stdout)
  process.exit(gen.status ?? 1)
}
fs.writeFileSync(importFile, gen.stdout)

const summary = {
  outFile,
  importFile,
  collection: payload.collection?.name,
  range: payload.range ?? [Number(start), Number(end)],
  variables: payload.variables?.length ?? 0,
  importBytes: gen.stdout.length,
}
console.log(JSON.stringify(summary, null, 2))
