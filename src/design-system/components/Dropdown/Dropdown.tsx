import React, { useId, useMemo, useState } from "react";
import Icon from "../Icon/Icon";
import ActionMenu from "../ActionMenu/ActionMenu";
import "./_dropdown.scss";
import type { DropdownProps } from "./Dropdown.types";

const BASE_CLASS = "uds-dropdown";

const sizeClassMap = {
  compact: "compact",
  default: null, // base styling — no extra class needed
};

const stateClassMap = {
  default: null, // base styling — no extra class needed
  focused: "focused",
  error: "error",
  disabled: "disabled",
};

/**
 * Dropdown component for custom select inputs.
 *
 * Uses ActionMenu internally for the options popover — getting click-outside,
 * keyboard navigation, placement, and focus management for free.
 *
 * @param {array} options - Array of option objects with { value, label } or array of strings
 * @param {string|number} value - Currently selected value
 * @param {function} onChange - Callback when selection changes (receives new value)
 * @param {string} placeholder - Placeholder text when no option is selected
 * @param {string} size - Size variant: 'compact' or 'default' (default: 'default')
 * @param {string} state - Visual state: 'default', 'focused', 'error', 'disabled'
 * @param {string} id - Unique identifier for the dropdown
 * @param {string} className - Additional CSS classes
 * @param {boolean} disabled - Whether the dropdown is disabled
 * @param {object} props - Additional props to pass to the trigger button
 */
function Dropdown({
  options = [],
  value,
  onChange,
  placeholder,
  size = "default",
  state = "default",
  placement = "bottom-start",
  searchable = true,
  menuFullWidth = true,
  id,
  className = "",
  disabled = false,
  ...props
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const generatedId = useId();

  const dropdownId = id || `dropdown-${generatedId}`;

  // Normalize options to always have { value, label } format
  const normalizedOptions = useMemo(
    () =>
      options.map((option) =>
        typeof option === "string" ? { value: option, label: option } : option,
      ),
    [options],
  );

  // Determine the current visual state
  const currentState = disabled
    ? "disabled"
    : state === "default" && isOpen
      ? "focused"
      : state;

  // Get the selected option's label
  const selectedOption = normalizedOptions.find((opt) => opt.value === value);
  const legacyLabel = (props as Record<string, unknown>).label;
  const fallbackLabel = "Select an option";
  const placeholderText =
    typeof placeholder === "string" && placeholder.trim().length > 0
      ? placeholder.trim()
      : fallbackLabel;
  const displayValue = selectedOption ? selectedOption.label : placeholderText;

  if (
    typeof import.meta !== "undefined" &&
    import.meta.env?.DEV &&
    typeof legacyLabel === "string" &&
    legacyLabel.trim().length > 0
  ) {
    console.warn(
      "Dropdown: `label` prop is deprecated. Use `placeholder` for in-field text."
    );
  }

  // Transform options into ActionMenu items
  const menuItems = useMemo(
    () =>
      normalizedOptions.map((opt) => ({
        id: opt.value,
        label: opt.label,
        active: opt.value === value,
        onClick: () => {
          if (onChange && !disabled) {
            onChange(opt.value);
          }
        },
      })),
    [normalizedOptions, value, onChange, disabled],
  );

  // Build class names for the wrapper
  const wrapperClassNames = [
    BASE_CLASS,
    sizeClassMap[size] && `${BASE_CLASS}--${sizeClassMap[size]}`,
    stateClassMap[currentState] &&
      `${BASE_CLASS}--${stateClassMap[currentState]}`,
    isOpen && `${BASE_CLASS}--open`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // The trigger button that ActionMenu will use
  const triggerProps = {
    ...props,
  } as Record<string, unknown>;
  delete triggerProps.label;

  const triggerButton = (
    <button
      type="button"
      id={dropdownId}
      className={`${BASE_CLASS}__trigger`}
      disabled={disabled}
      aria-label={placeholderText}
      {...triggerProps}
    >
      <span
        className={`${BASE_CLASS}__value ${!selectedOption ? `${BASE_CLASS}__value--placeholder` : ""}`}
      >
        {displayValue}
      </span>
      <Icon
        name="CaretDown"
        size={16}
        appearance="regular"
        className={`${BASE_CLASS}__icon ${isOpen ? `${BASE_CLASS}__icon--open` : ""}`}
      />
    </button>
  );

  return (
    <div className={`${BASE_CLASS}-outer`}>
      <ActionMenu
        trigger={triggerButton}
        items={menuItems}
        variant={searchable ? "search" : "default"}
        searchPlaceholder={`Search ${placeholderText.toLowerCase()}`}
        placement={placement}
        fullWidth={menuFullWidth}
        disabled={disabled}
        onOpenChange={setIsOpen}
        className={wrapperClassNames}
        menuClassName={`${BASE_CLASS}__menu`}
      />
    </div>
  );
}

export default React.memo(Dropdown);
