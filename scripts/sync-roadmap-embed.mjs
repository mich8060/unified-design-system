#!/usr/bin/env node
/**
 * Copy the built Roadmap app from a Roadmap.zip (or unpacked folder) into public/roadmap
 * and sync event-positions.json for GET /api/event-positions.
 *
 * Usage:
 *   node scripts/sync-roadmap-embed.mjs /path/to/Roadmap.zip
 *   node scripts/sync-roadmap-embed.mjs /path/to/Roadmap
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const publicRoadmap = path.join(repoRoot, 'public/roadmap')
const publicApi = path.join(repoRoot, 'public/api/event-positions')

const input = process.argv[2]
if (!input) {
  console.error('Usage: node scripts/sync-roadmap-embed.mjs <Roadmap.zip|Roadmap/>')
  process.exit(1)
}

let sourceRoot = path.resolve(input)
if (input.endsWith('.zip')) {
  const tmp = path.join(repoRoot, '.tmp-roadmap-sync')
  fs.rmSync(tmp, { recursive: true, force: true })
  fs.mkdirSync(tmp, { recursive: true })
  execSync(`unzip -q -o ${JSON.stringify(path.resolve(input))} -d ${JSON.stringify(tmp)}`)
  sourceRoot = path.join(tmp, 'Roadmap')
}

const distDir = path.join(sourceRoot, 'dist')
const positionsFile = path.join(sourceRoot, 'event-positions.json')
if (!fs.existsSync(distDir)) {
  console.error('Missing dist/ — run npm run build in the Roadmap project first.')
  process.exit(1)
}

const assets = fs.readdirSync(path.join(distDir, 'assets'))
const js = assets.find((f) => f.startsWith('index-') && f.endsWith('.js'))
const css = assets.find((f) => f.startsWith('index-') && f.endsWith('.css'))
if (!js || !css) {
  console.error('Could not find index-*.js / index-*.css in dist/assets')
  process.exit(1)
}

fs.rmSync(publicRoadmap, { recursive: true, force: true })
fs.mkdirSync(path.join(publicRoadmap, 'assets'), { recursive: true })
fs.cpSync(path.join(distDir, 'assets'), path.join(publicRoadmap, 'assets'), { recursive: true })

const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Design System 2026 Roadmap</title>
    <script type="module" crossorigin src="./assets/${js}"></script>
    <link rel="stylesheet" crossorigin href="./assets/${css}" />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`
fs.writeFileSync(path.join(publicRoadmap, 'index.html'), indexHtml)

if (fs.existsSync(positionsFile)) {
  fs.mkdirSync(path.dirname(publicApi), { recursive: true })
  fs.copyFileSync(positionsFile, publicApi)
}

console.log('Synced roadmap embed to public/roadmap and public/api/event-positions')
