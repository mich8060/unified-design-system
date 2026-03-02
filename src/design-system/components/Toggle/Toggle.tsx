import React, { useRef, useEffect } from "react";
import "./_toggle.scss";
import type { ToggleProps } from "./Toggle.types";

const BASE_CLASS = "uds-toggle";

const sizeClassMap = {
  large: "large",
  small: "small",
} as const;

/**
 * Toggle component for switching between states
 * @param {boolean} checked - Whether the toggle is checked (on/off)
 * @param {string} state - Toggle state: 'off', 'on', or 'indeterminate' (default: 'off')
 * @param {string} size - Toggle size: 'large' or 'small' (default: 'large')
 * @param {function} onChange - Callback function when toggle state changes
 * @param {boolean} disabled - Whether the toggle is disabled
 * @param {string} id - Unique identifier for the toggle input
 * @param {string} className - Additional CSS classes
 * @param {object} props - Additional props to pass to the toggle
 */
export default function Toggle({
  checked,
  state,
  size = "large",
  onChange,
  disabled = false,
  id,
  className = "",
  ...props
}: ToggleProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Determine state from checked prop if state is not provided
  const toggleState = state ?? (checked ? "on" : "off");

  // Native indeterminate must be set via a ref — there is no HTML attribute for it
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = toggleState === "indeterminate";
    }
  }, [toggleState]);

  const ariaChecked = toggleState === "indeterminate" ? "mixed" : toggleState === "on" || !!checked;

  const classNames = [
    BASE_CLASS,
    sizeClassMap[size] && `${BASE_CLASS}--${sizeClassMap[size]}`,
    toggleState === "indeterminate" && `${BASE_CLASS}--indeterminate`,
    disabled && `${BASE_CLASS}--disabled`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!disabled && onChange) {
      onChange(event.target.checked);
    }
  };

  return (
    <label className={classNames} htmlFor={id}>
      <input
        ref={inputRef}
        type="checkbox"
        role="switch"
        id={id}
        className={`${BASE_CLASS}__input`}
        checked={checked || toggleState === "on"}
        aria-checked={ariaChecked}
        aria-disabled={disabled || undefined}
        onChange={handleChange}
        disabled={disabled}
        {...props}
      />
      <span className={`${BASE_CLASS}__slider`} aria-hidden="true">
        {toggleState === "indeterminate" ? (
          <span className={`${BASE_CLASS}__dash`} />
        ) : (
          <span className={`${BASE_CLASS}__thumb`} />
        )}
      </span>
    </label>
  );
}
