# TD-UDS-010: subpath exports for the UDS barrel

A thin spec, not a full implementation plan — see `component-regression-testing.md` for the doc-style precedent (plan, not shipped code).

## Problem

Tracked in `modio/keystone` `docs/engineering/tech-debt.md` (2026-07-23 entry, "UDS barrel index forces eager loading of all components and transitive dependencies, crippling test performance"). The entry claims `dist/index.js` has 108 static top-level imports (every component + `recharts`, 65+ Phosphor icon wrappers, 33 `radix-ui` sub-packages, `cmdk`, `date-fns`, `react-day-picker`, `sonner`, `vaul`) — corroborated here: `grep -cE "^(import|export)" dist/index.js` counts 98, same order of magnitude. `package.json#exports` only exposes `.`, so any consumer import — even of a single leaf component — forces Vitest (or any bundler) to resolve and evaluate the entire graph. Static top-level imports execute before tree-shaking can help. (The tech-debt entry also asserts no `deps.optimizer`/`deps.inline` Vitest config can bypass this — that's the tech-debt author's tested claim, presented here as attributed, not independently re-verified.)

**Framing correction, found during implementation:** `recharts`/`cmdk`/`vaul`/`react-resizable-panels`/`sonner` are **not** actually reachable from `dist/index.js` today — traced directly (`grep -n "chart-core\|chart-uds\|command-base\|drawer-base\|drawer-uds\|resizable\|sonner" dist/index.js` → no matches). `Chart`/`Command`/`Drawer`/`Resizable`/`Sonner` were already subpath-only, never re-exported from `src/index.ts` (same category as `micro-calendar`), so those five heavy deps were never part of the barrel's eager-load cost in the first place. The barrel's real, confirmed tax is: the 80 barrel components' own code, `react-day-picker` (via `calendar`/`calendar-year-grid`, which genuinely are barrel members), `@phosphor-icons/react` (via `calendar`/`menu`/many others), and whatever `radix-ui` sub-packages the barrel's real (non-subpath-only) components pull in — not the five listed above.

Reported in the tech-debt entry (not reproduced here — out of scope for a thin spec): module collection dominates test runtime in `keystone/apps/web` (4.25s of 7.8s for one file; ~345s cumulative across 27 files / 8 workers). Actual test execution is ~1s/file. The cost is paid per worker, so parallelism compounds it rather than mitigating it.

## Current state (already true today, verified in this repo)

- `vite.config.lib.ts` builds with `preserveModules: true`, so `dist/components/ui/*.{js,cjs,d.ts}` already exist as **individual files for every component** — the build already does the hard part.
- **Correction — verified by cross-referencing `src/index.ts` directly, not assumed:** of the original 10 pre-existing `package.json#exports` subpaths (`chart`, `command`, `drawer`, `resizable`, `sonner`, `input-otp`, `calendar`, `date-input`, `date-range-input`, `menu`), only **5** (`calendar`, `date-input`, `date-range-input`, `menu`, `input-otp`) are actually re-exported from the barrel. The other **5** (`chart`, `command`, `drawer`, `resizable`, `sonner`) are subpath-only, exactly like `micro-calendar` — never in `src/index.ts` at all. (An earlier draft of this spec, and this implementation's first pass at the generator, both assumed all 10 were barrel members — that wrong assumption caused a real bug, see "Implementation notes" below.)
- Those 10 (5 barrel + 5 subpath-only) are also the only entries in `vite.config.lib.ts`'s `subpathEntryModules` array. The comment there explains why: they're pure re-export barrels (e.g. `chart.tsx` is just `export * from './chart-core'` / `./chart-theme` / `./chart-uds`), and Rollup elides trivial re-export files into their importer unless forced to keep them as a real entry point.
- The other 75 barrel components (`button`, `select`, `table`, `badge`, `dialog-uds`, etc. — 80 barrel components total minus the 5 that already had subpaths) have no `exports` subpath. The files exist in `dist/` already; they're just not reachable via Node's `exports` resolution, so `import { Select } from '@chghealthcare/unified-design-system/select'` fails even though `dist/components/ui/select.js` is sitting right there.

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

- [x] **T001** Add `combobox` to `vite.config.lib.ts`'s `subpathEntryModules` and a matching `./combobox` entry in `package.json#exports` (mirror the `{ types, import, require }` shape of the existing 10).
- [x] **T002** `npm run build:lib` and confirm `dist/components/ui/combobox.js` is a real module (not inlined into another chunk). Confirmed: before this change `combobox.js`/`.cjs`/`.d.ts` did not exist in `dist/` at all (elided); after adding the explicit entry, all three exist and re-export the real bindings from `combobox-base.js`/`combobox-uds.js`.
- [x] **T003** `combobox.js` is itself a re-export barrel (`export * from './combobox-base'`/`'./combobox-uds'`) — the heavy/icon imports live in those files, not in `combobox.js`, so grepping `combobox.js` alone proves nothing (it'll come back clean regardless of whether elision happened). Followed the local hop, same as the `button` → `button-base` trace in "Current state": `grep -nE "recharts|vaul|cmdk|react-day-picker|sonner|uds-icons" dist/components/ui/combobox-base.js dist/components/ui/combobox-uds.js` — empty. Only externals present are `@base-ui/react` and named `@phosphor-icons/react` icons, both expected.
- [x] **T004** **Finding, confirmed by a full audit of all 80 barrel components (not just combobox):** the deciding factor is shape, not "heaviness." A barrel component whose entire file body is `export * from '...'` lines (a **pure re-export barrel** — `chart`, `command`, `drawer`, and previously-undeclared `combobox`, `pagination`, `sidebar`) is elided by Rollup and is **absent from `dist/`** unless declared in `subpathEntryModules`. A component with any real content (JSX, hooks, logic — the other 74, including 7 of the existing 10 declared entries: `calendar`, `date-input`, `date-range-input`, `menu`, `resizable`, `sonner`, `input-otp`) is preserved by `preserveModules` regardless of whether it's declared as an entry — verified true for all of them against the pre-existing `dist/` build with zero exceptions. **Consequence for Phase 2:** every barrel component still needs a `package.json#exports` entry, but only the pure-reexport-shaped ones (`combobox`, `pagination`, `sidebar`, on top of the already-declared `chart`/`command`/`drawer`) need to be added to `vite.config.lib.ts`'s `subpathEntryModules`. The other 74 need only the `exports` map entry.

### Phase 1 — Generator script

- [x] **T005** Write `scripts/generate-subpath-exports.mjs`: parse `src/index.ts` for every `export * from './components/ui/<name>'` line, emit the sorted `<name>` list as the single source of truth. Resolve each name's real extension on disk (`.tsx` vs `.ts`) rather than hardcoding `.tsx` — every barrel-exported module today happens to be `.tsx` (verified), but the generator shouldn't assume that stays true.
- [x] **T006** `[P]` Have the generator emit the `package.json#exports` fragment (`{ "./<name>": { "types": ..., "import": ..., "require": ... } }`) for every name, in the same shape as the existing 10 entries.
- [x] **T007** `[P]` Have the generator emit the `vite.config.lib.ts` `subpathEntryModules` array entry (`components/ui/<name>`) — scoped per T004's finding (all components, or re-export-barrels only).
- [x] **T008** Decide and implement the write mode: generator directly rewrites `package.json`/`vite.config.lib.ts` in place, vs. prints a diff for manual review. Prefer in-place write with a `--check` flag for CI (see Phase 3). **The write must be additive, never destructive** — and the first implementation of this task got that wrong in a way worth recording: an initial version defined an explicit "carry list" of non-barrel `package.json#exports` keys to preserve (styles/font/meta keys + `micro-calendar`) and treated every *other* existing key as "regenerable from the barrel," dropping any that the current `src/index.ts` parse didn't produce. That silently **deleted 5 live, previously-published subpaths** — `chart`, `command`, `drawer`, `sonner`, `resizable` — because (per the corrected "Current state" above) those are subpath-only components that were never in the barrel to begin with, just like `micro-calendar`; the carry list only happened to include `micro-calendar` by luck, not by a rule that covered the whole category. Caught by `npm run typecheck` (a docs file imports `.../resizable`, which started failing to resolve) — see "Implementation notes" below. **Fixed design:** `mergeExports(existing, fragment) => ({ ...existing, ...fragment })` — start from every existing key, then overlay only the barrel-derived fragment on top. This never removes a pre-existing key (subpath-only or otherwise); it only adds new barrel components or refreshes ones that already matched. No carry list needed at all — removal is out of scope for this generator by design, not by enumeration.

### Phase 2 — Apply to all components

- [x] **T009** Run the generator against the current `src/index.ts` (80 components) and review the resulting `package.json#exports` diff — confirm pre-existing entries are reproduced identically (no accidental format drift), **and** assert every pre-existing key is still present untouched. Diff the full key set before/after (captured with `node -e "console.log(Object.keys(require('./package.json').exports))"` before running the generator) against the actual `git HEAD` original — not a hand-written assumption of which keys are "safe," which is exactly what T008's first pass got wrong. Result: all 22 original keys preserved + 75 newly-added barrel components = 97 total; confirmed by diffing against `git show HEAD:package.json`, not against the incomplete carry-list this implementation initially assumed.
- [x] **T010** Apply the generated `vite.config.lib.ts` `subpathEntryModules` changes from T009. (`combobox`, `pagination`, `sidebar` added to the existing 11 — 14 total, matching T004's finding.)
- [x] **T011** `npm run build:lib` — full rebuild with all new entries. Succeeded.
- [x] **T012** `[P]` Spot-check a sample of newly-added `dist/components/ui/<name>.js` files for clean heavy-dep exclusion (same grep as T003), covering at least: a plain leaf (`table.js` — clean), a re-export barrel (`pagination-base.js`/`pagination-uds.js`, `sidebar-uds.js` — clean), and `event-card.js` (**not** clean — imports `uds-icons.js`, confirming the known exception from Non-goals exactly as predicted).
- [x] **T013** `[P]` `npm run typecheck` — confirmed the new `exports` map entries don't break type resolution for existing barrel (`.`) consumers. First run surfaced the T008 regression (`Cannot find module '@chghealthcare/unified-design-system/resizable'` in `src/docs/shadcn-examples/registry.tsx`, 170 errors vs. a 169-error clean-tree baseline); after the merge-logic fix, re-run matches the 169-error baseline exactly (all pre-existing errors, all unrelated `.stories.tsx` Storybook typing issues).
- [x] **Post-T013 addition (not in the original task list, added after catching the merge bug):** verified every `package.json#exports` target actually resolves on disk — `node -e "…checks fs.existsSync for every types/import/require path…"` — confirms all 97 entries point at real files. Typecheck alone doesn't cover this: it only exercises subpaths something in the source tree actually imports (a handful), not all ~225 file references the new entries assert. This check is folded into Phase 3's CI guard below so it runs on every change, not just this one.

### Phase 3 — CI drift guard

- [x] **T014** `--check` mode (source-of-truth drift: `src/index.ts` vs. `package.json`/`vite.config.lib.ts`, no `dist/` access, safe to run before a build) and a separate `--verify-dist` mode (every `package.json#exports` target actually exists on disk, run *after* a build) are both implemented and each independently tested against induced failures: `--check` correctly fails when `package.json` is missing an entry the barrel expects (verified by deleting `./badge` and confirming `build:lib` stops before the Vite build even starts); `--verify-dist` correctly fails when a `dist/` file goes missing after a successful generate (verified by temporarily removing `dist/components/ui/badge.js`). Both pass cleanly on the real, correct state.
- [x] **T015** Wired into `npm run build:lib` directly: `node ./scripts/generate-subpath-exports.mjs --check && vite build ... && ... && node ./scripts/prepare-package.mjs && node ./scripts/generate-subpath-exports.mjs --verify-dist`. `--check` runs first (fail fast, before spending time on a build); `--verify-dist` runs last (catches the build itself silently failing to emit something the exports map promises). Also added `npm run generate:subpath-exports` as the write-mode entry point for a human to run after editing `src/index.ts`.
- [x] **T016** Added to `docs/github-packages.md` under "Publishing (maintainers)" rather than `AGENTS.md` — `AGENTS.md` turned out to be entirely consumer-facing (Figma/AppShell rules), not a maintainer contribution doc, and `github-packages.md`'s "Publishing (maintainers)" section is where the `build:lib` step this gates is already documented.

### Phase 4 — Package verification

- [x] **T017** `npm run pack:check` — confirmed the tarball includes the new per-component `.js`/`.cjs`/`.d.ts` trios (spot-checked `badge`/`table`; both present at 4 files each — `.js`/`.cjs`/`.d.ts`/`.d.ts.map`).
- [x] **T018** Extended `ci:bundle` (already a CI step, so no workflow YAML change needed) with a "TD-UDS-010 subpath tree-shaking check": walks **every one of the 80 barrel components'** real built import graph (`dist/components/ui/<name>.js` and its local `./` hops) and asserts none of the barrel's known avoidable heavy deps (`recharts`, `cmdk`, `vaul`, `react-day-picker`, `sonner`, `react-resizable-panels`, `date-fns`, `input-otp`) appear, except via an explicit exceptions map (`calendar`/`date-input`/`date-range-input` → `react-day-picker`; `input-otp` → `input-otp`, since that component legitimately wraps the identically-named package). All 80 pass. First draft of this check sampled only 6 components and included `radix-ui` in the heavy-deps list; widened to all 80 and dropped `radix-ui`/`@base-ui/react` after measuring that **49 of 80** barrel components import `radix-ui` directly (it's the shared primitive layer nearly every interactive component composes, not a barrel-specific or avoidable cost — flagging it would mean either ~49 exceptions or falsely implying subpathing avoids something it structurally can't). Verified the check still actually detects regressions and doesn't just pass trivially: temporarily removed the `calendar` exception and confirmed it correctly re-fails with `unexpected heavy dep(s): react-day-picker`, then restored it. **Pre-existing, unrelated:** `ci:bundle`'s separate gzip-budget report (not this check) already fails for `menu`/`branding` — confirmed via `git stash` that this failure exists on the clean tree before any of this spec's changes; out of scope for TD-UDS-010.

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
