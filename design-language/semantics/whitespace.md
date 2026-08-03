---
id: whitespace
category: semantics
type: concept
priority: high
ai_priority: medium
confidence_default: preferred
related:
  - whitespace-relationships
  - proximity
  - density
  - spacing
components:
  - Card
  - AppShell
patterns:
  - dashboards
  - empty-states
tokens:
  - --uds-space-24
  - --uds-space-32
depends_on:
  - whitespace-relationships
influences:
  - density
  - dashboards
conflicts_with:
  - spacing-mistakes
alternatives:
  []
---
# Whitespace

## What

Whitespace (negative space) communicates separation and breathing room; it is structural, not “empty leftover.”

## Why

Without intentional whitespace, proximity collapses and groups blur.

## When

Increase whitespace between major regions; reduce within tight operational rows. Empty states may use more open space.

## How AI should reason

1. Treat whitespace as a relationship signal (see design physics).
2. Prefer token steps over arbitrary padding.
3. Do not fill whitespace with decorative cards.
4. In `AppShell.Main`, first-level section gaps are **16 or 24** only; prefer **2–3 columns** at desktop; pad boxed Cards — see [`appshell-main-containment`](./appshell-main-containment.md).

Confidence: Preferred — Section gaps > control gaps.


## Relationships

### Supports

- Grouping
- Readability

### Requires

- Spacing tokens

### Influences

- Density
- Layout decisions

### Uses

- AppShell regions
- Card padding

### Conflicts With

- Spacing mistakes

### Alternatives

- —

### Depends On

- Whitespace relationships physics

### Referenced By

- design-physics/whitespace-relationships.md



## See also

- [AppShell Main containment](./appshell-main-containment.md) — section gap 16/24, 2–3 columns, boxed padding
- [Spacing levels](./spacing-levels.md)
- [Whitespace physics](../design-physics/whitespace-relationships.md)
- [Density](./density.md)
