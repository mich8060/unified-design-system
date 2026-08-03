---
id: badge-ontology
category: ontology
type: object
priority: high
ai_priority: high
confidence_default: preferred
related:
  - ontology-index
  - choosing-components
  - grammar-hierarchy
components:
  - Badge
patterns:
  []
tokens:
  []
depends_on:
  - grammar-hierarchy
influences:
  - emphasis
conflicts_with:
  []
alternatives:
  []
---
# Badge

## What

`Badge` **is-a** Feedback component (preferred).

## API (system facts)

| Prop | Values |
|------|--------|
| `accent` | transparent/neutral/red/orange/yellow/emerald/green/sky/cyan/blue/indigo/purple/fuchsia/magenta/inverse |
| `appearance` | subtle \| pastel \| outlined \| solid |
| `shape` | pill \| rect |
| `size` | default \| sm |

## Ontology

| Relation | Detail |
|----------|--------|
| **is-a** | Feedback component (preferred) |
| **contains** | Short label; Optional icon |
| **requires** | Category/status to annotate |
| **uses** | Semantic color |
| **appears in** | Tables; Cards; Lists |
| **supports** | Secondary emphasis |
| **cannot exist without** | Meaning without text |

## Usage

**Appearances shared with Status.** `subtle` | `pastel` | `outlined` | `solid` use the same accent shade steps as [`Status`](./status.md) (via shared accent styles). Status maps meaning → hue (`error`→red, `warning`→yellow, `success`→green, `info`→blue); Badge picks `accent` explicitly.

**Hug content — never full width.** `Badge` is an annotation chip: width follows its label (and optional icon). The component ships as `inline-flex` + `w-fit`.

| Do | Don’t |
|----|--------|
| Place Badge next to a title, in a cell, or in a flex row of chips | Stretch Badge to the container (`w-full`, `flex-1`, grid stretch, `self-stretch`) |
| Let multiple Badges sit in a wrapping flex/gap row | Make a single Badge span a Card, column, or table cell |
| Keep page-level counts/state beside `PageHeaderTitle` / content | Put Badge in `PageHeaderActions` (prefer Buttons / overflow only there) |

**FAIL IF:** Badge spans its parent’s full width (reads as a bar/banner, not a badge).

## How AI should reason

1. Confirm this object fits the grammar layer (shell vs pattern vs control).
2. Read API table above + contract catalog for props.
3. Prefer this export over bespoke markup.
4. Keep Badge **hugging content** — never `w-full` / stretch in flex or grid.
5. In **table rows** and other tight spaces, prefer `size="sm"` so the badge does not crowd cell padding ([`table-list`](./table-list.md), [`density`](../semantics/density.md)).

Confidence: Preferred — Use the published component.

Confidence: **Required** — Badge hugs content; never full-width of its container.

Confidence: Strong Recommendation — `size="sm"` in table/list rows.


## Relationships

### Supports

- Secondary emphasis

### Requires

- Category/status to annotate

### Influences

- Tables
- Cards
- Lists

### Uses

- Semantic color

### Conflicts With

- Bespoke equivalents
- src/components/ui imports
- Full-width / stretched Badge (banner-like)

### Alternatives

- See decision trees / choosing-components

### Depends On

- grammar-hierarchy

### Referenced By

- ai/indexes/component-index.md



## See also

- [Ontology index](./README.md)
- [Choosing components](../decision-rules/choosing-components.md)
- [Contract](../../ai/uds-contract.json)
