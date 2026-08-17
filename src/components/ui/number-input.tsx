"use client"

import * as React from "react"
import { CaretDownIcon } from "@phosphor-icons/react/CaretDown"
import { CaretUpIcon } from "@phosphor-icons/react/CaretUp"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { type InputProps } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export type NumberInputProps = Omit<InputProps, "type"> & {
  /** Merged onto the embedded input (not the group shell). */
  inputClassName?: string
  /** Hide the custom up/down stepper (native spin buttons stay hidden). */
  hideStepper?: boolean
}

const nativeSpinButtonReset = cn(
  "[appearance:textfield]",
  "[&::-webkit-inner-spin-button]:appearance-none",
  "[&::-webkit-outer-spin-button]:appearance-none"
)

function resolveStepAmount(step: InputProps["step"]): number {
  if (typeof step === "number" && Number.isFinite(step) && step !== 0) return Math.abs(step)
  if (typeof step === "string" && step !== "any") {
    const parsed = Number(step)
    if (Number.isFinite(parsed) && parsed !== 0) return Math.abs(parsed)
  }
  return 1
}

function decimalPlaces(value: number): number {
  if (!Number.isFinite(value)) return 0
  const asString = String(value)
  const index = asString.indexOf(".")
  return index === -1 ? 0 : asString.length - index - 1
}

function roundToPrecision(value: number, places: number): number {
  if (places <= 0) return Math.round(value)
  const factor = 10 ** places
  return Math.round(value * factor) / factor
}

function parseBound(bound: string | number | undefined): number | undefined {
  if (bound == null || bound === "") return undefined
  const parsed = typeof bound === "number" ? bound : Number(bound)
  return Number.isFinite(parsed) ? parsed : undefined
}

function NumberInput({
  className,
  inputClassName,
  inputSize = "default",
  inputMode = "decimal",
  step = "any",
  min,
  max,
  value,
  defaultValue,
  onChange,
  onKeyDown,
  disabled,
  readOnly,
  hideStepper = false,
  placeholder = "0",
  ...props
}: NumberInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [internalValue, setInternalValue] = React.useState(
    defaultValue == null ? "" : String(defaultValue)
  )

  const isControlled = value !== undefined
  const currentValue = isControlled ? String(value) : internalValue
  const canEdit = !disabled && !readOnly
  const stepAmount = resolveStepAmount(step)
  const minBound = parseBound(min)
  const maxBound = parseBound(max)
  const precision = Math.max(
    decimalPlaces(stepAmount),
    decimalPlaces(Number(currentValue) || 0)
  )

  const parsedCurrent = React.useMemo(() => {
    if (currentValue.trim() === "") return null
    const parsed = Number(currentValue)
    return Number.isFinite(parsed) ? parsed : null
  }, [currentValue])

  const atMin = parsedCurrent != null && minBound != null && parsedCurrent <= minBound
  const atMax = parsedCurrent != null && maxBound != null && parsedCurrent >= maxBound

  const commitValue = (next: string) => {
    if (!isControlled) {
      setInternalValue(next)
    }
    const el = inputRef.current
    if (!el) return

    const descriptor = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    )
    descriptor?.set?.call(el, next)

    onChange?.({
      target: el,
      currentTarget: el,
    } as React.ChangeEvent<HTMLInputElement>)
  }

  const stepBy = (direction: 1 | -1) => {
    if (!canEdit) return

    let next: number
    if (parsedCurrent == null) {
      if (direction > 0) {
        next = minBound ?? stepAmount
      } else {
        next = maxBound ?? -stepAmount
      }
    } else {
      next = parsedCurrent + direction * stepAmount
    }

    if (minBound != null) next = Math.max(minBound, next)
    if (maxBound != null) next = Math.min(maxBound, next)
    next = roundToPrecision(next, precision)

    commitValue(String(next))
  }

  const isCompact = inputSize === "sm"
  const stepperIconClass = isCompact ? "size-3" : "size-3.5"
  const stepperButtonClass = cn(
    "flex min-h-0 flex-1 items-center justify-center text-[var(--uds-text-secondary)] transition-colors hover:bg-[var(--uds-surface-secondary)] hover:text-[var(--uds-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-40",
    isCompact ? "px-1.5" : "px-2"
  )

  return (
    <InputGroup
      data-slot="number-input"
      data-input-size={inputSize ?? "default"}
      inputSize={inputSize}
      className={cn("uds-number-input", className)}
    >
      <InputGroupInput
        {...props}
        ref={inputRef}
        type="number"
        inputMode={inputMode}
        step={step}
        min={min}
        max={max}
        inputSize={inputSize}
        value={isControlled ? value : undefined}
        defaultValue={isControlled ? undefined : defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        onChange={(event) => {
          if (!isControlled) {
            setInternalValue(event.currentTarget.value)
          }
          onChange?.(event)
        }}
        onKeyDown={(event) => {
          if (canEdit && !hideStepper) {
            if (event.key === "ArrowUp") {
              event.preventDefault()
              stepBy(1)
            } else if (event.key === "ArrowDown") {
              event.preventDefault()
              stepBy(-1)
            }
          }
          onKeyDown?.(event)
        }}
        className={cn(
          nativeSpinButtonReset,
          hideStepper ? undefined : "pr-1",
          "placeholder:text-[var(--uds-text-placeholder)]",
          inputClassName
        )}
      />
      {!hideStepper ? (
        <InputGroupAddon
          align="inline-end"
          className="uds-input-group-addon--flush-y h-full p-0 pr-0"
        >
          <div
            role="group"
            aria-label="Change value"
            className="flex h-full flex-col self-stretch border-l border-input"
          >
            <button
              type="button"
              tabIndex={-1}
              aria-label="Increase"
              disabled={!canEdit || atMax}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => stepBy(1)}
              className={stepperButtonClass}
            >
              <CaretUpIcon aria-hidden className={stepperIconClass} weight="bold" />
            </button>
            <button
              type="button"
              tabIndex={-1}
              aria-label="Decrease"
              disabled={!canEdit || atMin}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => stepBy(-1)}
              className={cn(stepperButtonClass, "border-t border-input")}
            >
              <CaretDownIcon aria-hidden className={stepperIconClass} weight="bold" />
            </button>
          </div>
        </InputGroupAddon>
      ) : null}
    </InputGroup>
  )
}

export { NumberInput }
