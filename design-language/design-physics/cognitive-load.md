---
id: cognitive-load
category: physics
type: principle
priority: high
ai_priority: high
confidence_default: preferred
related:
 - laws-of-ux
 - consistency-load
 - hierarchy
 - density
 - page-composition
 - progressive-disclosure
 - visual-noise
 - choice-complexity
components: []
patterns: []
tokens: []
depends_on:
 - philosophy
influences:
 - hierarchy
 - density
 - page-composition
 - consistency-load
 - progressive-disclosure
conflicts_with:
 - visual-noise
alternatives: []
design_intent:
 - scanability
---

# Interfaces consume limited mental resources

## What

**Cognitive load** is the mental effort required to understand and use an interface. Every competing signal, equal-weight accent, and stretched reading column raises that cost.

## Why

Documented as **Cognitive Load** — see [`laws-of-ux`](./laws-of-ux.md). Consistency, hierarchy, progressive disclosure, and page composition exist to keep load within working limits.

## When

Every authenticated screen — especially dashboards, forms, and multi-region layouts.

## How AI should reason

1. Prefer consistent patterns ([`consistency-load`](./consistency-load.md)) so users transfer recognition.
2. Establish one clear headline hierarchy and limited accents ([`hierarchy`](../semantics/hierarchy.md)).
3. Disclose detail as intent narrows ([`progressive-disclosure`](./progressive-disclosure.md)).
4. Cap ordinary content blocks at **≤720px** and use columns when Main is wider ([`page-composition`](../semantics/page-composition.md)).
5. Cap visible choices ([`choice-complexity`](./choice-complexity.md)).

**FAIL IF:** Full-width Card stacks of equal weight; every section boxed; reading/forms stretched past ~720px; decorative variant mixing.

Confidence: Preferred — Reduce load via structure before adding decoration.

## Related law

- **Cognitive Load** — see [`laws-of-ux`](./laws-of-ux.md)

## See also

- [Consistency reduces cognitive load](./consistency-load.md)
- [Hierarchy](../semantics/hierarchy.md)
- [Page composition](../semantics/page-composition.md)
- [Visual noise](../anti-patterns/visual-noise.md)
- [Laws of UX index](./laws-of-ux.md)
