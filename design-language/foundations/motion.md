---
id: motion
category: foundation
type: concept
priority: medium
ai_priority: medium
confidence_default: preferred
related:
  - motion-identity
  - dialogs
  - menu-ontology
  - drawer
  - sheet
  - visual-noise
  - spatial-stability
components:
  - Dialog
  - Menu
  - Drawer
  - Sheet
  - Button
  - Popover
patterns:
  - dialogs
  - navigation
tokens:
  - "--uds-animation-duration-100"
  - "--uds-animation-duration-200"
  - "--uds-animation-duration-300"
  - "--uds-animation-duration-500"
  - "--uds-animation-ease-standard"
  - "--uds-animation-ease-accelerate"
  - "--uds-animation-ease-decelerate"
  - "--uds-animation-ease-emphasized"
depends_on:
  - motion-identity
influences:
  - dialogs
conflicts_with:
  - visual-noise
alternatives:
  []
---

# Motion

## What

Motion is a systematized part of UDS: **object + time + effect**, used so users can track the same control across states ([`motion-identity`](../design-physics/motion-identity.md)).

Shipped chrome uses component transitions (`data-open` / `data-closed` on Dialog overlay/content, Menu width, Popover/Sheet/Drawer enter/exit). Tokens live in `src/styles/uds-tokens.css`:

| Token family | Values |
|--------------|--------|
| **Duration** | `--uds-animation-duration-100` \| `200` \| `300` \| `500` |
| **Ease** | `--uds-animation-ease-standard` \| `accelerate` \| `decelerate` \| `emphasized` |

Do not invent one-off curves or millisecond values when a token fits.

Source framing for systematizing motion (audit → principles → building blocks → specs): [5 steps for including motion design in your system](https://www.designsystems.com/5-steps-for-including-motion-design-in-your-system/).

## Why

Without motion rules, teams invent ad-hoc animations that fight the system. Motion should:

1. **Educate** — show where something came from or where it went (Menu expand, Sheet from the right).
2. **Focus** — briefly highlight a state change (open Dialog, listview selection) without demanding extra clicks.
3. **Delight** — rare; CHG ops products prefer **productive** motion over brand flourish.

Decorative bounce, glow, and looping dashboard motion weaken trust and can violate motion sensitivity.

## When

| Use | Examples |
|-----|----------|
| **Yes** | Menu expand/collapse; Dialog / Drawer / Sheet / Popover open-close; subtle Button press (`translate-y-px`); listview pane width |
| **No** | KPI / StatisticCard loops; attention-seeking dashboard entrance; springy “personality” on every control |

Prefer built-in component motion over custom CSS.

## Guiding principles (UDS)

Teams often split motion into **usability** vs **delight** (Material: informative / focused / expressive; IBM: productive vs expressive; Salesforce: separate branding bucket). UDS defaults:

| Principle | UDS stance |
|-----------|------------|
| **Productive** | Short, predictable enter/exit for chrome and overlays — default |
| **Informative / focused** | Motion that explains spatial relationship or state (identity) — Preferred |
| **Expressive / delight** | Brand personality motion — avoid in AppShell product UI unless a product explicitly owns it |

Confidence: Preferred — Productive + identity-preserving; not expressive by default.

## Building blocks

### Duration scale

Use the token scale like type steps — diversity within bounds:

| Duration | Typical use (object-based) |
|----------|----------------------------|
| **100ms** | Small controls, micro-feedback (press, caret, quick fade) |
| **200ms** | Overlays and popovers enter/exit; most component transitions |
| **300ms** | Slightly larger panels; short choreography (2–3 peers) |
| **500ms** | Shell-scale moves only when needed (large distance); prefer shorter when possible |

Dynamic duration: shorter for small travel / small objects; longer only when distance or complexity requires it. Prefer **object-based** bands above over inventing per-screen formulas.

**FAIL IF:** multi-second decorative loops or page-wide staggered entrances on operational dashboards.

### Easing

| Token | Role |
|-------|------|
| `ease-standard` | Default in-between |
| `ease-decelerate` | Enter / settle (animate-in) |
| `ease-accelerate` | Exit / dismiss (animate-out) |
| `ease-emphasized` | Rare emphasis; not for routine chrome |

Expressive springy eases are out of scope for default product UI. Document 2–3 curves only — the four tokens above are the library.

### Effects

Systematize as **start → end** states (opacity, transform, width), not one-shot flourishes:

| Effect | Typical |
|--------|---------|
| Fade | Overlay scrim / content opacity |
| Scale (subtle) | Popover / Dialog zoom-in-95 style — keep subtle |
| Slide | Side panel from edge (Sheet/Drawer); directional enter |
| Width | Menu expanded ↔ collapsed |

Name patterns by intent when documenting (e.g. Dialog-Fade-In), not onomatopoeia for ops products.

### Choreography

Multiple objects in motion at once:

- Prefer **container-led** motion (the panel moves; content follows) over many independently bouncing children.
- Keep choreography **simple** (few peers) for power-user tools.
- Offer / respect **`prefers-reduced-motion`**: shorten or remove non-essential motion; keep instant state + focus when reduced.

## Specs (design → code)

When defining new motion, document **state A → state B**:

- Opacity %; scale; x/y or edge; duration token; ease token; what reduces under `prefers-reduced-motion`.
- Prefer text or a short timeline over orphan video alone so implementers can map to CSS/tokens.

## How AI should reason

1. Prefer shipped Dialog / Menu / Sheet / Drawer / Popover motion.
2. Choose **productive** duration (100–200 for controls/overlays; ≤300 unless shell-scale).
3. Enter ≈ decelerate; exit ≈ accelerate; default ≈ standard.
4. Do not add attention-seeking loops on dashboards ([`visual-noise`](../anti-patterns/visual-noise.md)).
5. Align with [`motion-identity`](../design-physics/motion-identity.md) — same object across states.
6. Honor reduced motion.

Confidence: Preferred — Motion only to preserve identity or explain state change; use duration/ease tokens.

Confidence: Required — No decorative dashboard motion; respect reduced-motion expectations for non-essential animation.


## Relationships

### Supports

- Spatial stability
- Overlay comprehension

### Requires

- Component transitions
- Motion tokens

### Influences

- Dialogs
- Menu
- Sheet / Drawer

### Uses

- Radix data-open/closed
- Menu expand
- `--uds-animation-duration-*` / `--uds-animation-ease-*`

### Conflicts With

- Decorative motion / glow
- Expressive springs on ops chrome

### Alternatives

- Instant state with clear focus

### Depends On

- motion-identity

### Referenced By

- design-physics/motion-identity.md



## See also

- [Motion identity physics](../design-physics/motion-identity.md)
- [Dialogs](../patterns/dialogs.md)
- [Visual noise](../anti-patterns/visual-noise.md)
- [Spatial stability](../design-physics/spatial-stability.md)
