# Component subpath exports

Why every barrel component has its own `package.json#exports` subpath, and why the pieces that
maintain it are shaped the way they are. The motivating problem was **consumer unit-test
performance**; problem statement, before/after measurements, and implementation history live in
[issue #52](https://github.com/chghealthcare/unified-design-system/issues/52). This doc covers only
the decisions a future maintainer needs to not break.

Practical workflow (what to run after editing `src/index.ts`): [`CONTRIBUTING.md`](../CONTRIBUTING.md#adding-or-removing-a-public-component).

## Problem

`package.json#exports` used to expose only the root barrel (`.`), so importing a single component
forced the whole `dist/index.js` graph to resolve and evaluate. Static top-level imports run before
tree-shaking can help. In `keystone/apps/web` this made Vitest *module collection* — not test
execution — dominate runtime.

Every one of the 80 components in `src/index.ts` now has a `./<name>` subpath. Purely additive: the
root barrel is unchanged. Measured on 3 keystone test files, switching one import from the barrel to
its subpath cut collection time ~96% (~9.8–12.8s → ~0.39s) and wall duration ~79%; test execution
itself was unchanged, as expected.

## Which components need a Vite entry

`vite.config.lib.ts`'s `subpathEntryModules` is **not** the same list as `package.json#exports`. The
deciding factor is file *shape*, not size or "heaviness":

- A **pure re-export barrel** — a file whose entire body is `export * from '...'` lines (`chart`,
  `command`, `drawer`, `combobox`, `pagination`, `sidebar`) — is elided by Rollup and absent from
  `dist/` entirely unless declared as an explicit entry.
- A component with **any real content** (JSX, hooks, logic) is preserved by `preserveModules`
  whether or not it's declared. Verified against a full build for all 80 barrel components with no
  exceptions.

So every barrel component needs an `exports` entry; only the pure-re-export-shaped ones also need a
Vite entry. A few real-content components (`calendar`, `date-input`, `date-range-input`, `menu`,
`resizable`, `sonner`, `input-otp`) are still listed as a historical holdover — harmless, not
required.

## Why the generator's merge is additive

`scripts/generate-subpath-exports.mjs` merges as `{ ...existing, ...generated }` — it adds and
refreshes barrel-derived keys and **never removes** anything.

This matters because not every `exports` key is derivable from the barrel. `chart`, `command`,
`drawer`, `sonner`, `resizable`, and `micro-calendar` are **subpath-only**: real published entry
points that are deliberately not re-exported from `src/index.ts`. An earlier version of the script
enumerated which keys were "safe to keep" instead of keeping everything by default, and silently
deleted five live, published subpaths — the enumeration happened to include `micro-calendar` and
missed the other five, because it was a list rather than a rule. Removal is out of scope for this
generator by design. Don't reintroduce a carry list.

## What the tree-shaking check covers

`scripts/ci-bundle.mjs` walks every barrel component's real built import graph and fails if an
avoidable heavy dep appears. Two deliberate scoping decisions:

- **`radix-ui` and `@base-ui/react` are excluded from the heavy-dep list.** 49 of 80 barrel
  components import `radix-ui` directly — it's the shared primitive layer, not a barrel-specific
  cost. A subpath import still needs it, so flagging it would mean ~49 exceptions or a false
  implication that subpathing avoids something it structurally can't.
- **Exceptions are components that legitimately own the dep**, not suppressions:
  `calendar`/`date-input`/`date-range-input` genuinely wrap `react-day-picker`, and `input-otp`
  wraps the identically-named package. Neither leaks into any other component's subpath.

## Known exception: `event-card`

`event-card.tsx` is the only component of the 80 that imports the fat `uds-icons.tsx` wrapper rather
than pulling named icons from `@phosphor-icons/react` directly (38 other components do the latter,
which is a normal tree-shakeable named import). Its subpath still carries the full wrapper cost.
Contained and known — fix by switching it to direct icon imports, or by splitting the wrapper.

## Follow-ups

- Migrate `keystone/apps/web`'s imports from the barrel to subpaths and re-measure the full suite.
  This repo only adds the capability; the consumer-side migration is a separate cross-repo change.
- Resolve the `event-card` exception above.
