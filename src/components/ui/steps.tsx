import * as React from "react"
import { CheckIcon, WarningIcon, XIcon } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"

export type StepStatus =
  | "complete"
  | "active"
  | "incomplete"
  | "disabled"
  | "error"
  | "warning"
export type StepSize = "default" | "compact"
export type StepsOrientation = "horizontal" | "vertical"

const STEP_MARKER_SIZE_CLASS: Record<StepSize, string> = {
  default: "size-[18px]",
  compact: "size-2",
}

const STEP_MARKER_STATUS_CLASS: Record<StepStatus, string> = {
  complete: "border-transparent bg-[var(--uds-icon-brand-tertiary)] text-white",
  active: "border-[var(--uds-icon-brand-tertiary)] bg-transparent",
  incomplete: "border-[var(--uds-icon-quaternary)] bg-transparent",
  disabled: "border-[var(--uds-icon-quaternary)] bg-transparent",
  error: "border-transparent bg-destructive text-white",
  warning: "border-transparent bg-[var(--uds-system-warning-primary)] text-white",
}

const STEP_STATUS_ICON: Partial<Record<StepStatus, typeof CheckIcon>> = {
  complete: CheckIcon,
  error: XIcon,
  warning: WarningIcon,
}

function Steps({
  className,
  orientation = "horizontal",
  children,
  ...props
}: React.ComponentProps<"ol"> & {
  orientation?: StepsOrientation
}) {
  const items = React.Children.toArray(children).filter(React.isValidElement)
  const count = items.length

  return (
    <ol
      data-slot="steps"
      data-orientation={orientation}
      className={cn(
        "flex",
        orientation === "horizontal" ? "w-full items-start" : "flex-col items-stretch",
        className
      )}
      {...props}
    >
      {items.map((child, index) =>
        React.cloneElement(child as React.ReactElement<StepProps>, {
          key: child.key ?? index,
          orientation,
          hideStartConnector: index === 0,
          hideEndConnector: index === count - 1,
        })
      )}
    </ol>
  )
}

function StepConnector({
  filled,
  orientation,
}: {
  filled: boolean
  orientation: StepsOrientation
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex-1",
        orientation === "horizontal" ? "h-0.5" : "w-0.5",
        filled ? "bg-[var(--uds-icon-brand-tertiary)]" : "bg-[var(--uds-icon-quaternary)]"
      )}
    />
  )
}

type StepProps = React.ComponentProps<"li"> & {
  status?: StepStatus
  size?: StepSize
  orientation?: StepsOrientation
  /** Injected by `Steps` — hides the connector leading into the first step. */
  hideStartConnector?: boolean
  /** Injected by `Steps` — hides the connector leading out of the last step. */
  hideEndConnector?: boolean
}

function Step({
  className,
  status = "incomplete",
  size = "default",
  orientation = "horizontal",
  hideStartConnector = false,
  hideEndConnector = false,
  children,
  ...props
}: StepProps) {
  const Icon = STEP_STATUS_ICON[status]
  const startFilled = status === "complete" || status === "active"
  const endFilled = status === "complete"

  const marker = (
    <div
      data-slot="step-marker"
      className={cn(
        "relative z-10 flex shrink-0 items-center justify-center rounded-full border-2",
        STEP_MARKER_SIZE_CLASS[size],
        STEP_MARKER_STATUS_CLASS[status]
      )}
    >
      {Icon && size === "default" ? (
        <Icon aria-hidden weight="bold" className="size-3" />
      ) : null}
    </div>
  )

  return (
    <li
      data-slot="step"
      data-status={status}
      data-size={size}
      data-orientation={orientation}
      className={cn(
        "group flex",
        orientation === "horizontal" ? "flex-1 flex-col items-center" : "items-stretch gap-3",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex items-center justify-center",
          orientation === "horizontal" ? "w-full" : "h-full flex-col self-stretch"
        )}
      >
        {!hideStartConnector && <StepConnector filled={startFilled} orientation={orientation} />}
        {marker}
        {!hideEndConnector && <StepConnector filled={endFilled} orientation={orientation} />}
      </div>
      {children ? (
        <div
          className={cn(
            orientation === "horizontal"
              ? "mt-2 flex max-w-36 flex-col items-center text-center"
              : "flex flex-col pb-6"
          )}
        >
          {children}
        </div>
      ) : null}
    </li>
  )
}

function StepContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="step-content"
      className={cn("min-w-0", className)}
      {...props}
    />
  )
}

function StepTitle({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="step-title"
      className={cn(
        "font-sans text-uds-16 font-uds-medium leading-uds-16 text-[var(--uds-text-primary)] group-data-[status=disabled]:text-[var(--uds-text-disabled)]",
        className
      )}
      {...props}
    />
  )
}

function StepDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="step-description"
      className={cn(
        "mt-1 font-sans text-uds-14 font-uds-regular leading-uds-14 text-[var(--uds-text-secondary)] group-data-[status=disabled]:text-[var(--uds-text-disabled)]",
        className
      )}
      {...props}
    />
  )
}

export {
  Steps,
  Step,
  StepContent,
  StepDescription,
  StepTitle,
}
