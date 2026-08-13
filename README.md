# @chghealthcare/unified-design-system

`@chghealthcare/unified-design-system` is the React UI package from this Tailwind v4 and shadcn-based design system workspace. Source repository: [chghealthcare/unified-design-system](https://github.com/chghealthcare/unified-design-system).

The package contract now has one canonical AI-readable source of truth:

- [`ai/uds-contract.json`](./ai/uds-contract.json)

Use that file for machine-readable guidance, then use the human-facing summaries here, in [`AI_USAGE.md`](./AI_USAGE.md), and in [`setup.md`](./setup.md).

## Installation

### GitHub Packages (recommended for internal apps)

If your team publishes this package to GitHub Packages, configure npm and install from the registry:

```bash
# In your app: .npmrc (see .npmrc.example in this repo)
@chghealthcare:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}

npm install @chghealthcare/unified-design-system react react-dom
```

See **[docs/github-packages.md](./docs/github-packages.md)** for PAT scopes, CI setup, and publishing.

### Tarball (offline / vendor channel)

This package can also be distributed as a versioned tarball (`.tgz` from `npm pack`), not from a public registry or CDN. Obtain the tarball from your approved internal channel, place it in your repository (for example a `vendor/` folder), and install it from the local path:

```bash
npm install ./vendor/chghealthcare-unified-design-system-1.0.5.tgz react react-dom
```

Or pin it as a `file:` dependency in `package.json` so every install resolves the same committed artifact:

```json
{
  "dependencies": {
    "@chghealthcare/unified-design-system": "file:./vendor/chghealthcare-unified-design-system-1.0.5.tgz"
  }
}
```

For routed shells (`AppShell` with the default internal `<Outlet />`), also add `react-router-dom`. Installing the tarball preserves the package name, so imports use `@chghealthcare/unified-design-system`. Import the stylesheet once near the app root:

```ts
import "@chghealthcare/unified-design-system/styles.css"
```

### Stylesheet & load performance

- Import **`styles.css` once** at the app root (do not re-import per route or component).
- If you do **not** need AppShell/Menu chrome, you can use the lighter **`@chghealthcare/unified-design-system/styles/base.css`** instead of full `styles.css`.
- Prefer a **published build** that ran full `build:lib` (includes `prepare-package`). Hand-built `dist` that skipped prepare-package may still embed Inter as base64 in CSS and make pages slow to load.
- If load is still slow after upgrading, you may be on an older tarball with inlined fonts — upgrade to a release that ships `fonts/Inter-Variable.woff2` as a separate file.
- Optional: **preload** Inter to reduce first-paint swap — see [`setup.md`](./setup.md#fonts--preload) (`@chghealthcare/unified-design-system/fonts/Inter-Variable.woff2`).
- `styles.css` is a **compiled** stylesheet, not a general Tailwind surface — it contains only the utilities UDS's own build emitted, so anything else silently no-ops in a consumer app. If you need utilities beyond it, add a local Tailwind v4 build that references **`@chghealthcare/unified-design-system/theme`** (the shipped `@theme` partial) instead of re-emitting Tailwind's theme. See **[docs/consumer-tailwind-theme.md](./docs/consumer-tailwind-theme.md)**.

### Vite dev performance

Published packages run `prepare-package`, which externalizes Inter and renames branding assets (`*.svg?url.js` → `*.svg.url.js`). With that build:

- **Do not** set `optimizeDeps.exclude: ['@chghealthcare/unified-design-system']`. Excluding UDS forces Vite to fetch hundreds of unbundled `dist/` + `@base-ui` modules and makes cold load feel painfully slow.
- **Do not** set `optimizeDeps.include: ['@chghealthcare/unified-design-system']` for the package **root** either. That force-prebundles the entire public barrel into one multi‑MB DEV chunk even when the app only needs AppShell/Menu.
- Leave Vite’s default discovery unless you measure a real waterfall after upgrade; then include only the specific heavy deps you need (not the UDS root entry).
- Lazy-load heavy routes (e.g. charts / `recharts`) so they are not on the initial graph.
- Import calendar / date / OTP from subpaths (`@chghealthcare/unified-design-system/calendar`, `/date-input`, `/date-range-input`, `/input-otp`, `/micro-calendar`) — they are not on the package root.

### Vite DEV Network sizes vs production

Chrome’s Network **Size** for `localhost` Vite DEV is mostly **uncompressed** prebundles. Vite also serves optimized deps with **inline base64 source maps**, which inflate each chunk by roughly **3×** vs on-disk `.vite/deps`.

- `react-dom_*` / `react-router-dom` look multi‑MB in DEV; that is expected framework cost, not a UDS regression.
- The footer **Resources / Transferred** total often lands around **20–30 MB** for an AppShell + router app (UDS prebundle + framework + optional charts, all uncompressed and map-inflated). That is expected in DEV; it is not production shipping weight.
- Judge shipping weight with `vite build && vite preview` (or Lighthouse on preview). Production JS for a typical AppShell app is far smaller than the DEV Network panel suggests.

## Consumer setup (product apps)

**`npm install` is the whole install step.** The published package has no CLI, no `postinstall` script, and no project template wizard. If you see prompts such as **Table / Board / Roadmap** or **Select a template**, that is **not** from UDS — it comes from another tool (usually `npx shadcn@latest init` or `npx shadcn@latest create`) run during onboarding.

For consumer apps:

1. Install `@chghealthcare/unified-design-system`, `react`, and `react-dom` (see above).
2. Import `@chghealthcare/unified-design-system/styles.css` once at the app root.
3. Import components from `@chghealthcare/unified-design-system`. Use **subpaths** for heavy modules: `/calendar`, `/date-input`, `/date-range-input`, `/input-otp`, `/micro-calendar`, `/chart`, `/drawer`, etc.
4. Compose **`AppShell`** + **`Menu`** + **`AppShell.Main`** — see [Quick start](#quick-start-appshell--menu) and [`setup.md`](./setup.md).
5. **AI stubs on the hot path** (required for AI-assisted work; **agent-owned**). Designers/PMs do not run a CLI. Setup agents, after install, run from the consumer app root:

```bash
npx uds-copy-ai-rules
# or: npx uds-copy-ai-rules --tool=cursor
```

Commit the written Cursor / Claude / AGENTS / Copilot stubs (or bake them into your starter). `design-language/` in `node_modules` is cold storage until this step. Full matrix: [`ai/guides/consumer-ai-bootstrap.md`](./ai/guides/consumer-ai-bootstrap.md). Also see [`AI_USAGE.md`](./AI_USAGE.md).

**Do not** run `npx shadcn init`, `npx shadcn create`, or copy UDS source from this monorepo when adopting the package. UDS is a **published dependency**, not a shadcn scaffold. The [`@uds` registry](./registry.json) in this repository is for **maintainers and docs** (`npm run generate:ai`); consumer apps do not need `components.json` or the shadcn CLI unless your team explicitly chose a copy-into-repo workflow.

If an AI agent or starter script runs shadcn for you, stop it and follow [`setup.md`](./setup.md) instead. To run shadcn non-interactively in an unrelated project, use flags such as `-y` and `--defaults` — but that is separate from installing UDS.

## Development (this repository)

Working on UDS itself (not just consuming it)? See **[CONTRIBUTING.md](./CONTRIBUTING.md)** for
Node version setup, local dev commands, required checks, how to add or remove a public component
(subpath exports are generated, not hand-edited), and the release process.

You may still see `npm warn deprecated node-domexception` while installing devDependencies: it is pulled in by the `shadcn` CLI via `node-fetch` / `fetch-blob`. It is safe to ignore for building this package; upstream would need to drop that chain to silence the warning.

## Quick start (AppShell + Menu)

`AppShell` exposes a **`menu`** slot (not `sidebar`). Use the package **`Menu`** in that slot so shipped CSS can offset the main column from `[data-slot="uds-menu-root"]`. Put page UI in **`AppShell.Main`**. For static pages, set **`enableRouterOutlet={false}`**.

```tsx
import {
  AppShell,
  Card,
  Menu,
  TooltipProvider,
  type MenuNavigationItem,
} from "@chghealthcare/unified-design-system"
import "@chghealthcare/unified-design-system/styles.css"

const navigationItems: MenuNavigationItem[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "reports", label: "Reports" },
]

export function Example() {
  return (
    <TooltipProvider>
      <AppShell
        className="min-h-dvh w-full min-w-0"
        enableRouterOutlet={false}
        menu={
          <Menu
            navigationItems={navigationItems}
            activeId="dashboard"
            onNavigationSelect={() => {}}
          />
        }
      >
        <AppShell.Main>
          <Card className="m-6 rounded-[4px] p-6">AppShell is mounted at runtime.</Card>
        </AppShell.Main>
      </AppShell>
    </TooltipProvider>
  )
}
```

Full navigation, routing, and troubleshooting: [`ai/guides/appshell-navigation.md`](./ai/guides/appshell-navigation.md).

### Brand

`Menu` defaults to **`chg`** (CHG wordmark and theme tokens). Override with the `brand` prop — no `localStorage` setup required:

```tsx
<Menu navigationItems={items} activeId="dashboard" onNavigationSelect={() => {}} />
```

See [`AI_USAGE.md`](./AI_USAGE.md) for `defaultBrand`, `brandStorageKey`, and `applyUdsBrandToDocument`.

## Public API model

The root package entrypoint is [`src/index.ts`](./src/index.ts). That file is the canonical public API.

Consumers and AI tools should import only from:

- `@chghealthcare/unified-design-system`
- `@chghealthcare/unified-design-system/styles.css`

AI governance artifacts ship in the npm tarball (see [`AI_USAGE.md`](./AI_USAGE.md)):

- `@chghealthcare/unified-design-system/contract`
- `@chghealthcare/unified-design-system/setup`
- `@chghealthcare/unified-design-system/figma-rules`
- `@chghealthcare/unified-design-system/figma-component-manifest`
- `@chghealthcare/unified-design-system/figma-component-props`

Do not infer public API from internal implementation files under `src/components/ui`.

## Consumer typography (Tailwind v4 + Vite)

`Text` maps `variant` (`body`, `heading`, `display`), `size`, and `lineHeight` to the shipped `--uds-type-*` tokens. Apps **must** import `@chghealthcare/unified-design-system/styles.css`; scanning `node_modules` with `@source` alone is not enough. See **[docs/consumers-text-typography-tailwind-v4.md](./docs/consumers-text-typography-tailwind-v4.md)** for the full contract (token chain, layer conflicts, prop table, debugging).

## AI contract

The AI/tooling contract lives in [`ai/uds-contract.json`](./ai/uds-contract.json) and includes:

- allowed and forbidden imports
- layout defaults
- public export catalog with recommendations
- current styling and radius policy
- screen recipes
- anti-patterns
- registry metadata

Human-facing summaries:

- [`AI_USAGE.md`](./AI_USAGE.md)
- [`setup.md`](./setup.md)
- [`AGENTS.md`](./AGENTS.md)
- [`.cursor/rules/uds-design-system.mdc`](./.cursor/rules/uds-design-system.mdc)

## Recipes and examples

Recipe docs (shipped in the npm package under `ai/`):

- [`ai/recipes/auth-shell.md`](./ai/recipes/auth-shell.md)
- [`ai/recipes/workspace-dashboard.md`](./ai/recipes/workspace-dashboard.md)
- [`ai/recipes/detail-with-listview.md`](./ai/recipes/detail-with-listview.md)
- [`ai/recipes/settings-form.md`](./ai/recipes/settings-form.md)
- [`ai/guides/appshell-navigation.md`](./ai/guides/appshell-navigation.md)

Canonical example outputs:

- [`ai/examples/auth-shell.tsx`](./ai/examples/auth-shell.tsx)
- [`ai/examples/workspace-dashboard.tsx`](./ai/examples/workspace-dashboard.tsx)
- [`ai/examples/detail-with-listview.tsx`](./ai/examples/detail-with-listview.tsx)
- [`ai/examples/settings-form.tsx`](./ai/examples/settings-form.tsx)

Consumer smoke fixture:

- [`examples/consumer-react/src/App.tsx`](./examples/consumer-react/src/App.tsx)

## shadcn registry

This repo now ships a local-first custom registry surface:

- source manifest: [`registry.json`](./registry.json)
- generated items: [`public/r`](./public/r)
- shadcn namespace in [`components.json`](./components.json): `@uds`
- default local URL template: `http://localhost:5173/r/{name}.json`

Regenerate the AI contract and registry artifacts with:

```bash
npm run generate:ai
```

## Local development

```bash
npm install
npm run generate:ai
npm run dev
```

Full contributor workflow — required checks, adding/removing components, and releasing — lives in
**[CONTRIBUTING.md](./CONTRIBUTING.md)**.
