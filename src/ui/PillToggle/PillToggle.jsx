import React from "react";
import "./PillToggle.scss";

const BASE_CLASS = "uds-pill-toggle";

/**
 * PillToggle component for switching between selected and unselected states
 * @param {string} label - The text content of the toggle
 * @param {boolean} selected - Whether the toggle is selected
 * @param {function} onChange - Callback function when toggle state changes
 * @param {string} id - Unique identifier for the toggle input
 * @param {boolean} disabled - Whether the toggle is disabled
 * @param {string} className - Additional CSS classes
 * @param {object} props - Additional props to pass to the toggle
 */
export default function PillToggle({
  label = "Label States",
  selected = false,
  onChange,
  id,
  disabled = false,
  className = "",
  ...props
}) {
  const toggleId =
    id || `pill-toggle-${Math.random().toString(36).substr(2, 9)}`;

  const handleChange = (event) => {
    if (!disabled && onChange) {
      onChange(event.target.checked);
    }
  };

  const classNames = [
    BASE_CLASS,
    selected && `${BASE_CLASS}--selected`,
    disabled && `${BASE_CLASS}--disabled`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={classNames} htmlFor={toggleId} {...props}>
      <input
        type="checkbox"
        id={toggleId}
        className={`${BASE_CLASS}__input`}
        checked={selected}
        onChange={handleChange}
        disabled={disabled}
      />
      <span className={`${BASE_CLASS}__label`}>{label}</span>
    </label>
  );
}
