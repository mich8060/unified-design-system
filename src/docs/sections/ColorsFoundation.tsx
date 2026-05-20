import type { DocSection } from '../types'
import { ColorRampTabs, ColorTokenTable, type ColorTokenRow } from './ColorTokenTable'

const BRAND_STEPS = [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const

/** Accent hues in chromatic (color-wheel) order for complementary adjacency in the docs UI. */
const ACCENT_HUES = [
  'red',
  'rose',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'cyan',
  'aqua',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'magenta',
] as const

const ACCENT_STEPS = [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000] as const

/** UDS neutral ramp (`--uds-color-neutrals-*`): 25, 50, 100–900, 1000. */
const NEUTRAL_STEPS = [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000] as const

type BrandRole = 'primary' | 'secondary' | 'tertiary' | 'quaternary'

function brandRows(role: BrandRole): ColorTokenRow[] {
  return BRAND_STEPS.map((step) => ({
    step,
    token: `--brand-${role}-${step}`,
  }))
}

function accentRows(hue: (typeof ACCENT_HUES)[number]): ColorTokenRow[] {
  return ACCENT_STEPS.map((step) => ({
    step,
    token: `--uds-color-accent-${hue}-${step}`,
  }))
}

function neutralRows(): ColorTokenRow[] {
  return NEUTRAL_STEPS.map((step) => ({
    step,
    token: `--uds-color-neutrals-${step}`,
  }))
}

const BASE_ROWS: ColorTokenRow[] = [
  { label: 'Black', token: '--uds-color-black' },
  { label: 'White', token: '--uds-color-white' },
  { label: 'Transparent', token: '--uds-color-transparent', checkerboard: true },
]

function BaseColorsPreview() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Canonical fills from the system palette. Prefer these tokens over hard-coded hex so defaults stay aligned with{' '}
        <span className="font-mono text-xs">uds-tokens.css</span>.
      </p>
      <ColorTokenTable rows={BASE_ROWS} nameHeader="Name" whiteTable />
    </div>
  )
}

const BRAND_ROLES: BrandRole[] = ['primary', 'secondary', 'tertiary', 'quaternary']

function NeutralColorsPreview() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Shared gray scale for chrome, text, borders, and surfaces. Tokens use{' '}
        <span className="font-mono text-xs">--uds-color-neutrals-25 … 1000</span>;{' '}
        <span className="font-mono text-xs">--uds-color-neutrals</span> aliases{' '}
        <span className="font-mono text-xs">--uds-color-neutrals-500</span>. Prefer these over ad-hoc hex when
        building on UDS.
      </p>
      <ColorTokenTable rows={neutralRows()} whiteTable />
    </div>
  )
}

function BrandColorsPreview() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Per-brand ramps from <span className="font-mono text-xs">uds-tokens.css</span>. Values follow the active{' '}
        <span className="font-mono text-xs">[data-brand]</span> / <span className="font-mono text-xs">.brand-*</span>{' '}
        theme on an ancestor (default sample uses the root palette).
      </p>
      <ColorRampTabs
        defaultValue="primary"
        tabs={BRAND_ROLES.map((role) => ({
          value: role,
          label: role.charAt(0).toUpperCase() + role.slice(1),
          swatchToken: `--brand-${role}-500`,
          rows: brandRows(role),
        }))}
      />
    </div>
  )
}

function AccentColorsPreview() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        System accent scales are exposed as{' '}
        <span className="font-mono text-xs">{'--uds-color-accent-{hue}-{step}'}</span>.
        Use Tailwind arbitrary values, for example{' '}
        <span className="font-mono text-xs">bg-[var(--uds-color-accent-blue-500)]</span>.
      </p>
      <ColorRampTabs
        defaultValue="green"
        scrollableTabs
        tabs={ACCENT_HUES.map((hue) => ({
          value: hue,
          label: hue.charAt(0).toUpperCase() + hue.slice(1),
          swatchToken: `--uds-color-accent-${hue}-500`,
          rows: accentRows(hue),
        }))}
      />
    </div>
  )
}

const baseExampleCode = `{/* Canonical system fills */}
<div className="flex flex-wrap gap-2">
  <div className="h-10 w-10 rounded-md bg-[var(--uds-color-black)]" />
  <div className="h-10 w-10 rounded-md border border-neutral-200 bg-[var(--uds-color-white)] dark:border-neutral-700" />
  <div className="h-10 w-10 rounded-md border border-neutral-300 bg-[var(--uds-color-transparent)] dark:border-neutral-600" />
</div>`

const brandExampleCode = `/* Brand ramps — swap palette via data-brand on a root or section */
<div className="flex flex-wrap gap-2">
  <div className="h-10 w-10 rounded-md bg-[var(--brand-primary-500)] shadow-sm" />
  <div className="h-10 w-10 rounded-md bg-[var(--brand-secondary-500)] shadow-sm" />
  <div className="h-10 w-10 rounded-md bg-[var(--brand-tertiary-500)] shadow-sm" />
  <div className="h-10 w-10 rounded-md bg-[var(--brand-quaternary-500)] shadow-sm" />
</div>`

const neutralExampleCode = `{/* UDS neutrals — same scale surfaces and text tie to */}
<div className="flex flex-wrap gap-2">
  <div className="h-10 w-10 rounded-md bg-[var(--uds-color-neutrals-25)] ring-1 ring-[var(--uds-color-neutrals-200)]" />
  <div className="h-10 w-10 rounded-md bg-[var(--uds-color-neutrals-100)] ring-1 ring-[var(--uds-color-neutrals-300)]" />
  <div className="h-10 w-10 rounded-md bg-[var(--uds-color-neutrals-500)]" />
  <div className="h-10 w-10 rounded-md bg-[var(--uds-color-neutrals-1000)]" />
</div>`

const accentExampleCode = `{/* Full accent scale example — pick any hue + step */}
<div className="flex flex-wrap gap-2">
  <div className="h-10 w-10 rounded-md bg-[var(--uds-color-accent-emerald-500)]" />
  <div className="h-10 w-10 rounded-md bg-[var(--uds-color-accent-violet-400)]" />
  <div className="h-10 w-10 rounded-md bg-[var(--uds-color-accent-amber-600)]" />
</div>`

function sec(
  id: string,
  title: string,
  code: string,
  preview: DocSection['preview'],
  description?: string,
): DocSection {
  return { id, title, code, preview, description }
}

export function getColorsFoundationSections(): DocSection[] {
  return [
    sec(
      'base-colors',
      'Base colors',
      baseExampleCode,
      <BaseColorsPreview />,
      'System black, white, and transparent mapped to `--uds-color-*` (not theme-specific).',
    ),
    sec(
      'brand-colors',
      'Brand colors',
      brandExampleCode,
      <BrandColorsPreview />,
      'Four semantic brand ramps (25–900) wired to white-label themes.',
    ),
    sec(
      'neutral-colors',
      'Neutral colors',
      neutralExampleCode,
      <NeutralColorsPreview />,
      'Single shared neutral ramp (25–1000) for UI structure; alias token at 500.',
    ),
    sec(
      'accent-colors',
      'Accent colors',
      accentExampleCode,
      <AccentColorsPreview />,
      'Shared accent families for charts, badges, and decorative emphasis.',
    ),
  ]
}
