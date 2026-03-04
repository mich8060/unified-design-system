import React from "react";
import Icon from "../Icon/Icon";
import Tooltip from "../Tooltip/Tooltip";
import "./_field.scss";
import type { FieldProps } from "./Field.types";

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
  state = "default",
  required = false,
  helperMessage,
  maxLength,
  value,
  infoIcon,
  onInfoClick,
  id,
  className = "",
  children,
  ...props
}: FieldProps) {
  const fieldId = id || `field-${Math.random().toString(36).substr(2, 9)}`;
  const isInfoInteractive = typeof onInfoClick === "function";
  const showCharacterCount = typeof maxLength === "number";
  const currentLength =
    value === undefined || value === null ? 0 : String(value).length;

  const classNames = [BASE_CLASS, `${BASE_CLASS}--${state}`, className].filter(Boolean).join(" ");

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
            <div className={`${BASE_CLASS}__info`}>
              <span className={`${BASE_CLASS}__info-text`}>Info</span>
              <Tooltip content="More information">
                <span
                  className={`${BASE_CLASS}__info-icon`}
                  role={isInfoInteractive ? "button" : undefined}
                  tabIndex={isInfoInteractive ? 0 : undefined}
                  aria-label={isInfoInteractive ? "More information" : undefined}
                  onClick={onInfoClick}
                  onKeyDown={(event) => {
                    if (!isInfoInteractive) return;
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      onInfoClick();
                    }
                  }}
                >
                  <Icon name={infoIcon} size={16} appearance="regular" />
                </span>
              </Tooltip>
            </div>
          )}
        </div>
      )}

      {/* Input Slot */}
      <div className={`${BASE_CLASS}__input-wrapper`}>
        {React.isValidElement(children) && fieldId
          ? React.cloneElement(children, {
              id: fieldId,
              ...children.props,
            })
          : children}
      </div>

      {(helperMessage || showCharacterCount) && (
        <div className={`${BASE_CLASS}__meta`}>
          {helperMessage ? (
            <div className={`${BASE_CLASS}__helper`}>{helperMessage}</div>
          ) : (
            <span />
          )}
          {showCharacterCount && (
            <div className={`${BASE_CLASS}__character-count`}>
              {currentLength}/{maxLength}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
