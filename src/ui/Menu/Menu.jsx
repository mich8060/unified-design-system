import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import './Menu.scss';
import { Link, useLocation } from "react-router-dom";
import Icon from "../Icon/Icon";
import Avatar from "../Avatar/Avatar";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Branding from "../Branding/Branding";
import Dropdown from "../Dropdown/Dropdown";
import Toggle from "../Toggle/Toggle";

export default function Menu({
    title,
    className = "",
    navItems = [],
    brands = [],
    activeBrand,
    onBrandChange,
    activeMode,
    onModeChange,
    showBrand = true,
    showSearch = true,
    showBrandSwitcher = true,
    showNav = true,
    showModeToggle = true,
    showUser = true,
    identity = "design-system",
}) {
    const location = useLocation();
    const [openAccordions, setOpenAccordions] = useState({});
    const [isHovered, setIsHovered] = useState(false);
    const hoverTimer = useRef(null);

    const handleMouseEnter = () => {
        hoverTimer.current = setTimeout(() => setIsHovered(true), 300);
    };

    const handleMouseLeave = () => {
        clearTimeout(hoverTimer.current);
        setIsHovered(false);
    };

    // Auto-expand accordion whose child matches the current route
    useEffect(() => {
        navItems.forEach((item) => {
            if (item.children) {
                const hasActiveChild = item.children.some(
                    (child) => location.pathname === child.path
                );
                if (hasActiveChild) {
                    setOpenAccordions((prev) => ({ ...prev, [item.label]: true }));
                }
            }
        });
    }, [location.pathname, navItems]);

    const toggleAccordion = (label) => {
        setOpenAccordions((prev) => ({ ...prev, [label]: !prev[label] }));
    };

  return(
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
                onClick={() => console.log("Search")}
            />
            <Input type="text" placeholder="Search" icon="MagnifyingGlass" iconPosition="right" className="uds-menu_search__input" />
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
                const hasChildren = item.children && item.children.length > 0;
                const isOpen = openAccordions[item.label];
                const isExpanded = isHovered && isOpen;

                if (hasChildren) {
                    return (
                        <div className={`uds-menu_nav__item uds-menu_nav__item--accordion${isOpen ? " uds-menu_nav__item--open" : ""}`} key={item.label}>
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
                                <span className={`uds-menu_nav__item-caret${isOpen ? " uds-menu_nav__item-caret--open" : ""}`}>
                                    <Icon name="CaretDown" size={16} />
                                </span>
                            </button>
                            <div className={`uds-menu_nav__children${isExpanded ? " uds-menu_nav__children--open" : ""}`}>
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
                    <div className={`uds-menu_nav__item${location.pathname === item.path ? " uds-menu_nav__item--active" : ""}`} key={item.path}>
                        <Link className="uds-menu_nav__item-link" to={item.path} title={item.label}>
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
                        onClick={() => onModeChange(activeMode === "light" ? "dark" : "light")}
                    />
                    <div className="uds-menu_mode__controls">
                        <Icon name={activeMode === "light" ? "Sun" : "Moon"} size={20} appearance="duotone" />
                        <span className="uds-menu_mode__label">
                            {activeMode === "light" ? "Light" : "Dark"}
                        </span>
                        <Toggle
                            checked={activeMode === "dark"}
                            onChange={(checked) => onModeChange(checked ? "dark" : "light")}
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

Menu.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      path: PropTypes.string,
      children: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          path: PropTypes.string.isRequired,
        })
      ),
    })
  ),
  brands: PropTypes.arrayOf(PropTypes.string),
  activeBrand: PropTypes.string,
  onBrandChange: PropTypes.func,
  activeMode: PropTypes.string,
  onModeChange: PropTypes.func,
  showBrand: PropTypes.bool,
  showSearch: PropTypes.bool,
  showBrandSwitcher: PropTypes.bool,
  showNav: PropTypes.bool,
  showModeToggle: PropTypes.bool,
  showUser: PropTypes.bool,
};

Menu.defaultProps = {
  title: "Menu",
};
