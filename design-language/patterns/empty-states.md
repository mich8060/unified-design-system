---
id: empty-states
category: pattern
type: pattern
priority: high
ai_priority: high
confidence_default: preferred
related:
  - empty-states-tree
  - errors-tree
  - buttons-tree
components:
  - Empty
  - Button
  - Text
patterns:
  - empty-states
tokens: []
depends_on:
  - intent
influences: []
conflicts_with:
  - visual-noise
alternatives: []
design_intent:
  - discovery
---

# Empty states

## What

Explain absence of data and offer **one** next step (`Empty` component + primary Button).

## Why

Blank Main confuses operators; overcrowded empty illustrations add noise.

## When

Follow [empty-states tree](../decision-rules/trees/empty-states.md):

| Situation | Treatment |
|-----------|-----------|
| Error / failure | errors tree (Alert/Dialog) — not Empty |
| First-run / zero items | Empty + one primary CTA |
| Filters too tight | Prompt to clear filters |

## Reasoning

```
No rows
→ Not an error? Empty pattern
→ One clear primary Button
→ Avoid dense chrome and multiple CTAs
```

Confidence: Preferred — Single primary CTA in empty states.

## Relationships

### Supports

- Onboarding / zero-data clarity

### Requires

- Intent (empty vs error)

### Influences

- Button choice

### Uses

- Empty, Button, Text

### Conflicts With

- Multi-CTA empty marketing blocks

### Alternatives

- errors tree when failed load

### Depends On

- intent

### Referenced By

- decision-rules/trees/empty-states.md

## See also

- [Empty states tree](../decision-rules/trees/empty-states.md)
- [Errors tree](../decision-rules/trees/errors.md)
