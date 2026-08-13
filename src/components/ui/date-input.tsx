"use client"

import * as React from "react"
import { CalendarBlankIcon } from "@phosphor-icons/react/CalendarBlank"
import { Calendar } from "@/components/ui/calendar"
import {
  formatDigitsAsMmDdYyyy,
  rejectNonNumericDateInputKey,
  tryParseUsDate,
  useFlipPopoverSide,
} from "@/components/ui/date-picker-field-helpers"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { type InputProps } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export type DateInputCaptionLayout = NonNullable<
  React.ComponentProps<typeof Calendar>["captionLayout"]
>

export type DateInputYearSelection = NonNullable<
  React.ComponentProps<typeof Calendar>["yearSelection"]
>

export type DateInputProps = Omit<
  InputProps,
  "type" | "value" | "defaultValue" | "onChange"
> & {
  inputClassName?: string
  date?: Date
  defaultDate?: Date
  onDateChange?: (date: Date | undefined) => void
  /**
   * Year UX: `"grid"` (default) opens a 12-year paged grid when the year is clicked; nav arrows step years in that view.
   * `"caption"` uses react-day-picker caption controls instead (`captionLayout`, e.g. `dropdown-years`).
   */
  yearSelection?: DateInputYearSelection
  /**
   * Calendar caption layout when `yearSelection` is `"caption"`. Ignored for `"grid"` (label caption + year grid).
   */
  captionLayout?: DateInputCaptionLayout
  /** First month shown in the calendar / year bounds (defaults to 100 years before the current year). */
  startMonth?: Date
  /** Last month shown in the calendar / year bounds (defaults to 50 years after the current year). */
  endMonth?: Date
}

function formatDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  const year = date.getFullYear()
  return `${month}/${day}/${year}`
}

function defaultCalendarStartMonth(): Date {
  const y = new Date().getFullYear()
  return new Date(y - 100, 0, 1)
}

function defaultCalendarEndMonth(): Date {
  const y = new Date().getFullYear()
  return new Date(y + 50, 11, 31)
}

function DateInput({
  className,
  inputClassName,
  placeholder = "mm/dd/yyyy",
  inputMode = "numeric",
  autoComplete = "bday",
  inputSize,
  date,
  defaultDate,
  onDateChange,
  yearSelection = "grid",
  captionLayout = "dropdown-years",
  startMonth,
  endMonth,
  onFocus,
  onBlur,
  onClick,
  onKeyDown,
  ...props
}: DateInputProps) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const popoverRef = React.useRef<HTMLDivElement>(null)
  const [open, setOpen] = React.useState(false)
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(defaultDate)
  const selectedDate = date ?? internalDate

  const [text, setText] = React.useState(() => (selectedDate ? formatDate(selectedDate) : ""))

  const selectedKey = selectedDate?.getTime() ?? "none"
  const [prevSelectedKey, setPrevSelectedKey] = React.useState(selectedKey)
  if (prevSelectedKey !== selectedKey) {
    setPrevSelectedKey(selectedKey)
    setText(selectedDate ? formatDate(selectedDate) : "")
  }

  const flipSide = useFlipPopoverSide(open, rootRef, popoverRef, { fallbackHeight: 360 })

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
    const parsed = tryParseUsDate(text)
    if (parsed) {
      if (date === undefined) {
        setInternalDate(parsed)
      }
      onDateChange?.(parsed)
      setText(formatDate(parsed))
      return
    }
    if (text.trim() === "") {
      if (date === undefined) {
        setInternalDate(undefined)
      }
      onDateChange?.(undefined)
      setText("")
      return
    }
    setText(selectedDate ? formatDate(selectedDate) : "")
  }, [text, date, onDateChange, selectedDate])

  const handleSelect = (nextDate: Date | undefined) => {
    if (date === undefined) {
      setInternalDate(nextDate)
    }
    onDateChange?.(nextDate)
    if (nextDate) {
      setText(formatDate(nextDate))
      setOpen(false)
    } else {
      setText("")
    }
  }

  return (
    <div ref={rootRef} className={cn("relative w-full", className)}>
      <InputGroup inputSize={inputSize} className="w-full min-w-0">
        <InputGroupInput
          type="text"
          inputSize={inputSize}
          value={text}
          placeholder={placeholder}
          inputMode={inputMode}
          autoComplete={autoComplete}
          onChange={(e) => setText(formatDigitsAsMmDdYyyy(e.target.value))}
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
          className={cn(
            "placeholder:text-uds-text-placeholder disabled:placeholder:text-uds-text-disabled",
            inputClassName,
          )}
          {...props}
        />
        <InputGroupAddon
          align="inline-end"
          className="uds-input-group-addon--flush-y pointer-events-none"
        >
          <CalendarBlankIcon
            aria-hidden
            className="size-4 shrink-0 text-uds-text-primary"
            weight="regular"
          />
        </InputGroupAddon>
      </InputGroup>
      {open ? (
        <div
          ref={popoverRef}
          className={cn(
            "absolute left-0 z-50",
            flipSide === "bottom" ? "top-full mt-2" : "bottom-full mb-2"
          )}
        >
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            yearSelection={yearSelection}
            captionLayout={yearSelection === "caption" ? captionLayout : "label"}
            startMonth={startMonth ?? defaultCalendarStartMonth()}
            endMonth={endMonth ?? defaultCalendarEndMonth()}
            className="rounded-[length:var(--uds-radius-4)] border bg-card"
          />
        </div>
      ) : null}
    </div>
  )
}

export { DateInput }
