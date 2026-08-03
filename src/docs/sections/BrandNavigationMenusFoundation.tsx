import type { ReactNode } from 'react'
import type { DocSection } from '../types'

const tableWrap =
  'overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-700'
const tableBase = 'w-full min-w-[min(100%,360px)] border-collapse text-left text-sm'
const th =
  'border-b border-neutral-200 bg-neutral-50 px-3 py-2 font-medium text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900/50 dark:text-neutral-100'
const td = 'border-b border-neutral-200 px-3 py-2 text-neutral-700 dark:border-neutral-800 dark:text-neutral-300'
const tdMono = `${td} font-mono text-xs text-neutral-600 dark:text-neutral-400`

const LOCUM_STYLE_ITEMS = [
  { label: 'Dashboard', icon: 'Layout', notes: '' },
  { label: 'Schedule', icon: 'CalendarBlank', notes: '' },
  { label: 'Job Board', icon: 'Briefcase', notes: '' },
  { label: 'Application', icon: 'NotePencil', notes: '' },
  {
    label: 'Documents',
    icon: 'FolderOpen',
    notes: 'Children: Credentialing, Financial',
  },
  { label: 'Time Entry', icon: 'Clock', notes: '' },
  { label: 'Travel', icon: 'Airplane', notes: '' },
] as const

const LOCUMSMART_ITEMS = [
  { label: 'Dashboard', icon: 'Layout' },
  { label: 'Workflow', icon: 'FolderOpen' },
  { label: 'CRM', icon: 'Users' },
  { label: 'Analytics', icon: 'ChartBar' },
  { label: 'Administration', icon: 'BuildingApartment' },
] as const

const MODIO_ITEMS = [
  { label: 'Dashboard', icon: 'Layout' },
  { label: 'Reports', icon: 'FolderOpen' },
  { label: 'Providers', icon: 'Users' },
  { label: 'Facilities', icon: 'Buildings' },
  { label: 'Payors', icon: 'Wallet' },
  { label: 'Tracking', icon: 'GpsFix' },
] as const

const CAREERMD_ITEMS = [
  { label: 'Dashboard', icon: 'Layout' },
  { label: 'Jobs', icon: 'Briefcase' },
  { label: 'Employers', icon: 'Buildings' },
  { label: 'Candidates', icon: 'Users' },
  { label: 'Messages', icon: 'Envelope' },
  { label: 'Reporting', icon: 'ChartBar' },
] as const

const CONNECT_ITEMS = [
  { label: 'Dashboard', icon: 'Layout' },
  { label: 'Requests', icon: 'Briefcase' },
  { label: 'Providers', icon: 'Users' },
  { label: 'Scheduling', icon: 'CalendarPlus' },
  { label: 'Pooling', icon: 'UserList' },
  { label: 'Escalations', icon: 'SortDescending' },
  { label: 'Calendar', icon: 'CalendarBlank' },
  { label: 'Reporting', icon: 'ChartBar' },
] as const

function TwoColTable({ rows }: { rows: readonly { label: string; icon: string }[] }) {
  return (
    <div className={tableWrap}>
      <table className={tableBase}>
        <thead>
          <tr>
            <th className={th}>Label</th>
            <th className={th}>Icon</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <td className={td}>{row.label}</td>
              <td className={tdMono}>{row.icon}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ThreeColTable({
  rows,
}: {
  rows: readonly { label: string; icon: string; notes: string }[]
}) {
  return (
    <div className={tableWrap}>
      <table className={tableBase}>
        <thead>
          <tr>
            <th className={th}>Label</th>
            <th className={th}>Icon</th>
            <th className={th}>Notes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <td className={td}>{row.label}</td>
              <td className={tdMono}>{row.icon}</td>
              <td className={td}>{row.notes || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function BrandBlock({
  id,
  title,
  intro,
  children,
}: {
  id: string
  title: string
  intro?: string
  children: ReactNode
}) {
  return (
    <div id={id} className="scroll-mt-8 space-y-3">
      <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">{title}</h3>
      {intro ? <p className="text-sm text-neutral-600 dark:text-neutral-400">{intro}</p> : null}
      {children}
    </div>
  )
}

function OverviewPreview() {
  return (
    <div className="space-y-4 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
      <p>
        This page summarizes the <strong className="text-neutral-900 dark:text-neutral-100">primary sidebar / app menu items</strong>{' '}
        defined per brand in the UDS AI contract. Apps should map these entries to Menu{' '}
        <code className="rounded bg-neutral-100 px-1 font-mono text-xs dark:bg-neutral-800">navItems</code> (routing{' '}
        <code className="rounded bg-neutral-100 px-1 font-mono text-xs dark:bg-neutral-800">path</code> / handlers are added in app
        code; the contract supplies label + icon + optional nested{' '}
        <code className="rounded bg-neutral-100 px-1 font-mono text-xs dark:bg-neutral-800">children</code> only).
      </p>
      <p>
        <strong className="text-neutral-900 dark:text-neutral-100">Icons</strong> are Phosphor-style names in the contract; in app
        code, resolve them to components{' '}
        <strong className="text-neutral-900 dark:text-neutral-100">imported from the design system package</strong>{' '}
        (e.g. <code className="rounded bg-neutral-100 px-1 font-mono text-xs dark:bg-neutral-800">@chghealthcare/unified-design-system</code>
        ), which re-exports them through <code className="rounded bg-neutral-100 px-1 font-mono text-xs dark:bg-neutral-800">uds-icons</code>
        — avoid importing <code className="rounded bg-neutral-100 px-1 font-mono text-xs dark:bg-neutral-800">@phosphor-icons/react</code>{' '}
        directly in consumers so a future icon library change is centralized.
      </p>
      <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-950">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">
          Related references
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-neutral-600 dark:text-neutral-400">
          <li>
            <strong className="text-neutral-800 dark:text-neutral-200">Menu component:</strong>{' '}
            <code className="font-mono text-xs">src/design-system/components/Menu/</code>
          </li>
          <li>
            <strong className="text-neutral-800 dark:text-neutral-200">Storybook:</strong> Menu stories load{' '}
            <code className="font-mono text-xs">connect</code> from this contract (
            <code className="font-mono text-xs">ConnectBrandMenuFromContract</code>).
          </li>
          <li>
            <strong className="text-neutral-800 dark:text-neutral-200">Package export:</strong>{' '}
            <code className="font-mono text-xs">@chghealthcare/unified-design-system/ai/navigation</code> →{' '}
            <code className="font-mono text-xs">brand-menus.json</code>
          </li>
        </ul>
        <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-500">
          When menus change, update <code className="font-mono">brand-menus.json</code> first, then align this doc if you want prose
          to stay in sync.
        </p>
      </div>
    </div>
  )
}

function AllBrandMenusPreview() {
  return (
    <div className="space-y-10">
      <BrandBlock
        id="brand-chg"
        title="chg"
        intro="Same menu structure as connect (Connect palette + Wireframe branding lockups)."
      >
        <TwoColTable rows={CONNECT_ITEMS} />
      </BrandBlock>

      <BrandBlock id="brand-comphealth" title="comphealth">
        <ThreeColTable rows={LOCUM_STYLE_ITEMS} />
      </BrandBlock>

      <BrandBlock
        id="brand-gms"
        title="gms"
        intro="Same menu structure as comphealth and weatherby (shared locum-style pattern)."
      >
        <ThreeColTable rows={LOCUM_STYLE_ITEMS} />
      </BrandBlock>

      <BrandBlock
        id="brand-weatherby"
        title="weatherby"
        intro="Same menu structure as comphealth and gms."
      >
        <ThreeColTable rows={LOCUM_STYLE_ITEMS} />
      </BrandBlock>

      <BrandBlock id="brand-locumsmart" title="locumsmart">
        <TwoColTable rows={LOCUMSMART_ITEMS} />
      </BrandBlock>

      <BrandBlock id="brand-modio" title="modio">
        <TwoColTable rows={MODIO_ITEMS} />
      </BrandBlock>

      <BrandBlock id="brand-careermd" title="careermd">
        <TwoColTable rows={CAREERMD_ITEMS} />
      </BrandBlock>

      <BrandBlock id="brand-connect" title="connect">
        <TwoColTable rows={CONNECT_ITEMS} />
      </BrandBlock>

      <BrandBlock
        id="brand-wireframe"
        title="wireframe"
        intro="Placeholder labels for layout / prototype work (no icons in contract)."
      >
        <div className={tableWrap}>
          <table className={tableBase}>
            <thead>
              <tr>
                <th className={th}>Label</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }, (_, i) => (
                <tr key={i}>
                  <td className={td}>Menu Item</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </BrandBlock>
    </div>
  )
}

const overviewCode = `// Source of truth (monorepo path may vary by package layout)
// src/ai/navigation/brand-menus.json
{
  "contractName": "uds.ai.brand-menus",
  "brands": {
    "chg": [ { "label": "Dashboard", "icon": "Layout" }, /* … */ ]
    // …
  }
}`

const menusCode = `// Map contract rows to app nav (pseudocode)
import { Icon } from '@chghealthcare/unified-design-system' // e.g. contract "Layout" → name="LayoutIcon"

menu.navItems = brandMenus.chg.map((item) => ({
  label: item.label,
  icon: () => <Icon name={resolveContractIconName(item.icon)} className="size-5" aria-hidden />,
  path: paths[item.label] ?? '/',
  children: item.children?.map(/* … */),
}))`

function sec(
  id: string,
  title: string,
  code: string,
  preview: DocSection['preview'],
  description?: string,
): DocSection {
  return { id, title, code, preview, description }
}

export function getBrandNavigationMenusSections(): DocSection[] {
  return [
    sec(
      'overview',
      'Contract & usage',
      overviewCode,
      <OverviewPreview />,
      'Source of truth: `src/ai/navigation/brand-menus.json` (`contractName`: `uds.ai.brand-menus`). Labels and Phosphor icon names only; apps add paths and handlers.',
    ),
    sec(
      'menus-by-brand',
      'Menus by brand',
      menusCode,
      <AllBrandMenusPreview />,
      'Primary sidebar entries per brand key in the AI contract.',
    ),
  ]
}
