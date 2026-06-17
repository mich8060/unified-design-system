#!/usr/bin/env node
/**
 * Emits use_figma import script from exported collection JSON file.
 * Usage: node scripts/figma-sync-gen-import.mjs .tmp/figma-export/Colors-0-66.json
 */
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const jsonPath = process.argv[2]
if (!jsonPath) {
  console.error('Usage: node scripts/figma-sync-gen-import.mjs <export.json>')
  process.exit(1)
}

const result = spawnSync(
  process.execPath,
  ['scripts/figma-sync-variables-import.mjs', jsonPath],
  { cwd: root, encoding: 'utf8' }
)
if (result.status !== 0) {
  console.error(result.stderr || result.stdout)
  process.exit(result.status ?? 1)
}
process.stdout.write(result.stdout)
