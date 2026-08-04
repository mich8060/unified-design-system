---
id: button-icon-size
category: semantics
type: rule
priority: high
ai_priority: high
confidence_default: preferred
related:
  - button-ontology
  - iconography
  - toolbar-action-slots
  - filterbar-ontology
  - touch-targets
  - laws-of-ux
  - target-acquisition
components:
  - Button
patterns:
  - filters
  - dashboards
tokens: []
depends_on:
  - iconography
  - button-ontology
influences:
  - toolbar-action-slots
  - filterbar-ontology
conflicts_with: []
alternatives: []
design_intent:
  - scanability
---
# Button icon size

## What

Match **icon glyph size** to **Button `size`**. Labeled and icon-only buttons use the Figma slot scale (12 / 16 / 16 / 20 / 24 px). Theme CSS sets default SVG size via `[&_svg:not([class*='size-'])]` when you omit a size class.

## Why

A 16px glyph in a 44px or 52px button looks under-scaled; oversized glyphs crowd compact buttons. Consistent pairing keeps toolbars optically even.

## When

Any `Button` with a leading/trailing icon (`data-icon`) or icon-only (`size="icon*"`).

## Labeled buttons

| Button `size` | Height | Icon px | Class / Phosphor |
|---------------|--------|---------|------------------|
| `2x-sm` | 24 | **12** | `size-3` / `size={12}` |
| `xs` | 32 | **16** | `size-4` / `size={16}` |
| `sm` | 36 | **16** | `size-4` / `size={16}` |
| `default` | 44 | **20** | `size-5` / `size={20}` |
| `lg` | 52 | **24** | `size-6` / `size={24}` |

Use `data-icon="inline-start"` or `inline-end` on the icon. Prefer package icons with `aria-hidden` when decorative.

## Icon-only buttons

Hit targets are always **square**. Prefer **`size="icon"`** (44×44) next to default-height fields.

| Button `size` | Target | Icon px | Class |
|---------------|--------|---------|--------|
| `icon-xs` | 24×24 | **12** | `size-3` |
| `icon-sm` | 36×36 | **16** | `size-4` |
| `icon` | 44×44 | **20** | `size-5` |
| `icon-lg` | 52×52 | **24** | `size-6` |

Always set `aria-label` (or accessible name) on icon-only Buttons.

## Do not

- Use one icon size for every Button size
- Rely on ad-hoc SVG instead of package Phosphor icons
- Use oblong icon-only hit targets (see Button ontology)

## How AI should reason

1. Pick Button `size` for the context (default / icon next to SearchInput).
2. Apply the matching icon px from the tables (theme default should match if no `size-*` class).
3. Icon-only → square + `aria-label`.

Confidence: Preferred — Icon glyph scale follows Button size (Figma 12/16/16/20/24).

## See also

- [Target acquisition (Fitts’s Law)](../design-physics/target-acquisition.md)
- [Laws of UX index](../design-physics/laws-of-ux.md)
- [Button ontology](../ontology/button.md)
- [Iconography](../foundations/iconography.md)
- [Toolbar action slots](./toolbar-action-slots.md)
- [Touch targets](../accessibility/touch-targets.md)
