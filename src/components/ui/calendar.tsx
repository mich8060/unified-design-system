"use client"

import * as React from "react"
import {
  DayPicker,
  getDefaultClassNames,
  type CustomComponents,
  type DayButton,
  type Locale,
} from "react-day-picker"

import {
  CALENDAR_YEAR_GRID_PAGE_SIZE,
  CalendarYearGridContext,
  type CalendarPickerGridSurface,
  type CalendarYearGridContextValue,
  YearGridMonth,
  YearGridMonthCaption,
  YearGridMonthGrid,
  YearGridNav,
} from "@/components/ui/calendar-year-grid"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { CaretDownIcon } from "@phosphor-icons/react/CaretDown"
import { CaretLeftIcon } from "@phosphor-icons/react/CaretLeft"
import { CaretRightIcon } from "@phosphor-icons/react/CaretRight"
export type CalendarYearSelection = "caption" | "grid"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  yearSelection = "caption",
  buttonVariant = "ghost",
  locale,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
  yearSelection?: CalendarYearSelection
}) {
  const defaultClassNames = getDefaultClassNames()
  const useYearGrid = yearSelection === "grid"
  const [gridSurface, setGridSurface] = React.useState<CalendarPickerGridSurface>("days")
  const [yearPageStart, setYearPageStart] = React.useState(() => {
    const y = new Date().getFullYear()
    return y - (y % CALENDAR_YEAR_GRID_PAGE_SIZE)
  })
  const [monthPickerYear, setMonthPickerYear] = React.useState(() => new Date().getFullYear())

  const pickerCaptionLayout = useYearGrid ? "label" : captionLayout

  const yearGridContextValue = React.useMemo<CalendarYearGridContextValue>(
    () => ({
      enabled: useYearGrid,
      gridSurface,
      setGridSurface,
      yearPageStart,
      setYearPageStart,
      monthPickerYear,
      setMonthPickerYear,
    }),
    [useYearGrid, gridSurface, yearPageStart, monthPickerYear]
  )

  const mergedComponents = React.useMemo(
    () =>
      ({
      ...(useYearGrid
        ? {
            Nav: YearGridNav,
            Month: YearGridMonth,
            MonthCaption: YearGridMonthCaption,
            MonthGrid: YearGridMonthGrid,
          }
        : {}),
      Root: ({ className, rootRef, ...props }) => {
        return (
          <div
            data-slot="calendar"
            ref={rootRef}
            className={cn("relative", className)}
            {...props}
          />
        )
      },
      Chevron: ({ className, orientation, ...props }) => {
        if (orientation === "left") {
          return (
            <CaretLeftIcon className={cn("size-4", className)} {...props} />
          )
        }

        if (orientation === "right") {
          return (
            <CaretRightIcon className={cn("size-4", className)} {...props} />
          )
        }

        return (
          <CaretDownIcon className={cn("size-4", className)} {...props} />
        )
      },
      DayButton: ({ ...props }) => (
        <CalendarDayButton locale={locale} {...props} />
      ),
      WeekNumber: ({ children, ...props }) => {
        return (
          <td {...props}>
            <div className="flex size-(--cell-size) items-center justify-center text-center">
              {children}
            </div>
          </td>
        )
      },
      ...components,
      }) as Partial<CustomComponents>,
    [useYearGrid, locale, components]
  )

  const picker = (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "group/calendar relative bg-[var(--uds-surface-primary)] text-uds-text-primary shadow-none [--cell-size:2.5rem] in-data-[slot=card-content]:border-0 in-data-[slot=card-content]:bg-[var(--uds-surface-primary)] in-data-[slot=popover-content]:border-0 in-data-[slot=popover-content]:bg-[var(--uds-surface-primary)]",
        props.mode === "range" ? "max-w-[672px]" : "max-w-[320px]",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={pickerCaptionLayout}
      hideWeekdays={useYearGrid && gridSurface !== "days"}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString(locale?.code, { month: "short" }),
        formatWeekdayName: (weekday, _options, dateLib) =>
          weekday.toLocaleDateString(
            dateLib?.options.locale?.code ?? locale?.code ?? "en-US",
            { weekday: "narrow" }
          ),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "relative flex w-full flex-col gap-0 md:flex-row md:gap-[length:var(--uds-gap-32)]",
          props.mode === "range" && [
            "overflow-hidden rounded-[length:var(--uds-radius-4)] border border-uds-border-primary",
            "md:[&:has(>.rdp-nav)>.rdp-month:nth-child(2)]:border-r",
            "md:[&:has(>.rdp-nav)>.rdp-month:nth-child(3)]:border-l",
            "md:[&:not(:has(>.rdp-nav))>.rdp-month:nth-child(1)]:border-r",
            "md:[&:not(:has(>.rdp-nav))>.rdp-month:nth-child(2)]:border-l",
            "[&>.rdp-month]:border-uds-border-primary",
          ],
          defaultClassNames.months
        ),
        month: cn(
          "flex w-full flex-col gap-0 overflow-hidden",
          props.mode !== "range" &&
            "rounded-[length:var(--uds-radius-4)] border border-uds-border-primary",
          defaultClassNames.month
        ),
        nav: cn(
          /* Let clicks reach the caption / year `<select>` in the center; only arrows capture input. */
          "pointer-events-none absolute inset-x-0 top-0 z-20 flex h-10 w-full items-center justify-between gap-1 px-1",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "pointer-events-auto size-8 shrink-0 p-0 text-uds-text-primary select-none aria-disabled:opacity-50",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "pointer-events-auto size-8 shrink-0 p-0 text-uds-text-primary select-none aria-disabled:opacity-50",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "relative z-10 flex h-10 w-full items-center justify-center border-b border-uds-border-primary px-10",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "relative z-10 flex h-10 w-full items-center justify-center gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative z-10 rounded-md",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "absolute inset-0 bg-popover opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "select-none text-sm font-semibold text-uds-text-primary",
          pickerCaptionLayout === "label"
            ? undefined
            : "flex items-center gap-1 rounded-md [&>svg]:size-3.5 [&>svg]:text-uds-text-tertiary",
          defaultClassNames.caption_label
        ),
        month_grid: cn(
          "w-full table-fixed border-collapse bg-uds-surface-primary text-sm [&_tbody_tr:last-child_td]:border-b-0",
          defaultClassNames.month_grid
        ),
        weekdays: cn(defaultClassNames.weekdays),
        weekday: cn(
          "border-b border-r border-uds-border-primary bg-uds-surface-primary py-2 text-center text-xs font-normal text-uds-text-tertiary last:border-r-0",
          defaultClassNames.weekday
        ),
        week: cn(defaultClassNames.week),
        week_number_header: cn(
          "w-(--cell-size) border border-uds-border-primary bg-uds-surface-primary px-0 py-2 text-center text-xs font-normal text-uds-text-tertiary select-none",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "border border-uds-border-primary bg-uds-surface-primary text-xs text-uds-text-tertiary select-none",
          defaultClassNames.week_number
        ),
        day: cn(
          "group/day relative h-10 min-h-10 border-b border-r border-uds-border-primary bg-uds-surface-primary p-0 text-center align-middle select-none last:border-r-0",
          defaultClassNames.day
        ),
        day_button: cn(
          "relative z-10 flex size-full min-h-(--cell-size) w-full flex-col justify-center rounded-none border-0 bg-transparent p-0 text-sm leading-none font-medium text-uds-text-secondary shadow-none !h-full hover:bg-uds-surface-secondary focus-visible:z-20",
          defaultClassNames.day_button
        ),
        range_start: cn(
          "rounded-none bg-transparent bg-none",
          defaultClassNames.range_start
        ),
        range_middle: cn(
          "rounded-none bg-transparent bg-none",
          defaultClassNames.range_middle
        ),
        range_end: cn(
          "rounded-none bg-transparent bg-none",
          defaultClassNames.range_end
        ),
        today: cn(
          "font-medium text-uds-text-secondary",
          defaultClassNames.today
        ),
        outside: cn(
          "bg-uds-surface-tertiary [&_button]:pointer-events-none [&_button]:text-uds-text-primary",
          defaultClassNames.outside
        ),
        disabled: cn(
          "[&_button]:text-uds-text-disabled [&_button]:pointer-events-none",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={mergedComponents}
      {...props}
    />
  )

  if (useYearGrid) {
    return (
      <CalendarYearGridContext.Provider value={yearGridContextValue}>
        {picker}
      </CalendarYearGridContext.Provider>
    )
  }

  return picker
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        className,
        "isolate text-center !h-full max-w-none",
        "group-data-[focused=true]/day:z-20 group-data-[focused=true]/day:border group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50",
        "data-[selected-single=true]:bg-uds-surface-brand-primary data-[selected-single=true]:font-medium data-[selected-single=true]:text-uds-text-primary",
        "data-[range-start=true]:rounded-none data-[range-start=true]:bg-uds-surface-brand-primary data-[range-start=true]:font-medium data-[range-start=true]:text-uds-text-primary",
        "data-[range-end=true]:rounded-none data-[range-end=true]:bg-uds-surface-brand-primary data-[range-end=true]:font-medium data-[range-end=true]:text-uds-text-primary",
        "data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-uds-surface-brand-primary data-[range-middle=true]:font-medium data-[range-middle=true]:text-uds-text-primary"
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
