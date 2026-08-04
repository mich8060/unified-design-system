# UDS AI Rules

Canonical **what/how** contract: [`ai/uds-contract.json`](./ai/uds-contract.json)

Canonical **why/when** Design System Language: [`design-language/`](./design-language/) — start at [`design-language/README.md`](./design-language/README.md) and [`ai/indexes/`](./ai/indexes/).

- AppShell schema (regions, props, behavior): [`ai/appshell.schema.json`](./ai/appshell.schema.json)
- AppShell navigation guide: [`ai/guides/appshell-navigation.md`](./ai/guides/appshell-navigation.md)
- Pattern routing: [`design-language/decision-rules/choosing-patterns.md`](./design-language/decision-rules/choosing-patterns.md)
- Decision trees: [`design-language/decision-rules/trees/`](./design-language/decision-rules/trees/)

## Reasoning order

1. State **intent** ([`design-language/semantics/intent.md`](./design-language/semantics/intent.md)).
2. Apply **grammar** ([`design-language/grammar/`](./design-language/grammar/)) — AppShell regions, pattern containment.
3. Choose a **recipe** via choosing-patterns / decision trees.
4. Implement with contract **components** + `ai/examples/*.tsx`.
5. Respect **confidence** labels in DSL (`Required` vs `Strong Recommendation` vs `Optional`).

## Hard rules

- Import runtime components only from `@chghealthcare/unified-design-system`.
- Import styles only from `@chghealthcare/unified-design-system/styles.css`.
- Do not import from `src/components/ui/*`, `dist/*`, `@/*`, or any `*-base`, `*-core`, `*-theme`, `*-uds` module in consumer-facing code.
- For authenticated product screens, default to `AppShell`.
- Compose the **`AppShell` `menu` slot** with the package **`Menu`** component (canonical). Do not use `Sidebar*` in `menu` unless the product owns full rail CSS.
- **Branding + menu toggle** live in the full-width **AppShell Header** (above the rail). Menu inside AppShell is nav-only — no logos, no collapse control, no collapsed mark swap.
- Set **`brand`** / **`headerVariant`** / **`headerTitle`** on **`AppShell`** (default brand **`chg`**). Use `headerVariant="title"` with `headerTitle` for internal tools — see [`ai/guides/menu-header-identity.md`](./ai/guides/menu-header-identity.md).
- Put page content in **`AppShell.Main`** (background `--uds-surface-secondary`). Contain it with **`MainContent`**: `containment="edge"` or `containment="fixed"` (1280px primary panel + right border, left-aligned 1000px inner). **Recommended:** keep the same containment (container layout or edge) across the app’s pages — do not mix modes route-to-route. Main / `MainContent` have **no built-in padding** — recommend **24px** (`p-[length:var(--uds-spacing-24)]`). See [`design-language/semantics/appshell-main-containment.md`](./design-language/semantics/appshell-main-containment.md).
- Set **`enableRouterOutlet={false}`** for static apps; use nested React Router layout routes when the default outlet is enabled. **FAIL:** do not also render `<Outlet />` as AppShell children while the bundled outlet is enabled — that double-mounts pages.
- Use AppShell **`listview`** whenever the collection **affects / drives** what Main shows (master–detail). Do not fake that with a custom split only inside Main. Width **`listviewWidth` 320–480px** (default 320) based on content need. Compose with **`Toolbar`** as the primary titlebar (title/count in `ToolbarTitle` / `ToolbarDescription`) + optional `SearchInput` (**Required:** **4px** padding on all sides around the field + `border-b` on the wrapper), then **`Item`** (`appearance="list"` for dense queues) **or** **`Card`** for entities. See [`design-language/semantics/listview-drives-main.md`](./design-language/semantics/listview-drives-main.md) and `ai/examples/detail-with-listview.tsx`.
- Use a **right side panel** (`Sheet` with `side="right"`) whenever the user needs **more details about something in Main**. Do not confuse with listview. Compose **Header → Body → Footer** (`SheetBody` scrolls; side footer actions horizontal). Drawer uses the same regions. See [`design-language/semantics/right-side-panel.md`](./design-language/semantics/right-side-panel.md), [`design-language/ontology/sheet.md`](./design-language/ontology/sheet.md), [`design-language/ontology/drawer.md`](./design-language/ontology/drawer.md), and `ai/examples/right-side-inspector.tsx`.
- **AppShell body** (`.appshell--body` / main canvas) uses **`--uds-surface-secondary`**; do not paint Main as primary white—cards/panels use surface primary on top. See [`design-language/semantics/appshell-body-surface.md`](./design-language/semantics/appshell-body-surface.md).
- Use existing UDS exports before inventing new layout or component chrome.
- Prefer recipe-aligned patterns from `ai/recipes/*.md` and `ai/examples/*.tsx` when generating a new screen (including denser layouts: ops-queue-dashboard, triage-dashboard, provider-portal-home, analytics-overview).
- Treat `ai/uds-contract.json` as normative for APIs when prose docs disagree; treat `design-language/` as normative for composition reasoning.
- **Do not** use CSS that collapses `.appshell--main > :first-child` to fix layout.
- **Do not** assume consumer `react-router-dom` alone fills AppShell without a layout route under the same router.

## Composition — Required (high-frequency)

Before composing authenticated screens, apply these rules. Full prose lives under `design-language/`; do not skip them because they are “only in ontology.”

- **Page composition** — Answer the pre-layout questions in [`design-language/semantics/page-composition.md`](./design-language/semantics/page-composition.md) before stacking sections; match anatomy from [`screen-layout-patterns`](./design-language/patterns/screen-layout-patterns.md) (01–11). Do **not** default to a vertical stack of full-width Cards. **Most content blocks ≤720px**; use columns (or `max-w-[720px]` / prose) when Main is wider. Prefer narrow/fixed reading columns, multi-column grids, settings nav+panel, or edge full-width tables as the pattern requires. Demos: [`workspace-dashboard`](./ai/examples/workspace-dashboard.tsx), [`analytics-overview`](./ai/examples/analytics-overview.tsx), [`settings-form`](./ai/examples/settings-form.tsx), [`narrow-form`](./ai/examples/narrow-form.tsx), [`settings-nav-panel`](./ai/examples/settings-nav-panel.tsx), [`data-workflow-table`](./ai/examples/data-workflow-table.tsx).
- **StatisticCards** — Lay out in a **horizontal row** with gap **16 or 24** only. See [`design-language/ontology/statistic-card.md`](./design-language/ontology/statistic-card.md).
- **No Search in header actions** — Do **not** put `SearchInput` in `PageHeaderActions` or Header trailing. Use Filterbar / list filters / Header search props. See [`design-language/ontology/page-header.md`](./design-language/ontology/page-header.md).
- **Main section gap** — Prefer **`MainStack`** (gap 24); FAIL: `gap-3` / `gap-5` / `space-y-2`. See [`design-language/semantics/appshell-main-containment.md`](./design-language/semantics/appshell-main-containment.md).
- **Form fields** — Prefer **stacked** (single column). Use `md:grid-cols-2` only for **related** pairs (e.g. first & last name) or dense forms that need the space. FAIL: unrelated fields side-by-side by default. See [`design-language/patterns/forms.md`](./design-language/patterns/forms.md).
- **Required: short regions share a row** — At `lg+`, lists/feeds/callouts/watchlists **must** share `lg:grid-cols-2` (or chart `col-span-2` + aside). FAIL: skinny full-width placements/watchlist/feed/callout; Reports full-width stack. Canonical: [`ai/examples/workspace-dashboard.tsx`](./ai/examples/workspace-dashboard.tsx), [`ai/examples/analytics-overview.tsx`](./ai/examples/analytics-overview.tsx).
- **Boxed padding** — Prefer `Card` + `CardContent` (**16px** all sides; naked Cards auto-pad 16px); FAIL: flush content on the box edge. See [`design-language/ontology/card.md`](./design-language/ontology/card.md).
- **Horizontal Tabs** — Prefer **`variant="line"`** (underlined, default). Prefer **`fill={false}`** (condensed triggers; list still full width). Use `fill={true}` only for equal-width triggers. **Required:** **24px** between `TabsList` and the next item. See [`design-language/ontology/tabs.md`](./design-language/ontology/tabs.md).
- **Headline hierarchy (Required)** — Only `PageHeaderTitle` is heading/**28**. Prefer section/`h2`/`SectionHeaderTitle` at **body/20/semibold**; Sheet/Drawer titles stay **16**. **FAIL IF** any other headline matches or exceeds the page title. See [`design-language/semantics/hierarchy.md`](./design-language/semantics/hierarchy.md).
- **Table cells** — Body **py 8px**; horizontal interior **4px**; **first** cell left **16–24px**; **last** cell right **16–24px**. **`TableHead` ≥ 48px** tall. In table/list rows, use **compact / `sm`** nested controls (`Status size="compact"`, `Badge size="sm"`, etc.). Trailing row actions (button / link / icons) → last `TableHead`/`TableCell` **`className="w-0"`** (hug content at the far end). See [`design-language/ontology/table-list.md`](./design-language/ontology/table-list.md).
- **Status** — Prefer **`appearance="outlined"`** (default). Appearances match Badge (`subtle` / `pastel` / `outlined` / `solid`) on the same accent ramps (`error`→red, `warning`→yellow, `success`→green, `info`→blue). See [`design-language/ontology/status.md`](./design-language/ontology/status.md).
- **Badge** — Hug label content (`w-fit` / inline); **FAIL IF** Badge spans its container full width. See [`design-language/ontology/badge.md`](./design-language/ontology/badge.md).
- **Feedback colors** — Error → **destructive**; warning → **warning**; success → **constructive**; information → **action/info**. FAIL wrong family. See [`design-language/foundations/color.md`](./design-language/foundations/color.md).
- **Dominant variant** — If one component variant is already prevalent, keep using it unless the problem requires a different treatment. See [`design-language/semantics/dominant-variant.md`](./design-language/semantics/dominant-variant.md).
- **Grid peer heights** — **Match heights** in a row (especially non-bottom rows) to avoid mid-page negative space under short peers. Rebalance content first; stretch when Δ **≤ 150px** and density is similar. Bottom row may stay natural. Prefer `items-start` only when peers cannot rebalance. **FAIL IF** stretch creates **>150px** empty Card interior. See [`design-language/foundations/grid.md`](./design-language/foundations/grid.md).
- **Card clipping** — **FAIL IF** Card/`overflow-hidden` cuts off body text or rows. See [`design-language/composition/overflow.md`](./design-language/composition/overflow.md).
- **PageHeader → content** — Never more than **24px** between Page Header bottom and first content. See [`design-language/ontology/page-header.md`](./design-language/ontology/page-header.md).
- **MainContent `fixed`** — Outer 1280: **no L/R padding**, no min-height, no extra wrap box; inner 1000 padding from `appearance` (`default` 24 / `expanded` 48). See [`design-language/semantics/appshell-main-containment.md`](./design-language/semantics/appshell-main-containment.md).
- **Toolbar actions** (`PageHeaderActions` / `FilterbarActions`) — Exactly **one** primary Button; labeled actions **default size**; if more than three buttons, overflow behind **DotsThree*** **last on the right** with **`weight="bold"`** (not `fill` / regular). Prefer **no Badge** in `PageHeaderActions` — keep status/count with the title stack. See [`design-language/semantics/toolbar-action-slots.md`](./design-language/semantics/toolbar-action-slots.md).
- **Filterbar SearchInput** — Gray parent → `surface="primary"` (white); white parent → `surface="secondary"` / default (gray). **FilterbarFilters:** icon-only **`size="icon"`**, immediately **after** search. See [`design-language/ontology/filterbar.md`](./design-language/ontology/filterbar.md).
- **Medallion** — Prefer / default **`size="lg"`**. See [`design-language/ontology/medallion.md`](./design-language/ontology/medallion.md).
- **Icon-only Buttons** — Always **square**; use **`size="icon"`** (44×44) next to default-height controls. Glyph sizes: [`design-language/semantics/button-icon-size.md`](./design-language/semantics/button-icon-size.md).
- **Stacked bar charts** — Touching segment ends **radius 0**. See [`design-language/semantics/stacked-bar-radius.md`](./design-language/semantics/stacked-bar-radius.md).

Consumer apps: setup agents run `npx uds-copy-ai-rules` and commit hot-path stubs — designers/PMs do not. See [`ai/guides/consumer-ai-bootstrap.md`](./ai/guides/consumer-ai-bootstrap.md).

## Figma component builds

When creating or updating UDS components in Figma (`use_figma`, Code Connect, token binding), treat [`figma.component.rules.md`](./figma.component.rules.md) as **normative**. Workflow and inventory: [`ai/guides/figma-component-build.md`](./ai/guides/figma-component-build.md), [`ai/figma-component-manifest.json`](./ai/figma-component-manifest.json). Variable/token sync scripts: [`ai/guides/figma-variable-sync.md`](./ai/guides/figma-variable-sync.md).

- Load **`figma-use`** and **`figma-generate-library`** before any mutating `use_figma` call.
- **Never one-shot** a component — work in small sequential phases; validate with `get_metadata` / `get_screenshot` after each step.
- Run **`use_figma` mutations strictly sequentially** (no parallel writes to the same file).
- **Foundations before components** — bind every visual property to UDS variables; no hardcoded hex, px spacing, or radius.
- **Spacing levels** — outer/first-level gaps **16 or 24px**; inner gaps within items **12 or 16px**. See [`design-language/semantics/spacing-levels.md`](./design-language/semantics/spacing-levels.md).
- **Search before creating** — reuse local components/variables; prefer semantic color modes over light/dark variants; brand via Brand collection modes, not per-brand variants.
- **Icons** — use the **`Icon`** component with **`INSTANCE_SWAP`** (Phosphor glyphs); never text chevrons or a variant per icon.
- **Radius** — never above 12px on rectangles; radius **decreases** with nesting depth; **same hierarchy level → same radius**. See [`design-language/semantics/nested-radius.md`](./design-language/semantics/nested-radius.md). `rounded-full` only for true circles/pills.
- **Checkpoint with the user** per component (screenshot + variant count) before moving to the next.
