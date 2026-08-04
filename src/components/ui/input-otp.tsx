"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { typographyStyle } from "@/components/ui/text"
import { useIsMobile } from "@/hooks/use-mobile"
import { MinusIcon } from "@phosphor-icons/react/Minus"
type InputOTPSize = "default" | "sm"

type InputOTPSizeContextValue = {
  inputSize: InputOTPSize
  responsive: boolean
}

const InputOTPSizeContext = React.createContext<InputOTPSizeContextValue>({
  inputSize: "default",
  responsive: true,
})

function useInputOTPCompact() {
  const { inputSize, responsive } = React.useContext(InputOTPSizeContext)
  const isMobile = useIsMobile()
  return inputSize === "sm" || (responsive && isMobile)
}

const inputOtpDigitTypography = {
  default: typographyStyle("display", "48", "regular"),
  compact: typographyStyle("display", "36", "regular"),
} as const

const inputOtpGroupVariants = cva("flex items-center", {
  variants: {
    compact: {
      true: "gap-1",
      false: "gap-2",
    },
  },
  defaultVariants: {
    compact: false,
  },
})

const inputOtpSlotVariants = cva(
  [
    "relative flex shrink-0 items-center justify-center rounded-[length:var(--uds-radius-8)] border border-input bg-[var(--uds-surface-secondary)] font-uds-medium text-uds-text-primary text-center transition-all outline-none",
    "aria-invalid:border-destructive",
    "data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:ring-3 data-[active=true]:ring-ring/50",
    "data-[active=true]:aria-invalid:border-destructive data-[active=true]:aria-invalid:ring-3 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40",
    "[font-family:var(--font-inter)]",
  ],
  {
    variants: {
      compact: {
        true: "h-12 w-11",
        false: "h-[70px] w-16",
      },
    },
    defaultVariants: {
      compact: false,
    },
  },
)

const inputOtpSeparatorVariants = cva("flex items-center [&_svg:not([class*='size-'])]:shrink-0", {
  variants: {
    compact: {
      true: "h-11 px-1 [&_svg:not([class*='size-'])]:size-5",
      false: "h-16 px-2 [&_svg:not([class*='size-'])]:size-8",
    },
  },
  defaultVariants: {
    compact: false,
  },
})

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center has-disabled:opacity-50",
        containerClassName
      )}
      spellCheck={false}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
}

function InputOTPGroup({
  className,
  inputSize = "default",
  responsive = true,
  ...props
}: React.ComponentProps<"div"> & {
  /** `default` — 64×70 slots, Display/48. `sm` — 44×48 compact (mobile). When `responsive` is true, `default` compresses below 768px. */
  inputSize?: InputOTPSize
  responsive?: boolean
}) {
  return (
    <InputOTPSizeContext.Provider value={{ inputSize, responsive }}>
      <InputOTPGroupShell className={className} {...props} />
    </InputOTPSizeContext.Provider>
  )
}

function InputOTPGroupShell({ className, ...props }: React.ComponentProps<"div">) {
  const { inputSize, responsive } = React.useContext(InputOTPSizeContext)
  const compact = useInputOTPCompact()

  return (
    <div
      data-slot="input-otp-group"
      data-input-size={inputSize}
      data-responsive={responsive ? "true" : "false"}
      data-compact={compact ? "true" : "false"}
      className={cn(
        inputOtpGroupVariants({ compact }),
        "has-aria-invalid:[&_[data-slot=input-otp-slot][data-active=true]]:border-destructive has-aria-invalid:[&_[data-slot=input-otp-slot][data-active=true]]:ring-3 has-aria-invalid:[&_[data-slot=input-otp-slot][data-active=true]]:ring-destructive/20 dark:has-aria-invalid:[&_[data-slot=input-otp-slot][data-active=true]]:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

function InputOTPSlot({
  index,
  className,
  style,
  ...props
}: React.ComponentProps<"div"> & {
  index: number
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const compact = useInputOTPCompact()
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      data-compact={compact ? "true" : "false"}
      style={{
        ...(compact ? inputOtpDigitTypography.compact : inputOtpDigitTypography.default),
        ...style,
      }}
      className={cn(inputOtpSlotVariants({ compact }), className)}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
            className={cn(
              "w-0.5 animate-caret-blink bg-[var(--uds-text-primary)] duration-1000",
              compact ? "h-[18px]" : "h-6"
            )}
          />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator({ className, ...props }: React.ComponentProps<"div">) {
  const compact = useInputOTPCompact()

  return (
    <div
      data-slot="input-otp-separator"
      data-compact={compact ? "true" : "false"}
      className={cn(inputOtpSeparatorVariants({ compact }), className)}
      role="separator"
      {...props}
    >
      <MinusIcon className="text-uds-text-secondary" aria-hidden />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
