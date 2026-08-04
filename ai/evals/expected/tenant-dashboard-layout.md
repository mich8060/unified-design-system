# Expected signals

## Shell

- `AppShell` with `Menu` in `menu` (not `Sidebar*` in menu)
- `AppShell.Main` wraps page content
- Imports only from `@chghealthcare/unified-design-system` (+ `styles.css`)

## Composition

- StatisticCards / KPI tiles in a **horizontal** flex/grid row with gap **16 or 24**
- **Main section gap** — First-level siblings use **only** `--uds-gap-16` or `--uds-gap-24` (prefer `MainStack`)
- **Required: short regions share a row** — At least one `lg:grid-cols-2` (pipeline | placements); additional short regions (watchlist, callout) also paired — not stacked full-width alone
- **Boxed padding** — Every Card/bordered panel has edge padding (`CardContent` or p-16/24)
- Peer boxes in a row match heights (esp. non-bottom); stretch when near-equal (≤ 150px); bottom row may stay natural
- No `SearchInput` in PageHeaderActions / Header trailing
- Medallion uses default **`lg`** (or explicit `size="lg"`)
- Icon-only Buttons use `size="icon"` and remain square
- If Filterbar present: filters are icon-only after SearchInput; actions have one primary; DotsThree (if any) last + `weight="bold"`
- If stacked Bar chart present: touching ends use radius `0` on the join

## Anti-signals (fail)

- KPI cards stacked full-width only with no horizontal row
- First-level Main gaps of `gap-3`, `gap-5`, `space-y-2`, 8/12/20/32, or no gap between sections
- Full-width pipeline/table stacked above full-width placements/list (no `lg:grid-cols-2`)
- Skinny full-width watchlist / placements / callout with large empty horizontal space (short region alone)
- Flush Card/panel content with no edge padding / no `CardContent` (rows touch the border)
- Search field in page header actions
- Compact/`sm` as the default for PageHeader/Filterbar action CTAs
- Three-dots menu not last, or `weight="fill"` on DotsThree
- `Sidebar*` used as AppShell product rail
