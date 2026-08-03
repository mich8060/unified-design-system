---
id: choice-complexity
category: physics
type: principle
priority: high
ai_priority: high
confidence_default: preferred
related:
 - laws-of-ux
 - progressive-disclosure
 - toolbar-action-slots
 - cognitive-load
 - choosing-components
components:
 - Button
 - DropdownMenu
patterns: []
tokens: []
depends_on:
 - philosophy
influences:
 - toolbar-action-slots
 - progressive-disclosure
 - choosing-components
conflicts_with:
 - visual-noise
alternatives: []
design_intent:
 - navigation
 - editing
---

# More choices slow decisions

## What

Decision time rises with the **number and complexity** of options. Too many visible choices overwhelm (choice overload).

## Why

Also known as **Hick’s Law** and **Choice Overload** — see [`laws-of-ux`](./laws-of-ux.md). Toolbars and menus that expose every action compete with the primary task.

## When

Toolbars (`PageHeaderActions`, `FilterbarActions`), menus, filters, and any screen that offers many peer actions.

## How AI should reason

1. Cap labeled toolbar actions; **one** primary; if more than three buttons, overflow behind **DotsThree** last (`weight="bold"`).
2. Prefer progressive disclosure (Sheet, Dialog, nested steps) over dumping every option on first paint.
3. Do not present long undifferentiated lists of peer CTAs at equal weight.

**FAIL IF:** Five+ equally weighted labeled actions in a toolbar with no overflow; every setting exposed at once when sections could navigate.

Confidence: Preferred — UDS toolbar-action-slots and progressive disclosure are the normative applications.

## Related law

- **Hick’s Law**, **Choice Overload** — see [`laws-of-ux`](./laws-of-ux.md)

## See also

- [Toolbar action slots](../semantics/toolbar-action-slots.md)
- [Progressive disclosure](./progressive-disclosure.md)
- [Cognitive load](./cognitive-load.md)
- [Laws of UX index](./laws-of-ux.md)
