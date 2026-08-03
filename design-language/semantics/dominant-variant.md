---
id: dominant-variant
category: semantics
type: rule
priority: high
ai_priority: critical
confidence_default: preferred
related:
  - consistency-load
  - choosing-components
  - status-ontology
  - tabs-ontology
  - visual-noise
  - hierarchy
components:
  - Status
  - Tabs
  - TabsList
  - Badge
  - Button
  - Item
patterns:
  - dashboards
  - detail-pages
tokens: []
depends_on:
  - consistency-load
influences:
  - choosing-components
  - visual-noise
conflicts_with:
  - visual-noise
alternatives: []
design_intent:
  - scanability
---

# Stick with the dominant component variant

## What

When **one variant** of a component is clearly more prevalent on a screen or in the product experience, **keep using that variant** for the same component elsewhere unless the problem **requires** a different treatment.

## Why

Mixed variants of the same control (e.g. some `Status` outlined and some solid, some `TabsList` line and some pill) increase cognitive load without adding meaning. Consistency lets users transfer recognition across the page.

## When (preferred)

| Signal | Action |
|--------|--------|
| Most Status chips on the page are `appearance="outlined"` | Keep new Status chips outlined |
| Most Tabs strips use `variant="line"` + `fill={false}` | Don’t introduce a pill strip on the same page without cause |
| List rows already use flat `appearance="list"` | Don’t mix outlined Item cards in the same listview |
| Package or product default is already the dominant look | Prefer the default; don’t invent a second style |

## When to differ (required exception)

Change variant **only** when the problem needs a distinct signal, for example:

- Stronger emphasis / severity that the dominant style cannot carry (`Status appearance="solid"` for a critical alert amid outlined chips)
- A different interaction pattern (vertical tab rail vs horizontal line tabs)
- Accessibility or platform constraints documented elsewhere

Do **not** differ for decoration, novelty, or “visual variety.”

## How AI should reason

1. Scan the screen (or recipe exemplar) for the **already-used** variant of each component family.
2. Default new instances to that **dominant** variant (or the package preferred default if none exist yet).
3. Switch variants only when intent/emphasis/interaction **requires** it — document why in the choice.
4. Prefer package preferred defaults (`Status` outlined, `TabsList` line + `fill={false}`, listview `appearance="list"`) so the dominant style stays stable across screens.

**FAIL IF:** Multiple decorative variants of the same component compete on one screen without a problem-driven reason.

Confidence: **Preferred** — Match the prevalent variant unless the problem requires a different one.

## Relationships

### Supports

- consistency-load
- visual clarity

### Conflicts With

- Random variant hopping / visual noise

### See also

- [Consistency reduces cognitive load](../design-physics/consistency-load.md)
- [Status ontology](../ontology/status.md)
- [Tabs ontology](../ontology/tabs.md)
