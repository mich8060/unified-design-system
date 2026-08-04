---
id: nested-radius
category: semantics
type: rule
priority: critical
ai_priority: critical
confidence_default: required
related:
  - corner-radius
  - choosing-radius
  - radius-mistakes
  - nesting
  - radius-scale
  - cards
components:
  - Card
  - Dialog
  - Button
  - Input
patterns:
  - cards
  - dialogs
  - dashboards
  - forms
tokens:
  - "--uds-radius-0"
  - "--uds-radius-2"
  - "--uds-radius-4"
  - "--uds-radius-8"
  - "--uds-radius-12"
depends_on:
  - corner-radius
  - nesting
influences:
  - cards
  - dialogs
  - choosing-radius
conflicts_with:
  - radius-mistakes
  - visual-noise
alternatives: []
---

# Nested radius

## What

Corner radius follows **nesting depth**: outer surfaces may use a larger radius; each nested surface uses a **smaller** (or equal-only when components force it—prefer smaller) radius. Surfaces at the **same hierarchical level** share the **same** radius token. Rectangles **never** exceed **12px**.

## Why

When an inner panel is as round as (or rounder than) its parent, the stack looks soft, inconsistent, and “AI-generic.” Stepping radius down with depth preserves the outer silhouette and keeps sibling chrome aligned.

## When

Any time bordered/filled rectangles nest: Card in Main, panel in Card, media in panel, Dialog content groups, etc.

## Hard caps (required)

| Rule | Detail |
|------|--------|
| **Never above 12px** on rectangles | No `rounded-2xl`, `rounded-[16px]`, or `--uds-radius-16|20|24` in product UI |
| **Pills/circles only** for `9999` / `rounded-full` | Avatars, dots, pill badges/toggles—not cards or panels |

## Nesting step-down (required)

Use the UDS scale only: `0 → 2 → 4 → 8 → 12` (px tokens `--uds-radius-*`).

| Nesting depth | Meaning | Allowed rectangle radii | Prefer |
|---------------|---------|-------------------------|--------|
| **0** | Outermost surface in the local stack (e.g. Dialog shell, top-level Card) | ≤ **12** | `8` or `12` (or component default) |
| **1** | Direct child surface inside depth 0 | **Strictly smaller than parent** when both are custom; typically ≤ **8** | `4` or `8` |
| **2** | Inside depth 1 | Smaller again; typically ≤ **4** | `4` or `2` |
| **3+** | Deeper nests | Prefer `2` or `0` | Avoid nesting this deep (see [`nesting`](../composition/nesting.md)) |

**Parent ≥ child is wrong when both are rectangular chrome you control.** Example: outer Card `12` → inner panel `8` or `4` → nested well `4` or `2`. Never outer `4` with inner `12`.

## Same level, same radius (required)

All surfaces at the **same hierarchy level** in a view must use the **same** radius token.

| Same level (examples) | Must match |
|----------------------|------------|
| Sibling Cards in a dashboard row | Same `--uds-radius-*` |
| Sibling KPI tiles | Same radius |
| Sibling form section panels | Same radius |
| Buttons in one toolbar | Same Button size/radius (component default) |

Do not mix `rounded-[length:var(--uds-radius-4)]` and `rounded-[length:var(--uds-radius-8)]` on sibling cards for decoration.

## How AI should reason

1. Cap every rectangle at **12px** max.
2. List the nesting stack (outer → inner).
3. Assign radii that **decrease** (or stay flat only when using unchanged component defaults that already step correctly)—never increase with depth.
4. Align all siblings at each depth to one token.
5. Prefer not nesting Cards; when you must, step down per this table.
6. Prefer component defaults (Button ~4px) over inventing radii.

### Example

```tsx
{/* depth 0 — outer card */}
<Card className="rounded-[length:var(--uds-radius-8)]">
  {/* depth 1 — inner well: smaller than parent */}
  <div className="rounded-[length:var(--uds-radius-4)] bg-[var(--uds-surface-secondary)] p-4">
    {/* depth 2 — nested media/control chrome */}
    <div className="rounded-[length:var(--uds-radius-2)] …" />
  </div>
</Card>

{/* siblings at depth 0 — same radius */}
<div className="grid grid-cols-3 gap-4">
  <Card className="rounded-[length:var(--uds-radius-8)]" />
  <Card className="rounded-[length:var(--uds-radius-8)]" />
  <Card className="rounded-[length:var(--uds-radius-8)]" />
</div>
```

Confidence: Required — Never use rectangle radii above 12px.

Confidence: Required — Radius gets smaller as nesting depth increases.

Confidence: Required — Same hierarchical level uses the same radius value.

## Relationships

### Supports

- Nesting clarity, visual consistency

### Requires

- corner-radius tokens, nesting judgment

### Influences

- Cards, dialogs, dashboards, choosing-radius

### Uses

- `--uds-radius-0|2|4|8|12`

### Conflicts With

- radius-mistakes (over-12, full on rectangles)
- Larger inner radius than outer
- Mixed radii among siblings

### Alternatives

- Flat SectionHeader layout (no nested surfaces)

### Depends On

- corner-radius, nesting

### Referenced By

- foundations/corner-radius.md
- decision-rules/choosing-radius.md
- anti-patterns/radius-mistakes.md
- ai/indexes/concept-index.md (after generate:ai)

## See also

- [Corner radius](../foundations/corner-radius.md)
- [Choosing radius](../decision-rules/choosing-radius.md)
- [Radius mistakes](../anti-patterns/radius-mistakes.md)
- [Nesting](../composition/nesting.md)
