---
id: color
category: foundation
type: concept
priority: critical
ai_priority: critical
confidence_default: required
related:
  - contrast-discoverability
  - color-contrast
  - visual-weight
  - emphasis
  - urgency
  - appshell-body-surface
  - status-ontology
  - errors-tree
components:
  - Badge
  - Status
  - Medallion
  - Button
  - Card
  - Alert
  - AppShell
patterns:
  - dashboards
  - forms
tokens:
  - "--uds-text-primary"
  - "--uds-surface-primary"
  - "--uds-surface-secondary"
  - "--uds-border-primary"
  - "--uds-system-destructive-primary"
  - "--uds-system-warning-primary"
  - "--uds-system-constructive-primary"
  - "--uds-system-action-primary"
depends_on:
  - contrast-discoverability
influences:
  - visual-weight
  - accessibility-meaning
conflicts_with:
  - visual-noise
alternatives: []
---

# Color

## What

Colors are **semantic first**: roles such as `--uds-text-primary`, `--uds-surface-primary`, `--uds-border-primary`, status accents, and brand-linked surfaces—not raw palette steps in product UI.

## Why

Semantic tokens keep light/dark and brand modes coherent. Hardcoded hex breaks themes and accessibility.

## When

All surfaces, text, borders, and status. Prefer component variants that already map to tokens.

## Rules

- Light/dark via `.dark` and semantic aliases
- Brand via `Menu`/`brand` modes—not per-screen hex
- Emphasis through `Badge`, `Status`, `Medallion`, tinted `Card` before custom accents
- Never convey meaning by color alone (pair with text/icon)
- **AppShell body/main canvas** → `--uds-surface-secondary` ([`appshell-body-surface`](../semantics/appshell-body-surface.md)); cards on that canvas → `--uds-surface-primary`

## Feedback meaning → color pattern (usage)

Map **meaning** to the matching **system color pattern** — do not invent parallel reds/ambers/greens/blues.

| Meaning | Color pattern (tokens) | Prefer these APIs |
|---------|------------------------|-------------------|
| **Error** | **Destructive** — `--uds-system-destructive-*` / Badge accent `red` | `Status variant="error"` (Badge-aligned appearances); `Alert variant="destructive"`; `Button variant="destructive"`; Field `data-invalid` |
| **Warning** | **Warning** — `--uds-system-warning-*` / Badge accent `yellow` | `Status variant="warning"`; `Alert variant="warning"` |
| **Success** | **Constructive / success** — `--uds-system-constructive-*` / Badge accent `green` | `Status variant="success"`; `Alert variant="success"` |
| **Information** | **Action / info** — `--uds-system-action-*` / Badge accent `blue` | `Status variant="info"`; informational `Alert` stays `default` unless a dedicated info chrome is needed |

`Status` appearances (`subtle` / `pastel` / `outlined` / `solid`) use the **same accent shade steps as Badge** for those hues.

**FAIL IF:** error UI uses warning yellow, success uses destructive red, or info uses an arbitrary accent outside the action/info pattern.

Confidence: **Required** — Errors → destructive; warnings → warning; success → constructive; information → action/info.

## How AI should reason

1. Pick a semantic role (text/surface/border/status).
2. For feedback, classify meaning → table above → matching component variant / system tokens.
3. Prefer UDS component appearance props.
4. If inventing a surface, bind to `--uds-*`—not hex.
5. Inside AppShell, do not paint Main as primary white—the shell body is already surface secondary.

Confidence: Required — Never hardcode colors in product UI.

## Relationships

### Supports

- Visual weight, emphasis, brand modes

### Requires

- Contrast / accessibility

### Influences

- Status, badges, buttons

### Uses

- Semantic `--uds-*` color tokens

### Conflicts With

- Visual noise, one-off hex

### Alternatives

- —

### Depends On

- contrast-discoverability

### Referenced By

- accessibility/color-contrast.md

## See also

- [AppShell body surface](../semantics/appshell-body-surface.md)
- [Color contrast](../accessibility/color-contrast.md)
- [Visual weight](../semantics/visual-weight.md)
- [Status](../ontology/status.md)
- [Errors decision tree](../decision-rules/trees/errors.md)
