---
id: alert-dialogs
category: pattern
type: pattern
priority: high
ai_priority: high
confidence_default: preferred
related:
  - alert-dialog-ontology
  - dialogs
  - dialogs-tree
  - focus-order
  - buttons-tree
  - intent
components:
  - AlertDialog
  - Button
patterns:
  - alert-dialogs
tokens:
  - "--uds-elevation-modal"
depends_on:
  - alert-dialog-ontology
  - focus-order
  - intent
influences: []
conflicts_with:
  - accessibility-mistakes
alternatives:
  - dialogs
  - forms
design_intent:
  - interrupt_workflow
  - prevent_harm
  - obtain_confirmation
---

# Alert dialogs

## What

`AlertDialog` is a blocking overlay that **interrupts the workflow**, **prevents harm**, and **obtains confirmation** before a consequential action continues. It is not a form surface or temporary workspace (`Dialog`).

## Design intent

```yaml
design_intent:
  - interrupt_workflow
  - prevent_harm
  - obtain_confirmation
```

## use_when

Use an **AlertDialog** when one or more of these apply:

| Condition | Meaning |
|-----------|---------|
| `destructive_action` | The action deletes, removes, or otherwise destroys user/system data |
| `irreversible_action` | The outcome cannot be undone (or undo is unreliable / costly) |
| `critical_system_error` | The system must stop the user and force recognition of a blocking failure |
| `security_warning` | Continuing may expose credentials, privacy, or unauthorized access risk |
| `legal_acknowledgement` | Policy, terms, or compliance requires an explicit acknowledge before proceed |

## avoid_when

Do **not** use AlertDialog when:

| Condition | Prefer instead |
|-----------|----------------|
| `collecting_form_data` | `Dialog` (`temporary_workspace`) or full-page form |
| `editing_content` | Inline edit / `Dialog` / settings page |
| `lengthy_explanations` | Dedicated page, Sheet, or help content — keep AlertDialog short |
| `multi-step_tasks` | Wizard / full page / `Dialog` temporary workspace |

## Why

Alert dialogs force a decision at the moment of risk. Stretching them into forms or long copy weakens urgency and recreates a bad modal workspace.

## When (component map)

| Case | Component |
|------|-----------|
| Confirm / prevent harm (see `use_when`) | `AlertDialog` |
| Small multi-input task, return to context | `Dialog` — [`dialogs`](./dialogs.md) |
| More detail about Main | Right `Sheet` |
| Transient ack / soft error | Toast / Status / Alert (non-modal) |

## Rules

- Keep copy short: title + one clear consequence + confirm / cancel.
- Destructive confirm → primary `Button variant="destructive"`.
- Always accessible name (`AlertDialogTitle`).
- One decision path — no multi-step or field collection inside AlertDialog.
- Do not build custom `div` alert modals.

Confidence: Preferred — AlertDialog for interrupt / prevent harm / obtain confirmation only.

## How AI should reason

1. Match `use_when` — if none fit, do **not** use AlertDialog.
2. If `avoid_when` matches → route to Dialog, page, Sheet, or Toast.
3. Compose AlertDialog with title, description, cancel + confirm actions.

## See also

- [AlertDialog ontology](../ontology/alert-dialog.md)
- [Dialogs (temporary workspace)](./dialogs.md)
- [Dialogs tree](../decision-rules/trees/dialogs.md)
- [Design Intent](../semantics/intent.md)
- [Focus order](../accessibility/focus-order.md)
