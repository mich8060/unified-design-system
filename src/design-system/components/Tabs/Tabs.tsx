import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import TabItem from "./TabItem";
import Button from "../Button/Button";
import Dropdown from "../Dropdown/Dropdown";
import "./_tabs.scss";
import type { TabsProps } from "./Tabs.types";

const BASE_CLASS = "uds-tabs";
const MAX_VISIBLE_TABS = 6;

const appearanceClassMap = {
  underline: "underline",
  block: "block",
  "block-inverted": "block-inverted",
};

const orientationClassMap = {
  horizontal: "horizontal",
  vertical: "vertical",
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
function Tabs({
  tabs = [],
  appearance = "underline",
  orientation = "horizontal",
  activeTab,
  fill = false,
  scrollable = false,
  onTabChange,
  className = "",
  ...props
}: TabsProps) {
  const tabsContainerRef = useRef<HTMLDivElement | null>(null);
  const tabsListRef = useRef<HTMLDivElement | null>(null);
  const tabsGroupId = useId().replace(/[:]/g, "");
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const isScrollable = scrollable && orientation === "horizontal";

  // Default to first tab (index 0) if activeTab is not provided or invalid
  const currentActiveTab = activeTab !== undefined && activeTab !== null && activeTab >= 0 && activeTab < tabs.length
    ? activeTab
    : 0;
  const hasOverflowTabs = tabs.length > MAX_VISIBLE_TABS;
  const visibleTabs = hasOverflowTabs ? tabs.slice(0, MAX_VISIBLE_TABS) : tabs;
  const overflowTabs = hasOverflowTabs ? tabs.slice(MAX_VISIBLE_TABS) : [];
  const [selectedOverflowIndex, setSelectedOverflowIndex] = useState<number | null>(null);

  const classNames = [
    BASE_CLASS,
    appearanceClassMap[appearance] &&
      `${BASE_CLASS}--${appearanceClassMap[appearance]}`,
    orientationClassMap[orientation] &&
      `${BASE_CLASS}--${orientationClassMap[orientation]}`,
    fill && `${BASE_CLASS}--fill`,
    isScrollable && `${BASE_CLASS}--scrollable`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleTabClick = useCallback((index, tab) => {
    if (tab.onClick) {
      tab.onClick(index, tab);
    }
    if (onTabChange) {
      onTabChange(index, tab);
    }
  }, [onTabChange]);

  const focusTabAtIndex = useCallback((index: number) => {
    if (!tabsListRef.current) return;
    const tabElements = tabsListRef.current.querySelectorAll<HTMLElement>('[role="tab"]');
    const target = tabElements[index];
    if (target) {
      target.focus();
    }
  }, []);

  const getSafeTabObject = useCallback((tab: unknown): Record<string, unknown> | null => {
    if (!tab || typeof tab !== "object") return null;
    return tab as Record<string, unknown>;
  }, []);

  const getTabLabel = useCallback((safeTab: Record<string, unknown>): string => {
    if (safeTab.label != null && typeof safeTab.label === "string") {
      return safeTab.label;
    }
    if (safeTab.label != null && typeof safeTab.label !== "object") {
      return String(safeTab.label);
    }
    return "";
  }, []);

  const handleTabKeyDown = useCallback(
    (event: React.KeyboardEvent, index: number, tab: Record<string, unknown>) => {
      if (!tabs.length) return;

      let nextIndex = index;
      const horizontal = orientation === "horizontal";
      const renderedTabCount = visibleTabs.length;

      switch (event.key) {
        case "ArrowRight":
          if (!horizontal) return;
          event.preventDefault();
          nextIndex = (index + 1) % renderedTabCount;
          break;
        case "ArrowLeft":
          if (!horizontal) return;
          event.preventDefault();
          nextIndex = (index - 1 + renderedTabCount) % renderedTabCount;
          break;
        case "ArrowDown":
          if (horizontal) return;
          event.preventDefault();
          nextIndex = (index + 1) % renderedTabCount;
          break;
        case "ArrowUp":
          if (horizontal) return;
          event.preventDefault();
          nextIndex = (index - 1 + renderedTabCount) % renderedTabCount;
          break;
        case "Home":
          event.preventDefault();
          nextIndex = 0;
          break;
        case "End":
          event.preventDefault();
          nextIndex = renderedTabCount - 1;
          break;
        case "Enter":
        case " ":
          event.preventDefault();
          handleTabClick(index, tab);
          return;
        default:
          return;
      }

      const nextTab = getSafeTabObject(visibleTabs[nextIndex]);
      if (!nextTab) return;
      handleTabClick(nextIndex, nextTab);
      requestAnimationFrame(() => focusTabAtIndex(nextIndex));
    },
    [focusTabAtIndex, getSafeTabObject, handleTabClick, orientation, tabs.length, visibleTabs]
  );

  useEffect(() => {
    if (!hasOverflowTabs) {
      setSelectedOverflowIndex(null);
      return;
    }
    if (currentActiveTab >= MAX_VISIBLE_TABS && currentActiveTab < tabs.length) {
      setSelectedOverflowIndex(currentActiveTab);
      return;
    }
    setSelectedOverflowIndex(null);
  }, [currentActiveTab, hasOverflowTabs, tabs.length]);

  // Check if scrolling is needed and update scroll button visibility
  const checkScrollButtons = useCallback(() => {
    if (!isScrollable || !tabsContainerRef.current || !tabsListRef.current) {
      return;
    }

    const container = tabsContainerRef.current;
    const list = tabsListRef.current;
    const containerWidth = container.offsetWidth;
    const listWidth = list.scrollWidth;
    const scrollLeft = list.scrollLeft;

    setShowLeftScroll(scrollLeft > 0);
    setShowRightScroll(scrollLeft < listWidth - containerWidth - 1);
  }, [isScrollable]);

  // Scroll to active tab if it's not visible
  const scrollToActiveTab = useCallback(() => {
    if (!isScrollable || !tabsListRef.current || currentActiveTab === undefined) {
      return;
    }

    const list = tabsListRef.current;
    const container = tabsContainerRef.current;
    const activeTabElement = list.children[currentActiveTab];

    if (!activeTabElement || !container) {
      return;
    }

    const _containerLeft = container.offsetLeft; // eslint-disable-line no-unused-vars
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
  }, [currentActiveTab, isScrollable]);

  // Handle scroll button clicks
  const handleScrollLeft = useCallback(() => {
    if (!tabsListRef.current) return;
    const scrollAmount = tabsListRef.current.offsetWidth * 0.75;
    tabsListRef.current.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  }, []);

  const handleScrollRight = useCallback(() => {
    if (!tabsListRef.current) return;
    const scrollAmount = tabsListRef.current.offsetWidth * 0.75;
    tabsListRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const target = tabsContainerRef.current ?? tabsListRef.current;
    if (!target || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(Boolean(entry?.isIntersecting));
      },
      { root: null, threshold: 0.01 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  // Check scroll buttons on mount, resize, and scroll
  useEffect(() => {
    if (!isScrollable || !isVisible) return;

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
  }, [checkScrollButtons, scrollToActiveTab, isScrollable, isVisible, tabs.length]);

  // Auto-select first tab on mount if no activeTab is provided
  useEffect(() => {
    if (activeTab === undefined || activeTab === null) {
      if (onTabChange && tabs.length > 0) {
        onTabChange(0, tabs[0]);
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Scroll to active tab when it changes
  useEffect(() => {
    if (isScrollable && isVisible) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        scrollToActiveTab();
        checkScrollButtons();
      }, 100);
    }
  }, [checkScrollButtons, currentActiveTab, scrollToActiveTab, isScrollable, isVisible]);

  // Early return after all hooks
  if (!tabs || tabs.length === 0) {
    return null;
  }

  const overflowDropdownOptions = useMemo(
    () =>
      overflowTabs
        .map((tab, overflowIndex) => {
          const safeTab = getSafeTabObject(tab);
          if (!safeTab) return null;
          const absoluteIndex = overflowIndex + MAX_VISIBLE_TABS;
          return {
            value: absoluteIndex,
            label: getTabLabel(safeTab) || `Tab ${absoluteIndex + 1}`,
          };
        })
        .filter(Boolean),
    [getSafeTabObject, getTabLabel, overflowTabs]
  );

  const selectedOverflowTab = selectedOverflowIndex != null ? getSafeTabObject(tabs[selectedOverflowIndex]) : null;
  const overflowLabel = selectedOverflowTab ? getTabLabel(selectedOverflowTab) || "More" : "More";

  const handleOverflowChange = useCallback(
    (nextValue: unknown) => {
      if (typeof nextValue !== "number") {
        return;
      }
      const selectedTab = getSafeTabObject(tabs[nextValue]);
      if (!selectedTab) {
        return;
      }
      setSelectedOverflowIndex(nextValue);
      handleTabClick(nextValue, selectedTab);
    },
    [getSafeTabObject, handleTabClick, tabs]
  );

  const renderTabItems = (renderTabs: unknown[], startIndex = 0) =>
    renderTabs.map((tab, index) => {
      const safeTab = getSafeTabObject(tab);
      if (!safeTab) return null;
      const absoluteIndex = startIndex + index;
      const label = getTabLabel(safeTab);
      const icon = typeof safeTab.icon === "string" ? safeTab.icon : undefined;
      const tag =
        typeof safeTab.tag === "number" || typeof safeTab.tag === "string"
          ? safeTab.tag
          : undefined;
      const tagVariant = typeof safeTab.tagVariant === "string" ? safeTab.tagVariant : undefined;
      const tabKey =
        safeTab.id != null && typeof safeTab.id !== "object"
          ? typeof safeTab.id === "string" || typeof safeTab.id === "number"
            ? safeTab.id
            : String(safeTab.id)
          : absoluteIndex;

      return (
        <TabItem
          key={tabKey}
          label={label}
          appearance={appearance}
          active={absoluteIndex === currentActiveTab}
          icon={icon}
          tag={tag}
          tagVariant={tagVariant}
          id={`${BASE_CLASS}-tab-${tabsGroupId}-${absoluteIndex}`}
          tabIndex={absoluteIndex === currentActiveTab ? 0 : -1}
          onKeyDown={(event) => handleTabKeyDown(event, index, safeTab)}
          onClick={() => handleTabClick(absoluteIndex, safeTab)}
        />
      );
    });

  const tabsContent = (
    <div
      ref={tabsListRef}
      className={`${BASE_CLASS}__list`}
      role="tablist"
      aria-orientation={orientation}
      {...props}
    >
      {renderTabItems(visibleTabs)}
      {hasOverflowTabs && overflowDropdownOptions.length > 0 ? (
        <div className={`${BASE_CLASS}__overflow-menu`}>
          <Dropdown
            size="compact"
            options={overflowDropdownOptions}
            value={selectedOverflowIndex ?? undefined}
            placeholder={overflowLabel}
            onChange={handleOverflowChange}
            menuFullWidth={false}
            className={`${BASE_CLASS}__overflow-dropdown`}
          />
        </div>
      ) : null}
    </div>
  );

  if (isScrollable) {
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
    <div className={classNames} {...props}>
      <div ref={tabsListRef} className={`${BASE_CLASS}__list`} role="tablist" aria-orientation={orientation}>
      {renderTabItems(visibleTabs)}
      {hasOverflowTabs && overflowDropdownOptions.length > 0 ? (
        <div className={`${BASE_CLASS}__overflow-menu`}>
          <Dropdown
            size="compact"
            options={overflowDropdownOptions}
            value={selectedOverflowIndex ?? undefined}
            placeholder={overflowLabel}
            onChange={handleOverflowChange}
            menuFullWidth={false}
            className={`${BASE_CLASS}__overflow-dropdown`}
          />
        </div>
      ) : null}
      </div>
    </div>
  );
}

export default React.memo(Tabs);
