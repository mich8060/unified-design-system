import React from "react";
import Icon from "../Icon/Icon";
import "./Checkbox.scss";

/**
 * Checkbox component for form inputs
 * @param {boolean} checked - Whether the checkbox is checked
 * @param {function} onChange - Callback function when checkbox state changes
 * @param {string} id - Unique identifier for the checkbox input
 * @param {string} label - Label text for the checkbox
 * @param {boolean} disabled - Whether the checkbox is disabled
 * @param {boolean} indeterminate - Whether the checkbox is in indeterminate state
 * @param {string} className - Additional CSS classes
 * @param {object} props - Additional props to pass to the checkbox
 */
export default function Checkbox({
  checked = false,
  onChange,
  id,
  label,
  disabled = false,
  indeterminate = false,
  className = "",
  ...props
}) {
  const checkboxId =
    id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  const handleChange = (event) => {
    if (!disabled && onChange) {
      onChange(event.target.checked);
    }
  };

  return (
    <label
      className={`checkbox ${disabled ? "checkbox--disabled" : ""} ${className}`}
      htmlFor={checkboxId}
    >
      <input
        type="checkbox"
        id={checkboxId}
        className="checkbox__input"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        ref={(input) => {
          if (input) {
            input.indeterminate = indeterminate;
          }
        }}
        {...props}
      />
      <span className="checkbox__box">
        {checked && (
          <Icon
            name="Check"
            size={16}
            appearance="bold"
            className="checkbox__icon"
          />
        )}
        {indeterminate && !checked && (
          <span className="checkbox__indeterminate" />
        )}
      </span>
      {label && <span className="checkbox__label">{label}</span>}
    </label>
  );
}
