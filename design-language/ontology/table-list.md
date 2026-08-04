---
id: table-list-ontology
category: ontology
type: object
priority: high
ai_priority: high
confidence_default: preferred
related:
  - ontology-index
  - choosing-components
  - grammar-hierarchy
  - tables
  - density
  - spacing-levels
components:
  - Table
  - TableHead
  - TableCell
  - Item
patterns:
  - tables
  - lists
tokens:
  - --uds-spacing-4
  - --uds-spacing-8
  - --uds-spacing-16
  - --uds-spacing-24
  - --uds-spacing-48
depends_on:
  - grammar-hierarchy
influences:
  - density
  - alignment
conflicts_with:
  []
alternatives:
  []
---
# Table / List

## What

`Table / List` **is-a** Collection pattern.

## API (system facts)

| Need | Component |
|------|-----------|
| Compare attributes | `Table` |
| Scan + row actions | `Item` (first-party) / list rows |
| Master–detail | AppShell `listview` + Main |

See tables decision tree.

## Cell padding (usage)

| Region | Padding |
|--------|---------|
| **Body cell** top / bottom (`TableCell`) | **8px** (`--uds-spacing-8`) — standard |
| **Cell horizontal** (all cells) | **4px** (`--uds-spacing-4`); optional up to 8px |
| **First cell** in a row | **Left** padding **16–24px** (`--uds-spacing-16` … `--uds-spacing-24`) |
| **Last cell** in a row | **Right** padding **16–24px** |

Package defaults: body **`py-8`**; horizontal **4px**; first cell `pl-16`; last cell `pr-16`.

**Container chrome:** `Table` wraps `<table>` in a bordered, rounded scroll container. Use `appearance="plain"` and/or `containerClassName` to opt out of border/radius/overflow. Cells default to `whitespace-nowrap`; set `wrap` on `TableHead` / `TableCell` to allow wrapping.

## Header row height (usage)

**Preferred:** `TableHead` cells are **at least 48px** tall (`--uds-spacing-48`) so the header row reads as distinct from body rows.

Package default: `h-[length:var(--uds-spacing-48)]` on `TableHead` (table cells ignore CSS `min-height`; `height` is the reliable minimum). Do not shrink header cells below 48px for density — use compact nested controls in **body** rows instead.

Confidence: Preferred — Table headers ≥ 48px tall.

Confidence: Preferred — Body cell vertical padding 8px.

```tsx
{/* Defaults applied via first:/last: on TableHead / TableCell */}
<TableRow>
  <TableCell>Alex</TableCell>
  <TableCell>Admin</TableCell>
  <TableCell>Active</TableCell>
</TableRow>
```

Do not use `p-0` on ordinary text cells. Prefer airier edges (24px) on wide tables; keep body vertical padding at **8px**.

## Trailing action column (usage)

**Strong Recommendation:** When the **last** column is a row action (button, link, or icon-only control), that cell (and its matching `TableHead`) should **hug the content width** so the action stays pinned to the far end of the row. Do not let the action column share leftover flexible width with data columns.

| Do | Don’t |
|----|--------|
| `className="w-0"` (or `w-[1%]`) on the action `TableHead` / `TableCell` — with `whitespace-nowrap` (already on package cells) the column sizes to the control | Leave the action cell as a normal flexible column so icons/buttons sit mid-cell with empty space to the right |
| Keep last-cell **right** padding **16–24px** | Stretch a single icon across a wide final column |

```tsx
<TableRow>
  <TableCell>Alex Rivera</TableCell>
  <TableCell>Admin</TableCell>
  <TableCell>Active</TableCell>
  <TableCell className="w-0">
    <Button size="icon-sm" variant="ghost" aria-label="Open row menu">
      <DotsThreeIcon weight="bold" />
    </Button>
  </TableCell>
</TableRow>
```

Match the header: `<TableHead className="w-0">{/* label or sr-only */}</TableHead>`.

Confidence: Strong Recommendation — Trailing action columns hug content (`w-0` / `w-[1%]`) so controls stay at the far end of the row.

## Table in a container (usage)

**Preferred:** When wrapping a `Table` in a bordered box (`Card`), use **one** outer border only.

```tsx
<Card>
  <CardContent className="p-0">
    <Table>{/* … */}</Table>
  </CardContent>
</Card>
```

- Container (`Card`) owns the **1px** outline.
- Do **not** keep a second border on the table wrapper — stacked borders read as **2px** and look heavier than the rest of the UI.
- **Runtime:** `Table`’s container is `border-0` + `rounded-none` when nested in `CardContent`. Standalone `Table` still has its own border/radius.
- Cell first/last padding still provides the 16px edge inset when `CardContent` is `p-0`.

Confidence: Preferred — One outline when Table is inside Card; no double border.

## Compact controls in rows (usage)

**Strong Recommendation:** In tight spaces such as **table rows** and dense **list rows**, use the **compact** (or `sm`) variants of nested components so labels and chips do not blow out row height or crowd cell padding.

| Component | Prefer in table / dense list rows |
|-----------|-----------------------------------|
| `Status` | `size="compact"`; prefer default **`appearance="outlined"`** |
| `Badge` | `size="sm"` |
| `Button` (labeled) | `size="sm"` when a text action must live in the row |
| `Button` (icon-only) | Prefer `size="icon-sm"` (36) over default `icon` (44) when the row is dense |
| `Avatar` | Smaller sizes (`sm` / `xs`) when present in a cell |

Do **not** invent custom CSS to shrink default-size controls inside cells. Keep cell padding bands above; compact components maintain optical spacing within those bands.

```tsx
<TableCell>
  <Status size="compact" variant="info">Interviewing</Status>
</TableCell>
<TableCell>
  <Badge size="sm" accent="blue" appearance="pastel" shape="rect">
    Jul 21
  </Badge>
</TableCell>
```

See [`density`](../semantics/density.md).

## Ontology

| Relation | Detail |
|----------|--------|
| **is-a** | Collection pattern |
| **contains** | Rows; Columns or Item rows; Optional filters |
| **requires** | Many items; body cell py **8px**; 16–24px first/last edge padding; header ≥ **48px** |
| **uses** | Badge; Status; Button |
| **appears in** | Queues; detail-with-listview; triage |
| **supports** | Density; Alignment |
| **cannot exist without** | Data fetching |

## How AI should reason

1. Compare attributes → `Table`; scan + actions → `Item`.
2. Body cell vertical padding **8px**; horizontal **4px**; first cell left **16–24px**; last cell right **16–24px**.
3. `TableHead` **≥ 48px** tall so headers read as distinct from body rows.
4. Prefer Status/Badge in cells over ad-hoc colored spans.
5. In table/list rows, use **compact** / `sm` component sizes (`Status size="compact"`, `Badge size="sm"`, etc.) — not default-size chrome that crowds the row.
6. Trailing row actions (button / link / icons) → last `TableHead` + `TableCell` with **`w-0`** (or `w-[1%]`) so the column hugs content at the far end.
7. Table inside `Card` → `CardContent className="p-0"`; rely on **Card** border only (no double outline).

Confidence: Preferred — Use the published Table; follow cell padding bands.

Confidence: Preferred — Table headers ≥ 48px tall; body cell vertical padding 8px.

Confidence: Preferred — One outline when Table is wrapped in Card (no double border).

Confidence: Strong Recommendation — Compact nested controls in table and dense list rows.

Confidence: Strong Recommendation — Trailing action columns hug content width.

## Relationships

### Supports

- Density
- Alignment

### Requires

- Many items

### Influences

- Queues
- detail-with-listview
- triage

### Uses

- Badge
- Status
- Button

### Conflicts With

- Bespoke equivalents
- src/components/ui imports
- Zero padding flush cells (`p-0` as the default)
- Missing 16–24px inset on the first/last cell of a row
- Body cells with top/bottom padding below **8px**
- `TableHead` shorter than **48px**
- Trailing action column that expands and leaves controls floating with empty space to the right (missing `w-0` / hug)

### Alternatives

- See decision trees / choosing-components

### Depends On

- grammar-hierarchy

### Referenced By

- ai/indexes/component-index.md

## See also

- [Tables pattern](../patterns/tables.md)
- [Spacing levels](../semantics/spacing-levels.md)
- [Ontology index](./README.md)
- [Choosing components](../decision-rules/choosing-components.md)
- [Contract](../../ai/uds-contract.json)
