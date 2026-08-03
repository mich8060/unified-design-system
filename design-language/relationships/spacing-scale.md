---
id: spacing-scale
category: relationship
type: concept
priority: high
ai_priority: high
confidence_default: required
related:
  - spacing
  - proximity
  - choosing-spacing
components:
  []
patterns:
  []
tokens:
  - "--uds-gap-2"
  - "--uds-gap-40"
  - "--uds-spacing-0"
  - "--uds-spacing-80"
depends_on:
  - spacing
influences:
  - choosing-spacing
conflicts_with:
  - spacing-mistakes
alternatives:
  []
---
# Spacing scale

## Gap tokens (`--uds-gap-*`)

| Token | px |
|-------|---:|
| `--uds-gap-2` | 2 |
| `--uds-gap-4` | 4 |
| `--uds-gap-8` | 8 |
| `--uds-gap-12` | 12 |
| `--uds-gap-16` | 16 |
| `--uds-gap-20` | 20 |
| `--uds-gap-24` | 24 |
| `--uds-gap-32` | 32 |
| `--uds-gap-40` | 40 |

## Spacing tokens (`--uds-spacing-*`)

Also available: 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 24, 32, 36, 40, 48, 64, 80 (px). Source: `src/styles/uds-tokens.css`.

## Relationship to semantics

Smaller steps bind related objects (proximity); larger steps separate sections (whitespace / hierarchy).

Confidence: Required — Use these scales only.


## Relationships

### Supports

- Proximity
- Density

### Requires

- uds-tokens.css

### Influences

- choosing-spacing

### Uses

- --uds-gap-*
- --uds-spacing-*

### Conflicts With

- spacing-mistakes

### Alternatives

- —

### Depends On

- spacing

### Referenced By

- foundations/spacing.md



## See also

- [Spacing](../foundations/spacing.md)
- [Choosing spacing](../decision-rules/choosing-spacing.md)
