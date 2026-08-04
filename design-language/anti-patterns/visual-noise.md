---
id: visual-noise
category: anti-pattern
type: rule
priority: high
ai_priority: high
confidence_default: preferred
related:
  - density
  - hierarchy
  - shadows
  - emphasis
  - grid
  - alignment
  - listview-drives-main
  - row-dividers
  - laws-of-ux
  - cognitive-load
components:
  - Card
  - Badge
  - Button
  - Item
  - Status
patterns:
  - dashboards
  - detail-with-listview
tokens:
  []
depends_on:
  []
influences:
  []
conflicts_with:
  - hierarchy
  - density
  - listview-drives-main
alternatives:
  - progressive-disclosure
---
# Visual noise

## What

Too many equal-weight surfaces, badges, shadows, and primary buttons in one viewport.

## Avoid

- Card wrapping every paragraph/KPI without hierarchy
- Multiple primary Buttons per section
- Stacked shadows + loud badges + charts all competing
- Stock “AI dashboard” purple gradients / glow (not UDS)
- Mid-page grid row with a large empty band under a short peer beside a tall peer — match heights (rebalance or stretch when Δ **≤ 150px**); bottom row may stay natural ([`grid`](../foundations/grid.md))
- **AppShell listview:** custom title/count headers or ad-hoc entity rows — use `Toolbar` titlebar + `Item`/`Card` entities ([`listview-drives-main`](../semantics/listview-drives-main.md))

## Do instead

- One primary CTA per region
- Recipe-aligned density (`ops-queue-dashboard`, `triage-dashboard`, etc.)
- Status/Badge sparingly; SectionHeader for structure
- Flat cards + semantic color
- Match peer heights in a grid row (esp. non-bottom); stretch when Δ **≤ 150px**; rebalance content when the gap is larger
- Listview: Toolbar titlebar + SearchInput; Item or Card entities; dense Item rows: **one** trailing compact Status

Confidence: Preferred — Prefer clarity over ornament in AppShell.Main.

Confidence: Required — Do not ship outlined Item card stacks in the listview slot.


## Relationships

### Supports

- Clarity over density (philosophy)

### Requires

- Hierarchy
- Intent

### Influences

- —

### Uses

- Recipes
- SectionHeader

### Conflicts With

- hierarchy (when violated)

### Alternatives

- progressive-disclosure
- listview

### Depends On

- —

### Referenced By

- philosophy.md
- semantics/density.md



## See also

- [Density](../semantics/density.md)
- [Choosing patterns](../decision-rules/choosing-patterns.md)
- [Shadows](../foundations/shadows.md)
- [Laws of UX index](../design-physics/laws-of-ux.md) — Prägnanz / Cognitive Load
- [Cognitive load](../design-physics/cognitive-load.md)
