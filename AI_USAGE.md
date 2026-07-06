# AI Usage Guide

Source of truth: [`ai/uds-contract.json`](./ai/uds-contract.json)

When installed from npm, the same artifacts ship with the package:

| Path | Purpose |
|------|---------|
| `@chghealthcare/unified-design-system/contract` | Machine-readable UDS contract (JSON) |
| `@chghealthcare/unified-design-system/setup` | Bootstrap starter doc |
| `@chghealthcare/unified-design-system/figma-rules` | Figma build/update rules |
| `@chghealthcare/unified-design-system/figma-component-manifest` | In-Figma inventory |
| `@chghealthcare/unified-design-system/figma-component-props` | Figma ↔ React prop map |
| `ai/recipes`, `ai/examples`, `ai/guides` | Screen patterns (in tarball) |

Use this package as a published dependency, not as a source-code template. When prose docs disagree, follow the contract JSON and the recipe/example fixtures under [`ai/`](./ai).

## Consumer install (no shadcn init)

`npm install @chghealthcare/unified-design-system` does **not** show Table / Board / Roadmap or other template prompts. Those come from **`npx shadcn@latest init`** / **`create`** (or similar scaffolders), not from the package.

When generating or bootstrapping consumer apps:

- Install UDS + `react` + `react-dom`; import `styles.css` once.
- Compose **`AppShell`**, **`Menu`**, and **`AppShell.Main`** per [`setup.md`](./setup.md) and [`ai/recipes/*.md`](./ai/recipes/).
- **Do not** run `npx shadcn init`, `npx shadcn create`, or install the global shadcn/ui agent skill as part of default UDS adoption.
- **Do not** copy from `src/components/ui/*` in this monorepo — import only from `@chghealthcare/unified-design-system`.

## Allowed imports

```ts
import {
  AppShell,
  Button,
  Card,
  Menu,
  type MenuNavigationItem,
  TooltipProvider,
} from "@chghealthcare/unified-design-system"
import "@chghealthcare/unified-design-system/styles.css"
```

## Disallowed imports

Do not import from:

- `src/components/ui/*`
- `dist/*`
- repo-local aliases such as `@/*`
- any `*-base`, `*-core`, `*-theme`, or `*-uds` module in consumer code

## Brand (Menu / theme tokens)

- Published **`Menu`** defaults to brand id **`chg`** (CHG header wordmark + Connect-aligned token ramp on `document.documentElement`).
- Override with the **`brand`** prop, or **`defaultBrand`** when using **`brandStorageKey`**:

```tsx
<Menu navigationItems={items} brand="connect" />
```

- **Do not** rely on `localStorage` key `docs-site-data-brand` in product apps — that is for the internal docs site only.
- Optional persistence: pass **`brandStorageKey`** (e.g. `"uds-brand"`) if the app should remember a user-selected brand.
- Lower-level API: `applyUdsBrandToDocument`, `udsBrandToBrandingAppearance`, `UDS_DEFAULT_BRAND` (also exported from the package root).

## Default layout model

- For authenticated product screens, default to **`AppShell`**.
- Compose the **`menu`** slot with the package **`Menu`** component (not `Sidebar*` — see [`ai/guides/appshell-navigation.md`](./ai/guides/appshell-navigation.md)).
- Put page content in **`AppShell.Main`** (or unmarked children parsed as main).
- Use the **`listview`** prop for queues, inboxes, search results, or master-detail flows (omit to collapse the column).
- **Listview master–detail:** mount `AppShell` with `className="min-h-dvh w-full min-w-0"`. Only **`.appshell--main`** scrolls. The listview pane stays fixed; put a **pinned header** (`shrink-0`) and a scrollable list body on **`data-slot="appshell-listview-scroll"`**. See [`ai/recipes/detail-with-listview.md`](./ai/recipes/detail-with-listview.md).
- Layout tokens on `[data-slot="appshell"]`: `--appshell-menu-width-expanded`, `--appshell-menu-width-collapsed`, `--appshell-listview-width`, `--appshell-header-height`.
- Ensure `html`, `body`, and `#root` fill the viewport, then mount the shell with `min-h-dvh w-full min-w-0`.

### AppShell main region and router

- **`enableRouterOutlet`** defaults to **`true`**. AppShell renders a React Router **`<Outlet />`** inside `.appshell--main` **before** main children.
- **Static apps:** set **`enableRouterOutlet={false}`** and render pages in **`AppShell.Main`**.
- **Routed apps:** wrap the app in **one** `<BrowserRouter>` / `RouterProvider`, nest layout routes so **`AppShell`** is the layout element, and install **`react-router-dom`**. A consumer-only router **does not** feed the shell outlet unless it shares the same router context as the layout route.
- **Anti-pattern:** CSS that sets `.appshell--main > :first-child { max-height: 0 }` (or similar) to hide an empty outlet — fix composition instead.

Published prop names match **`dist/index.d.ts`**: `menu`, `listview`, `headerRight`, `footer`, `enableRouterOutlet`. There is no `sidebar`, `sidebarWidth`, `showListview`, or `mainClassName` on `AppShell` ( `sidebar` is a deprecated alias of `menu` only).

### Menu vs Sidebar

| Component | Use |
| --- | --- |
| **`Menu`** | Product navigation rail inside **`AppShell.menu`**. |
| **`Sidebar*`** | In-page side panels or layouts outside AppShell — not the AppShell rail unless you own positioning CSS. |

### AppShell debug checklist

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Content at bottom / double stack | Outlet + loose children; page root `flex-1` / `h-full` | Use **`AppShell.Main`** only; drop `flex-1` on page root |
| Empty main | Outlet on, no child route / no Router | Add nested routes or **`enableRouterOutlet={false}`** |
| Empty main after CSS “fix” | Zero-height first child in `.appshell--main` | Remove that CSS |
| Rail overlap | `Sidebar` in `menu` | Use **`Menu`** in **`menu`** |

## Styling rules

- Import `@chghealthcare/unified-design-system/styles.css` once near the app root.
- **`Text` typography:** use `variant` (`body`, `heading`, `display`) with `size` and optional `lineHeight`; styles resolve from shipped `--uds-type-*` tokens in `styles.css`. Consumer Tailwind JIT does **not** scan `node_modules` to create them. Read **[docs/consumers-text-typography-tailwind-v4.md](./docs/consumers-text-typography-tailwind-v4.md)** (token chain, import order, prop table).
- Use shipped UDS tokens, variants, and first-party components before inventing custom accents.
- Current shipped components are the radius source of truth:
  - prefer 4px or square corners for routine rectangular application chrome
  - preserve existing 8px and 12px radii where shipped in overlays or themed primitives
  - keep circle and pill shapes where intrinsic to the component
- Dark mode follows the existing `.dark` class convention.
- Consumers may override shipped CSS variables, but should not bypass the package stylesheet contract.

## Preferred components

When AI is generating new product UI, prefer these exported surfaces before creating custom chrome:

- Layout: `AppShell`, `Menu`, `SectionHeader`, `Card`
- Navigation: `Menu`, `Tabs`, `Breadcrumb` (use `Sidebar*` only outside AppShell menu)
- Emphasis and status: `Badge`, `Status`, `Medallion`
- Data and workflow: `Item`, `Table`, `Statistics`
- Overlays: `Dialog`, `Sheet`, `AlertDialog`

Low-level exports such as `BaseButton`, `buttonVariants`, and related theme helpers remain public for compatibility but should be treated as `avoid-directly` for AI-generated app code.

## Recipes and examples

Shipped in the npm package under `ai/`:

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

## Anti-patterns

- Do not build a custom outer shell when `AppShell` already fits.
- Do not put **`Sidebar*`** in **`AppShell.menu`** and add manual `fixed` rail CSS — use **`Menu`**.
- Do not import internal implementation files in consumer code.
- Do not default to neutral placeholder divs when UDS emphasis components already fit the screen.
- Do not use `.appshell--main > :first-child` zero-height hacks.
- Do not assume a consumer-only `BrowserRouter` fills AppShell’s outlet by default.
- Do not run **`npx shadcn init`** or **`npx shadcn create`** when adopting UDS in a consumer app — use the published package and [`setup.md`](./setup.md) instead.

## Registry consumers (maintainers only)

The **`@uds`** shadcn registry in this monorepo is for **docs and maintainers**, not the default consumer install path:

- namespace: `@uds`
- default development URL template: `http://localhost:5173/r/{name}.json`

Registry item payloads live in [`public/r`](./public/r) and are generated by:

```bash
npm run generate:ai
```
