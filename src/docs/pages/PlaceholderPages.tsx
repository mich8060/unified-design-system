import {
  ArrowClockwiseIcon,
  Button,
  Card,
  CardContent,
  CheckCircleIcon,
  cn,
  GearSixIcon,
  GitBranchIcon,
  Medallion,
  PresentationChartIcon,
  StackIcon,
  Status,
  type MedallionColor,
} from '@chghealthcare/unified-design-system'
import { useEffect, useLayoutEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { DOCS_BRAND_OPTIONS } from '../doc-site-brand'
import type { UdsBrandId } from '@/lib/uds-brand'
import { CodePanel } from '../components/CodePanel'
import {
  DocsPageSection,
  DocsPageShell,
} from '../components/DocsPageShell'
import { DesignLanguageContractDiagram } from '../components/DesignLanguageContractDiagram'
import { DesignLanguageLayersDiagram } from '../components/DesignLanguageLayersDiagram'
import { DocShellLayoutVisuals } from './DocShellLayoutVisuals'
import { ReadoutPage } from '../readout/ReadoutPage'
import { MarkdownishPage } from './MarkdownishPage'

const introCard =
  'rounded-[length:var(--uds-radius-12)] border border-uds-border-primary bg-[var(--uds-surface-secondary)] p-[length:var(--uds-spacing-16)]'
const introPrincipleCard =
  'flex min-w-0 w-full max-w-full basis-full flex-col items-center gap-[length:var(--uds-gap-12)] rounded-[length:var(--uds-radius-12)] border border-uds-border-primary bg-[var(--uds-surface-primary)] px-[length:var(--uds-spacing-16)] py-[length:var(--uds-spacing-16)] text-center sm:max-w-[calc((100%-var(--uds-gap-16))/2)] sm:basis-[calc((100%-var(--uds-gap-16))/2)] lg:max-w-[calc((100%-2*var(--uds-gap-16))/3)] lg:basis-[calc((100%-2*var(--uds-gap-16))/3)]'
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
  {
    title: 'Accessible by default',
    body: 'Ship inclusive patterns so accessibility is built in, not bolted on.',
    color: 'green',
    icon: <CheckCircleIcon weight="bold" aria-hidden />,
  },
]
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

function BrandMenuDemoFrame({
  brand,
  label,
  headerVariant,
  headerTitle,
  headerShortTitle,
}: {
  brand: UdsBrandId
  label: string
  headerVariant?: 'brand' | 'title'
  headerTitle?: string
  headerShortTitle?: string
}) {
  const dark = useDocsRootDarkClass()
  const query = new URLSearchParams({ brand })
  if (dark) query.set('dark', '1')
  if (headerVariant === 'title' && headerTitle) {
    query.set('headerVariant', 'title')
    query.set('headerTitle', headerTitle)
    if (headerShortTitle) query.set('headerShortTitle', headerShortTitle)
  }
  const iframeSrc = `/menu-demo.html?${query.toString()}`

  return (
    <section className="scroll-mt-8">
      <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">{label}</h3>
      <p className="mt-1 font-mono text-xs text-neutral-500 dark:text-neutral-400">
        {headerVariant === 'title' && headerTitle ? (
          <>
            headerVariant=
            <span className="text-neutral-700 dark:text-neutral-300">title</span>
            {' · '}
            headerTitle=
            <span className="text-neutral-700 dark:text-neutral-300">{headerTitle}</span>
            {headerShortTitle ? (
              <>
                {' · '}
                headerShortTitle=
                <span className="text-neutral-700 dark:text-neutral-300">{headerShortTitle}</span>
              </>
            ) : null}
            {' · '}
            brand=
            <span className="text-neutral-700 dark:text-neutral-300">{brand}</span>
          </>
        ) : (
          <>
            brand=<span className="text-neutral-700 dark:text-neutral-300">{brand}</span>
          </>
        )}
      </p>
      <div className="mx-auto mt-4 box-border w-full max-w-[375px]">
        <iframe
          title={`Menu demo — ${label}`}
          className="box-border block h-[min(680px,80vh)] w-[375px] max-w-full rounded-[length:var(--uds-radius-8)] border-2 border-neutral-200 bg-neutral-800 shadow-sm dark:border-neutral-700"
          src={iframeSrc}
          key={`${brand}-${dark ? 'dark' : 'light'}`}
        />
      </div>
    </section>
  )
}

function AllBrandMenuDemosPreview() {
  return (
    <>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Each preview loads <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">menu-demo.html</code> with a{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">brand</code> query param. The rail uses{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">getDefaultNavigation(brand)</code> for contract
        nav items, brand tokens on <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">document.documentElement</code>
        , and the matching header wordmark. Frames are 375px wide so{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">fixed</code> layout matches a product viewport, not
        the documentation shell.
      </p>
      <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-x-10">
        {DOCS_BRAND_OPTIONS.map(({ value, label }) => (
          <BrandMenuDemoFrame key={value} brand={value} label={label} />
        ))}
      </div>
    </>
  )
}

function AppShellDemoIframe() {
  const dark = useDocsRootDarkClass()
  const iframeSrc = `/app-shell-demo.html${dark ? '?dark=1' : ''}`

  return (
    <div className="not-prose w-full min-w-0">
      <iframe
        title="AppShell interactive demo"
        className="box-border block h-[min(920px,85vh)] w-full max-w-full rounded-[length:var(--uds-radius-8)] border-2 border-black shadow-xl shadow-neutral-900/10 dark:shadow-2xl dark:shadow-black/35"
        src={iframeSrc}
        key={dark ? 'dark' : 'light'}
      />
    </div>
  )
}

export function InstallPage() {
  return (
    <MarkdownishPage
      kicker="Getting Started"
      title="Install"
      description="Add the UDS package to a React 19 app from GitHub Packages, import styles once, and start composing from the package entry."
    >
      <p>
        Add <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">@chghealthcare/unified-design-system</code>{' '}
        to a React app, import the stylesheet once at the root, and import components from the package entry. Internal
        apps should install from{' '}
        <a
          href="https://github.com/chghealthcare/unified-design-system/packages"
          className="docs-link font-medium"
          target="_blank"
          rel="noreferrer"
        >
          GitHub Packages
        </a>{' '}
        under the <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">@chghealthcare</code> scope (
        <a
          href="https://github.com/chghealthcare/unified-design-system"
          className="docs-link font-medium"
          target="_blank"
          rel="noreferrer"
        >
          chghealthcare/unified-design-system
        </a>
        ).
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
          <strong className="text-neutral-900 dark:text-neutral-100">Node</strong> — use Node 22 LTS (or 24+) for local
          dev and CI. This repo pins <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">npm@10.9.2</code>{' '}
          via <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">packageManager</code> so lockfiles stay
          compatible with GitHub Actions.
        </li>
        <li>
          <strong className="text-neutral-900 dark:text-neutral-100">Bundler</strong> — Vite, webpack, or other
          modern ESM-aware bundlers work. The package exposes ESM and CJS builds plus a single aggregated{' '}
          <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">styles.css</code>.
        </li>
        <li>
          <strong className="text-neutral-900 dark:text-neutral-100">GitHub access</strong> — a token with{' '}
          <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">read:packages</code> (and{' '}
          <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">repo</code> if the package is private).
        </li>
      </ul>

      <h2 className="pt-6 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
        Install from GitHub Packages (recommended)
      </h2>
      <p className="mt-3 text-neutral-600 dark:text-neutral-300">
        Point npm at the GitHub registry for the <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">@chghealthcare</code>{' '}
        scope. Commit <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">.npmrc</code> in your app; do not
        commit tokens—use an environment variable.
      </p>
      <CodePanel
        label=".npmrc (app repo)"
        language="text"
        code={`@chghealthcare:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=\${NODE_AUTH_TOKEN}`}
      />
      <div className="mt-4 space-y-4">
        <CodePanel
          label="npm"
          language="bash"
          code={`export NODE_AUTH_TOKEN=ghp_your_pat_with_read_packages
npm install @chghealthcare/unified-design-system react react-dom`}
        />
        <CodePanel
          label="package.json"
          language="json"
          code={`{
  "dependencies": {
    "@chghealthcare/unified-design-system": "^1.0.5",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}`}
        />
      </div>
      <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
        For routed shells (<code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">AppShell</code> with the
        default outlet), also add <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">react-router-dom</code>.
        React is not bundled inside the design system.
      </p>

      <h3 className="pt-5 text-base font-semibold text-neutral-900 dark:text-neutral-100">CI in your application</h3>
      <p className="mt-2 text-neutral-600 dark:text-neutral-300">
        In GitHub Actions, grant <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">packages: read</code>{' '}
        and pass <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">GITHUB_TOKEN</code> (same org) or a
        PAT secret if installs fail.
      </p>
      <CodePanel
        label=".github/workflows/ci.yml (excerpt)"
        language="yaml"
        code={`permissions:
  contents: read
  packages: read

- uses: actions/setup-node@v4
  with:
    node-version: "22"
    cache: npm
    registry-url: https://npm.pkg.github.com
    scope: "@chghealthcare"

- name: Install dependencies
  env:
    NODE_AUTH_TOKEN: \${{ secrets.GITHUB_TOKEN }}
  run: npm ci`}
      />

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

      <h2 className="pt-6 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
        Publishing (maintainers)
      </h2>
      <p className="mt-3 text-neutral-600 dark:text-neutral-300">
        The <strong className="text-neutral-900 dark:text-neutral-100">Publish GitHub Package</strong> workflow (
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">publish-github-packages.yml</code>) publishes to{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">npm.pkg.github.com</code>. Until the first run,
        Actions may show &ldquo;0 workflow runs&rdquo; and only the manual trigger—that is expected.
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-600 dark:text-neutral-300">
        <li>
          <strong className="text-neutral-900 dark:text-neutral-100">Automatic (recommended)</strong> — bump{' '}
          <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">version</code> in{' '}
          <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">package.json</code>, push to{' '}
          <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">main</code>, then create a{' '}
          <strong className="text-neutral-900 dark:text-neutral-100">GitHub Release</strong> for that tag (published, not
          draft). The workflow runs on <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">release: published</code>.
        </li>
        <li>
          <strong className="text-neutral-900 dark:text-neutral-100">Manual test</strong> — Actions → Publish GitHub
          Package → <strong className="text-neutral-900 dark:text-neutral-100">Run workflow</strong> on{' '}
          <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">main</code>. Use dry run{' '}
          <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">true</code> first, then{' '}
          <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">false</code> to publish.
        </li>
      </ul>
      <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
        After a successful publish, the package appears under Packages on the repository. Consumer apps can pin the new
        version in <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">package.json</code> and run{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">npm install</code> with registry auth configured
        above.
      </p>

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
        <li>
          <Link to="/docs/getting-started/design-language" className="docs-link font-medium">
            Design Language
          </Link>{' '}
          — why/when reasoning for composition (Design System Language).
        </li>
      </ul>
    </MarkdownishPage>
  )
}

export function DesignLanguagePage() {
  return (
    <MarkdownishPage
      kicker="Getting Started"
      title="Design Language"
      description="The Design System Language (DSL) explains why UDS decisions exist, when to apply them, and how humans and AI should reason about composition—not only which component to import."
    >
      <p>
        Runtime components and the machine-readable contract answer <strong>what</strong> to use and{' '}
        <strong>how</strong> the APIs work. The Design System Language answers <strong>why</strong> and{' '}
        <strong>when</strong>: intent, hierarchy, spacing, shell regions, patterns, and anti-patterns. It ships with the
        package as{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">
          @chghealthcare/unified-design-system/design-language
        </code>{' '}
        and lives in the repo under{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">design-language/</code>.
      </p>

      <DesignLanguageContractDiagram />

      <h2 className="pt-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">What it is for</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-600 dark:text-neutral-300">
        <li>
          <strong className="text-neutral-900 dark:text-neutral-100">Designers</strong> — shared philosophy, physics, and
          patterns so specs match what ships.
        </li>
        <li>
          <strong className="text-neutral-900 dark:text-neutral-100">Engineers</strong> — composition rules before inventing
          layout chrome; prefer recipes and existing exports.
        </li>
        <li>
          <strong className="text-neutral-900 dark:text-neutral-100">AI agents</strong> — a structured reasoning path
          (intent → grammar → decision trees → patterns → components) with confidence labels and retrieval indexes.
        </li>
      </ul>

      <h2 className="pt-6 text-lg font-semibold text-neutral-900 dark:text-neutral-100">Knowledge layers</h2>
      <p className="mt-3 text-neutral-600 dark:text-neutral-300">
        Layers only depend downward. Start high when the problem is ambiguous; drop to tokens and examples when you are
        implementing a settled layout.
      </p>
      <div className="mt-4">
        <DesignLanguageLayersDiagram />
      </div>
      <div className="mt-4 overflow-x-auto rounded-[length:var(--uds-radius-8)] border border-uds-border-primary">
        <table className="w-full min-w-[min(100%,520px)] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-uds-border-primary bg-[var(--uds-surface-secondary)]">
              <th className="px-3 py-2 font-semibold text-[var(--uds-text-primary)]">Layer</th>
              <th className="px-3 py-2 font-semibold text-[var(--uds-text-primary)]">Role</th>
            </tr>
          </thead>
          <tbody className="text-[var(--uds-text-secondary)]">
            <tr className="border-b border-uds-border-primary">
              <td className="px-3 py-2 font-medium text-[var(--uds-text-primary)]">Philosophy &amp; principles</td>
              <td className="px-3 py-2">Why the system exists and default tradeoffs</td>
            </tr>
            <tr className="border-b border-uds-border-primary">
              <td className="px-3 py-2 font-medium text-[var(--uds-text-primary)]">Design physics</td>
              <td className="px-3 py-2">Proximity, weight, contrast, stability, disclosure</td>
            </tr>
            <tr className="border-b border-uds-border-primary">
              <td className="px-3 py-2 font-medium text-[var(--uds-text-primary)]">Semantics</td>
              <td className="px-3 py-2">Meaning: hierarchy, density, intent, shell containment</td>
            </tr>
            <tr className="border-b border-uds-border-primary">
              <td className="px-3 py-2 font-medium text-[var(--uds-text-primary)]">Grammar</td>
              <td className="px-3 py-2">Valid AppShell regions and pattern containment</td>
            </tr>
            <tr className="border-b border-uds-border-primary">
              <td className="px-3 py-2 font-medium text-[var(--uds-text-primary)]">Decision rules</td>
              <td className="px-3 py-2">Choosing patterns, spacing, components; decision trees</td>
            </tr>
            <tr className="border-b border-uds-border-primary">
              <td className="px-3 py-2 font-medium text-[var(--uds-text-primary)]">Patterns &amp; ontology</td>
              <td className="px-3 py-2">Screen recipes and component knowledge objects</td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-medium text-[var(--uds-text-primary)]">Foundations &amp; examples</td>
              <td className="px-3 py-2">Tokens, composition details, and pointer examples</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="pt-6 text-lg font-semibold text-neutral-900 dark:text-neutral-100">How to reason</h2>
      <ol className="mt-3 list-decimal space-y-2 pl-5 text-neutral-600 dark:text-neutral-300">
        <li>
          State <strong className="text-neutral-900 dark:text-neutral-100">intent</strong> (what the user is trying to do).
        </li>
        <li>
          Apply <strong className="text-neutral-900 dark:text-neutral-100">grammar</strong> — AppShell regions, listview vs
          right panel, MainContent containment.
        </li>
        <li>
          Choose a <strong className="text-neutral-900 dark:text-neutral-100">recipe / pattern</strong> via decision trees
          before inventing layout.
        </li>
        <li>
          Implement with contract <strong className="text-neutral-900 dark:text-neutral-100">components</strong> and{' '}
          <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">ai/examples</code>.
        </li>
        <li>
          Respect <strong className="text-neutral-900 dark:text-neutral-100">confidence</strong> labels in the DSL
          (Required vs Strong Recommendation vs Optional).
        </li>
      </ol>

      <h2 className="pt-6 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
        Contract vs design language
      </h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-600 dark:text-neutral-300">
        <li>
          <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">ai/uds-contract.json</code> (package export{' '}
          <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">/contract</code>) is normative for APIs,
          recipes, and anti-patterns when prose disagrees.
        </li>
        <li>
          <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">design-language/</code> is normative for
          composition reasoning and design intent.
        </li>
        <li>
          Retrieval indexes under <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">ai/indexes/</code>{' '}
          help agents find the right DSL article quickly.
        </li>
      </ul>

      <h2 className="pt-6 text-lg font-semibold text-neutral-900 dark:text-neutral-100">Consumer AI bootstrap</h2>
      <p className="mt-3 text-neutral-600 dark:text-neutral-300">
        Setup agents (not designers/PMs) run this after install so hot-path stubs land in the app, then commit the
        result:
      </p>
      <CodePanel label="From the consumer app root (agent-owned)" language="bash" code={`npx uds-copy-ai-rules`} />
      <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
        That wires Cursor, Claude Code, AGENTS, or Copilot stubs from{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">ai/consumer-ai/</code>. Paste-ready prompt:{' '}
        <Link to="/docs/getting-started/usage" className="docs-link font-medium">
          Usage → Copy-paste setup prompt
        </Link>
        . Full steps:{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">ai/guides/consumer-ai-bootstrap.md</code>.
      </p>

      <h2 className="pt-6 text-lg font-semibold text-neutral-900 dark:text-neutral-100">Where to go next</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-600 dark:text-neutral-300">
        <li>
          <Link to="/docs/getting-started/usage" className="docs-link font-medium">
            Usage
          </Link>{' '}
          — allowed imports and shell composition in product code.
        </li>
        <li>
          <Link to="/docs/getting-started/app-shell" className="docs-link font-medium">
            AppShell demo
          </Link>{' '}
          — the default authenticated layout regions.
        </li>
        <li>
          Foundations and Components in this site — token scales and live APIs that the DSL points at.
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

      <h2 className="pt-6 text-lg font-semibold text-neutral-900 dark:text-neutral-100">Live preview by brand</h2>
      <div className="not-prose">
        <AllBrandMenuDemosPreview />
      </div>

      <h2 className="pt-10 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
        Title header (non-brand apps)
      </h2>
      <p className="mt-3 text-neutral-600 dark:text-neutral-300">
        Product shells that are <strong className="text-neutral-900 dark:text-neutral-100">not</strong> tied to a CHG brand
        lockup can swap the header logos for plain text. Set{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">headerVariant="title"</code> with{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">headerTitle</code> (required) and optional{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">headerShortTitle</code> for the collapsed rail.
        The <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">brand</code> prop still controls design tokens
        only—it does not render a logo when the title variant is active.
      </p>
      <div className="not-prose mt-6">
        <BrandMenuDemoFrame
          brand="default"
          label="Title header example"
          headerVariant="title"
          headerTitle="Internal portal"
          headerShortTitle="IP"
        />
      </div>
      <div className="mt-6">
      <CodePanel
        label="Non-brand application menu"
        language="tsx"
        code={`import "@chghealthcare/unified-design-system/styles.css"
import { LayoutIcon, Menu } from "@chghealthcare/unified-design-system"

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutIcon },
  { id: "settings", label: "Settings", icon: LayoutIcon },
] as const

export function InternalAppMenu() {
  return (
    <Menu
      headerVariant="title"
      headerTitle="Internal portal"
      headerShortTitle="IP"
      brand="default"
      defaultExpanded
      aria-label="Application menu"
      navigationItems={NAV_ITEMS}
      navigationProps={{ "aria-label": "Primary navigation" }}
    />
  )
}`}
      />
      </div>

      <h2 className="pt-10 text-lg font-semibold text-neutral-900 dark:text-neutral-100">Usage</h2>
      <p className="mt-3 text-neutral-600 dark:text-neutral-300">
        Import the stylesheet once, define your tree as data, and pass it to{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">navigationItems</code> on{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">Menu</code>. Omit{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">headerVariant</code> (or set{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">headerVariant="brand"</code>) to use product
        logos from the active <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">brand</code>.
      </p>
      <div className="mt-4">
      <CodePanel
        label="Branded application menu"
        language="tsx"
        code={`import "@chghealthcare/unified-design-system/styles.css"
import { LayoutIcon, Menu } from "@chghealthcare/unified-design-system"

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutIcon },
  // …Requests → BriefcaseIcon, Providers → UsersIcon, etc.
] as const

export function ApplicationMenu() {
  return <Menu brand="connect" navigationItems={NAV_ITEMS} />
}`}
      />
      </div>

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
    <DocsPageShell
      eyebrow="Getting Started"
      title="AppShell demo"
      description="Baseline application shell for product screens: Menu rail, optional listview, main content, and optional footer."
      panelBleed={<AppShellDemoIframe />}
      afterBleed={
        <>
          <DocsPageSection title="Composition">
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
          </DocsPageSection>

          <DocsPageSection title="When to use it">
            <ul className="m-0 list-disc space-y-2 pl-5 text-[var(--uds-text-secondary)]">
              <li>Keep the sidebar present when navigation must remain visible across most authenticated screens.</li>
              <li>Enable the listview for master-detail flows like records, inboxes, queues, and search results.</li>
              <li>Enable the footer when you need persistent actions, summary state, or workflow controls.</li>
            </ul>
          </DocsPageSection>
        </>
      }
    >
      <div className="flex min-w-0 flex-col gap-[length:var(--uds-gap-16)] text-[var(--uds-text-secondary)] [&_:not(pre)_>_code]:rounded-[length:var(--uds-radius-4)] [&_:not(pre)_>_code]:bg-[var(--uds-surface-secondary)] [&_:not(pre)_>_code]:px-1.5 [&_:not(pre)_>_code]:py-0.5 [&_pre_code]:rounded-none [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_strong]:text-[var(--uds-text-primary)]">
        <p className="m-0">
          This page demonstrates the baseline application shell for product screens: a standardized{' '}
          <strong>Menu</strong> rail (fixed header with collapse control + branding), optional listview, wide content
          area, and optional footer.
        </p>
        <p className="m-0">
          <strong>AppShell</strong> is the neutral application layout version of this pattern: a persistent sidebar, an
          optional listview column, a flexible main panel, and an optional footer row.
        </p>
        <p className="m-0 text-sm">
          The interactive preview loads in an isolated frame (<code>app-shell-demo.html</code>) so documentation-only
          styles do not affect the shell. It uses the <code>AppShell</code> <code>menu</code> slot with{' '}
          <code>DocsRailMenu</code> (<code>docs-rail-menu.tsx</code>) rail and <code>DocsRailMenu.Flyout</code> for
          Documents when the rail is collapsed. Theme follows this page (light/dark); toggling appearance reloads the
          frame.
        </p>
      </div>
    </DocsPageShell>
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

export function ProjectReadoutPage() {
  return <ReadoutPage />
}

const RELEASE_HIGHLIGHTS: { title: string; items: string[] }[] = [
  {
    title: 'Toolbar',
    items: [
      'Three regions: Start, Center (title + description), and End.',
      'Sizes: default (44px) and lg (56px) for stacked title + meta.',
      'Radius 0; border-bottom only.',
    ],
  },
  {
    title: 'AppShell listview',
    items: [
      'listviewWidth 320–480px (default 320) based on content need.',
      'Toolbar titlebar; entities use Item or Card (dense: appearance="list").',
    ],
  },
  {
    title: 'MainContent',
    items: [
      'Recommended: keep edge or fixed containment consistent across the app’s pages.',
    ],
  },
  {
    title: 'AppShell Header',
    items: ['hideSearch and headerLeading for omitting or replacing Header search.'],
  },
  {
    title: 'SearchInput / Filterbar',
    items: [
      'surface="primary" (white) on gray parents; surface="secondary" (gray, default) on white parents.',
      'In Filterbar on edge Main, use surface="primary".',
    ],
  },
]

const RELEASE_ALSO = [
  'Drawer: left/right width clamped 320–600px.',
  'Item appearance="list", Table plain / wrap, Alert style="filled", Status↔Badge alignment.',
  'Inter as a separate WOFF2; branding SVGs SVGO-optimized; leaner Vite Phosphor imports.',
  'Docs site: version dropdown removed; latest snapshot only.',
]

export function ProjectReleasesPage() {
  return (
    <DocsPageShell
      eyebrow="Projects"
      title="Releases"
      description={
        <>
          What’s shipping in{' '}
          <code className="rounded-[length:var(--uds-radius-4)] bg-[var(--uds-surface-secondary)] px-1.5 py-0.5">
            @chghealthcare/unified-design-system
          </code>
          . Published tags and full changelogs are on GitHub; draft notes also live in{' '}
          <code className="rounded-[length:var(--uds-radius-4)] bg-[var(--uds-surface-secondary)] px-1.5 py-0.5">
            docs/NEXT_RELEASE_NOTES.md
          </code>
          .
        </>
      }
      actions={
        <Button asChild variant="outline">
          <a
            href="https://github.com/chghealthcare/unified-design-system/releases"
            target="_blank"
            rel="noreferrer"
          >
            <GitBranchIcon weight="bold" aria-hidden />
            GitHub Releases
          </a>
        </Button>
      }
    >
      <DocsPageSection
        title="Coming next"
        description="Highlights for the next package publish. This site’s documentation snapshot stays on v1.2.0 until the next minor or major docs freeze."
      >
        <div className="flex flex-wrap items-center gap-[length:var(--uds-gap-8)]">
          <Status appearance="outlined" size="compact" variant="info">
            Unreleased
          </Status>
          <Status appearance="outlined" size="compact" variant="neutral">
            Docs snapshot v1.2.0
          </Status>
        </div>

        <div className="flex w-full min-w-0 flex-col gap-[length:var(--uds-gap-16)]">
          {RELEASE_HIGHLIGHTS.map((section) => (
            <Card key={section.title}>
              <CardContent className="flex flex-col gap-[length:var(--uds-gap-12)]">
                <p className="m-0 text-[length:var(--uds-type-body-16-size)] font-semibold leading-[var(--uds-type-body-16-line-height)] text-[var(--uds-text-primary)]">
                  {section.title}
                </p>
                <ul className="m-0 flex list-none flex-col gap-[length:var(--uds-gap-8)] p-0">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="text-[length:var(--uds-type-body-14-size)] leading-[var(--uds-type-body-14-line-height)] text-[var(--uds-text-secondary)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </DocsPageSection>

      <DocsPageSection
        title="Also in this draft"
        description="Smaller component and platform updates included in the same release notes draft."
      >
        <Card>
          <CardContent className="flex flex-col gap-[length:var(--uds-gap-12)]">
            <ul className="m-0 flex list-none flex-col gap-[length:var(--uds-gap-12)] p-0">
              {RELEASE_ALSO.map((item) => (
                <li
                  key={item}
                  className="text-[length:var(--uds-type-body-14-size)] leading-[var(--uds-type-body-14-line-height)] text-[var(--uds-text-secondary)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </DocsPageSection>
    </DocsPageShell>
  )
}

export function PatternsDashboardPage() {
  return (
    <MarkdownishPage kicker="Patterns" title="Dashboard">
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

export function WelcomePage() {
  useLayoutEffect(() => {
    // The intro page has no open listview, so `.appshell` only sets `min-height`
    // (not a capped height) and the *window* scrolls — not `.appshell--main`,
    // which only becomes the scroller in the master–detail (listview-open)
    // layout. Pin both so we're correct regardless of which one actually scrolls.
    const getMain = () => document.querySelector<HTMLElement>('[data-slot="appshell"] .appshell--main')
    const readTop = () => {
      const main = getMain()
      return Math.max(window.scrollY, main ? main.scrollTop : 0)
    }
    const snapTop = () => {
      const main = getMain()
      if (main && main.scrollTop !== 0) main.scrollTop = 0
      if (window.scrollY !== 0) window.scrollTo(0, 0)
    }

    // The intro page is lazy-loaded and dense with live component previews that
    // keep reflowing (and can pull focus / scrollIntoView) for many frames after
    // mount, scrolling the main region away from the top long after a fixed
    // 2-frame reset would have stopped. Pin to the top on every frame until the
    // first genuine user interaction (or a safety cap), then release so normal
    // scrolling works untouched.
    let pinned = true
    let rafId = 0
    snapTop()

    const tick = () => {
      if (!pinned) return
      if (readTop() !== 0) snapTop()
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    const release = () => {
      if (!pinned) return
      pinned = false
      cancelAnimationFrame(rafId)
      window.clearTimeout(timer)
      window.removeEventListener('wheel', release)
      window.removeEventListener('touchmove', release)
      window.removeEventListener('keydown', release)
      window.removeEventListener('pointerdown', release)
    }

    window.addEventListener('wheel', release, { passive: true })
    window.addEventListener('touchmove', release, { passive: true })
    window.addEventListener('keydown', release)
    window.addEventListener('pointerdown', release)
    const timer = window.setTimeout(release, 2000)

    return release
  }, [])

  return (
    <DocsPageShell
      title="Introduction"
      actionsPlacement="below"
      description={
        <>
          A unified design system that enables teams to build consistent, scalable, and production-ready experiences
          across all CHG products. Build once, ship everywhere · Faster time to market · Consistent, accessible
          experiences
        </>
      }
      actions={
        <>
          <Button asChild variant="default" size="default">
            <Link to="/docs/getting-started/install">Quick start — Install</Link>
          </Button>
          <Button asChild variant="outline" size="default">
            <Link to="/docs/getting-started/usage">Usage</Link>
          </Button>
        </>
      }
    >
      <DocsPageSection
        title="Who it's for"
        description="Different roles enter from different doors—each should find a clear path."
      >
        <div className="grid min-w-0 grid-cols-3 gap-3 sm:gap-4">
          <div className={cn(introCard, 'min-w-0')}>
            <p className="m-0 text-sm font-semibold text-[var(--uds-text-primary)]">Designers</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--uds-text-secondary)]">
              Build and prototype with shared components and tokens so specs match what ships.
            </p>
          </div>
          <div className={cn(introCard, 'min-w-0')}>
            <p className="m-0 text-sm font-semibold text-[var(--uds-text-primary)]">Engineers</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--uds-text-secondary)]">
              Import production-ready React components and a single stylesheet; compose with AppShell for product
              screens.
            </p>
          </div>
          <div className={cn(introCard, 'min-w-0')}>
            <p className="m-0 text-sm font-semibold text-[var(--uds-text-primary)]">Product managers</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--uds-text-secondary)]">
              Align teams on consistent UX patterns, maturity, and scope instead of one-off widgets.
            </p>
          </div>
        </div>
      </DocsPageSection>

      <DocsPageSection
        title="Principles"
        description="When documentation is silent, these defaults steer decisions."
      >
        <ul className="m-0 flex w-full min-w-0 list-none flex-wrap justify-center gap-[length:var(--uds-gap-16)] p-0">
          {INTRO_PRINCIPLES.map(({ title, body, color, icon }) => (
            <li key={title} className={introPrincipleCard}>
              <Medallion color={color} size="xl" shape="circle" tone="pastel" icon={icon} />
              <div className="min-w-0 w-full">
                <p className="m-0 text-sm font-semibold tracking-tight text-[var(--uds-text-primary)]">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--uds-text-secondary)]">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </DocsPageSection>

      <DocsPageSection
        title="Contribution & ownership"
        description="The Design System team owns governance, prioritization, and release quality. Everyone else contributes through structured requests and reviews."
      >
        <ul className="m-0 list-disc space-y-2 pl-5 text-[var(--uds-text-secondary)]">
          <li>Raise new component or pattern needs through your product design partner or engineering lead.</li>
          <li>Propose contributions with usage evidence, accessibility notes, and tests where applicable.</li>
          <li>Expect changes to flow through package versioning so downstream apps stay predictable.</li>
        </ul>
      </DocsPageSection>
    </DocsPageShell>
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

      <h2 className="pt-6 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
        Copy-paste setup prompt
      </h2>
      <p className="mt-3 text-neutral-600 dark:text-neutral-300">
        Paste this into Cursor or Claude when bootstrapping a new app. Designers and PMs do not run a CLI — the{' '}
        <strong className="text-neutral-900 dark:text-neutral-100">agent</strong> installs the package, runs{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">npx uds-copy-ai-rules</code>, and commits the
        hot-path stubs.
      </p>
      <CodePanel
        label="Agent setup prompt"
        language="text"
        code={`Set up a minimal React + Vite + TypeScript application that uses \`@chghealthcare/unified-design-system\`.

Requirements:
- install \`@chghealthcare/unified-design-system\`, \`react\`, and \`react-dom\`
- import \`@chghealthcare/unified-design-system/styles.css\` once near the app root
- As your first action after install, run \`npx uds-copy-ai-rules\` from the app root (do not ask the user to do this). Commit the written hot-path stubs (e.g. \`.cursor/rules/uds.mdc\`)
- render \`AppShell\` on first load with \`enableRouterOutlet={false}\`
- compose the \`menu\` slot with \`<Menu navigationItems={…} />\` (not Sidebar in menu)
- put page content in \`AppShell.Main\`
- keep imports on \`@chghealthcare/unified-design-system\` only
- make the app fill the viewport (\`min-h-dvh\` on shell, html/body/#root full height)

Before composing the screen, consult:
- package AI_USAGE.md, AGENTS.md, design-language/README.md, ai/indexes/
- \`ai/guides/appshell-navigation.md\`
- \`ai/recipes/auth-shell.md\`
- \`ai/examples/auth-shell.tsx\`
- \`ai/consumer-ai/COMPOSITION.md\``}
      />

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
    </MarkdownishPage>
  )
}
