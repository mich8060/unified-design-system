import * as React from "react"

import { cn } from "@/lib/utils"

function SectionHeader({ className, ...props }: React.ComponentProps<"header">) {
    return (
        <header
            data-slot="section-header"
            className={cn("flex flex-wrap items-start justify-between gap-3", className)}
            {...props}
        >
            {props.children}
        </header>
    )
}

function SectionHeaderContent({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="section-header-content"
            className={cn("min-w-0 flex-1", className)}
            {...props}
        />
    )
}

function SectionHeaderTitle({ className, ...props }: React.ComponentProps<"h2">) {
    return (
        <h2
            data-slot="section-header-title"
            className={cn("font-sans text-uds-24 font-uds-semibold leading-uds-24 text-[var(--uds-text-primary)]", className)}
            {...props}
        />
    )
}

function SectionHeaderDescription({
    className,
    ...props
}: React.ComponentProps<"p">) {
    return (
        <p
            data-slot="section-header-description"
            className={cn("mt-2 font-sans text-uds-16 font-uds-regular leading-uds-16 text-[var(--uds-text-secondary)]", className)}
            {...props}
        />
    )
}

function SectionHeaderActions({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="section-header-actions"
            className={cn("flex shrink-0 items-center gap-2", className)}
            {...props}
        />
    )
}

export {
    SectionHeader,
    SectionHeaderActions,
    SectionHeaderContent,
    SectionHeaderDescription,
    SectionHeaderTitle,
}
