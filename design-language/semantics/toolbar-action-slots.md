---
id: toolbar-action-slots
category: semantics
type: rule
priority: high
ai_priority: high
confidence_default: preferred
related:
 - page-header-ontology
 - filterbar-ontology
 - grammar-rules
 - touch-targets
 - visual-noise
 - laws-of-ux
 - choice-complexity
components:
 - PageHeader
 - Filterbar
 - Button
 - DropdownMenu
patterns:
 - lists
 - tables
 - detail-pages
tokens: []
depends_on:
 - grammar-rules
influences:
 - page-header-ontology
 - filterbar-ontology
conflicts_with:
 - visual-noise
alternatives: []
design_intent:
 - navigation
 - scanability
---
# Toolbar action slots (Page Header & Filterbar)

## What

Usage rules for **`PageHeaderActions`** and **`FilterbarActions`** — the trailing action regions on page chrome and list/table toolbars.

## Recommended composition

When the actions slot is used:

| Rule | Detail |
|------|--------|
| **One primary** | Include **at least one** and **only one** primary `Button` (`variant` default / primary). No second primary in the same slot. |
| **Default size** | Use **default-size** Buttons (`size="default"` or omit `size`) for labeled actions in these slots — not `sm` / compact. |
| **Overflow at 4+** | If you would show **more than three** buttons, keep up to **three** visible (including the single primary) and put the rest behind a **three-dots** icon button that opens an action menu (`DropdownMenu` / menu of additional actions). Prefer package **`DotsThreeIcon`** or **`DotsThreeVerticalIcon`**. |
| **Three-dots last** | The three-dots overflow control is **always the last child on the right** in the actions slot — after every labeled and icon action (including the primary). Never place actions after it. |
| **Bold glyph** | The three-dots icon **must** use Phosphor **`weight="bold"`** (e.g. `<DotsThreeVerticalIcon weight="bold" />`). Do **not** use `weight="fill"`, regular, or light for this control. |
| **No Badge in PageHeaderActions** | **Preferred:** Do not place `Badge` in `PageHeaderActions`. That slot is for actionable controls (Buttons / overflow). Put counts or state near the title stack instead. |

```tsx
<PageHeaderActions>
 <Button type="button" variant="outline">Export</Button>
 <Button type="button">Add provider</Button>{/* only primary */}
</PageHeaderActions>

{/* More than three actions → overflow menu; three-dots always last + bold */}
<FilterbarActions>
 <Button type="button" variant="outline">Export</Button>
 <Button type="button" variant="outline">Share</Button>
 <Button type="button">Create</Button>
 <DropdownMenu>
 <DropdownMenuTrigger asChild>
 <Button type="button" variant="outline" size="icon" aria-label="More actions">
 <DotsThreeVerticalIcon className="size-5" weight="bold" aria-hidden />
 </Button>
 </DropdownMenuTrigger>
 <DropdownMenuContent align="end">{/* additional actions */}</DropdownMenuContent>
 </DropdownMenu>
</FilterbarActions>
```

The overflow trigger may be an icon Button; labeled actions in the slot stay **default** size. Place the overflow trigger **last**.

## Why

One primary CTA keeps hierarchy clear ([`grammar-rules`](../grammar/rules.md)). Default size preserves touch targets ([`touch-targets`](../accessibility/touch-targets.md)). Overflow menus prevent crowded action strips ([`visual-noise`](../anti-patterns/visual-noise.md)).

## When

Every time `PageHeaderActions` or `FilterbarActions` contains Buttons. Does **not** apply to `FilterbarFacets` (facet chips may use `size="sm"`).

## Do not

- Two or more primary Buttons in the same actions slot
- Zero primary Buttons when the slot is used for page/collection CTAs (prefer exactly one)
- Compact/`sm` labeled Buttons as the default in these slots
- Four or more visible Buttons without a three-dots overflow menu
- Place any action **after** the three-dots control
- Use a non-bold (`regular` / default) three-dots glyph in these slots
- Use `weight="fill"` on the three-dots glyph (use **`bold`** only)
- Prefer **not** to place `Badge` in **`PageHeaderActions`** (status/count belongs with the title stack)

## How AI should reason

1. Composing `PageHeaderActions` or `FilterbarActions` → plan actions first.
2. Pick **exactly one** primary default-size Button.
3. Other visible actions → outline/secondary, default size.
4. If count would exceed **three** Buttons → add `DotsThree*` + menu for the rest.
5. Render the three-dots control **last on the right**, with **`weight="bold"`** (never `fill`).

Confidence: Preferred — One primary, default size; bold three-dots overflow last when more than three actions; no Badge in `PageHeaderActions`.

## Related law

Applies **Hick’s Law** / **Choice Overload** — cap visible choices; see [`choice-complexity`](../design-physics/choice-complexity.md) and [`laws-of-ux`](../design-physics/laws-of-ux.md).

## See also

- [Choice complexity](../design-physics/choice-complexity.md)
- [Laws of UX index](../design-physics/laws-of-ux.md)
- [Page Header ontology](../ontology/page-header.md)
- [Filterbar ontology](../ontology/filterbar.md)
- [Grammar rules](../grammar/rules.md)
- [Touch targets](../accessibility/touch-targets.md)
