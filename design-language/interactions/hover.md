---
id: hover
category: interaction
type: concept
priority: high
ai_priority: high
confidence_default: preferred
related:
  - affordance
  - button-ontology
  - focus
components:
  - Button
  - Link
patterns:
  []
tokens:
  []
depends_on:
  []
influences:
  - affordance
  - button-ontology
  - focus
conflicts_with:
  - accessibility-mistakes
alternatives:
  []
---
# Hover

## What

Hover feedback uses tokenized button/surface hover roles—not ad-hoc brightness filters.

## Why

Interaction states are how users and AT confirm the system is responding. UDS encodes them in components and tokens.

## When

Any interactive control using Button, Link.

## UDS implementation

| Control | Pattern |
|---------|---------|
| Button default | `hover:bg-uds-button-surface-primary-hover` |
| Secondary/ghost | Muted / secondary hover tokens in `button-theme.ts` |
| Links | `--uds-text-link-primary-hover` via Text/Link appearances |

## How AI should reason

1. Use Button/Link variants.
2. Hover is not the only affordance—keyboard focus must also work.
3. Do not rely on hover-only tooltips for essential info.

Confidence: Preferred — Prefer component props/states over custom CSS state hacks.


## Relationships

### Supports

- Affordance
- Accessibility

### Requires

- Published components

### Influences

- affordance
- button-ontology
- focus

### Uses

- Button
- Link

### Conflicts With

- Custom state CSS that removes focus/disabled semantics

### Alternatives

- —

### Depends On

- affordance

### Referenced By

- ai/indexes/concept-index.md



## See also

- [affordance](../semantics/affordance.md)
- [button-ontology](../ontology/button.md)
- [focus](../interactions/focus.md)
