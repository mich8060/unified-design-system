import React from "react";
import "./Badge.scss";

const BASE_CLASS = "uds-badge";

const variantClassMap = {
  red: "red",
  orange: "orange",
  yellow: "yellow",
  green: "green",
  "dark-green": "dark-green",
  blue: "blue",
  "dark-blue": "dark-blue",
  purple: "purple",
  pink: "pink",
  gray: "gray",
  outline: "outline",
};

/**
 * Badge component for displaying badges
 * @param {number|string} count - The count to display (will be formatted with + if over maxCount)
 * @param {string} variant - Color variant: 'red', 'orange', 'yellow', 'green', 'dark-green', 'blue', 'dark-blue', 'purple', 'pink', 'gray', 'outline'
 * @param {number} maxCount - Maximum count to display before showing "+" (default: 99)
 * @param {string} className - Additional CSS classes
 * @param {object} props - Additional props to pass to the badge element
 */
export default function Badge({
  count,
  variant = "red",
  maxCount = 99,
  className = "",
  ...props
}) {
  // Format the count: if over maxCount, show maxCount+
  const formatCount = (num) => {
    const numCount = typeof num === "number" ? num : parseInt(num, 10);
    if (isNaN(numCount)) return "0";
    if (numCount > maxCount) {
      return `${maxCount}+`;
    }
    return numCount.toString();
  };

  const formattedCount = formatCount(count);

  const classNames = [
    BASE_CLASS,
    variantClassMap[variant] && `${BASE_CLASS}--${variantClassMap[variant]}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (!count || count === 0) {
    return null;
  }

  return (
    <span className={classNames} {...props}>
      {formattedCount}
    </span>
  );
}
