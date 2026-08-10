# Contributing to unified-design-system

This document covers working **in** this repository (building components, running checks,
publishing releases). If you're consuming the package in a product app, see
[`README.md`](./README.md), [`setup.md`](./setup.md), and [`AI_USAGE.md`](./AI_USAGE.md) instead.

## Prerequisites

Use **Node.js 22 LTS** (or **24+**). [`.nvmrc`](./.nvmrc) pins `22`; run `nvm use` (or `fnm use`)
in the repo root. If you use [Volta](https://volta.sh/), `package.json`'s `volta.node` field pins
the same version. Node 23 is not supported — `eslint-visitor-keys@5`'s `engines` field doesn't
list it, and `npm` will report `EBADENGINE`.

## Setup

```bash
npm install
npm run generate:ai   # regenerates ai/uds-contract.json and related artifacts from source
npm run dev           # docs site at http://localhost:5173
```

## Checks

Run these before opening a PR — CI ([`.github/workflows/ci.yml`](./.github/workflows/ci.yml)) runs
the same set on every push/PR to `main`:

```bash
npm run lint
npm run typecheck
npm run build:lib       # includes the subpath-exports check — see below
npm run test            # scripts + unit tests
npm run pack:check       # verifies npm-pack contents
npm run validate:ai      # UDS/Figma/design-language artifact consistency
```

## Adding or removing a public component

> **Short version:** if CI fails with *"Component subpath exports in sync"*, run
> `npm run generate:subpath-exports` and commit the files it changes. That's the whole fix — you
> don't need the rest of this section.

[`src/index.ts`](./src/index.ts) is the barrel — the single source of truth for the package's
public API. Every `export * from './components/ui/<name>'` line there is a public component.

Most of the time this is handled for you: while `npm run dev` is running, saving `src/index.ts`
regenerates the exports automatically, so the change is already in your working tree — just commit
it along with your component.

**Do not hand-edit `package.json#exports` or `vite.config.lib.ts`'s `subpathEntryModules`.** Both
are generated *from* the barrel by [`scripts/generate-subpath-exports.mjs`](./scripts/generate-subpath-exports.mjs),
so that every barrel component gets its own subpath import
(`@chghealthcare/unified-design-system/select`) without drifting out of sync with `src/index.ts`.
Manual edits to the generated blocks (including merge-conflict resolutions) tend to produce
duplicate or missing keys instead of what the generator would have written.

After adding, removing, or renaming a barrel export in `src/index.ts`:

```bash
npm run generate:subpath-exports
```

This rewrites the generated blocks in `package.json` and `vite.config.lib.ts` and leaves every
other key untouched (it's purely additive — see the script's header comment for why). Commit the
result alongside your `src/index.ts` change.

If you skip this step, `npm run build:lib` fails fast: it runs
`generate-subpath-exports.mjs --check` first and exits before touching the Vite build if the
generated blocks are out of date. It also runs `--verify-dist` at the end, after the build, to
confirm every `exports` target actually exists on disk. If you only touch a component's internals
without adding/removing a barrel export, no action is needed — the check only fires on a
`src/index.ts` change.

Background and design rationale: [`docs/component-subpath-exports.md`](./docs/component-subpath-exports.md)
and [`docs/github-packages.md`](./docs/github-packages.md#publishing-maintainers).

## Releasing (maintainers)

**Git:** push branches and tags to `https://github.com/chghealthcare/unified-design-system`
(remote `origin`).

1. Bump `version` in `package.json` and merge to `main`.
2. Ensure `npm ci`, `npm run build:lib`, and `npm run pack:check` pass locally (CI runs `build:lib`
   and `lint` on push/PR).
3. **Documentation snapshots** (latest only; no version switcher): created only on **minor** or
   **major** bumps, not every patch. Run `npm run build:docs` on minor/major releases and commit
   generated files under `src/docs/versions/`. Older snapshot folders are pruned. See
   [`docs/docs-version-snapshots.md`](./docs/docs-version-snapshots.md).
4. Create a GitHub **Release** for that version. That triggers:
   - **GitHub Packages** — [`.github/workflows/publish-github-packages.yml`](./.github/workflows/publish-github-packages.yml)
     publishes to `npm.pkg.github.com`
   - **npmjs** (optional) — [`.github/workflows/publish-npm.yml`](./.github/workflows/publish-npm.yml)
     if `NPM_TOKEN` is configured
5. Optionally build and pack a tarball from a clean checkout:

   ```bash
   npm run build:lib
   npm pack
   ```

   This writes `chghealthcare-unified-design-system-<version>.tgz`. `npm pack` runs
   `prepublishOnly` (`build:lib`) automatically.

See [`docs/github-packages.md`](./docs/github-packages.md) for PAT scopes, CI publish setup, and
manual publish commands.
