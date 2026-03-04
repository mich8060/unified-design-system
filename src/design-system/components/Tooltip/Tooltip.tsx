import React, { useState, useRef, useEffect } from "react";
import "./_tooltip.scss";
import type { TooltipProps } from "./Tooltip.types";

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
  defaultVisible = false,
  className = "",
  ...props
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(defaultVisible);
  const wrapperRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    setIsVisible(defaultVisible);
  }, [defaultVisible]);

  useEffect(() => {
    if (!isVisible || !tooltipRef.current || !wrapperRef.current) return;

    const tooltip = tooltipRef.current;
    const wrapper = wrapperRef.current;
    const rect = wrapper.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    // Position tooltip relative to wrapper first.
    let top = 0;
    let left = 0;

    switch (placement) {
      case "top":
        top = -tooltipRect.height - 8;
        left = rect.width / 2 - tooltipRect.width / 2;
        break;
      case "bottom":
        top = rect.height + 8;
        left = rect.width / 2 - tooltipRect.width / 2;
        break;
      case "left":
        top = rect.height / 2 - tooltipRect.height / 2;
        left = -tooltipRect.width - 8;
        break;
      case "right":
        top = rect.height / 2 - tooltipRect.height / 2;
        left = rect.width + 8;
        break;
      default:
        break;
    }

    // Keep tooltip within viewport while still using wrapper-relative coordinates.
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    let absoluteLeft = rect.left + left;
    let absoluteTop = rect.top + top;

    if (absoluteLeft < 8) {
      left += 8 - absoluteLeft;
      absoluteLeft = 8;
    }
    if (absoluteLeft + tooltipRect.width > viewportWidth - 8) {
      left -= absoluteLeft + tooltipRect.width - (viewportWidth - 8);
    }

    if (absoluteTop < 8) {
      top += 8 - absoluteTop;
      absoluteTop = 8;
    }
    if (absoluteTop + tooltipRect.height > viewportHeight - 8) {
      top -= absoluteTop + tooltipRect.height - (viewportHeight - 8);
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
    if (defaultVisible) return;
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
