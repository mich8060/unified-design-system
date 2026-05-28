#!/usr/bin/env node
/**
 * Writes `.tmp/figma-capture-manifest.json` with all component slugs (captureId filled later).
 * Merge capture IDs: node scripts/figma-prepare-capture-manifest.mjs --merge=.tmp/figma-capture-ids.json
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { SHADCN_UI_SLUGS } from '../src/docs/shadcn-ui-registry.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outPath = path.join(root, '.tmp/figma-capture-manifest.json')

const mergeArg = process.argv.find((a) => a.startsWith('--merge='))
const mergePath = mergeArg ? path.resolve(mergeArg.split('=')[1]) : null

/** @type {Record<string, string>} */
let idBySlug = {}
if (mergePath && fs.existsSync(mergePath)) {
  idBySlug = JSON.parse(fs.readFileSync(mergePath, 'utf8'))
}

const manifest = SHADCN_UI_SLUGS.map((slug) => ({
  slug,
  captureId: idBySlug[slug] ?? null,
}))

fs.mkdirSync(path.dirname(outPath), { recursive: true })
fs.writeFileSync(outPath, `${JSON.stringify(manifest, null, 2)}\n`)

const missing = manifest.filter((e) => !e.captureId).length
console.log(`Wrote ${manifest.length} entries to ${outPath} (${missing} missing captureId)`)
