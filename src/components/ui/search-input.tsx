"use client"

import type { ReactNode } from "react"
import { MagnifyingGlassIcon } from "@phosphor-icons/react/MagnifyingGlass"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { type InputProps } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export type SearchInputVariant = "default" | "shortcut"

/** Field fill — contrast against the parent surface (gray vs white). */
export type SearchInputSurface = "primary" | "secondary"

function DefaultShortcutHint() {
  return (
    <KbdGroup className="pointer-events-none shrink-0">
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  )
}

export type SearchInputProps = Omit<InputProps, "type"> & {
  /** Merged onto {@link InputGroupInput} (not the group shell). */
  inputClassName?: string
  /** `shortcut`: trailing {@link Kbd} hint before the search icon (e.g. command palette). */
  variant?: SearchInputVariant
  /**
   * Field background for contrast with the parent:
   * **`secondary`** (default, gray) on white / primary surfaces;
   * **`primary`** (white) on gray / secondary surfaces (e.g. edge Main + Filterbar).
   */
  surface?: SearchInputSurface
  /** Replaces the default ⌘ / K hint when `variant` is `"shortcut"`. */
  shortcut?: ReactNode
  /** Optional `aria-keyshortcuts` on the field when `variant` is `"shortcut"` (defaults to `Meta+K` only if `shortcut` is omitted). */
  ariaKeyShortcuts?: string
  submitButtonType?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"]
  submitButtonAriaLabel?: string
  onSubmitButtonClick?: React.MouseEventHandler<HTMLButtonElement>
  hideSubmitButton?: boolean
}

/**
 * Search field built like {@link InputGroup}: the control sits in a bordered flex row; the magnifying glass lives in an
 * **`inline-end`** {@link InputGroupAddon} with {@link InputGroupButton} (same pattern as combobox / registry examples).
 * With **`variant="shortcut"`**, a {@link Kbd} hint (default ⌘ + K) renders before the icon. The group uses **`w-full min-w-0`**
 * so layout stays correct inside **`flex-1`** parents.
 */
function SearchInput({
  className,
  inputClassName,
  inputSize,
  variant = "default",
  surface = "secondary",
  shortcut,
  ariaKeyShortcuts,
  autoComplete = "off",
  submitButtonType = "submit",
  submitButtonAriaLabel = "Submit search",
  onSubmitButtonClick,
  hideSubmitButton = false,
  disabled,
  "aria-keyshortcuts": ariaKeyShortcutsFromInput,
  ...props
}: SearchInputProps) {
  const showShortcut = variant === "shortcut"
  const ariaKeyShortcutsResolved = showShortcut
    ? (ariaKeyShortcuts ?? (shortcut == null ? "Meta+K" : undefined)) ?? ariaKeyShortcutsFromInput
    : ariaKeyShortcutsFromInput

  return (
    <InputGroup
      inputSize={inputSize}
      data-surface={surface}
      className={cn(
        "uds-search-field",
        surface === "primary"
          ? "bg-[var(--uds-surface-primary)]"
          : "bg-[var(--uds-surface-secondary)]",
        className,
      )}
    >
      {!hideSubmitButton ? (
        <InputGroupAddon align="inline-start" className="uds-input-group-addon--flush-y pl-2 pr-0">
          <InputGroupButton
            type={submitButtonType}
            variant="ghost"
            size="icon-xs"
            aria-label={submitButtonAriaLabel}
            onClick={onSubmitButtonClick}
            onMouseDown={(event) => event.preventDefault()}
            disabled={disabled}
            className="hover:bg-transparent"
          >
            <MagnifyingGlassIcon aria-hidden className="size-4 shrink-0" weight="regular" />
          </InputGroupButton>
        </InputGroupAddon>
      ) : null}
      <InputGroupInput
        type="search"
        inputSize={inputSize}
        autoComplete={autoComplete}
        disabled={disabled}
        aria-keyshortcuts={ariaKeyShortcutsResolved}
        className={cn("pl-0", inputClassName)}
        {...props}
      />
      {showShortcut ? (
        <InputGroupAddon align="inline-end" className="uds-input-group-addon--flush-y">
          {shortcut ?? <DefaultShortcutHint />}
        </InputGroupAddon>
      ) : null}
    </InputGroup>
  )
}

export { SearchInput }
