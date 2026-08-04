---
id: row-dividers
category: semantics
type: rule
priority: high
ai_priority: critical
confidence_default: required
related:
  - tables
  - lists
  - borders
  - table-list-ontology
  - alignment
  - density
  - listview-drives-main
components:
  - Table
  - TableRow
  - TableBody
  - Item
  - ItemGroup
patterns:
  - tables
  - lists
  - detail-pages
  - ops-queue-dashboard
  - triage-dashboard
tokens:
  - "--uds-border-primary"
depends_on:
  - borders
influences:
  - tables
  - lists
conflicts_with:
  - visual-noise
alternatives: []
---

# Row dividers (tables & lists)

## What

When displaying data as **rows** (table rows or list rows), each row except the last has a **bottom border** using the primary border color. The **last row** has **no** bottom border.

## Why

Hairline dividers create scan lines without boxing every row. Dropping the last border avoids a double line against the container edge or footer and keeps the collection optically closed.

## When

Apply to:

- `Table` / `TableRow` data bodies
- Custom list rows that mimic tabular/queue collections
- Item stacks presented as a flat row list (when using divider treatment rather than outlined cards)
- **AppShell `listview` master panes** — Dense queues use flat dividers ([`listview-drives-main`](./listview-drives-main.md)): `Item appearance="list"` (built-in bottom border; last sibling drops it) + `ItemGroup className="gap-0"`. Richer listview entities may use `Card` instead.

Do **not** apply between unrelated sections—only between sibling rows in the same list/table body.

## Border color (required)

| Role | Token | Typical class |
|------|-------|----------------|
| Row bottom divider | `--uds-border-primary` | `border-b border-border` |

In theme wiring, `--border` resolves to `--uds-border-primary`, so `border-border` is the correct utility for primary border color.

Do **not** use secondary/tertiary borders, brand borders, or hardcoded hex for standard data-row dividers.

## Last row (required)

| Row position | Bottom border |
|--------------|---------------|
| Every row except last | Yes — `border-b` + primary border color |
| **Last row** in the list/body | **No** bottom border |

## UDS implementation (Table)

Shipped behavior in `src/components/ui/table.tsx`:

| Part | Class / behavior |
|------|------------------|
| `TableRow` | `border-b` (divider on each row) |
| `TableBody` | `[&_tr:last-child]:border-0` (clears last row) |

Prefer the published `Table*` components so this rule is inherited. If composing a custom row list, mirror the same pattern:

```tsx
<ul className="flex flex-col">
  {rows.map((row, i) => (
    <li
      key={row.id}
      className={
        i === rows.length - 1
          ? undefined
          : "border-b border-border" /* --uds-border-primary */
      }
    >
      {/* row content */}
    </li>
  ))}
</ul>
```

CSS-only equivalent for a body container:

```tsx
<div className="[&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-border">
  {/* rows */}
</div>
```

## How AI should reason

1. Identify a vertical stack of data rows (table or list).
2. Apply bottom border `--uds-border-primary` / `border-border` on each row.
3. Remove the border on the last row (`last:border-b-0`, `:last-child`, or equivalent).
4. Prefer UDS `Table` + `TableBody` + `TableRow` over reinventing dividers.
5. Do not add heavy card chrome or double borders per row unless the pattern is outlined Item cards **in Main** (different treatment). Never use outlined Item cards in AppShell `listview`.

Confidence: Required — Data rows use a primary-border bottom divider.

Confidence: Required — The last row in the list/table body has no bottom border.

Confidence: Required — Dense AppShell `listview` queues use flat row-dividers (`appearance="list"`); Card is allowed for richer entities.

## Relationships

### Supports

- Scanability in tables and queues
- Alignment / visual rhythm of collections

### Requires

- Borders foundation (`--uds-border-primary`)

### Influences

- tables pattern, lists pattern, queue recipes

### Uses

- `Table`, `TableRow`, `TableBody`
- `--uds-border-primary` / `border-border`

### Conflicts With

- Missing dividers on mid-list rows
- Bottom border on the final row (double edge)
- Non-primary divider colors for standard data rows
- Card-wrapping every row instead of hairline dividers

### Alternatives

- Outlined `Item` cards (full border per item) **only in Main** when each row is intentionally a distinct interactive card—not in the AppShell `listview` slot
- Separators between *sections* (SectionHeader), not between every row

### Depends On

- borders

### Referenced By

- patterns/tables.md
- patterns/lists.md
- ai/indexes/concept-index.md (after generate:ai)

## See also

- [Tables](../patterns/tables.md)
- [Lists](../patterns/lists.md)
- [Borders](../foundations/borders.md)
- [Table / List ontology](../ontology/table-list.md)
