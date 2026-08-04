import type { CatalogEntry } from './types'

const u = (
  utility: string,
  values: string,
  description: string,
  themeDefault?: string,
) => ({ name: utility, type: values, description, default: themeDefault })

/**
 * Categories mirror utilities shipped with the core `tailwindcss` package
 * (see https://tailwindcss.com/docs). No third-party component libraries.
 */
export const CATALOG_META: CatalogEntry[] = [
  {
    slug: 'display',
    name: 'Display',
    description:
      'Display modes, box sizing, positioning, inset offsets, stacking, and overflow from Tailwind’s core layout utilities.',
    props: [
      u('block', 'display: block', 'Block-level box.'),
      u('inline-block', 'display: inline-block', 'Flows inline, accepts block sizing.'),
      u('flex', 'display: flex', 'Flex formatting context.'),
      u('inline-flex', 'display: inline-flex', 'Inline flex container.'),
      u('grid', 'display: grid', 'Grid formatting context.'),
      u('inline-grid', 'display: inline-grid', 'Inline grid container.'),
      u('hidden', 'display: none', 'Remove from layout (still in DOM).'),
      u('box-border', 'box-sizing: border-box', 'Include padding/border in width.'),
      u('box-content', 'box-sizing: content-box', 'Width excludes padding/border.'),
      u('static', 'position: static', 'Normal document flow.'),
      u('relative', 'position: relative', 'Offset relative to normal position.'),
      u('absolute', 'position: absolute', 'Positioned against containing block.'),
      u('fixed', 'position: fixed', 'Relative to viewport.'),
      u('sticky', 'position: sticky', 'Sticky within scroll container.'),
      u('inset-*', 'top/right/bottom/left', 'Placement after positioning.'),
      u('z-*', 'z-index from theme', 'Stacking context order.'),
      u('overflow-*', 'visible | hidden | auto | scroll', 'Axis overflow behavior.'),
    ],
  },
  {
    slug: 'flexbox',
    name: 'Flexbox',
    description:
      'One-dimensional layouts: direction, wrapping, alignment, and gap. All classes are core Tailwind flex utilities.',
    props: [
      u('flex', 'display: flex', 'Create flex container.'),
      u('flex-row / flex-col', 'flex-direction', 'Main axis direction.'),
      u('flex-wrap', 'flex-wrap: wrap', 'Allow wrapping.'),
      u('flex-1', 'flex: 1 1 0%', 'Grow and shrink equally.'),
      u('grow / shrink-*', 'flex-grow / flex-shrink', 'Growth rules.'),
      u('justify-*', 'justify-content', 'Main-axis alignment.'),
      u('items-*', 'align-items', 'Cross-axis alignment for lines.'),
      u('self-*', 'align-self', 'Override for single item.'),
      u('gap-*', 'gap from spacing scale', 'Gutters between items.'),
    ],
  },
  {
    slug: 'grid',
    name: 'Grid',
    description:
      'Two-dimensional layouts using CSS Grid: columns, rows, spans, and gaps from Tailwind’s grid utilities.',
    props: [
      u('grid', 'display: grid', 'Grid container.'),
      u('grid-cols-*', 'grid-template-columns', 'Column tracks.'),
      u('grid-rows-*', 'grid-template-rows', 'Row tracks.'),
      u('col-span-*', 'grid-column: span', 'Span columns.'),
      u('row-span-*', 'grid-row: span', 'Span rows.'),
      u('col-start-* / end-*', 'grid-column placement', 'Line-based placement.'),
      u('gap-* / gap-x-* / gap-y-*', 'gap', 'Track gutters.'),
      u('auto-cols-* / auto-rows-*', 'grid-auto-columns/rows', 'Implicit tracks.'),
    ],
  },
  {
    slug: 'spacing',
    name: 'Spacing',
    description:
      'Padding, margin, and space-between utilities mapped to your theme spacing scale (default rem-based steps).',
    props: [
      u('p-*', 'padding all sides', 'Uses spacing scale.'),
      u('px-* / py-* / pt-* …', 'per-side padding', 'Logical sides supported where applicable.'),
      u('m-*', 'margin all sides', 'Including auto where defined.'),
      u('-m-*', 'negative margin', 'Pull layout outward.'),
      u('space-x-* / space-y-*', 'child margin trick', 'Uniform gaps in stacks or rows.'),
    ],
  },
  {
    slug: 'sizing',
    name: 'Sizing',
    description:
      'Width, height, and min/max constraints. Fractional widths, viewport units, and content keywords ship with Tailwind.',
    props: [
      u('w-* / min-w-* / max-w-*', 'width', 'Includes fraction, screen, max-w-prose, etc.'),
      u('h-* / min-h-* / max-h-*', 'height', 'Includes screen, min-h-screen, etc.'),
      u('size-*', 'width + height', 'Square dimensions shorthand (v4).'),
    ],
  },
  {
    slug: 'typography',
    name: 'Typography',
    description:
      'UDS type scale and weights as CSS variables (`uds-tokens.css`) and Tailwind utilities (`uds-typography-theme.css`). Prefer `font-sans` with `text-uds-*` / `font-uds-*` for UI.',
    props: [
      u('text-uds-10 … text-uds-128', 'font-size + line-height', 'UDS type scale; default line from paired `--uds-line-*`.'),
      u('leading-uds-10 … leading-uds-128', 'line-height', 'UDS line tokens only.'),
      u('font-uds-regular … font-uds-bold', 'font-weight', 'Maps to `--uds-font-weight*`.'),
      u('font-uds', 'font-family', 'Explicit `--uds-font-family` (Inter); usually use `font-sans` instead.'),
      u('--uds-font-size-* / --uds-line-*', 'tokens', 'Underlying primitives; responsive overrides in uds-tokens.css.'),
      u('font-sans / tracking-* / text-*', 'Tailwind', 'UI stack and fine-tuning alongside UDS.'),
    ],
  },
  {
    slug: 'surfaces',
    name: 'Surfaces',
    description:
      'Semantic surface, border, and text colors from UDS (`uds-tokens.css`) with first-class utilities (`uds-semantic-colors-theme.css`), plus radius via arbitrary values such as `rounded-[var(--uds-radius-12)]`.',
    props: [
      u(
        'bg-uds-surface-*',
        'background-color',
        'primary, secondary, tertiary, quaternary, disabled, inverse, transparent, brand-primary … quaternary.',
      ),
      u(
        'text-uds-text-*',
        'color',
        'primary … quaternary, disabled, placeholder, inverse, brand-*, link-primary-*, link-secondary-* states.',
      ),
      u(
        'border-uds-border-* / ring-uds-focus-ring-border',
        'border / ring color',
        'Semantic borders plus focus ring color token.',
      ),
      u(
        'rounded-[var(--uds-radius-12)]',
        'border-radius',
        'Use any `--uds-radius-*` step from the token scale (e.g. 8, 12, 16).',
      ),
      u('bg-gradient-to-* + from-/to-', 'linear-gradient', 'Optional gradients on top of base surfaces.'),
    ],
  },
  {
    slug: 'borders',
    name: 'Borders',
    description:
      'Border width, color, style, radius, and divide-* for sibling separators—all core Tailwind.',
    props: [
      u('border / border-*', 'border-width', 'Side-specific widths.'),
      u('border-*', 'border-color', 'Theme color + opacity.'),
      u('rounded-*', 'border-radius', 'Radius scale + full pill.'),
      u('divide-x / divide-y', 'border between children', 'Stacked list separators.'),
    ],
  },
  {
    slug: 'brand-navigation-menus',
    name: 'Brands',
    description:
      'Primary sidebar / app menu items per brand from the UDS AI contract (`uds.ai.brand-menus`). Labels and Phosphor icon names are defined in `brand-menus.json`; apps map rows to Menu `navItems` and supply routing in code.',
    props: [
      u(
        'label',
        'string',
        'Display text for the nav item in the contract JSON.',
      ),
      u(
        'icon',
        'Phosphor name',
        'Icon identifier (e.g. Layout, Briefcase); in app UI render with `<Icon name="LayoutIcon" />` (or the matching `…Icon` export name) from `@chghealthcare/unified-design-system`, not from `@phosphor-icons/react` directly.',
      ),
      u(
        'children',
        'optional array',
        'Nested menu entries when the contract specifies sub-items (e.g. Documents → Credentialing, Financial).',
      ),
      u(
        'path / handler',
        'app-defined',
        'Not in the contract; wire in application routing after loading `brand-menus.json`.',
      ),
    ],
  },
  {
    slug: 'colors',
    name: 'Colors',
    description:
      'Base fills (`--uds-color-black`, `--uds-color-white`, `--uds-color-transparent`), brand ramps, UDS neutrals, and accent scales (`--brand-*`, `--uds-color-neutrals-*`, `--uds-color-accent-*`), composed with Tailwind arbitrary values. Brand values respect `[data-brand]` / `.brand-*` on an ancestor.',
    props: [
      u(
        'bg-[var(--uds-color-black)]',
        'background-color',
        'Canonical system black; pair with `text-[var(--uds-color-white)]` on inverse chips where needed.',
      ),
      u(
        'bg-[var(--uds-color-white)]',
        'background-color',
        'Canonical system white; use bordered previews in dark UI so edges stay visible.',
      ),
      u(
        'bg-[var(--uds-color-transparent)]',
        'background-color',
        'Tokenized transparent fill (`system-color-transparent`); same pattern for borders via `--uds-border-transparent`.',
      ),
      u(
        'bg-[var(--brand-primary-500)]',
        'background-color',
        'Roles: primary, secondary, tertiary, quaternary. Steps 25–900 (example shows primary / 500).',
      ),
      u(
        'bg-[var(--uds-color-neutrals-500)]',
        'background-color',
        'Shared neutral ramp: 25, 50, 100–900, 1000. `var(--uds-color-neutrals)` equals 500.',
      ),
      u(
        'bg-[var(--uds-color-accent-emerald-500)]',
        'background-color',
        '17 accent hues; steps through 1000. Use the same var() pattern for text, border, and fill.',
      ),
      u(
        'text-[var(--uds-color-blue)]',
        'color',
        'Named aliases (e.g. chart helpers) live alongside the accent scales in UDS tokens.',
      ),
      u('bg-accent', 'background-color', 'shadcn semantic pair with `text-accent-foreground`; mapped in `index.css`.'),
    ],
  },
  {
    slug: 'effects',
    name: 'Effects',
    description:
      'Box shadows, ring utilities (focus rings), and opacity—all included with the default Tailwind build.',
    props: [
      u('shadow-*', 'box-shadow', 'SM … 2XL, inner, none'),
      u('ring / ring-*', 'box-shadow ring', 'Focus ring without extra elements.'),
      u('opacity-*', 'opacity', '0–100 scale.'),
    ],
  },
  {
    slug: 'filters',
    name: 'Filters',
    description:
      'Backdrop and element filters: blur, brightness, contrast, and composable filter utilities from Tailwind.',
    props: [
      u('blur-* / backdrop-blur-*', 'filter: blur()', 'Gaussian blur strength.'),
      u('brightness-* / contrast-*', 'filter adjustments', 'Per utility family.'),
      u('grayscale / invert / saturate-*', 'color filters', 'Photo-style adjustments.'),
      u('drop-shadow-*', 'filter: drop-shadow()', 'Per-channel shadow for PNG/SVG.'),
    ],
  },
  {
    slug: 'transforms',
    name: 'Transforms',
    description:
      'Translate, rotate, scale, and skew using transform utilities; GPU-friendly defaults.',
    props: [
      u('translate-x-* / translate-y-*', 'translate', 'Pixel, fraction, full.'),
      u('rotate-*', 'rotate', 'Degrees including negative.'),
      u('scale-*', 'scale', 'Uniform or x/y variants.'),
      u('skew-x-* / skew-y-*', 'skew', 'Shear transforms.'),
      u('origin-*', 'transform-origin', 'Pivot point.'),
    ],
  },
  {
    slug: 'transitions-animation',
    name: 'Transitions & animation',
    description:
      'Transition property, duration, easing, delay, plus keyframe `animate-*` utilities bundled with Tailwind.',
    props: [
      u('transition / transition-*', 'transition-property', 'colors, shadow, transform, all, none'),
      u('duration-*', 'transition-duration', 'Theme milliseconds.'),
      u('ease-*', 'transition-timing-function', 'linear, in, out, in-out'),
      u('delay-*', 'transition-delay', 'Stagger motion.'),
      u('animate-*', '@keyframes', 'spin, ping, pulse, bounce, arbitrary'),
    ],
  },
  {
    slug: 'interactivity',
    name: 'Interactivity',
    description:
      'Cursor, pointer events, user select, scroll behavior, and snap—interaction utilities from core Tailwind.',
    props: [
      u('cursor-*', 'cursor', 'pointer, wait, not-allowed, …'),
      u('pointer-events-*', 'pointer-events', 'none | auto'),
      u('select-*', 'user-select', 'none | text | all'),
      u('scroll-*', 'scroll-behavior / snap', 'Smooth scroll and snap align.'),
    ],
  },
  {
    slug: 'tables',
    name: 'Tables',
    description:
      'Table layout, border collapse, and caption side utilities for semantic `<table>` markup.',
    props: [
      u('table / table-row / table-cell', 'display table roles', 'Structure helpers.'),
      u('border-collapse / border-separate', 'border-collapse', 'Cell border model.'),
      u('caption-top / caption-bottom', 'caption-side', 'Caption placement.'),
    ],
  },
  {
    slug: 'iconography',
    name: 'Iconography',
    description:
      'Fill, stroke, and sizing hooks for inline SVG—part of Tailwind’s iconography-related utilities. Example icons use Phosphor (`@phosphor-icons/react`) behind `Icon`: import from `@chghealthcare/unified-design-system` and pass the registry key as `name` (e.g. `<Icon name="MagnifyingGlassIcon" … />`) so a future vendor swap stays inside the design system.',
    props: [
      u('fill-*', 'fill', 'Current or theme colors.'),
      u('stroke-* (color)', 'stroke', 'Stroke paint from theme.'),
      u('stroke-0 … stroke-2', 'stroke-width', 'Built-in width tokens.'),
      u('size-*', 'width + height', 'Square icon sizing.'),
    ],
  },
  {
    slug: 'accessibility',
    name: 'Accessibility',
    description:
      'Screen-reader-only text (`sr-only`) and forced-colors utilities. Compose with package `Button` — use `aria-label` for icon-only actions, or nest `<span className="sr-only">` for extra AT copy beside a visible label.',
    props: [
      u('sr-only / not-sr-only', 'visually hidden', 'Available to AT only — nest inside Button children when needed.'),
      u('aria-label', 'accessible name', 'Preferred for icon-only Button (`size="icon"`).'),
      u('forced-color-adjust-*', 'forced-color-adjust', 'Respect system contrast themes.'),
    ],
  },
]
