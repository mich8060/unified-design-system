import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { CheckIcon } from "@phosphor-icons/react/Check"
function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer group/checkbox relative flex size-5 shrink-0 items-center justify-center rounded-[length:var(--uds-radius-4)] border border-uds-border-primary bg-uds-surface-primary transition-colors outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[state=checked]:border-uds-border-brand-tertiary data-[state=checked]:bg-uds-surface-brand-tertiary data-[state=checked]:text-[var(--uds-text-inverse)] data-[state=indeterminate]:border-uds-border-brand-tertiary data-[state=indeterminate]:bg-uds-surface-brand-tertiary data-[state=indeterminate]:text-[var(--uds-text-inverse)]",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-3 shrink-0 group-data-[state=indeterminate]/checkbox:hidden" />
        <span
          aria-hidden
          className="absolute left-1/2 top-1/2 hidden h-[2px] w-[10px] -translate-x-1/2 -translate-y-1/2 bg-[var(--uds-icon-inverse)] group-data-[state=indeterminate]/checkbox:block"
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { CheckboxLabel } from "@/components/ui/label"
export { Checkbox }
