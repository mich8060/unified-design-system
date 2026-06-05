#!/usr/bin/env node
/**
 * Generate small Figma scripts: store SVGs in shared plugin data, then build variants.
 *   node scripts/figma-run-branding-plugin-data.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const svgDir = path.join(root, 'public/branding/svg')
const runtimePath = path.join(root, 'scripts/figma-branding-runtime-slim.js')
const outDir = path.join(root, '.tmp/figma-build/branding-plugin-data')
const payloadDir = path.join(root, '.tmp/figma-build/mcp-payloads-plugin')

const APPEARANCE_KEYS = {
  Wireframe: 'wireframe',
  Connect: 'connect',
  CHG: 'chg',
  Locumsmart: 'locumsmart',
  Modio: 'modio',
  MyWeatherby: 'weatherby',
  MyCompHealth: 'comphealth',
  'Design System': 'design-system',
}

const SVG_FILES = {
  wireframe: { wordmark: 'wireframe-wordmark.svg', mark: 'wireframe-brand-mark.svg' },
  connect: { wordmark: 'connect-wordmark.svg', mark: 'connect-brand-mark.svg' },
  chg: {
    wordmark: 'unified-design-system-wordmark.svg',
    mark: 'unified-design-system-brand-mark.svg',
  },
  locumsmart: { wordmark: 'locumsmart-wordmark.svg', mark: 'locumsmart-brand-mark.svg' },
  modio: { wordmark: 'modio-wordmark.svg', mark: 'modio-brand-mark.svg' },
  weatherby: { wordmark: 'weatherby-wordmark.svg', mark: 'weatherby-brand-mark.svg' },
  comphealth: { wordmark: 'comphealth-wordmark.svg', mark: 'comphealth-brand-mark.svg' },
  'design-system': {
    wordmark: 'unified-design-system-wordmark.svg',
    mark: 'unified-design-system-brand-mark.svg',
  },
}

const runtime = fs.readFileSync(runtimePath, 'utf8')

fs.mkdirSync(outDir, { recursive: true })
fs.mkdirSync(payloadDir, { recursive: true })

const fileKey = '3bTua8rojOOC7tYWIEWJl0'
const steps = []

for (const [slug, files] of Object.entries(SVG_FILES)) {
  for (const kind of ['wordmark', 'mark']) {
    const svg = fs.readFileSync(path.join(svgDir, files[kind]), 'utf8')
    const name = `store-${slug}-${kind}.js`
    const code = `figma.root.setSharedPluginData('uds', 'branding/${slug}/${kind}', ${JSON.stringify(svg)});\nreturn { stored: 'branding/${slug}/${kind}', bytes: ${svg.length} };`
    fs.writeFileSync(path.join(outDir, name), code)
    const payload = { fileKey, skillNames: 'figma-use', description: `Store ${slug} ${kind}`, code }
    fs.writeFileSync(path.join(payloadDir, `${name}.json`), JSON.stringify(payload))
    steps.push({ file: name, bytes: code.length, phase: 'store' })
    console.error(`Wrote ${name} (${code.length} bytes)`)
  }
}

const appearances = Object.keys(APPEARANCE_KEYS)
appearances.forEach((appearance, i) => {
  const name = `build-${i}.js`
  const spec = {
    pageName: 'UDS Components',
    figmaName: 'Branding',
    replaceExisting: i === 0,
    batchIndex: i,
    wordmarkFrame: { width: 200, height: 80 },
    markFrame: { width: 64, height: 64 },
    appearances: [appearance],
  }
  const code = `${runtime}\nconst spec = ${JSON.stringify(spec)};\nreturn await buildBrandingBatch(spec);`
  fs.writeFileSync(path.join(outDir, name), code)
  const payload = {
    fileKey,
    skillNames: 'figma-use',
    description: `Build Branding ${appearance}`,
    code,
  }
  fs.writeFileSync(path.join(payloadDir, `${name}.json`), JSON.stringify(payload))
  steps.push({ file: name, bytes: code.length, phase: 'build' })
  console.error(`Wrote ${name} (${code.length} bytes)`)
})

const combineCode = `${runtime}\nreturn await combineBrandingSet();`
fs.writeFileSync(path.join(outDir, 'combine.js'), combineCode)
fs.writeFileSync(
  path.join(payloadDir, 'combine.json'),
  JSON.stringify({
    fileKey,
    skillNames: 'figma-use',
    description: 'Combine Branding component set',
    code: combineCode,
  }),
)
steps.push({ file: 'combine.js', bytes: combineCode.length, phase: 'combine' })
console.error(`Wrote combine.js (${combineCode.length} bytes)`)

fs.writeFileSync(
  path.join(outDir, 'manifest.json'),
  JSON.stringify({ fileKey, skillNames: 'figma-use', steps }, null, 2),
)
