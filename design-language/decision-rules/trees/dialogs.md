---
id: dialogs-tree
category: decision
type: tree
priority: critical
ai_priority: critical
confidence_default: preferred
related:
  - choosing-patterns
  - grammar-rules
  - right-side-panel
  - listview-drives-main
  - dialogs
  - alert-dialogs
  - intent
components:
  - Dialog
  - AlertDialog
  - Sheet
patterns:
  - dialogs
  - alert-dialogs
tokens:
  []
depends_on:
  - intent
  - right-side-panel
  - dialogs
  - alert-dialogs
influences:
  []
conflicts_with:
  []
alternatives:
  []
design_intent:
  - temporary_workspace
  - interrupt_workflow
  - prevent_harm
  - obtain_confirmation
---
# Decision tree: Dialogs & Alert dialogs

## What

Branching reasoning for **overlays** / inspectors, gated by design intent.

## Why

Modal `Dialog` is **`temporary_workspace`**. `AlertDialog` is **`interrupt_workflow` + `prevent_harm` + `obtain_confirmation`**. Mixing them produces the wrong interruption level.

## When

Before generating or refactoring UI in this category.

## Tree

```mermaid
flowchart TD
  start[Need overlay or secondary UI?] --> moreDetail{More detail about something in Main?}
  moreDetail -->|Yes| sheet[Sheet side right]
  moreDetail -->|No| harm{AlertDialog use_when?}
  harm -->|Yes| alert[AlertDialog]
  harm -->|No| temp{temporary_workspace?}
  temp -->|Yes| dialog[Dialog]
  temp -->|No| other[Page / Toast / Alert]
```

**AlertDialog `use_when`:** `destructive_action` · `irreversible_action` · `critical_system_error` · `security_warning` · `legal_acknowledgement`  
**AlertDialog `avoid_when`:** `collecting_form_data` · `editing_content` · `lengthy_explanations` · `multi-step_tasks`  
See [`alert-dialogs`](../../patterns/alert-dialogs.md).

**Dialog `temporary_workspace`:** small task + multiple inputs + return to previous context — [`dialogs`](../../patterns/dialogs.md).

## Reasoning outline

Need secondary UI?
→ **More detail about Main content?** → right **`Sheet`**
→ **AlertDialog `use_when`?** → `AlertDialog` (intents: interrupt_workflow, prevent_harm, obtain_confirmation)
→ **AlertDialog `avoid_when`?** → do **not** use AlertDialog
→ **temporary_workspace?** → `Dialog`
→ Large form → `settings-form`; soft ack/error → Toast / Alert
→ Collection drives Main → **listview**, not Sheet

Confidence: Required — Main-content inspectors use right Sheet.

Confidence: Preferred — Follow the tree; do not use Dialog for confirms or AlertDialog for forms.

## Relationships

### Supports

- Deterministic AI composition

### Requires

- Intent

### Influences

- Patterns
- Ontology

### Uses

- Grammar
- Semantics

### Conflicts With

- Ad-hoc component soup
- Dialog for confirmation / AlertDialog for forms

### Alternatives

- choosing-patterns for recipe routing

### Depends On

- intent, dialogs, alert-dialogs

### Referenced By

- ai/indexes/decision-index.md

## See also

- [Alert dialogs pattern](../../patterns/alert-dialogs.md)
- [Dialogs pattern](../../patterns/dialogs.md)
- [Design Intent](../../semantics/intent.md)
- [Right side panel](../../semantics/right-side-panel.md)
- [Choosing patterns](../choosing-patterns.md)
