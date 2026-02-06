import React from "react";
import Icon from "../Icon/Icon";
import Badge from "../Badge/Badge";

const BASE_CLASS = "uds-tabs-item";

const appearanceClassMap = {
  underline: "underline",
  block: "block",
  "block-inverted": "block-inverted",
};

/**
 * TabItem component - A single tab item building block
 * Can be used standalone or assembled into a Tabs component
 *
 * @param {string} label - The text content of the tab
 * @param {string} appearance - Visual style variant: 'underline', 'block', or 'block-inverted'
 * @param {boolean} active - Whether the tab is currently active
 * @param {string|boolean} icon - Icon name to display (or false/undefined for no icon)
 * @param {number|string|boolean} tag - Badge count to display (or false/undefined for no badge)
 * @param {string} tagVariant - Badge color variant (default: 'red')
 * @param {string} className - Additional CSS classes
 * @param {function} onClick - Click handler function
 * @param {object} props - Additional props to pass to the tab element
 */
export default function TabItem({
  label,
  appearance = "underline",
  active = false,
  icon,
  tag,
  tagVariant = "red",
  className = "",
  onClick,
  ...props
}) {
  const classNames = [BASE_CLASS, active && `active`, className]
    .filter(Boolean)
    .join(" ");

  const Element = onClick ? "button" : "div";

  const hasIcon = !!icon && typeof icon === "string";
  const hasTag = !!tag && (typeof tag === "number" || typeof tag === "string");

  // Ensure label is a string, not an object
  let labelText = "";
  if (label != null) {
    if (typeof label === "string") {
      labelText = label;
    } else if (typeof label !== "object") {
      // Only convert non-objects to string
      labelText = String(label);
    }
    // If label is an object, labelText remains empty string
  }

  // Filter out any object values from props to prevent rendering objects
  const safeProps = {};
  if (props) {
    Object.keys(props).forEach(key => {
      const value = props[key];
      // Only include props that are not objects (or are React elements)
      if (value == null || typeof value !== "object" || React.isValidElement(value)) {
        safeProps[key] = value;
      }
    });
  }

  return (
    <Element
      className={classNames}
      onClick={onClick}
      role={onClick ? "tab" : undefined}
      aria-selected={onClick ? active : undefined}
      {...safeProps}
    >
      {hasIcon && (
        <Icon name={icon} size={16} appearance="bold" />
      )}
      {labelText && <span>{labelText}</span>}
      {hasTag && <Badge count={tag} variant={tagVariant} />}
    </Element>
  );
}
