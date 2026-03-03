# UDS AI Workspace

This folder is the **authoring workspace** for Claude/Cursor AI generation, separate from runtime component code.

## What lives here

- `manifest/` — machine-readable generation contracts and constraints
- `schemas/` — JSON schema for generated artifacts
- `prompts/` — reusable prompt templates for generation and repair flows

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
