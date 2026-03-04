# UDS AI Workspace

This folder is the **authoring workspace** for Claude/Cursor AI generation, separate from runtime component code.

## What lives here

- `manifest/` — machine-readable generation contracts and constraints
- `discovery.json` — single machine-readable entrypoint index for all model integrations
- `schemas/` — JSON schema for generated artifacts
- `prompts/` — reusable prompt templates for generation and repair flows
- `examples/` — curated valid/invalid generation examples for model guidance

## Model Discoverability (Start Here)

For any model/tooling integration, read in this order:

1. `@mich8060/unified-design-system/ai/discovery.json`
2. `@mich8060/unified-design-system/ai/manifest.json`
3. `@mich8060/unified-design-system/ai/schema`
4. `@mich8060/unified-design-system/ai/examples`
5. `@mich8060/unified-design-system/ai/validation`
6. `@mich8060/unified-design-system/ai/sdk`

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

See `schemas/ai-output.schema.json` and `ai-generated/screens/template.screen.json`.

## Training examples

Use the governed training set exported from runtime AI examples:

- `src/design-system/ai/examples/training.examples.ts`
- validate with `npm run ai:validate:examples`
