---
id: dialog-ontology
category: ontology
type: object
priority: high
ai_priority: high
confidence_default: preferred
related:
  - ontology-index
  - choosing-components
  - grammar-hierarchy
  - dialogs
  - dialogs-tree
  - alert-dialogs
  - alert-dialog-ontology
  - intent
components:
  - Dialog
patterns:
  - dialogs
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
  - alert-dialog-ontology
design_intent:
  - temporary_workspace
---
# Dialog

## What

`Dialog` **is-a** Overlay (Radix-based) for a **temporary workspace** — a short multi-input task after which the user returns to the previous context.

## Design intent

`temporary_workspace`

### use_when

- `user_must_complete_small_task`
- `task_requires_multiple_inputs`
- `user_returns_to_previous_context`

### avoid_when

- `asking_for_confirmation` → use `AlertDialog` ([`alert-dialogs`](../patterns/alert-dialogs.md))
- `displaying_critical_errors` → use AlertDialog (blocking) or Alert / recovery UI
- `acknowledging_information` → use Toast / Status / inline copy

## API (system facts)

Parts: Root, Trigger, Portal, Overlay, Content, Header, Footer, Title, Description, Close — each with `data-slot="dialog-*"`. Elevation ~ modal (1300).

## Ontology

| Relation | Detail |
|----------|--------|
| **is-a** | Overlay (Radix-based) |
| **contains** | Title; Body; Actions |
| **requires** | DialogTitle for accessible name |
| **uses** | Button; Field; Focus trap |
| **appears in** | Temporary workspaces; short multi-field tasks |
| **supports** | Progressive disclosure; return to prior context |
| **does-not** | Replace AlertDialog confirms; soft acknowledgments |
| **cannot exist without** | Focus trap (provided by Radix) |

## How AI should reason

1. Classify intent — only proceed with Dialog if `temporary_workspace` matches `use_when`.
2. If interrupt / prevent harm / obtain confirmation → `AlertDialog`, not Dialog.
3. Read API table above + contract catalog for props.
4. Prefer this export over bespoke markup.

Confidence: Preferred — Dialog for temporary_workspace only.

## Relationships

### Supports

- Progressive disclosure
- Temporary workspace

### Requires

- DialogTitle for accessible name

### Influences

- Short multi-input tasks

### Uses

- Button
- Field
- Focus trap

### Conflicts With

- Bespoke equivalents
- src/components/ui imports
- Dialog used as confirm / error / ack modal

### Alternatives

- AlertDialog, Sheet, settings-form, Toast

### Depends On

- grammar-hierarchy, intent

### Referenced By

- ai/indexes/component-index.md
- patterns/dialogs.md

## See also

- [Dialogs pattern](../patterns/dialogs.md)
- [Alert dialogs](../patterns/alert-dialogs.md)
- [AlertDialog ontology](./alert-dialog.md)
- [Dialogs tree](../decision-rules/trees/dialogs.md)
- [Design Intent](../semantics/intent.md)
- [Ontology index](./README.md)
- [Choosing components](../decision-rules/choosing-components.md)
- [Contract](../../ai/uds-contract.json)
