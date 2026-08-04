import * as React from "react"
import { Accordion as AccordionPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { CaretDownIcon } from "@phosphor-icons/react/CaretDown"
import { CaretUpIcon } from "@phosphor-icons/react/CaretUp"

export type AccordionVariant = "boxed" | "boxed-filled" | "divided" | "separated"

const AccordionVariantContext = React.createContext<AccordionVariant>("divided")

function Accordion({
  className,
  variant = "divided",
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root> & {
  variant?: AccordionVariant
}) {
  return (
    <AccordionVariantContext.Provider value={variant}>
      <AccordionPrimitive.Root
        data-slot="accordion"
        data-variant={variant}
        className={cn(
          "flex w-full flex-col font-inter",
          variant === "boxed" &&
            "overflow-hidden rounded-[4px] border border-border bg-background",
          variant === "boxed-filled" &&
            "overflow-hidden rounded-[4px] border border-border bg-uds-surface-secondary",
          variant === "separated" && "gap-[length:var(--uds-gap-12)]",
          className,
        )}
        {...props}
      />
    </AccordionVariantContext.Provider>
  )
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  const variant = React.useContext(AccordionVariantContext)
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        variant === "separated"
          ? "overflow-hidden rounded-[4px] border border-uds-border-secondary bg-uds-surface-secondary"
          : "border-b border-uds-border-secondary last:border-b-0",
        className,
      )}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  const variant = React.useContext(AccordionVariantContext)
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex w-full flex-1 cursor-pointer items-center justify-between rounded-none border-0 px-4 py-3 text-left text-[16px] leading-normal font-medium transition-all outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-3 **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:shrink-0 **:data-[slot=accordion-trigger-icon]:text-muted-foreground",
          variant === "boxed" &&
            "bg-neutral-100 hover:bg-neutral-100/90 dark:bg-neutral-800 dark:hover:bg-neutral-800/90",
          className
        )}
        {...props}
      >
        {children}
        <CaretDownIcon data-slot="accordion-trigger-icon" className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden" />
        <CaretUpIcon data-slot="accordion-trigger-icon" className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden text-[16px] leading-normal data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          "h-(--radix-accordion-content-height) px-4 pt-0 pb-3 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
