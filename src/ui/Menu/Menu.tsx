import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Menu.scss";
import Icon from "../Icon/Icon";
import Avatar from "../Avatar/Avatar";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Branding from "../Branding/Branding";
import Dropdown from "../Dropdown/Dropdown";
import Toggle from "../Toggle/Toggle";
import type { MenuMode, MenuNavItem, MenuProps } from "./Menu.types";

export default function Menu({
  className = "",
  navItems = [],
  brands = [],
  activeBrand,
  onBrandChange,
  activeMode = "light",
  onModeChange,
  showBrand = true,
  showSearch = true,
  showBrandSwitcher = true,
  showNav = true,
  showModeToggle = true,
  showUser = true,
  identity = "design-system",
}: MenuProps) {
  const location = useLocation();
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>(
    {},
  );
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    hoverTimer.current = setTimeout(() => setIsHovered(true), 300);
  };

  const handleMouseLeave = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setIsHovered(false);
  };

  useEffect(() => {
    navItems.forEach((item: MenuNavItem) => {
      if (!item.children) return;
      const hasActiveChild = item.children.some(
        (child) => location.pathname === child.path,
      );
      if (hasActiveChild) {
        setOpenAccordions((prev) => ({ ...prev, [item.label]: true }));
      }
    });
  }, [location.pathname, navItems]);

  const toggleAccordion = (label: string) => {
    setOpenAccordions((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleModeChange = (nextMode: MenuMode) => {
    onModeChange?.(nextMode);
  };

  return (
    <aside
      className={`uds-menu${isHovered ? " uds-menu--expanded" : ""} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showBrand && (
        <div className="uds-menu_brand">
          <div className="uds-menu_brand__symbol">
            <Branding brand={identity} symbol />
          </div>
          <div className="uds-menu_brand__full">
            <Branding brand={identity} />
          </div>
        </div>
      )}

      {showSearch && (
        <div className="uds-menu_search">
          <Button
            appearance="text"
            icon="MagnifyingGlass"
            label="Search"
            layout="icon-only"
            aria-label="Search"
            className="uds-menu_search__button"
            onClick={() => {}}
          />
          <Input
            type="text"
            placeholder="Search"
            icon="MagnifyingGlass"
            iconPosition="right"
            className="uds-menu_search__input"
          />
        </div>
      )}

      {showBrandSwitcher && brands.length > 0 && onBrandChange && (
        <div className="uds-menu_brands">
          <Button
            appearance="text"
            icon="PlusCircle"
            label="Brand"
            layout="icon-only"
            aria-label="Switch brand"
            className="uds-menu_brands__button"
          />
          <div className="uds-menu_brands__dropdown">
            <Dropdown
              options={brands.map((b) => ({ value: b, label: b }))}
              value={activeBrand}
              onChange={onBrandChange}
              placeholder="Select brand"
              placement="bottom-start"
            />
          </div>
        </div>
      )}

      {showNav && (
        <nav className="uds-menu_nav">
          {navItems.map((item) => {
            const hasChildren = Boolean(item.children?.length);
            const isOpen = Boolean(openAccordions[item.label]);
            const isExpanded = isHovered && isOpen;

            if (hasChildren && item.children) {
              return (
                <div
                  className={`uds-menu_nav__item uds-menu_nav__item--accordion${isOpen ? " uds-menu_nav__item--open" : ""}`}
                  key={item.label}
                >
                  <button
                    type="button"
                    className="uds-menu_nav__item-link"
                    onClick={() => toggleAccordion(item.label)}
                    title={item.label}
                  >
                    <span className="uds-menu_nav__item-icon">
                      <Icon name={item.icon} size={24} appearance="duotone" />
                    </span>
                    <div className="uds-menu_nav__item-label">{item.label}</div>
                    <span
                      className={`uds-menu_nav__item-caret${isOpen ? " uds-menu_nav__item-caret--open" : ""}`}
                    >
                      <Icon name="CaretDown" size={16} />
                    </span>
                  </button>
                  <div
                    className={`uds-menu_nav__children${isExpanded ? " uds-menu_nav__children--open" : ""}`}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        className={`uds-menu_nav__child-link${location.pathname === child.path ? " uds-menu_nav__child-link--active" : ""}`}
                        to={child.path}
                        title={child.label}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <div
                className={`uds-menu_nav__item${location.pathname === item.path ? " uds-menu_nav__item--active" : ""}`}
                key={item.path || item.label}
              >
                <Link
                  className="uds-menu_nav__item-link"
                  to={item.path || "#"}
                  title={item.label}
                >
                  <span className="uds-menu_nav__item-icon">
                    <Icon name={item.icon} size={24} appearance="duotone" />
                  </span>
                  <div className="uds-menu_nav__item-label">{item.label}</div>
                </Link>
              </div>
            );
          })}
        </nav>
      )}

      <div className="uds-menu_footer">
        {showModeToggle && onModeChange && (
          <div className="uds-menu_mode">
            <Button
              appearance="text"
              icon={activeMode === "light" ? "Sun" : "Moon"}
              label={activeMode === "light" ? "Light mode" : "Dark mode"}
              layout="icon-only"
              aria-label="Toggle light/dark mode"
              className="uds-menu_mode__button"
              onClick={() =>
                handleModeChange(activeMode === "light" ? "dark" : "light")
              }
            />
            <div className="uds-menu_mode__controls">
              <Icon
                name={activeMode === "light" ? "Sun" : "Moon"}
                size={20}
                appearance="duotone"
              />
              <span className="uds-menu_mode__label">
                {activeMode === "light" ? "Light" : "Dark"}
              </span>
              <Toggle
                checked={activeMode === "dark"}
                onChange={(checked: boolean) =>
                  handleModeChange(checked ? "dark" : "light")
                }
                className="uds-menu_mode__toggle"
              />
            </div>
          </div>
        )}
      </div>

      {showUser && (
        <div className="uds-menu_user">
          <Avatar initials="EB" size="default" />
        </div>
      )}
    </aside>
  );
}
