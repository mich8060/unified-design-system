#!/usr/bin/env node
/**
 * Prints capture IDs from manifest for MCP polling (one per line: slug captureId).
 * Usage: node scripts/figma-poll-capture-manifest.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const manifestPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.tmp/figma-capture-manifest.json')
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
for (const { slug, captureId } of manifest) {
  if (captureId) console.log(`${slug}\t${captureId}`)
}
