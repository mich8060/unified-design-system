# Figma sync log

Running log of design updates made directly in the Figma file (`3bTua8rojOOC7tYWIEWJl0`, "Code Sync UDS") while correcting components against the live UDS docs (`localhost:5173/docs/components/*`). Entries are grouped by component, newest last. This log tracks Figma-side changes only — it does not track code changes in this repo (see `git log` for those).

## Badge

**Component:** `Badge` component set — node [`2214:5801`](https://www.figma.com/design/3bTua8rojOOC7tYWIEWJl0/Code-Sync-UDS?node-id=2214-5801)
**UDS reference:** `localhost:5173/docs/components/badge`, [src/components/ui/badge.tsx](../../src/components/ui/badge.tsx)

- 2026-07-16 — Added an `Icon` boolean component property (default `false`) to the Badge component set.
- 2026-07-16 — Added an `Icon Instance` instance-swap component property, and inserted a 12×12 leading icon instance into all 120 existing variants (Shape × Accent × Appearance), visibility bound to `Icon`.
- 2026-07-16 — Set the icon default to `Info`, `Weight=Regular` (Iconography library) — initial pass.
- 2026-07-16 — Changed the icon default to `Info`, `Weight=Bold` to match the icon weight convention already used in the UDS codebase's Badge examples.
- 2026-07-16 — Changed the icon default again to the Iconography library's `Default` component, `Weight=Bold` (per explicit request, [node `20:2136`](https://www.figma.com/design/FMm3ZTTZMJHLu1tFUY7x0i/Design-System--Iconography?node-id=20-2136)), applied across all 120 variants.
- 2026-07-16 — Recolored the icon on all 120 variants to match each variant's label text fill (copied the text's fill/variable binding onto the icon's vector), so the icon now tracks each accent/appearance combination instead of using a fixed neutral color.

**Net current state:** every Badge variant has a hidden-by-default leading icon (Iconography `Default`, Bold weight) that designers can toggle on via the `Icon` property, swap via `Icon Instance`, and which always renders in the same color as the badge's label text.

## Breadcrumb

**Component:** `Breadcrumb` component set — node [`1091:548`](https://www.figma.com/design/3bTua8rojOOC7tYWIEWJl0/Code-Sync-UDS?node-id=1091-548)
**UDS reference:** `localhost:5173/docs/components/breadcrumb` ("Navigation path" example), [src/components/ui/breadcrumb.tsx](../../src/components/ui/breadcrumb.tsx)

- 2026-07-16 — Added 5 boolean component properties (`Icon 1`–`Icon 5`, default `false`) and 5 matching instance-swap properties (`Icon 1 Instance`–`Icon 5 Instance`), one pair per label position, to the `Breadcrumb` component set (variant axis `Levels` = 2/3/4/5).
- 2026-07-16 — Wrapped every existing `Label N` text node (14 occurrences total across the 4 `Levels` variants) in a new auto-layout "Item N" frame with a leading 16×16 icon instance, matching the `gap-1` icon-to-label spacing used in the UDS `BreadcrumbItem`/`BreadcrumbLink` styles (outer 8px gap between items/separators unchanged).
- 2026-07-16 — Defaulted every icon to the Iconography library's `Default` component, `Weight=Bold` (same default used for Badge), and recolored each icon to match its own label's text fill so icon color tracks per-label styling (e.g. bold black on the current-page label vs. secondary gray on link labels).

**Net current state:** each of the 5 possible breadcrumb positions (across all `Levels` variants) has an independent, hidden-by-default leading icon that designers can toggle on via `Icon 1`–`Icon 5`, swap via the matching `Icon N Instance` property, and which always renders in the same color as that position's label text.

## DotStatus

**Component:** `DotStatus` component set — node [`1813:4697`](https://www.figma.com/design/3bTua8rojOOC7tYWIEWJl0/Code-Sync-UDS?node-id=1813-4697)
**UDS reference:** `localhost:5173/docs/components/dot-status` ("Sizes" example), [src/components/ui/dot-status.tsx](../../src/components/ui/dot-status.tsx)

- 2026-07-16 — Added a `Size` variant axis (`Small`/`Medium`/`Large`, matching `DOT_STATUS_SIZES` in code) to the `DotStatus` component set. Renamed the existing 30 variants (15 `Variant` colors × `Outline` true/false) to `Size=Medium, ...` to seed the axis without changing their appearance.
- 2026-07-16 — Cloned all 30 Medium variants into `Size=Small` (8×8, matching `size-2`) and `Size=Large` (12×12, matching `size-3`) counterparts — 60 new variants, 90 total. The 2px outline stroke width was kept constant across all sizes (unscaled), matching the code's fixed `border-2` regardless of `size`.
- 2026-07-16 — Note: Figma's own component-set grid layout re-arranged all 90 variants automatically (2 columns for `Outline`, 45 rows for `Size`×`Variant`) and overrode manually-specified positions — left as-is since the result is correct and tidy, just not the custom side-by-side size blocks originally attempted.

**Net current state:** `DotStatus` now has `Small`/`Medium`/`Large` size variants (default remains `Medium`), and every size retains full `Variant` (15 colors) × `Outline` (true/false) coverage, consistent with the UDS codebase's `size`, `variant`, and `outline` props.

## DropdownMenu (new)

**Component:** new `DropdownMenu` component — node [`2712:34`](https://www.figma.com/design/3bTua8rojOOC7tYWIEWJl0/Code-Sync-UDS?node-id=2712-34)
**UDS reference:** `localhost:5173/docs/components/dropdown-menu` (the "Dropdown" example — `Account` trigger + `My account` section), [src/components/ui/dropdown-menu.tsx](../../src/components/ui/dropdown-menu.tsx)

- 2026-07-16 — Built `DropdownMenu` from scratch (didn't exist in Figma before — the `ai/figma-component-manifest.json` entry pointing at node `1827:4726` was stale/aspirational and no longer resolves). Root is a `VERTICAL` auto-layout component hugging its content: an Outline/Small `Button` instance (trigger, labeled "Account") + a `Content` panel below it.
- 2026-07-16 — Reused existing shared atoms rather than inventing new chrome: the `Button` component (`554:268`, Outline/Small) for the trigger, and ContextMenu's shared row parts — `.context-menu-item` (`1669:4570`), `.context-menu-label` (`1670:4547`), `.context-menu-separator` (`1670:4554`) — for the menu rows, matching the same popover panel styling (white fill + 1px border token + 8px radius) already established on `ContextMenu`'s `Content` slot.
- 2026-07-16 — Made the option count variable via a native Figma **SLOT** (`Content`), the same mechanism `ContextMenu` already uses for its content — not a bounded set of boolean toggles. Pre-populated the slot with the UDS reference's default content (`My account` label, separator, `Profile`/`Billing`/`Sign out` items), but any instance can freely add, remove, or reorder `.context-menu-item`/`.context-menu-label`/`.context-menu-separator` instances.
- 2026-07-16 — Verified on a test instance: appended an extra separator + a `Type=Destructive` item ("Delete account") directly in the slot — panel auto-resized to fit all 6 rows with correct destructive styling, no clipping.
- 2026-07-16 — **Fix:** initial creation landed on the wrong page ("Documentation", a stray top-level node) because the script never switched Figma's current-page context before creating nodes. Moved it to the correct page ("UDS Components") inside the shared `Components` frame, inserted immediately after `ContextMenu` (same node ID `2712:34` throughout — only its parent/position changed).
- 2026-07-16 — **Fix 2:** the team had already dropped a placeholder frame ("Frame 1618873494", a text label reading "Dropdown Menu") marking the intended alphabetical slot in `Components` — between `Drawer` and `Empty`. Moved `DropdownMenu` into that exact slot and deleted the now-redundant placeholder. Re-verified with a screenshot post-move.
- 2026-07-16 — Removed the `Trigger` (Outline/Small `Button` instance, "Account") per request — the component now exposes only the `Content` menu panel, not the trigger button. Root resized down to 192×145 accordingly.

**Net current state:** Sits alphabetically between `Drawer` and `Empty` inside the `Components` frame on the "UDS Components" page. `DropdownMenu` is now just the `Content` menu panel (no trigger button) whose row count is fully variable per-instance via the `Content` slot, built entirely from existing UDS atoms (`.context-menu-item`, `.context-menu-label`, `.context-menu-separator`).

## Field

**Component:** `Field` component set — node [`1857:5033`](https://www.figma.com/design/3bTua8rojOOC7tYWIEWJl0/Code-Sync-UDS?node-id=1857-5033)
**UDS reference:** `localhost:5173/docs/components/field`, [src/components/ui/field.tsx](../../src/components/ui/field.tsx) (`FieldDescription`/`FieldError`)

- 2026-07-16 — Added a `Show Hint` boolean component property (default `true`) to the `Field` component set (`Appearance` = Vertical/Horizontal × `State` = Default/Error, 4 variants total). The set already had a `Hint` TEXT property for the hint's *content*; this adds independent control over its *visibility* without touching that binding.
- 2026-07-16 — Bound `Show Hint` to the hint text node's visibility in all 4 variants (`Field description` in Vertical/Default, Horizontal/Default, and Horizontal/Error; `Field error` in Vertical/Error — pre-existing naming is inconsistent between those two but functionally identical), preserving each node's existing `characters` binding to the `Hint` text property alongside the new `visible` binding.
- 2026-07-16 — Verified by toggling `Show Hint` off across all 4 combinations — hint cleanly disappears in each, both default (gray) and error (red) coloring; master variants (756px wide) unaffected by test instances.

**Net current state:** every `Field` variant has an independently toggleable hint — `Show Hint` (boolean, default `true`) controls visibility, `Hint` (text) still controls its content, matching the UDS codebase's optional `FieldDescription`/`FieldError` usage.

## FileUploadCards

**Component:** `FileUploadCards` component set — node [`1888:5350`](https://www.figma.com/design/3bTua8rojOOC7tYWIEWJl0/Code-Sync-UDS?node-id=1888-5350)

- 2026-07-16 — Fixed a duplicate-property bug: the properties panel showed 3 separate `Actions` SLOT properties (`Actions#1866:12`, `Actions#1866:15`, `Actions#1866:18`), left over from slots being created independently per-variant instead of shared. Only `Actions#1866:18` was actually referenced by any node (across `Default`/`Uploading`/`Error`); the other two were orphaned definitions with zero bindings.
- 2026-07-16 — Deleted the two orphaned `Actions` properties, leaving a single shared `Actions` slot property. Verified all 4 variants (`Default`, `Uploading`, `Error`, `Disabled`) render unchanged. `Disabled` legitimately has no `Actions` slot at all (no interactive buttons by design), so it was never part of the duplication.

**Net current state:** `FileUploadCards` has exactly one `Actions` slot property, shared correctly across the variants that use it.

## Input

**Component:** `Input` component set — node [`589:236`](https://www.figma.com/design/3bTua8rojOOC7tYWIEWJl0/Code-Sync-UDS?node-id=589-236)
**UDS reference:** `localhost:5173/docs/components/input` ("With icons (leading, trailing, compact)" example), [src/components/ui/input.tsx](../../src/components/ui/input.tsx), [src/components/ui/input-group.tsx](../../src/components/ui/input-group.tsx)

- 2026-07-16 — Added `Leading Icon`/`Trailing Icon` boolean properties (default `false`) and matching `Leading Icon Instance`/`Trailing Icon Instance` instance-swap properties (default: Iconography `Default`, `Weight=Bold`) to the `Input` component set (`Size`=Compact/Default × `State`=Default/Focused/Error/Disabled × `Content`=Placeholder/Filled, 16 variants total).
- 2026-07-16 — Wired a 16×16 icon instance into every variant — leading icon inserted as the first row child, trailing as the last — with an 8px gap so the placeholder/value text (which fills the remaining width) reflows automatically around whichever icons are toggled on. Left icon color at its own default rather than matching text (unlike Badge/Breadcrumb): input icons are neutral affordances (search/mail/user), not colored alongside semantic text.
- 2026-07-16 — Verified across `Default` and `Compact` sizes with leading-only, trailing-only, both, and neither — correct reflow and spacing in all cases, no clipping, baseline (no icons) unchanged.

**Net current state:** every `Input` variant (all 16, both sizes) has independently toggleable leading and trailing icons via `Leading Icon`/`Trailing Icon`, swappable via the matching `...Instance` properties — matching the UDS reference's leading/trailing/compact icon patterns.

## PhoneInput (new)

**Component:** new `PhoneInput` component set — sits between `PasswordInput` and `InputGroup` in the `Components` frame, "UDS Components" page
**UDS reference:** `localhost:5173/docs/components/phone-input`, [src/components/ui/phone-input.tsx](../../src/components/ui/phone-input.tsx)

- 2026-07-16 — Replaced a placeholder frame ("Frame 1618873500", text reading "Phone Input") with a real component. `PhoneInput` in code is a thin wrapper around `Input` (digit-only formatting, `(XXX) XXX-XXXX` mask, `type="tel"`) with no styling of its own, so built it by cloning `Input`'s Default-size variants rather than starting from scratch.
- 2026-07-16 — Cloned `Input`'s `Size=Default, State={Default,Focused,Error,Disabled}, Content=Placeholder` variants (4), stripped the leading/trailing icon instances and hidden `Value` node (not used by the single documented example), replaced the placeholder text with the phone-formatted `(555) 123-4567`, and registered it as an editable `Placeholder` TEXT property. Combined into a new `State`-only variant set (`Default`/`Focused`/`Error`/`Disabled`) — covers all 4 states per the request.
- 2026-07-16 — **Fix:** cloned variants briefly inherited a `FILL`-width auto-layout sizing from being staged inside the `Components` frame (itself a vertical auto-layout), stretching each to ~61,438px wide before being combined into the set. Caught it via the set's reported size, reset each variant back to 444×44, and re-laid-out the row.
- 2026-07-16 — Verified all 4 states render correctly: default border, focused ring, error border, and disabled (reduced opacity/muted background) — all showing the phone-formatted placeholder.

**Net current state:** `PhoneInput` is a new component with `Default`/`Focused`/`Error`/`Disabled` states, visually identical to `Input` (Default size) but with phone-formatted placeholder content, positioned correctly in the `Components` frame.

- 2026-07-16 — **Follow-up (full parity request):** the initial 4-variant, `State`-only build was inconsistent with `Input`'s full property surface (`Size`, `Content`, `Leading Icon`/`Trailing Icon`). Rebuilt `PhoneInput` from scratch by cloning all 16 `Input` variants (`Size`=Compact/Default × `State`=Default/Focused/Error/Disabled × `Content`=Placeholder/Filled), keeping their icon instances and `Value` node intact this time, replacing text with phone-formatted content (`Placeholder`: `(555) 123-4567`, `Value`: `(212) 555-0147`), and re-registering `Placeholder`, `Value`, `Leading Icon`, `Leading Icon Instance`, `Trailing Icon`, `Trailing Icon Instance` properties with names matching `Input` exactly. Reused `Input`'s own variant grid coordinates so the layout mirrors it too.
- 2026-07-16 — **Fix:** hit the same wrong-page bug as the original build — the scratch frame used to stage clones landed on the wrong page (`figma.currentPage` resets per script; never called `setCurrentPageAsync`) before `combineAsVariants` was attempted, which failed with "Grouped nodes must be in the same page as the parent." Fixed by moving the scratch frame onto the correct page ("UDS Components") before combining, avoiding the earlier FILL-stretch bug by using a plain (non-auto-layout) scratch frame instead of the `Components` frame directly.
- 2026-07-16 — Verified across Compact/Default, Placeholder/Filled, error/disabled states, and leading/trailing icon combinations — all render correctly with phone-formatted text and correct styling per state.

**Net current state (updated):** `PhoneInput` now fully mirrors `Input`'s property surface — same `Size`/`State`/`Content` variants (16 total) and the same `Leading Icon`/`Trailing Icon` toggle properties — differing only in its phone-formatted default text content.

## Input vs. InputGroup comparison + fixes

**Components:** `Input` ([`589:236`](https://www.figma.com/design/3bTua8rojOOC7tYWIEWJl0/Code-Sync-UDS?node-id=589-236)), `InputGroup` (`2291:5885`), `PhoneInput` (`2725:6409`)

- 2026-07-16 — Compared `Input` and `InputGroup` structure/styling/properties at the user's request. Findings: (1) structural difference is intentional/correct — `Input` is a flat row, `InputGroup` nests addons as **slots** (`Start addon`/`End addon`) supporting arbitrary content, vs. `Input`'s icon-only `Leading/Trailing Icon Instance` swap properties — left as-is per instruction; (2) `Size` variant naming was inconsistent — `Input` used `Compact`/`Default`, `InputGroup` used `Small`/`Default` for the same underlying sizes (36px/44px); (3) **bug**: `Input`'s `State=Error` variants had their stroke bound to the same neutral gray token (`VariableID:457:2`) as `State=Default` — no red indication at all, unlike `InputGroup`'s correct red-bound error stroke (`VariableID:522:3`).
- 2026-07-16 — Renamed `InputGroup`'s 8 `Size=Small` variants to `Size=Compact` to match `Input`'s naming.
- 2026-07-16 — Fixed the `State=Error` stroke on all 4 `Input` variants (and, for consistency, all 4 `PhoneInput` variants that inherited the same bug via cloning) to bind to `InputGroup`'s red token (`VariableID:522:3`) instead of the neutral gray one. Verified visually — error state now shows a clear red border.

**Net current state:** `Input`, `InputGroup`, and `PhoneInput` all use `Compact`/`Default` for their `Size` axis, and all three correctly show a red border in their `State=Error` variants.

## Medallion

**Component:** `Medallion` component set — node [`1847:5417`](https://www.figma.com/design/3bTua8rojOOC7tYWIEWJl0/Code-Sync-UDS?node-id=1847-5417)
**UDS reference:** `localhost:5173/docs/components/medallion`, [src/components/ui/medallion.tsx](../../src/components/ui/medallion.tsx) (`MedallionShape = 'circle' | 'square' | 'rounded'`)

- 2026-07-16 — Added a `Shape` variant axis (`Circle`/`Square`/`Rounded`, matching code's `MedallionShape`) to the `Medallion` component set (`Size`=Extra Small/Small/Default/Large/Extra Large × `Color`=18 hues × `Tone`=Pastel/Solid — 180 combinations). Renamed the existing 180 variants to `Shape=Circle` (`cornerRadius: 9999`, unchanged appearance) to seed the axis.
- 2026-07-16 — Cloned all 180 Circle variants into `Shape=Square` (`cornerRadius: 0`) and `Shape=Rounded` (`cornerRadius: 12`, a fixed pixel value regardless of size — matching code's `rounded-[12px]`, not a proportional radius) — 360 new variants, 540 total.
- 2026-07-16 — Verified across Default (40px) and Extra Large (64px) sizes in two colors/tones — Circle fully round, Square sharp-cornered, Rounded distinctly "rounded-square" at larger sizes (at Extra Small/24px, `Rounded` and `Circle` look identical since 12px already equals full radius at that size — matches code exactly, not a bug).

**Net current state:** `Medallion` now has `Circle`/`Square`/`Rounded` shape variants (default remains `Circle`) across all 180 Size × Color × Tone combinations — 540 variants total.

## Progress

**Component:** `Progress` component set — node [`623:227`](https://www.figma.com/design/3bTua8rojOOC7tYWIEWJl0/Code-Sync-UDS?node-id=623-227)
**UDS reference:** `localhost:5173/docs/components/progress` (examples 2–4: "With percent at end", "Value in tooltip (hover bar)", "Value in tooltip (info trigger)"), [src/components/ui/progress.tsx](../../src/components/ui/progress.tsx)

- 2026-07-16 — Added a `Percentage Placement` variant axis (`None`/`Left`/`Right`/`Below Left`/`Below Right`) to `Progress` (`Value`=0/50/100 — 15 variants total, up from 3). Renamed the existing 3 bars to `Percentage Placement=None` to seed the axis, then built the other 4 placements by wrapping a bar **instance** (not a clone — `Component`-in-`Component` nesting isn't allowed by the Plugin API, so instances were used to keep the new layouts linked to the base bar) in an auto-layout frame with a `{value}%` text node positioned left/right/below-left/below-right.
- 2026-07-16 — Built two new standalone components for the interactive patterns that can't be expressed as simple `Progress` variants: **`Progress (Hover Bar)`** (example 3 — bar + circular handle at the fill edge + a tooltip bubble above it, illustrated at the `Value=50` position) and **`Progress (Tooltip)`** (example 4 — bar + an info-icon trigger to the right + a tooltip bubble reading "50% complete" anchored above the bar at the value position). Both positioned in the `Components` frame immediately after `Progress`.
- 2026-07-16 — Note: the tooltip bubbles in both new components use hand-built styling (dark `#171719`-ish fill, white text, 4px radius, rotated-square arrow) matching `TooltipContent`'s default `theme` variant in code, but **not bound to any Figma variable** — the base `Tooltip` component itself isn't built in Figma yet (still a placeholder, out of scope for this request), so there was no token to bind to.
- 2026-07-16 — **Fix:** the 12 new `Percentage Placement` variants were all created at `(0,0)`, stacking directly on top of each other and on top of the original bars — Figma's component-set auto-arrange (which handled this automatically for earlier clone-based additions like `DotStatus`/`Medallion`) didn't kick in for these freshly-`createComponent()`'d, differently-structured variants. Manually laid out all 15 into a 3-column (`Value`) × 5-row (`Percentage Placement`) grid and resized the set to fit.
- 2026-07-16 — Verified all 15 `Progress` variants render correctly in the grid, and both new pattern components screenshot correctly (handle position and tooltip anchor both aligned precisely to the 50% fill edge).

**Net current state:** `Progress` supports optional percentage display via `Percentage Placement` (`None`/`Left`/`Right`/`Below Left`/`Below Right`), and two new reference components — `Progress (Hover Bar)` and `Progress (Tooltip)` — demonstrate the two interactive tooltip patterns from the UDS docs.

- 2026-07-16 — **Follow-up:** folded the two standalone `Progress (Hover Bar)`/`Progress (Tooltip)` components back into `Progress` itself, per request — one component instead of three. Extended `Percentage Placement` with two more values, `Hover Bar` and `Tooltip`, each built for all 3 `Value`s (0/50/100, not just the single Value=50 illustration the standalone versions had) — 6 new variants, 21 total. Each uses an instance of the (now-existing) `Tooltip` component rather than a hardcoded bubble.
- 2026-07-16 — Deleted both standalone components after confirming the new variants render correctly, including the 0%/100% edge cases (handle/tooltip at the very start or end of the track — no clipping despite `clipsContent: false`).

**Net current state (updated):** `Progress` is a single component set with 21 variants — `Percentage Placement` (`None`/`Left`/`Right`/`Below Left`/`Below Right`/`Hover Bar`/`Tooltip`) × `Value` (0/50/100) — no separate standalone components remain.

## Tooltip (new)

**Component:** new `Tooltip` component set — replaces the "Tooltip" placeholder frame in the `Components` frame, "UDS Components" page
**UDS reference:** [src/components/ui/tooltip.tsx](../../src/components/ui/tooltip.tsx) (`tooltipContentVariants`: `theme`/`black`/`white`)

- 2026-07-16 — Consolidated three separate tooltip-related things into one proper component: the pre-existing empty `Tooltip` placeholder, plus the two ad-hoc hardcoded tooltip bubbles built directly into `Progress (Hover Bar)` and `Progress (Tooltip)` in the prior session (noted at the time as "not bound to any Figma variable" since no real `Tooltip` component existed to match).
- 2026-07-16 — Built `Tooltip` as a proper variant set with a `Variant` axis matching code's 3 real style options: `Theme` (dark, default), `Black` (near-black), `White` (white with border) — each an auto-layout bubble (6px gap, 8px padding, 4px radius) with a shared `Label` TEXT property (default `"Tooltip"`) and a rotated-square arrow (`clipsContent: false` so the arrow can extend past the bubble's own rounded-rect bounds).
- 2026-07-16 — Replaced the ad-hoc bubble+arrow nodes in both `Progress (Hover Bar)` and `Progress (Tooltip)` with instances of `Tooltip` (`Variant=Theme`), setting `Label` to `"50%"` and `"50% complete"` respectively — same visual position and appearance as before, now backed by one shared component instead of duplicated one-off nodes.
- 2026-07-16 — Verified all 3 `Tooltip` variants render correctly (including the arrow, confirmed visible via a padded wrapper check), and both refactored `Progress` pattern components screenshot identically to their pre-refactor appearance.

**Net current state:** `Tooltip` is a new, reusable component with `Theme`/`Black`/`White` variants and an editable `Label`; `Progress (Hover Bar)` and `Progress (Tooltip)` both reference instances of it instead of embedding their own copies.

## ProgressCircle (new)

**Component:** new `ProgressCircle` component set — replaces the "Progress circles" placeholder frame, positioned right after `Progress` in the `Components` frame
**UDS reference:** `localhost:5173/docs/components/progress-circles`, [src/components/ui/progress-circles.tsx](../../src/components/ui/progress-circles.tsx)

- 2026-07-16 — Built `ProgressCircle` with 5 `Value` variants reproducing the two doc examples exactly: `24`, `68`, `100` (default 72px/8px stroke, labels `24%`/`68%`/`Done`) from "Radial progress set", and `35`, `72` (56px/6px and 80px/10px, labels `Week 1`/`Week 2`) from "Custom size + stroke" — each variant's internal size/stroke differs, which Figma variants support fine since only the `Value` axis needs to be distinct.
- 2026-07-16 — Construction note: initially built the arc as a **stroked** ellipse arc (`arcData` + `strokes`), which rendered as a solid pie wedge, not a ring — Figma strokes an arc's full wedge outline (including the two straight radius edges to center), which visually fills in for small-to-medium angles. Fixed by using the standard Figma technique instead: a **filled** donut shape via `arcData.innerRadius` (ratio = `1 - strokeWidth/radius`) with no stroke — matches a ring exactly.
- 2026-07-16 — Known gap: the arc ends are flat, not rounded — code uses `strokeLinecap="round"`, but replicating a rounded cap on a filled Figma donut arc isn't a native property (unlike stroke caps on a real stroke) and wasn't worth custom vector path math for this pass.
- 2026-07-16 — Registered a separate `Label N` TEXT property per variant (`Label 24`, `Label 68`, etc.) rather than one shared `Label` property — a shared property would have forced every variant to display the *same* default text (caught this via screenshot: the `Value=100` "Done" ring was showing "24%" as its default label before the fix).
- 2026-07-16 — **Fix:** hit the familiar wrong-page bug again — components were created via `figma.currentPage.appendChild(...)` without switching pages first, landing on "Documentation". Moved all 5 to the "UDS Components" page before combining into variants.
- 2026-07-16 — Track/arc/label colors (light gray track, accent-blue-500 arc, near-black label) are **not bound to Figma variables** — reused the same raw blue as the linear `Progress` bar fill for visual consistency, but didn't chase down exact token IDs for this pass.

**Net current state:** `ProgressCircle` has 5 preset variants (`Value`=24/68/35/72/100) matching the UDS docs' exact demo configurations, each with its own editable label text property.

- 2026-07-16 — **Follow-up:** made size a proper `Size` variant axis (`Small`/`Large`) applying to every `Value`, per request — previously only `Value=35` happened to be built small (56px/6px) while the rest were inconsistently "large" (`Value=72` was actually 80px/10px, not matching the other large variants' 72px/8px). Normalized `Value=72` to the canonical `Large` size (72px/8px, matching code's actual default), then cloned every value into whichever size it was missing — 10 variants total (`Size`×`Value` = 2×5), each with correctly recalculated `arcData.innerRadius` for its size/stroke combination.
- 2026-07-16 — Label property bindings carried over correctly through cloning — both sizes of the same `Value` share the same `Label N` property (e.g. both `Size=Small, Value=24` and `Size=Large, Value=24` are bound to `Label 24`), so editing one value's text updates both sizes consistently.
- 2026-07-16 — Verified all 10 variants — proportions, stroke thickness, and label text all consistent across both sizes for every value.

**Net current state (updated):** `ProgressCircle` has 10 variants — `Size` (`Small`/`Large`) × `Value` (24/68/100/35/72) — with the size axis now applying uniformly across every value.

- 2026-07-16 — **Follow-up:** removed the `Value=72` option (both sizes) and its now-orphaned `Label 72` property, per request — down to 8 variants (`Size`×`Value` = 2×4).
- 2026-07-16 — While removing `72`, noticed `Label 35`'s displayed text had regressed to `"35%"` instead of the intended `"Week 1"` (cause unclear — possibly disturbed by an earlier clone/resize pass) — fixed both the property default and the two variants' literal text back to `"Week 1"`.
- 2026-07-16 — Reordering the `Value` dropdown (24/68/100/35 → 24/35/68/100) turned out to need a real workaround: Figma's variant-option dropdown order is fixed at **first-introduction order** and is not reorderable via the Plugin API — reordering the component set's `children` array (which does change canvas/z-order) has **no effect** on the reported `variantOptions` order. Confirmed this with a disposable test component set before committing to a fix.
- 2026-07-16 — Fix: rebuilt `ProgressCircle` as a **fresh** component set — cloned all 8 variants, fed them to `combineAsVariants` in the desired sequence (`24, 35, 68, 100`, each `Large` then `Small`), and re-registered the `Label` properties on the new set (property keys aren't portable across a `combineAsVariants` rebuild, so these needed fresh registration + rebinding, not just copying). Deleted the old set afterward. Verified `Value.variantOptions` now reads `["24","35","68","100"]`, and the 8 variants render correctly in the new order.

**Net current state (updated again):** `ProgressCircle` has 8 variants — `Size` (`Small`/`Large`) × `Value` (`24`/`35`/`68`/`100`) — with `Value` now correctly ordered lowest to highest in the properties panel.

## SectionHeader (new)

**Component:** new `SectionHeader` component — replaces the "Section Header" placeholder frame, positioned between `SearchInput` and `Separator` in the `Components` frame
**UDS reference:** `localhost:5173/docs/components/section-header`, [src/components/ui/section-header.tsx](../../src/components/ui/section-header.tsx)

- 2026-07-16 — Built `SectionHeader` as a single component (not a variant set — the two doc examples differ only in whether actions are present, handled via a boolean rather than duplicating variants): `HORIZONTAL` auto-layout with `SPACE_BETWEEN` alignment and wrap enabled, containing a `Content` column (`Title`, 24px Semi Bold; `Description`, 16px Regular, 8px gap below title) and an `Actions` **slot** (matching `SectionHeaderActions`' ability to hold any number of action elements, not just one button) pre-populated with a `Button` instance (`Default`/`Small`, "Add assignment").
- 2026-07-16 — Registered `Title` and `Description` TEXT properties and a `Show Actions` boolean (default `true`) bound to the `Actions` slot's visibility.
- 2026-07-16 — Verified both doc examples: default (title/description/"Add assignment" button, space-between layout) and `Show Actions=false` with different title/description text ("Candidate pipeline") — button cleanly disappears, text updates correctly.
- 2026-07-16 — Title/description text colors are **not bound to Figma variables** (raw dark/gray approximating `--uds-text-primary`/`--uds-text-secondary`) — same gap noted for `Tooltip`/`ProgressCircle`, didn't chase down exact token IDs this pass.

**Net current state:** `SectionHeader` is a new component with editable `Title`/`Description` text and a toggleable, slot-based `Actions` area for one or more buttons.

## Sheet

**Component:** `Sheet` frame — node [`2746:7070`](https://www.figma.com/design/3bTua8rojOOC7tYWIEWJl0/Code-Sync-UDS?node-id=2746-7070)
**UDS reference:** `localhost:5173/docs/components/sheet` ("Edge sheet" example), [src/components/ui/sheet.tsx](../../src/components/ui/sheet.tsx), [src/components/ui/sheet-uds.tsx](../../src/components/ui/sheet-uds.tsx)

- 2026-07-16 — Found this frame already had content, but it was actually a mislabeled **`Drawer`** mockup (layers literally named "Drawer overlay"/"Drawer content", with a bottom-anchored panel and a mobile pull-`Handle` bar) — not a `Sheet` at all. `Sheet` (side panel, anchored right/left/top/bottom, no pull handle) and `Drawer` (bottom sheet with a handle) are visually distinct components in code; this frame needed real correction, not just filling a placeholder.
- 2026-07-16 — Removed the old bottom-anchored "Drawer content" (with its handle and a footer button not present in the actual `Sheet` doc example). Kept the existing overlay rectangle (already correctly bound to a 50%-black variable, `VariableID:460:35`, matching `bg-black/50`) and renamed it `Sheet overlay`.
- 2026-07-16 — Built a new `Sheet content` panel anchored to the **right edge**, full height, 448px wide (matching `sm:max-w-md`), white background, drop shadow, `p-6` padding, `gap-4` between sections — containing a `Header` (`Title`, 16px Semi Bold, "Candidate details"; `Description`, 14px Regular secondary gray, matching the exact copy from the doc's "Edge sheet" example) and an absolutely-positioned close icon button (top-right, `top-3 right-3`). No footer — the actual demoed example only has a header, unlike the `Drawer` mockup it replaced.
- 2026-07-16 — Verified visually: dark scrim overlay covers the viewport, white panel correctly anchored right with header content and close icon, matching the reference.

**Net current state:** `Sheet` now correctly shows a right-anchored panel with a dark overlay, header (title + description), and close button — no longer a mislabeled `Drawer` mockup.

## Skeleton

**Component:** `Skeleton` component set — node [`592:223`](https://www.figma.com/design/3bTua8rojOOC7tYWIEWJl0/Code-Sync-UDS?node-id=592-223)
**UDS reference:** `localhost:5173/docs/components/skeleton`, [src/components/ui/skeleton.tsx](../../src/components/ui/skeleton.tsx) (`rounded-md`)

- 2026-07-16 — Fixed corner radius on all 3 `Skeleton` variants (`Default`/`Small`/`Large`) from `4px` to `9.6px`. This project overrides Tailwind's radius scale (`src/styles/components.css`): `--radius: var(--uds-radius-12)` (12px) and `--radius-md: calc(var(--radius) * 0.8)` — so `rounded-md` here resolves to `9.6px`, not Tailwind's stock `6px` or the `4px` that was set.
- 2026-07-16 — Verified visually — all 3 sizes now show the correct, more pronounced rounding.

**Net current state:** `Skeleton`'s corner radius (`9.6px`) matches this project's actual `rounded-md` token value across all 3 sizes.

## Slider

**Component:** `Slider` component set — node [`626:229`](https://www.figma.com/design/3bTua8rojOOC7tYWIEWJl0/Code-Sync-UDS?node-id=626-229)
**UDS reference:** `localhost:5173/docs/components/slider` ("Single value", "Range (two thumbs)", "Stepped movement"), [src/components/ui/slider.tsx](../../src/components/ui/slider.tsx)

- 2026-07-16 — Added a `Type` variant axis (`Single`/`Range`/`Stepped`) crossed with the existing `Size` (`Default`/`Small`) — 6 variants total, up from 2. Renamed the existing 2 track/thumb variants to `Type=Single`.
- 2026-07-16 — Built `Range` (two thumbs) for both sizes at the doc's exact demo values (25%/75%) — cloned the single-thumb track, repositioned the existing thumb to the 25% mark, cloned it for a second thumb at 75%, and moved the fill segment to span *between* the two thumbs (not from the track start) with no corner radius — matching the CSS reality that `.slider-range` itself isn't rounded, only clipped by the track's `overflow-hidden rounded-full`.
- 2026-07-16 — Built `Stepped` for both sizes: a label row (`Level` muted-gray / `40` foreground, space-between) 12px above an instance of the matching `Single` track — matching the doc's exact `SliderSteppedDemo` structure and copy.
- 2026-07-16 — Verified all 6 variants render correctly: `Single`/`Range`/`Stepped` × `Default`/`Small`.

**Net current state:** `Slider` has 6 variants — `Type` (`Single`/`Range`/`Stepped`) × `Size` (`Default`/`Small`) — covering all 3 patterns demonstrated in the UDS docs.

## StatisticCard (new)

**Component:** new `StatisticCard` component — replaces the "Statistics" placeholder frame, positioned between `Spinner` and `Status` in the `Components` frame
**UDS reference:** `localhost:5173/docs/components/statistics`, [src/components/ui/statistics.tsx](../../src/components/ui/statistics.tsx)

- 2026-07-16 — Built a single `StatisticCard` (not the full `Statistics` grid — per request, one card only) with `Label` (14px Regular, secondary), `Value` (32px Semi Bold, primary, 8px gap below label), and an optional `Hint` (12px Regular, secondary, 8px gap below value) — matching the code's `p-4`/`rounded-[8px]` card exactly.
- 2026-07-16 — Card fill and border **are** bound to real Figma variables this time (`VariableID:460:47` / `VariableID:457:2`) — confirmed these are the same tokens already used for `Input`'s card-like surface, matching code's `--uds-surface-primary`/`--uds-border-primary` exactly. `Label`/`Value`/`Hint` text colors remain unbound raw approximations (same gap noted for other recent components).
- 2026-07-16 — Registered `Label`, `Value`, `Hint` TEXT properties and a `Show Hint` boolean (default `true`) bound to the hint's visibility, so the "additional content underneath" is a toggle rather than always shown.
- 2026-07-16 — Verified both the default card ("Total shifts" / "128" / "+12% from last month") and a toggled instance ("Fill rate" / "91%", `Show Hint=false`) — hint disappears cleanly, text updates correctly.

**Net current state:** `StatisticCard` is a new component with editable `Label`/`Value`/`Hint` text and a `Show Hint` toggle for the optional trailing content.

## Step (new)

**Component:** new `Step` component — replaces the "Steps" placeholder frame, positioned between `Status` and `Switch` in the `Components` frame
**UDS reference:** `localhost:5173/docs/components/steps`, [src/components/ui/steps.tsx](../../src/components/ui/steps.tsx) (`StepState = "upcoming" | "current" | "complete"`)

- 2026-07-16 — Built `Step` as a single step item (one circle marker + title + optional description) rather than the full `Steps` list, per request. Added a `Type` variant axis mapping code's 3 states to the requested names: `Done` (= `complete`: green marker, white checkmark using the Iconography `Check` icon, `Weight=Regular` to match Phosphor's default), `Default` (= `current`: blue border, blue-100 fill, blue-700 "2" index), `Disabled` (= `upcoming`: gray border/fill, secondary-gray "3" index) — each variant's marker content differs internally (checkmark vs. index number), matching code's conditional rendering.
- 2026-07-16 — Registered `Title`/`Description` TEXT properties and a `Show Description` boolean (default `true`) bound to the description's visibility, so the "optional content underneath" is a toggle.
- 2026-07-16 — Marker border/fill colors are hand-picked approximations of the accent tokens (`accent-green-600`, `accent-blue-500`/`-100`/`-700`, `border-primary`, `surface-secondary`) — not bound to Figma variables, same gap noted for other recent components. The `Check` icon itself **is** a real, correctly-sourced Iconography component (not the generic `Default` placeholder used elsewhere this session).
- 2026-07-16 — Verified all 3 types render correctly (checkmark/blue-2/gray-3 markers with matching title+description), and confirmed `Show Description=false` matches the doc's "Two-step compact flow" example exactly (title-only rows).

**Net current state:** `Step` has 3 `Type` variants (`Done`/`Default`/`Disabled`) each with editable `Title`/`Description` and a `Show Description` toggle for the optional secondary line.

## Tabs

**Component:** `Tabs` component set — node [`790:1022`](https://www.figma.com/design/3bTua8rojOOC7tYWIEWJl0/Code-Sync-UDS?node-id=790-1022)
**UDS reference:** `localhost:5173/docs/components/tabs` (example 4, "Vertical tabs"), [src/components/ui/tabs.tsx](../../src/components/ui/tabs.tsx)

- 2026-07-16 — Added `Vertical` to the `Appearance` axis (previously `Pill`/`Line` only), matching example 4's line-style vertical layout: right-side border on the list (`border-r`, replacing the horizontal variant's `border-b`) and a 2px vertical active-indicator bar on the right edge of the active trigger (replacing the horizontal underline) — mirrors code's `group-data-vertical` styles exactly.
- 2026-07-16 — Built all 20 combinations to match "the other two versions'" existing variable tab-count mechanism: `Tabs` (2–6) × `Active` (1..N) — same coverage `Pill`/`Line` already have. Did **not** extend the `Fill` axis to `Vertical` (only built `Fill=false`) since a vertical "fill" isn't demonstrated anywhere in the reference and has no obvious meaning for a vertical list.
- 2026-07-16 — Each vertical list variant reuses the exact per-trigger structure from the existing `Line` variants (24px/12px label padding, Semi Bold active text bound to the same active-color variable, Regular inactive text) — just re-oriented from a horizontal row to a vertical column with the indicator moved from bottom-underline to right-edge bar.
- 2026-07-16 — Note: Figma's own auto-arrange took over positioning for these 20 new variants (as it did for `DotStatus` earlier) — every attempt to lay them out in a custom grid got overridden into a single stacked column. Confirmed zero overlaps programmatically and left it as Figma's auto-arranged result rather than fighting it further.
- 2026-07-16 — Verified rendering for `Tabs=3, Active=1` and `Tabs=5, Active=3` — correct bold/blue active styling with right-edge indicator bar, gray inactive labels, right border on the list.

**Net current state:** `Tabs` now has 3 `Appearance` options (`Pill`/`Line`/`Vertical`), with `Vertical` supporting the same 2–6 configurable tab count as the two horizontal variants.

## Toast (new)

**Component:** new `Toast` component — replaces the "Toast" placeholder frame, positioned between `TimeStepInput` and `Toggle` in the `Components` frame
**UDS reference:** `localhost:5173/docs/components/sonner`, [src/components/ui/sonner.tsx](../../src/components/ui/sonner.tsx)

- 2026-07-16 — The reference doesn't have a static toast visual to copy (the doc example just triggers `toast.success('Profile saved')` from the `sonner` library at runtime) — built from the `Toaster` theming config instead: `4px` radius (`--uds-radius-4`), popover bg/border, 15px regular text for icon + message, 24px icon at `duotone` weight.
- 2026-07-16 — Built a `Type` variant axis (`Success`/`Info`/`Warning`/`Error`) matching the 4 non-loading icons `Toaster` configures, each using the real, correctly-sourced Iconography icon (`CheckCircle`/`Info`/`Warning`/`XCircle`, all `Weight=Duotone`) recolored to the matching semantic hue (green/blue/amber/red) — approximated the duotone two-tone effect by setting the background vector to 30% opacity and the foreground vector to 100%, same hue.
- 2026-07-16 — Registered per-type `Message N` TEXT properties (not one shared `Message`) — hit the exact same shared-property bug as `ProgressCircle`/other components this session (all 4 variants briefly showed the same default text after combining into a set) and fixed it the same way.
- 2026-07-16 — **Fix:** after correcting the per-type text, the 4 cards' widths grew to fit their (differing-length) messages, but the set's cached layout/bounding box was stale from before the fix, clipping the wider cards in screenshots. Recomputed each card's x-position from its actual current width and resized the set — confirmed all 4 render in full with no clipping.
- 2026-07-16 — Card fill/border are unbound raw colors (not matched to `--popover`/`--border` variables) — same gap noted for other recent components.

**Net current state:** `Toast` has 4 `Type` variants (`Success`/`Info`/`Warning`/`Error`), each with its own editable message text and a correctly-sourced, semantically-colored duotone icon.

- 2026-07-16 — **Follow-up:** set `minWidth: 356` on all 4 variants to match the reference's actual minimum width — found `TOAST_WIDTH = 356` hardcoded in `node_modules/sonner/dist/index.js` (used as the toast's `--width` CSS variable), since the doc/component source has no explicit min-width of its own. All 4 cards now hug their content but never go narrower than 356px.

**Net current state (updated):** `Toast` variants have a 356px minimum width matching sonner's `TOAST_WIDTH` constant, still hugging wider for longer messages.

## Toolbar (new)

**Component:** new `Toolbar` component — replaces the "Toolbar" placeholder frame, positioned between `TokenInput` and `Tooltip` in the `Components` frame
**UDS reference:** `localhost:5173/docs/components/toolbar` ("Action toolbar" example), [src/components/ui/toolbar.tsx](../../src/components/ui/toolbar.tsx)

- 2026-07-16 — Built `Toolbar` matching the doc's first example exactly: a bordered, rounded-8px container (`Button` group "Save"/"Share", both `Outline`/`Small`) + a 1px vertical divider (24px tall) + a second group with a single `Ghost`/`Small` "Export" button — using real `Button` component instances rather than static text, and binding the container's fill/border to the same `VariableID:460:47`/`VariableID:457:2` tokens already confirmed for `Input`/`StatisticCard`.
- 2026-07-16 — Verified visually — matches the reference layout, spacing (`gap-2`/`p-2`), and button groupings exactly.

**Net current state:** `Toolbar` is a new component with grouped `Button` instances and a divider, matching the UDS "Action toolbar" example, with fill/border correctly bound to real Figma variables.

- 2026-07-16 — **Follow-up:** converted both button groups (previously plain frames with a fixed 2-button/1-button split) into `Group 1`/`Group 2` **slots**, so either side of the divider can hold any number of buttons — matching `ToolbarGroup`'s actual flexible-children nature in code, same slot pattern used for `DropdownMenu`/`SectionHeader`. Added a `Show Divider` boolean (default `true`) bound to the divider's visibility.
- 2026-07-16 — Verified: `Show Divider=false` cleanly removes the divider, and adding an extra "Duplicate" button into `Group 1`'s slot correctly expands the toolbar (Save/Share/Duplicate + Export) with proper spacing and auto-resize.

**Net current state (updated):** `Toolbar` now has a toggleable `Show Divider` property and slot-based button groups on either side, supporting any number of buttons per side.

## Full token-compliance audit (all components)

**Scope:** every component in the `Components` frame, "UDS Components" page — both components built this session and pre-existing ones (user explicitly opted into the larger scope over just fixing this session's own gaps)
**Reference:** [Design-System–Components](https://www.figma.com/design/LkIyThUA0oVNsDEAyOF7ER/Design-System--Components) (the token/variable source referenced for this audit — turned out to have no separate browsable token page; the working file's own local variable collections (`CHG`, `Colors`, `Typography`, etc.) are what everything is actually bound against, and were used as the source of truth)

- 2026-07-16 — Audited all 98 top-level components for unbound fill/stroke colors and text nodes not using a text style or line-height variable. Found 43 components with issues: this session's own additions (`Tooltip`, `ProgressCircle`, `SectionHeader`, `Sheet`, `StatisticCard`, `Step`, `Toast`, `Toolbar`, `Slider`, `Progress`, `Breadcrumb` items) plus a large number of **pre-existing** components (`Tabs`: 450 text instances, `ButtonGroup`: 136, `Avatar`, `Alert Dialog`, `Dialog`, `Header`, `Link`, `Status`, `Text`, `Textarea`, `Toggle`, and several small `.table-cell`/`.calendar-day`/`.context-menu-item` internals).
- 2026-07-16 — Resolved the file's real token architecture: colors flow `Colors` (raw palette) → per-brand semantic collections (`CHG`, `Connect`, `Modio`, etc., each aliasing the raw palette) → `Brand` (a facade collection that aliases whichever brand is active). Typography's `uds/type/category/size` variables turned out to be **line-height** tokens (not font-size — font size is implied by the number in the name), and the file has 60 pre-built **text styles** (e.g. `Body/14/Medium`) that bundle family+size+line-height+weight together — applying the matching style, not hand-binding individual float properties, is the correct mechanism for "fonts connected to tokens."
- 2026-07-16 — Ran an automated matching pass across every component (excluding `Branding`, whose ~130 "unbound" fills are legitimate fixed brand-logo colors, and the still-unbuilt placeholder stub frames): resolved all 456 `CHG` color variables through their full alias chain to real RGBA, then bound any exact-matching (within a small tolerance) unbound fill/stroke to its semantic variable, and applied the matching text style to any text node whose `(fontSize, weight)` matched one of the 60 styles. Result: **66 colors auto-matched, 690 text nodes got a real text style applied** in the first pass.
- 2026-07-16 — Hand-resolved the remaining ~70 unmatched colors (values close to, but not exactly, a token — i.e. approximations I'd hand-picked earlier this session without pulling the real value): bound `uds/text/primary`/`uds/text/secondary` for the various Title/Description/Label/Value/Hint text across `SectionHeader`/`Sheet`/`Slider`/`StatisticCard`/`Step`/`ProgressCircle`; bound `Tooltip`'s `Theme` variant (and the now-redundant duplicate ad-hoc tooltip/arrow shapes inside `Progress`'s `Hover Bar`/`Tooltip` placement variants) to `uds/surface/inverse`; bound `Step`'s status colors and `Toast`'s icon colors to the actual `uds/color/accent/{green,blue,amber,red}/600` tokens (correcting my earlier hand-picked hues, which were close but not exact); bound `ProgressCircle`'s track stroke to `uds/surface/quaternary`; fixed a pre-existing `.context-menu-item` chevron icon to `uds/color/black`.
- 2026-07-16 — Fixed one real mistake this surfaced: `Slider`'s `Stepped, Size=Small` label used a non-standard `13px` (not one of the file's 15 standard type sizes) — changed to the standard `12px` and applied the matching `Body/12/Regular` style.
- 2026-07-16 — Deliberately left 3 things unbound, on purpose: `Tooltip`'s `Black` and `White` variants (code specifies raw non-UDS values — `bg-neutral-950`, a Tailwind gray, not a UDS token — for these, so forcing a UDS token would misrepresent the actual code), and a pre-existing `.table-cell` stroke that's a bright, saturated purple (`rgb(0.59, 0.28, 1.00)`) unlike anything in the border palette — flagging this one rather than guessing, since it looks like a leftover debug/placeholder color someone should look at directly.
- 2026-07-16 — Verified visually across `Tooltip`, `Toast`, `Step`, and `ProgressCircle` post-fix — all render correctly; some hues shifted slightly toward their exact token values (e.g. `Step`'s "Done" green is a touch more olive) but remain clearly legible and semantically correct.
- 2026-07-16 — Remaining known gaps (not fixed, all legitimate): 18 `Avatar`/`Header` "Initials" text nodes at dynamically-scaled sizes (11/13/17/22px) that don't correspond to any of the file's 15 standard type sizes, so no text style applies — this is a deliberate dynamic-scaling pattern, not a compliance gap.

**Net current state:** across all 98 components, fill/stroke colors and text styling are now bound to real UDS design tokens with the exception of 3 deliberately-unbound cases (documented above) and 18 dynamically-sized `Avatar`/`Header` initials with no matching standard size.

## Textarea

**Component:** `Textarea` component set — node [`620:229`](https://www.figma.com/design/3bTua8rojOOC7tYWIEWJl0/Code-Sync-UDS?node-id=620-229)
**UDS reference:** `localhost:5173/docs/components/textarea`, [src/components/ui/textarea.tsx](../../src/components/ui/textarea.tsx)

- 2026-07-16 — Found the real bug behind "no box/fill": all 4 `State` variants had their background fill's `visible` flag set to **`false`** — the fill was already correctly bound to `uds/surface/secondary`, it just never rendered. Also had no border at all (empty `strokes`), was `40px` tall instead of code's `min-h-16` (`64px`), used `14px` text instead of `text-uds-16` (`16px`), and padding was `[12,12,10,10]` instead of code's `px-3 py-2` (`[12,12,8,8]`).
- 2026-07-16 — Fixed all of the above per state: `Default`/`Focused`/`Error` use `uds/surface/secondary` background with `uds/border/primary`/`uds/border/(focus-blue)`/`uds/border/(destructive-red)` borders respectively (same border tokens already established for `Input`'s states); `Disabled` uses `uds/surface/disabled` background at `50%` opacity, matching `disabled:bg-[var(--uds-surface-disabled)] disabled:opacity-50`.
- 2026-07-16 — Text fixed to `16px` with the `Body/16/Regular` text style applied, and the placeholder color rebound from `uds/text/disabled` to the semantically-correct `uds/text/placeholder` (same RGB value, but the right token for what it actually represents).
- 2026-07-16 — Verified: zero unbound colors or missing text styles remain on this component, and all 4 states now show a proper visible box (fill + border) matching the reference.

**Net current state:** `Textarea` now renders a proper visible box per state (fill + border, correct height/padding/font size) and is fully token-compliant.
