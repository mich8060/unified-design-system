import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./_menu.scss";
import { Link, useLocation } from "react-router-dom";
import Icon from "../Icon/Icon";
import Avatar from "../Avatar/Avatar";
import Button from "../Button/Button";
import TextInput from "../TextInput/TextInput";
import Branding from "../Branding/Branding";
import Dropdown from "../Dropdown/Dropdown";
import Toggle from "../Toggle/Toggle";
import type { MenuProps, MenuMode } from "./Menu.types";

interface MenuChildItem {
    label: string;
    path: string;
}

interface MenuNavItem {
    label: string;
    icon: string;
    path?: string;
    children?: MenuChildItem[];
}

const isMenuChildItem = (value: unknown): value is MenuChildItem => {
    if (typeof value !== "object" || value === null) return false;
    const candidate = value as Record<string, unknown>;
    return typeof candidate.label === "string" && typeof candidate.path === "string";
};

const isMenuNavItem = (value: unknown): value is MenuNavItem => {
    if (typeof value !== "object" || value === null) return false;
    const candidate = value as Record<string, unknown>;
    if (typeof candidate.label !== "string" || typeof candidate.icon !== "string") return false;
    if (candidate.path !== undefined && typeof candidate.path !== "string") return false;
    if (candidate.children !== undefined) {
        if (!Array.isArray(candidate.children)) return false;
        if (!candidate.children.every(isMenuChildItem)) return false;
    }
    return true;
};

const toMenuMode = (value: unknown): MenuMode => (value === "dark" ? "dark" : "light");

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
}: MenuProps) {
    const location = useLocation();
    const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const normalizedNavItems = navItems.filter(isMenuNavItem);
    const normalizedBrands = brands.filter((brand): brand is string => typeof brand === "string");
    const resolvedTitle = typeof title === "string" ? title : "Menu";
    const resolvedActiveBrand =
        typeof activeBrand === "string" ? activeBrand : normalizedBrands[0];
    const activeMenuMode = toMenuMode(activeMode);

    // Auto-expand accordion whose child matches the current route
    useEffect(() => {
        normalizedNavItems.forEach((item) => {
            if (item.children) {
                const hasActiveChild = item.children.some(
                    (child: MenuChildItem) => location.pathname === child.path
                );
                if (hasActiveChild) {
                    setOpenAccordions((prev) => ({ ...prev, [item.label]: true }));
                }
            }
        });
    }, [location.pathname, normalizedNavItems]);

    const toggleAccordion = (label: string) => {
        setOpenAccordions((prev) => ({ ...prev, [label]: !prev[label] }));
    };
    const toggleMenu = () => setIsMenuOpen((prev) => !prev);
    const handleModeChange = (mode: MenuMode) => onModeChange?.(mode);

    return (
        <aside
            className={`uds-menu${isMenuOpen ? " uds-menu--expanded" : ""} ${className}`}
            aria-label={resolvedTitle}
        >
            {showBrand && (
                <div className="uds-menu_brand">
                    <Button
                        appearance="text"
                        icon="List"
                        size="xsmall"
                        label={isMenuOpen ? "Collapse menu" : "Expand menu"}
                        layout="icon-only"
                        aria-label={isMenuOpen ? "Collapse menu" : "Expand menu"}
                        className="uds-menu_brand__toggle"
                        onClick={toggleMenu}
                    />
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
                    <div className="uds-menu_search__field">
                        <TextInput
                            type="text"
                            placeholder="Search"
                            icon="MagnifyingGlass"
                            iconPosition="right"
                            className="uds-menu_search__input"
                            size="compact"
                        />
                    </div>
                </div>
            )}
            {showBrandSwitcher && normalizedBrands.length > 0 && onBrandChange && (
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
                            options={normalizedBrands.map((brand) => ({ value: brand, label: brand }))}
                            value={resolvedActiveBrand}
                            onChange={(value) => {
                                if (typeof value === "string") onBrandChange(value);
                            }}
                            placeholder="Select brand"
                            placement="bottom-start"
                            size="compact"
                        />
                    </div>
                </div>
            )}
            {showNav && (
                <nav className="uds-menu_nav">
                    {normalizedNavItems.map((item) => {
                        const children = item.children ?? [];
                        const hasChildren = children.length > 0;
                        const isOpen = openAccordions[item.label];
                        const isExpanded = isMenuOpen && isOpen;

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
                                        {children.map((child: MenuChildItem) => (
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
                            <div className={`uds-menu_nav__item${location.pathname === item.path ? " uds-menu_nav__item--active" : ""}`} key={item.path ?? item.label}>
                                <Link className="uds-menu_nav__item-link" to={item.path ?? "/"} title={item.label}>
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
                            icon={activeMenuMode === "light" ? "Sun" : "Moon"}
                            label={activeMenuMode === "light" ? "Light mode" : "Dark mode"}
                            layout="icon-only"
                            aria-label="Toggle light/dark mode"
                            className="uds-menu_mode__button"
                            onClick={() => handleModeChange(activeMenuMode === "light" ? "dark" : "light")}
                        />
                        <div className="uds-menu_mode__controls">
                            <Icon name={activeMenuMode === "light" ? "Sun" : "Moon"} size={20} appearance="duotone" />
                            <span className="uds-menu_mode__label">
                                {activeMenuMode === "light" ? "Light" : "Dark"}
                            </span>
                            <Toggle
                                checked={activeMenuMode === "dark"}
                                onChange={(checked) => handleModeChange(checked ? "dark" : "light")}
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
