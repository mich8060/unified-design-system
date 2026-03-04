# AI CI Enforcement

This document describes the CI enforcement pipeline for governed AI output in UDS.

## Required AI Output Contract

All AI-generated files under `ai-generated/**` must be JSON and include:

- `manifestVersion`
- `governanceVersion`
- `policyVersion`
- `tree`
- `audit`

Example file: `ai-generated/metadata/sample-auth-form.json`.

## Enforcement Scripts

- `npm run ai:validate`
  - validates required structure
  - runs `validateAIOutput()`
  - fails on validation status `fail`
- `npm run ai:enforce`
  - drift guard for unknown components/tokens, inline styles, margin usage, hardcoded colors
- `npm run ai:token-diff`
  - detects raw color/hard spacing additions
  - blocks new token categories unless `ALLOW_NEW_TOKEN_CATEGORIES=true`
- `npm run ai:gate:contracts`
  - validates AI contract integrity and naming/version consistency
  - enforces required package AI subpath exports
  - ensures generated component API has no ambiguous prop collisions or leaked alias props
- `npm run ci:ai`
  - executes the full AI gate sequence

## GitHub Workflow

Workflow file: `.github/workflows/ai-validation.yml`

Behavior:

- Runs on pull requests that modify `ai-generated/**`.
- Builds package first so AI subpath imports resolve.
- Executes validation/enforcement scripts.
- Supports controlled override via `ai-override` label:
  - checks still run
  - requires at least two approvals
- uploads `ai-generated/metadata/` as CI artifact.

## Strict vs Non-Strict

- Strict mode (`UDSGovernance.enforcement.strictMode=true`)
  - any error returns `status: "fail"`
  - CI blocks merge
- Non-strict mode
  - warnings can be returned without blocking
  - policy consumers can choose additional handling

## Deterministic Governance Result

`validateAIOutput()` returns:

- `status`
- `violations`
- `warnings`
- `governanceVersionUsed`
- `manifestVersionUsed`
- `policyVersionUsed`
- `timestamp`
- `versionLineage` (`udsVersion`, `tokenVersion`, `manifestVersion`, `governanceVersion`, `policyVersion`)
