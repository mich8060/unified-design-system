import React from "react";
import "./Radio.scss";

/**
 * Radio component for form inputs
 * @param {boolean} checked - Whether the radio button is checked
 * @param {function} onChange - Callback function when radio button state changes
 * @param {string} name - Name attribute for grouping radio buttons (required for proper functionality)
 * @param {string} id - Unique identifier for the radio input
 * @param {string} value - Value of the radio button
 * @param {string} label - Label text for the radio button
 * @param {boolean} disabled - Whether the radio button is disabled
 * @param {string} className - Additional CSS classes
 * @param {object} props - Additional props to pass to the radio input
 */
export default function Radio({
  checked = false,
  onChange,
  name,
  id,
  value,
  label,
  disabled = false,
  className = "",
  ...props
}) {
  const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;

  const handleChange = (event) => {
    if (!disabled && onChange) {
      onChange(event);
    }
  };

  return (
    <label
      className={`radio ${disabled ? "radio--disabled" : ""} ${className}`}
      htmlFor={radioId}
    >
      <input
        type="radio"
        id={radioId}
        name={name}
        value={value}
        className="radio__input"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        {...props}
      />
      <span className="radio__circle">
        {checked && <span className="radio__dot" />}
      </span>
      {label && <span className="radio__label">{label}</span>}
    </label>
  );
}
