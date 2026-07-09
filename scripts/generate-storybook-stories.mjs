#!/usr/bin/env node
/**
 * Generate Storybook CSF files from docs example registry.
 * Usage: node scripts/generate-storybook-stories.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'src/stories/uds')

const registrySrc = fs.readFileSync(path.join(root, 'src/docs/shadcn-ui-registry.ts'), 'utf8')
const slugMatch = registrySrc.match(/export const SHADCN_UI_SLUGS = \[([\s\S]*?)\] as const/)
const slugs = slugMatch ? [...slugMatch[1].matchAll(/'([^']+)'/g)].map((m) => m[1]) : []

const EXTRA_SLUGS = ['app-shell', 'menu']

function formatName(slug) {
  if (slug === 'dot-status') return 'DotStatus'
  if (slug === 'sonner') return 'Toast'
  const acronyms = new Set(['otp', 'api', 'uri', 'url', 'kbd', 'npi'])
  return slug
    .split('-')
    .map((w) => (acronyms.has(w) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(' ')
}

function storyExportName(id) {
  const base = id
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('')
  return /^[A-Z]/.test(base) ? base : `Example${base}`
}

function extractExampleIds(slug) {
  const registryPath = path.join(root, 'src/docs/shadcn-examples/registry.tsx')
  const src = fs.readFileSync(registryPath, 'utf8')
  const escaped = slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const keyRe = new RegExp(`(?:^|[,{\\n])\\s*(?:'${escaped}'|${escaped}):\\s*\\[`, 'm')
  const start = src.search(keyRe)
  if (start < 0) return []

  const open = src.indexOf('[', start)
  let depth = 0
  for (let i = open; i < src.length; i++) {
    const ch = src[i]
    if (ch === '[') depth++
    else if (ch === ']') {
      depth--
      if (depth === 0) {
        const block = src.slice(open + 1, i)
        return [...block.matchAll(/E\(\s*'([^']+)'/g)].map((m) => m[1])
      }
    }
  }
  return []
}

function buildStoryExports(slug) {
  const ids = extractExampleIds(slug)
  if (ids.length === 0) {
    return `export const Overview: Story = {
  render: () => <p className="text-sm text-neutral-600">No examples registered for ${formatName(slug)}.</p>,
}`
  }
  const used = new Set()
  return ids
    .map((id, i) => {
      let exportName = storyExportName(id)
      if (used.has(exportName)) exportName = `${exportName}${i + 1}`
      used.add(exportName)
      return `export const ${exportName}: Story = {
  render: () => renderExample(${i}),
}`
    })
    .join('\n\n')
}

function generateRegistryStory(slug, componentName) {
  return `import type { Meta, StoryObj } from '@storybook/react-vite'
import { getShadcnExamples } from '@/docs/shadcn-examples/registry'

const examples = getShadcnExamples('${slug}')

const meta = {
  title: 'UDS/${componentName}',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function renderExample(index: number) {
  const example = examples[index]
  if (!example) return <p className="text-sm text-neutral-600">Example not found.</p>
  return example.previewInner
}

${buildStoryExports(slug)}
`
}

function generateExtraStory(slug) {
  if (slug === 'app-shell') {
    return `import type { Meta, StoryObj } from '@storybook/react-vite'
import { AppShellDemoCanvas } from '@/docs/app-shell-demo/AppShellDemoCanvas'
import '@/docs/app-shell-demo/app-shell-demo.css'

const meta = {
  title: 'UDS/AppShell',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Demo: Story = {
  render: () => <AppShellDemoCanvas />,
}
`
  }
  if (slug === 'menu') {
    return `import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Menu } from '@chghealthcare/unified-design-system'

const meta = {
  title: 'UDS/Menu',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function MenuDemo() {
  const [activeId, setActiveId] = useState('dashboard')
  return (
    <div className="h-[640px] w-[280px] border border-neutral-200">
      <Menu defaultExpanded activeId={activeId} onNavigationSelect={setActiveId} brand="chg" />
    </div>
  )
}

export const Default: Story = {
  render: () => <MenuDemo />,
}
`
  }
  return ''
}

fs.mkdirSync(outDir, { recursive: true })

for (const file of fs.readdirSync(outDir)) {
  if (file.endsWith('.stories.tsx')) fs.unlinkSync(path.join(outDir, file))
}

for (const slug of slugs) {
  fs.writeFileSync(path.join(outDir, `${slug}.stories.tsx`), generateRegistryStory(slug, formatName(slug)))
}

for (const slug of EXTRA_SLUGS) {
  fs.writeFileSync(path.join(outDir, `${slug}.stories.tsx`), generateExtraStory(slug))
}

console.log(`Generated ${slugs.length + EXTRA_SLUGS.length} story files in src/stories/uds/`)
