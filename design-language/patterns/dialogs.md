---
id: dialogs
category: pattern
type: pattern
priority: high
ai_priority: high
confidence_default: preferred
related:
  - dialog-ontology
  - alert-dialogs
  - alert-dialog-ontology
  - dialogs-tree
  - focus-order
  - buttons-tree
  - intent
components:
  - Dialog
  - AlertDialog
  - Button
  - Field
patterns:
  - dialogs
  - alert-dialogs
tokens:
  - "--uds-elevation-modal"
depends_on:
  - dialog-ontology
  - focus-order
  - intent
influences: []
conflicts_with:
  - accessibility-mistakes
alternatives:
  - forms
  - alert-dialogs
design_intent:
  - temporary_workspace
---

# Dialogs (modals)

## What

Focused overlays for a **temporary workspace** using UDS `Dialog` (Radix-based, focus trap, `data-slot="dialog-*"`). The user steps into a short task, completes it, and returns to the previous context.

For interrupt / prevent harm / obtain confirmation, use **`AlertDialog`** — [`alert-dialogs`](./alert-dialogs.md). Toasts and non-modal alerts cover soft acknowledgment.

## Design intent

`design_intent: temporary_workspace`

## use_when

Use a **modal `Dialog`** when:

| Condition | Meaning |
|-----------|---------|
| `user_must_complete_small_task` | A discrete task must be finished before continuing productively |
| `task_requires_multiple_inputs` | Several fields or controls belong together in one focused surface |
| `user_returns_to_previous_context` | After dismiss/submit, the user lands back on the same Main context |

## avoid_when

Do **not** use a modal `Dialog` when:

| Condition | Prefer instead |
|-----------|----------------|
| `asking_for_confirmation` | `AlertDialog` — [`alert-dialogs`](./alert-dialogs.md) |
| `displaying_critical_errors` | `AlertDialog` (if blocking) or Alert / recovery UI |
| `acknowledging_information` | Toast / Status / inline copy — not a modal |

## Why

Custom modals usually miss focus restore, titles, and elevation. Package dialogs already stack at modal elevation (~1300). Intent-gated usage keeps Dialog for temporary workspaces and routes confirms/errors/acks elsewhere.

## When (component map)

| Case | Component |
|------|-----------|
| Temporary workspace (see `use_when`) | `Dialog` |
| Interrupt / prevent harm / obtain confirmation | `AlertDialog` — [`alert-dialogs`](./alert-dialogs.md) |
| More detail about something in Main | Right **`Sheet`** (`side="right"`) — [`right-side-panel`](../semantics/right-side-panel.md) |
| Large form | Full page `settings-form` — not a huge dialog |
| Soft acknowledgment | Toast / Status — not Dialog |

## Goal (example)

Create or edit a small record with several fields without leaving the page. For inspectors on Main content, open a right Sheet instead. For “Are you sure?”, use AlertDialog.

## Reasoning

```
Need secondary UI?
→ More detail about Main? → Sheet side=right
→ AlertDialog use_when? → AlertDialog
→ Small multi-input task, return to prior context? → Dialog (temporary_workspace)
→ Large form? leave overlay → settings-form
```

## Rules

- Always include `DialogTitle` (accessible name).
- Primary + secondary actions in footer; one primary.
- Match `use_when` / `avoid_when` above before opening a Dialog.
- Do not build `div` modals.

Confidence: Preferred — Prefer Dialog for temporary_workspace; AlertDialog for interrupt / prevent harm / confirm.

## Relationships

### Supports

- Progressive disclosure, temporary workspace

### Requires

- DialogTitle, focus trap

### Influences

- Button choices

### Uses

- Dialog*, Button, Field

### Conflicts With

- accessibility-mistakes (custom modals)
- Using Dialog for confirmation / critical errors / acknowledgment

### Alternatives

- AlertDialog, Sheet, full page form, Toast

### Depends On

- dialog-ontology, focus-order, intent

### Referenced By

- decision-rules/trees/dialogs.md

## See also

- [Alert dialogs](./alert-dialogs.md)
- [Design Intent](../semantics/intent.md)
- [Right side panel](../semantics/right-side-panel.md)
- [Sheet ontology](../ontology/sheet.md)
- [Dialogs tree](../decision-rules/trees/dialogs.md)
- [Dialog ontology](../ontology/dialog.md)
- [Focus order](../accessibility/focus-order.md)
