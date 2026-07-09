"use client"

import * as React from "react"
import { ClockIcon } from "@phosphor-icons/react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
} from "@/components/ui/input-group"
import { type InputProps } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export type TimeStepInputProps = Omit<
  InputProps,
  "type" | "value" | "defaultValue" | "onChange"
> & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  stepMinutes?: number
  startTime?: string
  endTime?: string
  format12Hour?: boolean
  showTimezone?: boolean
  timezone?: string
  inputClassName?: string
}

type TimeOption = { value: string; label: string }

function parseTimeToMinutes(value: string): number | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value)
  if (!match) return null
  const hours = Number(match[1])
  const minutes = Number(match[2])
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return null
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null
  return hours * 60 + minutes
}

function minutesToValue(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60)
  const m = totalMinutes % 60
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
}

function toLabel(value: string, format12Hour: boolean): string {
  if (!format12Hour) return value
  const parsed = parseTimeToMinutes(value)
  if (parsed == null) return value

  const hours24 = Math.floor(parsed / 60)
  const minutes = parsed % 60
  const suffix = hours24 >= 12 ? "PM" : "AM"
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12
  return `${hours12}:${String(minutes).padStart(2, "0")} ${suffix}`
}

function buildOptions(
  stepMinutes: number,
  startTime: string,
  endTime: string,
  format12Hour: boolean
): TimeOption[] {
  const start = parseTimeToMinutes(startTime) ?? 0
  const end = parseTimeToMinutes(endTime) ?? 23 * 60 + 30
  const safeStep = Math.max(1, Math.floor(stepMinutes))

  if (start > end) return []

  const options: TimeOption[] = []
  for (let minutes = start; minutes <= end; minutes += safeStep) {
    const value = minutesToValue(minutes)
    options.push({ value, label: toLabel(value, format12Hour) })
  }
  return options
}

function TimeStepInput({
  className,
  inputClassName,
  inputSize,
  value,
  defaultValue,
  onValueChange,
  stepMinutes = 30,
  startTime = "08:00",
  endTime = "18:00",
  format12Hour = true,
  showTimezone = false,
  timezone = "EST",
  placeholder = "Select time",
  disabled,
  readOnly,
  ...props
}: TimeStepInputProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "")
  const selectedValue = value ?? internalValue
  const options = React.useMemo(
    () => buildOptions(stepMinutes, startTime, endTime, format12Hour),
    [stepMinutes, startTime, endTime, format12Hour]
  )

  const selectedLabel = selectedValue
    ? toLabel(selectedValue, format12Hour)
    : ""

  const canInteract = !disabled && !readOnly
  const valueTone = selectedLabel ? "text-foreground" : "text-uds-text-disabled"

  return (
    <DropdownMenu>
      <InputGroup inputSize={inputSize} className={cn("w-full min-w-0", className)}>
        <DropdownMenuTrigger asChild disabled={!canInteract}>
          <button
            type="button"
            disabled={disabled}
            className={cn(
              "flex min-w-0 flex-1 items-center justify-center gap-[length:var(--uds-spacing-4)] border-0 bg-transparent px-3 text-left outline-none",
              inputSize === "sm" ? "text-uds-14 leading-uds-14" : "text-uds-16 leading-uds-16",
              canInteract && "cursor-pointer",
              inputClassName,
            )}
            {...props}
          >
            <span className={cn("shrink-0", valueTone)}>
              {selectedLabel || placeholder}
            </span>
            {showTimezone && timezone ? (
              <InputGroupText className={cn("shrink-0 px-0", valueTone)}>
                {timezone}
              </InputGroupText>
            ) : null}
          </button>
        </DropdownMenuTrigger>
        <InputGroupAddon align="inline-end" className="pr-2">
          <InputGroupButton
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label="Open time options"
            disabled={!canInteract}
            className="pointer-events-none text-muted-foreground hover:bg-transparent"
            tabIndex={-1}
          >
            <ClockIcon aria-hidden className="size-4" weight="regular" />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <DropdownMenuContent className="max-h-72 w-[var(--radix-dropdown-menu-trigger-width)] overflow-y-auto">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onSelect={() => {
              if (value === undefined) {
                setInternalValue(option.value)
              }
              onValueChange?.(option.value)
            }}
            className={cn(
              selectedValue === option.value &&
                "bg-accent text-accent-foreground"
            )}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { TimeStepInput }
