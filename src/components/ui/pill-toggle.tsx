import * as React from "react"
import { Toggle as TogglePrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function PillToggle({
  className,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root>) {
  return (
    <TogglePrimitive.Root
      data-slot="pill-toggle"
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-full border border-uds-border-primary bg-uds-surface-primary px-4 py-2 font-sans text-base font-medium text-uds-text-primary whitespace-nowrap outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:border-[var(--uds-border-brand-quaternary)] data-[state=on]:bg-[var(--uds-surface-brand-quaternary)] data-[state=on]:text-[var(--uds-text-inverse)]",
        className
      )}
      {...props}
    />
  )
}

export { PillToggle }
