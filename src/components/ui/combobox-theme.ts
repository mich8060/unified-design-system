export const comboboxInputGroupSizeClass = {
  default: "h-11 min-h-11",
  sm: "h-9 min-h-9",
} as const

export const comboboxControlPaddingClass = {
  default: "px-3!",
  sm: "px-2.5!",
} as const

export const comboboxAddonClass =
  "uds-input-group-addon--flush-y h-full shrink-0 px-3"

export const comboboxTriggerClass =
  "inline-flex size-4 shrink-0 items-center justify-center text-[var(--uds-icon-primary)] [&_svg:not([class*='size-'])]:size-4"

export const comboboxContentClass =
  "group/combobox-content relative max-h-(--available-height) w-(--anchor-width) max-w-(--available-width) min-w-[calc(var(--anchor-width)+--spacing(7))] origin-(--transform-origin) overflow-hidden rounded-[length:var(--uds-radius-8)] bg-popover px-0 py-1 text-uds-14 font-uds-regular leading-uds-14 [font-family:var(--font-inter)] [color:var(--popover-foreground)] shadow-md ring-1 ring-foreground/10 duration-100 data-[chips=true]:min-w-(--anchor-width) data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-9 *:data-[slot=input-group]:border-input/30 *:data-[slot=input-group]:bg-input/30 *:data-[slot=input-group]:shadow-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95"

export const comboboxListClass =
  "no-scrollbar max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 overflow-y-auto overscroll-contain data-empty:p-0"

export const comboboxItemClass =
  "relative flex w-full cursor-default items-center gap-1.5 rounded-none py-1.5 pl-3 pr-8 text-uds-14 font-uds-regular leading-uds-14 outline-hidden select-none [&[data-highlighted]:not([data-selected])]:bg-[var(--uds-system-action-quaternary)] [&[data-highlighted]:not([data-selected])]:text-[var(--uds-text-primary)] data-selected:bg-[var(--uds-color-accent-blue-700)] data-selected:text-[var(--uds-text-inverse)] data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-selected:[&_svg]:text-[var(--uds-text-inverse)]"

export const comboboxLabelClass =
  "px-3 py-1.5 text-uds-14 font-uds-semibold leading-uds-14 [font-family:var(--font-inter)] [color:var(--muted-foreground)]"

export const comboboxEmptyClass =
  "hidden w-full justify-center py-2 text-center text-uds-14 font-uds-regular leading-uds-14 text-muted-foreground group-data-empty/combobox-content:flex [font-family:var(--font-inter)]"

export const comboboxSeparatorClass = "my-1 h-px bg-border"

export const comboboxInputGroupShellClass =
  "uds-input-group group/input-group relative flex w-full min-w-0 flex-row flex-nowrap items-center rounded-[length:var(--uds-radius-4)] border transition-colors outline-none"

export const comboboxInputGroupClass =
  "uds-combobox-field box-border w-auto border-[var(--uds-border-secondary)] bg-[var(--uds-surface-secondary)] has-[input:autofill]:bg-[var(--uds-color-primary-25)] has-[input:disabled]:bg-[var(--uds-surface-disabled)]"

export const comboboxTriggerButtonClass =
  "group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent hover:bg-transparent"

export const comboboxChipsClass =
  "flex min-h-8 flex-wrap items-center gap-1 rounded-lg border border-input bg-transparent bg-clip-padding px-2.5 py-1 text-sm transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 has-aria-invalid:border-destructive has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20 has-data-[slot=combobox-chip]:px-1 dark:bg-input/30 dark:has-aria-invalid:border-destructive/50 dark:has-aria-invalid:ring-destructive/40"

export const comboboxChipClass =
  "flex h-[calc(--spacing(5.25))] w-fit items-center justify-center gap-1 rounded-sm bg-muted px-1.5 text-xs font-medium whitespace-nowrap text-foreground has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-data-[slot=combobox-chip-remove]:pr-0"

export const comboboxChipsInputClass = "min-w-16 flex-1 outline-none"
