---
id: status-ontology
category: ontology
type: object
priority: high
ai_priority: high
confidence_default: preferred
related:
  - ontology-index
  - choosing-components
  - grammar-hierarchy
  - color
  - urgency
  - badge-ontology
components:
  - Status
  - Badge
patterns:
  []
tokens:
  - "--uds-color-accent-red-500"
  - "--uds-color-accent-yellow-500"
  - "--uds-color-accent-green-500"
  - "--uds-color-accent-blue-500"
depends_on:
  - grammar-hierarchy
  - color
influences:
  - urgency
  - accessibility-meaning
conflicts_with:
  []
alternatives:
  []
---
# Status

## What

`Status` **is-a** Feedback component (first-party, preferred). Chip chrome (fill / border / text steps) **matches Badge** appearances on the same accent ramps.

## API (system facts)

| Prop | Values |
|------|--------|
| `variant` | neutral \| success \| warning \| error \| info |
| `appearance` | **outlined** (default / preferred) \| subtle \| pastel \| solid — **same axis as Badge** |
| `size` | default \| compact |
| `dot` | boolean (default true; decorative `aria-hidden`) |
| `color` | **Deprecated** — use `appearance="pastel"` instead of `color="pastel"` + `solid` |

Legacy: `appearance="text-only"` still maps to **`subtle`**.

## Appearance (usage)

Appearances share Badge’s shade recipe (`subtle` / `pastel` / `outlined` / `solid` via shared accent styles).

**Preferred:** **`appearance="outlined"`** (border-only, transparent fill). Package default.

| Appearance | When (same meaning as Badge) |
|------------|------------------------------|
| **outlined** | Default for queues, tables, dashboards, inspectors |
| `pastel` | Soft filled chip |
| `solid` | Stronger filled emphasis |
| `subtle` | Label + optional dot, no chrome |

Do **not** default new UI to `solid` — prefer outlined unless emphasis requires a fill.

Confidence: Preferred — Status `appearance="outlined"`.

## Meaning → accent (matches Badge hues)

| Meaning | `variant` | Badge accent ramp |
|---------|-----------|-------------------|
| Error | `error` | `red` (destructive) |
| Warning | `warning` | `yellow` |
| Success | `success` | `green` (constructive) |
| Information | `info` | `blue` (action/info) |
| Neutral | `neutral` | Badge `neutral` treatments |

**FAIL IF:** Status uses different fill/border/text steps than Badge for the same appearance + hue, or maps warning to a non-yellow ramp.

Confidence: **Required** — Status colors/appearances match Badge; meaning drives `variant`.

## Ontology

| Relation | Detail |
|----------|--------|
| **is-a** | Feedback component (first-party, preferred) |
| **contains** | Label; Optional dot |
| **requires** | State to communicate |
| **uses** | Badge-aligned accent appearances |
| **appears in** | Queues; triage; provider-portal |
| **supports** | Urgency; Accessibility meaning |
| **cannot exist without** | Color-alone meaning |

## How AI should reason

1. Confirm this object fits the grammar layer (shell vs pattern vs control).
2. Classify meaning → `error` / `warning` / `success` / `info` / `neutral`.
3. Pick Badge-aligned `appearance` (prefer **outlined**).
4. Prefer this export over bespoke markup or a Badge used as a status.
5. In **table rows** and other tight spaces, prefer `size="compact"`.

Confidence: Preferred — Use the published component; outlined appearance.

Confidence: Strong Recommendation — `size="compact"` in table/list rows.


## Relationships

### Supports

- Urgency
- Accessibility meaning

### Requires

- State to communicate

### Influences

- Queues
- triage
- provider-portal

### Uses

- Semantic status colors (Badge accent steps)

### Conflicts With

- Bespoke equivalents
- src/components/ui imports
- Divergent Status-only color recipes

### Alternatives

- See decision trees / choosing-components

### Depends On

- grammar-hierarchy
- color

### Referenced By

- ai/indexes/component-index.md



## See also

- [Ontology index](./README.md)
- [Badge](./badge.md)
- [Color — feedback patterns](../foundations/color.md)
- [Choosing components](../decision-rules/choosing-components.md)
- [Contract](../../ai/uds-contract.json)
