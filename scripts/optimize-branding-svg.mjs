#!/usr/bin/env node
/**
 * Optimize branding SVGs in place with the branding-safe SVGO config.
 *
 * Usage: node scripts/optimize-branding-svg.mjs
 *    or: npm run optimize:branding-svg
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { optimize } from 'svgo'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const svgDir = path.join(root, 'src/assets/branding/svg')
const configPath = path.join(root, 'svgo.branding.config.mjs')

const { default: config } = await import(pathToFileURL(configPath).href)

function formatBytes(n) {
  if (n < 1024) return `${n} B`
  return `${(n / 1024).toFixed(1)} KB`
}

const files = fs
  .readdirSync(svgDir)
  .filter((f) => f.endsWith('.svg'))
  .sort()

if (files.length === 0) {
  console.error(`No SVGs found in ${svgDir}`)
  process.exit(1)
}

let beforeTotal = 0
let afterTotal = 0
const rows = []

for (const file of files) {
  const filePath = path.join(svgDir, file)
  const input = fs.readFileSync(filePath, 'utf8')
  const before = Buffer.byteLength(input, 'utf8')
  const result = optimize(input, { path: filePath, ...config })
  if (result.error) {
    console.error(`SVGO failed on ${file}:`, result.error)
    process.exit(1)
  }
  const output = result.data
  const after = Buffer.byteLength(output, 'utf8')
  const finalSize = Math.min(before, after)
  if (after < before) {
    fs.writeFileSync(filePath, output, 'utf8')
  }
  beforeTotal += before
  afterTotal += finalSize
  const saved = before - finalSize
  const pct = before === 0 ? 0 : ((saved / before) * 100).toFixed(1)
  rows.push({
    file,
    before,
    after: finalSize,
    saved,
    pct,
  })
}

console.log('Branding SVG optimize (in place)\n')
console.log(
  `${'File'.padEnd(42)} ${'Before'.padStart(10)} ${'After'.padStart(10)} ${'Saved'.padStart(14)}`,
)
console.log('-'.repeat(80))
for (const r of rows) {
  console.log(
    `${r.file.padEnd(42)} ${formatBytes(r.before).padStart(10)} ${formatBytes(r.after).padStart(10)} ${(formatBytes(r.saved) + ` (${r.pct}%)`).padStart(14)}`,
  )
}
console.log('-'.repeat(80))
const totalSaved = beforeTotal - afterTotal
const totalPct = beforeTotal === 0 ? 0 : ((totalSaved / beforeTotal) * 100).toFixed(1)
console.log(
  `${'TOTAL'.padEnd(42)} ${formatBytes(beforeTotal).padStart(10)} ${formatBytes(afterTotal).padStart(10)} ${(formatBytes(totalSaved) + ` (${totalPct}%)`).padStart(14)}`,
)
