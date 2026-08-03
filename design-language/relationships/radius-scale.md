---
id: radius-scale
category: relationship
type: concept
priority: high
ai_priority: high
confidence_default: required
related:
  - corner-radius
  - choosing-radius
  - radius-mistakes
components:
  - Button
  - Card
  - Dialog
patterns:
  []
tokens:
  - "--uds-radius-0"
  - "--uds-radius-12"
  - "--uds-radius-9999"
depends_on:
  - corner-radius
influences:
  - choosing-radius
conflicts_with:
  - radius-mistakes
alternatives:
  []
---
# Radius scale

## Tokens (`uds-tokens.css`)

| Token | px | Product UI note |
|-------|---:|-----------------|
| `--uds-radius-0` | 0 | Sharp |
| `--uds-radius-2` | 2 | |
| `--uds-radius-4` | 4 | **Prefer for app chrome** (Button uses ~4px) |
| `--uds-radius-6` | 6 | |
| `--uds-radius-8` | 8 | Overlays / menus as shipped |
| `--uds-radius-12` | 12 | **Max for rectangles** |
| `--uds-radius-16|20|24` | 16–24 | Exist in CSS — **do not use on product rectangles** |
| `--uds-radius-9999` | pill | Circles/pills only |

Confidence: Required — Cap rectangles at 12px even if larger tokens exist.


## Relationships

### Supports

- Corner radius policy

### Requires

- Tokens

### Influences

- choosing-radius

### Uses

- --uds-radius-*

### Conflicts With

- radius-mistakes

### Alternatives

- —

### Depends On

- corner-radius

### Referenced By

- foundations/corner-radius.md



## See also

- [Corner radius](../foundations/corner-radius.md)
- [Radius mistakes](../anti-patterns/radius-mistakes.md)
