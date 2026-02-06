import React, { useState } from "react";
import Icon from "../Icon/Icon";
import "./Accordion.scss";

/**
 * AccordionItem component - individual accordion item
 * @param {string} label - The label text for the accordion item
 * @param {boolean} defaultExpanded - Whether the item is expanded by default
 * @param {React.ReactNode} children - Content to display when expanded
 * @param {string} className - Additional CSS classes
 * @param {function} onToggle - Callback when item is toggled (receives new expanded state)
 * @param {object} props - Additional props to pass to the accordion item
 */
export function AccordionItem({
  label,
  defaultExpanded = false,
  children,
  className = "",
  onToggle,
  ...props
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const handleToggle = () => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    onToggle?.(newExpanded);
  };

  return (
    <div className={`accordion-item ${className}`} {...props}>
      <button
        className="accordion-item__header"
        onClick={handleToggle}
        aria-expanded={expanded}
        aria-controls={`accordion-content-${props.id || label}`}
      >
        <span className="accordion-item__label">{label}</span>
        <Icon
          name="CaretDown"
          size={16}
          appearance="bold"
          className={`accordion-item__icon ${expanded ? "accordion-item__icon--expanded" : ""}`}
        />
      </button>
      <div
        id={`accordion-content-${props.id || label}`}
        className={`accordion-item__body ${expanded ? "accordion-item__body--expanded" : ""}`}
      >
        <div className="accordion-item__body-inner">
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * Accordion component - container for accordion items
 * @param {React.ReactNode} children - AccordionItem components
 * @param {string} className - Additional CSS classes
 * @param {object} props - Additional props to pass to the accordion container
 */
export default function Accordion({ children, className = "", ...props }) {
  return (
    <div className={`accordion ${className}`} {...props}>
      {children}
    </div>
  );
}
