import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CheckCircleIcon } from "@phosphor-icons/react/CheckCircle"
import { CircleNotchIcon } from "@phosphor-icons/react/CircleNotch"
import { InfoIcon } from "@phosphor-icons/react/Info"
import { WarningIcon } from "@phosphor-icons/react/Warning"
import { XCircleIcon } from "@phosphor-icons/react/XCircle"
import { cn } from "@/lib/utils"

const toastBody15RegularClass =
  "font-sans text-uds-15 font-uds-regular leading-uds-15 [font-family:var(--font-inter)]"

const toastIconClass = "size-6"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className={cn(
        "toaster group",
        "ltr:[--toast-icon-margin-end:12px] rtl:[--toast-icon-margin-start:12px]"
      )}
      icons={{
        success: (
          <CheckCircleIcon className={toastIconClass} weight="duotone" />
        ),
        info: <InfoIcon className={toastIconClass} weight="duotone" />,
        warning: <WarningIcon className={toastIconClass} weight="duotone" />,
        error: <XCircleIcon className={toastIconClass} weight="duotone" />,
        loading: (
          <CircleNotchIcon className={`${toastIconClass} animate-spin`} weight="duotone" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--uds-radius-4)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: cn(
            "cn-toast rounded-[length:var(--uds-radius-4)]",
            toastBody15RegularClass,
            "!gap-0"
          ),
          title: toastBody15RegularClass,
          description: toastBody15RegularClass,
          content: toastBody15RegularClass,
          icon: "!h-6 !w-6 shrink-0 [&_svg]:size-6",
          actionButton: toastBody15RegularClass,
          cancelButton: toastBody15RegularClass,
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
