import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input, type InputProps } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const inputGroupSizeVariants = cva("", {
  variants: {
    inputSize: {
      default: "uds-input-group--size-default",
      sm: "uds-input-group--size-sm",
    },
  },
  defaultVariants: {
    inputSize: "default",
  },
})

function InputGroup({
  className,
  inputSize,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof inputGroupSizeVariants>) {
  return (
    <div
      data-slot="input-group"
      data-input-size={inputSize ?? "default"}
      role="group"
      className={cn(
        "uds-input-group group/input-group",
        /* Shell + row layout also as utilities so SearchInput matches the demo when semantic CSS loads late or is absent. */
        "relative flex w-full min-w-0 flex-row flex-nowrap items-center rounded-[length:var(--uds-radius-4)] border border-input bg-[var(--uds-surface-primary)] transition-colors outline-none has-[input:autofill]:bg-[var(--uds-color-primary-25)]",
        inputGroupSizeVariants({ inputSize }),
        className,
      )}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva("uds-input-group-addon", {
  variants: {
    align: {
      "inline-start": "uds-input-group-addon--inline-start order-first",
      "inline-end": "uds-input-group-addon--inline-end order-last",
      "block-start": "uds-input-group-addon--block-start order-first",
      "block-end": "uds-input-group-addon--block-end order-last",
    },
  },
  defaultVariants: {
    align: "inline-start",
  },
})

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus()
      }}
      {...props}
    />
  )
}

const inputGroupButtonVariants = cva("uds-input-group-button", {
  variants: {
    size: {
      xs: "uds-input-group-button--size-xs",
      sm: "",
      "icon-xs": "uds-input-group-button--size-icon-xs",
      "icon-sm": "uds-input-group-button--size-icon-sm",
    },
  },
  defaultVariants: {
    size: "xs",
  },
})

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size"> &
  VariantProps<typeof inputGroupButtonVariants>) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={cn("uds-input-group-text", className)} {...props} />
}

function InputGroupInput({ className, inputSize, ...props }: InputProps) {
  return (
    <Input
      data-slot="input-group-control"
      inputSize={inputSize}
      className={cn(
        "uds-input-group-control",
        "rounded-none border-0 bg-transparent shadow-none ring-0",
        "focus-visible:border-transparent focus-visible:ring-0",
        "aria-invalid:border-transparent aria-invalid:ring-0",
        "dark:aria-invalid:border-transparent dark:aria-invalid:ring-0",
        className,
      )}
      {...props}
    />
  )
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "uds-input-group-textarea",
        "rounded-none border-0 bg-transparent shadow-none ring-0",
        "focus-visible:border-transparent focus-visible:ring-0",
        "aria-invalid:border-transparent aria-invalid:ring-0",
        "dark:aria-invalid:border-transparent dark:aria-invalid:ring-0",
        className,
      )}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}
