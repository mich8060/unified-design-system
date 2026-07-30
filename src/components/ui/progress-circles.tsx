import * as React from "react"

import { cn } from "@/lib/utils"

export type ProgressCircleProps = React.ComponentProps<"div"> & {
  value: number
  size?: number
  strokeWidth?: number
  label?: React.ReactNode
}

function ProgressCircle({
  className,
  value,
  size = 72,
  strokeWidth = 8,
  label,
  ...props
}: ProgressCircleProps) {
  const clamped = Math.max(0, Math.min(100, value))
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (clamped / 100) * circumference

  return (
    <div
      data-slot="progress-circle"
      className={cn("inline-flex flex-col items-center gap-2", className)}
      {...props}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--uds-surface-quaternary)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--primary)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
        />
      </svg>
      <div className="font-sans text-uds-14 font-uds-medium leading-uds-14 text-[var(--uds-text-primary)]">
        {label ?? `${clamped}%`}
      </div>
    </div>
  )
}

function ProgressCircles({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="progress-circles"
      className={cn("flex flex-wrap items-center gap-4", className)}
      {...props}
    />
  )
}

export { ProgressCircle, ProgressCircles }
