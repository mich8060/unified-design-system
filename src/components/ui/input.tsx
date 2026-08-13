import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { SparkleIcon } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"

/**
 * WebKit / Edge / Firefox ship extra UI on `type="search"` (clear, decoration). Hide it so custom trailing controls
 * (e.g. `SearchInput`) do not overlap the native cancel button inside narrow or `flex-1` layouts.
 */
const inputTypeSearchNativeDecorationReset = cn(
  "[&::-webkit-search-cancel-button]:[-webkit-appearance:none]",
  "[&::-webkit-search-decoration]:[-webkit-appearance:none]",
  "[&::-webkit-search-results-button]:[-webkit-appearance:none]",
  "[&::-webkit-search-results-decoration]:[-webkit-appearance:none]",
  "[&::-ms-clear]:hidden",
  "[&::-moz-search-clear-button]:hidden",
)

const inputVariants = cva(
  "peer w-full min-w-0 rounded-[length:var(--uds-radius-4)] border border-input bg-[var(--uds-surface-primary)] [font-family:var(--font-inter)] transition-colors outline-none file:inline-flex file:border-0 file:bg-transparent file:font-uds-regular file:text-foreground placeholder:text-uds-text-placeholder disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-uds-border-disabled disabled:bg-[var(--uds-surface-secondary)] disabled:opacity-50 aria-invalid:bg-[var(--uds-surface-secondary)] autofill:pl-9 autofill:[-webkit-text-fill-color:var(--uds-text-primary)] autofill:[-webkit-box-shadow:0_0_0_1000px_var(--uds-color-primary-25)_inset] autofill:[transition:background-color_9999s_ease-in-out_0s]",
  {
    variants: {
      inputSize: {
        default:
          "h-11 px-3 py-0 text-uds-16 font-uds-regular leading-uds-16 file:h-7 file:text-uds-16 file:leading-uds-16",
        sm: "h-9 px-3 py-0 text-uds-14 font-uds-regular leading-uds-14 file:h-6 file:text-uds-14 file:leading-uds-14",
      },
    },
    defaultVariants: {
      inputSize: "default",
    },
  }
)

/** Used when `data-slot="input-group-control"` — no outer field chrome (the {@link InputGroup} shell provides it). */
const inputEmbeddedInGroupVariants = cva(
  "w-full min-h-0 min-w-0 flex-1 border-0 bg-transparent [font-family:var(--font-inter)] transition-colors outline-none file:inline-flex file:border-0 file:bg-transparent file:font-uds-regular file:text-foreground placeholder:text-uds-text-placeholder disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-transparent focus-visible:border-transparent focus-visible:ring-0 aria-invalid:border-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent dark:aria-invalid:border-transparent dark:aria-invalid:ring-0 rounded-none py-0 shadow-none ring-0 h-full",
  {
    variants: {
      inputSize: {
        default:
          "px-3 text-uds-16 font-uds-regular leading-uds-16 file:h-7 file:text-uds-16 file:leading-uds-16",
        sm: "px-3 text-uds-14 font-uds-regular leading-uds-14 file:h-6 file:text-uds-14 file:leading-uds-14",
      },
    },
    defaultVariants: {
      inputSize: "default",
    },
  }
)

export type InputProps = Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants>

function Input({ className, type, inputSize, ...props }: InputProps) {
  const dataSlot = (props as { "data-slot"?: string | undefined })["data-slot"]
  const embeddedInGroup = dataSlot === "input-group-control"

  const inputEl = (
    <input
      {...props}
      type={type}
      data-slot={dataSlot ?? "input"}
      data-input-size={inputSize ?? "default"}
      className={cn(
        embeddedInGroup ? inputEmbeddedInGroupVariants({ inputSize }) : inputVariants({ inputSize }),
        type === "search" && inputTypeSearchNativeDecorationReset,
        className,
      )}
    />
  )

  if (embeddedInGroup) {
    return inputEl
  }

  return (
    <div className="relative w-full">
      {inputEl}
      {/* Shown only while the browser reports :autofill on the sibling input — pure CSS, no JS detection needed. */}
      <SparkleIcon
        aria-hidden
        weight="fill"
        className="pointer-events-none absolute top-1/2 left-3 hidden size-4 -translate-y-1/2 text-[var(--uds-color-accent-sky-600)] peer-autofill:block"
      />
    </div>
  )
}

export { Input, inputVariants }
