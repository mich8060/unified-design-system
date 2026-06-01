# @chg-ds/unified-design-system

`@chg-ds/unified-design-system` is the React UI package from this Tailwind v4 and shadcn-based design system workspace. Source repository: [chghealthcare/unified-design-system](https://github.com/chghealthcare/unified-design-system).

The package contract now has one canonical AI-readable source of truth:

- [`ai/uds-contract.json`](./ai/uds-contract.json)

Use that file for machine-readable guidance, then use the human-facing summaries here, in [`AI_USAGE.md`](./AI_USAGE.md), and in [`setup.md`](./setup.md).

## Installation

This package is distributed as a versioned tarball (`.tgz` from `npm pack`), not from a public registry or CDN. Obtain the tarball from your approved internal channel, place it in your repository (for example a `vendor/` folder), and install it from the local path:

```bash
npm install ./vendor/chg-ds-unified-design-system-1.0.5.tgz react react-dom
```

Or pin it as a `file:` dependency in `package.json` so every install resolves the same committed artifact:

```json
{
  "dependencies": {
    "@chg-ds/unified-design-system": "file:./vendor/chg-ds-unified-design-system-1.0.5.tgz"
  }
}
```

For routed shells (`AppShell` with the default internal `<Outlet />`), also add `react-router-dom`. Installing the tarball preserves the package name, so imports use `@chg-ds/unified-design-system`. Import the stylesheet once near the app root:

```ts
import "@chg-ds/unified-design-system/styles.css"
```

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
} from "@chg-ds/unified-design-system"
import "@chg-ds/unified-design-system/styles.css"

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

- `@chg-ds/unified-design-system`
- `@chg-ds/unified-design-system/styles.css`

Do not infer public API from internal implementation files under `src/components/ui`.

## Consumer typography (Tailwind v4 + Vite)

`Text` maps `variant` (`body`, `heading`, `display`), `size`, and `lineHeight` to the shipped `--uds-type-*` tokens. Apps **must** import `@chg-ds/unified-design-system/styles.css`; scanning `node_modules` with `@source` alone is not enough. See **[docs/consumers-text-typography-tailwind-v4.md](./docs/consumers-text-typography-tailwind-v4.md)** for the full contract (token chain, layer conflicts, prop table, debugging).

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

This package is not published to a public registry or CDN. Each release is distributed as a versioned tarball that consumers install from a local path (see [Installation](#installation)).

**Git:** Push branches and tags to `https://github.com/chghealthcare/unified-design-system` (remote `origin`).

1. Bump `version` in `package.json` and merge to `main`.
2. Ensure `npm ci`, `npm run build:lib`, and `npm run pack:check` pass locally (CI runs `build:lib` and `lint` on push/PR).
3. Create a GitHub **Release** (or git tag) for that version.
4. Build and pack the distributable tarball from a clean checkout:

   ```bash
   npm run build:lib
   npm pack
   ```

   This writes `chg-ds-unified-design-system-<version>.tgz`. Distribute that file through your approved internal channel; consumers install it from a local path. `npm pack` runs `prepublishOnly` (`build:lib`) automatically.
