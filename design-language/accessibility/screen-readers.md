---
id: screen-readers
category: accessibility
type: concept
priority: high
ai_priority: high
confidence_default: required
related:
  - a11y-semantics
  - accessibility-meaning
  - status-ontology
  - menu-ontology
components:
  - Button
  - Menu
  - Status
  - FieldError
  - Dialog
  - Text
patterns:
  - navigation
  - forms
  - dialogs
tokens:
  []
depends_on:
  - a11y-semantics
influences:
  - navigation
  - forms
conflicts_with:
  - accessibility-mistakes
alternatives:
  []
---
# Screen readers

## What

UI exposes correct names, roles, and updates so assistive technology can announce state.

## Why

Menu, Status, and FieldError already encode AT behavior—bypassing them with `div` + CSS loses announcements.

## When

Icon-only controls, live status changes, dialogs, navigation current page, form errors.

## UDS patterns

| Need | Implementation |
|------|----------------|
| Skip past chrome | `AppShell` skip nav (default on): content → `#uds-appshell-main`; search → `#uds-appshell-search` |
| Icon-only Button | `aria-label` (required) |
| Decorative Status dot | Status sets dot `aria-hidden` — keep the text label |
| Menu current page | `aria-current="page"` on active item |
| Menu groups | `aria-expanded` / `aria-controls` |
| Menu icons | `aria-hidden` on decorative icons |
| Form errors | `FieldError` → `role="alert"` |
| Dialog name | `DialogTitle` + `DialogDescription` |
| Live status | Prefer Status/Alert text; avoid silent color flips |

## How AI should reason

1. Prefer UDS components (roles built in).
2. Never ship icon-only Button without `aria-label`.
3. Status/Badge: include visible text, not color alone.
4. Announce errors via FieldError, not toast-only for blocking field errors.

Confidence: Required — Visible labels or aria-label on every control; FieldError for errors.


## Relationships

### Supports

- Inclusive ops workflows

### Requires

- Correct roles/names

### Influences

- Menu
- Forms
- Dialogs

### Uses

- aria-* on Menu/Button
- FieldError alert
- DialogTitle

### Conflicts With

- Div buttons
- Color-only status

### Alternatives

- —

### Depends On

- a11y-semantics

### Referenced By

- accessibility/semantics.md



## See also

- [HTML/ARIA semantics](./semantics.md)
- [Menu ontology](../ontology/menu.md)
- [Accessible forms](./forms.md)
