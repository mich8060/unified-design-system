# Changelog

All notable changes to this project are documented in this file.

## Unreleased

### Fixed

- Moved runtime subpath exports to built `dist` artifacts (no `src/**` runtime exports), including `@mich8060/unified-design-system/UDS`.
- Added built subpath entry shims in `dist/entries/*` so existing component import paths continue to work without source/Sass resolution.
- Ensured `./tokens.css` export resolves to `./dist/tokens.css` (built artifact).
- Restored `UDS` to library runtime exports and ensured shell selectors are present in published CSS.
- Added typography baseline on `.uds--container` using design-system font tokens to prevent consumer fallback-font shell rendering.
- Added backward-compatible gray token aliases for consumers:
  - `--uds-color-gray-25` through `--uds-color-gray-1000`
  - Each alias resolves to the canonical `--uds-color-neutrals-*` token
- Fixed malformed animation duration values (`100msms` -> `100ms`, etc.) in generated token output.
- Included token declarations in the published `dist/styles.css` bundle so consumers importing only `styles.css` receive both canonical and alias token variables.

### Added

- Added automated token validation script: `scripts/validate-public-tokens.cjs`.
- Added runtime export validation script: `scripts/validate-runtime-exports.cjs`.
- Added post-build artifact generator: `scripts/postbuild-lib-artifacts.cjs`.
- Added Vite consumer fixture regression check: `scripts/verify-vite-consumer-fixture.cjs`.
- Added fixture app under `tests/fixtures/vite-consumer` that imports:
  - `import { Button } from "@mich8060/unified-design-system"`
  - `import UDS from "@mich8060/unified-design-system/UDS"`
  - `import "@mich8060/unified-design-system/styles.css"`
- Added CI workflow `.github/workflows/consumer-fixture.yml` to run build + consumer fixture verification.
- Validation now fails builds when:
  - Source-declared public tokens are missing in `dist/styles.css`
  - Gray alias tokens are missing
  - Malformed duration values (such as `msms`) are present

### Notes

- Canonical token naming remains `--uds-color-neutrals-*`.
- Gray aliases are deprecated compatibility shims and should not be used in new code.
