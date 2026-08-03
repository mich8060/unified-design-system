"use client"

import * as React from "react"
import { ClockIcon } from "@phosphor-icons/react/Clock"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group"
import { type InputProps } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export type TimeInputProps = Omit<
  InputProps,
  "type" | "value" | "defaultValue" | "onChange"
> & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  period?: "AM" | "PM"
  defaultPeriod?: "AM" | "PM"
  onPeriodChange?: (period: "AM" | "PM") => void
  showTimezone?: boolean
  timezone?: string
  inputClassName?: string
}

function parseTime(value: string): { hours: number; minutes: number } | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value)
  if (!match) return null
  const hours = Number(match[1])
  const minutes = Number(match[2])
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return null
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null
  return { hours, minutes }
}

function to24HourValue(hours12: number, minutes: number, period: "AM" | "PM"): string {
  const safeHours = Math.min(12, Math.max(1, hours12))
  const safeMinutes = Math.min(59, Math.max(0, minutes))
  let hours24 = safeHours % 12
  if (period === "PM") hours24 += 12
  return `${String(hours24).padStart(2, "0")}:${String(safeMinutes).padStart(2, "0")}`
}

function from24HourValue(value: string): {
  hours12: number
  minutes: number
  period: "AM" | "PM"
} | null {
  const parsed = parseTime(value)
  if (!parsed) return null
  const period: "AM" | "PM" = parsed.hours >= 12 ? "PM" : "AM"
  const hours12 = parsed.hours % 12 === 0 ? 12 : parsed.hours % 12
  return { hours12, minutes: parsed.minutes, period }
}

function segmentInputClass(inputSize: InputProps["inputSize"]) {
  return cn(
    "w-7 min-w-0 border-0 bg-transparent p-0 text-center outline-none",
    inputSize === "sm" ? "text-uds-14 leading-uds-14" : "text-uds-16 leading-uds-16",
  )
}

function TimeInput({
  className,
  inputClassName,
  inputSize,
  value,
  defaultValue,
  onValueChange,
  period,
  defaultPeriod = "AM",
  onPeriodChange,
  showTimezone = false,
  timezone = "EST",
  disabled,
  readOnly,
  autoComplete = "off",
  "aria-label": ariaLabel = "Time",
  ...rest
}: TimeInputProps) {
  const initial = from24HourValue(defaultValue ?? "09:30") ?? {
    hours12: 9,
    minutes: 30,
    period: defaultPeriod,
  }

  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "09:30")
  const [internalPeriod, setInternalPeriod] = React.useState(initial.period)
  const selectedValue = value ?? internalValue
  const selectedPeriod = period ?? internalPeriod

  const parsed = from24HourValue(selectedValue) ?? initial
  const [hoursDraft, setHoursDraft] = React.useState(String(parsed.hours12).padStart(2, "0"))
  const [minutesDraft, setMinutesDraft] = React.useState(String(parsed.minutes).padStart(2, "0"))

  const valueSyncKey = `${selectedValue}|${defaultValue ?? ""}|${defaultPeriod}`
  const [prevValueSyncKey, setPrevValueSyncKey] = React.useState(valueSyncKey)
  if (prevValueSyncKey !== valueSyncKey) {
    setPrevValueSyncKey(valueSyncKey)
    const next =
      from24HourValue(selectedValue) ??
      from24HourValue(defaultValue ?? "09:30") ?? {
        hours12: 9,
        minutes: 30,
        period: defaultPeriod,
      }
    setHoursDraft(String(next.hours12).padStart(2, "0"))
    setMinutesDraft(String(next.minutes).padStart(2, "0"))
  }

  const commitSegment = (nextHours: string, nextMinutes: string, nextPeriod = selectedPeriod) => {
    const hoursNum = Number(nextHours)
    const minutesNum = Number(nextMinutes)
    if (!Number.isFinite(hoursNum) || !Number.isFinite(minutesNum)) return
    if (hoursNum < 1 || hoursNum > 12 || minutesNum < 0 || minutesNum > 59) return

    const nextValue = to24HourValue(hoursNum, minutesNum, nextPeriod)
    if (value === undefined) setInternalValue(nextValue)
    if (period === undefined) setInternalPeriod(nextPeriod)
    onValueChange?.(nextValue)
    onPeriodChange?.(nextPeriod)
    setHoursDraft(String(hoursNum).padStart(2, "0"))
    setMinutesDraft(String(minutesNum).padStart(2, "0"))
  }

  const hasValue = Boolean(selectedValue)
  const segmentTone = hasValue ? "text-foreground" : "text-uds-text-disabled"

  return (
    <InputGroup inputSize={inputSize} className={cn("w-full min-w-0", className)} {...rest}>
      <div
        data-slot="input-group-control"
        aria-label={ariaLabel}
        className={cn(
          "uds-input-group-control flex min-w-0 flex-1 items-center gap-[length:var(--uds-spacing-2)] pl-2",
          inputClassName,
        )}
      >
        <input
          type="text"
          inputMode="numeric"
          autoComplete={autoComplete}
          disabled={disabled}
          readOnly={readOnly}
          aria-label={`${ariaLabel} hours`}
          value={hoursDraft}
          onChange={(event) => {
            const next = event.target.value.replace(/\D/g, "").slice(0, 2)
            setHoursDraft(next)
          }}
          onBlur={() => commitSegment(hoursDraft || "12", minutesDraft || "00")}
          className={cn(segmentInputClass(inputSize), segmentTone)}
        />
        <span className="text-muted-foreground" aria-hidden>
          :
        </span>
        <input
          type="text"
          inputMode="numeric"
          autoComplete={autoComplete}
          disabled={disabled}
          readOnly={readOnly}
          aria-label={`${ariaLabel} minutes`}
          value={minutesDraft}
          onChange={(event) => {
            const next = event.target.value.replace(/\D/g, "").slice(0, 2)
            setMinutesDraft(next)
          }}
          onBlur={() => commitSegment(hoursDraft || "12", minutesDraft || "00")}
          className={cn(segmentInputClass(inputSize), segmentTone)}
        />
        <span className="flex shrink-0 items-center gap-[length:var(--uds-spacing-4)]">
          <button
            type="button"
            disabled={disabled || readOnly}
            aria-label={`${ariaLabel} period`}
            onClick={() => {
              const nextPeriod = selectedPeriod === "AM" ? "PM" : "AM"
              commitSegment(hoursDraft || "12", minutesDraft || "00", nextPeriod)
            }}
            className={cn(
              "shrink-0 border-0 bg-transparent p-0",
              segmentTone,
              (disabled || readOnly) && "cursor-default",
            )}
          >
            {selectedPeriod}
          </button>
          {showTimezone && timezone ? (
            <span className={cn("shrink-0", segmentTone)} aria-label={`${ariaLabel} timezone`}>
              {timezone}
            </span>
          ) : null}
        </span>
      </div>
      <InputGroupAddon align="inline-end" className="pr-2">
        <InputGroupButton
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label="Open time picker"
          disabled={disabled || readOnly}
          className="text-muted-foreground hover:bg-transparent"
        >
          <ClockIcon aria-hidden className="size-4" weight="regular" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}

export { TimeInput }
