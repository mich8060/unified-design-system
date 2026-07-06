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

## Consumer setup (product apps)

**`npm install` is the whole install step.** The published package has no CLI, no `postinstall` script, and no project template wizard. If you see prompts such as **Table / Board / Roadmap** or **Select a template**, that is **not** from UDS — it comes from another tool (usually `npx shadcn@latest init` or `npx shadcn@latest create`) run during onboarding.

For consumer apps:

1. Install `@chghealthcare/unified-design-system`, `react`, and `react-dom` (see above).
2. Import `@chghealthcare/unified-design-system/styles.css` once at the app root.
3. Import components from `@chghealthcare/unified-design-system` only.
4. Compose **`AppShell`** + **`Menu`** + **`AppShell.Main`** — see [Quick start](#quick-start-appshell--menu) and [`setup.md`](./setup.md).

**Do not** run `npx shadcn init`, `npx shadcn create`, or copy UDS source from this monorepo when adopting the package. UDS is a **published dependency**, not a shadcn scaffold. The [`@uds` registry](./registry.json) in this repository is for **maintainers and docs** (`npm run generate:ai`); consumer apps do not need `components.json` or the shadcn CLI unless your team explicitly chose a copy-into-repo workflow.

If an AI agent or starter script runs shadcn for you, stop it and follow [`setup.md`](./setup.md) instead. To run shadcn non-interactively in an unrelated project, use flags such as `-y` and `--defaults` — but that is separate from installing UDS.

## Development (this repository)

Use **Node.js 22 LTS** (or **24+**) for local installs so `npm` does not report `EBADENGINE` for `eslint-visitor-keys@5` (its `engines` field does not list Node 23). Run `nvm use` (or `fnm use`) in the repo root; the [`.nvmrc`](./.nvmrc) file pins `22`. If you use [Volta](https://volta.sh/), the repo’s `package.json` includes a matching `volta.node` pin.

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

Useful checks:

```bash
npm run lint
npm run typecheck
npm run build
npm run pack:check
```

## Releasing (maintainers)

**Git:** Push branches and tags to `https://github.com/chghealthcare/unified-design-system` (remote `origin`).

1. Bump `version` in `package.json` and merge to `main`.
2. Ensure `npm ci`, `npm run build:lib`, and `npm run pack:check` pass locally (CI runs `build:lib` and `lint` on push/PR).
3. **Documentation snapshots** (sidebar version history): created only on **minor** or **major** bumps, not every patch. Run `npm run build:docs` on minor/major releases and commit generated files under `src/docs/versions/`. See **[docs/docs-version-snapshots.md](./docs/docs-version-snapshots.md)**.
4. Create a GitHub **Release** for that version. That triggers:
   - **GitHub Packages** — [`.github/workflows/publish-github-packages.yml`](./.github/workflows/publish-github-packages.yml) publishes to `npm.pkg.github.com`
   - **npmjs** (optional) — [`.github/workflows/publish-npm.yml`](./.github/workflows/publish-npm.yml) if `NPM_TOKEN` is configured
5. Optionally build and pack a tarball from a clean checkout:

   ```bash
   npm run build:lib
   npm pack
   ```

   This writes `chghealthcare-unified-design-system-<version>.tgz`. Distribute that file through your approved internal channel; consumers install it from a local path. `npm pack` runs `prepublishOnly` (`build:lib`) automatically.
