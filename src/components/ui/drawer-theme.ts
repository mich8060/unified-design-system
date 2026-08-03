export const drawerOverlayClass =
  "fixed inset-0 z-50 bg-[var(--uds-scrim-50)] data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0"

/**
 * Edge drawers: corner radius always 0 (`rounded-none`).
 * Left/right width is clamped **320–600px** (`min-w-[320px] max-w-[600px]`).
 */
export const drawerContentClass =
  "group/drawer-content fixed z-50 flex flex-col overflow-hidden rounded-none border-uds-border-secondary bg-popover text-sm text-popover-foreground data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:h-auto data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:border-t data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:h-full data-[vaul-drawer-direction=left]:max-h-dvh data-[vaul-drawer-direction=left]:w-full data-[vaul-drawer-direction=left]:min-w-[320px] data-[vaul-drawer-direction=left]:max-w-[600px] data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:h-full data-[vaul-drawer-direction=right]:max-h-dvh data-[vaul-drawer-direction=right]:w-full data-[vaul-drawer-direction=right]:min-w-[320px] data-[vaul-drawer-direction=right]:max-w-[600px] data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:h-auto data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:border-b"

export const drawerHandleClass =
  "mx-auto mt-4 hidden h-1 w-[100px] shrink-0 rounded-full bg-uds-surface-tertiary group-data-[vaul-drawer-direction=bottom]/drawer-content:block"

export const drawerHeaderClass =
  "flex shrink-0 flex-col gap-0.5 border-b border-[var(--uds-border-secondary)] p-[length:var(--uds-spacing-16)] group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-0.5 md:text-left"

/** Scrollable middle region — Required between Header and Footer. */
export const drawerBodyClass =
  "min-h-0 flex-1 overflow-y-auto p-[length:var(--uds-spacing-16)]"

/**
 * Pinned actions. Side drawers: horizontal row. Bottom/top: column stack.
 */
export const drawerFooterClass =
  "mt-auto flex shrink-0 gap-[length:var(--uds-gap-12)] border-t border-[var(--uds-border-secondary)] p-[length:var(--uds-spacing-16)] group-data-[vaul-drawer-direction=left]/drawer-content:flex-row group-data-[vaul-drawer-direction=left]/drawer-content:items-center group-data-[vaul-drawer-direction=left]/drawer-content:[&>button]:flex-1 group-data-[vaul-drawer-direction=right]/drawer-content:flex-row group-data-[vaul-drawer-direction=right]/drawer-content:items-center group-data-[vaul-drawer-direction=right]/drawer-content:[&>button]:flex-1 group-data-[vaul-drawer-direction=bottom]/drawer-content:flex-col group-data-[vaul-drawer-direction=top]/drawer-content:flex-col"

/** Panel title — 16px semibold; never compete with PageHeaderTitle (28). */
export const drawerTitleClass =
  "font-sans text-base font-semibold text-foreground [font-family:var(--font-inter)]"

export const drawerDescriptionClass = "text-sm text-muted-foreground"
