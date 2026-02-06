import React from "react";
import "./DotStatus.scss";

const BASE_CLASS = "uds-dot-status";

const variantClassMap = {
  "light-gray": "light-gray",
  red: "red",
  orange: "orange",
  yellow: "yellow",
  "light-green": "light-green",
  green: "green",
  blue: "blue",
  "dark-blue": "dark-blue",
  teal: "teal",
  purple: "purple",
  pink: "pink",
  magenta: "magenta",
  "dark-red": "dark-red",
  "dark-gray": "dark-gray",
};

const sizeClassMap = {
  small: "small",
  medium: "medium",
  large: "large",
};

/**
 * Dot Status component for displaying status indicators
 * @param {string} variant - Color variant
 * @param {string} size - Size variant: 'small', 'medium', or 'large'
 * @param {boolean} outline - Whether to show an outline/border around the dot
 * @param {string} className - Additional CSS classes
 * @param {string} 'aria-label' - Accessible label for screen readers
 * @param {object} props - Additional props to pass to the dot element
 */
export default function DotStatus({
  variant = "blue",
  size = "medium",
  outline = false,
  className = "",
  "aria-label": ariaLabel,
  ...props
}) {
  const classNames = [
    BASE_CLASS,
    variantClassMap[variant] && `${BASE_CLASS}--${variantClassMap[variant]}`,
    sizeClassMap[size] && `${BASE_CLASS}--${sizeClassMap[size]}`,
    outline && `${BASE_CLASS}--outline`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className={classNames}
      role="status"
      aria-label={ariaLabel || `${variant} status`}
      {...props}
    />
  );
}
