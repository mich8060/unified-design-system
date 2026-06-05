/**
 * UDS-styled alert dialog. Prefer these exports for product UI; keep `./alert-dialog`
 * close to shadcn defaults so registry upgrades are easier to merge.
 */
import * as React from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Medallion, type MedallionColor, type MedallionProps } from "@/components/ui/medallion"
import { cn } from "@/lib/utils"

type AlertDialogSize = "default" | "sm"
type AlertDialogButtons = "multiple" | "single"

const AlertDialogSizeContext = React.createContext<AlertDialogSize>("default")
const AlertDialogButtonsContext = React.createContext<AlertDialogButtons>("multiple")

function resolveAlertDialogSize(size: "default" | "sm" | "compact"): AlertDialogSize {
  return size === "compact" ? "sm" : size
}

function resolveAlertDialogButtons(
  buttons: "multiple" | "single" | "both" | "cancel-only" | "continue-only"
): AlertDialogButtons {
  if (buttons === "single" || buttons === "continue-only") return "single"
  return "multiple"
}

type AlertDialogMediaProps = React.ComponentProps<"div"> & {
  color?: MedallionColor
  icon?: React.ReactNode
  shape?: MedallionProps["shape"]
  tone?: MedallionProps["tone"]
}

function UdsAlertDialogMedia({
  className,
  children,
  color,
  icon,
  shape = "circle",
  tone = "pastel",
  ...props
}: AlertDialogMediaProps) {
  const dialogSize = React.useContext(AlertDialogSizeContext)
  const resolvedColor = color ?? (dialogSize === "sm" ? "amber" : "red")

  if (icon) {
    return (
      <Medallion
        data-slot="alert-dialog-media"
        size="default"
        color={resolvedColor}
        icon={icon}
        shape={shape}
        tone={tone}
        className={className}
      />
    )
  }

  return (
    <div data-slot="alert-dialog-media" className={className} {...props}>
      {children}
    </div>
  )
}

/** Groups title + description in the default (400px) layout per Figma. Omit for compact (320px). */
function UdsAlertDialogCopy({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-copy"
      className={cn("flex w-full flex-col gap-2", className)}
      {...props}
    />
  )
}

function UdsAlertDialogContent({
  className,
  size = "default",
  buttons = "multiple",
  ...props
}: React.ComponentProps<typeof AlertDialogContent> & {
  size?: "default" | "sm" | "compact"
  /** `multiple` — Cancel + Continue; `single` — Continue only (matches Figma Buttons=Single). */
  buttons?: "multiple" | "single" | "both" | "cancel-only" | "continue-only"
}) {
  const resolvedSize = resolveAlertDialogSize(size)
  const resolvedButtons = resolveAlertDialogButtons(buttons)

  return (
    <AlertDialogSizeContext.Provider value={resolvedSize}>
      <AlertDialogButtonsContext.Provider value={resolvedButtons}>
        <AlertDialogContent
          data-size={resolvedSize}
          data-buttons={resolvedButtons}
          overlayClassName="bg-[var(--uds-scrim-50)]"
          className={cn(
            "group/alert-dialog-content flex flex-col gap-0 overflow-hidden rounded-[length:var(--uds-radius-8)] border border-[var(--uds-border-secondary)] bg-[var(--uds-surface-primary)] p-0 text-[var(--uds-text-primary)] shadow-lg ring-0",
            resolvedSize === "sm" ? "max-w-[320px]" : "max-w-[400px]",
            className
          )}
          {...props}
        />
      </AlertDialogButtonsContext.Provider>
    </AlertDialogSizeContext.Provider>
  )
}

function UdsAlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogHeader>) {
  return (
    <AlertDialogHeader
      className={cn(
        "flex flex-col items-start gap-2 p-4 text-left",
        className
      )}
      {...props}
    />
  )
}

function UdsAlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogFooter>) {
  return (
    <AlertDialogFooter
      className={cn(
        "flex flex-row items-start justify-end gap-2 border-t border-[var(--uds-border-secondary)] bg-[var(--uds-surface-tertiary)] p-2",
        className
      )}
      {...props}
    />
  )
}

function UdsAlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogTitle>) {
  return (
    <AlertDialogTitle
      className={cn(
        "w-full font-sans text-base font-semibold leading-normal text-[var(--uds-text-primary)] [font-family:var(--font-inter)]",
        className
      )}
      {...props}
    />
  )
}

function UdsAlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogDescription>) {
  return (
    <AlertDialogDescription
      className={cn(
        "w-full font-sans text-sm font-normal leading-normal text-[var(--uds-text-secondary)] [font-family:var(--font-inter)]",
        className
      )}
      {...props}
    />
  )
}

function UdsAlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogOverlay>) {
  return (
    <AlertDialogOverlay
      className={cn("bg-[var(--uds-scrim-50)]", className)}
      {...props}
    />
  )
}

function UdsAlertDialogCancel({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogCancel>) {
  const buttons = React.useContext(AlertDialogButtonsContext)
  if (buttons === "single") return null

  return (
    <AlertDialogCancel
      className={cn(
        "mt-0 border-[var(--uds-border-primary)] bg-[var(--uds-surface-primary)] text-[var(--uds-button-text-secondary)] hover:bg-[var(--uds-surface-secondary)]",
        className
      )}
      {...props}
    />
  )
}

function UdsAlertDialogAction({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogAction>) {
  return <AlertDialogAction className={cn("mt-0", className)} {...props} />
}

export {
  AlertDialog,
  UdsAlertDialogAction as AlertDialogAction,
  UdsAlertDialogCancel as AlertDialogCancel,
  AlertDialogPortal,
  AlertDialogTrigger,
  UdsAlertDialogOverlay as AlertDialogOverlay,
  UdsAlertDialogMedia as AlertDialogMedia,
  UdsAlertDialogContent as AlertDialogContent,
  UdsAlertDialogCopy as AlertDialogCopy,
  UdsAlertDialogDescription as AlertDialogDescription,
  UdsAlertDialogFooter as AlertDialogFooter,
  UdsAlertDialogHeader as AlertDialogHeader,
  UdsAlertDialogTitle as AlertDialogTitle,
}
