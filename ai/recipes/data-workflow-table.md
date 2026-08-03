# Data Workflow Table

## When to use it

Use when the **primary work surface** is a searchable, filterable collection table (jobs, tickets, clinicians). Full width is correct here.

Do **not** use this pattern for multi-region dashboards (prefer `workspace-dashboard` / `analytics-overview` with paired short regions).

## Required layout primitives

- **`AppShell`** + **`Menu`** + **`MainContent containment="edge"`** with **24px** padding.
- **`PageHeader`** (no Search in `PageHeaderActions`) + **`MainStack`**.
- **`Filterbar`**: `SearchInput surface="primary"` (edge/gray canvas) → icon-only `FilterbarFilters` (`size="icon"`) → `FilterbarActions` (one primary; DotsThree last with `weight="bold"` if >3).
- **One** dominant **`Card` > `CardContent className="p-0"` > `Table`** (one outline — Card only).
- Trailing row actions → last cell **`className="w-0"`**; nested Status **`size="compact"`**.

## Forbidden substitutions

- **FAIL:** Splitting the primary table into a stack of skinny full-width Cards.
- **FAIL:** Putting `SearchInput` in `PageHeaderActions`.
- **FAIL:** Labeled filter buttons after search instead of icon-only `size="icon"`.

## JSX skeleton

```tsx
<MainContent containment="edge" className="p-[length:var(--uds-spacing-24)]">
  <PageHeader layout="inline">{/* title */}</PageHeader>
  <MainStack>
    <Filterbar>{/* Search + icon filters + actions */}</Filterbar>
    <Card>
      <CardContent className="p-0">
        <Table>{/* … */}</Table>
      </CardContent>
    </Card>
  </MainStack>
</MainContent>
```

## Canonical example

[`ai/examples/data-workflow-table.tsx`](../examples/data-workflow-table.tsx)

See also: [`page-composition`](../../design-language/semantics/page-composition.md), [`filterbar`](../../design-language/ontology/filterbar.md).
