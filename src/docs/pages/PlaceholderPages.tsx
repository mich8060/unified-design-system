import {
  CirclesThreeIcon,
  DiamondsFourIcon,
  GitBranchIcon,
  LightbulbIcon,
  PaletteIcon,
  PenNibIcon,
  SparkleIcon,
  SquaresFourIcon,
} from '@chg-ds/unified-design-system'
import { useCallback, useEffect, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  cn,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@chg-ds/unified-design-system'
import {
  DOCS_BRAND_OPTIONS,
  persistIntroPreviewBrand,
  readStoredIntroPreviewBrand,
  type DocsBrandId,
} from '../doc-site-brand'
import { getAllShadcnUiComponents } from '../shadcn-ui-registry'
import { WelcomeCardPreview } from '../welcome-card-preview'
import { DocShellLayoutVisuals } from './DocShellLayoutVisuals'
import { MarkdownishPage } from './MarkdownishPage'

const WELCOME_CARD_EXCLUDED_SLUGS = new Set(['header', 'footer'])

/** Matches `MarkdownishPage` + welcome `className` so header and body share one column. */
const WELCOME_PAGE_CONTAINER = 'mx-auto min-w-0 max-w-6xl px-8 lg:max-w-7xl'

const introH2 = 'text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50'
const introCard =
  'rounded-lg border border-neutral-200 bg-neutral-50/80 p-5 dark:border-neutral-800 dark:bg-neutral-950/60'
const introLead = 'mt-3 text-base leading-relaxed text-neutral-600 dark:text-neutral-300'
const previewThemeVars: CSSProperties = {
  '--background': 'var(--uds-surface-primary)',
  '--foreground': 'var(--uds-text-primary)',
  '--card': 'var(--uds-surface-primary)',
  '--card-foreground': 'var(--uds-text-primary)',
  '--popover': 'var(--uds-surface-primary)',
  '--popover-foreground': 'var(--uds-text-primary)',
  '--primary': 'var(--uds-color-primary-700)',
  '--primary-foreground': 'var(--uds-text-inverse)',
  '--secondary': 'var(--uds-surface-secondary)',
  '--secondary-foreground': 'var(--uds-text-primary)',
  '--muted': 'var(--uds-surface-secondary)',
  '--muted-foreground': 'var(--uds-text-secondary)',
  '--accent': 'var(--uds-surface-tertiary)',
  '--accent-foreground': 'var(--uds-text-primary)',
  '--border': 'var(--uds-border-primary)',
  '--input': 'var(--uds-border-primary)',
  '--ring': 'var(--uds-focus-ring-border)',
} as CSSProperties

function WelcomeComponentGrid({
  previewBrand,
  onPreviewBrandChange,
}: {
  previewBrand: DocsBrandId
  onPreviewBrandChange: (id: DocsBrandId) => void
}) {
  const items = getAllShadcnUiComponents().filter((e) => !WELCOME_CARD_EXCLUDED_SLUGS.has(e.slug))

  return (
    <div className="not-prose mt-10">
      <div className="sticky top-0 z-40 isolate -mx-2 mb-4 flex flex-col gap-4 border-b border-neutral-200 bg-white px-2 py-2 dark:border-neutral-800 dark:bg-neutral-950 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">Components</h2>
        <div className="flex w-full shrink-0 flex-col gap-1 sm:w-auto sm:min-w-[12rem]">
          <Select
            value={previewBrand}
            onValueChange={(v) => onPreviewBrandChange(v as DocsBrandId)}
          >
            <SelectTrigger id="intro-preview-brand-select" inputSize="sm" className="w-full shadow-none">
              <SelectValue placeholder="Brand" />
            </SelectTrigger>
            <SelectContent position="popper" align="end" className="min-w-[var(--radix-select-trigger-width)]">
              {DOCS_BRAND_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8">
        {items.map((c, i) => (
          <div
            key={c.slug}
            className={cn(
              'welcome-component-card relative block overflow-hidden rounded-[8px] border border-neutral-200 bg-white px-4 pb-4 pt-0',
              'dark:border-neutral-800 dark:bg-neutral-950',
            )}
            style={{ animationDelay: `${Math.min(i, 48) * 24}ms` }}
          >
            {/* Overlay link avoids nested <a> inside previews (e.g. BreadcrumbLink). */}
            <Link
              to={`/docs/components/${c.slug}`}
              className="absolute inset-0 z-10 rounded-[8px] focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 dark:focus-visible:ring-neutral-600"
              aria-label={`${c.name} component documentation`}
            />
            <div className="relative min-w-0">
              <div
                data-brand={previewBrand}
                className={cn('min-w-0', `brand-${previewBrand}`)}
                style={previewThemeVars}
              >
                <WelcomeCardPreview slug={c.slug} />
              </div>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">{c.name}</span>
              <span className="mt-1 block font-mono text-xs text-neutral-500 dark:text-neutral-400">{c.slug}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function useDocsRootDarkClass() {
  const [dark, setDark] = useState(
    () => typeof document !== 'undefined' && document.documentElement.classList.contains('dark'),
  )
  useEffect(() => {
    const el = document.documentElement
    const sync = () => setDark(el.classList.contains('dark'))
    sync()
    const obs = new MutationObserver(sync)
    obs.observe(el, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])
  return dark
}

function MenuDemoPreview() {
  const dark = useDocsRootDarkClass()
  const iframeSrc = `/menu-demo.html${dark ? '?dark=1' : ''}`

  return (
    <>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Demos load in an isolated frame so <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">fixed</code>{' '}
        layout is anchored to the preview viewport (375px wide; the rail is 280px or 64px wide × 100vh), not the documentation shell.
      </p>
      <div className="-mx-[162px] overflow-x-auto">
        <div className="mx-auto box-border w-[375px] max-w-full px-4 sm:px-6 lg:px-8">
          <iframe
            title="Menu component demo"
            className="my-6 box-border block h-[min(720px,85vh)] w-[375px] max-w-full rounded-[4px] border-2 border-neutral-200 bg-neutral-800 shadow-sm dark:border-neutral-700"
            src={iframeSrc}
            key={dark ? 'dark' : 'light'}
          />
        </div>
      </div>
    </>
  )
}

function AppShellDemoPreview() {
  const dark = useDocsRootDarkClass()
  const iframeSrc = `/app-shell-demo.html${dark ? '?dark=1' : ''}`

  return (
    <>
      <p>
        <strong className="text-neutral-900 dark:text-neutral-100">AppShell</strong> is the neutral application
        layout version of this pattern: a persistent sidebar, an optional listview column, a flexible main panel,
        and an optional footer row.
      </p>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        The interactive preview loads in an isolated frame (<code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">app-shell-demo.html</code>)
        so documentation-only styles do not affect the shell.         It uses the <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">AppShell</code>{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">menu</code> slot with{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">DocsRailMenu</code> (<code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">docs-rail-menu.tsx</code>) rail and{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">DocsRailMenu.Flyout</code> for Documents when the rail is
        collapsed. Theme follows this page (light/dark); toggling appearance reloads the frame.
      </p>

      {/* Break out of MarkdownishPage max-width; iframe matches prior 1280×800 preview plus in-frame controls. */}
      <div className="-mx-[162px] overflow-x-auto">
        <div className="mx-auto box-border w-[1280px] max-w-full px-4 sm:px-6 lg:px-8">
          <iframe
            title="AppShell interactive demo"
            className="my-12 box-border block h-[920px] w-[1280px] max-w-full rounded-[8px] border-2 border-black shadow-xl shadow-neutral-900/10 dark:shadow-2xl dark:shadow-black/35"
            src={iframeSrc}
            key={dark ? 'dark' : 'light'}
          />
        </div>
      </div>

      <pre className="mt-4 overflow-x-auto rounded-[4px] bg-neutral-950 p-4 text-sm text-neutral-100">
        <code>{`<AppShell
  sidebarWidth={sidebarExpanded ? 280 : 72}
  showListview={showListview}
  showFooter={showFooter}
  listviewWidth={320}
  footerHeight={32}
  menu={<SidebarProvider>…<Sidebar><DocsRailMenu.Root>…</DocsRailMenu.Root></Sidebar></SidebarProvider>}
  listview={<Listview />}
  footer={<Footer />}
>
  <Main />
</AppShell>`}</code>
      </pre>
    </>
  )
}

export function InstallPage() {
  return (
    <MarkdownishPage kicker="Getting Started" title="Install">
      <p>
        Install the package, add the stylesheet import once, and then consume components from the root
        package export.
      </p>
      <pre className="mt-4 overflow-x-auto rounded-[4px] bg-neutral-950 p-4 text-sm text-neutral-100">
        <code>{`npm install @chg-ds/unified-design-system react react-dom

// app entry
import "@chg-ds/unified-design-system/styles.css"`}</code>
      </pre>
    </MarkdownishPage>
  )
}

export function DocShellLayoutPage() {
  return (
    <MarkdownishPage kicker="Getting Started" title="DocShell layout">
      <p>
        <strong className="text-neutral-900 dark:text-neutral-100">DocShell</strong> is the documentation chrome
        in this project: a fixed left sidebar, optional flyout menus when the sidebar is narrow, and a main column
        that renders the active route via React Router&apos;s <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">Outlet</code>.
        Source: <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">src/docs/layout/DocShell.tsx</code>.
      </p>

      <DocShellLayoutVisuals />

      <h2 className="pt-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100">Regions</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-neutral-900 dark:text-neutral-100">Sidebar</strong> — primary navigation,
          brand controls, and footer actions. Width animates between expanded and collapsed presets.
        </li>
        <li>
          <strong className="text-neutral-900 dark:text-neutral-100">Main</strong> — the page body; left padding
          matches the sidebar width so content does not sit under the fixed rail.
        </li>
        <li>
          <strong className="text-neutral-900 dark:text-neutral-100">Listview</strong> — an optional secondary
          pane for search results, records, or filters. Remove it with{' '}
          <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">showListview=&#123;false&#125;</code>.
        </li>
        <li>
          <strong className="text-neutral-900 dark:text-neutral-100">Footer</strong> — an optional action or
          status row below main content. Remove it with{' '}
          <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">showFooter=&#123;false&#125;</code>.
        </li>
        <li>
          <strong className="text-neutral-900 dark:text-neutral-100">Rail flyout</strong> (collapsed only) — a
          fixed panel beside the rail that lists links for the section you opened (Getting Started, Foundations, or
          Components). Dismiss with Escape, resize, the backdrop, or after following a link.
        </li>
      </ul>

      <h2 className="pt-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100">Expanded sidebar (~280px)</h2>
      <p>In this mode the sidebar is wide enough for labels and nested links.</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-neutral-900 dark:text-neutral-100">Header (64px tall)</strong> — list icon to
          collapse the rail;{' '}
          <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">Branding</code> wordmark centered in the
          full header width (links home). Wordmark uses{' '}
          <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">wordmarkAlign=&quot;center&quot;</code>.
        </li>
        <li>
          <strong className="text-neutral-900 dark:text-neutral-100">Brand</strong> — select maps to{' '}
          <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">data-brand</code> on{' '}
          <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">&lt;html&gt;</code>, persists in{' '}
          <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">localStorage</code>, and drives both CSS
          tokens and the header logo appearance.
        </li>
        <li>
          <strong className="text-neutral-900 dark:text-neutral-100">Navigation</strong> — three disclosure
          sections (Getting Started, Foundations, Components) with sticky section headers and child{' '}
          <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">NavLink</code>s.
        </li>
        <li>
          <strong className="text-neutral-900 dark:text-neutral-100">Footer</strong> — light/dark switch (toggles
          the <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">dark</code> class on the root element),
          and an account/control cluster (avatar + menu) when expanded.
        </li>
      </ul>

      <h2 className="pt-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100">Collapsed rail (~72px)</h2>
      <p>
        A minimal strip to save horizontal space. The document root gets a named group (
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">group/collapsed-rail</code>) so hover
        interactions can target the whole rail.
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-neutral-900 dark:text-neutral-100">Header</strong> — 36×36 brand mark centered;
          hovering the rail (or focusing the expand control) fades the mark out and fades in a centered expand
          button.
        </li>
        <li>
          <strong className="text-neutral-900 dark:text-neutral-100">Section triggers</strong> — three 48×48px
          square icon buttons (4px corner radius) open the flyout for that section.
        </li>
        <li>
          <strong className="text-neutral-900 dark:text-neutral-100">Brand &amp; long nav lists</strong> — hidden in
          this mode; use the flyout or expand the sidebar again.
        </li>
        <li>
          <strong className="text-neutral-900 dark:text-neutral-100">Footer</strong> — theme toggle remains;
          account block compacts to a centered avatar when space is tight.
        </li>
      </ul>

      <h2 className="pt-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100">Behavior notes</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          Sidebar width constants live in DocShell (
          <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">SIDEBAR_EXPANDED_PX</code>,{' '}
          <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">SIDEBAR_MINIMIZED_PX</code>).
        </li>
        <li>
          Expanding the sidebar closes any open flyout so panels do not drift with stale coordinates.
        </li>
        <li>
          Doc routes are declared in <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">src/docs/App.tsx</code>;
          anything under <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">DocShell</code> shares
          this layout automatically.
        </li>
      </ul>
    </MarkdownishPage>
  )
}

export function MenuPage() {
  return (
    <MarkdownishPage kicker="Getting Started" title="Menu">
      <p>
        <strong className="text-neutral-900 dark:text-neutral-100">Menu</strong> is a standalone package primitive in{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">src/components/ui/menu.tsx</code>. It must not depend on{' '}
        <strong className="text-neutral-900 dark:text-neutral-100">Sidebar</strong>,{' '}
        <strong className="text-neutral-900 dark:text-neutral-100">DropdownMenu</strong>,{' '}
        <strong className="text-neutral-900 dark:text-neutral-100">NavigationMenu</strong>,{' '}
        <strong className="text-neutral-900 dark:text-neutral-100">Menubar</strong>, or other library menu stacks—only React,
        tokens/utilities, and this file.
      </p>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Doc shell rail UI remains <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">DocsRailMenu</code> (
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">src/docs/layout/docs-rail-menu.tsx</code>); it is
        unrelated to this component.
      </p>

      <h2 className="pt-6 text-lg font-semibold text-neutral-900 dark:text-neutral-100">Live preview</h2>
      <div className="not-prose">
        <MenuDemoPreview />
      </div>

      <p className="mt-6 text-sm text-neutral-600 dark:text-neutral-400">
        Import the stylesheet once, define your tree as data, and pass it to{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">navigationItems</code> on{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">Menu</code>:
      </p>
      <pre className="mt-3 overflow-x-auto rounded-[4px] bg-neutral-950 p-4 text-sm text-neutral-100">
        <code>{`import "@chg-ds/unified-design-system/styles.css"
import { LayoutIcon, Menu } from "@chg-ds/unified-design-system"

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutIcon },
  // …Requests → BriefcaseIcon, Providers → UsersIcon, etc.
] as const

export function ApplicationMenu() {
  return <Menu navigationItems={NAV_ITEMS} />
}`}</code>
      </pre>

      <p className="mt-6 text-sm text-neutral-600 dark:text-neutral-400">
        App rails usually add <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">defaultExpanded</code>,{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">aria-label</code>,{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">header</code> (with{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">useMenuRail</code> for the list toggle),{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">workspace</code>,{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">activeId</code> /{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">onNavigationSelect</code>, and{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">tail</code> (utilities + account). By default, workspace,
        navigation, and tail render only while the rail is expanded unless you set{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">mainOnlyWhenExpanded=false</code>. See{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">menu-demo-main.tsx</code> for a full example; for manual
        composition use <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">Menu.Root</code> and{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">Menu.Navigation</code>.
      </p>
      <pre className="mt-3 overflow-x-auto rounded-[4px] bg-neutral-950 p-4 text-sm text-neutral-100">
        <code>{`import { useState } from "react"
import { Branding, Button, LayoutIcon, ListIcon, Menu, useMenuRail } from "@chg-ds/unified-design-system"

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutIcon },
  // …
] as const

function MenuRailHeader() {
  const { expanded, toggleExpanded } = useMenuRail()
  return (
    <Menu.Header>
      {/* Branding + list Button → toggleExpanded */}
    </Menu.Header>
  )
}

export function ApplicationMenu() {
  const [workspace, setWorkspace] = useState("clinical")
  const [activeNavId, setActiveNavId] = useState(NAV_ITEMS[0].id)
  return (
    <Menu
      defaultExpanded
      aria-label="Application menu"
      navigationItems={NAV_ITEMS}
      navigationProps={{ "aria-label": "Primary navigation" }}
      activeId={activeNavId}
      onNavigationSelect={(id) => setActiveNavId(id)}
      workspace={{
        options: [{ value: "clinical", label: "Clinical workspace" }],
        value: workspace,
        onWorkspaceChange: setWorkspace,
        "aria-label": "Workspace",
      }}
      header={<MenuRailHeader />}
      tail={
        <Menu.Utilities>…</Menu.Utilities>
      }
    />
  )
}`}</code>
      </pre>
    </MarkdownishPage>
  )
}

export function AppShellDemoPage() {
  return (
    <MarkdownishPage kicker="Getting Started" title="AppShell demo">
      <p>
        This page demonstrates the baseline application shell for product screens: narrow navigation rail,
        optional listview, wide content area, and optional footer.
      </p>

      <AppShellDemoPreview />

      <h2 className="pt-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100">When to use it</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>Keep the sidebar present when navigation must remain visible across most authenticated screens.</li>
        <li>Enable the listview for master-detail flows like records, inboxes, queues, and search results.</li>
        <li>Enable the footer when you need persistent actions, summary state, or workflow controls.</li>
      </ul>
    </MarkdownishPage>
  )
}

function PatternsDashboardPreview() {
  const dark = useDocsRootDarkClass()
  const iframeSrc = `/patterns-dashboard.html${dark ? '?dark=1' : ''}`

  return (
    <div className="overflow-x-auto">
      <iframe
        title="Dashboard pattern preview"
        className="my-12 box-border block h-[820px] w-full max-w-[1600px] rounded-[4px] border-2 border-black shadow-xl shadow-neutral-900/10 dark:shadow-2xl dark:shadow-black/35"
        src={iframeSrc}
        key={dark ? 'dark' : 'light'}
      />
    </div>
  )
}

export function PatternsDashboardPage() {
  return (
    <MarkdownishPage
      kicker="Patterns"
      title="Dashboard"
      className="max-w-[1664px] lg:max-w-[1664px]"
    >
      <p>
        Example authenticated dashboard using{' '}
        <strong className="text-neutral-900 dark:text-neutral-100">AppShell</strong> with a{' '}
        <strong className="text-neutral-900 dark:text-neutral-100">DocsRailMenu</strong> rail and KPI cards in the main region. The
        preview loads from{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">patterns-dashboard.html</code> so it stays isolated
        from documentation chrome; theme follows this page.
      </p>
      <PatternsDashboardPreview />
    </MarkdownishPage>
  )
}

export function WelcomePage() {
  const [introPreviewBrand, setIntroPreviewBrand] = useState<DocsBrandId>(() => readStoredIntroPreviewBrand())

  const handleIntroPreviewBrand = useCallback((id: DocsBrandId) => {
    setIntroPreviewBrand(id)
    persistIntroPreviewBrand(id)
  }, [])

  return (
    <div className="min-w-0">
      <header className="relative w-full overflow-hidden border-b border-[color-mix(in_srgb,var(--uds-color-primary-900)_45%,transparent)] bg-[var(--uds-color-primary-700)]">
        <div className={cn(WELCOME_PAGE_CONTAINER, 'relative py-20')}>
          <DiamondsFourIcon
            aria-hidden
            weight="duotone"
            className="welcome-header-icon-flux pointer-events-none absolute right-0 top-1/2 z-0 size-[min(36rem,110vw)] translate-x-[min(22vw,10rem)] -translate-y-1/2 rotate-[-10deg] text-white"
            style={{ '--welcome-header-icon-flux-base': '0.07', animationDelay: '0s' }}
          />
          {/* Distant marks — further left than the inner trio; sizes & rotations vary. */}
          <CirclesThreeIcon
            aria-hidden
            weight="duotone"
            className="welcome-header-icon-flux pointer-events-none absolute right-[min(44rem,68%)] top-[calc(50%-120px)] z-[1] size-[44px] -translate-y-1/2 rotate-[20deg] text-white max-md:right-[78%] max-md:top-[calc(50%-90px)] max-md:size-8"
            style={{ '--welcome-header-icon-flux-base': '0.055', animationDelay: '0.35s' }}
          />
          <PenNibIcon
            aria-hidden
            weight="duotone"
            className="welcome-header-icon-flux pointer-events-none absolute right-[min(52rem,76%)] top-[calc(50%+55px)] z-[1] size-[52px] -translate-y-1/2 -rotate-[17deg] text-white max-md:right-[88%] max-md:size-9"
            style={{ '--welcome-header-icon-flux-base': '0.05', animationDelay: '0.7s' }}
          />
          <LightbulbIcon
            aria-hidden
            weight="duotone"
            className="welcome-header-icon-flux pointer-events-none absolute right-[min(34rem,46%)] top-[calc(50%+175px)] z-[1] size-[32px] -translate-y-1/2 rotate-[11deg] text-white max-md:right-[58%] max-md:top-[calc(50%+140px)]"
            style={{ '--welcome-header-icon-flux-base': '0.065', animationDelay: '1.05s' }}
          />
          <GitBranchIcon
            aria-hidden
            weight="duotone"
            className="welcome-header-icon-flux pointer-events-none absolute right-[min(58rem,82%)] top-[calc(50%-35px)] z-[1] size-[72px] -translate-y-1/2 -rotate-[26deg] text-white max-md:hidden"
            style={{ '--welcome-header-icon-flux-base': '0.045', animationDelay: '1.4s' }}
          />
          <SparkleIcon
            aria-hidden
            weight="duotone"
            className="welcome-header-icon-flux pointer-events-none absolute right-[400px] top-[calc(50%-50px)] z-[1] size-[60px] -translate-y-1/2 text-white"
            style={{ '--welcome-header-icon-flux-base': '0.07', animationDelay: '0.5s' }}
          />
          <PaletteIcon
            aria-hidden
            weight="duotone"
            className="welcome-header-icon-flux pointer-events-none absolute right-[350px] top-[calc(50%+120px)] z-[1] size-[60px] -translate-y-1/2 text-white"
            style={{ '--welcome-header-icon-flux-base': '0.07', animationDelay: '0.85s' }}
          />
          <SquaresFourIcon
            aria-hidden
            weight="duotone"
            className="welcome-header-icon-flux pointer-events-none absolute right-[350px] top-[calc(50%+120px)] z-[1] size-[60px] -translate-y-1/2 translate-x-[480px] text-white"
            style={{ '--welcome-header-icon-flux-base': '0.07', animationDelay: '1.2s' }}
          />
          <div className="relative z-10">
            <h1 className="text-4xl font-bold tracking-tight text-white">Introduction</h1>
            <p className="mt-4 max-w-3xl text-lg font-medium text-white/90">
              A unified design system that enables teams to build consistent, scalable, and production-ready experiences
              across all CHG products.
            </p>
            <p className="mt-6 max-w-3xl text-base text-white/85">
              Build once, ship everywhere{' '}
              <span className="select-none text-white/45" aria-hidden>
                •
              </span>{' '}
              Faster time to market{' '}
              <span className="select-none text-white/45" aria-hidden>
                •
              </span>{' '}
              Consistent, accessible experiences
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="outline" size="default">
                <Link to="/docs/getting-started/install">Quick start — Install</Link>
              </Button>
              <Button asChild variant="ghost" size="default" className="border border-white/25 bg-white/10 text-white hover:bg-white/20">
                <Link to="/docs/getting-started/usage">Usage</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <article className={cn(WELCOME_PAGE_CONTAINER, 'py-10')}>
        <div className="not-prose space-y-16 text-neutral-700 dark:text-neutral-300">
          <section aria-labelledby="intro-audience">
            <h2 id="intro-audience" className={introH2}>
              Who it&apos;s for
            </h2>
            <p className={introLead}>Different roles enter from different doors—each should find a clear path.</p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className={introCard}>
                <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Designers</p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  Build and prototype with shared components and tokens so specs match what ships.
                </p>
              </div>
              <div className={introCard}>
                <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Engineers</p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  Import production-ready React components and a single stylesheet; compose with AppShell for product
                  screens.
                </p>
              </div>
              <div className={introCard}>
                <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Product managers</p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  Align teams on consistent UX patterns, maturity, and scope instead of one-off widgets.
                </p>
              </div>
            </div>
          </section>

          <section aria-labelledby="intro-principles">
            <h2 id="intro-principles" className={introH2}>
              Principles
            </h2>
            <p className={introLead}>When documentation is silent, these defaults steer decisions.</p>
            <ul className="mt-6 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {[
                ['System over screens', 'Optimize for reusable systems, not one-off layouts.'],
                ['Build once, reuse everywhere', 'Prefer shared components and tokens over local forks.'],
                ['Code and design stay in sync', 'If it is not represented in the package contract, it is not canonical.'],
                ['Constrain to scale', 'Opinionated defaults reduce decision fatigue as teams grow.'],
                ['Speed through consistency', 'Predictable patterns beat bespoke chrome for delivery speed.'],
              ].map(([title, body]) => (
                <li key={title} className={introCard}>
                  <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{body}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-16 border-t border-neutral-200 pt-12 dark:border-neutral-800">
          <WelcomeComponentGrid previewBrand={introPreviewBrand} onPreviewBrandChange={handleIntroPreviewBrand} />
        </div>

        <section
          aria-labelledby="intro-contribute"
          className="not-prose mt-16 border-t border-neutral-200 pt-12 text-neutral-700 dark:border-neutral-800 dark:text-neutral-300"
        >
          <h2 id="intro-contribute" className={introH2}>
            Contribution &amp; ownership
          </h2>
          <p className={introLead}>
            The Design System team owns governance, prioritization, and release quality. Everyone else contributes through
            structured requests and reviews.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>Raise new component or pattern needs through your product design partner or engineering lead.</li>
            <li>Propose contributions with usage evidence, accessibility notes, and tests where applicable.</li>
            <li>Expect changes to flow through package versioning so downstream apps stay predictable.</li>
          </ul>
        </section>

        <p className="mt-10 text-sm">
          <Link to="/docs/getting-started/install" className="docs-link font-medium">
            Getting started →
          </Link>
        </p>
      </article>
    </div>
  )
}

export function UsagePage() {
  return (
    <MarkdownishPage kicker="Getting Started" title="Usage">
      <p>
        Each component page shows a live preview plus copy-ready imports that match the package contract:
        root component exports and a single stylesheet import.
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-5">
        <li>Use <strong className="text-neutral-900 dark:text-neutral-100">Foundations</strong> in the sidebar to jump between topics.</li>
        <li>Cross-check naming and options on{' '}
          <a href="https://tailwindcss.com/docs" className="docs-link font-medium" target="_blank" rel="noreferrer">tailwindcss.com/docs</a>.
        </li>
        <li>Import <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">@chg-ds/unified-design-system/styles.css</code> once near your app root.</li>
      </ul>
    </MarkdownishPage>
  )
}
