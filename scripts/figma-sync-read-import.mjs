#!/usr/bin/env node
/**
 * Read import code from saved export JSON and print size + first var name for verification.
 * Usage: node scripts/figma-sync-read-import.mjs .tmp/figma-export/Colors-0-66.json
 */
import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const jsonPath = path.resolve(root, process.argv[2])
const payload = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
const code = execSync(`node scripts/figma-sync-variables-import.mjs ${path.relative(root, jsonPath)}`, { cwd: root }).toString()
const out = `/tmp/import-${path.basename(jsonPath, '.json')}.js`
fs.writeFileSync(out, code)
console.log(JSON.stringify({ out, size: code.length, first: payload.variables?.[0]?.[0], count: payload.variables?.length }))
