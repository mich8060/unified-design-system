import React, { useState, useRef, useEffect } from "react";
import Icon from "../Icon/Icon";
import Divider from "../Divider/Divider";
import Key from "../Key/Key";
import "./ActionMenu.scss";

const BASE_CLASS = "uds-action-menu";

/**
 * Submenu component for nested menu items
 */
function Submenu({ item, onItemClick, parentRef }) {
  const [isOpen, setIsOpen] = useState(false);
  const submenuRef = useRef(null);
  const itemRef = useRef(null);
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

  return (
    <div
      className={`${BASE_CLASS}__item-wrapper`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={itemRef}
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
          className={`${BASE_CLASS}__submenu`}
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
                  parentRef={submenuRef}
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
 * @param {boolean} disabled - Whether the menu is disabled
 * @param {string} className - Additional CSS classes
 * @param {object} props - Additional props
 */
export default function ActionMenu({
  trigger,
  items = [],
  placement = "bottom-end",
  disabled = false,
  className = "",
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const triggerRef = useRef(null);
  
  // Expose toggle function for external use
  const toggleMenu = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
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
        setIsOpen(false);
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
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      const menuItems = menuRef.current?.querySelectorAll(
        '[role="menuitem"]:not([disabled])',
      );
      if (!menuItems || menuItems.length === 0) return;

      const currentIndex = Array.from(menuItems).findIndex(
        (item) => item === document.activeElement,
      );

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          const nextIndex =
            currentIndex < menuItems.length - 1 ? currentIndex + 1 : 0;
          menuItems[nextIndex]?.focus();
          break;
        case "ArrowUp":
          event.preventDefault();
          const prevIndex =
            currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1;
          menuItems[prevIndex]?.focus();
          break;
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

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleEscape = (event) => {
    if (event.key === "Escape") {
      setIsOpen(false);
      triggerRef.current?.focus();
    }
  };

  const handleToggle = (e) => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
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
    setIsOpen(false);
  };

  const renderTrigger = () => {
    if (!trigger) {
      return null;
    }

    // Clone the trigger element and add onClick handler
    if (React.isValidElement(trigger)) {
      const originalOnClick = trigger.props?.onClick;
      const triggerElement = React.cloneElement(trigger, {
        onClick: (e) => {
          e.preventDefault();
          e.stopPropagation();
          // Call the trigger's original onClick if it exists
          if (originalOnClick) {
            originalOnClick(e);
          }
          // Always call our toggle handler
          handleToggle(e);
        },
        "aria-haspopup": "true",
        "aria-expanded": isOpen,
      });
      
      return (
        <div ref={triggerRef}>
          {triggerElement}
        </div>
      );
    }
    
    // Fallback for non-React elements
    return (
      <div ref={triggerRef} onClick={handleToggle}>
        {trigger}
      </div>
    );
  };

  const getPlacementClass = () => {
    const placementMap = {
      "bottom-start": "bottom-start",
      "bottom-end": "bottom-end",
      "top-start": "top-start",
      "top-end": "top-end",
    };
    return placementMap[placement] || "bottom-end";
  };

  const classNames = [
    BASE_CLASS,
    isOpen && `${BASE_CLASS}--open`,
    disabled && `${BASE_CLASS}--disabled`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classNames} {...props}>
      {renderTrigger()}
      {isOpen && !disabled && (
        <div
          ref={menuRef}
          className={`${BASE_CLASS}__menu ${BASE_CLASS}__menu--${getPlacementClass()}`}
          role="menu"
          aria-orientation="vertical"
        >
          {items.map((item, index) => {
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
                  parentRef={menuRef}
                />
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
                  {item.label}
                </span>
                {item.shortcut && (
                  <Key label={item.shortcut} appearance="light" className={`${BASE_CLASS}__item-shortcut`} />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
