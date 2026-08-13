import * as React from "react"

import { cn } from "@/lib/utils"

export type TextareaSize = "default" | "compact"

const TEXTAREA_SIZE_CLASS: Record<TextareaSize, string> = {
  default: "min-h-[120px] text-uds-16 leading-uds-16",
  compact: "min-h-[80px] text-uds-14 leading-uds-14",
}

function Textarea({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"textarea"> & {
  size?: TextareaSize
}) {
  return (
    <textarea
      data-slot="textarea"
      data-size={size}
      className={cn(
        "field-sizing-content w-full min-w-0 resize-y rounded-[length:var(--uds-radius-4)] border border-input bg-[var(--uds-surface-secondary)] px-3 py-2.5 font-uds-regular [font-family:var(--font-inter)] transition-colors outline-none placeholder:text-uds-text-placeholder focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[var(--uds-surface-disabled)] disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        TEXTAREA_SIZE_CLASS[size],
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
