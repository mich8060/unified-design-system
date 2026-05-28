#!/usr/bin/env node
/**
 * Batch-open docs pages for Figma html-to-design capture.
 *
 * Usage:
 *   node scripts/figma-batch-capture-components.mjs
 *   node scripts/figma-batch-capture-components.mjs --section=foundations --manifest=.tmp/figma-foundations-manifest.json
 *   node scripts/figma-batch-capture-components.mjs --delay-ms=4000 --wait-ms=12000
 */
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const args = process.argv.slice(2)
const section =
  args.find((a) => a.startsWith('--section='))?.split('=')[1] ?? 'components'
const manifestPath = path.resolve(
  args.find((a) => a.startsWith('--manifest='))?.split('=')[1] ??
    path.join(
      root,
      section === 'foundations'
        ? '.tmp/figma-foundations-manifest.json'
        : '.tmp/figma-capture-manifest.json',
    ),
)
const delayMs = Number(args.find((a) => a.startsWith('--delay-ms='))?.split('=')[1] ?? 3000)
const waitMs = Number(args.find((a) => a.startsWith('--wait-ms='))?.split('=')[1] ?? 12000)
const baseUrl = args.find((a) => a.startsWith('--base-url='))?.split('=')[1] ?? 'http://localhost:5173'
const dryRun = args.includes('--dry-run')
const routePrefix = section === 'foundations' ? 'foundations' : 'components'

if (!fs.existsSync(manifestPath)) {
  console.error(`Missing manifest: ${manifestPath}`)
  console.error('Run: node scripts/figma-prepare-capture-manifest.mjs')
  process.exit(1)
}

/** @type {{ slug: string, captureId: string }[]} */
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function captureUrl(slug, captureId) {
  const page = `${baseUrl}/docs/${routePrefix}/${slug}`
  const endpoint = `https://mcp.figma.com/mcp/capture/${captureId}/submit`
  const hash = new URLSearchParams({
    figmacapture: captureId,
    figmaendpoint: endpoint,
    figmadelay: String(delayMs),
  })
  return `${page}#${hash.toString()}`
}

console.log(
  `Capturing ${manifest.length} ${routePrefix} pages (delay=${delayMs}ms, wait=${waitMs}ms per page)`,
)

for (let i = 0; i < manifest.length; i++) {
  const { slug, captureId } = manifest[i]
  const url = captureUrl(slug, captureId)
  console.log(`[${i + 1}/${manifest.length}] ${slug}`)
  if (dryRun) {
    console.log(`  ${url}`)
    continue
  }
  execSync(`open ${JSON.stringify(url)}`, { stdio: 'inherit' })
  await sleep(waitMs)
}

console.log('Done opening pages. Poll each captureId with Figma MCP until completed.')
