import * as React from "react"

import { Text } from "@/components/ui/text"
import { cn } from "@/lib/utils"

function SectionHeader({ className, ...props }: React.ComponentProps<"header">) {
    return (
        <header
            data-slot="section-header"
            className={cn(
                "flex w-full min-w-0 flex-1 flex-wrap items-center justify-between gap-3",
                className,
            )}
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
            className={cn("flex min-w-0 flex-1 flex-col gap-0", className)}
            {...props}
        />
    )
}

/** Section title — body/20/semibold with tight line height (h2). */
function SectionHeaderTitle({
    className,
    ...props
}: React.ComponentProps<typeof Text>) {
    return (
        <Text
            as="h2"
            data-slot="section-header-title"
            variant="body"
            size="20"
            weight="semibold"
            lineHeight="tight"
            appearance="primary"
            className={cn("m-0 w-full", className)}
            {...props}
        />
    )
}

/** Optional supporting copy — body/16/regular with loose line height, text-secondary. */
function SectionHeaderDescription({
    className,
    ...props
}: React.ComponentProps<typeof Text>) {
    return (
        <Text
            data-slot="section-header-description"
            variant="body"
            size="16"
            weight="regular"
            lineHeight="loose"
            appearance="secondary"
            className={cn("m-0 w-full", className)}
            {...props}
        />
    )
}

/** Open trailing slot — pass any action content (buttons, menus, toggles, links). */
function SectionHeaderActions({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="section-header-actions"
            className={cn(
                "flex shrink-0 items-center gap-[length:var(--uds-gap-12)]",
                className,
            )}
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
