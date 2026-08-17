# GitHub Release body template

Copy into the GitHub Release description when publishing. Prefer promoting from [`CHANGELOG.md`](../CHANGELOG.md); do not publish from `NEXT_RELEASE_NOTES` alone.

Full process: [`docs/RELEASE_CHECKLIST.md`](../docs/RELEASE_CHECKLIST.md).

---

## @chghealthcare/unified-design-system `x.y.z`

### Changelog

See [`CHANGELOG.md`](../CHANGELOG.md) for the full section for this version.

<!-- Paste the promoted CHANGELOG section for this version below -->

### Breaking changes

<!-- Explicit list, or `none` -->

### Required team actions

<!-- What consumer apps must do, or `none` -->

### Before-and-after

```tsx
// Before

// After
```

### Deprecation timeline

<!-- What is deprecated and when it will be removed, or `none` -->

### Compatibility risks

<!-- Root barrel vs subpath, styles.css-only, Vitest, theme.css — or `none` -->

### Rollback approach

If this release misbehaves:

1. Pin the previous good version exactly in the consumer `package.json`.
2. Do not re-publish the same version; wait for a patch (`x.y.z+1`) with a fix or restored shims.
3. Critical: treat this Release as yanked / do not use until the patch ships.

### Migration / docs

- SemVer: [`docs/semver.md`](../docs/semver.md)
- Release process: [`docs/RELEASE_CHECKLIST.md`](../docs/RELEASE_CHECKLIST.md)
- Install / Packages: [`docs/github-packages.md`](../docs/github-packages.md)
<!-- Add MIGRATION-*.md links when applicable -->
