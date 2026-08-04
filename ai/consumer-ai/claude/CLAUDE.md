# UDS consumer — Claude Code instructions

This project uses `@chghealthcare/unified-design-system`. Before composing authenticated UI, read:

- `node_modules/@chghealthcare/unified-design-system/AI_USAGE.md`
- `node_modules/@chghealthcare/unified-design-system/AGENTS.md`
- `node_modules/@chghealthcare/unified-design-system/design-language/README.md`
- `node_modules/@chghealthcare/unified-design-system/ai/indexes/`
- Recipes/examples: `node_modules/@chghealthcare/unified-design-system/ai/recipes/`, `ai/examples/`

Merge this file into the app root `CLAUDE.md` (or keep as the project `CLAUDE.md`).

## Imports

```tsx
import { AppShell, Button, Card, Menu } from "@chghealthcare/unified-design-system"
import "@chghealthcare/unified-design-system/styles.css"
```

Do not import from `src/components/ui/*`, `dist/*`, `@/*`, or `*-base` / `*-core` / `*-theme` / `*-uds`.

## Shell

- Authenticated screens: `AppShell` with `Menu` in `menu` (not `Sidebar*` for the product rail)
- Page content: `AppShell.Main` + `MainContent` (`edge` | `fixed`)
- Override brand with `Menu` `brand` prop (e.g. `brand="connect"`)

## Composition — Required

See `node_modules/@chghealthcare/unified-design-system/ai/consumer-ai/COMPOSITION.md` and apply:

- **Page composition** — Answer pre-layout questions (`design-language/semantics/page-composition.md`); match `design-language/patterns/screen-layout-patterns.md` (01–11); do not default to a full-width Card stack; **most content blocks ≤720px** — use columns when Main is wider. Demos: settings-form, narrow-form, settings-nav-panel, data-workflow-table, workspace-dashboard
- StatisticCards horizontal, gap 16/24
- No SearchInput in PageHeaderActions / Header trailing
- **Main section gap** — Prefer `MainStack` (gap 24); FAIL: gap-3/gap-5/space-y-2
- **Form fields** — Prefer stacked; `md:grid-cols-2` only for related pairs (first/last name) or dense forms
- **Required: short regions share a row** — At `lg+`, lists/feeds/callouts/watchlists share `lg:grid-cols-2` (or chart `col-span-2` + aside). FAIL: skinny full-width placements/watchlist/feed/callout; Reports full-width stack. Copy `ai/examples/workspace-dashboard.tsx`
- **Boxed padding** — Prefer `Card`+`CardContent` (16px all sides); FAIL: flush rows. Copy `ai/examples/workspace-dashboard.tsx`
- Tabs prefer variant line (underlined, default); prefer fill={false} (condensed triggers; list still w-full); **Required:** 24px between TabsList and next item; table body py 8 / edges 16–24; TableHead ≥48px; compact/sm controls in rows; trailing actions → last cell w-0 (hug)
- Status prefer appearance outlined (default); solid only for stronger emphasis
- Dominant variant: keep the prevalent style unless the problem requires a change; FAIL decorative mixing
- Grid peers: match heights (esp. non-bottom rows); stretch if Δ ≤ 150px; bottom row may stay natural; FAIL stretch voids >150px
- **Headline hierarchy (Required)** — Only PageHeaderTitle is 28; prefer section/h2 at body/20/semibold; Sheet/Drawer titles 16. FAIL IF section/panel ≥ page title
- PageHeader → content ≤ 24px
- MainContent fixed geometry (no outer L/R pad; inner 24px)
- Toolbar: one primary, default size, DotsThree last + bold (not fill)
- FilterbarFilters: icon-only size="icon" after SearchInput
- Medallion lg; icon Buttons square size="icon"; stacked bar touching radius 0
- **Right Sheet / Drawer inspectors** — Required Header → Body → Footer; Body scrolls; side footer horizontal. Prefer Sheet. Copy `ai/examples/right-side-inspector.tsx`
- **AppShell listview** — `listviewWidth` 320–480 (default 320); `Toolbar` titlebar; SearchInput **Required 4px** pad all sides + `border-b`; entities `Item` (`appearance="list"` dense) or `Card`. FAIL: custom header / flush SearchInput / ad-hoc rows. Copy `ai/examples/detail-with-listview.tsx`
- **MainContent** — Keep `edge` or `fixed` consistent across the app’s pages
- **Card clip / stretch voids** — FAIL: Card cuts off copy; FAIL: stretch creates >150px empty Card interior (prefer items-start)
