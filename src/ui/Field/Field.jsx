import React from "react";
import Icon from "../Icon/Icon";
import "./Field.scss";

const BASE_CLASS = "uds-field";

/**
 * Field component for form input fields with label, helper text, and optional features
 * @param {string} label - Label text for the field
 * @param {boolean} required - Whether the field is required (adds asterisk to label)
 * @param {string} helperMessage - Helper text displayed below the input
 * @param {string} infoIcon - Icon name for info icon (e.g., "Info")
 * @param {function} onInfoClick - Callback when info icon is clicked
 * @param {number} maxLength - Maximum character length (enables character count)
 * @param {number|string} value - Current value (for character count calculation)
 * @param {string} id - Unique identifier for the field
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} children - The input element to wrap
 * @param {object} props - Additional props to pass to the field wrapper
 */
export default function Field({
  label,
  required = false,
  helperMessage,
  infoIcon,
  onInfoClick,
  maxLength,
  value,
  id,
  className = "",
  children,
  ...props
}) {
  const fieldId = id || `field-${Math.random().toString(36).substr(2, 9)}`;

  // Calculate character count if maxLength is provided
  const currentLength = value ? String(value).length : 0;
  const showCharacterCount = maxLength !== undefined && maxLength !== null;

  const classNames = [BASE_CLASS, className].filter(Boolean).join(" ");

  return (
    <div className={classNames} {...props}>
      {/* Label Row */}
      {(label || infoIcon) && (
        <div className={`${BASE_CLASS}__label-row`}>
          {label && (
            <label htmlFor={fieldId} className={`${BASE_CLASS}__label`}>
              {label}
              {required && <span className={`${BASE_CLASS}__required`}>*</span>}
            </label>
          )}
          {infoIcon && (
            <button
              type="button"
              className={`${BASE_CLASS}__info-icon`}
              onClick={onInfoClick}
              aria-label="More information"
              tabIndex={0}
            >
              <Icon name={infoIcon} size={16} appearance="regular" />
            </button>
          )}
        </div>
      )}

      {/* Input Slot */}
      <div className={`${BASE_CLASS}__input-wrapper`}>
        {React.isValidElement(children) && fieldId
          ? React.cloneElement(children, {
              id: fieldId,
              maxLength: maxLength || children.props.maxLength,
              ...children.props,
            })
          : children}
        {showCharacterCount && (
          <span className={`${BASE_CLASS}__character-count`}>
            {currentLength}/{maxLength}
          </span>
        )}
      </div>

      {/* Helper Message */}
      {helperMessage && (
        <div className={`${BASE_CLASS}__helper`}>{helperMessage}</div>
      )}
    </div>
  );
}
