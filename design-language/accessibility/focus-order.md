---
id: focus-order
category: accessibility
type: concept
priority: critical
ai_priority: critical
confidence_default: required
related:
  - focus
  - dialogs
  - keyboard
  - appshell-ontology
components:
  - Dialog
  - AlertDialog
  - Menu
  - Button
  - AppShell
patterns:
  - dialogs
  - forms
  - navigation
tokens:
  - "--uds-focus-ring-width"
  - "--uds-focus-ring-border"
  - "--uds-focus-ring-offset"
depends_on:
  - focus
  - affordance
influences:
  - dialogs
  - forms
conflicts_with:
  - accessibility-mistakes
alternatives:
  []
---
# Focus order

## What

Keyboard tab order must match visual reading order. Overlay components trap focus while open and restore it to the trigger on close.

## Why

Operational CHG tools are keyboard-heavy. Broken focus order makes queues, dialogs, and Menu unusable for keyboard and AT users.

## When

Every interactive screen—especially Dialog/AlertDialog, Menu expand/collapse, and master–detail listview.

## UDS implementation

| Surface | Behavior |
|---------|----------|
| **Button** | `focus-visible:ring-3 focus-visible:ring-ring/50` + `focus-visible:border-ring` (`button-theme.ts`) |
| **Badge** | `focus-visible:ring-[3px]` when focusable |
| **Dialog** | Radix Dialog — focus trap in content; Title/Description required for naming |
| **Menu** | Root is `<nav data-slot="uds-menu-root">`; items use `aria-current="page"` when active; keyboard focus uses `focus-visible` rings (do not remove) |
| **AppShell** | Skip nav first: content + search; then menu; then Header search (`role="search"`); then main |
| **Focus ring tokens** | `--uds-focus-ring-width` (2px), `--uds-focus-ring-border`, `--uds-focus-ring-offset` |

## How AI should reason

1. Do not invent `tabIndex` sequences that fight DOM order—fix the DOM.
2. Prefer UDS Dialog/AlertDialog over custom modals (trap + restore built in).
3. Icon-only buttons need `aria-label` so focus landing is announced.
4. After closing overlays, focus returns to the control that opened them.

Confidence: Required — Tab order follows visual order; modals trap focus.


## Relationships

### Supports

- Keyboard access
- Screen reader orientation

### Requires

- Visible focus styles
- Dialog/Menu primitives

### Influences

- Dialogs
- Forms
- Navigation

### Uses

- Button focus-visible rings
- Radix Dialog
- Menu aria-current

### Conflicts With

- Positive tabindex spaghetti
- Custom modals without trap

### Alternatives

- —

### Depends On

- interactions/focus

### Referenced By

- patterns/dialogs.md
- ontology/dialog.md



## See also

- [Focus interaction](../interactions/focus.md)
- [Dialogs](../patterns/dialogs.md)
- [Keyboard](../interactions/keyboard.md)
