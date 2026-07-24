import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Card is a three-slot wrapper. Compose it from:
 *   - CardImage   — media slot (images only by convention)
 *   - CardContent — body slot (any children)
 *   - CardFooter  — actions slot (buttons only by convention)
 * There is no built-in title/description; place whatever you need in CardContent.
 */
function Card({
    className,
    size = "default",
    orientation = "vertical",
    ...props
}: React.ComponentProps<"div"> & {
    size?: "default" | "sm"
    /** `horizontal` moves CardFooter beside CardContent instead of below it. CardImage always stays full-width on top. */
    orientation?: "vertical" | "horizontal"
}) {
    return (
        <div
            data-slot="card"
            data-size={size}
            data-orientation={orientation}
            className={cn(
                "group/card flex h-fit w-full flex-col gap-0 self-start overflow-hidden rounded-[length:var(--uds-radius-8)] border border-uds-border-primary bg-uds-surface-primary text-sm text-uds-text-primary",
                "[&_[data-slot=card-image]_img]:size-full [&_[data-slot=card-image]_img]:object-cover",
                orientation === "horizontal" && [
                    "grid grid-cols-[1fr_auto]",
                    "[&_[data-slot=card-image]]:col-span-2",
                    "[&_[data-slot=card-footer]]:border-t-0 [&_[data-slot=card-footer]]:border-l",
                ],
                className
            )}
            {...props}
        />
    )
}

/** Media slot. Holds images only (e.g. AspectRatio with src, or an <img>). */
function CardImage({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-image"
            className={cn(
                "flex shrink-0 flex-col overflow-hidden p-0",
                className
            )}
            {...props}
        />
    )
}

/** Body slot. Accepts any children. Carries the card's content padding. */
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-content"
            className={cn(
                "flex shrink-0 flex-col gap-1 px-[length:var(--uds-gap-16)] py-[length:var(--uds-spacing-12)]",
                className
            )}
            {...props}
        />
    )
}

/** Actions slot. Holds buttons only by convention. */
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-footer"
            className={cn(
                "flex shrink-0 items-center justify-end gap-2 border-t border-uds-border-primary bg-uds-surface-tertiary px-[length:var(--uds-gap-16)] py-[length:var(--uds-gap-12)]",
                className
            )}
            {...props}
        />
    )
}

export {
    Card,
    CardImage,
    CardContent,
    CardFooter,
}
