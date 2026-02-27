import React from "react";
import Icon from "../Icon/Icon";
import "./_text-input.scss";
import type { TextInputProps } from "./TextInput.types";

const BASE_CLASS = "uds-input";

const sizeClassMap = {
  compact: "compact",
  default: "default",
};

const stateClassMap = {
  default: "default",
  focused: "focused",
  error: "error",
  disabled: "disabled",
};

/**
 * Input component for single-line text input
 *
 * @param {string} value - The value of the input
 * @param {function} onChange - Callback function when value changes
 * @param {string} placeholder - Placeholder text
 * @param {string} type - Input type: 'text', 'email', 'password', etc. (default: 'text')
 * @param {string} size - Size variant: 'compact' or 'default' (default: 'default')
 * @param {string} state - State variant: 'default', 'focused', 'error', or 'disabled'
 * @param {boolean} disabled - Whether the input is disabled (overrides state)
 * @param {string} icon - Phosphor icon name (e.g., "MagnifyingGlass", "Eye")
 * @param {string} iconPosition - Position of the icon: 'left' or 'right' (default: 'right')
 * @param {function} onIconClick - Callback when the icon is clicked
 * @param {string} id - Unique identifier for the input
 * @param {string} className - Additional CSS classes
 * @param {object} props - Additional props to pass to the input element
 */
export default function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  size = "default",
  state = "default",
  disabled = false,
  icon,
  iconPosition = "right",
  onIconClick,
  id,
  className = "",
  ...props
}: TextInputProps) {
  const effectiveState = disabled ? "disabled" : state;

  const inputClassNames = [
    BASE_CLASS,
    sizeClassMap[size] && `${BASE_CLASS}--${sizeClassMap[size]}`,
    stateClassMap[effectiveState] &&
      `${BASE_CLASS}--${stateClassMap[effectiveState]}`,
    icon && `${BASE_CLASS}--has-icon-${iconPosition}`,
  ]
    .filter(Boolean)
    .join(" ");

  const wrapperClassNames = [
    `${BASE_CLASS}-wrapper`,
    icon && `${BASE_CLASS}-wrapper--icon-${iconPosition}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inputElement = (
    <input
      id={id}
      type={type}
      className={inputClassNames}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled || effectiveState === "disabled"}
      {...props}
    />
  );

  if (!icon) {
    return (
      <div className={wrapperClassNames}>
        {inputElement}
      </div>
    );
  }

  const iconSize = size === "compact" ? 16 : 20;
  const iconVisual =
    typeof icon === "string" ? <Icon name={icon} size={iconSize} /> : icon;

  const iconElement = onIconClick ? (
    <button
      type="button"
      className={`${BASE_CLASS}__icon ${BASE_CLASS}__icon--${iconPosition} ${BASE_CLASS}__icon--clickable`}
      onClick={onIconClick}
      disabled={disabled || effectiveState === "disabled"}
      tabIndex={-1}
      aria-label="Input action"
    >
      {iconVisual}
    </button>
  ) : (
    <span className={`${BASE_CLASS}__icon ${BASE_CLASS}__icon--${iconPosition}`}>
      {iconVisual}
    </span>
  );

  return (
    <div className={wrapperClassNames}>
      {inputElement}
      {iconElement}
    </div>
  );
}
