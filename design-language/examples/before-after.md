---
id: examples-before-after
category: example
type: index
priority: medium
ai_priority: medium
confidence_default: preferred
related:
  - layout-mistakes
  - visual-noise
  - radius-mistakes
components:
  - AppShell
  - Menu
patterns:
  []
tokens:
  []
depends_on:
  []
influences:
  []
conflicts_with:
  []
alternatives:
  []
---
# Before / after

## Before (reject)

- Bespoke `div`/`aside` shell instead of AppShell + Menu
- `Sidebar*` in `AppShell.menu` with `fixed inset-y-0` rail CSS
- `rounded-2xl` cards, purple glow gradients, multi-shadow KPI tiles
- Placeholder-only inputs; div buttons
- Vertical stack of full-width Cards for every section (forms, lists, callouts) with no width hierarchy or multi-column pairing

## After (accept)

- `AppShell` + `Menu` + `AppShell.Main`
- Recipe from `choosing-patterns` + matching `ai/examples/*.tsx`
- Tokens + Field/Button/Status
- Radius ≤ 12px on rectangles
- Page pattern + width band from [`page-composition`](../semantics/page-composition.md): content blocks ≤**720px** or paired columns; fixed/prose for reading forms; `lg:grid-cols-2` for short peers; edge full-width only for dominant tables/workflows

Confidence: Required — Match contract antiPatterns and recipes.


## Relationships

### Supports

- Agent self-check

### Requires

- Anti-patterns
- Recipes

### Influences

- —

### Uses

- ai/examples

### Conflicts With

- layout-mistakes

### Alternatives

- —

### Depends On

- —

### Referenced By

- anti-patterns/



## See also

- [Layout mistakes](../anti-patterns/layout-mistakes.md)
- [Choosing patterns](../decision-rules/choosing-patterns.md)
