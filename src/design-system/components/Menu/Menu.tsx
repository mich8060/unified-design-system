import React, { useState, useEffect, useMemo, useCallback } from "react";
import "./_menu.scss";
import { Link, UNSAFE_LocationContext } from "react-router-dom";
import Icon from "../Icon/Icon";
import Avatar from "../Avatar/Avatar";
import Button from "../Button/Button";
import TextInput from "../TextInput/TextInput";
import Branding from "../Branding/Branding";
import Dropdown from "../Dropdown/Dropdown";
import Toggle from "../Toggle/Toggle";
import ActionMenu from "../ActionMenu/ActionMenu";
import { Text } from "../Text/Text";
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

function Menu({
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
    userName = "Jane Doe",
    userInitials = "JD",
    userAvatarSrc,
    accountMenuItems = [],
    identity = "design-system",
    defaultExpanded = true,
}: MenuProps) {
    const locationContext = React.useContext(UNSAFE_LocationContext);
    const isRouterAvailable = Boolean(locationContext);
    const pathname =
        locationContext?.location?.pathname ??
        (typeof window !== "undefined" ? window.location.pathname : "/");
    const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});
    const [isMenuOpen, setIsMenuOpen] = useState(defaultExpanded);
    const [visibleNavCount, setVisibleNavCount] = useState(24);
    const normalizedNavItems = useMemo(() => navItems.filter(isMenuNavItem), [navItems]);
    const normalizedBrands = useMemo(
        () => brands.filter((brand): brand is string => typeof brand === "string"),
        [brands]
    );
    const resolvedTitle = typeof title === "string" ? title : "Menu";
    const resolvedActiveBrand =
        typeof activeBrand === "string" ? activeBrand : normalizedBrands[0];
    const resolvedIdentity =
        resolvedActiveBrand === "default"
            ? "design-system"
            : (resolvedActiveBrand ?? identity);
    const activeMenuMode = toMenuMode(activeMode);
    const normalizedAccountMenuItems = useMemo(
        () => (Array.isArray(accountMenuItems) ? accountMenuItems : []),
        [accountMenuItems]
    );

    useEffect(() => {
        if (normalizedNavItems.length <= visibleNavCount) return;
        const runner = () => setVisibleNavCount(normalizedNavItems.length);

        if (typeof requestIdleCallback === "function") {
            const id = requestIdleCallback(runner);
            return () => cancelIdleCallback(id);
        }

        const timeoutId = window.setTimeout(runner, 50);
        return () => window.clearTimeout(timeoutId);
    }, [normalizedNavItems.length, visibleNavCount]);

    // Auto-expand accordion whose child matches the current route
    useEffect(() => {
        const activeAccordionLabels = normalizedNavItems
            .filter(
                (item) =>
                    Array.isArray(item.children) &&
                    item.children.some((child: MenuChildItem) => pathname === child.path)
            )
            .map((item) => item.label);

        if (activeAccordionLabels.length === 0) return;

        setOpenAccordions((prev) => {
            let hasChanges = false;
            const next = { ...prev };

            activeAccordionLabels.forEach((label) => {
                if (!next[label]) {
                    next[label] = true;
                    hasChanges = true;
                }
            });

            return hasChanges ? next : prev;
        });
    }, [normalizedNavItems, pathname]);

    const toggleAccordion = useCallback((label: string) => {
        setOpenAccordions((prev) => ({ ...prev, [label]: !prev[label] }));
    }, []);
    const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);
    const expandMenu = useCallback(() => setIsMenuOpen(true), []);
    const handleCollapsedMenuClickCapture = useCallback((event: React.MouseEvent<HTMLElement>) => {
        if (!isMenuOpen) {
            // When collapsed, first click should only expand the menu.
            event.preventDefault();
            event.stopPropagation();
            expandMenu();
        }
    }, [expandMenu, isMenuOpen]);
    const handleAccordionClick = useCallback((label: string) => {
        if (!isMenuOpen) {
            expandMenu();
            setOpenAccordions((prev) => ({ ...prev, [label]: true }));
            return;
        }
        toggleAccordion(label);
    }, [expandMenu, isMenuOpen, toggleAccordion]);
    const handleNavItemClick = useCallback(() => {
        if (!isMenuOpen) {
            expandMenu();
        }
    }, [expandMenu, isMenuOpen]);
    const handleModeChange = useCallback((mode: MenuMode) => onModeChange?.(mode), [onModeChange]);
    const renderedNavItems = useMemo(
        () =>
            normalizedNavItems.slice(0, visibleNavCount).map((item) => {
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
                                onClick={() => handleAccordionClick(item.label)}
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
                            {isExpanded ? (
                                <div className="uds-menu_nav__children uds-menu_nav__children--open">
                                    {children.map((child: MenuChildItem) => (
                                        isRouterAvailable ? (
                                            <Link
                                                key={child.path}
                                                className={`uds-menu_nav__child-link${pathname === child.path ? " uds-menu_nav__child-link--active" : ""}`}
                                                to={child.path}
                                                onClick={handleNavItemClick}
                                                title={child.label}
                                            >
                                                {child.label}
                                            </Link>
                                        ) : (
                                            <a
                                                key={child.path}
                                                className={`uds-menu_nav__child-link${pathname === child.path ? " uds-menu_nav__child-link--active" : ""}`}
                                                href={child.path}
                                                onClick={handleNavItemClick}
                                                title={child.label}
                                            >
                                                {child.label}
                                            </a>
                                        )
                                    ))}
                                </div>
                            ) : null}
                        </div>
                    );
                }

                return (
                    <div className={`uds-menu_nav__item${pathname === item.path ? " uds-menu_nav__item--active" : ""}`} key={item.path ?? item.label}>
                        {isRouterAvailable ? (
                            <Link className="uds-menu_nav__item-link" to={item.path ?? "/"} onClick={handleNavItemClick} title={item.label}>
                                <span className="uds-menu_nav__item-icon">
                                    <Icon name={item.icon} size={24} appearance="duotone" />
                                </span>
                                <div className="uds-menu_nav__item-label">{item.label}</div>
                            </Link>
                        ) : (
                            <a className="uds-menu_nav__item-link" href={item.path ?? "/"} onClick={handleNavItemClick} title={item.label}>
                                <span className="uds-menu_nav__item-icon">
                                    <Icon name={item.icon} size={24} appearance="duotone" />
                                </span>
                                <div className="uds-menu_nav__item-label">{item.label}</div>
                            </a>
                        )}
                    </div>
                );
            }),
        [normalizedNavItems, visibleNavCount, openAccordions, isMenuOpen, handleAccordionClick, handleNavItemClick, isRouterAvailable, pathname]
    );

    return (
        <aside
            className={`uds-menu${isMenuOpen ? " uds-menu--expanded" : ""} ${className}`}
            aria-label={resolvedTitle}
            onClickCapture={handleCollapsedMenuClickCapture}
        >
            {showBrand && (
                <div className="uds-menu_brand">
                    <Button
                        appearance="text"
                        icon="List"
                            size="default"
                        label={isMenuOpen ? "Collapse menu" : "Expand menu"}
                        layout="icon-only"
                        aria-label={isMenuOpen ? "Collapse menu" : "Expand menu"}
                        className="uds-menu_brand__toggle"
                        onClick={toggleMenu}
                    />
                    <div className="uds-menu_brand__symbol">
                        <Branding brand={resolvedIdentity} symbol />
                    </div>
                    <div className="uds-menu_brand__full">
                        <Branding brand={resolvedIdentity} />
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
                    {renderedNavItems}
                </nav>
            )}
            {showModeToggle && onModeChange && (
                <div className="uds-menu_footer">
                    <div className="uds-menu_mode">
                        <Button
                            appearance="text"
                            icon={activeMenuMode === "light" ? "Sun" : "Moon"}
                            label={activeMenuMode === "light" ? "Light mode" : "Dark mode"}
                            layout="icon-only"
                            size="default"
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
                </div>
            )}
            {showUser && (
                <div className="uds-menu_account">
                    <Avatar
                        src={userAvatarSrc}
                        initials={userInitials}
                        alt={userName ? `${userName} avatar` : "User avatar"}
                        size="default"
                    />
                    {isMenuOpen && (
                        <>
                            <Text as="p" variant="body-16" weight="semibold" leading="regular" className="uds-menu_account__name">
                                {userName}
                            </Text>
                            <ActionMenu
                                placement="top-start"
                                items={normalizedAccountMenuItems}
                                trigger={
                                    <Button
                                        appearance="text"
                                        icon={<Icon name="DotsThreeVertical" appearance="bold" />}
                                        label="Account Menu"
                                        layout="icon-only"
                                        aria-label="Account menu"
                                    />
                                }
                            />
                        </>
                    )}
                </div>
            )}
        </aside>
    );
}

Menu.defaultProps = {
    title: "Menu",
};

export default React.memo(Menu);
