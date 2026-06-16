/**
 * UDS dialog shell (dark scrim, 8px corners on the panel). Use `./dialog` for stock shadcn + easier merges.
 */
import * as React from "react"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { XIcon } from "@phosphor-icons/react"

type DialogSize = "sm" | "md" | "lg" | "xl" | "2xl"

const dialogSizeClasses: Record<DialogSize, string> = {
  sm: "max-w-[calc(100%-2rem)] sm:max-w-[384px]",
  md: "max-w-[calc(100%-2rem)] sm:max-w-[448px]",
  lg: "max-w-[calc(100%-2rem)] sm:max-w-[512px]",
  xl: "max-w-[calc(100%-2rem)] sm:max-w-[576px]",
  "2xl": "max-w-[calc(100%-2rem)] sm:max-w-[672px]",
}

function DialogCloseButton({
  className,
  ...props
}: React.ComponentProps<typeof DialogClose>) {
  return (
    <DialogClose asChild {...props}>
      <Button
        variant="ghost"
        className={cn(
          "absolute top-[7px] right-[7px] size-9 shrink-0 rounded-[length:var(--uds-radius-4)] border border-transparent bg-transparent p-2 text-[var(--uds-text-secondary)] hover:bg-[var(--uds-surface-secondary)]",
          className
        )}
        size="icon-sm"
      >
        <XIcon className="size-4" aria-hidden />
        <span className="sr-only">Close</span>
      </Button>
    </DialogClose>
  )
}

function UdsDialogContent({
  className,
  children,
  size = "md",
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogContent> & {
  /** Panel max width — matches Figma Size axis (384–672px). */
  size?: DialogSize
  showCloseButton?: boolean
}) {
  return (
    <DialogContent
      data-size={size}
      overlayClassName="bg-[var(--uds-scrim-50)]"
      className={cn(
        "group/dialog-content flex flex-col gap-0 overflow-hidden rounded-[length:var(--uds-radius-8)] border border-[var(--uds-border-secondary)] bg-[var(--uds-surface-primary)] p-0 text-[var(--uds-text-primary)] shadow-lg ring-0",
        dialogSizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton ? <DialogCloseButton /> : null}
    </DialogContent>
  )
}

/** Groups header + body with Figma Dialog main padding (p-16, gap-16). */
function UdsDialogMain({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-main"
      className={cn("relative flex w-full flex-col gap-4 p-4", className)}
      {...props}
    />
  )
}

function UdsDialogHeader({
  className,
  ...props
}: React.ComponentProps<typeof DialogHeader>) {
  return (
    <DialogHeader
      className={cn(
        "flex flex-col items-start gap-1 pr-7 text-left",
        className
      )}
      {...props}
    />
  )
}

/** Body slot below the header (Figma Content2). */
function UdsDialogBody({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-body"
      className={cn("flex w-full flex-col gap-4", className)}
      {...props}
    />
  )
}

function UdsDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogTitle>) {
  return (
    <DialogTitle
      className={cn(
        "w-full font-sans text-base font-semibold leading-normal text-[var(--uds-text-primary)] [font-family:var(--font-inter)]",
        className
      )}
      {...props}
    />
  )
}

function UdsDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogDescription>) {
  return (
    <DialogDescription
      className={cn(
        "w-full font-sans text-sm font-normal leading-normal text-[var(--uds-text-tertiary)] [font-family:var(--font-inter)]",
        className
      )}
      {...props}
    />
  )
}

function UdsDialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<typeof DialogFooter> & {
  showCloseButton?: boolean
}) {
  return (
    <DialogFooter
      className={cn(
        "mt-0 flex flex-row items-center justify-end gap-2 border-t border-[var(--uds-border-secondary)] bg-[var(--uds-surface-tertiary)] p-2 sm:flex-row sm:justify-end [&_button]:mt-0",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton ? (
        <DialogClose asChild>
          <Button variant="outline">Close</Button>
        </DialogClose>
      ) : null}
    </DialogFooter>
  )
}

function UdsDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogOverlay>) {
  return (
    <DialogOverlay
      className={cn("bg-[var(--uds-scrim-50)]", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogPortal,
  DialogTrigger,
  DialogCloseButton,
  UdsDialogOverlay as DialogOverlay,
  UdsDialogBody as DialogBody,
  UdsDialogContent as DialogContent,
  UdsDialogDescription as DialogDescription,
  UdsDialogFooter as DialogFooter,
  UdsDialogHeader as DialogHeader,
  UdsDialogMain as DialogMain,
  UdsDialogTitle as DialogTitle,
}
