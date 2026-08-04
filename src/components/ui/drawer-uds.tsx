import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { DrawerPortal } from "@/components/ui/drawer-base"
import {
  drawerBodyClass,
  drawerContentClass,
  drawerDescriptionClass,
  drawerFooterClass,
  drawerHandleClass,
  drawerHeaderClass,
  drawerOverlayClass,
  drawerTitleClass,
} from "@/components/ui/drawer-theme"
import { cn } from "@/lib/utils"

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(drawerOverlayClass, className)}
      {...props}
    />
  )
}

/**
 * Drawer shell. Compose **Header → Body → Footer**.
 * Side drawers fill viewport height so Body can scroll.
 */
function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(drawerContentClass, className)}
        {...props}
      >
        <div className={drawerHandleClass} />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
}

/** Pinned head — title / description / badges / close. */
function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(drawerHeaderClass, className)}
      {...props}
    />
  )
}

/** Scrollable middle — Required between Header and Footer. */
function DrawerBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-body"
      className={cn(drawerBodyClass, className)}
      {...props}
    />
  )
}

/** Pinned foot — actions. Side drawers use a horizontal row. */
function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn(drawerFooterClass, className)}
      {...props}
    />
  )
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn(drawerTitleClass, className)}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn(drawerDescriptionClass, className)}
      {...props}
    />
  )
}

export {
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
}
