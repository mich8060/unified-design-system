# The `./theme` subpath — Tailwind `@theme` partial for consumer builds

Design rationale for `@chghealthcare/unified-design-system/theme`, the generated
`dist/theme.css` behind it, and the two scripts that produce and verify it.

For the runtime side of consumer typography — why `styles.css` is still required, and how the
`--uds-type-*` chain works — see [`consumers-text-typography-tailwind-v4.md`](./consumers-text-typography-tailwind-v4.md).
This document covers only the **compile-time** half: how a consumer's own Tailwind build learns
that UDS's utility namespaces exist.

## The problem

UDS ships `dist/styles.css`, a fully compiled stylesheet. A consumer app that imports it gets
exactly the utility classes UDS's build happened to emit — and nothing else. There is no JIT on the
consumer side, so a class UDS didn't emit doesn't fail to build; it silently does nothing, and the
resulting layout bug only shows up at runtime.

Consumers hit this from two directions:

1. **Standard-scale gaps.** UDS emits a utility only if its own source (or its recipe safelist,
   `src/styles/recipe-layout-safelist.tsx`) references it. `lg:grid-cols-2` ships; bare
   `grid-cols-2` does not. `space-y-4` ships; `space-y-6` does not.
2. **Withdrawal.** The emitted set can shrink between releases. UDS v1.0.6 switched the published
   stylesheet to `@import "tailwindcss" source(none)` with an explicit `@source` list to slim the
   bundle. Everything that had only ever been emitted *incidentally* — because Tailwind's automatic
   content detection had been scanning files like `src/docs/**` — disappeared at once. Consumers had
   built against that incidental surface.

The fix on the consumer side is a small local Tailwind v4 build that generates whatever it needs
from its own source. That build must not be prefixed: keeping the names standard is what makes it a
fallback, since a utility UDS drops is simply regenerated from the call sites already using it.

## Why the compiled stylesheet can't serve as the theme

The obvious approach — point the local build at `dist/styles.css` — does not work, and fails
silently in the worst way.

`@theme` is a *registration*: it tells Tailwind which namespaces exist, so `text-uds-14` is a
recognised utility rather than an unknown class. But `dist/styles.css` has already been through
Tailwind. Its tokens survive only as plain declarations inside `@layer theme{:root{…}}`, which
carries no registration information. `@reference`-ing it compiles fine and generates standard-scale
utilities, but every `-uds-` class emits nothing at all.

UDS also doesn't publish `src/`, so there was previously **no** consumer-reachable file containing a
raw `@theme` block. That is the gap this export closes.

## Why `theme(reference)` rather than a plain import

A local build must not emit a second copy of the theme. Tailwind namespaces are declared with
`@theme`, which compiles into `@layer theme` — and same-named cascade layers **merge**, so within
the merged layer source order decides. A local sheet imported after `styles.css` (which is the
correct order for utility rules, so local overrides win) would therefore also override UDS's theme
variables with whatever the local build declared.

Mostly that's harmless: of the 52 theme variables a vanilla Tailwind 4.3.3 build and UDS's
`@layer theme` both define, 14 differ textually but 12 are minifier cosmetics (`.25rem` vs
`0.25rem`, `.15s` vs `150ms`). UDS does not override the standard scale — it adds a `-uds-`
namespace beside it.

The exceptions are the font families. UDS pins `--font-sans` to the Inter stack and
`--default-font-family` to that (preflight reads it). A plain `@import "tailwindcss"` in a
consumer sheet loaded after `styles.css` would replace it with Tailwind's system stack **app-wide**,
and re-emit preflight for good measure.

`theme(reference)` avoids all of it by emitting nothing. It registers the namespaces for the
compiler and stops there, so the only thing the local build contributes is `@layer utilities`.

## What the partial contains, and deliberately does not

`dist/theme.css` carries the `@theme` registrations only:

```css
--color-uds-surface-primary: var(--uds-surface-primary);
--text-uds-14: var(--uds-font-size-14);
```

It does **not** define `--uds-surface-primary` or `--uds-font-size-14`. Those raw values live in
`src/styles/uds-tokens.css` and ship inside `styles.css`, which the app imports anyway.

That split is the point. Generated utilities come out as:

```css
.bg-uds-surface-primary { background-color: var(--color-uds-surface-primary, var(--uds-surface-primary)); }
```

so the local build resolves against UDS's live token values at runtime rather than a hand-copied,
driftable duplicate of the token scale. A consumer never has to mirror UDS's tokens, and a token
value change in a UDS upgrade needs no consumer rebuild to take effect.

### The fallback is load-bearing, not a safety net

Tailwind tree-shakes `@theme`, so `styles.css` emits only the namespaces UDS's own components
actually used. The partial registers considerably more than that: of 11 declared
`--color-uds-surface-*` variables only 6 survive into the shipped stylesheet, and of 16 declared type
sizes only 6. `--text-uds-48` and `--color-uds-surface-disabled` are both absent at runtime.

For all of those, the **second** half of `var(--text-uds-48, var(--uds-font-size-48))` is the only
thing that makes the utility work — the primary variable resolves to nothing, and without a valid
fallback the browser would drop the declaration silently. That is the same silent no-op this export
exists to remove, so it is asserted directly: `test:theme-partial` checks that every one of the 101
`--uds-*` targets the partial names is defined in `dist/styles.css`, and covers two deliberately
tree-shaken utilities whose only working path is the fallback.

This is also why the partial must keep pointing at `--uds-*` primitives rather than at Tailwind
namespace names. A registration whose fallback named another tree-shaken namespace would compile
cleanly and still render nothing.

## Consumer recipe

```css
/* app/src/tailwind-local.css — imported AFTER …/styles.css */
@import "@chghealthcare/unified-design-system/theme" theme(reference);
@import "@chghealthcare/unified-design-system/variants";
@import "tailwindcss/theme.css" theme(reference);
@import "tailwindcss/utilities.css" layer(utilities) source(none);
@source "./";
```

Both references are needed: ours registers the `-uds-` namespaces, Tailwind's registers the standard
scale. `source(none)` is not optional — without it Tailwind's automatic content detection also scans
from the compile base, which in a monorepo is usually not the app's source directory. Declaring the
scan set explicitly is the same reason UDS's own `src/styles.lib.css` uses it.

The order of the two `theme(reference)` imports does not matter. Tailwind marks its own theme values
as defaults, so an explicitly-set value wins regardless of position — verified both ways, `.font-sans`
compiles with UDS's Inter stack as its fallback either order.

### `./variants` — when you need it

`./variants` is a plain import, not a reference: it carries UDS's `@custom-variant` declarations,
which `theme(reference)` cannot hold because that form accepts `@theme` blocks only. Today that is
one line:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

**It only matters if your scanned source uses a `dark:` utility.** Tailwind generates variants on
demand, so an app with no `dark:` class anywhere produces no dark rules at all and this import
changes nothing about the output. In that case it is genuinely opt-in.

The moment your source contains even one `dark:` class, you need it. Tailwind's default `dark:` is
`@media (prefers-color-scheme: dark)`; UDS redefines it class-scoped, because a UDS app drives dark
mode with a `.dark` class rather than the OS setting. Without the import your build compiles those
utilities with OS-media semantics and — because your sheet loads after `styles.css` — *overrides*
UDS's correctly-scoped rules. Every `dark:` class in your app then fires on any machine whose OS is
in dark mode, with no `.dark` ancestor present.

The worst version of this is an app that does **not** implement dark mode at all, which is exactly
where it was found. keystone's `apps/web` never applies `.dark`, so the 14 `dark:` classes left in
two of its components were dead code — until the local build made them live, and `dark:text-white`
turned an amber notification bar's text white-on-amber. The import adds no feature there; it keeps
inert markup inert.

Deciding for your app:

```bash
grep -rE '\bdark:' src/ | head   # any output → include the import
```

The recommended default is to include it either way. It costs one line and contributes nothing to
the output when unused, whereas the failure it prevents is silent, depends on the developer's OS
setting, and inverts the meaning of markup already in the tree. The alternative — deleting the
`dark:` classes instead — is cleaner if you never want dark mode, but then a single one reintroduced
later silently brings the bug back.

`test:theme-partial` asserts `dark:` compiles class-scoped and fails if a `prefers-color-scheme`
query is emitted at all.

Shipping the declaration rather than documenting it is deliberate, and for the same reason `./theme`
exists: a hand-copied `@custom-variant` silently diverges the moment UDS changes its own.

Import the compiled result **after** `styles.css` so local utility rules win ties. With
`theme(reference)` the only thing in play is `@layer utilities`, so later-wins is the intended
semantics rather than a hazard.

## How the partial is built

[`scripts/build-theme-partial.mjs`](../scripts/build-theme-partial.mjs) concatenates the
`@theme`-only files verbatim. The file set is **derived from `src/styles/tokens.css`'s `@import`
list**, so a new `*-theme.css` imported there ships automatically — there is no second list to keep
in sync.

Concatenating whole files rather than parsing `@theme` blocks out of mixed sources is deliberate: it
keeps the generator from having to be a CSS parser. That's why the font block moved out of
`tokens.css` into `src/styles/uds-font-theme.css`.

Two guards keep it honest:

- **Every included file must be `@theme`-only.** `@import … theme(reference)` rejects anything else,
  so a mixed file would break every consumer's build rather than just this repo's.
- **A mixed-content file may not contain an `@theme` block.** `uds-tokens.css` is `:root` rules and
  is skipped by design. If an `@theme` block ever appears there it would be silently missing from
  the partial, so the build fails and asks for it to be extracted.

### The `/*!` trap

Tailwind's parser discards ordinary `/* */` comments but keeps `/*! */` bang-comments as AST nodes —
and `theme(reference)` rejects any node that isn't an `@theme` block. A bang-comment anywhere in the
partial makes it unusable for every consumer, with an error that points at the consumer's import
rather than at this file. The generator's header is therefore a plain comment, and a guard refuses
to write output containing `/*!`. (This was caught by `test:theme-partial` on the first run, which is
a fair advertisement for that check.)

## Verification

[`scripts/ci-theme-partial.mjs`](../scripts/ci-theme-partial.mjs) (`npm run test:theme-partial`)
compiles the emitted partial the way a consumer does and asserts the three properties that actually
matter:

1. **UDS token utilities generate** — one per registered namespace. A dropped registration otherwise
   surfaces as a silent no-op in a consumer app.
2. **Only utilities are emitted** — no `@layer theme`, no preflight. This is the check that would
   catch a regression back into the font-clobbering behaviour described above.
3. **Utilities fall back to `--uds-*`** — proving runtime values still come from `styles.css`.

Standard-scale classes UDS does not ship (`space-y-6`, `max-w-6xl`, `grid-cols-2`) are asserted too,
since covering those is the other half of why a consumer stands up a local build.

`build:lib` runs the generator's `--check` mode up front (fast source validation, no `dist/` access)
and the real emit after `tsc`, then `generate-subpath-exports.mjs --verify-dist` confirms
`./theme` resolves to a real file.

`ci-theme-partial.mjs` drives Tailwind through its `compile()` API, which keeps the check fast and
dependency-free. That is not the same code path as a consumer's bundler, so the recipe above was also
verified manually, end to end: `npm pack`, install the 1.4.0 tarball into a throwaway Vite app with
`@tailwindcss/vite` and `tailwindcss@4.3.3`, and build. Results:

- `@chghealthcare/unified-design-system/theme` resolved through normal Node resolution, and the
  optional `tailwindcss` peer installed clean with no warnings.
- All nine probed utilities emitted — token, tree-shaken, and standard-scale alike.
- Output contained only `@layer properties` and `@layer utilities`, 1.54 kB total.
- The tree-shaken cases came out as
  `font-size: var(--text-uds-48, var(--uds-font-size-48))` and
  `background-color: var(--color-uds-surface-disabled, var(--uds-surface-disabled))`, confirming
  through a real bundler that the fallback path described above is what actually carries them.

Worth re-running that manual check on a Tailwind major/minor bump or a Vite major bump, since those
are the two things that could change the plugin's import handling without failing the compile-API
test.

## Tailwind version skew

A namespace that changes meaning between Tailwind versions is the one thing that can make a shared
variable name compile differently in the two builds, so the consumer's Tailwind version matters.

`tailwindcss` is therefore declared as an **optional peer dependency** (`^4.2.2`). Optional because
the overwhelming majority of consumers import the precompiled `styles.css` and never run Tailwind at
all — a hard peer would force an install on every one of them for an export they don't use. Declared
at all because the moment a consumer *does* use `./theme`, Tailwind stops being our private build
tool and becomes a shared dependency whose version has to line up. Making that machine-readable means
a package manager warns on a mismatch rather than leaving it to a comment nobody reads.

The range is deliberately UDS's own supported floor rather than the exact version any given release
was built against. Those differ, and the caret floats: 1.2.1 was built against 4.2.2, 1.3.0 against
4.3.3, with no signal beyond the banner comment atop `dist/styles.css`. The partial's header records
the resolved build version, so use the peer range to catch a wrong *major*, and the header when you
need to match exactly.

## Related

- [`component-subpath-exports.md`](./component-subpath-exports.md) — the additive-merge design that
  lets `./theme` be hand-added to `package.json#exports` without the generator removing it.
- [`consumers-text-typography-tailwind-v4.md`](./consumers-text-typography-tailwind-v4.md) — runtime
  token chain and why `styles.css` remains required.
