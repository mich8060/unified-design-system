import * as React from "react"

import { cn } from "@/lib/utils"

function Card({
    className,
    size = "default",
    ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
    return (
        <div
            data-slot="card"
            data-size={size}
            className={cn(
                "group/card flex flex-col gap-0 overflow-hidden rounded-[length:var(--uds-radius-8)] border border-uds-border-primary bg-uds-surface-primary text-sm text-uds-text-primary",
                "[&_[data-slot=card-image]_img]:size-full [&_[data-slot=card-image]_img]:object-cover [&_[data-slot=card-image]_img]:rounded-t-[length:var(--uds-radius-8)]",
                className
            )}
            {...props}
        />
    )
}

function CardImage({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-image"
            className={cn(
                "flex min-h-0 flex-1 flex-col overflow-hidden p-0",
                className
            )}
            {...props}
        />
    )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-header"
            className={cn(
                "group/card-header @container/card-header grid shrink-0 auto-rows-min items-start gap-0 px-[length:var(--uds-gap-16)] py-[length:var(--uds-spacing-12)] has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]",
                className
            )}
            {...props}
        />
    )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-title"
            className={cn(
                "text-base font-medium leading-[length:var(--uds-type-body-16-line-regular,24px)] text-uds-text-primary group-data-[size=sm]/card:text-sm group-data-[size=sm]/card:leading-[length:var(--uds-type-body-14-line-regular,20px)]",
                className
            )}
            {...props}
        />
    )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-description"
            className={cn(
                "text-sm leading-[length:var(--uds-type-body-14-line-regular,20px)] text-uds-text-secondary",
                className
            )}
            {...props}
        />
    )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-action"
            className={cn(
                "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
                className
            )}
            {...props}
        />
    )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-content"
            className={cn(
                "flex min-h-0 flex-1 flex-col overflow-hidden p-0",
                className
            )}
            {...props}
        />
    )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-footer"
            className={cn(
                "flex shrink-0 items-center justify-end border-t border-uds-border-primary bg-uds-surface-tertiary px-[length:var(--uds-gap-16)] py-[length:var(--uds-gap-12)]",
                className
            )}
            {...props}
        />
    )
}

export {
    Card,
    CardImage,
    CardHeader,
    CardFooter,
    CardTitle,
    CardAction,
    CardDescription,
    CardContent,
}
