---
id: sizing
category: foundation
type: concept
priority: high
ai_priority: high
confidence_default: preferred
related:
  - touch-targets
  - spacing
  - button-ontology
components:
  - Button
  - Input
  - AppShell
patterns:
  - forms
  - navigation
tokens:
  - "--appshell-menu-width-expanded"
  - "--appshell-listview-width"
depends_on:
  - touch-targets
influences:
  - forms
  - navigation
conflicts_with:
  []
alternatives:
  []
---
# Sizing

## What

Control and region sizes come from component size props and AppShell CSS variables—not magic numbers.

## Key sizes

| Surface | Size |
|---------|------|
| Button default | 44px height (`h-11`) |
| Button sm / xs | 36px / 32px |
| Input default / compact | ~44px / ~36px |
| Menu expanded / collapsed | `--appshell-menu-width-expanded` **280px** / `--appshell-menu-width-collapsed` **56px** |
| Listview | `--appshell-listview-width` **320–480px** (default **320**; set via `listviewWidth`) |
| Header | `--appshell-header-height` **3.5rem** |

## How AI should reason

1. Use Button/Input size variants.
2. Do not override AppShell widths with bespoke fixed rails.
3. Meet touch-target minimums for primary actions.

Confidence: Preferred — Prefer AppShell CSS variables for shell geometry.


## Relationships

### Supports

- Touch targets
- Spatial stability

### Requires

- Component size APIs

### Influences

- Layout
- Forms

### Uses

- Button sizes
- AppShell CSS vars

### Conflicts With

- Fixed inset-y Sidebar hacks

### Alternatives

- —

### Depends On

- touch-targets

### Referenced By

- grammar/regions.md



## See also

- [Touch targets](../accessibility/touch-targets.md)
- [AppShell regions](../grammar/regions.md)
- [Spacing](./spacing.md)
