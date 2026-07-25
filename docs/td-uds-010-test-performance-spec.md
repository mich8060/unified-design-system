# TD-UDS-010: subpath exports for the UDS barrel

A thin spec, not a full implementation plan — see `component-regression-testing.md` for the doc-style precedent (plan, not shipped code).

## Problem

Tracked in `modio/keystone` `docs/engineering/tech-debt.md` (2026-07-23 entry, "UDS barrel index forces eager loading of all components and transitive dependencies, crippling test performance"). The entry claims `dist/index.js` has 108 static top-level imports (every component + `recharts`, 65+ Phosphor icon wrappers, 33 `radix-ui` sub-packages, `cmdk`, `date-fns`, `react-day-picker`, `sonner`, `vaul`) — corroborated here: `grep -cE "^(import|export)" dist/index.js` counts 98, same order of magnitude. `package.json#exports` only exposes `.`, so any consumer import — even of a single leaf component — forces Vitest (or any bundler) to resolve and evaluate the entire graph. Static top-level imports execute before tree-shaking can help. (The tech-debt entry also asserts no `deps.optimizer`/`deps.inline` Vitest config can bypass this — that's the tech-debt author's tested claim, presented here as attributed, not independently re-verified.)

Reported in the tech-debt entry (not reproduced here — out of scope for a thin spec): module collection dominates test runtime in `keystone/apps/web` (4.25s of 7.8s for one file; ~345s cumulative across 27 files / 8 workers). Actual test execution is ~1s/file. The cost is paid per worker, so parallelism compounds it rather than mitigating it.

## Current state (already true today, verified in this repo)

- `vite.config.lib.ts` builds with `preserveModules: true`, so `dist/components/ui/*.{js,cjs,d.ts}` already exist as **individual files for every component** — the build already does the hard part.
- 10 of the 80 public components re-exported from `src/index.ts` already have `package.json#exports` subpaths: `chart`, `command`, `drawer`, `resizable`, `sonner`, `input-otp`, `calendar`, `date-input`, `date-range-input`, `menu` (plus `micro-calendar`, which is subpath-only and isn't in the barrel at all). These were hand-picked because they carry the heaviest transitive deps.
- Those 10 are also the only entries in `vite.config.lib.ts`'s `subpathEntryModules` array. The comment there explains why: they're pure re-export barrels (e.g. `chart.tsx` is just `export * from './chart-core'` / `./chart-theme` / `./chart-uds`), and Rollup elides trivial re-export files into their importer unless forced to keep them as a real entry point.
- The other 70 public components (`button`, `select`, `table`, `badge`, `dialog-uds`, etc.) have no `exports` subpath. The files exist in `dist/` already; they're just not reachable via Node's `exports` resolution, so `import { Select } from '@chghealthcare/unified-design-system/select'` fails even though `dist/components/ui/select.js` is sitting right there.

**The missing piece is exclusively the `package.json#exports` map (and possibly the vite entry list) — not the build output.**

**Fix mechanism verified against real build output** (not just hypothesized): heavy deps are `external` in `vite.config.lib.ts`, so if a leaf pulled one in it would show up as a bare `import … from 'recharts'` in the built file. Checked `dist/components/ui/{button,badge,select,checkbox}.js` directly — `button.js`/`badge.js` are completely clean of `recharts`/`vaul`/`cmdk`/`react-day-picker`/`sonner`/`uds-icons`/`@phosphor`; `select.js`/`checkbox.js` contain only the expected tree-shakeable named `@phosphor-icons/react` imports. Traced one local hop (`button.js` → `button-base.js`/`button-theme.js`): also clean. So subpath imports genuinely shed the heavy deps today, for components that already exist in `dist/` — this isn't contingent on the spike below, it's already true.

## Goal

Every component re-exported from `src/index.ts` gets its own `exports` subpath, so a consumer can import just what it uses (e.g. `@chghealthcare/unified-design-system/select`) and skip the rest of the dependency graph — `recharts`, `vaul`, `cmdk`, the full Phosphor set, etc. — when it doesn't need them.

## Non-goals

- Migrating `keystone/apps/web`'s actual imports to the new subpaths. Separate follow-up, owned by the consumer repo, once this ships and is released.
- Splitting `uds-icons.tsx` into per-icon subpaths. Verified: of 109 files in `src/components/ui`, only **1** (`event-card.tsx`) imports from the fat `uds-icons.tsx` wrapper; 38 others import named icons directly from `@phosphor-icons/react` (e.g. `import { CaretDownIcon } from "@phosphor-icons/react"` in `select.tsx`, `accordion.tsx`, `checkbox.tsx`, `dialog-uds.tsx`), which is a normal tree-shakeable named import, not a re-export barrel — so subpathing those components does *not* drag in the other 64 icons. `event-card.tsx` is the one known exception: its subpath will still carry the full `uds-icons.tsx` wrapper cost until that component (or the wrapper) is addressed. Call this out as a known, contained exception rather than blocking the rest of the rollout on it.
- Restructuring or removing the `.` barrel. It stays as-is — this is purely additive, no breaking change.
- Any change to component runtime behavior or public prop APIs.

## Proposed approach

1. Add a small generator (`scripts/generate-subpath-exports.mjs`) that parses `src/index.ts` for every `export * from './components/ui/<name>'` line and treats that as the single source of truth for the subpath list, so `package.json` can't silently drift from the barrel as components are added or removed.
2. Spike first, generate second: before generating all 70, manually add 3–4 non-barrel components (a plain leaf like `badge.tsx`, and a re-export barrel like `combobox.tsx` → `combobox-base`/`combobox-uds`) to both `vite.config.lib.ts`'s `subpathEntryModules` and `package.json#exports`, rebuild, and confirm both resolve *and* that the built output's import statements are clean (per the verification above — this is a smaller spike now since the plain-leaf case is already confirmed; the remaining open question is narrower: only whether a `combobox`-style re-export barrel needs the explicit Rollup entry to avoid elision, mirroring why the existing 10 needed it).
3. Feed the generator's list into:
   - `vite.config.lib.ts` → `subpathEntryModules` (all 70, or only the re-export-barrel subset per step 2's finding).
   - `package.json#exports`, using the same `{ types, import, require }` shape as the existing 10 entries.
4. Wire the generator into `build:lib` or a CI check so a components/ui addition without a matching export fails the build instead of silently shipping unreachable.
5. `npm run build:lib && npm run pack:check` to confirm the tarball contains the new per-component `.js`/`.cjs`/`.d.ts` trios and nothing else regresses.

## Tasks

Phase-based breakdown of the approach above. `[P]` = safe to run in parallel with other `[P]` tasks in the same phase; unmarked tasks are sequential within their phase.

### Phase 0 — Spike (narrow: only the elision question is open)

The plain-leaf case (button/badge-style components) is already verified clean against real `dist/` output above — this phase only needs to settle whether a re-export-barrel-shaped component needs an explicit Rollup entry.

- [ ] **T001** Add `combobox` to `vite.config.lib.ts`'s `subpathEntryModules` and a matching `./combobox` entry in `package.json#exports` (mirror the `{ types, import, require }` shape of the existing 10).
- [ ] **T002** `npm run build:lib` and confirm `dist/components/ui/combobox.js` is a real module (not inlined into another chunk).
- [ ] **T003** `combobox.js` is itself a re-export barrel (`export * from './combobox-base'`/`'./combobox-uds'`) — the heavy/icon imports live in those files, not in `combobox.js`, so grepping `combobox.js` alone proves nothing (it'll come back clean regardless of whether elision happened). Follow the local hop, same as the `button` → `button-base` trace in "Current state": `grep -nE "recharts|vaul|cmdk|react-day-picker|sonner|uds-icons" dist/components/ui/combobox-base.js dist/components/ui/combobox-uds.js` — expect empty (or only expected named-icon imports, e.g. `combobox-base.js` importing `CaretDownIcon`/`CheckIcon` from `@phosphor-icons/react`).
- [ ] **T004** Record the finding: does a re-export-barrel component (`combobox` → `combobox-base`/`combobox-uds`) require the explicit `subpathEntryModules` entry to avoid elision, the same way `chart`/`command` do? This determines whether Phase 2 lists all 70 remaining components as explicit Rollup entries, or only the re-export-barrel subset.

### Phase 1 — Generator script

- [ ] **T005** Write `scripts/generate-subpath-exports.mjs`: parse `src/index.ts` for every `export * from './components/ui/<name>'` line, emit the sorted `<name>` list as the single source of truth. Resolve each name's real extension on disk (`.tsx` vs `.ts`) rather than hardcoding `.tsx` — every barrel-exported module today happens to be `.tsx` (verified), but the generator shouldn't assume that stays true.
- [ ] **T006** `[P]` Have the generator emit the `package.json#exports` fragment (`{ "./<name>": { "types": ..., "import": ..., "require": ... } }`) for every name, in the same shape as the existing 10 entries.
- [ ] **T007** `[P]` Have the generator emit the `vite.config.lib.ts` `subpathEntryModules` array entry (`components/ui/<name>`) — scoped per T004's finding (all components, or re-export-barrels only).
- [ ] **T008** Decide and implement the write mode: generator directly rewrites `package.json`/`vite.config.lib.ts` in place, vs. prints a diff for manual review. Prefer in-place write with a `--check` flag for CI (see Phase 3). **The write must be a merge, not a wholesale replace**: `package.json#exports` has 9 keys that don't come from `src/index.ts` at all — `styles.css`, `styles/base.css`, `fonts/Inter-Variable.woff2`, `contract`, `figma-component-manifest`, `figma-component-props`, `figma-rules`, `design-language`, `setup`, `./package.json` — plus `micro-calendar`, which is deliberately subpath-only and *not* in the barrel (that's the whole point of it). A generator that regenerates the `exports` block from `src/index.ts` alone will silently delete all of these — a published-API regression. Design it to only add/remove keys matching the `components/ui/*` barrel-name pattern and leave every other existing key untouched (either via an explicit carry-list seeded with the non-component keys + `micro-calendar`, or a pattern-based partial merge).

### Phase 2 — Apply to all components

- [ ] **T009** Run the generator against the current `src/index.ts` (80 components) and review the resulting `package.json#exports` diff — confirm the existing 10 hand-picked entries are reproduced identically (no accidental format drift), **and** assert every pre-existing non-component key (the 9 asset/meta keys + `micro-calendar`, per T008) is still present untouched. Diff the full key set before/after (`node -e "console.log(Object.keys(require('./package.json').exports))"` captured before running the generator), not just the 10 component entries — a check that only looks at the component subset can't catch a dropped `micro-calendar` or `styles.css`.
- [ ] **T010** Apply the generated `vite.config.lib.ts` `subpathEntryModules` changes from T009.
- [ ] **T011** `npm run build:lib` — full rebuild with all new entries.
- [ ] **T012** `[P]` Spot-check a sample of newly-added `dist/components/ui/<name>.js` files for clean heavy-dep exclusion (same grep as T003), covering at least: a plain leaf, a re-export barrel, and `event-card.js` (expected *not* clean — confirms the known exception from Non-goals).
- [ ] **T013** `[P]` `npm run typecheck` — confirm the new `exports` map entries don't break type resolution for existing barrel (`.`) consumers.

### Phase 3 — CI drift guard

- [ ] **T014** Add a `--check` mode to the generator (or a small companion script) that regenerates the exports fragment in memory and diffs it against the committed `package.json`, exiting non-zero on mismatch.
- [ ] **T015** Wire the check into `npm run build:lib` (fail the build) or into CI (`.github/workflows/ci.yml`) as its own step — pick whichever matches how `lint`/`typecheck` are currently gated.
- [ ] **T016** Add a one-line note to `AGENTS.md` or this repo's contribution notes: adding a component to `src/index.ts` requires running the generator (or CI will fail).

### Phase 4 — Package verification

- [ ] **T017** `npm run pack:check` — confirm the tarball includes the new per-component `.js`/`.cjs`/`.d.ts` trios.
- [ ] **T018** `npm run test:consumer-fixture` (or extend `ci:bundle`) with a case importing one leaf component via its new subpath; assert the heavy deps list is absent from the resulting bundle/module graph.

### Phase 5 — Real-world confirmation (pre-release)

- [ ] **T019** Locally link this package (`file:` dependency or `npm link`) into `keystone/apps/web`.
- [ ] **T020** Capture a fresh **barrel-import** Vitest run for the target test files on the same machine, right before switching them — the tech-debt entry's 4.25s/7.8s baseline was measured on different hardware on a different day, so it isn't a valid comparison point; this run establishes the actual before-state.
- [ ] **T021** Swap a handful of `keystone/apps/web` test-file imports from the barrel to the new subpaths (local/throwaway change, not committed to keystone).
- [ ] **T022** Re-run keystone's Vitest suite for those same files and compare module-collection time against T020's same-machine baseline (not the tech-debt entry's number) to confirm the drop before asking keystone to do the full migration.

### Phase 6 — Ship

- [ ] **T023** Version bump (minor — purely additive `exports` surface) and changelog entry describing the new per-component subpaths.
- [ ] **T024** Release.

## Acceptance criteria

- All 80 components currently re-exported from `src/index.ts` have a matching subpath in `package.json#exports` pointing at real, already-built `dist/components/ui/<name>.*` files.
- `import { Select } from '@chghealthcare/unified-design-system/select'` resolves and type-checks in a consumer project without pulling in `recharts`/`vaul`/`cmdk`/the full Phosphor set (true for 108 of 109 components today; `event-card.tsx` is the known exception via `uds-icons.tsx` — see Non-goals).
- `.` barrel imports are unaffected — additive change, ships as semver minor/patch.
- Adding a component to `src/index.ts` without regenerating the exports map fails CI (no silent drift).

## Verification

- Extend `ci:bundle` (or `.consumer-perf`) with a case that imports one leaf component via its new subpath and asserts the heavy deps are absent from the resulting module/bundle graph.
- Locally link this package (`file:` dependency or `npm link`) into `keystone/apps/web`, swap a handful of imports to subpaths, and re-run Vitest to confirm the ~4s/file module-collection cost drops before asking keystone to do the full migration.

## Follow-ups (not this spec)

- Once released, file the consumer-side migration in `keystone` and re-measure the ~345s cumulative collection number from the tech-debt entry.
- `event-card.tsx`'s subpath still carries the full `uds-icons.tsx` wrapper cost (the one component that imports it). If `EventCard` matters enough to a consumer's test-performance profile, revisit either splitting `uds-icons.tsx` or switching `event-card.tsx` to direct `@phosphor-icons/react` imports like the other 38 icon-using components.
