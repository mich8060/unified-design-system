---
id: common-region
category: physics
type: principle
priority: high
ai_priority: high
confidence_default: preferred
related:
 - laws-of-ux
 - proximity-physics
 - grouping
 - cards
 - dominant-variant
 - row-dividers
 - whitespace-relationships
components:
 - Card
 - SectionHeader
patterns:
 - cards
tokens: []
depends_on:
 - philosophy
 - proximity-physics
influences:
 - grouping
 - cards
 - dominant-variant
 - row-dividers
conflicts_with:
 - visual-noise
alternatives: []
design_intent:
 - scanability
---

# Boundaries and sameness create groups

## What

People perceive elements as a group when they share a **clear boundary** (common region), look **alike** (similarity), or are **visually connected** (uniform connectedness).

## Why

Gestalt grouping (Common Region, Similarity, Uniform Connectedness) — see [`laws-of-ux`](./laws-of-ux.md). UDS applies them via Cards, SectionHeaders, dividers, and dominant variants — not by boxing every paragraph.

## When

Composing sections, cards, lists, and repeated controls.

## Common region

A shared background, border, or panel pulls items into one group. Use `Card` / primary panels for **interaction units**, not decorative wrappers.

**FAIL IF:** Every field or sentence sits in its own Card “to group it.”

## Similarity

Same visual treatment → same role. Keep the prevalent Status/Tabs/Button variant unless the problem requires a change ([`dominant-variant`](../semantics/dominant-variant.md)).

## Uniform connectedness

Shared dividers, underlines, or connectors signal relatedness ([`row-dividers`](../semantics/row-dividers.md)) more strongly than loose proximity alone.

## How AI should reason

1. Prefer proximity + SectionHeader before adding a Card.
2. Use one boundary per designed unit; pad inside boxed surfaces.
3. Keep peer controls visually similar; isolate emphasis sparingly (Von Restorff via visual weight).

Confidence: Preferred — Group with space and light chrome; Card only when the box is the unit.

## Related law

- Common Region, Similarity, Uniform Connectedness — see [`laws-of-ux`](./laws-of-ux.md)

## See also

- [Proximity physics](./proximity.md)
- [Grouping](../semantics/grouping.md)
- [Cards pattern](../patterns/cards.md)
- [Row dividers](../semantics/row-dividers.md)
- [Laws of UX index](./laws-of-ux.md)
