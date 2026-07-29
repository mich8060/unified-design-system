import * as React from "react"

import { cn } from "@/lib/utils"
import { CaretRightIcon } from "@/components/ui/uds-icons"

export const EVENT_CARD_COLORS = [
  "sky",
  "emerald",
  "red",
  "amber",
  "aqua",
  "blue",
  "cyan",
  "fuchsia",
  "green",
  "indigo",
  "lime",
  "magenta",
  "orange",
  "purple",
  "rose",
  "violet",
  "yellow",
] as const

export type EventCardColor = (typeof EVENT_CARD_COLORS)[number]

function eventCardAccentStyle(color: EventCardColor): React.CSSProperties {
  return {
    backgroundColor: `var(--uds-color-accent-${color}-${color === "sky" ? 50 : 25})`,
    borderColor: `var(--uds-color-accent-${color}-700)`,
  }
}

export interface EventCardProps
  extends Omit<React.ComponentProps<"div">, "title"> {
  /** Left-border and background accent color. */
  color?: EventCardColor
  /** Bold heading line (e.g. a location or vendor name). */
  title: React.ReactNode
  /** Right-aligned slot — an icon, a label, a badge, or any combination of components. */
  type?: React.ReactNode
  /** Detail rows rendered under the title (address, times, route, etc.). */
  children?: React.ReactNode
}

function EventCard({
  color = "sky",
  title,
  type,
  className,
  children,
  style,
  ...props
}: EventCardProps) {
  return (
    <div
      data-slot="event-card"
      data-color={color}
      className={cn(
        "flex w-full items-start gap-2 rounded-[length:var(--uds-radius-4)] border-solid border-l-[length:var(--uds-border-width-6)] py-2 pr-2 pl-6",
        className,
      )}
      style={{ ...eventCardAccentStyle(color), ...style }}
      {...props}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-0 text-uds-14">
        <p className="truncate font-uds-bold text-[color:var(--uds-text-primary)]">
          {title}
        </p>
        {children}
      </div>
      {type != null ? (
        <div className="flex shrink-0 items-center gap-2">{type}</div>
      ) : null}
    </div>
  )
}

/** A single detail line under the title (address, hours, "Departure: 11:14am", etc.). */
function EventCardDetail({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="event-card-detail"
      className={cn("text-uds-14 text-[color:var(--uds-text-secondary)]", className)}
      {...props}
    />
  )
}

/** A "from → to" route line, used for flight-style itineraries. */
function EventCardRoute({
  from,
  to,
  className,
}: {
  from: React.ReactNode
  to: React.ReactNode
  className?: string
}) {
  return (
    <div
      data-slot="event-card-route"
      className={cn(
        "flex items-center gap-1.5 text-uds-14 text-[color:var(--uds-text-secondary)]",
        className,
      )}
    >
      <span className="whitespace-nowrap">{from}</span>
      <CaretRightIcon className="size-5 shrink-0" />
      <span className="whitespace-nowrap">{to}</span>
    </div>
  )
}

/** A right-aligned label + icon pair for the `type` slot (e.g. "On Call" + a phone icon). */
function EventCardTypeLabel({
  icon,
  children,
  className,
}: {
  icon: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <>
      <span
        className={cn(
          "w-21 text-right text-uds-14 text-[color:var(--uds-text-secondary)]",
          className,
        )}
      >
        {children}
      </span>
      <span className="flex size-5 shrink-0 items-center justify-center text-[color:var(--uds-text-secondary)] [&_svg]:size-5">
        {icon}
      </span>
    </>
  )
}

export {
  EventCard,
  EventCardDetail,
  EventCardRoute,
  EventCardTypeLabel,
}
