import * as React from "react"
import { CameraIcon } from "@phosphor-icons/react"

import {
  Avatar as AvatarBase,
  AvatarFallback as AvatarFallbackBase,
  AvatarImage,
} from "@/components/ui/avatar"
import { DotStatus, type DotStatusProps } from "@/components/ui/dot-status"
import { cn } from "@/lib/utils"

export type AvatarSize = "default" | "sm" | "lg" | "xs"

function Avatar({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof AvatarBase> & {
  size?: AvatarSize
}) {
  return (
    <AvatarBase
      data-size={size}
      className={cn(
        "group/avatar relative shrink-0 rounded-full after:absolute after:inset-0 after:rounded-full after:border after:border-uds-border-inverse data-[size=default]:size-12 data-[size=lg]:size-16 data-[size=sm]:size-9 data-[size=xs]:size-8",
        className,
      )}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarFallbackBase>) {
  return (
    <AvatarFallbackBase
      className={cn(
        "bg-primary text-sm font-medium text-primary-foreground group-data-[size=sm]/avatar:text-xs group-data-[size=xs]/avatar:text-xs group-data-[size=lg]/avatar:text-base",
        className,
      )}
      {...props}
    />
  )
}

export type AvatarStatusProps = Omit<DotStatusProps, "size">

function AvatarStatus({
  className,
  outline = false,
  ...props
}: AvatarStatusProps) {
  return (
    <DotStatus
      data-slot="avatar-status"
      size="medium"
      outline={outline}
      className={cn(
        "absolute right-0 bottom-0 z-10 ring-2 ring-background",
        "group-data-[size=xs]/avatar:translate-x-px group-data-[size=xs]/avatar:translate-y-px",
        "group-data-[size=sm]/avatar:-translate-x-px group-data-[size=sm]/avatar:-translate-y-px",
        "group-data-[size=default]/avatar:-translate-x-px group-data-[size=default]/avatar:-translate-y-px",
        "group-data-[size=lg]/avatar:-translate-x-1 group-data-[size=lg]/avatar:-translate-y-1",
        className,
      )}
      {...props}
    />
  )
}

export type AvatarCameraActionProps = Omit<
  React.ComponentProps<"button">,
  "children"
> & {
  icon?: React.ReactNode
}

function AvatarCameraAction({
  className,
  type = "button",
  icon,
  "aria-label": ariaLabel = "Change photo",
  ...props
}: AvatarCameraActionProps) {
  return (
    <button
      type={type}
      data-slot="avatar-camera-action"
      aria-label={ariaLabel}
      className={cn(
        "absolute right-0 bottom-0 z-20 flex cursor-pointer items-center justify-center rounded-full bg-[var(--uds-color-neutrals-300)] p-0 text-[var(--uds-color-black)] ring-2 ring-background",
        "hover:bg-[var(--uds-color-neutrals-400)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "dark:bg-[var(--uds-color-neutrals-700)] dark:text-[var(--uds-color-white)] dark:hover:bg-[var(--uds-color-neutrals-600)]",
        "disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        "group-data-[size=xs]/avatar:size-4 group-data-[size=xs]/avatar:translate-x-1.5 group-data-[size=xs]/avatar:translate-y-1.5 group-data-[size=xs]/avatar:[&_svg]:size-2",
        "group-data-[size=sm]/avatar:size-5 group-data-[size=sm]/avatar:translate-x-2 group-data-[size=sm]/avatar:translate-y-2 group-data-[size=sm]/avatar:[&_svg]:size-3",
        "group-data-[size=default]/avatar:size-5 group-data-[size=default]/avatar:translate-x-2 group-data-[size=default]/avatar:translate-y-2 group-data-[size=default]/avatar:[&_svg]:size-3",
        "group-data-[size=lg]/avatar:size-6 group-data-[size=lg]/avatar:translate-x-1 group-data-[size=lg]/avatar:translate-y-1 group-data-[size=lg]/avatar:[&_svg]:size-4",
        className,
      )}
      {...props}
    >
      {icon ?? <CameraIcon weight="regular" aria-hidden />}
    </button>
  )
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-background select-none",
        "group-data-[size=xs]/avatar:size-2 group-data-[size=xs]/avatar:[&>svg]:hidden",
        "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
        "group-data-[size=lg]/avatar:size-3.5 group-data-[size=lg]/avatar:[&>svg]:size-2.5",
        className,
      )}
      {...props}
    />
  )
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        className,
      )}
      {...props}
    />
  )
}

function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "relative flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-16 group-has-data-[size=sm]/avatar-group:size-9 group-has-data-[size=xs]/avatar-group:size-8 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-6 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3.5 group-has-data-[size=xs]/avatar-group:[&>svg]:size-3",
        className,
      )}
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
  AvatarStatus,
  AvatarCameraAction,
}
