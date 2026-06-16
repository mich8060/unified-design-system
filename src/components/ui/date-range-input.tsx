"use client"

import * as React from "react"
import { CalendarBlankIcon } from "@phosphor-icons/react"
import type { DateRange } from "react-day-picker"

import { Calendar } from "@/components/ui/calendar"
import {
  digitsOnly,
  formatRangeDigitsAsTyped,
  rejectNonNumericDateInputKey,
  tryParseUsDateRange,
  useFlipPopoverSide,
} from "@/components/ui/date-picker-field-helpers"
import { Input, type InputProps } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export type DateRangeInputCaptionLayout = NonNullable<
  React.ComponentProps<typeof Calendar>["captionLayout"]
>

export type DateRangeInputYearSelection = NonNullable<
  React.ComponentProps<typeof Calendar>["yearSelection"]
>

export type DateRangeInputProps = Omit<
  InputProps,
  "type" | "value" | "defaultValue" | "onChange"
> & {
  separator?: string
  inputClassName?: string
  range?: DateRange
  defaultRange?: DateRange
  onRangeChange?: (range: DateRange | undefined) => void
  /**
   * Calendar year/month UX. Default `"caption"` uses DayPicker label captions (no month/year `<select>`).
   * Set `"grid"` to match {@link DateInput} (month/year grids and carets).
   */
  yearSelection?: DateRangeInputYearSelection
  /**
   * Forwarded to `Calendar` when `yearSelection` is `"caption"`.
   * Default `label`: month and year are text only; navigate with the calendar arrows.
   */
  captionLayout?: DateRangeInputCaptionLayout
  startMonth?: Date
  endMonth?: Date
}

function formatDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  const year = date.getFullYear()
  return `${month}/${day}/${year}`
}

function formatRange(range: DateRange | undefined, separator: string): string {
  if (!range?.from) return ""
  if (!range.to) return `${formatDate(range.from)}${separator}`
  return `${formatDate(range.from)}${separator}${formatDate(range.to)}`
}

function defaultCalendarStartMonth(): Date {
  const y = new Date().getFullYear()
  return new Date(y - 100, 0, 1)
}

function defaultCalendarEndMonth(): Date {
  const y = new Date().getFullYear()
  return new Date(y + 50, 11, 31)
}

function DateRangeInput({
  className,
  inputClassName,
  separator = " \u2013 ",
  placeholder = "mm/dd/yyyy \u2013 mm/dd/yyyy",
  inputMode = "numeric",
  autoComplete = "off",
  range,
  defaultRange,
  onRangeChange,
  yearSelection = "caption",
  captionLayout = "label",
  startMonth,
  endMonth,
  onFocus,
  onBlur,
  onClick,
  onKeyDown,
  ...props
}: DateRangeInputProps) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const popoverRef = React.useRef<HTMLDivElement>(null)
  const [open, setOpen] = React.useState(false)
  const [internalRange, setInternalRange] = React.useState<DateRange | undefined>(defaultRange)

  const selectedRange = range ?? internalRange

  const [text, setText] = React.useState(() => formatRange(selectedRange, separator))

  const rangeKey = `${selectedRange?.from?.getTime() ?? ""}_${selectedRange?.to?.getTime() ?? ""}`
  React.useEffect(() => {
    setText(formatRange(selectedRange, separator))
  }, [rangeKey, separator, selectedRange])

  const flipSide = useFlipPopoverSide(open, rootRef, popoverRef, { fallbackHeight: 440 })

  React.useEffect(() => {
    if (!open) return

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }

    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)

    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  const commitText = React.useCallback(() => {
    const parsed = tryParseUsDateRange(text, separator)
    if (parsed?.from) {
      if (parsed.to && parsed.from.getTime() > parsed.to.getTime()) {
        setText(formatRange(selectedRange, separator))
        return
      }
      if (range === undefined) {
        setInternalRange(parsed)
      }
      onRangeChange?.(parsed)
      setText(formatRange(parsed, separator))
      return
    }
    if (text.trim() === "") {
      if (range === undefined) {
        setInternalRange(undefined)
      }
      onRangeChange?.(undefined)
      setText("")
      return
    }
    setText(formatRange(selectedRange, separator))
  }, [text, separator, range, onRangeChange, selectedRange])

  const handleRangeTextChange = React.useCallback(
    (raw: string) => {
      const prevDigitLen = digitsOnly(text, 16).length
      const next = formatRangeDigitsAsTyped(raw, separator)
      const nextDigitLen = digitsOnly(next, 16).length
      setText(next)
      if (prevDigitLen === 8 && nextDigitLen === 9) {
        queueMicrotask(() => {
          const el = rootRef.current?.querySelector<HTMLInputElement>("input")
          if (el) {
            el.setSelectionRange(next.length, next.length)
          }
        })
      }
    },
    [separator, text]
  )

  const handleSelect = (nextRange: DateRange | undefined) => {
    if (range === undefined) {
      setInternalRange(nextRange)
    }
    onRangeChange?.(nextRange)

    if (nextRange?.from) {
      setText(formatRange(nextRange, separator))
    }

    if (nextRange?.from && nextRange?.to) {
      setOpen(false)
    }
  }

  return (
    <div ref={rootRef} className={cn("relative w-full", className)}>
      <Input
        type="text"
        value={text}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        onChange={(e) => handleRangeTextChange(e.target.value)}
        onKeyDown={(e) => {
          rejectNonNumericDateInputKey(e)
          onKeyDown?.(e)
        }}
        onFocus={(event) => {
          setOpen(true)
          onFocus?.(event)
        }}
        onBlur={(event) => {
          commitText()
          onBlur?.(event)
        }}
        onClick={(event) => {
          setOpen(true)
          onClick?.(event)
        }}
        className={cn("pr-10", inputClassName)}
        {...props}
      />
      <CalendarBlankIcon
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
      />
      {open ? (
        <div
          ref={popoverRef}
          className={cn(
            "absolute left-0 z-50",
            flipSide === "bottom" ? "top-full mt-2" : "bottom-full mb-2"
          )}
        >
          <Calendar
            mode="range"
            selected={selectedRange}
            onSelect={handleSelect}
            yearSelection={yearSelection}
            captionLayout={yearSelection === "caption" ? captionLayout : "label"}
            startMonth={startMonth ?? defaultCalendarStartMonth()}
            endMonth={endMonth ?? defaultCalendarEndMonth()}
            min={1}
            numberOfMonths={2}
            className="rounded-lg border bg-card"
          />
        </div>
      ) : null}
    </div>
  )
}

export { DateRangeInput }
