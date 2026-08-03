# Expected signals

## Shell

- `AppShell` with `Menu` in `menu`
- `AppShell.Main` wraps page content
- Imports only from `@chghealthcare/unified-design-system` (+ `styles.css`)

## Composition

- `MainContent containment="edge"` (or equivalent full Main width for the workflow)
- `Filterbar` with SearchInput, icon-only filters (`size="icon"`) immediately after search, and actions with one primary
- One dominant Table inside `Card` + `CardContent` (`p-0` acceptable); not a Card-per-row stack
- Nested Status compact; trailing action cell hugs (`w-0`) when present
- No `SearchInput` in PageHeaderActions

## Anti-signals (fail)

- Primary collection split into stacked skinny full-width Cards instead of one table
- Search in PageHeaderActions
- Labeled text filter buttons after SearchInput instead of icon-only `size="icon"`
- Double Card+Table outer borders
- `Sidebar*` used as AppShell product rail
