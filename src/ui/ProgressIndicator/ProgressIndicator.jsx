import React from "react";
import "./ProgressIndicator.scss";

const BASE_CLASS = "uds-progress-indicator";

const variantClassMap = {
  default: "default",
  blue: "blue",
  green: "green",
  success: "green",
  orange: "orange",
  warning: "orange",
  red: "red",
  error: "red",
  purple: "purple",
};

const sizeClassMap = {
  small: "small",
  medium: "medium",
  large: "large",
};

/**
 * ProgressIndicator component for displaying progress bars
 * @param {number} value - Progress value (0-100)
 * @param {number} max - Maximum value (default: 100)
 * @param {string} variant - Color variant: 'default', 'blue', 'green', 'success', 'orange', 'warning', 'red', 'error', 'purple'
 * @param {string} size - Size variant: 'small', 'medium', or 'large'
 * @param {string} label - Optional label text to display above the progress bar
 * @param {boolean} showValue - Whether to show the percentage value
 * @param {boolean} showLabel - Whether to show the label (if provided)
 * @param {string} className - Additional CSS classes
 * @param {string} 'aria-label' - Accessible label for screen readers
 * @param {object} props - Additional props to pass to the progress element
 */
export default function ProgressIndicator({
  value = 0,
  max = 100,
  variant = "default",
  size = "medium",
  label,
  showValue = false,
  showLabel = true,
  className = "",
  "aria-label": ariaLabel,
  ...props
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const displayValue = Math.round(percentage);

  const classNames = [
    BASE_CLASS,
    variantClassMap[variant] && `${BASE_CLASS}--${variantClassMap[variant]}`,
    sizeClassMap[size] && `${BASE_CLASS}--${sizeClassMap[size]}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const progressId = `progress-${Math.random().toString(36).substr(2, 9)}`;
  const labelId = label ? `${progressId}-label` : undefined;

  return (
    <div className={classNames} {...props}>
      {(label && showLabel) || showValue ? (
        <div className={`${BASE_CLASS}__header`}>
          {label && showLabel && (
            <span id={labelId} className={`${BASE_CLASS}__label`}>
              {label}
            </span>
          )}
          {showValue && (
            <span className={`${BASE_CLASS}__value`}>{displayValue}%</span>
          )}
        </div>
      ) : null}
      <div className={`${BASE_CLASS}__track`}>
        <div
          className={`${BASE_CLASS}__fill`}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={ariaLabel || label || `Progress: ${displayValue}%`}
          aria-labelledby={labelId}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
