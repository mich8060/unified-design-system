"use client"

import * as React from "react"
import {
  Month as MonthPrimitive,
  MonthCaption as MonthCaptionPrimitive,
  MonthGrid as MonthGridPrimitive,
  Nav as NavPrimitive,
  useDayPicker,
} from "react-day-picker"
import { CaretDownIcon } from "@phosphor-icons/react/CaretDown"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export const CALENDAR_YEAR_GRID_PAGE_SIZE = 12

export type CalendarPickerGridSurface = "days" | "months" | "years"

export type CalendarYearGridContextValue = {
  enabled: boolean
  gridSurface: CalendarPickerGridSurface
  setGridSurface: (surface: CalendarPickerGridSurface) => void
  yearPageStart: number
  setYearPageStart: React.Dispatch<React.SetStateAction<number>>
  monthPickerYear: number
  setMonthPickerYear: React.Dispatch<React.SetStateAction<number>>
}

export const CalendarYearGridContext =
  React.createContext<CalendarYearGridContextValue | null>(null)

export const CalendarMonthDisplayIndexContext = React.createContext(0)

export function useCalendarYearGrid(): CalendarYearGridContextValue | null {
  return React.useContext(CalendarYearGridContext)
}

export function alignYearPageStart(
  centerYear: number,
  minYear: number,
  maxYear: number,
  pageSize: number
): number {
  let start = Math.floor(centerYear / pageSize) * pageSize
  const maxStart = Math.max(minYear, maxYear - pageSize + 1)
  start = Math.max(minYear, Math.min(start, maxStart))
  return start
}

function yearBounds(dayPickerProps: {
  startMonth?: Date
  endMonth?: Date
}): { minYear: number; maxYear: number } {
  const minYear = dayPickerProps.startMonth?.getFullYear() ?? 1900
  const maxYear = dayPickerProps.endMonth?.getFullYear() ?? 2100
  return { minYear, maxYear }
}

/** True when every day in that calendar month is outside [startMonth, endMonth]. */
function monthOutsideRange(
  year: number,
  monthIndex: number,
  startMonth?: Date,
  endMonth?: Date
): boolean {
  if (!startMonth && !endMonth) return false
  const first = new Date(year, monthIndex, 1)
  const last = new Date(year, monthIndex + 1, 0, 23, 59, 59, 999)
  if (startMonth) {
    const s = new Date(startMonth.getFullYear(), startMonth.getMonth(), 1)
    if (last < s) return true
  }
  if (endMonth) {
    const e = new Date(endMonth.getFullYear(), endMonth.getMonth() + 1, 0, 23, 59, 59, 999)
    if (first > e) return true
  }
  return false
}

function yearHasSelectableMonth(
  year: number,
  startMonth?: Date,
  endMonth?: Date
): boolean {
  for (let m = 0; m < 12; m++) {
    if (!monthOutsideRange(year, m, startMonth, endMonth)) return true
  }
  return false
}

function dateFromSelection(selected: unknown): Date | undefined {
  if (selected instanceof Date) return selected
  if (selected && typeof selected === "object" && "from" in selected) {
    const from = (selected as { from?: unknown }).from
    if (from instanceof Date) return from
  }
  return undefined
}

export function YearGridNav(props: React.ComponentProps<typeof NavPrimitive>) {
  const ctx = useCalendarYearGrid()
  const { components, classNames, dayPickerProps } = useDayPicker()

  if (!ctx?.enabled || ctx.gridSurface === "days") {
    return <NavPrimitive {...props} />
  }

  const { startMonth, endMonth } = dayPickerProps

  if (ctx.gridSurface === "months") {
    const y = ctx.monthPickerYear
    const canPrev = yearHasSelectableMonth(y - 1, startMonth, endMonth)
    const canNext = yearHasSelectableMonth(y + 1, startMonth, endMonth)

    const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      if (!canPrev) return
      ctx.setMonthPickerYear((prev) => prev - 1)
    }

    const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      if (!canNext) return
      ctx.setMonthPickerYear((prev) => prev + 1)
    }

    return (
      <nav
        {...props}
        className={cn("pointer-events-auto", props.className)}
        aria-label={props["aria-label"] ?? "Choose month"}
      >
        <button
          type="button"
          className={classNames.button_previous}
          tabIndex={canPrev ? undefined : -1}
          aria-disabled={canPrev ? undefined : true}
          aria-label="Previous year"
          onClick={handlePrev}
        >
          <components.Chevron
            disabled={canPrev ? undefined : true}
            className={classNames.chevron}
            orientation="left"
          />
        </button>
        <button
          type="button"
          className={classNames.button_next}
          tabIndex={canNext ? undefined : -1}
          aria-disabled={canNext ? undefined : true}
          aria-label="Next year"
          onClick={handleNext}
        >
          <components.Chevron
            disabled={canNext ? undefined : true}
            className={classNames.chevron}
            orientation="right"
          />
        </button>
      </nav>
    )
  }

  const { minYear, maxYear } = yearBounds(dayPickerProps)
  const { yearPageStart, setYearPageStart } = ctx
  const page = CALENDAR_YEAR_GRID_PAGE_SIZE

  const prevStart = Math.max(minYear, yearPageStart - page)
  const nextStart = Math.min(Math.max(minYear, maxYear - page + 1), yearPageStart + page)
  const canPrev = prevStart < yearPageStart
  const canNext = nextStart > yearPageStart

  const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!canPrev) return
    setYearPageStart(prevStart)
  }

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!canNext) return
    setYearPageStart(nextStart)
  }

  return (
    <nav
      {...props}
      className={cn("pointer-events-auto", props.className)}
      aria-label={props["aria-label"] ?? "Choose year"}
    >
      <button
        type="button"
        className={classNames.button_previous}
        tabIndex={canPrev ? undefined : -1}
        aria-disabled={canPrev ? undefined : true}
        aria-label="Previous years"
        onClick={handlePrev}
      >
        <components.Chevron
          disabled={canPrev ? undefined : true}
          className={classNames.chevron}
          orientation="left"
        />
      </button>
      <button
        type="button"
        className={classNames.button_next}
        tabIndex={canNext ? undefined : -1}
        aria-disabled={canNext ? undefined : true}
        aria-label="Next years"
        onClick={handleNext}
      >
        <components.Chevron
          disabled={canNext ? undefined : true}
          className={classNames.chevron}
          orientation="right"
        />
      </button>
    </nav>
  )
}

export function YearGridMonth(props: React.ComponentProps<typeof MonthPrimitive>) {
  const ctx = useCalendarYearGrid()
  if (ctx?.enabled && ctx.gridSurface !== "days" && props.displayIndex > 0) {
    return null
  }
  return (
    <CalendarMonthDisplayIndexContext.Provider value={props.displayIndex}>
      <MonthPrimitive {...props} />
    </CalendarMonthDisplayIndexContext.Provider>
  )
}

export function YearGridMonthCaption(
  props: React.ComponentProps<typeof MonthCaptionPrimitive>
) {
  const ctx = useCalendarYearGrid()
  const { calendarMonth, displayIndex, className, style, children, ...rest } = props
  const { dayPickerProps } = useDayPicker()
  const numberOfMonths = dayPickerProps.numberOfMonths ?? 1
  const localeCode = dayPickerProps.locale?.code ?? "en-US"

  if (!ctx?.enabled) {
    return (
      <MonthCaptionPrimitive
        calendarMonth={calendarMonth}
        displayIndex={displayIndex}
        className={className}
        style={style}
        {...rest}
      >
        {children}
      </MonthCaptionPrimitive>
    )
  }

  if (ctx.gridSurface === "years" && displayIndex === 0) {
    const { maxYear } = yearBounds(dayPickerProps)
    const start = ctx.yearPageStart
    const end = Math.min(maxYear, start + CALENDAR_YEAR_GRID_PAGE_SIZE - 1)
    return (
      <MonthCaptionPrimitive
        calendarMonth={calendarMonth}
        displayIndex={displayIndex}
        className={className}
        style={style}
        {...rest}
      >
        <span className="text-sm font-normal text-foreground select-none" role="status" aria-live="polite">
          {start}–{end}
        </span>
      </MonthCaptionPrimitive>
    )
  }

  if (ctx.gridSurface !== "days" && displayIndex > 0) {
    return null
  }

  if (numberOfMonths > 1 && displayIndex > 0) {
    return (
      <MonthCaptionPrimitive
        calendarMonth={calendarMonth}
        displayIndex={displayIndex}
        className={className}
        style={style}
        {...rest}
      >
        {children}
      </MonthCaptionPrimitive>
    )
  }

  if (ctx.gridSurface === "months" && displayIndex === 0) {
    const y = ctx.monthPickerYear
    const openYearPicker = () => {
      const { minYear, maxYear } = yearBounds(dayPickerProps)
      ctx.setYearPageStart(alignYearPageStart(y, minYear, maxYear, CALENDAR_YEAR_GRID_PAGE_SIZE))
      ctx.setGridSurface("years")
    }

    return (
      <MonthCaptionPrimitive
        calendarMonth={calendarMonth}
        displayIndex={displayIndex}
        className={className}
        style={style}
        {...rest}
      >
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-md text-sm font-normal text-foreground select-none underline-offset-2 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
          onClick={openYearPicker}
          aria-label={`Choose year, showing ${y}`}
        >
          {y}
          <CaretDownIcon className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
        </button>
      </MonthCaptionPrimitive>
    )
  }

  const d = calendarMonth.date
  const monthLabel = d.toLocaleString(localeCode, { month: "long" })
  const y = d.getFullYear()

  const openYearPicker = () => {
    const { minYear, maxYear } = yearBounds(dayPickerProps)
    ctx.setYearPageStart(alignYearPageStart(y, minYear, maxYear, CALENDAR_YEAR_GRID_PAGE_SIZE))
    ctx.setGridSurface("years")
  }

  const openMonthPicker = () => {
    ctx.setMonthPickerYear(y)
    ctx.setGridSurface("months")
  }

  const captionBtn =
    "inline-flex items-center gap-1 rounded-md text-sm font-normal text-foreground select-none underline-offset-2 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"

  return (
    <MonthCaptionPrimitive
      calendarMonth={calendarMonth}
      displayIndex={displayIndex}
      className={className}
      style={style}
      {...rest}
    >
      <span className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1" role="presentation">
        <button type="button" className={captionBtn} onClick={openMonthPicker} aria-label={`Choose month, currently ${monthLabel}`}>
          {monthLabel}
          <CaretDownIcon className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
        </button>
        <button type="button" className={captionBtn} onClick={openYearPicker} aria-label={`Choose year, currently ${y}`}>
          {y}
          <CaretDownIcon className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
        </button>
      </span>
    </MonthCaptionPrimitive>
  )
}

export function YearGridMonthGrid(props: React.ComponentProps<typeof MonthGridPrimitive>) {
  const displayIndex = React.useContext(CalendarMonthDisplayIndexContext)
  const ctx = useCalendarYearGrid()
  const { goToMonth, months, dayPickerProps, selected } = useDayPicker()

  if (!ctx?.enabled || ctx.gridSurface === "days") {
    return <MonthGridPrimitive {...props} />
  }

  if (displayIndex !== 0) {
    return null
  }

  const { startMonth, endMonth } = dayPickerProps

  if (ctx.gridSurface === "months") {
    const y = ctx.monthPickerYear
    const { setGridSurface } = ctx
    const localeCode = dayPickerProps.locale?.code ?? "en-US"

    const anchorDate = dateFromSelection(selected)
    const selectedMonthIndex =
      anchorDate && anchorDate.getFullYear() === y ? anchorDate.getMonth() : undefined

    const thisMonth = new Date().getMonth()
    const thisYear = new Date().getFullYear()

    const body = [0, 1, 2].map((row) => (
      <tr key={row}>
        {[0, 1, 2, 3].map((col) => {
          const m = row * 4 + col
          const disabled = monthOutsideRange(y, m, startMonth, endMonth)
          const label = new Date(2000, m, 1).toLocaleString(localeCode, { month: "short" })
          const isSelected = selectedMonthIndex === m
          const isThisMonth = y === thisYear && m === thisMonth

          return (
            <td
              key={m}
              className={cn(
                "relative h-10 min-h-10 border border-uds-border-primary bg-uds-surface-primary p-0 text-center align-middle select-none",
                disabled && "pointer-events-none opacity-40"
              )}
            >
              {!disabled ? (
                <button
                  type="button"
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "size-full min-h-10 w-full rounded-none px-0 text-sm font-medium text-uds-text-secondary shadow-none",
                    isSelected &&
                      "bg-uds-surface-brand-primary text-uds-text-primary",
                    isThisMonth && !isSelected && "font-medium text-uds-text-secondary"
                  )}
                  onClick={() => {
                    goToMonth(new Date(y, m, 1))
                    setGridSurface("days")
                  }}
                >
                  {label}
                </button>
              ) : (
                <span className="flex size-full min-h-10 items-center justify-center text-sm text-uds-text-tertiary">
                  {label}
                </span>
              )}
            </td>
          )
        })}
      </tr>
    ))

    return (
      <table {...props} className={props.className}>
        <tbody>{body}</tbody>
      </table>
    )
  }

  const { minYear, maxYear } = yearBounds(dayPickerProps)
  const anchorMonth = months[0]?.date.getMonth() ?? 0
  const { yearPageStart, setGridSurface } = ctx

  const anchorForYear = dateFromSelection(selected)
  const selectedYear = anchorForYear?.getFullYear()

  const thisYear = new Date().getFullYear()

  const body = [0, 1, 2].map((row) => (
    <tr key={row}>
      {[0, 1, 2, 3].map((col) => {
        const year = yearPageStart + row * 4 + col
        const disabled = year < minYear || year > maxYear
        const isCurrentSelection = selectedYear === year
        const isThisYear = year === thisYear

        return (
          <td
            key={year}
            className={cn(
              "relative h-10 min-h-10 border border-uds-border-primary bg-uds-surface-primary p-0 text-center align-middle select-none",
              disabled && "pointer-events-none opacity-40"
            )}
          >
            {!disabled ? (
              <button
                type="button"
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "size-full min-h-10 w-full rounded-none px-0 text-sm font-medium text-uds-text-secondary shadow-none",
                  isCurrentSelection &&
                    "bg-uds-surface-brand-primary text-uds-text-primary",
                  isThisYear && !isCurrentSelection && "font-medium text-uds-text-secondary"
                )}
                onClick={() => {
                  goToMonth(new Date(year, anchorMonth, 1))
                  setGridSurface("days")
                }}
              >
                {year}
              </button>
            ) : (
              <span className="flex size-full min-h-10 items-center justify-center text-sm text-uds-text-tertiary">
                {year}
              </span>
            )}
          </td>
        )
      })}
    </tr>
  ))

  return (
    <table {...props} className={props.className}>
      <tbody>{body}</tbody>
    </table>
  )
}
