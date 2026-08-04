# UDS Contract

This file covers **consuming** UDS in a product app. Working on the UDS package itself (adding a
component, running repo checks, publishing a release)? See [`CONTRIBUTING.md`](./CONTRIBUTING.md)
instead.

Use [`ai/uds-contract.json`](./ai/uds-contract.json) as the source of truth for **what** (APIs, recipes, anti-patterns).

Use [`design-language/`](./design-language/) as the Design System Language for **why/when** reasoning (philosophy → physics → semantics → grammar → decisions → patterns → ontology → tokens).

- AI retrieval indexes: [`ai/indexes/`](./ai/indexes/)
- AppShell (props, regions, DOM, AI rules): [`ai/appshell.schema.json`](./ai/appshell.schema.json)
- AppShell navigation: [`ai/guides/appshell-navigation.md`](./ai/guides/appshell-navigation.md)
- Shell header identity (`brand` vs `title` on AppShell): [`ai/guides/menu-header-identity.md`](./ai/guides/menu-header-identity.md)
- Branding + menu toggle live in the full-width AppShell Header; Menu in AppShell is nav-only
- Pattern chooser: [`design-language/decision-rules/choosing-patterns.md`](./design-language/decision-rules/choosing-patterns.md)

- Allowed imports: `@chghealthcare/unified-design-system` and `@chghealthcare/unified-design-system/styles.css`
- Default authenticated layout: `AppShell` with **`Menu`** in the **`menu`** slot; page content in **`AppShell.Main`** via **`MainContent`** (`edge` | `fixed`). Keep that containment choice consistent across the app’s pages.
- Branding + menu toggle live in the full-width **AppShell Header**; set `brand` / `headerVariant` / `headerTitle` on AppShell — Menu in AppShell is nav-only
- `Sidebar*` is for in-page side panels, not the AppShell product rail unless you own rail CSS
- Prefer existing UDS components before inventing new chrome
- Consult `ai/recipes/*.md` and `ai/examples/*.tsx` before composing a new screen
- Main canvas is surface-secondary; use `MainContent` for edge vs fixed containment (**Recommended:** same mode app-wide); recommend 24px padding (`--uds-spacing-24`) — [`design-language/semantics/appshell-main-containment.md`](./design-language/semantics/appshell-main-containment.md)
- Reason through `design-language/decision-rules/trees/` before inventing layout

## Composition — Required (high-frequency)

Mirror of [`AGENTS.md`](./AGENTS.md) — apply before composing screens:

- **Page composition** — Answer pre-layout questions in [`page-composition`](./design-language/semantics/page-composition.md); match [`screen-layout-patterns`](./design-language/patterns/screen-layout-patterns.md) (01–11); do not default to a full-width Card stack. **Most content blocks ≤720px**; use columns when Main is wider. Demos: workspace-dashboard, analytics-overview, settings-form, narrow-form, settings-nav-panel, data-workflow-table
- **StatisticCards** — Horizontal row, gap **16 or 24** — [`design-language/ontology/statistic-card.md`](./design-language/ontology/statistic-card.md)
- **No Search in header actions** — No `SearchInput` in `PageHeaderActions` / Header trailing — [`design-language/ontology/page-header.md`](./design-language/ontology/page-header.md)
- **Main section gap** — Prefer `MainStack` (gap 24); FAIL: gap-3/gap-5 — [`appshell-main-containment`](./design-language/semantics/appshell-main-containment.md)
- **Form fields** — Prefer stacked; `md:grid-cols-2` only for related pairs or dense forms — [`forms`](./design-language/patterns/forms.md)
- **Required: short regions share a row** — `lg:grid-cols-2` / chart+aside; FAIL: skinny full-width list/feed/callout — [`ai/examples/workspace-dashboard.tsx`](./ai/examples/workspace-dashboard.tsx)
- **Boxed padding** — `Card`+`CardContent` (16px); FAIL: flush on box edge — [`ontology/card.md`](./design-language/ontology/card.md)
- **Horizontal Tabs** — Prefer **`variant="line"`** (underlined, default); prefer `fill={false}`; **Required:** **24px** between `TabsList` and next item — [`design-language/ontology/tabs.md`](./design-language/ontology/tabs.md)
- **Table cells** — Body **py 8px**; horizontal **4px**; first L / last R **16–24**; **`TableHead` ≥ 48px**; compact/`sm` controls in rows; trailing actions → last cell **`w-0`** (hug) — [`design-language/ontology/table-list.md`](./design-language/ontology/table-list.md)
- **Status** — Prefer **`appearance="outlined"`**; appearances match Badge (`subtle`/`pastel`/`outlined`/`solid`) — [`design-language/ontology/status.md`](./design-language/ontology/status.md)
- **Badge** — Hug content; **FAIL IF** full-width of container — [`design-language/ontology/badge.md`](./design-language/ontology/badge.md)
- **Feedback colors** — Error → destructive; warning → warning; success → constructive; info → action/info — [`design-language/foundations/color.md`](./design-language/foundations/color.md)
- **Grid peers** — Match heights (esp. non-bottom rows); stretch if Δ **≤ 150px**; bottom row may stay natural — [`design-language/foundations/grid.md`](./design-language/foundations/grid.md)
- **PageHeader → content** — **≤ 24px** — [`design-language/ontology/page-header.md`](./design-language/ontology/page-header.md)
- **MainContent `fixed`** — Outer no L/R pad, no min-height, no wrap box; inner 1000 **24px** pad — [`design-language/semantics/appshell-main-containment.md`](./design-language/semantics/appshell-main-containment.md)
- **Toolbar actions** — One primary; default size; >3 → DotsThree **last**, `weight="bold"` (not fill); prefer no Badge in `PageHeaderActions` — [`design-language/semantics/toolbar-action-slots.md`](./design-language/semantics/toolbar-action-slots.md)
- **Filterbar SearchInput** — Gray parent → `surface="primary"`; white parent → `surface="secondary"` (default). Filters: icon-only `size="icon"` after search — [`design-language/ontology/filterbar.md`](./design-language/ontology/filterbar.md)
- **Medallion** — Prefer **`lg`** — [`design-language/ontology/medallion.md`](./design-language/ontology/medallion.md)
- **Icon-only Buttons** — Square; `size="icon"` (44) by default — [`design-language/semantics/button-icon-size.md`](./design-language/semantics/button-icon-size.md)
- **Stacked bars** — Touching ends radius **0** — [`design-language/semantics/stacked-bar-radius.md`](./design-language/semantics/stacked-bar-radius.md)

Consumer apps: setup agents run `npx uds-copy-ai-rules` and commit — see [`ai/guides/consumer-ai-bootstrap.md`](./ai/guides/consumer-ai-bootstrap.md).
