---
id: readability
category: semantics
type: concept
priority: high
ai_priority: high
confidence_default: preferred
related:
  - typography
  - color-contrast
  - hierarchy
  - density
components:
  - Text
  - Table
  - DescriptionList
patterns:
  - tables
  - lists
  - forms
tokens:
  []
depends_on:
  []
influences:
  - tables
  - lists
  - forms
conflicts_with:
  - visual-noise
alternatives:
  []
---
# Readability

## What

Readability is how easily text and data can be scanned and understood at intended density.

## Why

Healthcare ops UIs fail when type, contrast, or line length fight the task.

## When

All text, tables, and form labels.

## How AI should reason

1. Use typography tokens and Text.
2. Maintain contrast.
3. Prefer scannable lists/tables over paragraphs for operational data.
4. Keep ordinary content blocks within a comfortable measure (**≤720px**); when Main is wider, use columns — see [`page-composition`](./page-composition.md).

Confidence: Preferred — Follow related decision trees before inventing layout.


## Relationships

### Supports

- `typography`
- `color-contrast`
- `hierarchy`
- `density`

### Requires

- Philosophy
- Design physics

### Influences

- tables
- lists
- forms

### Uses

- Text
- Table
- DescriptionList

### Conflicts With

- Visual noise
- Layout mistakes

### Alternatives

- —

### Depends On

- semantics foundation concepts

### Referenced By

- ai/indexes/concept-index.md



## See also

- [Page composition](./page-composition.md) — content blocks ≤720px; columns when Main is wider
- [typography](../foundations/typography.md)
- [color-contrast](../accessibility/color-contrast.md)
- [hierarchy](./hierarchy.md)
- [density](./density.md)
