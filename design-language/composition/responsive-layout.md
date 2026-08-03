---
id: responsive-layout
category: composition
type: concept
priority: medium
ai_priority: medium
confidence_default: preferred
related:
  - appshell-ontology
  - appshell-main-containment
  - density
  - touch-targets
  - grid
  - spacing
components:
  - AppShell
  - Menu
  - Field
  - MainContent
patterns:
  - navigation
  - dashboards
  - forms
tokens:
  - "--appshell-menu-width-expanded"
  - "--appshell-menu-width-collapsed"
depends_on:
  - sizing
influences:
  - dashboards
conflicts_with:
  []
alternatives:
  []
---
# Responsive layout

## What

Responsive behavior builds on AppShell (collapsible Menu 280↔64) and Field `orientation="responsive"`, not a separate breakpoint framework.

Layouts combine three modes (from spatial-systems practice):

| Mode | Meaning | UDS lever |
|------|---------|-----------|
| **Adaptive** | Experience changes by format | Collapsed vs expanded **Menu** (icon rail vs labeled nav); optional product-owned mobile patterns outside the shell |
| **Responsive** | Fluid layout across widths | Main sections stack below `lg`; at `lg+` short regions share a row (`lg:grid-cols-2` / chart+aside); Field `orientation="responsive"` |
| **Strict** | Fixed geometry that should not flex below a usable size | **Menu** widths (280 / 64); **MainContent** `containment="fixed"` (1280px primary panel); dense tables may scroll rather than crush |

## Why

Product apps are desktop-ops first but must remain usable when the rail collapses and on narrower widths. Naming adaptive / responsive / strict keeps shell chrome, fluid Main, and fixed containment from being confused.

## UDS levers

| Lever | Behavior |
|-------|----------|
| Menu | Expanded 280px / collapsed 56px via shell vars (**adaptive** + **strict** widths) |
| Field | `orientation="responsive"` |
| Touch | Keep 44px primary targets |
| MainContent | `edge` vs `fixed` (1280) — fixed panel is **strict** primary width; see [`appshell-main-containment`](../semantics/appshell-main-containment.md) |
| Dashboards | At desktop **Required:** short regions share a row (`lg:grid-cols-2` / chart+aside); stack below `lg` — **responsive** ([`appshell-main-containment`](../semantics/appshell-main-containment.md)) |

## How AI should reason

1. Don’t replace Menu with a custom responsive Sidebar.
2. Pick the mode: shell chrome → adaptive/strict widths; Main multi-region → responsive `lg:` stacks; fixed reading column → `MainContent` `fixed`.
3. **Below `lg`:** stack Main sections so content doesn’t squeeze horizontally. **At desktop (`lg`+):** short regions (lists, feeds, callouts, watchlists, narrow tables) **must share a grid row** with a peer — do not park them full-width alone ([`appshell-main-containment`](../semantics/appshell-main-containment.md)).
4. Test collapsed Menu icon rail (labels hidden—icons + aria-labels matter).

Confidence: Preferred — Use AppShell/Menu collapse; don’t fork the rail. Layout-mode framing (adaptive / responsive / strict) guides which lever to use.

Confidence: Required — Short Main regions share a row at `lg+`.


## Relationships

### Supports

- Multi-device ops

### Requires

- AppShell
- Menu

### Influences

- Navigation
- Forms

### Uses

- Menu expand state
- Field orientation
- MainContent containment

### Conflicts With

- Fixed duplicate mobile nav hacks

### Alternatives

- —

### Depends On

- sizing

### Referenced By

- patterns/navigation.md



## See also

- [AppShell Main containment](../semantics/appshell-main-containment.md) — section gap 16/24, 2–3 columns, boxed padding
- [Grid](../foundations/grid.md)
- [Spacing](../foundations/spacing.md)
- [Sizing](../foundations/sizing.md)
- [Navigation](../patterns/navigation.md)
- [Touch targets](../accessibility/touch-targets.md)
