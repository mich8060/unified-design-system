---
id: card-ontology
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
  - Card
patterns:
  []
tokens:
  []
depends_on:
  - grammar-hierarchy
influences:
  - grouping
conflicts_with:
  []
alternatives:
  []
---
# Card

## What

`Card` **is-a** Container component.

## API (system facts)

Use for grouped interactive/summary units in dashboards and settings. Prefer radius ≤12. Avoid nesting Cards (see composition/nesting).

**Padding:** Prefer `CardContent` (built-in **16px** on all sides) or explicit `--uds-spacing-16` / `--uds-spacing-24`. Do not flush content to the Card border. **Runtime:** a naked `Card` (no direct `CardContent` / `CardImage` / `CardFooter` child) auto-applies **16px** padding so tables/lists cannot sit flush — still prefer explicit `CardContent` for slot composition.

**Overflow:** `Card` ships with **`overflow-hidden`** so children clip to the radius and edges stay clean. Prefer the same on other content boxes unless something must escape (menus/popovers) or an inner scroll pane needs `overflow-auto`. See [`overflow`](../composition/overflow.md).

**FAIL IF:** Body copy, buttons, or table rows are cut off by the Card edge. Do not set a fixed Card height that truncates text — let Main scroll, wrap text, or add an inner `overflow-y-auto` region for tall lists.

**Tables in Card:** Use `CardContent className="p-0"` so cell edge pad (16px) provides inset. Keep **only the Card’s 1px border** — do not also outline the `Table` (double borders look like **2px**). Runtime: `Table` inside `CardContent` is borderless; see [`borders`](../foundations/borders.md) and [`table-list-ontology`](./table-list.md).

## Ontology

| Relation | Detail |
|----------|--------|
| **is-a** | Container component |
| **contains** | Header; Body; Optional footer actions |
| **requires** | Content worth separating; edge padding inside the box |
| **uses** | Surface/border/radius tokens |
| **appears in** | workspace-dashboard; settings groups |
| **supports** | Grouping |
| **cannot exist without** | Hierarchy alone (needs SectionHeader) |

## How AI should reason

1. Confirm this object fits the grammar layer (shell vs pattern vs control).
2. Put children in `CardContent` (or equivalent padding) so content is not flush to the box.
3. Keep **`overflow-hidden`** on the box (default on `Card`) unless escape or inner scroll requires otherwise — but never clip readable content.
4. Prefer this export over bespoke markup.

Confidence: Preferred — Use the published component; always pad boxed content.

Confidence: Preferred — Content boxes use overflow-hidden for clean edges.

Confidence: **Required** — Card content must remain fully readable (no silent clipping).


## Relationships

### Supports

- Grouping

### Requires

- Content worth separating

### Influences

- workspace-dashboard
- settings groups

### Uses

- Surface/border/radius tokens

### Conflicts With

- Bespoke equivalents
- src/components/ui imports

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
