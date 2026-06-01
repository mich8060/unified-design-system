# Rules for AI: Building UDS Components in Figma
## A. Sequencing & process
Never one-shot a component. Building a production component is 20–100+ sequential use_figma calls across phases. Break work into the smallest useful unit, validate, then proceed.
Foundations before components. Never create a component before the variables it binds to exist in Figma. If a token is missing, add it to the appropriate UDS collection first (or stop and ask).
Run use_figma calls strictly sequentially. Figma state mutations must never be parallelized, even if the tool allows it.
Set the current page at most once per call. One component (or one doc page) = one use_figma call. Don't loop over pages inside a mutating script.
Always load the skill first. Load figma-use (API syntax) and figma-generate-library (workflow) before any use_figma write call.
## B. Discovery & reuse (do this before creating)
Inspect before creating. Read the existing Figma file (pages, variables, components, naming) and match its conventions rather than imposing new ones.
Search before building. Run get_libraries then search_design_system for an existing component/variable/style. Priority: local existing → subscribed library import → create new. Reuse if the prop API and token model are compatible; wrap if visually right but API-incompatible; rebuild only if neither fits.
Resolve code↔Figma conflicts by asking. If the codebase and Figma disagree on a value or structure, surface both and let the user decide — don't silently pick one.
## C. Token binding (UDS-specific)
Bind every visual property to a UDS variable — fills, strokes, padding, gap, corner radius, and sizing. No hardcoded hex, px spacing, or radius in any component.
Bind to the correct collection:
Backgrounds/surfaces/borders → Colors / Semantic Colors (scopes FRAME_FILL, SHAPE_FILL, STROKE_COLOR).
Text fills → Semantic Colors with TEXT_FILL.
Spacing/gap → Layout (GAP); corner radius → Layout (CORNER_RADIUS); width/height → Layout (WIDTH_HEIGHT).
Shadows → Elevation effect styles; type → Font / Letter Spacing.
Prefer semantic over primitive. Bind components to Semantic Colors (which are mode-aware Light/Dark aliases), not raw Colors primitives. Never duplicate a raw value where an alias exists.
Light/Dark comes from modes, not variants. Don't create separate light/dark component variants; rely on the Semantic Colors collection's Light/Dark modes.
Brand is a mode swap, not a variant. Brand differences (CompHealth, Modio, Weatherby, LocumSmart, Connect, etc.) live in the Brand collection's modes — never bake brand-specific colors or per-brand variants into a component.
Respect code syntax. Each variable's WEB code syntax is var(--uds-…). When you add new tokens, set WEB syntax with the var() wrapper and the real CSS variable name; keep the path = CSS name minus --, dashes → slashes.
## D. Component structure & variants
Auto-layout everything. Use auto-layout with variable-bound padding/gap so components resize correctly; avoid absolute positioning except for intentionally fixed geometry.
One component per page by default (related families like Input + Field may share a page with clear sections).
Model the same prop axes as the code. Mirror the React API: form components expose state = default | focused | error | disabled; size axes use xsmall | small | default | large where the component supports them.
Variant naming: Property=Value, Property=Value (e.g. Size=Default, State=Error). After combineAsVariants, manually grid-layout and resize — variants stack at (0,0) otherwise.
Cap the variant matrix. If Size × Style × State > ~30 combinations, split into a sub-component instead of exploding variants.
Component properties: use TEXT for labels, BOOLEAN for optional slots, and INSTANCE_SWAP for icons — and link each property to its child node.
## E. Icons, radius & visual constraints
Icons via INSTANCE_SWAP, never a variant per icon. Icons are Phosphor glyphs; expose an instance-swap slot rather than enumerating icons as variants.
Honor the radius cap. Rounded rectangles (cards, inputs, panels, popovers) must not exceed 12px. Use rounded-full only for true circles/pills (avatars, dots, pill toggles). Bind radius to a Layout radius token ≤12px.
## F. Validate, checkpoint, name
Validate after every step. get_metadata after each create to confirm structure; get_screenshot after each component to confirm it looks right. Never build on unvalidated work.
Checkpoint with the user per component. Show a screenshot and the variant count; get explicit approval before moving to the next component. "Looks good" on Phase 1 is not approval for Phase 3.
Deterministic, unique names. Name nodes consistently so work is idempotent and resumable; track created node IDs from return values and never guess/hallucinate IDs from memory.
No destructive cleanup. Remove nodes only by returned IDs or a strict name convention you created — never by prefix-matching that could hit user-owned nodes.
## G. After build (optional but recommended)
Code Connect while context is fresh. Map each finished Figma component to its @chg-ds/unified-design-system export so design-to-code stays in sync.
QA pass: audit contrast, focus visibility, touch targets; confirm no unresolved/hardcoded fills, strokes, or spacing remain.