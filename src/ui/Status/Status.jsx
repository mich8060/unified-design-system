import React from "react";
import DotStatus from "../DotStatus/DotStatus";
import "./Status.scss";

const BASE_CLASS = "uds-status";

const appearanceClassMap = {
  "light-gray": "light-gray",
  white: "white",
};

const shapeClassMap = {
  pill: "pill",
  rounded: "rounded",
};

/**
 * Status component for displaying status indicators with labels
 * @param {string} label - The text content of the status
 * @param {string} variant - Color variant for the status dot
 * @param {string} appearance - Background appearance: 'light-gray' or 'white'
 * @param {string} shape - Shape variant: 'pill' (fully rounded) or 'rounded' (slightly rounded)
 * @param {string} className - Additional CSS classes
 * @param {function} onClick - Click handler function
 * @param {boolean} disabled - Whether the status is disabled
 * @param {object} props - Additional props to pass to the status element
 */
export default function Status({
  label,
  variant = "blue",
  appearance = "light-gray",
  shape = "pill",
  className = "",
  onClick,
  disabled = false,
  ...props
}) {
  const classNames = [
    BASE_CLASS,
    appearanceClassMap[appearance] &&
      `${BASE_CLASS}--${appearanceClassMap[appearance]}`,
    shapeClassMap[shape] && `${BASE_CLASS}--${shapeClassMap[shape]}`,
    disabled && `${BASE_CLASS}--disabled`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const Element = onClick ? "button" : "span";

  return (
    <Element
      className={classNames}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      {...props}
    >
      <DotStatus
        variant={variant}
        size="small"
        className={`${BASE_CLASS}__dot`}
      />
      {label && <span className={`${BASE_CLASS}__label`}>{label}</span>}
    </Element>
  );
}
