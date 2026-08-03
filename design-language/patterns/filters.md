---
id: filters
category: pattern
type: pattern
priority: high
ai_priority: high
confidence_default: preferred
related:
  - search
  - lists
  - tables
  - empty-states
  - filterbar-ontology
  - touch-targets
components:
  - SearchInput
  - Button
  - Badge
  - Select
  - Filterbar
patterns:
  - filters
  - ops-queue-dashboard
tokens: []
depends_on:
  - lists
influences:
  - ops-queue-dashboard
conflicts_with: []
alternatives: []
---

# Filters

## What

Narrow a collection in-place with `SearchInput`, facet chips (`Badge` / outline `Button`), and selects—near the list/table, not a separate settings page.

Buttons next to the search field (`FilterbarFilters`) should be **icon-only**, **default/`icon` size**, and **left-aligned immediately after** `SearchInput` — see [`filterbar-ontology`](../ontology/filterbar.md).

## Why

Ops queues (`ops-queue-dashboard`) need fast refine without leaving the page.

## When

- Above Item/Table collections
- Facets as outline Buttons or Badges (recipe pattern)
- Zero results → empty state with clear-filters action

## Reasoning

```
Collection too broad
→ SearchInput + facets near list
→ Apply → update Item/Table
→ Zero hits → Empty + clear filters
```

Confidence: Preferred — Prefer SearchInput + Badge/Button facets over custom filter chrome.

## Relationships

### Supports

- Queue refinement

### Requires

- A collection pattern (list/table)

### Influences

- empty-states

### Uses

- SearchInput, Badge, Button, Select

### Conflicts With

- Invented filter frameworks

### Alternatives

- Full settings-form for saved preference filters

### Depends On

- lists / tables

### Referenced By

- ai/recipes/ops-queue-dashboard.md

## See also

- [Search](./search.md)
- [Ops queue recipe](../../ai/recipes/ops-queue-dashboard.md)
- [Empty states](./empty-states.md)
