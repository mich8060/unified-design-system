---
id: typography-scale
category: relationship
type: concept
priority: high
ai_priority: high
confidence_default: preferred
related:
  - typography
  - hierarchy
components:
  - Text
patterns:
  []
tokens:
  - "--uds-font-size-14"
  - "--uds-font-size-24"
depends_on:
  - typography
influences:
  - hierarchy
conflicts_with:
  []
alternatives:
  []
---
# Typography scale

## Text sizes (component)

| Variant | Sizes (px) | Default |
|---------|------------|---------|
| body | 10, 12, 14, 16, 18, 20 | **14** |
| heading | 24, 28, 32 | **24** |
| display | 36, 48, 60, 72, 96, 128 | **48** |

Underlying tokens: `--uds-font-size-{10…128}`, `--uds-line-*`, weights 400/500/600/700.

## Relationship

Larger steps jump hierarchy levels. Ops dashboards should stay in body/heading—not display—inside AppShell.Main.

**Page vs section:** `PageHeaderTitle` uses heading **28**; `SectionHeaderTitle` and other in-page `h2` headlines prefer **body/20/semibold** so the page title remains the largest.

Confidence: Preferred — Prefer body 14 + section heading 24; page title heading 28 in product shells.

Confidence: Preferred — Page title largest; other headlines ≥1 size step smaller.


## Relationships

### Supports

- Hierarchy

### Requires

- typography

### Influences

- Section headers

### Uses

- Text sizes
- --uds-font-size-*

### Conflicts With

- Display type in dense queues

### Alternatives

- —

### Depends On

- typography

### Referenced By

- foundations/typography.md



## See also

- [Typography](../foundations/typography.md)
- [Hierarchy](../semantics/hierarchy.md)
