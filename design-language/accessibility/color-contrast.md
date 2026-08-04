---
id: color-contrast
category: accessibility
type: concept
priority: critical
ai_priority: critical
confidence_default: required
related:
  - color
  - contrast-discoverability
  - readability
  - typography
components:
  - Text
  - Button
  - Badge
  - Status
  - Link
patterns:
  - dashboards
  - tables
  - forms
tokens:
  - "--uds-text-primary"
  - "--uds-text-secondary"
  - "--uds-surface-primary"
  - "--uds-surface-secondary"
depends_on:
  - color
  - contrast-discoverability
influences:
  - readability
  - badge-ontology
  - status-ontology
conflicts_with:
  - visual-noise
  - accessibility-mistakes
alternatives:
  []
---
# Color contrast

## What

Text and interactive chrome must meet WCAG contrast against their background. UDS encodes safe pairs as semantic tokens.

## Why

Secondary text on tinted brand surfaces is a common AI failure mode in dashboards.

## When

All text, icons-as-controls, Badge/Status labels, Button labels.

## UDS tokens (prefer these pairs)

| Role | Token examples |
|------|----------------|
| Body on page | `--uds-text-primary` on `--uds-surface-primary` |
| Meta / secondary | `--uds-text-secondary` on primary/secondary surfaces |
| Disabled | `--uds-text-disabled` on `--uds-surface-disabled` |
| Brand emphasis | `--uds-text-brand-*` / `--uds-surface-brand-*` via components |
| Links | `--uds-text-link-primary-{default,hover,active,visited}` |

Use `Text` `appearance` props (primary/secondary/tertiary/…) instead of raw hex.

**Status/Badge:** meaning also carried by label text (and Status `variant`), not hue alone.

## How AI should reason

1. Pick semantic text + surface tokens (or Text/Button/Badge appearances).
2. Avoid `--uds-text-secondary` on busy brand tints without checking contrast.
3. Never hardcode hex for product UI.

Confidence: Required — Use semantic text-on-surface tokens; no color-only status.


## Relationships

### Supports

- Readability
- Discoverability

### Requires

- Color foundation

### Influences

- Dashboards
- Tables
- Forms

### Uses

- Text appearances
- semantic color tokens

### Conflicts With

- Hardcoded hex
- Secondary text on loud tints

### Alternatives

- —

### Depends On

- color

### Referenced By

- foundations/color.md
- semantics/readability.md



## See also

- [Color](../foundations/color.md)
- [Readability](../semantics/readability.md)
- [Contrast physics](../design-physics/contrast-discoverability.md)
