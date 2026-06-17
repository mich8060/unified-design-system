#!/usr/bin/env node
/** Combine store chunks for one import into a single use_figma script. */
import fs from 'fs'
import path from 'path'

const id = process.argv[2]
const dir = path.join('.tmp/figma-var-import-wrappers', id)
const stores = fs.readdirSync(dir).filter((f) => f.startsWith('store-')).sort()
let combined = ''
for (const s of stores) {
  const { code } = JSON.parse(fs.readFileSync(path.join(dir, s), 'utf8'))
  combined += code + '\n'
}
const out = path.join('.tmp', `combined-store-${id}.js`)
fs.writeFileSync(out, combined)
const exec = JSON.parse(fs.readFileSync(path.join(dir, 'exec.json'), 'utf8'))
fs.writeFileSync(path.join('.tmp', `combined-exec-${id}.js`), exec.code)
console.log(JSON.stringify({ id, stores: stores.length, combinedBytes: combined.length, execBytes: exec.code.length, combinedStore: out, exec: `.tmp/combined-exec-${id}.js` }))
