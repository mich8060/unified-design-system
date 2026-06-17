#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const chunks = JSON.parse(fs.readFileSync('/tmp/b64-in-colors-66132.json', 'utf8'))
const dir = '/tmp/b64-chunks/Colors-66-132'
fs.mkdirSync(dir, { recursive: true })

for (const item of chunks) {
  const json = decodeURIComponent(escape(atob(item.b64)))
  fs.writeFileSync(path.join(dir, `chunk-${item.chunk}.json`), json)
  console.error(`chunk-${item.chunk}: ${JSON.parse(json).length} vars`)
}

const proc = spawnSync(process.execPath, ['scripts/figma-sync-compose-chunks.mjs', 'Colors', '66', '132'], {
  cwd: root,
  encoding: 'utf8',
})
console.log(proc.stdout)
process.exit(proc.status ?? 0)
