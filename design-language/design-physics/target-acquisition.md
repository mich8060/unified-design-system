---
id: target-acquisition
category: physics
type: principle
priority: high
ai_priority: high
confidence_default: preferred
related:
 - laws-of-ux
 - touch-targets
 - button-icon-size
 - action-spacing
 - contrast-discoverability
components:
 - Button
patterns: []
tokens:
 - "--uds-spacing-24"
depends_on:
 - philosophy
influences:
 - touch-targets
 - button-icon-size
 - action-spacing
conflicts_with: []
alternatives: []
design_intent:
 - navigation
---

# Larger, closer targets are easier to hit

## What

The time to acquire a target depends on its **distance** and **size**. Small or distant controls cost accuracy and speed.

## Why

Also known as **Fitts’s Law** — see [`laws-of-ux`](./laws-of-ux.md). Operational UIs fail when icon hits are tiny or crowded.

## When

Every interactive control — especially icon-only buttons, toolbar actions, and dense tables.

## How AI should reason

1. Prefer package sizes: icon-only Buttons use **`size="icon"`** (44×44) next to default controls.
2. Meet touch-target guidance in accessibility docs — do not invent smaller custom hit areas.
3. Place frequent actions nearer the user’s focus (toolbar, row end) rather than remote corners without need.

**FAIL IF:** Icon-only controls are non-square or undersized; tap targets collapse below UDS / a11y guidance.

Confidence: Preferred — Treat as durable physics; UDS touch-target rules are normative.

## Related law

- **Fitts’s Law** — see [`laws-of-ux`](./laws-of-ux.md)

## See also

- [Touch targets](../accessibility/touch-targets.md)
- [Button icon size](../semantics/button-icon-size.md)
- [Action spacing](../accessibility/action-spacing.md)
- [Laws of UX index](./laws-of-ux.md)
