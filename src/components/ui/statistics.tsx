import * as React from "react"

import { Link } from "@/components/ui/link"
import { Text } from "@/components/ui/text"
import { cn } from "@/lib/utils"

/**
 * Statistic card — a single metric surface (not a grid wrapper).
 * Compose: StatisticTitle (label + optional Medallion) → StatisticValue → StatisticFooter.
 */
function StatisticCard({ className, ...props }: React.ComponentProps<"article">) {
  return (
    <article
      data-slot="statistic-card"
      className={cn(
        "flex min-w-0 flex-1 flex-col gap-[length:var(--uds-gap-12)] overflow-hidden rounded-[length:var(--uds-radius-8)] border border-uds-border-primary bg-uds-surface-primary p-[length:var(--uds-spacing-24)]",
        className,
      )}
      {...props}
    />
  )
}

/** Title row + value block. */
function StatisticHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="statistic-header"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  )
}

/** Label + optional medallion. */
function StatisticTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="statistic-title"
      className={cn(
        "flex w-full items-start gap-[length:var(--uds-gap-16)]",
        className,
      )}
      {...props}
    />
  )
}

function StatisticLabel({
  className,
  ...props
}: React.ComponentProps<typeof Text>) {
  return (
    <Text
      data-slot="statistic-label"
      variant="body"
      size="14"
      weight="semibold"
      appearance="primary"
      className={cn("min-w-0 flex-1", className)}
      {...props}
    />
  )
}

/** Primary metric — display/48/bold. */
function StatisticValue({
  className,
  ...props
}: React.ComponentProps<typeof Text>) {
  return (
    <Text
      data-slot="statistic-value"
      variant="display"
      size="48"
      weight="bold"
      appearance="primary"
      className={className}
      {...props}
    />
  )
}

function StatisticFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="statistic-footer"
      className={cn(
        "flex w-full items-center justify-between gap-[length:var(--uds-gap-12)]",
        className,
      )}
      {...props}
    />
  )
}

function StatisticDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text>) {
  return (
    <Text
      data-slot="statistic-description"
      variant="body"
      size="14"
      weight="regular"
      appearance="primary"
      className={cn("min-w-0", className)}
      {...props}
    />
  )
}

/** @deprecated Prefer `StatisticDescription`. */
const StatisticHint = StatisticDescription

function StatisticAction({
  className,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Link
      data-slot="statistic-action"
      appearance="primary"
      className={cn("shrink-0", className)}
      {...props}
    />
  )
}

export {
  StatisticAction,
  StatisticCard,
  StatisticDescription,
  StatisticFooter,
  StatisticHeader,
  StatisticHint,
  StatisticLabel,
  StatisticTitle,
  StatisticValue,
}
