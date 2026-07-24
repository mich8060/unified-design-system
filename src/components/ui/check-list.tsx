import * as React from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

function CheckList({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="check-list"
      className={cn("space-y-2", className)}
      {...props}
    />
  )
}

function CheckListItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="check-list-item"
      className={cn(
        "flex items-start gap-2 rounded-[8px] border border-[var(--uds-border-primary)] bg-[var(--uds-surface-primary)] p-3",
        className
      )}
      {...props}
    />
  )
}

function CheckListControl({
  id,
  checked,
  onCheckedChange,
  label,
  description,
  disabled,
  className,
}: {
  id: string
  checked?: boolean
  onCheckedChange?: (checked: boolean | "indeterminate") => void
  label: React.ReactNode
  description?: React.ReactNode
  disabled?: boolean
  className?: string
}) {
  return (
    <div className={cn("flex items-start gap-3", className)}>
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className="mt-0.5"
      />
      <div className="min-w-0 flex-1">
        <Label htmlFor={id}>{label}</Label>
        {description ? (
          <p className="mt-1 font-sans text-uds-14 font-uds-regular leading-uds-14 text-[var(--uds-text-secondary)]">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  )
}

export { CheckList, CheckListControl, CheckListItem }
