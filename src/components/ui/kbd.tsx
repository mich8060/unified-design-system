import { cn } from "@/lib/utils"

function Kbd({
  className,
  appearance = "default",
  ...props
}: React.ComponentProps<"kbd"> & {
  appearance?: "default" | "black"
}) {
  return (
    <kbd
      data-slot="kbd"
      data-appearance={appearance}
      className={cn(
        "pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-[length:var(--uds-radius-4)] px-1 font-sans text-xs font-medium select-none in-data-[slot=tooltip-content]:bg-background/20 in-data-[slot=tooltip-content]:text-background dark:in-data-[slot=tooltip-content]:bg-background/10 [&_svg:not([class*='size-'])]:size-3",
        appearance === "black"
          ? "bg-[var(--uds-color-black)] text-[var(--uds-text-inverse)]"
          : "bg-uds-surface-quaternary text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }
