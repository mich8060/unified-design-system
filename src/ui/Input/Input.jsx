import React from "react";
import "./Input.scss";

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
  id,
  className = "",
  ...props
}) {
  const effectiveState = disabled ? "disabled" : state;

  const classNames = [
    BASE_CLASS,
    sizeClassMap[size] && `${BASE_CLASS}--${sizeClassMap[size]}`,
    stateClassMap[effectiveState] &&
      `${BASE_CLASS}--${stateClassMap[effectiveState]}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <input
      id={id}
      type={type}
      className={classNames}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled || effectiveState === "disabled"}
      {...props}
    />
  );
}
