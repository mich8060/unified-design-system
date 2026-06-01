#!/usr/bin/env node
/**
 * Merge SHADCN_UI_SLUGS + build specs + known Figma sets into ai/figma-component-manifest.json
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { SHADCN_UI_SLUGS } from '../src/docs/shadcn-ui-registry.ts'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const manifestPath = path.join(root, 'ai/figma-component-manifest.json')
const specsPath = path.join(root, 'scripts/figma-component-build-specs.json')

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
const specs = JSON.parse(fs.readFileSync(specsPath, 'utf8'))

const figmaNameToSlug = Object.fromEntries(
  Object.entries(specs).map(([slug, s]) => [s.figmaName, slug]),
)
for (const [name, entry] of Object.entries(manifest.inFigma)) {
  if (!entry.slug && figmaNameToSlug[name]) entry.slug = figmaNameToSlug[name]
}

const LAYOUT_DEFERRED = new Set([
  'layout',
  'footer',
  'header',
  'sidebar',
  'menubar',
  'navigation-menu',
  'command',
  'chart',
  'calendar',
  'micro-calendar',
  'combobox',
  'context-menu',
  'dropdown-menu',
  'dialog',
  'drawer',
  'sheet',
  'popover',
  'hover-card',
  'file-upload',
  'file-upload-cards',
  'table',
  'tabs',
  'collapsible',
  'resizable',
  'scroll-area',
  'sonner',
  'branding',
  'direction',
  'item',
  'field',
  'input-group',
  'button-group',
  'description-list',
  'section-header',
  'statistics',
  'steps',
  'check-list',
  'pagination',
  'toolbar',
  'tooltip',
  'breadcrumb',
  'date-input',
  'date-range-input',
  'time-input',
  'time-step-input',
  'token-input',
  'url-input',
  'phone-input',
  'password-input',
  'search-input',
  'number-input',
  'input-otp',
  'native-select',
  'select',
  'toggle-group',
  'progress-circles',
  'aspect-ratio',
])

/** @type {Record<string, { status: string, figmaName?: string, tier?: number, note?: string }>} */
const statusBySlug = {}

for (const slug of SHADCN_UI_SLUGS) {
  const inFigmaEntry = Object.values(manifest.inFigma).find((e) => e.slug === slug)
  const spec = specs[slug]
  if (inFigmaEntry?.nodeId) {
    statusBySlug[slug] = {
      status: 'in-figma',
      figmaName: spec?.figmaName ?? inFigmaEntry.slug ?? slug,
      nodeId: inFigmaEntry.nodeId,
    }
  } else if (spec) {
    statusBySlug[slug] = { status: 'spec-ready', figmaName: spec.figmaName, tier: spec.tier }
  } else if (LAYOUT_DEFERRED.has(slug)) {
    statusBySlug[slug] = {
      status: 'deferred',
      note: 'Composite/layout or capture via docs — build atom/sub-component in Figma first',
    }
  } else {
    statusBySlug[slug] = { status: 'needs-spec', note: 'Add entry to scripts/figma-component-build-specs.json' }
  }
}

manifest.statusBySlug = statusBySlug
manifest.summary = {
  total: SHADCN_UI_SLUGS.length,
  inFigma: Object.values(statusBySlug).filter((s) => s.status === 'in-figma').length,
  specReady: Object.values(statusBySlug).filter((s) => s.status === 'spec-ready').length,
  deferred: Object.values(statusBySlug).filter((s) => s.status === 'deferred').length,
  needsSpec: Object.values(statusBySlug).filter((s) => s.status === 'needs-spec').length,
}

fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
console.log(JSON.stringify(manifest.summary, null, 2))
