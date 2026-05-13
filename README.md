# @chg-ds/unified-design-system

`@chg-ds/unified-design-system` is the publishable React UI package from this Tailwind v4 and shadcn-based design system workspace. Source repository: [chghealthcare/unified-design-system](https://github.com/chghealthcare/unified-design-system).

The package contract now has one canonical AI-readable source of truth:

- [`ai/uds-contract.json`](./ai/uds-contract.json)

Use that file for machine-readable guidance, then use the human-facing summaries here, in [`AI_USAGE.md`](./AI_USAGE.md), and in [`setup.md`](./setup.md).

## Installation

```bash
npm install @chg-ds/unified-design-system react react-dom
```

Import the stylesheet once near the app root:

```ts
import "@chg-ds/unified-design-system/styles.css"
```

## Development (this repository)

Use **Node.js 22 LTS** (or **24+**) for local installs so `npm` does not report `EBADENGINE` for `eslint-visitor-keys@5` (its `engines` field does not list Node 23). Run `nvm use` (or `fnm use`) in the repo root; the [`.nvmrc`](./.nvmrc) file pins `22`. If you use [Volta](https://volta.sh/), the repo’s `package.json` includes a matching `volta.node` pin.

You may still see `npm warn deprecated node-domexception` while installing devDependencies: it is pulled in by the `shadcn` CLI via `node-fetch` / `fetch-blob`. It is safe to ignore for building this package; upstream would need to drop that chain to silence the warning.

## Quick start

```tsx
import {
  AppShell,
  Button,
  Card,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  TooltipProvider,
} from "@chg-ds/unified-design-system"
import "@chg-ds/unified-design-system/styles.css"

export function Example() {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppShell
          className="min-h-dvh w-full min-w-0"
          sidebarWidth={280}
          showListview={false}
          mainClassName="bg-[var(--uds-color-neutrals-50)]"
          sidebar={
            <Sidebar collapsible="none">
              <SidebarHeader>Workspace</SidebarHeader>
              <SidebarContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive>Dashboard</SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarContent>
              <SidebarFooter>
                <Button className="w-full rounded-[4px]">New item</Button>
              </SidebarFooter>
            </Sidebar>
          }
        >
          <Card className="m-6 rounded-[4px] p-6">AppShell is mounted at runtime.</Card>
        </AppShell>
      </SidebarProvider>
    </TooltipProvider>
  )
}
```

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

Recipe docs:

- [`ai/recipes/auth-shell.md`](./ai/recipes/auth-shell.md)
- [`ai/recipes/workspace-dashboard.md`](./ai/recipes/workspace-dashboard.md)
- [`ai/recipes/detail-with-listview.md`](./ai/recipes/detail-with-listview.md)
- [`ai/recipes/settings-form.md`](./ai/recipes/settings-form.md)

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

## Publishing (maintainers)

**Git:** Push branches and tags to `https://github.com/chghealthcare/unified-design-system` (remote `origin`).

**npm:** The package name is `@chg-ds/unified-design-system`. Scoped packages use `publishConfig.access: "public"` in `package.json`.

1. Bump `version` in `package.json` and merge to `main`.
2. Ensure `npm ci`, `npm run build:lib`, and `npm run pack:check` pass locally (CI runs `build:lib` and `lint` on push/PR).
3. Create a GitHub **Release** (or git tag) for that version.
4. Publish from a clean checkout with an npm account that has rights to the `@chg-ds` org:

   ```bash
   npm whoami
   npm publish
   ```

   `prepublishOnly` runs `build:lib` automatically. Alternatively, use the **Publish npm package** GitHub Action (workflow dispatch or release), after adding an **`NPM_TOKEN`** repository secret (granular token with publish access to `@chg-ds/unified-design-system`).
