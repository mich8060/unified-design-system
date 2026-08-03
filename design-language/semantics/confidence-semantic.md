---
id: confidence-semantic
category: semantics
type: concept
priority: high
ai_priority: high
confidence_default: preferred
related:
  - front-matter-schema
  - validation
  - urgency
components:
  - Status
  - Alert
  - Badge
patterns:
  - forms
tokens:
  []
depends_on:
  []
influences:
  - forms
conflicts_with:
  - visual-noise
alternatives:
  []
---
# Confidence (semantic)

## What

Confidence describes how certain the system is about a recommendation or state—and how strongly UI should assert it.

## Why

AI and humans need to distinguish immutable rules from flexible guidance (see front-matter confidence labels).

## When

Documenting rules; surfacing uncertain AI suggestions; soft vs hard validation.

## How AI should reason

1. Tag rules Required / Strong / Optional.
2. Do not present Optional as Required.
3. In UI, uncertain states use secondary Status—not destructive Alert.

Confidence: Preferred — Follow related decision trees before inventing layout.


## Relationships

### Supports

- `front-matter-schema`
- `validation`
- `urgency`

### Requires

- Philosophy
- Design physics

### Influences

- forms

### Uses

- Status
- Alert
- Badge

### Conflicts With

- Visual noise
- Layout mistakes

### Alternatives

- —

### Depends On

- semantics foundation concepts

### Referenced By

- ai/indexes/concept-index.md



## See also

- [front-matter-schema](../_meta/front-matter-schema.md)
- [validation](../interactions/validation.md)
- [urgency](./urgency.md)
