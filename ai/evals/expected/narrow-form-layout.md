# Expected signals

## Shell

- `AppShell` with `Menu` in `menu`
- `AppShell.Main` wraps page content
- Imports only from `@chghealthcare/unified-design-system` (+ `styles.css`)

## Composition

- **`MainContent containment="fixed"`** (or equivalent fixed reading panel)
- Form body constrained to a **narrow** width (`--uds-container-prose` / ~640px max-width, or similarly tight column) — not edge-to-edge Main
- `PageHeader` and `MainStack` (or gap 16/24 between first-level sections)
- Fields use `Field` chrome; not a Card-per-field stack
- No `SearchInput` in PageHeaderActions

## Anti-signals (fail)

- Short form stretched full width of Main / edge containment with no max-width
- Every field or section wrapped in its own Card
- Vertical stack of full-width Cards for a 3–5 field task
- `Sidebar*` used as AppShell product rail
