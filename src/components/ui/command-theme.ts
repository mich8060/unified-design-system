export const commandRootClass =
  "flex size-full flex-col overflow-hidden rounded-[length:var(--uds-radius-8)]! bg-popover p-1 text-popover-foreground"

export const commandDialogContentClass =
  "top-1/3 translate-y-0 overflow-hidden rounded-[length:var(--uds-radius-8)]! p-0"

export const commandInputWrapperClass = "p-1 pb-0"

export const commandInputGroupClass =
  "h-8! rounded-[length:var(--uds-radius-4)]! border-[var(--uds-border-secondary)] bg-[var(--uds-surface-secondary)] shadow-none! *:data-[slot=input-group-addon]:pl-2!"

export const commandInputClass =
  "h-full min-h-0 w-full bg-transparent px-2.5 text-uds-14 font-uds-regular leading-uds-14 [font-family:var(--font-inter)] outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"

export const commandListClass =
  "no-scrollbar max-h-72 scroll-py-1 overflow-x-hidden overflow-y-auto rounded-[length:var(--uds-radius-8)] outline-none"

export const commandEmptyClass = "py-6 text-center text-sm"

export const commandGroupClass =
  "overflow-hidden p-1 text-foreground **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground"

export const commandSeparatorClass = "-mx-1 h-px bg-border"

export const commandItemClass =
  "group/command-item relative flex cursor-default items-center gap-2 rounded-[length:var(--uds-radius-2)] px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-selected:bg-muted data-selected:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-selected:*:[svg]:text-foreground"

export const commandShortcutClass =
  "ml-auto text-xs tracking-widest text-muted-foreground group-data-selected/command-item:text-foreground"
