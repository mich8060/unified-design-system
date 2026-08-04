import * as React from "react"
import {
  HoverCard as HoverCardPrimitive,
  Popover as PopoverPrimitive,
} from "radix-ui"

import { cn } from "@/lib/utils"

export type PopoverTriggerMode = "click" | "hover"

const PopoverModeContext = React.createContext<PopoverTriggerMode>("click")

const popoverContentClass =
  "z-50 flex w-72 flex-col gap-2.5 rounded-[length:var(--uds-radius-4)] bg-popover p-2.5 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95"

const popoverOriginClass: Record<PopoverTriggerMode, string> = {
  click: "origin-(--radix-popover-content-transform-origin)",
  hover: "origin-(--radix-hover-card-content-transform-origin)",
}

type PopoverClickProps = { trigger?: "click" } & Omit<
  React.ComponentProps<typeof PopoverPrimitive.Root>,
  "trigger"
>
type PopoverHoverProps = { trigger: "hover" } & React.ComponentProps<
  typeof HoverCardPrimitive.Root
>

export type PopoverProps = PopoverClickProps | PopoverHoverProps

/**
 * Anchors floating content to a trigger. `trigger="click"` (default) uses
 * Radix Popover (click/keyboard-focus, supports `modal`); `trigger="hover"`
 * uses Radix HoverCard (hover/focus-in, supports `openDelay`/`closeDelay`).
 */
function Popover({ trigger = "click", ...props }: PopoverProps) {
  return (
    <PopoverModeContext.Provider value={trigger}>
      {trigger === "hover" ? (
        <HoverCardPrimitive.Root
          data-slot="popover"
          {...(props as React.ComponentProps<typeof HoverCardPrimitive.Root>)}
        />
      ) : (
        <PopoverPrimitive.Root
          data-slot="popover"
          {...(props as React.ComponentProps<typeof PopoverPrimitive.Root>)}
        />
      )}
    </PopoverModeContext.Provider>
  )
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  const mode = React.useContext(PopoverModeContext)
  return mode === "hover" ? (
    <HoverCardPrimitive.Trigger
      data-slot="popover-trigger"
      {...(props as React.ComponentProps<typeof HoverCardPrimitive.Trigger>)}
    />
  ) : (
    <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
  )
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  const mode = React.useContext(PopoverModeContext)
  const contentClassName = cn(
    popoverContentClass,
    popoverOriginClass[mode],
    className
  )

  if (mode === "hover") {
    return (
      <HoverCardPrimitive.Portal data-slot="popover-portal">
        <HoverCardPrimitive.Content
          data-slot="popover-content"
          align={align}
          sideOffset={sideOffset}
          className={contentClassName}
          {...props}
        />
      </HoverCardPrimitive.Portal>
    )
  }

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={contentClassName}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

/**
 * Positions content relative to an element other than the trigger. Only
 * meaningful for `trigger="click"` — Radix HoverCard has no separate anchor
 * primitive, so this renders `children` directly in hover mode.
 */
function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  const mode = React.useContext(PopoverModeContext)
  if (mode === "hover") return <>{props.children}</>
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-header"
      className={cn("flex flex-col gap-0.5", className)}
      {...props}
    />
  )
}

function PopoverTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <div
      data-slot="popover-title"
      className={cn(
        "text-base font-uds-semibold text-[var(--uds-text-primary)]",
        className
      )}
      {...props}
    />
  )
}

function PopoverDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="popover-description"
      className={cn(
        "text-uds-14 font-uds-regular text-[var(--uds-text-secondary)]",
        className
      )}
      {...props}
    />
  )
}

/** Small directional indicator pointing at the trigger. Only meaningful for `trigger="click"` — Radix HoverCard has no arrow primitive. */
function PopoverArrow({ className, ...props }: React.ComponentProps<typeof PopoverPrimitive.Arrow>) {
  const mode = React.useContext(PopoverModeContext)
  if (mode === "hover") return null
  return (
    <PopoverPrimitive.Arrow
      data-slot="popover-arrow"
      width={12}
      height={6}
      className={cn("fill-popover", className)}
      {...props}
    />
  )
}

/** Actions row, e.g. Previous/Next step navigation. Spaces children to opposite ends. */
function PopoverFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-footer"
      className={cn("flex items-center justify-between", className)}
      {...props}
    />
  )
}

export {
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
}
