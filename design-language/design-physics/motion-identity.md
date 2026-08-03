---
id: motion-identity
category: physics
type: principle
priority: high
ai_priority: high
confidence_default: preferred
related:
  - motion
  - dialogs
  - menu-ontology
components:
  []
patterns:
  []
tokens:
  []
depends_on:
  - philosophy
influences:
  - motion
  - dialogs
  - menu-ontology
conflicts_with:
  []
alternatives:
  []
---
# Motion preserves identity

## What

Motion preserves identity: the same object should remain recognizable across states (Menu expand, Dialog/Sheet open-close). Motion is a design-system building block (duration, ease, effect, choreography)—see [`motion`](../foundations/motion.md)—not ad-hoc decoration.

## Why

Motion should help users **track**, **educate**, and **focus**—not decorate arbitrarily. For UDS product UI, prefer **productive** (short, predictable) motion over expressive delight. Systematize with tokens so teams do not invent conflicting curves ([motion design in systems](https://www.designsystems.com/5-steps-for-including-motion-design-in-your-system/)).

## When

Apply whenever composing layout, navigation, motion, or status. Prefer this principle over decorative exceptions.

## How AI should reason

1. Check whether the UI violates this principle (new object appears from nowhere, or motion is pure flourish).
2. If yes, fix structure (spacing, shell, contrast, disclosure) before restyling.
3. Implement via linked semantics and foundations—shipped transitions + `--uds-animation-*` tokens—not one-off CSS.
4. Prefer productive enter/exit; skip dashboard loops; respect `prefers-reduced-motion`.

Confidence: Preferred — Treat as durable physics unless accessibility or platform constraints require a documented exception.


## Relationships

### Supports

- motion
- dialogs
- menu-ontology

### Requires

- Philosophy

### Influences

- motion
- dialogs
- menu-ontology

### Uses

- Foundations
- Semantics

### Conflicts With

- Decorative motion
- Ad-hoc layout

### Alternatives

- —

### Depends On

- philosophy

### Referenced By

- semantics/
- grammar/



## See also

- [motion](../foundations/motion.md)
- [dialogs](../patterns/dialogs.md)
- [menu-ontology](../ontology/menu.md)
