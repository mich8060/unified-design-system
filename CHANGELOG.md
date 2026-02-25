# Changelog

All notable changes to this project are documented in this file.

## Unreleased

### Fixed

- Added backward-compatible gray token aliases for consumers:
  - `--uds-color-gray-25` through `--uds-color-gray-1000`
  - Each alias resolves to the canonical `--uds-color-neutrals-*` token
- Fixed malformed animation duration values (`100msms` -> `100ms`, etc.) in generated token output.
- Included token declarations in the published `dist/styles.css` bundle so consumers importing only `styles.css` receive both canonical and alias token variables.

### Added

- Added automated token validation script: `scripts/validate-public-tokens.cjs`.
- Validation now fails builds when:
  - Source-declared public tokens are missing in `dist/styles.css`
  - Gray alias tokens are missing
  - Malformed duration values (such as `msms`) are present

### Notes

- Canonical token naming remains `--uds-color-neutrals-*`.
- Gray aliases are deprecated compatibility shims and should not be used in new code.
