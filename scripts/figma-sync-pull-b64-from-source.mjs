#!/usr/bin/env node
/**
 * Pull stored b64 chunks from source via use_figma codes printed to stdout.
 * Agent runs each code on source, saves JSON to /tmp/mcp-b64-{i}.json, then:
 *   node scripts/figma-sync-pull-b64-from-source.mjs save Colors 66 132
 */
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const [cmd, collection, start, end] = process.argv.slice(2)
const key = `${collection}-${start}-${end}`
const count = Math.ceil((Number(end) - Number(start)) / 15)

if (cmd === 'codes') {
  for (let i = 0; i < count; i++) {
    console.log(`// chunk ${i}`)
    console.log(`return { chunk: ${i}, b64: figma.root.getSharedPluginData('uds.sync', '${key}-b64-${i}') };`)
    console.log('---')
  }
  process.exit(0)
}

if (cmd === 'save') {
  const dir = `/tmp/b64-chunks/${key}`
  fs.mkdirSync(dir, { recursive: true })
  for (let i = 0; i < count; i++) {
    const inFile = `/tmp/mcp-b64-${i}.json`
    if (!fs.existsSync(inFile)) {
      console.error('Missing', inFile)
      process.exit(1)
    }
    const parsed = JSON.parse(fs.readFileSync(inFile, 'utf8'))
    const json = decodeURIComponent(escape(atob(parsed.b64)))
    fs.writeFileSync(path.join(dir, `chunk-${i}.json`), json)
    console.error(`chunk-${i}: ${JSON.parse(json).length} vars`)
  }
  const proc = spawnSync(process.execPath, ['scripts/figma-sync-compose-chunks.mjs', collection, start, end], {
    cwd: root,
    encoding: 'utf8',
  })
  console.log(proc.stdout)
  process.exit(proc.status ?? 0)
}

console.error('Usage: pull-b64-from-source.mjs codes|save <Collection> <start> <end>')
process.exit(1)
