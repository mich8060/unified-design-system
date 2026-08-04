# Expected signals

## Shell

- `AppShell` with `Menu` in `menu`
- `AppShell.Main` wraps page content
- Imports only from `@chghealthcare/unified-design-system` (+ `styles.css`)

## Composition

- In-Main **two-column** settings IA: **vertical `Tabs`** (`orientation="vertical"`, prefer `variant="line"`) | `TabsContent` panel
- **Not** AppShell `listview` slot; **not** product Menu as the only section nav
- Content panel uses Field chrome; not Card-per-field
- `PageHeader` / `MainStack` (or gap 16/24)
- **24px** between vertical `TabsList` and panel content
- No `SearchInput` in PageHeaderActions

## Anti-signals (fail)

- Settings sections only as product Menu items with no in-Main nav column
- AppShell `listview` used for settings section switching
- Full-width stack of Cards for each settings section with no nav column
- Hand-rolled `Item appearance="list"` (or similar) instead of vertical `Tabs` for section switching
- Horizontal `Tabs` as the primary settings section rail
- `Sidebar*` used as AppShell product rail
