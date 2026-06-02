import {
  ArrowClockwiseIcon,
  Button,
  CirclesThreeIcon,
  cn,
  DiamondsFourIcon,
  GearSixIcon,
  GitBranchIcon,
  LightbulbIcon,
  Medallion,
  PaletteIcon,
  PenNibIcon,
  PresentationChartIcon,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SparkleIcon,
  SquaresFourIcon,
  StackIcon,
  type MedallionColor,
} from '@chghealthcare/unified-design-system'
import { useCallback, useEffect, useLayoutEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  DOCS_BRAND_OPTIONS,
  persistIntroPreviewBrand,
  readStoredIntroPreviewBrand,
  type DocsBrandId,
} from '../doc-site-brand'
import {
  docPageHeroBandClassName,
  docPageHeroColumnNarrowClassName,
  docPageHeroColumnWideClassName,
  docPageHeroShellClassName,
  docPageHorizontalGutterClassName,
} from '../doc-page-hero-classes'
import { useShadcnDocsRegistry } from '../registry'
import { WelcomeCardPreview } from '../welcome-card-preview'
import { CodePanel } from '../components/CodePanel'
import { DocShellLayoutVisuals } from './DocShellLayoutVisuals'
import { MarkdownishPage } from './MarkdownishPage'

const WELCOME_CARD_EXCLUDED_SLUGS = new Set(['header', 'footer'])

/** Custom property used by `.welcome-header-icon-flux` in docs CSS (not in React's CSSProperties index). */
function welcomeHeaderFluxStyle(fluxBase: string, animationDelay: string): CSSProperties {
  return {
    '--welcome-header-icon-flux-base': fluxBase,
    animationDelay,
  } as CSSProperties
}

/** Welcome page article column (below the hero); wider than `MarkdownishPage` prose. */
const WELCOME_PAGE_COLUMN = 'mx-auto min-w-0 max-w-6xl lg:max-w-7xl'

const introH2 = 'text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50'
const introCard =
  'rounded-[12px] border border-neutral-200 bg-neutral-50/80 p-5 dark:border-neutral-800 dark:bg-neutral-950/60'
const introLead = 'mt-3 text-base leading-relaxed text-neutral-600 dark:text-neutral-300'
const introPrincipleCard =
  'flex min-w-0 flex-1 basis-0 flex-col items-center rounded-[12px] border border-neutral-200/90 bg-gradient-to-b from-white to-neutral-50/90 px-3 py-6 text-center shadow-sm dark:border-neutral-700/90 dark:from-neutral-950 dark:to-neutral-900/80 sm:px-4 sm:py-7'
const INTRO_PRINCIPLES: {
  title: string
  body: string
  color: MedallionColor
  icon: ReactNode
}[] = [
  {
    title: 'System over screens',
    body: 'Optimize for reusable systems, not one-off layouts.',
    color: 'sky',
    icon: <StackIcon weight="bold" aria-hidden />,
  },
  {
    title: 'Build once, reuse everywhere',
    body: 'Prefer shared components and tokens over local forks.',
    color: 'blue',
    icon: <ArrowClockwiseIcon weight="bold" aria-hidden />,
  },
  {
    title: 'Code and design stay in sync',
    body: 'If it is not represented in the package contract, it is not canonical.',
    color: 'cyan',
    icon: <GitBranchIcon weight="bold" aria-hidden />,
  },
  {
    title: 'Constrain to scale',
    body: 'Opinionated defaults reduce decision fatigue as teams grow.',
    color: 'indigo',
    icon: <GearSixIcon weight="bold" aria-hidden />,
  },
  {
    title: 'Speed through consistency',
    body: 'Predictable patterns beat bespoke chrome for delivery speed.',
    color: 'violet',
    icon: <PresentationChartIcon weight="bold" aria-hidden />,
  },
]
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
  const { getAllShadcnUiComponents } = useShadcnDocsRegistry()
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
              'welcome-component-card relative block overflow-hidden rounded-[12px] border border-neutral-200 bg-white px-4 pb-4 pt-0',
              'dark:border-neutral-800 dark:bg-neutral-950',
            )}
            style={{ animationDelay: `${Math.min(i, 48) * 24}ms` }}
          >
            {/* Overlay link avoids nested <a> inside previews (e.g. BreadcrumbLink). */}
            <Link
              to={`/docs/components/${c.slug}`}
              className="absolute inset-0 z-10 rounded-[12px] focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 dark:focus-visible:ring-neutral-600"
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
      <div className="w-full min-w-0">
        <div className="mx-auto box-border w-full max-w-[375px] px-4 sm:px-6 lg:px-8">
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

/** Matches `MarkdownishPage` text column; use inside a full-width article when only the demo is 1280px. */
const DOC_PAGE_TEXT_COLUMN = 'mx-auto min-w-0 max-w-4xl lg:max-w-5xl'

function AppShellDemoIframe() {
  const dark = useDocsRootDarkClass()
  const iframeSrc = `/app-shell-demo.html${dark ? '?dark=1' : ''}`

  return (
    <div className="not-prose mx-auto w-full max-w-[1280px] px-8">
      <iframe
        title="AppShell interactive demo"
        className="my-12 box-border block h-[min(920px,85vh)] w-full max-w-full rounded-[8px] border-2 border-black shadow-xl shadow-neutral-900/10 dark:shadow-2xl dark:shadow-black/35"
        src={iframeSrc}
        key={dark ? 'dark' : 'light'}
      />
    </div>
  )
}

export function InstallPage() {
  return (
    <MarkdownishPage kicker="Getting Started" title="Install">
      <p>
        Add the published package to a React app, wire the design-system stylesheet once at the root, and import
        components from the package entry. This page covers prerequisites, install commands, and what gets shipped in
        the tarball.
      </p>

      <h2 className="pt-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">Prerequisites</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-600 dark:text-neutral-300">
        <li>
          <strong className="text-neutral-900 dark:text-neutral-100">React 19</strong> — peer dependencies are{' '}
          <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">react</code> and{' '}
          <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">react-dom</code> at{' '}
          <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">^19.0.0</code>. Align your app before
          installing.
        </li>
        <li>
          <strong className="text-neutral-900 dark:text-neutral-100">Node</strong> — use a current LTS (for example
          Node 22.x) for local dev and CI so tooling matches the ecosystem this library is built with.
        </li>
        <li>
          <strong className="text-neutral-900 dark:text-neutral-100">Bundler</strong> — Vite, webpack, or other
          modern ESM-aware bundlers work. The package exposes ESM and CJS builds plus a single aggregated{' '}
          <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">styles.css</code>.
        </li>
      </ul>

      <h2 className="pt-6 text-lg font-semibold text-neutral-900 dark:text-neutral-100">Install the package</h2>
      <p className="mt-3 text-neutral-600 dark:text-neutral-300">
        The design system is distributed as a versioned tarball (a{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">.tgz</code> produced by{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">npm pack</code>), not from a public registry
        or CDN. Place the tarball in your repository and install it from the local path. You still declare{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">react</code> and{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">react-dom</code> in your app; they are not bundled
        inside the design system.
      </p>
      <div className="mt-4 space-y-4">
        <CodePanel
          label="npm"
          language="bash"
          code={`npm install ./vendor/chghealthcare-unified-design-system-1.0.5.tgz`}
        />
        <CodePanel
          label="pnpm"
          language="bash"
          code={`pnpm add ./vendor/chghealthcare-unified-design-system-1.0.5.tgz`}
        />
        <CodePanel
          label="yarn"
          language="bash"
          code={`yarn add ./vendor/chghealthcare-unified-design-system-1.0.5.tgz`}
        />
      </div>
      <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
        Reference the tarball with a <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">file:</code>{' '}
        dependency in <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">package.json</code> so every
        install resolves the same committed artifact:
      </p>
      <CodePanel
        label="package.json"
        language="json"
        code={`{
  "dependencies": {
    "@chghealthcare/unified-design-system": "file:./vendor/chghealthcare-unified-design-system-1.0.5.tgz"
  }
}`}
      />
      <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
        Maintainers produce the tarball with <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">npm run build:lib</code>{' '}
        then <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">npm pack</code>; the filename is derived
        from the package name and version.
      </p>

      <h2 className="pt-6 text-lg font-semibold text-neutral-900 dark:text-neutral-100">Add global styles</h2>
      <p className="mt-3 text-neutral-600 dark:text-neutral-300">
        Import the stylesheet exactly once, as early as possible (for example your app entry or root layout). It
        registers design tokens, component styles, and Tailwind v4–oriented utilities the components expect. Without
        it, layout and controls will look unstyled.
      </p>
      <CodePanel
        label="App entry (e.g. main.tsx)"
        language="tsx"
        code={`import "@chghealthcare/unified-design-system/styles.css"`}
      />
      <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
        The package marks CSS as side-effectful so bundlers do not drop the import during tree-shaking.
      </p>

      <h2 className="pt-6 text-lg font-semibold text-neutral-900 dark:text-neutral-100">What you get on disk</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-600 dark:text-neutral-300">
        <li>
          <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">dist/index.js</code> /{' '}
          <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">dist/index.cjs</code> — component and
          helper exports.
        </li>
        <li>
          <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">dist/styles.css</code> — the stylesheet
          you import as <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">@chghealthcare/unified-design-system/styles.css</code>.
        </li>
        <li>
          <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">dist/*.d.ts</code> — TypeScript types for
          the public API.
        </li>
      </ul>

      <h2 className="pt-6 text-lg font-semibold text-neutral-900 dark:text-neutral-100">Verify</h2>
      <p className="mt-3 text-neutral-600 dark:text-neutral-300">
        After installing, render any primitive (for example a button) and confirm tokens apply. If styles are missing,
        double-check the stylesheet import path and that only one copy of React is resolved.
      </p>
      <CodePanel
        label="Smoke test"
        language="tsx"
        code={`import { Button } from "@chghealthcare/unified-design-system"
import "@chghealthcare/unified-design-system/styles.css"

export function Smoke() {
  return <Button type="button">Hello UDS</Button>
}`}
      />

      <h2 className="pt-6 text-lg font-semibold text-neutral-900 dark:text-neutral-100">Next steps</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-600 dark:text-neutral-300">
        <li>
          <Link to="/docs/getting-started/usage" className="docs-link font-medium">
            Usage
          </Link>{' '}
          — import patterns, shell layout, and how to read these docs.
        </li>
        <li>
          <Link to="/docs/getting-started/app-shell" className="docs-link font-medium">
            AppShell
          </Link>{' '}
          — authenticated product layout with menu, header, and optional listview.
        </li>
      </ul>
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
        <code>{`import "@chghealthcare/unified-design-system/styles.css"
import { LayoutIcon, Menu } from "@chghealthcare/unified-design-system"

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
import { LayoutIcon, Menu } from "@chghealthcare/unified-design-system"

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutIcon },
  // …
] as const

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
    <div className="min-w-0 overflow-x-hidden">
      <header className={docPageHeroBandClassName}>
        <div className={docPageHeroShellClassName}>
          <div className={docPageHeroColumnNarrowClassName}>
            <p className="text-sm font-medium text-white/75">Getting Started</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-white md:text-4xl">AppShell demo</h1>
          </div>
        </div>
      </header>

      <article className={docPageHorizontalGutterClassName}>
      <div className={cn(DOC_PAGE_TEXT_COLUMN, 'mt-8 space-y-4 text-neutral-600 dark:text-neutral-300')}>
        <p>
          This page demonstrates the baseline application shell for product screens: a standardized{' '}
          <strong className="text-neutral-900 dark:text-neutral-100">Menu</strong> rail (fixed header with collapse
          control + branding), optional listview, wide content area, and optional footer.
        </p>
        <p>
          <strong className="text-neutral-900 dark:text-neutral-100">AppShell</strong> is the neutral application
          layout version of this pattern: a persistent sidebar, an optional listview column, a flexible main panel,
          and an optional footer row.
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          The interactive preview loads in an isolated frame (
          <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">app-shell-demo.html</code>) so
          documentation-only styles do not affect the shell. It uses the{' '}
          <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">AppShell</code>{' '}
          <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">menu</code> slot with{' '}
          <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">DocsRailMenu</code> (
          <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">docs-rail-menu.tsx</code>) rail and{' '}
          <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">DocsRailMenu.Flyout</code> for Documents when
          the rail is collapsed. Theme follows this page (light/dark); toggling appearance reloads the frame.
        </p>
      </div>

      <AppShellDemoIframe />

      <div className={cn(DOC_PAGE_TEXT_COLUMN, 'mt-8 space-y-4 text-neutral-600 dark:text-neutral-300')}>
        <CodePanel
          code={`<AppShell>
  <AppShell.Menu>
    <Menu />
  </AppShell.Menu>
  <AppShell.Header>
    <HeaderActions />
  </AppShell.Header>
  <AppShell.Listview>
    {showListview ? <Listview /> : undefined}
  </AppShell.Listview>
  <AppShell.Main>
    <Main />
  </AppShell.Main>
  <AppShell.Footer>
    <Footer />
  </AppShell.Footer>
</AppShell>`}
          label="AppShell composition"
          language="tsx"
        />

        <h2 className="pt-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100">When to use it</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Keep the sidebar present when navigation must remain visible across most authenticated screens.</li>
          <li>Enable the listview for master-detail flows like records, inboxes, queues, and search results.</li>
          <li>Enable the footer when you need persistent actions, summary state, or workflow controls.</li>
        </ul>
      </div>

      <p className={cn(DOC_PAGE_TEXT_COLUMN, 'mt-10 text-sm')}>
        <Link to="/docs/foundations/display" className="docs-link font-medium">
          Browse foundations →
        </Link>
      </p>
      </article>
    </div>
  )
}

function PatternsDashboardPreview() {
  const dark = useDocsRootDarkClass()
  const iframeSrc = `/patterns-dashboard.html${dark ? '?dark=1' : ''}`

  return (
    <div className="not-prose min-w-0">
      <iframe
        title="Dashboard pattern preview"
        className="my-12 box-border block h-[min(820px,85vh)] w-full max-w-full rounded-[4px] border-2 border-black shadow-xl shadow-neutral-900/10 dark:shadow-2xl dark:shadow-black/35"
        src={iframeSrc}
        key={dark ? 'dark' : 'light'}
      />
    </div>
  )
}

export function PatternsDashboardPage() {
  return (
    <MarkdownishPage kicker="Patterns" title="Dashboard" className="max-w-[1280px] lg:max-w-[1280px]">
      <p>
        Example authenticated dashboard using{' '}
        <strong className="text-neutral-900 dark:text-neutral-100">AppShell</strong> with a{' '}
        <strong className="text-neutral-900 dark:text-neutral-100">Menu</strong> rail (with the default
        collapse-toggle + branding header) and KPI cards in the main region. The preview loads from{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">patterns-dashboard.html</code> so it stays isolated
        from documentation chrome; theme follows this page.
      </p>
      <PatternsDashboardPreview />
    </MarkdownishPage>
  )
}

function resetDocsMainScrollTop() {
  const el = document.querySelector('[data-slot="appshell"] .appshell--main')
  if (el) {
    el.scrollTop = 0
  }
}

export function WelcomePage() {
  const [introPreviewBrand, setIntroPreviewBrand] = useState<DocsBrandId>(() => readStoredIntroPreviewBrand())

  const handleIntroPreviewBrand = useCallback((id: DocsBrandId) => {
    setIntroPreviewBrand(id)
    persistIntroPreviewBrand(id)
  }, [])

  useLayoutEffect(() => {
    resetDocsMainScrollTop()
    const id = requestAnimationFrame(() => {
      resetDocsMainScrollTop()
      requestAnimationFrame(resetDocsMainScrollTop)
    })
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div className="min-w-0 overflow-x-hidden">
      <header className={docPageHeroBandClassName}>
        <div className={docPageHeroShellClassName}>
          <DiamondsFourIcon
            aria-hidden
            weight="duotone"
            className="welcome-header-icon-flux pointer-events-none absolute right-0 top-1/2 z-0 size-[min(36rem,110vw)] translate-x-[min(22vw,10rem)] -translate-y-1/2 rotate-[-10deg] text-white"
            style={welcomeHeaderFluxStyle('0.07', '0s')}
          />
          {/* Distant marks — further left than the inner trio; sizes & rotations vary. */}
          <CirclesThreeIcon
            aria-hidden
            weight="duotone"
            className="welcome-header-icon-flux pointer-events-none absolute right-[min(44rem,68%)] top-[calc(50%-120px)] z-[1] size-[44px] -translate-y-1/2 rotate-[20deg] text-white max-md:right-[78%] max-md:top-[calc(50%-90px)] max-md:size-8"
            style={welcomeHeaderFluxStyle('0.055', '0.35s')}
          />
          <PenNibIcon
            aria-hidden
            weight="duotone"
            className="welcome-header-icon-flux pointer-events-none absolute right-[min(52rem,76%)] top-[calc(50%+55px)] z-[1] size-[52px] -translate-y-1/2 -rotate-[17deg] text-white max-md:right-[88%] max-md:size-9"
            style={welcomeHeaderFluxStyle('0.05', '0.7s')}
          />
          <LightbulbIcon
            aria-hidden
            weight="duotone"
            className="welcome-header-icon-flux pointer-events-none absolute right-[min(34rem,46%)] top-[calc(50%+175px)] z-[1] size-[32px] -translate-y-1/2 rotate-[11deg] text-white max-md:right-[58%] max-md:top-[calc(50%+140px)]"
            style={welcomeHeaderFluxStyle('0.065', '1.05s')}
          />
          <GitBranchIcon
            aria-hidden
            weight="duotone"
            className="welcome-header-icon-flux pointer-events-none absolute right-[min(58rem,82%)] top-[calc(50%-35px)] z-[1] size-[72px] -translate-y-1/2 -rotate-[26deg] text-white max-md:hidden"
            style={welcomeHeaderFluxStyle('0.045', '1.4s')}
          />
          <SparkleIcon
            aria-hidden
            weight="duotone"
            className="welcome-header-icon-flux pointer-events-none absolute right-[400px] top-[calc(50%-50px)] z-[1] size-[60px] -translate-y-1/2 text-white"
            style={welcomeHeaderFluxStyle('0.07', '0.5s')}
          />
          <PaletteIcon
            aria-hidden
            weight="duotone"
            className="welcome-header-icon-flux pointer-events-none absolute right-[350px] top-[calc(50%+120px)] z-[1] size-[60px] -translate-y-1/2 text-white"
            style={welcomeHeaderFluxStyle('0.07', '0.85s')}
          />
          <SquaresFourIcon
            aria-hidden
            weight="duotone"
            className="welcome-header-icon-flux pointer-events-none absolute right-[350px] top-[calc(50%+120px)] z-[1] size-[60px] -translate-y-1/2 translate-x-[480px] text-white"
            style={welcomeHeaderFluxStyle('0.07', '1.2s')}
          />
          <div className={cn('relative z-10', docPageHeroColumnWideClassName)}>
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

      <div className={docPageHorizontalGutterClassName}>
      <article className={cn(WELCOME_PAGE_COLUMN, 'py-10')}>
        <div className="not-prose space-y-16 text-neutral-700 dark:text-neutral-300">
          <section aria-labelledby="intro-audience">
            <h2 id="intro-audience" className={introH2}>
              Who it&apos;s for
            </h2>
            <p className={introLead}>Different roles enter from different doors—each should find a clear path.</p>
            <div className="mt-6 grid min-w-0 grid-cols-3 gap-3 sm:gap-4">
              <div className={cn(introCard, 'min-w-0')}>
                <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Designers</p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  Build and prototype with shared components and tokens so specs match what ships.
                </p>
              </div>
              <div className={cn(introCard, 'min-w-0')}>
                <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Engineers</p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  Import production-ready React components and a single stylesheet; compose with AppShell for product
                  screens.
                </p>
              </div>
              <div className={cn(introCard, 'min-w-0')}>
                <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Product managers</p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  Align teams on consistent UX patterns, maturity, and scope instead of one-off widgets.
                </p>
              </div>
            </div>
          </section>

          <section aria-labelledby="intro-principles" className="text-center">
            <h2 id="intro-principles" className={cn(introH2, 'mx-auto max-w-3xl')}>
              Principles
            </h2>
            <p className={cn(introLead, 'mx-auto max-w-2xl')}>
              When documentation is silent, these defaults steer decisions.
            </p>
            <ul className="mx-auto mt-10 flex w-full min-w-0 max-w-none list-none flex-nowrap justify-stretch gap-2 p-0 sm:gap-3 md:gap-4">
              {INTRO_PRINCIPLES.map(({ title, body, color, icon }) => (
                <li key={title} className={introPrincipleCard}>
                  <Medallion color={color} size="xl" shape="circle" tone="pastel" icon={icon} className="mb-3 sm:mb-4 md:mb-5" />
                  <p className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">{title}</p>
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
    </div>
  )
}

export function UsagePage() {
  return (
    <MarkdownishPage kicker="Getting Started" title="Usage">
      <p>
        This library is meant to be consumed as a normal package dependency: one stylesheet at the root, components from
        the package export, and composition patterns that match what you see in these docs. The sections below mirror
        what we encode for AI and internal teams in the repo contract.
      </p>

      <h2 className="pt-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">Allowed imports</h2>
      <p className="mt-3 text-neutral-600 dark:text-neutral-300">
        In application code, import runtime UI from the package root and styles from the dedicated export. Do not deep-import
        from paths that are not part of the package <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">exports</code> map
        (for example monorepo <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">src/</code> paths or stale package names).
      </p>
      <CodePanel
        label="Typical imports"
        language="tsx"
        code={`import { AppShell, Button, Menu, Field, Input } from "@chghealthcare/unified-design-system"
import "@chghealthcare/unified-design-system/styles.css"`}
      />

      <h2 className="pt-6 text-lg font-semibold text-neutral-900 dark:text-neutral-100">Styles and tokens</h2>
      <p className="mt-3 text-neutral-600 dark:text-neutral-300">
        The bundled stylesheet carries layout, component, and token wiring (including <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">--uds-*</code> custom
        properties). Prefer those tokens when writing adjacent CSS so your product chrome stays aligned with the system. For
        Tailwind-style utilities that ship with the library, follow the examples on each Foundations topic.
      </p>
      <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
        Cross-check class families and theme behavior with the{' '}
        <a href="https://tailwindcss.com/docs" className="docs-link font-medium" target="_blank" rel="noreferrer">
          Tailwind CSS documentation
        </a>{' '}
        when you are unsure about a utility name.
      </p>

      <h2 className="pt-6 text-lg font-semibold text-neutral-900 dark:text-neutral-100">Application shell</h2>
      <p className="mt-3 text-neutral-600 dark:text-neutral-300">
        For authenticated, multi-page products, default to <strong className="text-neutral-900 dark:text-neutral-100">AppShell</strong> with
        the <strong className="text-neutral-900 dark:text-neutral-100">Menu</strong> rail and route-driven content. The shell renders a
        built-in header (search + your trailing actions), optional listview column, main region (with React Router{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">Outlet</code> when you nest routes), and an optional footer.
        See the AppShell page for region tags and props.
      </p>
      <CodePanel
        label="Shell sketch"
        language="tsx"
        code={`import { AppShell, Menu } from "@chghealthcare/unified-design-system"

export function ProductChrome() {
  return (
    <AppShell className="min-h-dvh min-w-0 w-full max-w-full overflow-x-hidden">
      <AppShell.Menu>
        <Menu navigationItems={/* … */} />
      </AppShell.Menu>
      <AppShell.Header>{/* icon buttons, account menu */}</AppShell.Header>
      <AppShell.Main>{/* routed pages */}</AppShell.Main>
      <AppShell.Footer>{/* optional */}</AppShell.Footer>
    </AppShell>
  )
}`}
      />
      <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
        <Link to="/docs/getting-started/app-shell" className="docs-link font-medium">
          AppShell demo and composition →
        </Link>
      </p>

      <h2 className="pt-6 text-lg font-semibold text-neutral-900 dark:text-neutral-100">Icons</h2>
      <p className="mt-3 text-neutral-600 dark:text-neutral-300">
        Phosphor icons are re-exported from the package (for example <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">HouseIcon</code>,{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">BellIcon</code>). Pass them to props such as{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">Menu</code> navigation items or use them beside labels; prefer the
        string-based <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">Icon</code> component only where the API expects a name.
      </p>

      <h2 className="pt-6 text-lg font-semibold text-neutral-900 dark:text-neutral-100">Forms</h2>
      <p className="mt-3 text-neutral-600 dark:text-neutral-300">
        Wrap inputs with <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">Field</code> for labels, validation text, and
        helper copy. Use the <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">state</code> prop on inputs where supported for
        focused, error, and disabled presentation.
      </p>
      <CodePanel
        label="Field + Input"
        language="tsx"
        code={`<Field label="Email" required helperMessage="Work email only">
  <Input type="email" placeholder="you@company.com" />
</Field>`}
      />

      <h2 className="pt-6 text-lg font-semibold text-neutral-900 dark:text-neutral-100">Using this documentation site</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-600 dark:text-neutral-300">
        <li>
          <strong className="text-neutral-900 dark:text-neutral-100">Introduction</strong> — positioning, audience, and how to read the
          system at a glance.
        </li>
        <li>
          <strong className="text-neutral-900 dark:text-neutral-100">Foundations</strong> — tokens, layout primitives, and Tailwind-oriented
          reference tied to <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">uds-tokens.css</code>.
        </li>
        <li>
          <strong className="text-neutral-900 dark:text-neutral-100">Components</strong> — live previews, import snippets, and props tables
          for each exported primitive.
        </li>
        <li>
          <strong className="text-neutral-900 dark:text-neutral-100">Patterns</strong> — fuller screens (for example dashboard) built from
          the same exports you install.
        </li>
      </ul>

      <h2 className="pt-6 text-lg font-semibold text-neutral-900 dark:text-neutral-100">Machine-readable contract</h2>
      <p className="mt-3 text-neutral-600 dark:text-neutral-300">
        Automation and agents should treat <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">ai/uds-contract.json</code> and{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">ai/appshell.schema.json</code> in the repository as the source of
        truth for imports and AppShell behavior when prose and tooling disagree.
      </p>

      <p className="mt-6 text-sm text-neutral-600 dark:text-neutral-400">
        <Link to="/docs/getting-started/install" className="docs-link font-medium">
          ← Install
        </Link>
      </p>
    </MarkdownishPage>
  )
}
