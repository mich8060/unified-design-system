import React from "react";
import "./Flex.scss";

/**
 * Flex layout component
 * @param {string} direction - Flex direction: 'row', 'column', 'row-reverse', 'column-reverse'
 * @param {string} gap - Gap between items (uses UDS gap tokens)
 * @param {string} alignItems - Align items: 'flex-start', 'flex-end', 'center', 'stretch', 'baseline'
 * @param {string} justifyContent - Justify content: 'flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'
 * @param {boolean} wrap - Whether to wrap items
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} children - Child elements
 * @param {object} props - Additional props to pass to the flex container
 */
export default function Flex({
  direction = "row",
  gap,
  alignItems,
  justifyContent,
  wrap = false,
  className = "",
  children,
  ...props
}) {
  const flexClasses = [
    "uds-flex",
    direction && `uds-flex--${direction}`,
    wrap && "uds-flex--wrap",
    gap && `uds-flex--gap-${gap}`,
    alignItems && `uds-flex--align-${alignItems.replace("-", "_")}`,
    justifyContent && `uds-flex--justify-${justifyContent.replace(/-/g, "_")}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={flexClasses} {...props}>
      {children}
    </div>
  );
}
