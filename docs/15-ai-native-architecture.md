# UDS AI-Native Architecture

This document defines a non-runtime AI metadata layer for `@mich8060/unified-design-system` so autonomous agents can generate high-quality UI with explicit constraints.

## Design Goals

- Keep component runtime behavior unchanged.
- Keep bundle impact near zero for normal UI consumers.
- Provide machine-readable metadata for components, flows, tokens, spacing, and anti-patterns.
- Support progressive rollout from partial metadata coverage to full design system coverage.

## Proposed Architecture

### 1) Runtime Layer (unchanged)

- Existing component runtime modules under `src/design-system/components/*`.
- Existing root API remains:
  - `import { Button } from "@mich8060/unified-design-system"`
  - `import Button from "@mich8060/unified-design-system/Button"`

### 2) AI Metadata Layer (new)

- New source folder: `src/design-system/ai/`
- Core files:
  - `manifest/system.manifest.ts` — root AI contract (`UDSManifest`)
  - `manifest/components.manifest.ts` — `ComponentRegistry` for all exported runtime components
  - `manifest/patterns.manifest.ts` — `PatternRegistry` with reusable screen flows
  - `manifest/layout.manifest.ts` — `LayoutRules` and composition constraints
  - `manifest/tokens.intent.manifest.ts` — `TokenIntentMap`
  - `validation/validateTree.ts` — deterministic validation utility
  - `examples/trees.example.ts` — valid/invalid example trees
  - `index.ts` — AI-facing exports.

### 3) Package Export Layer (new subpath)

- Add `./ai` and `./ai/*` in `package.json` `exports`.
- Keep AI metadata opt-in and separate from standard runtime imports.

## Root System Manifest

```ts
export const UDSManifest = {
  version: "0.2.12",
  tokenVersion: "1.0.0",
  components: ComponentRegistry,
  patterns: PatternRegistry,
  layout: LayoutRules,
  tokens: TokenIntentMap,
  governance: {
    maxPrimaryActionsPerSection: 1,
    spacingUnit: 4,
    defaultRadius: "--uds-radius-8",
  },
};
```

## Example Pattern Definition

```ts
{
  name: "AuthForm",
  layout: "vertical",
  requiredComponents: ["Card", "Field", "TextInput", "Button", "Text"],
  structure: [
    { type: "Card", role: "container" },
    { type: "Text", role: "heading", props: { variant: "heading-24" } },
    { type: "Field", role: "email-field" },
    { type: "TextInput", role: "email-input", props: { type: "email" } },
    { type: "Button", role: "primary-submit", props: { appearance: "primary" } },
  ],
  spacing: "--uds-spacing-16",
}
```

## Export Strategy

- ESM-first with CJS fallback:
  - `@mich8060/unified-design-system/ai` -> `dist/ai/index.js` (ESM), `dist/ai/index.cjs` (CJS)
  - `@mich8060/unified-design-system/ai/manifest` -> structured manifest layer
  - `@mich8060/unified-design-system/ai/validation` -> validator utilities
  - `@mich8060/unified-design-system/ai/examples` -> reference trees
- Tree-shakeability:
  - AI metadata is isolated to `./ai` subpath.
  - Runtime consumers importing components do not need to import `./ai`.
  - Agents can import granular metadata exports from `./ai`.

## Validation Utility

`validateTree(tree)` enforces:

- max primary actions per section
- allowed child composition mappings
- spacing token usage from allowed token list
- disallowed nesting rules

The utility returns a deterministic machine-readable payload:

```ts
{
  valid: boolean,
  errors: Array<{
    code: "MAX_PRIMARY_ACTIONS" | "INVALID_COMPOSITION" | "INVALID_SPACING_TOKEN" | "DISALLOWED_NESTING",
    path: string,
    message: string
  }>
}
```

## Migration Plan

### Phase 0 — Foundation (complete)

- Add typed AI schema and manifest.
- Add initial metadata coverage for high-impact components (`Button`, `Table`, `Field`, `Modal`).
- Add baseline patterns, token-intent map, layout rules, and anti-patterns.

### Phase 1 — Full Component Coverage

- Add metadata entries for every public component.
- Add required-prop and variant/state constraints from each `.spec.ts`.
- Add component-level accessibility checks.

### Phase 2 — Rule Quality and Validation

- Add CI validation for AI metadata integrity:
  - every manifest entry resolves to an exported metadata constant
  - token names used in metadata exist in token source
  - import paths in metadata resolve to real package subpaths

### Phase 3 — Agent Optimization

- Add goal-oriented pattern library (CRUD, table filtering, detail panels, modal confirmations).
- Add scoring hints (preferred composition choices, confidence tags).
- Add versioned deprecation hints per component and prop.

### Phase 4 — Governance

- Require metadata updates in PRs for component API changes.
- Version metadata (`metadataVersion`) independently from package version.
- Publish changelog section: “AI Metadata Changes”.

## Non-Goals

- No runtime component behavior changes.
- No additional client-side rendering logic.
- No required runtime dependency on AI metadata for component usage.
