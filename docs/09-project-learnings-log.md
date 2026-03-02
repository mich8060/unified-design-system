# Project Learnings Log

Last updated: 2026-03-02

Purpose:
- Capture implementation learnings and constraints discovered while recreating the Candidate Profile experience with `@mich8060/unified-design-system`.
- Provide AI agents a persistent, practical checklist for future prompts in this project thread.

## Scope Notes

- Some items below are **global UDS integration rules** and apply broadly.
- Some items are **Candidate Profile-specific** and should only be applied when that screen/flow is in scope.
- If a future prompt conflicts with this log, prioritize:
  1) user instruction, then
  2) repository rules (`.cursorrules`, `CLAUDE.md`), then
  3) this log.

## Core Learnings (Chronological)

1. Source-of-truth alignment is non-negotiable.
- `@mich8060/unified-design-system` and `chghealthcare/unified-design-system` should drive component and token decisions.
- Figma should be mirrored, but implementation should move back toward UDS when conflicts arise.

2. Peer dependencies are required for correct UDS runtime behavior.
- `Menu` requires router context; `BrowserRouter` from `react-router-dom` must wrap the app.
- Icon rendering depends on `@phosphor-icons/react`.
- UDS styles must be imported via `@mich8060/unified-design-system/styles.css`.

3. Brand + theme context matters for visual parity.
- Candidate Profile target context: `brand="comphealth"` with `theme="light"`.
- Apply brand/theme at shell level (via `AppShell`) rather than piecemeal overrides.

4. Layout should favor UDS components before custom UI.
- Prefer `Steps`, `Button`, `Tag`, `Icon`, `Card`, `Flex`, etc. over bespoke primitives.

5. Figma-derived spacing/sizing must be tokenized.
- If Figma provides numeric spacing/radius/padding values, map to existing UDS tokens rather than hardcoded px values.

6. Spacing discipline was explicitly reinforced.
- Use UDS spacing tokens for layout rhythm.
- In existing project usage:
  - `gap` is frequently expressed via `--uds-gap-*`
  - `padding` via `--uds-spacing-*`

7. Progress card requirement was explicitly locked (Candidate Profile-specific).
- “You’re halfway there.” section needs explicit 16px internal padding, tokenized.

8. Figma API metadata is a verification aid.
- Node bounds/padding/fills help prevent guesswork and reduce visual drift.

9. Status chips in this screen are UDS `Tag` components (Candidate Profile-specific).
- “Presented” / “In Progress” should be `Tag` components and positioned top-right with token offsets when required.

10. Section background tones should map to nearest existing UDS tokens.
- Example mappings captured from Candidate Profile:
  - `#f3f4f6` -> `var(--uds-surface-tertiary)`
  - `#f9fafc` -> `var(--uds-surface-secondary)`
  - `#effdf7` -> `var(--uds-color-accent-emerald-25)`

11. API fidelity must be verified against actual exported types.
- Do not assume variant/size names from memory or external examples.
- Validate against component `*.types.ts` or package exports before implementation.

## Current Guardrails

- Prefer UDS components and UDS tokens over custom values/styles.
- Router provider must come from `react-router-dom` when `Menu` is present.
- Keep iconography in UDS `Icon`/Phosphor naming patterns (PascalCase icon names).
- Preserve CompHealth brand context for Candidate Profile work unless user changes direction.
- Treat status chips as UDS `Tag` where the design calls for status pills/chips.
- Validate fills/spacing against Figma, then map to closest existing UDS token.

## Learnings: Implementing the UDS Package

- Import contract:
  - Import styles once at app entry: `@mich8060/unified-design-system/styles.css`.
  - Missing this import causes major visual drift.

- Runtime dependencies:
  - `Menu` depends on `react-router-dom` router context.
  - `Icon` depends on `@phosphor-icons/react`.

- API fidelity:
  - Use exact prop names/values (example: `Button` uses `appearance`, not `variant`).
  - Prefer exported constants where available to avoid invalid values.

- Composition patterns:
  - `AppShell` should be composed with `AppShell.Menu`, `AppShell.Content`, and `AppShell.Main`.
  - Pass `brand`/`theme` at shell level.

- Styling/tokens:
  - Keep custom CSS minimal and token-driven.
  - Avoid raw hex/magic values in component SCSS.

## Update Protocol

For each new prompt/change in this thread:
- Add a new numbered learning when a new constraint/pattern is discovered.
- Update guardrails if a rule is added/changed.
- Refresh the `Last updated` date when edits are made.

