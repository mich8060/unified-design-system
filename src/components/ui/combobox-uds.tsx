"use client"

import * as React from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react"
import { XIcon } from "@phosphor-icons/react/X"
import { Button } from "@/components/ui/button"
import {
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { type InputProps } from "@/components/ui/input"
import { ComboboxTrigger } from "@/components/ui/combobox-base"
import {
  comboboxAddonClass,
  comboboxChipClass,
  comboboxChipsClass,
  comboboxChipsInputClass,
  comboboxControlPaddingClass,
  comboboxInputGroupClass,
  comboboxInputGroupSizeClass,
  comboboxInputGroupShellClass,
  comboboxTriggerButtonClass,
} from "@/components/ui/combobox-theme"
import { cn } from "@/lib/utils"

function ComboboxInputGroupShell({
  inputSize = "default",
  className,
  children,
}: {
  inputSize?: "default" | "sm"
  className?: string
  children: React.ReactNode
}) {
  const size = inputSize ?? "default"
  return (
    <ComboboxPrimitive.InputGroup
      data-slot="input-group"
      data-input-size={size}
      className={cn(
        "w-auto",
        comboboxInputGroupShellClass,
        size === "sm" ? "uds-input-group--size-sm" : "uds-input-group--size-default",
        comboboxInputGroupClass,
        comboboxInputGroupSizeClass[size],
        className,
      )}
    >
      {children}
    </ComboboxPrimitive.InputGroup>
  )
}

function ComboboxClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      render={<InputGroupButton variant="ghost" size="icon-xs" />}
      className={cn(className)}
      {...props}
    >
      <XIcon className="pointer-events-none" />
    </ComboboxPrimitive.Clear>
  )
}

function ComboboxInput({
  className,
  children,
  disabled = false,
  inputSize = "default",
  showTrigger = true,
  showClear = false,
  ...props
}: ComboboxPrimitive.Input.Props &
  Pick<InputProps, "inputSize"> & {
    showTrigger?: boolean
    showClear?: boolean
  }) {
  const size = inputSize ?? "default"
  const groupClassName = typeof className === "string" ? className : undefined
  const inputClassName = typeof className === "function" ? className : undefined
  return (
    <ComboboxInputGroupShell inputSize={size} className={groupClassName}>
      <ComboboxPrimitive.Input
        render={
          <InputGroupInput
            inputSize={size}
            disabled={disabled}
            className={comboboxControlPaddingClass[size]}
          />
        }
        disabled={disabled}
        className={inputClassName}
        {...props}
      />
      <InputGroupAddon align="inline-end" className={comboboxAddonClass}>
        {showTrigger ? (
          <ComboboxTrigger
            disabled={disabled}
            className={comboboxTriggerButtonClass}
          />
        ) : null}
        {showClear ? <ComboboxClear disabled={disabled} /> : null}
      </InputGroupAddon>
      {children}
    </ComboboxInputGroupShell>
  )
}

function ComboboxChips({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> &
  ComboboxPrimitive.Chips.Props) {
  return (
    <ComboboxPrimitive.Chips
      data-slot="combobox-chips"
      className={cn(comboboxChipsClass, className)}
      {...props}
    />
  )
}

function ComboboxChip({
  className,
  children,
  showRemove = true,
  ...props
}: ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean
}) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={cn(comboboxChipClass, className)}
      {...props}
    >
      {children}
      {showRemove ? (
        <ComboboxPrimitive.ChipRemove
          render={<Button variant="ghost" size="icon-xs" />}
          className="-ml-1 opacity-50 hover:opacity-100"
          data-slot="combobox-chip-remove"
        >
          <XIcon className="pointer-events-none" />
        </ComboboxPrimitive.ChipRemove>
      ) : null}
    </ComboboxPrimitive.Chip>
  )
}

function ComboboxChipsInput({
  className,
  ...props
}: ComboboxPrimitive.Input.Props) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      className={cn(comboboxChipsInputClass, className)}
      {...props}
    />
  )
}

function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null)
}

export {
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxClear,
  ComboboxInput,
  useComboboxAnchor,
}
