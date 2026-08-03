"use client"

import * as React from "react"
import { CaretDownIcon } from "@phosphor-icons/react/CaretDown"
import { CaretUpIcon } from "@phosphor-icons/react/CaretUp"
import { CaretLeftIcon } from "@phosphor-icons/react/CaretLeft"
import { CaretRightIcon } from "@phosphor-icons/react/CaretRight"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const

const DAYS_OF_WEEK = ["S", "M", "T", "W", "T", "F", "S"] as const

/** Row height in px — matches collapsed strip and transform steps */
const ROW_HEIGHT_PX = 64

export type MicroCalendarDateData = {
  travel?: boolean
  onAssignment?: boolean
}

export type MicroCalendarProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  /** Selected date (controlled highlight) */
  value?: Date
  /**
   * When set, this calendar day is treated as “today” (today styling and collapsed-week alignment).
   * Omit to use the real current date at first render.
   */
  today?: Date
  /** Month shown in the grid; updates when the user navigates unless you control `month` + `onMonthChange` */
  month?: Date
  /** Called when `month` should change (optional controlled month) */
  onMonthChange?: (month: Date) => void
  onDateSelect?: (date: Date) => void
  unavailableDates?: Date[]
  /** Keys are local `YYYY-MM-DD` strings */
  dateData?: Record<string, MicroCalendarDateData>
  defaultExpanded?: boolean
  showLegend?: boolean
  showExpandCollapse?: boolean
}

function stripTime(d: Date): Date {
  const next = new Date(d)
  next.setHours(0, 0, 0, 0)
  return next
}

function startOfMonth(d: Date): Date {
  return stripTime(new Date(d.getFullYear(), d.getMonth(), 1))
}

function toLocalDateKey(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

function isSameDay(a: Date, b: Date): boolean {
  return stripTime(a).getTime() === stripTime(b).getTime()
}

function TravelGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="19"
      height="16"
      viewBox="0 0 19 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M17.5791 15.4736H0.865265L9.22171 1L17.5791 15.4736Z"
        fill="var(--uds-color-accent-green-100)"
        stroke="var(--uds-color-accent-green-700)"
      />
    </svg>
  )
}

function AssignmentGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle
        cx="8"
        cy="8"
        r="7.5"
        fill="var(--uds-color-accent-blue-100)"
        stroke="var(--uds-color-accent-blue-700)"
      />
    </svg>
  )
}

function MicroCalendar({
  value,
  today: todayProp,
  month: monthProp,
  onMonthChange,
  onDateSelect,
  unavailableDates = [],
  dateData = {},
  defaultExpanded = true,
  showLegend = true,
  showExpandCollapse = true,
  className,
  ...props
}: MicroCalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(() =>
    startOfMonth(monthProp ?? new Date())
  )
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded)

  const today = React.useMemo(
    () => stripTime(todayProp != null ? new Date(todayProp.getTime()) : new Date()),
    [todayProp],
  )

  const monthPropTime = monthProp ? startOfMonth(monthProp).getTime() : null
  const [prevMonthPropTime, setPrevMonthPropTime] = React.useState(monthPropTime)
  if (monthPropTime !== prevMonthPropTime) {
    setPrevMonthPropTime(monthPropTime)
    if (monthPropTime != null) {
      setCurrentMonth(startOfMonth(new Date(monthPropTime)))
    }
  }

  const year = currentMonth.getFullYear()
  const monthIndex = currentMonth.getMonth()

  const firstDay = new Date(year, monthIndex, 1)
  const lastDay = new Date(year, monthIndex + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  const calendarDays = React.useMemo(() => {
    const days: (Date | null)[] = []
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(stripTime(new Date(year, monthIndex, day)))
    }
    const remainder = days.length % 7
    const padEnd = remainder === 0 ? 0 : 7 - remainder
    for (let i = 0; i < padEnd; i++) {
      days.push(null)
    }
    return days
  }, [year, monthIndex, startingDayOfWeek, daysInMonth])

  const setMonth = React.useCallback(
    (next: Date) => {
      const m = startOfMonth(next)
      setCurrentMonth(m)
      onMonthChange?.(m)
    },
    [onMonthChange]
  )

  const isToday = (date: Date | null) => {
    if (!date) return false
    return isSameDay(date, today)
  }

  const isSelected = (date: Date | null) => {
    if (!date || !value) return false
    return isSameDay(date, value)
  }

  const isUnavailable = (date: Date | null) => {
    if (!date) return false
    return unavailableDates.some((u) => isSameDay(stripTime(new Date(u)), date))
  }

  const getDateData = (date: Date | null) => {
    if (!date) return null
    return dateData[toLocalDateKey(date)] ?? null
  }

  const isLastOnAssignmentDay = (date: Date | null, dateIndex: number) => {
    if (!date || !getDateData(date)?.onAssignment) return false
    const next = calendarDays[dateIndex + 1]
    if (next && getDateData(next)?.onAssignment) return false
    return true
  }

  const handleDateClick = (date: Date | null) => {
    if (date && !isUnavailable(date)) {
      onDateSelect?.(date)
    }
  }

  const handlePrevMonth = () => {
    setMonth(new Date(year, monthIndex - 1, 1))
  }

  const handleNextMonth = () => {
    setMonth(new Date(year, monthIndex + 1, 1))
  }

  const isCurrentMonth = React.useMemo(() => {
    return monthIndex === today.getMonth() && year === today.getFullYear()
  }, [monthIndex, year, today])

  const weekOffset = React.useMemo(() => {
    if (isExpanded) return 0
    if (!isCurrentMonth) return 0
    const todayIndex = calendarDays.findIndex((d) => d && isSameDay(d, today))
    if (todayIndex === -1) return 0
    const weekStartIndex = Math.floor(todayIndex / 7) * 7
    return weekStartIndex / 7
  }, [isExpanded, calendarDays, today, isCurrentMonth])

  const numberOfWeeks = Math.ceil(calendarDays.length / 7)

  const expandedHeight = numberOfWeeks * ROW_HEIGHT_PX

  const translateY = !isExpanded && weekOffset > 0 ? -(weekOffset * ROW_HEIGHT_PX) : 0

  const lastRowStart = Math.max(0, calendarDays.length - 7)

  return (
    <div
      data-slot="micro-calendar"
      className={cn(
        "inline-flex w-full min-w-[280px] max-w-[450px] flex-col overflow-hidden rounded-[8px] border border-uds-border-primary bg-[var(--uds-surface-primary)] font-sans",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between border-b border-uds-border-primary px-4 py-3">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="Previous month"
          onClick={handlePrevMonth}
        >
          <CaretLeftIcon aria-hidden className="size-4" weight="bold" />
        </Button>
        <h3 className="m-0 font-sans text-uds-16 font-uds-semibold leading-uds-16 text-[var(--uds-text-primary)]">
          {MONTH_NAMES[monthIndex]} {year}
        </h3>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="Next month"
          onClick={handleNextMonth}
        >
          <CaretRightIcon aria-hidden className="size-4" weight="bold" />
        </Button>
      </div>

      <div className="flex border-b border-uds-border-primary py-2">
        {DAYS_OF_WEEK.map((day, index) => (
          <div
            key={`${day}-${index}`}
            className={cn(
              "flex flex-1 justify-center border-r border-uds-border-primary font-sans text-uds-12 font-uds-medium leading-uds-12 text-[var(--uds-text-secondary)]",
              index === DAYS_OF_WEEK.length - 1 && "border-r-0",
            )}
          >
            {day}
          </div>
        ))}
      </div>

      <div
        key={`grid-${year}-${monthIndex}`}
        className="relative overflow-hidden transition-[height] duration-300 ease-out"
        style={{
          height: isExpanded ? `${expandedHeight}px` : `${ROW_HEIGHT_PX}px`,
        }}
      >
        <div
          className="grid w-full grid-cols-7 bg-[var(--uds-surface-secondary)] transition-transform duration-300 ease-out"
          style={{ transform: `translateY(${translateY}px)` }}
        >
          {calendarDays.map((date, index) => {
            if (!date) {
              return (
                <div
                  key={`empty-${index}`}
                  className={cn(
                    "box-border min-h-16 border-b border-r border-uds-border-primary bg-transparent",
                    (index + 1) % 7 === 0 && "border-r-0",
                    index >= lastRowStart && "border-b-0"
                  )}
                />
              )
            }

            const dateInfo = getDateData(date)
            const travel = Boolean(dateInfo?.travel)
            const onAssignment = Boolean(dateInfo?.onAssignment)
            const unavailable = isUnavailable(date)
            const todayCell = isToday(date)
            const selected = isSelected(date)

            const showAssignmentFirst =
              isLastOnAssignmentDay(date, index) && travel && onAssignment

            const showIcons = travel || onAssignment
            const assignmentOnly = onAssignment && !travel && !selected && !unavailable

            return (
              <button
                key={toLocalDateKey(date)}
                type="button"
                disabled={unavailable}
                aria-label={`${date.getDate()} ${MONTH_NAMES[monthIndex]} ${year}`}
                onClick={() => handleDateClick(date)}
                className={cn(
                  "relative box-border flex min-h-16 flex-col items-center justify-start gap-2 border-b border-r border-uds-border-primary bg-[var(--uds-surface-primary)] px-2 py-2 text-[var(--uds-text-primary)] transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2",
                  !unavailable &&
                    !selected &&
                    (assignmentOnly
                      ? "hover:bg-[var(--uds-surface-primary)]"
                      : "hover:bg-[var(--uds-surface-secondary)]"),
                  (index + 1) % 7 === 0 && "border-r-0",
                  index >= lastRowStart && "border-b-0",
                  unavailable &&
                    "cursor-not-allowed bg-[var(--uds-system-destructive-quaternary)] hover:bg-[var(--uds-system-destructive-quaternary)]",
                  selected &&
                    "bg-[var(--uds-system-action-primary)] text-[var(--uds-text-inverse)] hover:bg-[var(--uds-system-action-primary)]",
                  todayCell &&
                    !selected &&
                    "bg-[var(--uds-system-action-quaternary)] hover:bg-[var(--uds-surface-secondary)]"
                )}
              >
                <span className="relative z-[1] font-sans text-uds-14 font-uds-regular leading-uds-14 [font-family:var(--font-inter)]">
                  {date.getDate()}
                </span>
                {unavailable ? (
                  <span
                    className="pointer-events-none absolute left-0 right-0 top-1/2 z-[2] h-px -translate-y-1/2 bg-[var(--uds-color-accent-red-600)]"
                    aria-hidden
                  />
                ) : null}
                {showIcons ? (
                  <div className="relative z-[1] flex items-center justify-center gap-0.5">
                    {showAssignmentFirst ? (
                      <>
                        {onAssignment ? (
                          <span className="[&_svg]:block [&_svg]:h-4 [&_svg]:w-4">
                            <AssignmentGlyph />
                          </span>
                        ) : null}
                        {travel ? (
                          <span className="[&_svg]:block [&_svg]:h-4 [&_svg]:w-[19px]">
                            <TravelGlyph />
                          </span>
                        ) : null}
                      </>
                    ) : (
                      <>
                        {travel ? (
                          <span className="[&_svg]:block [&_svg]:h-4 [&_svg]:w-[19px]">
                            <TravelGlyph />
                          </span>
                        ) : null}
                        {onAssignment ? (
                          <span className="[&_svg]:block [&_svg]:h-4 [&_svg]:w-4">
                            <AssignmentGlyph />
                          </span>
                        ) : null}
                      </>
                    )}
                  </div>
                ) : null}
              </button>
            )
          })}
        </div>
      </div>

      {showLegend && isExpanded ? (
        <div className="flex flex-row gap-6 border-t border-uds-border-primary px-6 py-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="relative flex size-4 w-8 items-center justify-center border border-uds-border-primary bg-[var(--uds-surface-primary)]" />
              <span className="font-sans text-uds-14 font-uds-regular leading-uds-14 text-[var(--uds-text-primary)]">
                Available
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative flex size-4 w-8 items-center justify-center border border-uds-border-primary bg-[var(--uds-system-destructive-quaternary)]">
                <span className="absolute left-0 right-0 top-1/2 z-[2] h-px -translate-y-1/2 bg-[var(--uds-color-accent-red-600)]" />
              </div>
              <span className="font-sans text-uds-14 font-uds-regular leading-uds-14 text-[var(--uds-text-primary)]">
                Unavailable
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <AssignmentGlyph />
              <span className="font-sans text-uds-14 font-uds-regular leading-uds-14 text-[var(--uds-text-primary)]">
                On Assignment
              </span>
            </div>
            <div className="flex items-center gap-2">
              <TravelGlyph />
              <span className="font-sans text-uds-14 font-uds-regular leading-uds-14 text-[var(--uds-text-primary)]">
                Travel
              </span>
            </div>
          </div>
        </div>
      ) : null}

      {showExpandCollapse ? (
        <button
          type="button"
          className={cn(
            "flex h-8 w-full cursor-pointer items-center justify-center border-t border-uds-border-primary bg-[var(--uds-surface-tertiary)] font-sans text-[var(--uds-text-secondary)] transition-colors",
            "rounded-b-[4px] hover:bg-[var(--uds-surface-secondary)] hover:text-[var(--uds-text-primary)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2"
          )}
          aria-label={isExpanded ? "Collapse calendar" : "Expand calendar"}
          onClick={() => setIsExpanded((e) => !e)}
        >
          {isExpanded ? (
            <CaretUpIcon aria-hidden className="size-4" weight="bold" />
          ) : (
            <CaretDownIcon aria-hidden className="size-4" weight="bold" />
          )}
        </button>
      ) : null}
    </div>
  )
}

/** Compact single-day tile (legacy / dense layouts). */
function MicroCalendarTile({
  className,
  date = new Date(),
  locale = "en-US",
  ...props
}: React.ComponentProps<"div"> & {
  date?: Date
  locale?: string
}) {
  const weekday = date.toLocaleDateString(locale, { weekday: "short" })
  const day = date.toLocaleDateString(locale, { day: "2-digit" })
  const month = date.toLocaleDateString(locale, { month: "short" })

  return (
    <div
      data-slot="micro-calendar-tile"
      className={cn(
        "inline-flex w-16 flex-col overflow-hidden rounded-[8px] border border-uds-border-primary bg-[var(--uds-surface-primary)] text-center",
        className
      )}
      {...props}
    >
      <div className="border-b border-uds-border-primary bg-[var(--uds-surface-secondary)] px-2 py-1 font-sans text-uds-12 font-uds-medium leading-uds-12 text-[var(--uds-text-secondary)]">
        {weekday}
      </div>
      <div className="px-2 py-2 font-sans text-uds-24 font-uds-bold leading-uds-24 text-[var(--uds-text-primary)]">
        {day}
      </div>
      <div className="border-t border-uds-border-primary px-2 py-1 font-sans text-uds-12 font-uds-regular leading-uds-12 text-[var(--uds-text-secondary)]">
        {month}
      </div>
    </div>
  )
}

export { MicroCalendar, MicroCalendarTile }
