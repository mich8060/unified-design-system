#!/usr/bin/env node
/**
 * Assemble chunked MCP retrieve files into export JSON + import script.
 * Usage: node scripts/figma-sync-assemble-batch.mjs Colors 66 132 /tmp/chunks/Colors-66-132
 */
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const [collection, start, end, chunkDir] = process.argv.slice(2)
if (!collection || start == null || end == null || !chunkDir) {
  console.error('Usage: node scripts/figma-sync-assemble-batch.mjs <Collection> <start> <end> <chunk-dir>')
  process.exit(1)
}

const files = fs.readdirSync(chunkDir).filter((f) => f.endsWith('.json')).sort()
if (!files.length) {
  console.error('No chunk files in', chunkDir)
  process.exit(1)
}

const chunks = files.map((f) => JSON.parse(fs.readFileSync(path.join(chunkDir, f), 'utf8')))
const first = chunks[0]
const payload = {
  collection: first.collection,
  modeEntries: first.modeEntries,
  range: first.range,
  total: first.batchTotal,
  variables: chunks.flatMap((c) => c.variables ?? []),
}

const exportDir = path.join(root, '.tmp/figma-export')
fs.mkdirSync(exportDir, { recursive: true })
const outFile = path.join(exportDir, `${collection}-${start}-${end}.json`)
fs.writeFileSync(outFile, JSON.stringify(payload, null, 2))

const mcpFile = `/tmp/mcp-${collection}-${start}-${end}.json`
fs.writeFileSync(mcpFile, JSON.stringify(payload))

const importFile = `/tmp/import-${collection}-${start}-${end}.js`
const gen = spawnSync(process.execPath, ['scripts/figma-sync-gen-import.mjs', outFile], {
  cwd: root,
  encoding: 'utf8',
})
if (gen.status !== 0) {
  console.error(gen.stderr || gen.stdout)
  process.exit(gen.status ?? 1)
}
fs.writeFileSync(importFile, gen.stdout)

console.log(
  JSON.stringify(
    {
      outFile,
      mcpFile,
      importFile,
      variables: payload.variables.length,
      range: payload.range,
      importBytes: gen.stdout.length,
    },
    null,
    2
  )
)
