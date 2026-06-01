#!/usr/bin/env node
/**
 * Generate a use_figma plugin script for one component slug.
 *
 *   node scripts/figma-generate-component-build.mjs badge
 *   node scripts/figma-generate-component-build.mjs badge --write
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const specsPath = path.join(root, 'scripts/figma-component-build-specs.json')
const runtimePath = path.join(root, 'scripts/figma-build-runtime.js')

const slug = process.argv[2]
const write = process.argv.includes('--write')
if (!slug) {
  console.error('Usage: node scripts/figma-generate-component-build.mjs <slug> [--write]')
  process.exit(1)
}

const specs = JSON.parse(fs.readFileSync(specsPath, 'utf8'))
const spec = specs[slug]
if (!spec) {
  console.error(`No build spec for slug "${slug}". Add to scripts/figma-component-build-specs.json`)
  process.exit(1)
}

const KIND_BY_SLUG = {
  badge: 'badge',
  input: 'input',
  checkbox: 'checkbox',
  switch: 'switch',
  skeleton: 'skeleton',
  spinner: 'spinner',
  label: 'label',
  'dot-status': 'dot-status',
  avatar: 'avatar',
  toggle: 'toggle',
  'radio-group': 'radio',
  textarea: 'textarea',
  progress: 'progress',
  slider: 'slider',
  separator: 'separator',
  kbd: 'kbd',
  link: 'link',
  text: 'text',
  status: 'status',
  alert: 'alert',
  card: 'card',
  tabs: 'tabs',
  field: 'field',
  empty: 'empty',
  medallion: 'medallion',
  'medallion-layout': 'medallion',
  'alert-dialog': 'alert-dialog',
}

const fullSpec = {
  pageName: 'UDS Components',
  kind: spec.kind ?? KIND_BY_SLUG[slug] ?? 'placeholder',
  gridCols: spec.gridCols,
  gridCellW: spec.gridCellW,
  gridCellH: spec.gridCellH,
  ...spec,
}

const INPUT_STROKES = {
  Default: 'uds/border/secondary',
  Focused: 'uds/color/primary/700',
  Error: 'uds/button/border/primary/destructive',
  Disabled: 'uds/border/disabled',
}
if (slug === 'input') fullSpec.strokeByState = INPUT_STROKES
if (slug === 'textarea') fullSpec.strokeByState = INPUT_STROKES

const runtime = fs.readFileSync(runtimePath, 'utf8')
const code = `
${runtime}

const spec = ${JSON.stringify(fullSpec, null, 2)};
return await buildFromSpec(spec);
`.trim()

const outDir = path.join(root, '.tmp/figma-build')
const outPath = path.join(outDir, `${slug}.js`)
if (write) {
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(outPath, code)
  console.error(`Wrote ${outPath}`)
} else {
  process.stdout.write(code)
}
