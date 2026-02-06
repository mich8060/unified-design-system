import React, { useState, useRef, useEffect } from "react";
import "./Tooltip.scss";

const BASE_CLASS = "uds-tooltip";

const placementClassMap = {
  top: "top",
  bottom: "bottom",
  left: "left",
  right: "right",
};

/**
 * Tooltip component that displays a message when hovering over its children
 * @param {ReactNode} children - The element that triggers the tooltip
 * @param {string} content - The tooltip message text
 * @param {string} placement - Tooltip placement: 'top', 'bottom', 'left', 'right' (default: 'top')
 * @param {boolean} disabled - Whether the tooltip is disabled
 * @param {string} className - Additional CSS classes
 * @param {object} props - Additional props to pass to the wrapper element
 */
export default function Tooltip({
  children,
  content,
  placement = "top",
  disabled = false,
  className = "",
  ...props
}) {
  const [isVisible, setIsVisible] = useState(false);
  const wrapperRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (!isVisible || !tooltipRef.current || !wrapperRef.current) return;

    const tooltip = tooltipRef.current;
    const wrapper = wrapperRef.current;
    const rect = wrapper.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    // Position the tooltip based on placement
    let top = 0;
    let left = 0;

    switch (placement) {
      case "top":
        top = rect.top - tooltipRect.height - 8;
        left = rect.left + rect.width / 2 - tooltipRect.width / 2;
        break;
      case "bottom":
        top = rect.bottom + 8;
        left = rect.left + rect.width / 2 - tooltipRect.width / 2;
        break;
      case "left":
        top = rect.top + rect.height / 2 - tooltipRect.height / 2;
        left = rect.left - tooltipRect.width - 8;
        break;
      case "right":
        top = rect.top + rect.height / 2 - tooltipRect.height / 2;
        left = rect.right + 8;
        break;
    }

    // Keep tooltip within viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (left < 8) left = 8;
    if (left + tooltipRect.width > viewportWidth - 8) {
      left = viewportWidth - tooltipRect.width - 8;
    }
    if (top < 8) top = 8;
    if (top + tooltipRect.height > viewportHeight - 8) {
      top = viewportHeight - tooltipRect.height - 8;
    }

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
  }, [isVisible, placement]);

  if (!content || disabled) {
    return <>{children}</>;
  }

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const classNames = [
    BASE_CLASS,
    placementClassMap[placement] &&
      `${BASE_CLASS}--${placementClassMap[placement]}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={wrapperRef}
      className={classNames}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`${BASE_CLASS}__content`}
          role="tooltip"
        >
          {content}
        </div>
      )}
    </div>
  );
}
