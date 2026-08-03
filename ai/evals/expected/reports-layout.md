# Expected signals

## Shell

- `AppShell` with `Menu` in `menu` (not `Sidebar*` in menu)
- `AppShell.Main` → `MainContent` + `PageHeader` + **`MainStack`**
- Imports only from `@chghealthcare/unified-design-system` (+ `styles.css` / chart subpath)

## Composition

- **`MainStack`** (or equivalent first-level gap **16 or 24** only) under PageHeader
- Chart + activity feed in **`lg:grid-cols-3`** (chart `col-span-2`) — not stacked full-width
- Secondary chart + callout in a **multi-column** row
- Two summary tables in **`lg:grid-cols-2`**
- **`Card` + `CardContent`** with ≥16px padding (or table `CardContent p-0` with cell edge pad)
- No `SearchInput` in PageHeaderActions

## Anti-signals (fail)

- Every chart, feed, callout, and table stacked **full-width** in one column (oversized short regions)
- Activity feed or Priority focus alone full-width when a chart peer exists
- Specialty mix and Client performance tables stacked full-width (no `lg:grid-cols-2`)
- First-level gaps of `gap-3` / `gap-5` / `space-y-2` / missing `MainStack`
- Chart or list flush to a bordered box (no CardContent / padding)
- `Sidebar*` used as AppShell product rail
