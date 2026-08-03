---
id: alert-dialog-ontology
category: ontology
type: object
priority: high
ai_priority: high
confidence_default: preferred
related:
  - ontology-index
  - choosing-components
  - grammar-hierarchy
  - alert-dialogs
  - dialogs
  - dialogs-tree
  - intent
components:
  - AlertDialog
patterns:
  - alert-dialogs
tokens:
  - "--uds-elevation-modal"
depends_on:
  - grammar-hierarchy
  - intent
influences:
  - progressive-disclosure
conflicts_with:
  []
alternatives:
  - dialog-ontology
design_intent:
  - interrupt_workflow
  - prevent_harm
  - obtain_confirmation
---
# AlertDialog

## What

`AlertDialog` **is-a** Overlay (Radix-based) that interrupts the workflow to prevent harm and obtain confirmation.

## Design intent

```yaml
design_intent:
  - interrupt_workflow
  - prevent_harm
  - obtain_confirmation
```

### use_when

- `destructive_action`
- `irreversible_action`
- `critical_system_error`
- `security_warning`
- `legal_acknowledgement`

### avoid_when

- `collecting_form_data` → `Dialog` / form page
- `editing_content` → inline / Dialog / settings
- `lengthy_explanations` → page / Sheet / help
- `multi-step_tasks` → wizard / page / Dialog temporary workspace

## API (system facts)

AlertDialog parts mirror Dialog (Root, Trigger, Portal, Overlay, Content, Header, Footer, Title, Description, Action, Cancel) with alert semantics. Elevation ~ modal (1300). Prefer package `AlertDialog` over a generic `Dialog` for confirms.

## Ontology

| Relation | Detail |
|----------|--------|
| **is-a** | Overlay (Radix-based) |
| **contains** | Title; Description; Cancel; Confirm action |
| **requires** | AlertDialogTitle for accessible name |
| **uses** | Button (destructive when needed); Focus trap |
| **appears in** | Deletes; irreversible submits; security / legal gates; blocking errors |
| **supports** | Interrupt workflow; prevent harm; obtain confirmation |
| **does-not** | Collect forms; host multi-step or long copy |
| **cannot exist without** | Focus trap (provided by Radix) |

## How AI should reason

1. Confirm `use_when` — if collecting/editing/long/multi-step → not AlertDialog.
2. Tag intents `interrupt_workflow` + `prevent_harm` + `obtain_confirmation`.
3. Prefer `AlertDialog` over `Dialog` for confirms.
4. Destructive → `Button variant="destructive"` on the confirm action.

Confidence: Preferred — AlertDialog for interrupt / prevent harm / confirm only.

## Relationships

### Supports

- Interrupt workflow
- Prevent harm
- Obtain confirmation

### Requires

- AlertDialogTitle

### Influences

- Destructive and irreversible flows

### Uses

- Button
- Focus trap

### Conflicts With

- Bespoke alert modals
- AlertDialog used as a form / temporary workspace

### Alternatives

- Dialog (`temporary_workspace`), Sheet, settings-form, Toast

### Depends On

- grammar-hierarchy, intent

### Referenced By

- patterns/alert-dialogs.md
- decision-rules/trees/dialogs.md

## See also

- [Alert dialogs pattern](../patterns/alert-dialogs.md)
- [Dialog ontology](./dialog.md)
- [Dialogs tree](../decision-rules/trees/dialogs.md)
- [Design Intent](../semantics/intent.md)
- [Ontology index](./README.md)
