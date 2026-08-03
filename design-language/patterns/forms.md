---
id: forms
category: pattern
type: pattern
priority: critical
ai_priority: critical
confidence_default: preferred
related:
  - a11y-forms
  - field-ontology
  - forms-tree
  - settings-form
  - settings-nav-panel
  - narrow-form
  - page-composition
  - validation
components:
  - AppShell
  - Menu
  - SectionHeader
  - Field
  - FieldLabel
  - FieldError
  - Input
  - Select
  - Switch
  - Button
patterns:
  - settings-form
tokens:
  - "--uds-gap-12"
  - "--uds-gap-16"
depends_on:
  - intent
  - field-ontology
influences:
  - settings-form
conflicts_with:
  - accessibility-mistakes
alternatives:
  - dialogs
design_intent:
  - editing
  - confirmation
---

# Forms

## What

Multi-field edit/create flows using `Field` chrome inside `AppShell.Main` (settings, profile, admin).

## Why

Field labels, descriptions, and `FieldError` (`role="alert"`) keep validation accessible and visually consistent.

## When

- Many fields, single column → **`settings-form`** (`MainContent fixed`) — `ai/recipes/settings-form.md`
- Focused short task → **`narrow-form`** (prose max-width) — `ai/recipes/narrow-form.md`
- Many settings sections → **`settings-nav-panel`** (vertical `Tabs` | panel) — `ai/recipes/settings-nav-panel.md`
- Few fields + focused decision → Dialog (see dialogs pattern / tree)
- Filters near a collection → filters pattern (SearchInput + selects), not a full settings page

See also [`page-composition`](../semantics/page-composition.md).

## Goal (example)

Allow the user to edit profile / notification preferences.

## Reasoning

```
Contains multiple inputs
→ page-composition pattern (settings-form / narrow-form / settings-nav-panel)
→ Grouped sections (SectionHeader + Field stacks) — not Card-per-field
→ Default: stack Fields in one column
→ Multi-column only for related pairs (e.g. first + last name) or dense forms that need the space
→ Field + FieldLabel per control
→ Primary Save Button + Secondary Cancel
→ FieldError on invalid
```

## UDS rules

| Rule | Detail |
|------|--------|
| Label | Always `FieldLabel` — never placeholder-as-label |
| Field layout | **Prefer stacked** (single column). Use `md:grid-cols-2` only for **related** fields (e.g. first & last name) or when a **dense** form needs to utilize horizontal space. Do not put unrelated fields side-by-side by default. |
| Orientation | `Field` `vertical` \\| `horizontal` \\| `responsive` |
| Actions | One primary Button per section/footer actions |
| Spacing | Field stacks gap-12–16; sections gap-24–32 |
| Shell | AppShell + Menu; content in Main |

Confidence: Required — Use Field for labeled controls; errors via FieldError + invalid state. Prefer stacked field layout.

## Relationships

### Supports

- Accessible data entry

### Requires

- Field, intent, AppShell for product settings

### Influences

- settings-form recipe

### Uses

- Field*, Input/Select/Switch, Button, SectionHeader

### Conflicts With

- accessibility-mistakes, placeholder-only labels

### Alternatives

- Dialog for short forms; Drawer for medium side flows

### Depends On

- field-ontology, a11y-forms

### Referenced By

- decision-rules/trees/forms.md, examples/forms.md

## See also

- [Page composition](../semantics/page-composition.md)
- [Accessible forms](../accessibility/forms.md)
- [Forms tree](../decision-rules/trees/forms.md)
- [Settings form recipe](../../ai/recipes/settings-form.md)
- [Narrow form recipe](../../ai/recipes/narrow-form.md)
- [Settings nav panel recipe](../../ai/recipes/settings-nav-panel.md)
- [Field ontology](../ontology/field.md)
