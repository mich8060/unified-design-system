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
  if (color && icon) {
    return (
      <Medallion
        data-slot="alert-dialog-media"
        size="default"
        color={color}
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

function UdsAlertDialogContent({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof AlertDialogContent> & {
  size?: "default" | "sm"
}) {
  return (
    <AlertDialogContent
      data-size={size}
      overlayClassName="bg-[var(--uds-scrim-50)]"
      className={cn(
        "group/alert-dialog-content flex flex-col gap-0 overflow-hidden rounded-[length:var(--uds-radius-8)] border border-[var(--uds-border-secondary)] bg-[var(--uds-surface-primary)] p-0 text-[var(--uds-text-primary)] shadow-lg ring-0",
        size === "sm" ? "max-w-[320px]" : "max-w-[400px]",
        className
      )}
      {...props}
    />
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
        "flex flex-row justify-end gap-2 border-t border-[var(--uds-border-secondary)] bg-[var(--uds-surface-tertiary)] p-2",
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
        "font-sans text-uds-16 font-uds-semibold leading-uds-16 text-[var(--uds-text-primary)] [font-family:var(--font-inter)]",
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
        "font-sans text-uds-14 font-uds-regular leading-uds-14 text-[var(--uds-text-secondary)] [font-family:var(--font-inter)]",
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

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogPortal,
  AlertDialogTrigger,
  UdsAlertDialogOverlay as AlertDialogOverlay,
  UdsAlertDialogMedia as AlertDialogMedia,
  UdsAlertDialogContent as AlertDialogContent,
  UdsAlertDialogDescription as AlertDialogDescription,
  UdsAlertDialogFooter as AlertDialogFooter,
  UdsAlertDialogHeader as AlertDialogHeader,
  UdsAlertDialogTitle as AlertDialogTitle,
}
