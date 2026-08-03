"use client"

import * as React from "react"
import { EyeIcon } from "@phosphor-icons/react/Eye"
import { EyeSlashIcon } from "@phosphor-icons/react/EyeSlash"
import { Input, type InputProps } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export type PasswordInputProps = Omit<InputProps, "type"> & {
  inputClassName?: string
  visible?: boolean
  defaultVisible?: boolean
  onVisibleChange?: (visible: boolean) => void
}

function PasswordInput({
  className,
  inputClassName,
  autoComplete = "current-password",
  visible,
  defaultVisible = false,
  onVisibleChange,
  disabled,
  ...props
}: PasswordInputProps) {
  const [internalVisible, setInternalVisible] = React.useState(defaultVisible)
  const isVisible = visible ?? internalVisible

  const handleToggle = () => {
    const nextVisible = !isVisible
    if (visible === undefined) {
      setInternalVisible(nextVisible)
    }
    onVisibleChange?.(nextVisible)
  }

  return (
    <div className={cn("relative w-full", className)}>
      <Input
        type={isVisible ? "text" : "password"}
        autoComplete={autoComplete}
        disabled={disabled}
        className={cn("pr-10", inputClassName)}
        {...props}
      />
      <button
        type="button"
        onClick={handleToggle}
        onMouseDown={(event) => event.preventDefault()}
        aria-label={isVisible ? "Hide password" : "Show password"}
        aria-pressed={isVisible}
        disabled={disabled}
        className="absolute top-1/2 right-2 flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50"
      >
        {isVisible ? (
          <EyeSlashIcon aria-hidden className="size-4" />
        ) : (
          <EyeIcon aria-hidden className="size-4" />
        )}
      </button>
    </div>
  )
}

export { PasswordInput }
