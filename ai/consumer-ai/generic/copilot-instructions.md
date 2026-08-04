# GitHub Copilot — UDS consumer instructions

This repository uses `@chghealthcare/unified-design-system`.

Before generating React UI:

1. Prefer patterns from `node_modules/@chghealthcare/unified-design-system/ai/examples/` and `ai/recipes/`.
2. Follow `node_modules/@chghealthcare/unified-design-system/ai/consumer-ai/COMPOSITION.md`.
3. Imports only from `@chghealthcare/unified-design-system` and `@chghealthcare/unified-design-system/styles.css`.
4. Authenticated pages: `AppShell` + `Menu` in `menu`; content in `AppShell.Main` + `MainContent`.

## Composition — Required (Main layout)

Copy `ai/examples/workspace-dashboard.tsx` structure (KPI row → `lg:grid-cols-2` table | list).

- **Page composition** — Answer pre-layout questions (`design-language/semantics/page-composition.md`); match `design-language/patterns/screen-layout-patterns.md` (01–11); do not default to a full-width Card stack; **most content blocks ≤720px** — use columns when Main is wider. Also copy `settings-form`, `narrow-form`, `settings-nav-panel`, `data-workflow-table` when those patterns fit.
- **Main section gap** — Prefer `MainStack` (gap 24); FAIL: `gap-3` / `gap-5` / `space-y-2`.
- **Form fields** — Prefer stacked; `md:grid-cols-2` only for related pairs (first/last name) or dense forms.
- **Required: short regions share a row** — At `lg+`, lists/feeds/callouts/watchlists share `lg:grid-cols-2` (or chart `col-span-2` + aside). FAIL: skinny full-width placements/watchlist/feed/callout; Reports full-width stack.
- **Boxed padding** — Prefer `Card` + `CardContent` (16px all sides); FAIL: flush rows against the card border.

Also: StatisticCards horizontal (gap 16/24); no SearchInput in PageHeaderActions; Tabs prefer line (underlined) and `fill={false}` (condensed triggers; list still full width) with **24px** between TabsList and next item; Medallion `lg`; icon Buttons `size="icon"`; keep the prevalent component variant unless the problem requires a change; right Sheet/Drawer inspectors use Header → Body → Footer (Body scrolls; side footer horizontal) — copy `ai/examples/right-side-inspector.tsx`; AppShell listview uses `Toolbar` titlebar + SearchInput (**4px** pad + `border-b`) + `Item`/`Card` entities — copy `ai/examples/detail-with-listview.tsx`.

Copy this file to `.github/copilot-instructions.md` in the consumer app (or merge its contents).
