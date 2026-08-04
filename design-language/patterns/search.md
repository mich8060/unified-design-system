---
id: search
category: pattern
type: pattern
priority: high
ai_priority: medium
confidence_default: preferred
related:
  - filters
  - lists
  - tables
components:
  - SearchInput
patterns:
  - search
  - filters
tokens: []
depends_on: []
influences:
  - filters
conflicts_with:
  - page-header-ontology
alternatives:
  - filters
---

# Search

## What

Query-driven find using **`SearchInput`** (package input), feeding list/table results.

## Why

Ad-hoc `<input type="search">` misses UDS chrome, sizing (~44px default), and composition with InputGroup patterns.

## When

- Global-ish page search above queues (ops-queue)
- Filter bars (with facets)
- App-chrome `Header` leading search (`searchProps` / default `SearchInput`)
- Command palette cases → `Command` component (separate)

## When not

- **Do not** put an additional `SearchInput` in `Header` `trailing` / `AppShell.Header` — Header already owns leading search
- **Do not** put `SearchInput` in `PageHeaderActions` — use `Filterbar` or filters near the collection instead

## Reasoning

```
User has a query
→ SearchInput (Header leading, Filterbar, or near list)
→ Results as Item list or Table
→ Empty state for no hits
```

When pairing Buttons with `SearchInput` in a Filterbar, use **icon-only, default-size** controls left-aligned immediately after the field — see [`filterbar-ontology`](../ontology/filterbar.md).

Confidence: Preferred — Use SearchInput from the package; not in header action slots; icon-only default-size siblings beside search.

## Relationships

### Supports

- Fast find in collections

### Requires

- Results surface (list/table)

### Influences

- filters pattern

### Uses

- SearchInput

### Conflicts With

- Unstyled raw inputs for primary search
- SearchInput in Header trailing / PageHeaderActions

### Alternatives

- Command for keyboard-first command palette

### Depends On

- —

### Referenced By

- patterns/filters.md, ops-queue-dashboard

## See also

- [Filters](./filters.md)
- [Lists](./lists.md)
