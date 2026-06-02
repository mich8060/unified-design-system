# Text typography for consumers (Tailwind v4 + Vite)

This document is the **contract for product apps** that use **`@chghealthcare/unified-design-system`** with **Tailwind CSS v4** and **Vite**. It explains how the **`Text`** component gets its size, what can break, and how to debug.

---

## 1. Precompiled utilities — not app JIT on `node_modules`

**Confirmed:** The `Text` component applies typography through **CSS custom properties** from the shipped semantic type tokens (for example `--uds-type-body-14-font-size`, `--uds-type-body-14-line-regular`). Weight and appearance still use **static utility class names** from the published stylesheet (`font-uds-medium`, `text-uds-text-primary`, and similar).

**They are not** produced by the consumer app’s Tailwind compiler scanning `node_modules/@chghealthcare/...` for class strings. Relying only on `@import "tailwindcss"` and `@source` in the app **will not** generate the full UDS typography surface from the design system package alone.

**Required consumer step:** Import the design system stylesheet once at the app root (or an equivalent **full** build that includes the same rules):

```ts
import "@chghealthcare/unified-design-system/styles.css"
```

If `styles.css` is missing, `<Text variant="body" size="14" />` will **not** get the intended font size, line height, letter spacing, or display text transform, even if the JSX and props are correct.

---

## 2. Token chain (themes and brands)

**Confirmed:** Typography styles are wired through semantic **`--uds-type-*`** variables in the shipped token file. For each group and size step, the chain is consistent, for example for **body 14**:

| Layer | Role |
|--------|------|
| `Text` props | `variant="body"` `size="14"` `lineHeight="regular"` |
| Applied styles | `font-size`, `line-height`, `letter-spacing`, and `text-transform` from `--uds-type-body-14-*` |
| Primitives | `--uds-font-size-14`, `--uds-line-14` |
| Optional Tailwind utilities | `text-uds-14`, `leading-uds-14` when you compose typography manually |

**Consumer implication:** Brand or theme overrides must **preserve** these variables (or intentionally remap them). If a theme drops `--uds-font-size-14` / `--uds-line-14` or overrides the semantic `--uds-type-body-14-*` values incorrectly, **body 14 will look wrong or unchanged** relative to other scales.

---

## 3. Layer order and global CSS conflicts

**Confirmed:** `Text` renders a normal element (e.g. `p`, `span`) with utility classes and typography variables. Any **more specific** or **later** CSS that sets `font-size`, `line-height`, or `font-family` on that element (or ancestors) can **override** the utilities.

**Documented recommendation:**

1. Import **`@chghealthcare/unified-design-system/styles.css`** in a predictable place (typically **once**, early in the app entry).
2. Avoid broad resets that target `span`, `p`, or `*` with higher specificity than utilities unless you intend to override the design system.
3. If you use Tailwind’s **preflight** and custom **layers**, keep design-system guidance in mind: utilities from the published bundle should win for typography **unless** your globals are loaded later or use stronger selectors. When in doubt, **inspect computed styles** in DevTools.

We do not mandate a single global order for every app stack; teams should **test** their entry order (DS CSS vs app globals vs Tailwind entry) and document the chosen order in their own repo.

---

## 4. `Text` props → typography tokens

The **`Text`** component uses **`textVariants`** from `class-variance-authority` (also **exported** as `textVariants` for debugging) for **weight** and **appearance**. Typography size and rhythm come from **`variant`**, **`size`**, and **`lineHeight`**.

### Groups and size steps

| `variant` | `size` values | Default `size` |
|-----------|---------------|----------------|
| `body` | `10`, `12`, `14`, `16`, `18`, `20` | `14` |
| `heading` | `24`, `28`, `32` | `24` |
| `display` | `36`, `48`, `60`, `72`, `96`, `128` | `48` |

### `lineHeight` presets

| `lineHeight` | Token suffix |
|--------------|--------------|
| `regular` | `--uds-type-{variant}-{size}-line-regular` |
| `tight` | `--uds-type-{variant}-{size}-line-tight` |
| `loose` | `--uds-type-{variant}-{size}-line-loose` |

Each combination also reads `--uds-type-{variant}-{size}-letter-spacing` and `--uds-type-{variant}-{size}-text-transform` (display and heading styles use `none` by default).

### Weight utilities (`weight` prop)

| `weight`   | Utility            |
|-----------|--------------------|
| `regular` | `font-uds-regular` |
| `medium`  | `font-uds-medium`  |
| `semibold`| `font-uds-semibold`|
| `bold`    | `font-uds-bold`    |

### Appearance (`appearance` prop)

Uses `text-uds-text-*` utilities (semantic text colors). See `TEXT_APPEARANCES` / `textVariants` in `src/components/ui/text.tsx`.

---

## 5. Visual regression (body 10 vs body 12)

**Product ask:** Maintain an obvious visual check (Storybook story, docs site example, or screenshot baseline) that shows **`variant="body" size="10"`** next to **`variant="body" size="12"`** with the same label text so size regressions are visible at a glance.

This repo’s docs UI includes **Text** examples under component previews (`src/docs/shadcn-examples/registry.tsx`); extend that or add Storybook when the team standardizes on a single visual surface.

---

## 6. DX: debugging and future improvements

**Today:**

- **`textVariants`** is **exported** from `@chghealthcare/unified-design-system` (same module as `Text`). For debugging you can log or apply resolved weight and appearance classes:

  ```tsx
  import { Text, textVariants, cn } from "@chghealthcare/unified-design-system"

  <span className={cn(textVariants({ weight: "medium", appearance: "secondary" }))}>debug</span>
  ```

**Optional follow-up (if the team agrees DX is still confusing):**

- Document the snippet above in the main consumer README.
- Add a **dev-only** runtime check (e.g. in development builds) that detects missing expected CSS custom properties or utility side effects after mount — **design carefully** to avoid false positives across SSR and shadow DOM.

---

## Related source files

- `src/components/ui/text.tsx` — `Text`, `textVariants`, `TEXT_APPEARANCES`, `TEXT_VARIANTS`, size exports
- `src/styles/uds-typography-theme.css` — `@theme` type scale and line tokens
- `src/styles/uds-tokens.css` — `--uds-font-size-*`, `--uds-line-*`, `--uds-type-body-*`, `--uds-type-heading-*`, `--uds-type-display-*`
- `src/styles.css` — Tailwind entry and `@source` for **this** package’s build (not a substitute for consumers importing `styles.css`)
