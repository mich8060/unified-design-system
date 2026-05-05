/**
 * Shared full-bleed doc hero (matches Introduction): band spans the main column edge-to-edge;
 * title block sits in a centered max-width column.
 */
export const docPageHeroBandClassName =
  'relative w-full overflow-hidden border-b border-[color-mix(in_srgb,var(--uds-color-primary-900)_45%,transparent)] bg-[var(--uds-color-primary-700)]'

/** Same horizontal inset as the hero shell — wrap page body so the column aligns with the hero title block. */
export const docPageHorizontalGutterClassName = 'w-full px-8'

export const docPageHeroShellClassName = 'relative w-full px-8 py-12 md:py-16 lg:py-20'

/** Default doc title column (Install, Usage, component docs, foundations). */
export const docPageHeroColumnNarrowClassName = 'mx-auto min-w-0 max-w-4xl lg:max-w-5xl'

/** Introduction hero title column (wider than prose pages). */
export const docPageHeroColumnWideClassName = 'mx-auto min-w-0 max-w-6xl lg:max-w-7xl'
