import * as React from "react"
import { type VariantProps } from "class-variance-authority"

import { inputVariants } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { CaretDownIcon } from "@phosphor-icons/react/CaretDown"
type NativeSelectProps = Omit<React.ComponentProps<"select">, "size"> &
  VariantProps<typeof inputVariants>

function NativeSelect({
  className,
  inputSize,
  ...props
}: NativeSelectProps) {
  return (
    <div
      className={cn(
        "group/native-select relative w-fit has-[select:disabled]:opacity-50",
        className
      )}
      data-slot="native-select-wrapper"
      data-input-size={inputSize ?? "default"}
    >
      <select
        data-slot="native-select"
        data-input-size={inputSize ?? "default"}
        className={cn(
          inputVariants({ inputSize }),
          "appearance-none pr-8 selection:bg-primary selection:text-primary-foreground"
        )}
        {...props}
      />
      <CaretDownIcon
        className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground select-none"
        aria-hidden="true"
        data-slot="native-select-icon"
      />
    </div>
  )
}

function NativeSelectOption({
  className,
  ...props
}: React.ComponentProps<"option">) {
  return (
    <option
      data-slot="native-select-option"
      className={cn("bg-[Canvas] text-[CanvasText]", className)}
      {...props}
    />
  )
}

function NativeSelectOptGroup({
  className,
  ...props
}: React.ComponentProps<"optgroup">) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn("bg-[Canvas] text-[CanvasText]", className)}
      {...props}
    />
  )
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }
