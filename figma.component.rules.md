# Rules for AI: Building UDS Components in Figma
## A. Sequencing & process
Never one-shot a component. Building a production component is 20–100+ sequential use_figma calls across phases. Break work into the smallest useful unit, validate, then proceed.
Foundations before components. Never create a component before the variables it binds to exist in Figma. If a token is missing, add it to the appropriate UDS collection first (or stop and ask).
Run use_figma calls strictly sequentially. Figma state mutations must never be parallelized, even if the tool allows it.
Set the current page at most once per call. One component (or one doc page) = one use_figma call. Don't loop over pages inside a mutating script.
Always load the skill first. Load figma-use (API syntax) and figma-generate-library (workflow) before any use_figma write call.
## B. Discovery & reuse (do this before creating)
Inspect before creating. Read the existing Figma file (pages, variables, components, naming) and match its conventions rather than imposing new ones.
Search before building. Run get_libraries then search_design_system for an existing component/variable/style. Priority: local existing → subscribed library import → create new. Reuse if the prop API and token model are compatible; wrap if visually right but API-incompatible; full rebuild only when the user explicitly says **replace from scratch** (see B.1).
Resolve code↔Figma conflicts by asking. If the codebase and Figma disagree on a value or structure, surface both and let the user decide — don't silently pick one.
## B.1 In-place updates — preserve instance references (mandatory)
When a **COMPONENT_SET** or **COMPONENT** already exists in the file, **update it in place**. Deleting and recreating breaks every **INSTANCE** that references it across the file and other files.
**Default for existing components:** patch only what changed — variant props, token bindings, auto-layout, child layers, component properties. Find the set by name via `get_metadata` / `search_design_system`; track node IDs from tool results; mutate those nodes. Never guess IDs.
**Never do for updates:** delete the existing set; run `figma-generate-component-build.mjs`, `figma-slim-build.mjs`, or generated `.tmp/figma-build/*.js` scripts that call `existing.remove()` or rebuild via `combineAsVariants` on a fresh component list; replace a set to “sync to code” unless the user asked to replace from scratch.
**Preferred update paths:** prop / variant axis renames → `figma-align-component-props.mjs --write`, then run `.tmp/figma-align-component-props.js` via `use_figma`; token binding fixes → bind variables on existing layers; new variant → add to the **existing** set (do not rebuild the full matrix); one-state visual tweak → edit that variant by node ID.
**Full delete-and-recreate is allowed only when:** the component does not exist yet (greenfield), or the user explicitly says **replace from scratch** / **OK to delete and rebuild**. Confirm before deleting.
**Before and after:** `get_metadata` + `get_screenshot` on the same component set; report that instance references were preserved (same set node ID).
## C. Token binding (UDS-specific)
Bind every visual property to a UDS variable — fills, strokes, padding, gap, corner radius, stroke weight, and sizing. No hardcoded hex, px spacing, radius, or border width in any component. **Mandatory detail: C.1 (layout) and C.2 (typography).**
Bind to the correct collection:
Backgrounds/surfaces/borders → Colors / Semantic Colors (scopes FRAME_FILL, SHAPE_FILL, STROKE_COLOR).
Text fills → Semantic Colors with TEXT_FILL.
Spacing/gap → Layout (GAP); corner radius → Layout (CORNER_RADIUS); width/height → Layout (WIDTH_HEIGHT).
Shadows → Elevation effect styles; type → Font / Letter Spacing.
Prefer semantic over primitive. Bind components to Semantic Colors (which are mode-aware Light/Dark aliases), not raw Colors primitives. Never duplicate a raw value where an alias exists.
Light/Dark comes from modes, not variants. Don't create separate light/dark component variants; rely on the Semantic Colors collection's Light/Dark modes.
Brand is a mode swap, not a variant. Brand differences (CompHealth, Modio, Weatherby, LocumSmart, Connect, etc.) live in the Brand collection's modes — never bake brand-specific colors or per-brand variants into a component.
Respect code syntax. Each variable's WEB code syntax is var(--uds-…). When you add new tokens, set WEB syntax with the var() wrapper and the real CSS variable name; keep the path = CSS name minus --, dashes → slashes.
## C.1 Mandatory variable bindings (no raw numbers)
**Every spacing and stroke dimension must use a bound UDS variable — never a typed pixel value on the node.** This applies to new builds and in-place updates. If a binding is missing, fix it before checkpointing with the user.
| Property | Bind to | Layout / token examples |
|----------|---------|-------------------------|
| Auto-layout **padding** (top, right, bottom, left) | Layout **GAP** (per side or paired H/V) | `uds/gap/8`, `uds/gap/12`, `uds/spacing/*` |
| Auto-layout **item spacing** (gap between children) | Layout **GAP** | `uds/gap/4`, `uds/gap/8` |
| **Corner radius** (all four corners) | Layout **CORNER_RADIUS** | `uds/radius/4`, `uds/radius/8`, `uds/radius/12` (≤12px for rectangles) |
| **Stroke / border width** | Layout **WIDTH_HEIGHT** or border-width token | `uds/border/width/1`, `uds/border/width/2` |
| **Min/max width & height** (when fixed) | Layout **WIDTH_HEIGHT** | matching `uds/sizing/*` or container tokens |
**Do not leave:** manual padding fields, gap fields, radius fields, or stroke weight as detached numbers. **Do not** bind only some corners or some padding sides — bind every side that is non-zero, or use the same token on all sides when symmetric.
**Strokes:** bind stroke **color** to Semantic Colors (`STROKE_COLOR`) **and** stroke **weight** to a Layout variable when a border is visible.
## C.2 Typography — text styles + editable properties (mandatory)
**Every TEXT layer must use a local text style** from the file’s Typography / type scale (e.g. `Body/14/Regular`, `Body/16/Medium`, `Label/12/Medium`) — not ad-hoc font family, size, or weight on the node alone. Apply the style first, then bind text **fill** to a Semantic Color variable with **TEXT_FILL** scope (e.g. `uds/text/primary`).
**Designer-editable copy:** any label, placeholder, title, helper, or button text that should change per instance must be exposed as a **TEXT component property** on the **COMPONENT_SET**, linked to the text layer via `componentPropertyReferences` (same property name across all variants). Do not hardcode user-facing strings without a linked TEXT property unless the string is truly fixed chrome (e.g. a permanent “Required” marker defined in spec).
**Checklist per text layer:**
1. Local **text style** applied (`setTextStyleIdAsync` / style picker equivalent).
2. **Fill** bound to a semantic text color variable (not raw hex).
3. If copy is instance-editable → **TEXT** property on the set + reference on the layer in **every** variant.
**Nested instances:** when a child instance exposes text, map it to a parent TEXT property where the React API exposes `children` / `label` / `placeholder` — do not leave nested text only editable by detaching the instance.
## D. Component structure & variants
Auto-layout everything. Use auto-layout with variable-bound padding/gap so components resize correctly; avoid absolute positioning except for intentionally fixed geometry.
One component per page by default (related families like Input + Field may share a page with clear sections).
Model the same prop axes as the code. Mirror the React API: form components expose state = default | focused | error | disabled; size axes use xsmall | small | default | large where the component supports them.
Variant naming: Property=Value, Property=Value (e.g. Size=Default, State=Error). After combineAsVariants, manually grid-layout and resize — variants stack at (0,0) otherwise.
Cap the variant matrix. If Size × Style × State > ~30 combinations, split into a sub-component instead of exploding variants.
When create variants that either hide or show something please use true/false properties.
Component properties: use TEXT for labels, placeholders, titles, and any user-facing copy; BOOLEAN for optional slots; INSTANCE_SWAP for icons — **and link each property to its child node in every variant**. See C.2 for text-style + TEXT property requirements.
## E. Icons, radius & visual constraints
Icons via INSTANCE_SWAP, never a variant per icon. Icons are Phosphor glyphs; expose an instance-swap slot rather than enumerating icons as variants.
Honor the radius cap. Rounded rectangles (cards, inputs, panels, popovers) must not exceed 12px. Use rounded-full only for true circles/pills (avatars, dots, pill toggles). Bind radius to a Layout radius token ≤12px.
## F. Validate, checkpoint, name
Validate after every step. get_metadata after each create to confirm structure; get_screenshot after each component to confirm it looks right. Never build on unvalidated work.
Checkpoint with the user per component. Show a screenshot and the variant count; get explicit approval before moving to the next component. "Looks good" on Phase 1 is not approval for Phase 3.
Deterministic, unique names. Name nodes consistently so work is idempotent and resumable; track created node IDs from return values and never guess/hallucinate IDs from memory.
No destructive cleanup. Remove nodes only by returned IDs or a strict name convention you created — never by prefix-matching that could hit user-owned nodes.
## G. After build (optional but recommended)
Code Connect while context is fresh. Map each finished Figma component to its @chghealthcare/unified-design-system export so design-to-code stays in sync.
QA pass: audit contrast, focus visibility, touch targets; confirm no unresolved/hardcoded fills, strokes, or spacing remain. **Before sign-off, verify C.1 + C.2:** no raw padding/gap/radius/stroke-weight numbers; all text layers on local text styles with semantic fill variables; all editable copy wired to TEXT component properties on the set.
