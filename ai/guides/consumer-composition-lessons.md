# Consumer composition lessons → DSL map

Distilled from a consumer Cursor session that repeatedly corrected UDS layouts. Use this as a maintainer index: each durable rule points at the canonical design-language (or code) source. Not a raw prompt dump.

| Lesson (from consumer prompts) | Canonical source |
|--------------------------------|------------------|
| Statistic cards horizontal, gap 16/24 | [`design-language/ontology/statistic-card.md`](../../design-language/ontology/statistic-card.md) |
| No SearchInput in header / PageHeader actions | [`design-language/ontology/page-header.md`](../../design-language/ontology/page-header.md), [`patterns/search.md`](../../design-language/patterns/search.md) |
| Main first-level section gap 16/24 only (no gap-3/gap-5) | [`semantics/appshell-main-containment.md`](../../design-language/semantics/appshell-main-containment.md), [`semantics/spacing-levels.md`](../../design-language/semantics/spacing-levels.md) |
| Required: short regions share a row at lg+ (lists/feeds/callouts) | [`semantics/appshell-main-containment.md`](../../design-language/semantics/appshell-main-containment.md) |
| Boxed Cards/panels need edge padding (CardContent or p-16/24) | [`semantics/appshell-main-containment.md`](../../design-language/semantics/appshell-main-containment.md) |
| Horizontal Tabs fill width | [`ontology/tabs.md`](../../design-language/ontology/tabs.md) |
| Table cell padding 4–8; first/last 16–24 | [`ontology/table-list.md`](../../design-language/ontology/table-list.md) |
| Compact/`sm` controls in table/list rows | [`ontology/table-list.md`](../../design-language/ontology/table-list.md), [`semantics/density.md`](../../design-language/semantics/density.md) |
| Grid peer heights: match in a row (esp. non-bottom); stretch if Δ ≤ 150px; bottom row may stay natural | [`foundations/grid.md`](../../design-language/foundations/grid.md) |
| PageHeader → first content ≤ 24px | [`ontology/page-header.md`](../../design-language/ontology/page-header.md) |
| MainContent fixed: no outer L/R pad; no min-height; inner 24px | [`semantics/appshell-main-containment.md`](../../design-language/semantics/appshell-main-containment.md), [`ontology/main-content.md`](../../design-language/ontology/main-content.md) |
| Toolbar: one primary; default size; >3 → DotsThree | [`semantics/toolbar-action-slots.md`](../../design-language/semantics/toolbar-action-slots.md) |
| DotsThree last + `weight="bold"` (not fill) | [`semantics/toolbar-action-slots.md`](../../design-language/semantics/toolbar-action-slots.md) |
| Filterbar filters icon-only after SearchInput | [`ontology/filterbar.md`](../../design-language/ontology/filterbar.md) |
| SectionHeader tight line height | [`ontology/section-header.md`](../../design-language/ontology/section-header.md) |
| Stacked bar touching radius 0 | [`semantics/stacked-bar-radius.md`](../../design-language/semantics/stacked-bar-radius.md) |
| Medallion default lg | [`ontology/medallion.md`](../../design-language/ontology/medallion.md) |
| Icon-only Buttons square; size icon = 44 | [`ontology/button.md`](../../design-language/ontology/button.md), [`semantics/button-icon-size.md`](../../design-language/semantics/button-icon-size.md) |
| Button icon glyph scale 12/16/16/20/24 | [`semantics/button-icon-size.md`](../../design-language/semantics/button-icon-size.md) |
| Brand via Menu `brand` | [`ontology/menu.md`](../../design-language/ontology/menu.md), [`ai/guides/menu-header-identity.md`](./menu-header-identity.md) |
| FAIL: second `<Outlet />` as AppShell children while `enableRouterOutlet` is true → duplicated / overlapping pages | [`ai/guides/appshell-navigation.md`](./appshell-navigation.md), [`anti-patterns/layout-mistakes.md`](../../design-language/anti-patterns/layout-mistakes.md) |

## Why docs alone failed

Agents in consumer apps load **project** AGENTS / CLAUDE / `.cursor/rules`, not all of `node_modules/.../design-language/`. See [`consumer-ai-bootstrap.md`](./consumer-ai-bootstrap.md). Setup and upgrade agents run `npx uds-copy-ai-rules` and commit — designers/PMs do not. After upgrading UDS, re-run the bin on the upgrade PR so composition blocks stay current.

## Hot-path mirrors

- Package [`AGENTS.md`](../../AGENTS.md) / [`CLAUDE.md`](../../CLAUDE.md) — Composition — Required
- Consumer stubs — [`ai/consumer-ai/`](../consumer-ai/)
- Evals — [`ai/evals/checklist.md`](../evals/checklist.md), [`tenant-dashboard-layout`](../evals/prompts/tenant-dashboard-layout.md)
