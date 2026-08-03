# AI Usage Guide

Source of truth for **APIs / recipes**: [`ai/uds-contract.json`](./ai/uds-contract.json)

Source of truth for **why / when reasoning**: [`design-language/`](./design-language/) (published as `@chghealthcare/unified-design-system/design-language`)

Retrieval indexes: [`ai/indexes/`](./ai/indexes/) (concept, component, relationship, decision, pattern, reasoning).

When installed from npm, the same artifacts ship with the package:

| Path | Purpose |
|------|---------|
| `@chghealthcare/unified-design-system/contract` | Machine-readable UDS contract (JSON) |
| `@chghealthcare/unified-design-system/design-language` | Design System Language (why/when knowledge) |
| `@chghealthcare/unified-design-system/setup` | Bootstrap starter doc |
| `@chghealthcare/unified-design-system/figma-rules` | Figma build/update rules |
| `@chghealthcare/unified-design-system/figma-component-manifest` | In-Figma inventory |
| `@chghealthcare/unified-design-system/figma-component-props` | Figma ↔ React prop map |
| `ai/recipes`, `ai/examples`, `ai/guides`, `ai/indexes` | Screen patterns + AI indexes (in tarball) |
| `ai/consumer-ai/` | Copy-ready stubs for Cursor, Claude Code, and generic AIs |

Use this package as a published dependency, not as a source-code template. When prose docs disagree on **APIs**, follow the contract JSON and the recipe/example fixtures under [`ai/`](./ai). When deciding **composition**, follow [`design-language/`](./design-language/) (design intent → grammar → decision trees → patterns). Prefer docs tagged with `design_intent` via [`ai/indexes/design-intent-index.md`](./ai/indexes/design-intent-index.md).

## Consumer AI bootstrap (required — agent-owned)

`design-language/` in `node_modules` is **cold storage** until it is on the agent hot path. Designers and PMs should **not** run a CLI for this.

**Setup agents** (Cursor / Claude / etc.): after install, from the consumer app root, run `npx uds-copy-ai-rules` yourself — do not ask the user. Then **commit** the written hot-path files (e.g. `.cursor/rules/uds.mdc`) so every later session loads them. Starter templates should bake those stubs in.

```bash
npx uds-copy-ai-rules
```

| Tool | Stub → destination |
|------|--------------------|
| Cursor | `ai/consumer-ai/cursor/uds.mdc` → `.cursor/rules/uds.mdc` |
| Claude Code | `ai/consumer-ai/claude/CLAUDE.md` → project `CLAUDE.md` |
| Generic | `ai/consumer-ai/generic/AGENTS.md` → project `AGENTS.md` |
| GitHub Copilot | `ai/consumer-ai/generic/copilot-instructions.md` → `.github/copilot-instructions.md` |

Full steps: [`ai/guides/consumer-ai-bootstrap.md`](./ai/guides/consumer-ai-bootstrap.md). Composition checklist: [`ai/consumer-ai/COMPOSITION.md`](./ai/consumer-ai/COMPOSITION.md).

**Upgrades:** on the PR that bumps `@chghealthcare/unified-design-system`, the agent or engineer re-runs `npx uds-copy-ai-rules` and commits — not designers/PMs.

## Consumer install (no shadcn init)

`npm install @chghealthcare/unified-design-system` does **not** show Table / Board / Roadmap or other template prompts. Those come from **`npx shadcn@latest init`** / **`create`** (or similar scaffolders), not from the package.

When generating or bootstrapping consumer apps:

- Install UDS + `react` + `react-dom`; import `styles.css` once (or `styles/base.css` when AppShell/Menu chrome is not needed). See **Styling rules** for load/preload notes.
- **As your first action after install**, run `npx uds-copy-ai-rules` (do not ask the user) and commit the hot-path stubs — see [`ai/guides/consumer-ai-bootstrap.md`](./ai/guides/consumer-ai-bootstrap.md).
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
- Use the **`listview`** prop for queues, inboxes, search results, or master-detail flows (omit to collapse the column). Optional **`listviewWidth`** (**320–480**, default **320**).
- **Listview master–detail:** mount `AppShell` with `className="min-h-dvh w-full min-w-0"`. Only **`.appshell--main`** scrolls. Compose the pane with a **`Toolbar`** titlebar (`shrink-0`), optional `SearchInput`, and **`Item`** / **`Card`** entities in **`data-slot="appshell-listview-scroll"`**. See [`ai/recipes/detail-with-listview.md`](./ai/recipes/detail-with-listview.md).
- Put Main body in **`MainContent`** (`edge` | `fixed`). **Recommended:** keep that containment choice consistent across the app’s pages.
- Layout tokens on `[data-slot="appshell"]`: `--appshell-menu-width-expanded`, `--appshell-menu-width-collapsed`, `--appshell-listview-width` (**320–480px**, default 320; set via `listviewWidth`), `--appshell-header-height`.
- Ensure `html`, `body`, and `#root` fill the viewport, then mount the shell with `min-h-dvh w-full min-w-0`.

### AppShell main region and router

- **`enableRouterOutlet`** defaults to **`true`**. AppShell renders a React Router **`<Outlet />`** inside `.appshell--main` **before** main children.
- **Static apps:** set **`enableRouterOutlet={false}`** and render pages in **`AppShell.Main`**.
- **Routed apps:** wrap the app in **one** `<BrowserRouter>` / `RouterProvider`, nest layout routes so **`AppShell`** is the layout element, and install **`react-router-dom`**. A consumer-only router **does not** feed the shell outlet unless it shares the same router context as the layout route. Do **not** also render `<Outlet />` as AppShell children when the bundled outlet is enabled — that double-mounts pages.
- **Anti-pattern:** CSS that sets `.appshell--main > :first-child { max-height: 0 }` (or similar) to hide an empty outlet — fix composition instead.
- **Anti-pattern:** `<Outlet />` as AppShell children while **`enableRouterOutlet`** is `true` — use **one** outlet only.

Published prop names match **`dist/index.d.ts`**: `menu`, `listview`, `listviewWidth`, `headerRight`, `headerLeading`, `hideSearch`, `footer`, `enableRouterOutlet`. There is no `sidebarWidth`, `showListview`, or `mainClassName` on `AppShell` (`sidebar` is a deprecated alias of `menu` only).

### Menu vs Sidebar

| Component | Use |
| --- | --- |
| **`Menu`** | Product navigation rail inside **`AppShell.menu`**. |
| **`Sidebar*`** | In-page side panels or layouts outside AppShell — not the AppShell rail unless you own positioning CSS. |

### AppShell debug checklist

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Overlapping / duplicated page chrome | `<Outlet />` (or page UI) as AppShell children while **`enableRouterOutlet`** is `true` (default) | Use **one** outlet only — bundled outlet **or** `enableRouterOutlet={false}` + one `<Outlet />` in **`AppShell.Main`** |
| Content at bottom / double stack | Outlet + loose children; page root `flex-1` / `h-full` | Use **`AppShell.Main`** only; drop `flex-1` on page root |
| Empty main | Outlet on, no child route / no Router | Add nested routes or **`enableRouterOutlet={false}`** |
| Empty main after CSS “fix” | Zero-height first child in `.appshell--main` | Remove that CSS |
| Rail overlap | `Sidebar` in `menu` | Use **`Menu`** in **`menu`** |

## Styling rules

- Import `@chghealthcare/unified-design-system/styles.css` **once** near the app root (not per route or component).
- If AppShell/Menu chrome is not needed, prefer `@chghealthcare/unified-design-system/styles/base.css` instead of full `styles.css`.
- **Recipe / COMPOSITION layouts:** styles.css-only consumers get multi-column utilities taught by `ai/examples` and `ai/consumer-ai/COMPOSITION.md` (`lg:grid-cols-2`, `lg:grid-cols-[240px_minmax(0,1fr)]`, `lg:items-start`, etc.). A consumer Tailwind JIT scan is **not** required for those class strings.
- **Load performance:** published builds ship Inter as a separate `fonts/Inter-Variable.woff2` (~200 KB), not base64-inlined in CSS. Use a published package (or a `dist` produced by full `npm run build:lib` / `prepare-package`). If pages are still slow to load, upgrade off older tarballs that inlined the font. Optional preload: [`setup.md`](./setup.md#fonts--preload).
- **Vite `optimizeDeps`:** do **not** `exclude` `@chghealthcare/unified-design-system` (waterfall). Do **not** `include` the package **root** either (one multi‑MB DEV prebundle of the full barrel). Prepared packages already sanitize branding filenames — leave default discovery unless you measure a real waterfall. Lazy-load chart/recharts routes. Import calendar/date/OTP from subpaths (`/calendar`, `/date-input`, `/date-range-input`, `/input-otp`, `/micro-calendar`). Prefer component subpaths (`/button`, `/select`, `/table`, `/alert`, `/app-shell`, …) in Vitest or narrow screens so the root barrel is not evaluated. **DEV Network Size** for `react-dom_*` / `react-router-dom` is expected; inline dep source maps inflate chunks (~3×), so the footer **Resources** total often lands **20–30 MB** in DEV — not production weight. Measure with `vite build && vite preview`.
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

- Layout: `AppShell`, `Menu`, `MainContent`, `PageHeader`, `SectionHeader`, `Filterbar`, `Card`
- Navigation: `Menu`, `Tabs`, `Breadcrumb` (use `Sidebar*` only outside AppShell menu)
- Emphasis and status: `Badge`, `Status`, `Medallion`
- Data and workflow: `Item`, `Table`, `StatisticCard`
- Overlays: `Dialog`, `Sheet`, `AlertDialog`

Low-level exports such as `BaseButton`, `buttonVariants`, and related theme helpers remain public for compatibility but should be treated as `avoid-directly` for AI-generated app code.

## Recipes and examples

Shipped in the npm package under `ai/`:

- [`ai/recipes/auth-shell.md`](./ai/recipes/auth-shell.md)
- [`ai/recipes/workspace-dashboard.md`](./ai/recipes/workspace-dashboard.md)
- [`ai/recipes/detail-with-listview.md`](./ai/recipes/detail-with-listview.md)
- [`ai/recipes/settings-form.md`](./ai/recipes/settings-form.md)
- [`ai/recipes/ops-queue-dashboard.md`](./ai/recipes/ops-queue-dashboard.md)
- [`ai/recipes/triage-dashboard.md`](./ai/recipes/triage-dashboard.md)
- [`ai/recipes/provider-portal-home.md`](./ai/recipes/provider-portal-home.md)
- [`ai/recipes/analytics-overview.md`](./ai/recipes/analytics-overview.md)
- [`ai/guides/appshell-navigation.md`](./ai/guides/appshell-navigation.md)

Canonical example outputs:

- [`ai/examples/auth-shell.tsx`](./ai/examples/auth-shell.tsx)
- [`ai/examples/workspace-dashboard.tsx`](./ai/examples/workspace-dashboard.tsx)
- [`ai/examples/detail-with-listview.tsx`](./ai/examples/detail-with-listview.tsx)
- [`ai/examples/settings-form.tsx`](./ai/examples/settings-form.tsx)
- [`ai/examples/ops-queue-dashboard.tsx`](./ai/examples/ops-queue-dashboard.tsx)
- [`ai/examples/triage-dashboard.tsx`](./ai/examples/triage-dashboard.tsx)
- [`ai/examples/provider-portal-home.tsx`](./ai/examples/provider-portal-home.tsx)
- [`ai/examples/analytics-overview.tsx`](./ai/examples/analytics-overview.tsx)

These denser dashboard recipes were distilled from UDS prototyping starter layouts (ops queue, triage, provider portal, analytics). Prefer the package recipes/examples over copying a full Speckit playground into product apps.

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
