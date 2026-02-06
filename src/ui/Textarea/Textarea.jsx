import React from "react";
import "./Textarea.scss";

const BASE_CLASS = "uds-textarea";

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
 * Textarea component for multi-line text input
 *
 * @param {string} value - The value of the textarea
 * @param {function} onChange - Callback function when value changes
 * @param {string} placeholder - Placeholder text
 * @param {string} size - Size variant: 'compact' (80px min-height) or 'default' (120px min-height)
 * @param {string} state - State variant: 'default', 'focused', 'error', or 'disabled'
 * @param {boolean} resize - Whether the textarea can be resized (default: true)
 * @param {boolean} disabled - Whether the textarea is disabled (overrides state)
 * @param {string} id - Unique identifier for the textarea
 * @param {string} className - Additional CSS classes
 * @param {object} props - Additional props to pass to the textarea element
 */
export default function Textarea({
  value,
  onChange,
  placeholder,
  size = "default",
  state = "default",
  resize = true,
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
    !resize && `${BASE_CLASS}--no-resize`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <textarea
      id={id}
      className={classNames}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled || effectiveState === "disabled"}
      {...props}
    />
  );
}
