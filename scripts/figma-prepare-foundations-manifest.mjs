#!/usr/bin/env node
/**
 * Writes `.tmp/figma-foundations-manifest.json` for all foundations doc pages.
 * Merge capture IDs: node scripts/figma-prepare-foundations-manifest.mjs --merge=.tmp/figma-foundations-ids.json
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { CATALOG_META } from '../src/docs/catalog-meta.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outPath = path.join(root, '.tmp/figma-foundations-manifest.json')

const mergeArg = process.argv.find((a) => a.startsWith('--merge='))
const mergePath = mergeArg ? path.resolve(mergeArg.split('=')[1]) : null

/** @type {Record<string, string>} */
let idBySlug = {}
if (mergePath && fs.existsSync(mergePath)) {
  idBySlug = JSON.parse(fs.readFileSync(mergePath, 'utf8'))
}

const manifest = CATALOG_META.map((entry) => ({
  slug: entry.slug,
  captureId: idBySlug[entry.slug] ?? null,
}))

fs.mkdirSync(path.dirname(outPath), { recursive: true })
fs.writeFileSync(outPath, `${JSON.stringify(manifest, null, 2)}\n`)

const missing = manifest.filter((e) => !e.captureId).length
console.log(`Wrote ${manifest.length} foundations entries to ${outPath} (${missing} missing captureId)`)
