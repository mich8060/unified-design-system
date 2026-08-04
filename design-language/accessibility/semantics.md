---
id: a11y-semantics
category: accessibility
type: concept
priority: high
ai_priority: high
confidence_default: required
related:
  - accessibility-meaning
  - screen-readers
  - affordance
components:
  - Button
  - Link
  - Menu
  - Dialog
  - Field
  - Table
patterns:
  - navigation
  - forms
  - tables
tokens:
  []
depends_on:
  - accessibility-meaning
influences:
  - screen-readers
conflicts_with:
  - accessibility-mistakes
alternatives:
  []
---
# Accessibility semantics (HTML / ARIA)

## What

This doc is about **HTML roles and names**—not design-semantics concepts (those live in `semantics/`).

Correct elements/roles: buttons are `Button`, links are `Link`, nav is Menu’s `<nav>`, dialogs use Dialog primitives.

## Why

`div onClick` looks interactive but lacks keyboard and AT semantics. UDS components ship the right roles.

## When

Any interactive or landmark UI.

## UDS landmarks & slots

| Landmark / slot | Implementation |
|-----------------|----------------|
| Skip to content | `AppShell` → `a.appshell-skip-link` (first focusable; targets `#uds-appshell-main`) |
| Product nav | `Menu` → `<nav data-slot="uds-menu-root">` |
| Main content | `AppShell.Main` inside `<main id="uds-appshell-main" class="appshell--main" tabindex="-1">` |
| Listview scroll | `data-slot="appshell-listview-scroll"` |
| Dialog | Radix Dialog parts with `data-slot="dialog-*"` |
| Field group | `Field` `role="group"` |

Do **not** nest another `<main>` inside `AppShell.Main` — the shell already provides the page main landmark.

## How AI should reason

1. Never use `div`/`span` with click handlers for primary actions—use `Button` / `Link`.
2. Do not override roles on UDS primitives unless extending documented patterns.
3. Keep design-semantics (`semantics/hierarchy.md` etc.) separate from this a11y file.

Confidence: Required — Use UDS interactive components instead of clickable divs.


## Relationships

### Supports

- Screen readers
- Keyboard

### Requires

- Published components

### Influences

- All interactive patterns

### Uses

- Button
- Link
- Menu nav
- Dialog
- Field

### Conflicts With

- Div buttons
- Fake links

### Alternatives

- —

### Depends On

- accessibility-meaning

### Referenced By

- screen-readers.md



## See also

- [Screen readers](./screen-readers.md)
- [Design semantics: accessibility meaning](../semantics/accessibility-meaning.md)
- [Affordance](../semantics/affordance.md)
