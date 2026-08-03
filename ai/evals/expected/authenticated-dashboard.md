# Expected signals

- `AppShell` is present at the top level
- `Menu` is composed in the `menu` slot (not `Sidebar*` in `menu`)
- `AppShell.Main` wraps page content (or `enableRouterOutlet` with nested routes)
- branded emphasis uses `Badge`, `Status`, `Medallion`, and `Card`
- imports remain on the package root
- KPI / StatisticCards (if present) are in a **horizontal row** with gap 16 or 24
- **Main section gap** — First-level siblings: only 16 or 24 (fail `gap-3` / `gap-5` / missing gap)
- **Required: short regions share a row** — Multi-region dashboards at desktop (fail skinny full-width list/feed/callout; fail single full-width stack of every section)
- **Boxed padding** — Cards/panels have edge padding (fail flush content)
- Medallion prefers **lg**; no SearchInput in PageHeaderActions
- See `ai/evals/checklist.md` Composition section for full high-frequency rules
