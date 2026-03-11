import React, { useState, useRef, useEffect, useLayoutEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import Icon from "../Icon/Icon";
import Divider from "../Divider/Divider";
import Key from "../Key/Key";
import { SearchInput } from "../SearchInput/SearchInput";
import Toggle from "../Toggle/Toggle";
import "./_action-menu.scss";
import type { ActionMenuProps } from "./ActionMenu.types";

const BASE_CLASS = "uds-action-menu";

const SEARCHABLE_VARIANTS = new Set(["search", "autosuggest"]);

const normalizeText = (value) => String(value || "").trim().toLowerCase();

const getItemLabel = (item) =>
  typeof item?.label === "string" ? item.label : "";

const trimDividers = (items) => {
  const trimmed = [...items];
  while (trimmed.length > 0 && trimmed[0]?.divider) {
    trimmed.shift();
  }
  while (trimmed.length > 0 && trimmed[trimmed.length - 1]?.divider) {
    trimmed.pop();
  }
  return trimmed;
};

const filterItemsByQuery = (items, query) => {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return items;

  const filtered = [];
  for (const item of items) {
    if (item?.divider) {
      filtered.push(item);
      continue;
    }

    const label = normalizeText(getItemLabel(item));
    const childItems = Array.isArray(item?.items)
      ? filterItemsByQuery(item.items, query)
      : null;
    const hasMatchingChildren = Array.isArray(childItems) && childItems.length > 0;
    const isMatch = label.includes(normalizedQuery);

    if (isMatch || hasMatchingChildren) {
      filtered.push(
        hasMatchingChildren
          ? {
              ...item,
              items: trimDividers(childItems),
            }
          : item,
      );
    }
  }

  return trimDividers(filtered);
};

const renderHighlightedLabel = (label, query, autosuggestOnlyPrefix = false) => {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery || !label) return label;

  const normalizedLabel = normalizeText(label);
  const matchIndex = autosuggestOnlyPrefix
    ? normalizedLabel.startsWith(normalizedQuery)
      ? 0
      : -1
    : normalizedLabel.indexOf(normalizedQuery);

  if (matchIndex < 0) return label;

  const matchEnd = matchIndex + normalizedQuery.length;
  const before = label.slice(0, matchIndex);
  const match = label.slice(matchIndex, matchEnd);
  const after = label.slice(matchEnd);

  return (
    <>
      {before}
      <span
        className={`${BASE_CLASS}__match ${autosuggestOnlyPrefix ? `${BASE_CLASS}__match--weight` : ""}`}
      >
        {match}
      </span>
      {after}
    </>
  );
};

/**
 * Submenu component for nested menu items
 */
function Submenu({ item, onItemClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openLeft, setOpenLeft] = useState(false);
  const submenuRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const handleSubmenuMouseEnter = () => {
    clearTimeout(timeoutRef.current);
  };

  const handleSubmenuMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  useLayoutEffect(() => {
    if (!isOpen || !submenuRef.current) return;
    const rect = submenuRef.current.getBoundingClientRect();
    const overflowsRight = rect.right > window.innerWidth - 8;
    const overflowsLeft = rect.left < 8;

    if (overflowsRight && !overflowsLeft) {
      setOpenLeft(true);
      return;
    }

    if (overflowsLeft && !overflowsRight) {
      setOpenLeft(false);
      return;
    }

    if (overflowsRight && overflowsLeft) {
      setOpenLeft(rect.right - window.innerWidth > 8);
    }
  }, [isOpen]);

  return (
    <div
      className={`${BASE_CLASS}__item-wrapper`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`${BASE_CLASS}__item ${BASE_CLASS}__item--has-submenu ${item.disabled ? `${BASE_CLASS}__item--disabled` : ""}`}
        role="menuitem"
        disabled={item.disabled}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={item.label}
      >
        {item.icon && (
          <Icon
            name={item.icon}
            size={16}
            appearance="regular"
            className={`${BASE_CLASS}__item-icon`}
          />
        )}
        <span className={`${BASE_CLASS}__item-label`}>{item.label}</span>
        <Icon
          name="CaretRight"
          size={12}
          appearance="regular"
          className={`${BASE_CLASS}__item-arrow`}
        />
      </button>
      {isOpen && item.items && (
        <div
          ref={submenuRef}
          className={`${BASE_CLASS}__submenu ${openLeft ? `${BASE_CLASS}__submenu--left` : ""}`}
          role="menu"
          aria-orientation="vertical"
          onMouseEnter={handleSubmenuMouseEnter}
          onMouseLeave={handleSubmenuMouseLeave}
        >
          {item.items.map((subItem, subIndex) => {
            if (subItem.divider) {
              return (
                <div key={`divider-${subIndex}`} className={`${BASE_CLASS}__divider`}>
                  <Divider />
                </div>
              );
            }

            // Recursive submenu support
            if (subItem.items && subItem.items.length > 0) {
              return (
                <Submenu
                  key={subItem.id || subIndex}
                  item={subItem}
                  onItemClick={onItemClick}
                />
              );
            }

            return (
              <button
                key={subItem.id || subIndex}
                className={`${BASE_CLASS}__item ${subItem.disabled ? `${BASE_CLASS}__item--disabled` : ""} ${subItem.active ? `${BASE_CLASS}__item--active` : ""} ${subItem.destructive ? `${BASE_CLASS}__item--destructive` : ""}`}
                role="menuitem"
                disabled={subItem.disabled}
                onClick={(e) => onItemClick(subItem, e)}
                aria-label={subItem.label}
              >
                {subItem.icon && (
                  <Icon
                    name={subItem.icon}
                    size={16}
                    appearance="regular"
                    className={`${BASE_CLASS}__item-icon`}
                  />
                )}
                <span className={`${BASE_CLASS}__item-label`}>{subItem.label}</span>
                {subItem.shortcut && (
                  <Key label={subItem.shortcut} appearance="light" className={`${BASE_CLASS}__item-shortcut`} />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/**
 * ActionMenu component - A dropdown menu for actions
 * @param {React.ReactNode} trigger - Required trigger element (use Button component)
 * @param {array} items - Array of menu items: { label, icon, onClick, disabled, destructive, divider, items (for submenus) }
 * @param {string} placement - Menu placement: 'bottom-start', 'bottom-end', 'top-start', 'top-end'
 * @param {boolean} fullWidth - When true, the menu matches the trigger width
 * @param {boolean} disabled - Whether the menu is disabled
 * @param {function} onOpenChange - Callback when open state changes: (isOpen: boolean) => void
 * @param {string} className - Additional CSS classes
 * @param {string} menuClassName - Additional CSS classes for the menu panel
 * @param {object} props - Additional props
 */
export default function ActionMenu({
  trigger,
  items = [],
  placement = "bottom-start",
  variant = "default",
  searchPlaceholder = "Search...",
  noResultsText = "No results found",
  fullWidth = false,
  disabled = false,
  onOpenChange,
  className = "",
  menuClassName = "",
  ...props
}: ActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState({});
  const [portalContainer, setPortalContainer] = useState(
    typeof document !== "undefined" ? document.body : null,
  );
  const menuRef = useRef(null);
  const triggerRef = useRef(null);
  const repositionRafRef = useRef(null);
  const resolvedSideRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [autosuggestQuery, setAutosuggestQuery] = useState("");

  const isSearchVariant = variant === "search";
  const isAutosuggestVariant = variant === "autosuggest";
  const isFilterVariant = SEARCHABLE_VARIANTS.has(variant);
  const activeQuery = isSearchVariant ? searchQuery : isAutosuggestVariant ? autosuggestQuery : "";

  const filteredItems = useMemo(
    () => (isFilterVariant ? filterItemsByQuery(items, activeQuery) : items),
    [isFilterVariant, items, activeQuery],
  );

  const resolvePortalContainer = () => {
    if (!triggerRef.current || typeof document === "undefined") return document.body;
    const modalOverlayContainer = triggerRef.current.closest(".uds-modal__overlay");
    const shellMainContainer = triggerRef.current.closest(".app-shell__main-content");
    return modalOverlayContainer instanceof HTMLElement
      ? modalOverlayContainer
      : shellMainContainer instanceof HTMLElement
        ? shellMainContainer
        : document.body;
  };

  const handleEscape = (event) => {
    if (event.key === "Escape") {
      updateOpen(false);
      triggerRef.current?.focus();
    }
  };

  // Wrapper that also fires the onOpenChange callback
  const updateOpen = (nextOpen) => {
    if (nextOpen) {
      setPortalContainer(resolvePortalContainer());
    }
    setIsOpen(nextOpen);
    if (!nextOpen) {
      resolvedSideRef.current = null;
    }
    if (onOpenChange) onOpenChange(nextOpen);
  };
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        triggerRef.current &&
        !menuRef.current.contains(event.target) &&
        !triggerRef.current.contains(event.target)
      ) {
        updateOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const updateMenuPosition = () => {
    if (!isOpen || !menuRef.current || !triggerRef.current) return;
    const nextPortalContainer = resolvePortalContainer();
    setPortalContainer(nextPortalContainer);

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const menuRect = menuRef.current.getBoundingClientRect();
    const containerRect =
      nextPortalContainer === document.body
        ? { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
        : nextPortalContainer.getBoundingClientRect();

    const containerScrollTop =
      nextPortalContainer === document.body ? 0 : nextPortalContainer.scrollTop;
    const containerScrollLeft =
      nextPortalContainer === document.body ? 0 : nextPortalContainer.scrollLeft;

    const containerViewportWidth =
      nextPortalContainer === document.body ? window.innerWidth : nextPortalContainer.clientWidth;
    const containerViewportHeight =
      nextPortalContainer === document.body ? window.innerHeight : nextPortalContainer.clientHeight;

    const viewportPadding = 8;
    const menuGap = 8;

    const [requestedSide = "bottom", requestedAlign = "start"] = String(placement).split("-");

    const getCoords = (side, align) => {
      let top = 0;
      let left = 0;
      const triggerTopInContainer = triggerRect.top - containerRect.top + containerScrollTop;
      const triggerBottomInContainer = triggerRect.bottom - containerRect.top + containerScrollTop;
      const triggerLeftInContainer = triggerRect.left - containerRect.left + containerScrollLeft;
      const triggerRightInContainer = triggerRect.right - containerRect.left + containerScrollLeft;

      if (side === "bottom") top = triggerBottomInContainer + menuGap;
      if (side === "top") top = triggerTopInContainer - menuRect.height - menuGap;
      if (side === "right") left = triggerRightInContainer + menuGap;
      if (side === "left") left = triggerLeftInContainer - menuRect.width - menuGap;

      if (side === "bottom" || side === "top") {
        if (align === "end") {
          left = triggerRightInContainer - menuRect.width;
        } else {
          left = triggerLeftInContainer;
        }
      }

      if (side === "left" || side === "right") {
        if (align === "end") {
          top = triggerBottomInContainer - menuRect.height;
        } else {
          top = triggerTopInContainer;
        }
      }

      return { top, left };
    };

    const overflowsViewport = (coords) => ({
      top: coords.top < containerScrollTop + viewportPadding,
      bottom:
        coords.top + menuRect.height >
        containerScrollTop + containerViewportHeight - viewportPadding,
      left: coords.left < containerScrollLeft + viewportPadding,
      right:
        coords.left + menuRect.width >
        containerScrollLeft + containerViewportWidth - viewportPadding,
    });

    let side = resolvedSideRef.current ?? requestedSide;
    const align = requestedAlign;
    let coords = getCoords(side, align);

    // Resolve side once per open session to avoid flip wobble during scroll.
    if (!resolvedSideRef.current) {
      const overflow = overflowsViewport(coords);
      if (side === "bottom" && overflow.bottom) {
        side = "top";
        coords = getCoords(side, align);
      } else if (side === "top" && overflow.top) {
        side = "bottom";
        coords = getCoords(side, align);
      } else if (side === "right" && overflow.right) {
        side = "left";
        coords = getCoords(side, align);
      } else if (side === "left" && overflow.left) {
        side = "right";
        coords = getCoords(side, align);
      }
      resolvedSideRef.current = side;
    }

    let clampedTop = coords.top;
    let clampedLeft = coords.left;

    clampedTop = Math.max(
      containerScrollTop + viewportPadding,
      Math.min(
        clampedTop,
        containerScrollTop + containerViewportHeight - menuRect.height - viewportPadding
      )
    );
    clampedLeft = Math.max(
      containerScrollLeft + viewportPadding,
      Math.min(
        clampedLeft,
        containerScrollLeft + containerViewportWidth - menuRect.width - viewportPadding
      )
    );

    const nextStyle = {
      position: nextPortalContainer === document.body ? "fixed" : "absolute",
      top: `${clampedTop}px`,
      left: `${clampedLeft}px`,
      width: fullWidth ? `${triggerRect.width}px` : undefined,
      zIndex:
        nextPortalContainer === modalOverlayContainer
          ? "calc(var(--uds-elevation-modal) + 1)"
          : undefined,
    };

    setMenuStyle((prevStyle) => {
      if (
        prevStyle.top === nextStyle.top &&
        prevStyle.left === nextStyle.left &&
        prevStyle.width === nextStyle.width &&
        prevStyle.position === nextStyle.position
      ) {
        return prevStyle;
      }
      return nextStyle;
    });
  };

  useLayoutEffect(() => {
    if (!isOpen) return;
    updateMenuPosition();
  }, [isOpen, placement, fullWidth, portalContainer]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isOpen) return;
    const scheduleReposition = () => {
      if (repositionRafRef.current != null) return;
      repositionRafRef.current = requestAnimationFrame(() => {
        repositionRafRef.current = null;
        updateMenuPosition();
      });
    };

    window.addEventListener("resize", scheduleReposition);
    return () => {
      window.removeEventListener("resize", scheduleReposition);
      if (repositionRafRef.current != null) {
        cancelAnimationFrame(repositionRafRef.current);
        repositionRafRef.current = null;
      }
    };
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      return;
    }
    if (isSearchVariant) {
      requestAnimationFrame(() => {
        const searchField = menuRef.current?.querySelector('input[type="search"]');
        searchField?.focus();
      });
    }
  }, [isOpen, isSearchVariant]);

  const handleMenuKeyDown = (event) => {
    const isTypingInSearchInput =
      isSearchVariant &&
      event.target instanceof HTMLInputElement &&
      event.target.type === "search" &&
      menuRef.current?.contains(event.target);

    if (isTypingInSearchInput) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        const firstItem = menuRef.current?.querySelector('[role="menuitem"]:not([disabled])');
        firstItem?.focus();
      }
      return;
    }

    const menuItems = menuRef.current?.querySelectorAll(
      '[role="menuitem"]:not([disabled])',
    );
    if (!menuItems || menuItems.length === 0) return;

    const currentIndex = Array.from(menuItems).findIndex(
      (item) => item === document.activeElement,
    );

    switch (event.key) {
      case "ArrowDown": {
        event.preventDefault();
        const nextIndex = currentIndex < menuItems.length - 1 ? currentIndex + 1 : 0;
        menuItems[nextIndex]?.focus();
        break;
      }
      case "ArrowUp": {
        event.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1;
        menuItems[prevIndex]?.focus();
        break;
      }
      case "Home":
        event.preventDefault();
        menuItems[0]?.focus();
        break;
      case "End":
        event.preventDefault();
        menuItems[menuItems.length - 1]?.focus();
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (document.activeElement) {
          document.activeElement.click();
        }
        break;
      default:
        break;
    }
  };

  const handleToggle = () => {
    if (!disabled) {
      updateOpen(!isOpen);
    }
  };

  const handleItemClick = (item, event) => {
    if (item.disabled) {
      event.preventDefault();
      return;
    }
    if (item.onClick) {
      item.onClick(item, event);
    }
    updateOpen(false);
  };

  const renderSearchHeader = () => {
    if (!isSearchVariant) return null;

    return (
      <div className={`${BASE_CLASS}__search`}>
        <SearchInput
          size="compact"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className={`${BASE_CLASS}__search-input`}
          placeholder={searchPlaceholder}
          aria-label={searchPlaceholder}
        />
      </div>
    );
  };

  const renderTrigger = () => {
    if (!trigger) {
      return null;
    }

    // Clone the trigger element and add onClick handler
    if (React.isValidElement(trigger)) {
      const originalOnClick = trigger.props?.onClick;
      const originalOnChange = trigger.props?.onChange;
      const originalOnFocus = trigger.props?.onFocus;
      const originalOnKeyDown = trigger.props?.onKeyDown;
      const triggerElement = React.cloneElement(trigger, {
        disabled: disabled || trigger.props?.disabled,
        "aria-disabled": disabled || undefined,
        onClick: (e) => {
          if (disabled) {
            return;
          }
          if (!isAutosuggestVariant) {
            e.preventDefault();
            e.stopPropagation();
          }
          if (originalOnClick) {
            originalOnClick(e);
          }
          if (isAutosuggestVariant) {
            updateOpen(true);
          } else {
            handleToggle(e);
          }
        },
        onFocus: (e) => {
          if (originalOnFocus) originalOnFocus(e);
          if (disabled || !isAutosuggestVariant) return;
          updateOpen(true);
        },
        onChange: (e) => {
          if (originalOnChange) originalOnChange(e);
          if (disabled || !isAutosuggestVariant) return;
          const target = e?.target;
          const nextValue =
            target && typeof target === "object" && "value" in target
              ? String(target.value ?? "")
              : "";
          setAutosuggestQuery(nextValue);
          updateOpen(true);
        },
        onKeyDown: (e) => {
          if (originalOnKeyDown) originalOnKeyDown(e);
          if (disabled || !isAutosuggestVariant) return;
          if (e.key === "Escape") {
            updateOpen(false);
            return;
          }
          if (e.key === "ArrowDown") {
            e.preventDefault();
            const firstItem = menuRef.current?.querySelector('[role="menuitem"]:not([disabled])');
            firstItem?.focus();
          }
        },
        "aria-haspopup": "true",
        "aria-expanded": isOpen,
      });
      
      return (
        <div ref={triggerRef} className={`${BASE_CLASS}__trigger`}>
          {triggerElement}
        </div>
      );
    }
    
    // Fallback for non-React elements
    return (
      <div ref={triggerRef} className={`${BASE_CLASS}__trigger`} onClick={handleToggle}>
        {trigger}
      </div>
    );
  };

  const classNames = [
    BASE_CLASS,
    isOpen && `${BASE_CLASS}--open`,
    fullWidth && `${BASE_CLASS}--full-width`,
    disabled && `${BASE_CLASS}--disabled`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const menuClassNames = [
    `${BASE_CLASS}__menu`,
    `${BASE_CLASS}__menu--portal`,
    variant === "search" && `${BASE_CLASS}__menu--search`,
    fullWidth && `${BASE_CLASS}__menu--full-width`,
    menuClassName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classNames} {...props}>
      {renderTrigger()}
      {isOpen && !disabled && portalContainer
        ? createPortal(
            <div
              ref={menuRef}
              className={menuClassNames}
              style={menuStyle}
              role="menu"
              aria-orientation="vertical"
              onKeyDown={handleMenuKeyDown}
            >
              {renderSearchHeader()}
              {filteredItems.length === 0 ? (
                <div className={`${BASE_CLASS}__empty`}>{noResultsText}</div>
              ) : null}
              {filteredItems.map((item, index) => {
                if (item.divider) {
                  return (
                    <div key={`divider-${index}`} className={`${BASE_CLASS}__divider`}>
                      <Divider />
                    </div>
                  );
                }

                // Check if item has submenu
                if (item.items && item.items.length > 0) {
                  return (
                    <Submenu
                      key={item.id || index}
                      item={item}
                      onItemClick={handleItemClick}
                    />
                  );
                }

                // Toggle item type
                if (item.type === "toggle") {
                  return (
                    <div
                      key={item.id || index}
                      className={`${BASE_CLASS}__item ${BASE_CLASS}__item--toggle ${item.disabled ? `${BASE_CLASS}__item--disabled` : ""}`}
                      role="menuitemcheckbox"
                      aria-checked={!!item.checked}
                      aria-label={item.label}
                    >
                      {item.icon && (
                        <Icon
                          name={item.icon}
                          size={16}
                          appearance="regular"
                          className={`${BASE_CLASS}__item-icon`}
                        />
                      )}
                      <span className={`${BASE_CLASS}__item-label`}>
                        {renderHighlightedLabel(item.label, activeQuery, isAutosuggestVariant)}
                      </span>
                      <Toggle
                        checked={!!item.checked}
                        size="small"
                        disabled={item.disabled}
                        onChange={(checked) => {
                          if (item.onChange) item.onChange(checked);
                        }}
                        className={`${BASE_CLASS}__item-toggle`}
                      />
                    </div>
                  );
                }

                return (
                  <button
                    key={item.id || index}
                    className={`${BASE_CLASS}__item ${item.disabled ? `${BASE_CLASS}__item--disabled` : ""} ${item.active ? `${BASE_CLASS}__item--active` : ""} ${item.destructive ? `${BASE_CLASS}__item--destructive` : ""}`}
                    role="menuitem"
                    disabled={item.disabled}
                    onClick={(e) => handleItemClick(item, e)}
                    aria-label={item.label}
                  >
                    {item.icon && (
                      <Icon
                        name={item.icon}
                        size={16}
                        appearance="regular"
                        className={`${BASE_CLASS}__item-icon`}
                      />
                    )}
                    <span className={`${BASE_CLASS}__item-label`}>
                      {renderHighlightedLabel(item.label, activeQuery, isAutosuggestVariant)}
                    </span>
                    {item.shortcut && (
                      <Key label={item.shortcut} appearance="light" className={`${BASE_CLASS}__item-shortcut`} />
                    )}
                  </button>
                );
              })}
            </div>,
            portalContainer
          )
        : null}
    </div>
  );
}
