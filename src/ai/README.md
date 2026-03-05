# UDS AI Workspace

This folder is the **authoring workspace** for Claude/Cursor AI generation, separate from runtime component code.

## What lives here

- `manifest/` — machine-readable generation contracts and constraints
- `discovery.json` — single machine-readable entrypoint index for all model integrations
- `schemas/` — JSON schema for generated artifacts
- `icons/` — machine-readable icon catalog and icon usage rules
- `figma-make.contract.json` — machine-readable Figma Make contract
- `figma-make.md` — Figma Make specific UDS-only generation contract
- `navigation/brand-menus.json` — canonical brand menu navigation contract
- `templates/` — layout starter templates with placeholders and constraints
- `prompts/` — reusable prompt templates for generation and repair flows
- `examples/` — curated valid/invalid generation examples for model guidance

## Model Discoverability (Start Here)

For any model/tooling integration, read in this order:

1. `@mich8060/unified-design-system/ai/discovery.json`
2. `@mich8060/unified-design-system/ai/manifest.json`
3. `@mich8060/unified-design-system/ai/schema`
4. `@mich8060/unified-design-system/ai/icons`
5. `@mich8060/unified-design-system/ai/figma-make.json`
6. `@mich8060/unified-design-system/ai/figma-make`
7. `@mich8060/unified-design-system/ai/prompts/figma-make`
8. `@mich8060/unified-design-system/ai/prompts/system`
9. `@mich8060/unified-design-system/ai/prompts/repair`
10. `@mich8060/unified-design-system/ai/prompts/starter`
11. `@mich8060/unified-design-system/ai/navigation`
12. `@mich8060/unified-design-system/ai/templates`
13. `@mich8060/unified-design-system/ai/examples`
14. `@mich8060/unified-design-system/ai/validation`
15. `@mich8060/unified-design-system/ai/sdk`

## Icon options for AI

Use `@mich8060/unified-design-system/ai/icons` for:

- Allowed icon naming format and normalization rules
- Recommended icon choices by UI intent
- Supported icon appearances and sizing defaults
- Component-specific icon usage examples (`Button`, `Icon`, `Status`, `Chip`)

## Layout templates

Use `@mich8060/unified-design-system/ai/templates` as starter structure for common screens.

- Template IDs:
  - `auth-form-card`
  - `dashboard-table-summary`
  - `settings-two-column`
  - `modal-confirmation`
  - `wizard-steps-form`
- Fill placeholder slot values (for example `{{title}}`, `{{primaryActionLabel}}`) before validation.

## Runtime helper SDK (small integration surface)

Use the SDK when you want one stable runtime entrypoint for validation + prop canonicalization.

```ts
import { createUDSRuntimeHelperSDK } from "@mich8060/unified-design-system/ai/sdk";

const sdk = createUDSRuntimeHelperSDK();
const normalized = sdk.canonicalizeProps("Button", { variant: "primary", kind: "soft" });
const result = sdk.validate(candidateOutput);
sdk.validateOrThrow(candidateOutput);
```

## Expected generation flow

1. Read `manifest/system.manifest.ts` + `manifest/components.manifest.ts`
2. Generate JSON only (no JSX source files)
3. Validate with:
   - `npm run ai:validate`
   - `npm run ai:enforce`
4. Write outputs to `ai-generated/`

## Contract requirements for generated JSON

Every generated screen JSON should include:

- `manifestVersion`
- `governanceVersion`
- `policyVersion`
- `tree`
- `audit`

Generation policy also requires:

- Never define custom CSS variables in output.
- Use only `--uds-*` variable references or hardcoded literal values.
- Never use deep imports like `@/.../components/*`; stick to package exports.
- Avoid non-UDS prop APIs (for example `Menu.items`, `Flex.vertical`, `Button.type`).

See `schemas/ai-output.schema.json` and `ai-generated/screens/template.screen.json`.

## Training examples

Use the governed training set exported from runtime AI examples:

- `src/design-system/ai/examples/training.examples.ts`
- validate with `npm run ai:validate:examples`
