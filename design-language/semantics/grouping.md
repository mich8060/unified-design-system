---
id: grouping
category: semantics
type: concept
priority: high
ai_priority: high
confidence_default: preferred
related:
 - proximity
 - forms
 - cards
 - information-architecture
 - laws-of-ux
 - common-region
 - cognitive-load
components:
 - Card
 - Field
 - Separator
patterns:
 - forms
 - settings-form
 - dashboards
tokens:
 - --uds-space-16
 - --uds-space-24
depends_on:
 - proximity
influences:
 - forms
 - filters
conflicts_with:
 - layout-mistakes
alternatives:
 []
---
# Grouping

## What

Grouping places related controls and content into perceptible clusters (cards, field groups, sections).

## Why

Users infer meaning from clusters. Ungrouped fields force linear reading of every control.

## When

Always group by task affinity (identity fields together, notification prefs together). Prefer fewer, clearer groups over many tiny cards.

Supports **Miller’s Law** / **Chunking** — keep groups few enough for working memory — see [`laws-of-ux`](../design-physics/laws-of-ux.md).

## How AI should reason

1. List fields/actions by user goal.
2. Split into 2–5 groups max per page section.
3. Use `Card` or section headers—not nested cards for decoration.
4. Place primary actions with the group they commit.

Confidence: Preferred — Cards are for interaction/containers, not every paragraph.


## Relationships

### Supports

- Forms
- Settings
- Filters

### Requires

- Proximity
- Hierarchy

### Influences

- Form pattern
- Dashboard sections

### Uses

- Card
- Field
- Separator
- SectionHeader

### Conflicts With

- Card wrapping everything

### Alternatives

- Flat sections with headers when cards add no interaction value

### Depends On

- Proximity

### Referenced By

- patterns/forms.md



## See also

- [Proximity](./proximity.md)
- [Common region](../design-physics/common-region.md)
- [Laws of UX index](../design-physics/laws-of-ux.md)
- [Forms](../patterns/forms.md)
