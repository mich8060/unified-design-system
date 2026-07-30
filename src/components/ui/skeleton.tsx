import { cn } from "@/lib/utils"

export type SkeletonSize = "default" | "small" | "large"

const SKELETON_SIZE_CLASS: Record<SkeletonSize, string> = {
  default: "h-5 w-[200px]",
  small: "h-3 w-[120px]",
  large: "h-8 w-[320px]",
}

function Skeleton({
  className,
  size,
  ...props
}: React.ComponentProps<"div"> & {
  /** Fixed Figma-preset dimensions. Omit to size via `className` instead. */
  size?: SkeletonSize
}) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse rounded-md bg-uds-surface-tertiary",
        size && SKELETON_SIZE_CLASS[size],
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
