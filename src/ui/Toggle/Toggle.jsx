import React from "react";
import "./Toggle.scss";

const BASE_CLASS = "uds-toggle";

const sizeClassMap = {
  large: "large",
  small: "small",
};

/**
 * Toggle component for switching between states
 * @param {boolean} checked - Whether the toggle is checked (on/off)
 * @param {string} state - Toggle state: 'off', 'on', or 'indeterminate' (default: 'off')
 * @param {string} size - Toggle size: 'large' or 'small' (default: 'large')
 * @param {boolean} bordered - Whether to show border (default: false)
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
  bordered = false,
  onChange,
  disabled = false,
  id,
  className = "",
  ...props
}) {
  // Determine state from checked prop if state is not provided
  const toggleState = state || (checked ? "on" : "off");

  const classNames = [
    BASE_CLASS,
    sizeClassMap[size] && `${BASE_CLASS}--${sizeClassMap[size]}`,
    bordered && `${BASE_CLASS}--bordered`,
    toggleState === "indeterminate" && `${BASE_CLASS}--indeterminate`,
    disabled && `${BASE_CLASS}--disabled`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleChange = (event) => {
    if (!disabled && onChange) {
      onChange(event.target.checked);
    }
  };

  return (
    <label className={classNames} htmlFor={id} {...props}>
      <input
        type="checkbox"
        id={id}
        className={`${BASE_CLASS}__input`}
        checked={checked || toggleState === "on"}
        onChange={handleChange}
        disabled={disabled}
      />
      <span className={`${BASE_CLASS}__slider`}>
        {toggleState === "indeterminate" ? (
          <span className={`${BASE_CLASS}__dash`} />
        ) : (
          <span className={`${BASE_CLASS}__thumb`} />
        )}
      </span>
    </label>
  );
}
