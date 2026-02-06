import React, { useRef, useEffect, useState } from "react";
import TabItem from "./TabItem";
import Button from "../Button/Button";
import "./Tabs.scss";

const BASE_CLASS = "uds-tabs";

const appearanceClassMap = {
  underline: "underline",
  block: "block",
  "block-inverted": "block-inverted",
};

/**
 * Tabs component - A simple complete tab group
 *
 * @param {Array} tabs - Array of tab objects: [{ label, icon?, tag?, onClick? }, ...]
 * @param {string} appearance - Visual style variant: 'underline', 'block', or 'block-inverted'
 * @param {number} activeTab - Index of the currently active tab (0-based)
 * @param {boolean} fill - Whether tabs should fill available width (default: false)
 * @param {boolean} scrollable - Whether tabs should scroll when overflowing (default: false)
 * @param {function} onTabChange - Callback when tab changes: (index) => void
 * @param {string} className - Additional CSS classes
 * @param {object} props - Additional props to pass to the tabs container
 */
export default function Tabs({
  tabs = [],
  appearance = "underline",
  activeTab,
  fill = false,
  scrollable = false,
  onTabChange,
  className = "",
  ...props
}) {
  const tabsContainerRef = useRef(null);
  const tabsListRef = useRef(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Default to first tab (index 0) if activeTab is not provided or invalid
  const currentActiveTab = activeTab !== undefined && activeTab !== null && activeTab >= 0 && activeTab < tabs.length
    ? activeTab
    : 0;

  const classNames = [
    BASE_CLASS,
    appearanceClassMap[appearance] &&
      `${BASE_CLASS}--${appearanceClassMap[appearance]}`,
    fill && `${BASE_CLASS}--fill`,
    scrollable && `${BASE_CLASS}--scrollable`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleTabClick = (index, tab) => {
    if (tab.onClick) {
      tab.onClick(index, tab);
    }
    if (onTabChange) {
      onTabChange(index, tab);
    }
  };

  // Check if scrolling is needed and update scroll button visibility
  const checkScrollButtons = () => {
    if (!scrollable || !tabsContainerRef.current || !tabsListRef.current) {
      return;
    }

    const container = tabsContainerRef.current;
    const list = tabsListRef.current;
    const containerWidth = container.offsetWidth;
    const listWidth = list.scrollWidth;
    const scrollLeft = list.scrollLeft;

    setShowLeftScroll(scrollLeft > 0);
    setShowRightScroll(scrollLeft < listWidth - containerWidth - 1);
    setScrollPosition(scrollLeft);
  };

  // Scroll to active tab if it's not visible
  const scrollToActiveTab = () => {
    if (!scrollable || !tabsListRef.current || currentActiveTab === undefined) {
      return;
    }

    const list = tabsListRef.current;
    const container = tabsContainerRef.current;
    const activeTabElement = list.children[currentActiveTab];

    if (!activeTabElement || !container) {
      return;
    }

    const containerLeft = container.offsetLeft;
    const containerWidth = container.offsetWidth;
    const tabLeft = activeTabElement.offsetLeft;
    const tabWidth = activeTabElement.offsetWidth;
    const scrollLeft = list.scrollLeft;

    // Check if tab is outside visible area
    const tabRight = tabLeft + tabWidth;
    const visibleLeft = scrollLeft;
    const visibleRight = scrollLeft + containerWidth;

    if (tabLeft < visibleLeft) {
      // Tab is to the left of visible area
      list.scrollTo({
        left: tabLeft - 16, // Add some padding
        behavior: "smooth",
      });
    } else if (tabRight > visibleRight) {
      // Tab is to the right of visible area
      list.scrollTo({
        left: tabRight - containerWidth + 16, // Add some padding
        behavior: "smooth",
      });
    }
  };

  // Handle scroll button clicks
  const handleScrollLeft = () => {
    if (!tabsListRef.current) return;
    const scrollAmount = tabsListRef.current.offsetWidth * 0.75;
    tabsListRef.current.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  };

  const handleScrollRight = () => {
    if (!tabsListRef.current) return;
    const scrollAmount = tabsListRef.current.offsetWidth * 0.75;
    tabsListRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  // Check scroll buttons on mount, resize, and scroll
  useEffect(() => {
    if (!scrollable) return;

    checkScrollButtons();
    scrollToActiveTab();

    const container = tabsContainerRef.current;
    const list = tabsListRef.current;

    if (!container || !list) return;

    const resizeObserver = new ResizeObserver(() => {
      checkScrollButtons();
      scrollToActiveTab();
    });

    resizeObserver.observe(container);
    resizeObserver.observe(list);

    list.addEventListener("scroll", checkScrollButtons);

    return () => {
      resizeObserver.disconnect();
      list.removeEventListener("scroll", checkScrollButtons);
    };
  }, [scrollable, tabs.length]);

  // Auto-select first tab on mount if no activeTab is provided
  useEffect(() => {
    if (activeTab === undefined || activeTab === null) {
      if (onTabChange && tabs.length > 0) {
        onTabChange(0, tabs[0]);
      }
    }
  }, []); // Only run on mount

  // Scroll to active tab when it changes
  useEffect(() => {
    if (scrollable) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        scrollToActiveTab();
        checkScrollButtons();
      }, 100);
    }
  }, [currentActiveTab, scrollable]);

  // Early return after all hooks
  if (!tabs || tabs.length === 0) {
    return null;
  }

  const tabsContent = (
    <div
      ref={tabsListRef}
      className={`${BASE_CLASS}__list`}
      role="tablist"
      {...props}
    >
      {tabs.map((tab, index) => {
        // Ensure tab is an object and extract safe values
        if (!tab || typeof tab !== "object") return null;
        
        // Safely extract label - ensure it's a string, not an object
        const label = (tab.label != null && typeof tab.label === "string")
          ? tab.label
          : (tab.label != null && typeof tab.label !== "object")
          ? String(tab.label)
          : "";
        
        // Safely extract icon - only use if it's a string
        const icon = typeof tab.icon === "string" ? tab.icon : undefined;
        
        // Safely extract tag - only use if it's a number or string
        const tag = (typeof tab.tag === "number" || typeof tab.tag === "string") 
          ? tab.tag 
          : undefined;
        
        // Safely extract tagVariant - only use if it's a string
        const tagVariant = typeof tab.tagVariant === "string" ? tab.tagVariant : undefined;
        
        // Safely get key - ensure it's a string or number
        const tabKey = (tab.id != null && typeof tab.id !== "object")
          ? (typeof tab.id === "string" || typeof tab.id === "number" ? tab.id : String(tab.id))
          : index;
        
        return (
          <TabItem
            key={tabKey}
            label={label}
            appearance={appearance}
            active={index === currentActiveTab}
            icon={icon}
            tag={tag}
            tagVariant={tagVariant}
            onClick={() => handleTabClick(index, tab)}
          />
        );
      })}
    </div>
  );

  if (scrollable) {
    return (
      <div ref={tabsContainerRef} className={classNames}>
        {showLeftScroll && (
          <Button
            appearance="ghost"
            layout="icon-only"
            icon="CaretLeft"
            onClick={handleScrollLeft}
            className={`${BASE_CLASS}__scroll-button ${BASE_CLASS}__scroll-button--left`}
            aria-label="Scroll tabs left"
          />
        )}
        {tabsContent}
        {showRightScroll && (
          <Button
            appearance="ghost"
            layout="icon-only"
            icon="CaretRight"
            onClick={handleScrollRight}
            className={`${BASE_CLASS}__scroll-button ${BASE_CLASS}__scroll-button--right`}
            aria-label="Scroll tabs right"
          />
        )}
      </div>
    );
  }

  return (
    <div className={classNames} role="tablist" {...props}>
      {tabs.map((tab, index) => {
        // Ensure tab is an object and extract safe values
        if (!tab || typeof tab !== "object") return null;
        
        // Safely extract label - ensure it's a string, not an object
        const label = (tab.label != null && typeof tab.label === "string")
          ? tab.label
          : (tab.label != null && typeof tab.label !== "object")
          ? String(tab.label)
          : "";
        
        // Safely extract icon - only use if it's a string
        const icon = typeof tab.icon === "string" ? tab.icon : undefined;
        
        // Safely extract tag - only use if it's a number or string
        const tag = (typeof tab.tag === "number" || typeof tab.tag === "string") 
          ? tab.tag 
          : undefined;
        
        // Safely extract tagVariant - only use if it's a string
        const tagVariant = typeof tab.tagVariant === "string" ? tab.tagVariant : undefined;
        
        // Safely get key - ensure it's a string or number
        const tabKey = (tab.id != null && typeof tab.id !== "object")
          ? (typeof tab.id === "string" || typeof tab.id === "number" ? tab.id : String(tab.id))
          : index;
        
        return (
          <TabItem
            key={tabKey}
            label={label}
            appearance={appearance}
            active={index === currentActiveTab}
            icon={icon}
            tag={tag}
            tagVariant={tagVariant}
            onClick={() => handleTabClick(index, tab)}
          />
        );
      })}
    </div>
  );
}
