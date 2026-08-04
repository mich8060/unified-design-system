/**
 * UDS sheet (dark scrim without blur). Use `./sheet` for stock overlay; merges stay smaller.
 */
import * as React from "react"

import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { XIcon } from "@phosphor-icons/react/X"
function SheetCloseButton({
  className,
  ...props
}: React.ComponentProps<typeof SheetClose>) {
  return (
    <SheetClose asChild {...props}>
      <Button
        variant="ghost"
        className={cn("absolute top-3 right-3", className)}
        size="icon-sm"
      >
        <XIcon />
        <span className="sr-only">Close</span>
      </Button>
    </SheetClose>
  )
}

function UdsSheetContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof SheetContent> & {
  showCloseButton?: boolean
}) {
  return (
    <SheetContent
      className={cn("bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg", className)}
      {...props}
    >
      {children}
      {showCloseButton ? <SheetCloseButton /> : null}
    </SheetContent>
  )
}

function UdsSheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetTitle>) {
  return (
    <SheetTitle
      className={cn(
        "font-sans text-uds-16 font-uds-semibold leading-uds-16 [font-family:var(--font-inter)]",
        className
      )}
      {...props}
    />
  )
}

function UdsSheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetDescription>) {
  return (
    <SheetDescription
      className={cn(
        "font-sans text-uds-14 font-uds-regular leading-uds-14 text-uds-text-secondary [font-family:var(--font-inter)]",
        className
      )}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetBody,
  SheetClose,
  SheetOverlay,
  SheetPortal,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
  SheetCloseButton,
  UdsSheetContent as SheetContent,
  UdsSheetDescription as SheetDescription,
  UdsSheetTitle as SheetTitle,
}
