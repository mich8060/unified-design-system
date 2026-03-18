import React, { useCallback, useEffect, useId, useMemo, useState } from "react";
import type { ShellLayoutConfig } from "./layout.types";
import { defaultLayout } from "./layout.types";
import Avatar from "../design-system/components/Avatar/Avatar";
import ActionMenu from "../design-system/components/ActionMenu/ActionMenu";
import Button from "../design-system/components/Button/Button";
import Branding from "../design-system/components/Branding/Branding";
import { Toolbar } from "../design-system/components/Toolbar/Toolbar";
import "./shell.scss";

export interface AppShellSlots {
    Header?: React.ReactNode;
    Sidebar?: React.ReactNode;
    Breadcrumb?: React.ReactNode;
    Footer?: React.ReactNode;
    SubNav?: React.ReactNode;
}

/**
 * Public props for the AppShell root component.
 *
 * @example
 * ```tsx
 * <AppShell brand="comphealth" theme="dark">
 *   <AppShell.Menu>...</AppShell.Menu>
 *   <AppShell.Content>
 *     <AppShell.Listview>...</AppShell.Listview>
 *     <AppShell.Main>...</AppShell.Main>
 *     <AppShell.SidePanel>...</AppShell.SidePanel>
 *   </AppShell.Content>
 * </AppShell>
 * ```
 */
export interface AppShellProps {
    layout?: ShellLayoutConfig;
    slots?: AppShellSlots;
    children?: React.ReactNode;
    /** Standalone mode: no navigation/menu spacing (desktop/mobile). */
    standalone?: boolean;
    brand?: string;
    theme?: "light" | "dark";
    className?: string;
    skipToContent?: boolean;
    skipToContentLabel?: string;
    mainContentId?: string;
    mobileBrandLabel?: string;
    mobileUserName?: string;
    mobileUserInitials?: string;
    mobileUserAvatarSrc?: string;
    mobileAccountMenuItems?: unknown[];
}

/** Slot wrapper props used by AppShell compound regions. */
export interface AppShellSectionProps {
    children?: React.ReactNode;
    /** Optional width for rail regions like AppShell.SidePanel (e.g. 420 or "28rem"). */
    width?: number | string;
    /** Optional maximum width for rail regions like AppShell.SidePanel (e.g. 480 or "32rem"). */
    maxWidth?: number | string;
    /** Optional surface token for AppShell.Main. */
    surface?: "primary" | "secondary";
    /** Optional visual variant for AppShell.SidePanel. */
    variant?: "default" | "document-details";
}

export interface AppShellSidePanelSectionProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
}

type AppShellSlotName = "Menu" | "Content" | "Listview" | "Main" | "SidePanel" | "Footer";
type AppShellSlotComponent = React.FC<AppShellSectionProps> & { __appShellSlot?: AppShellSlotName };

const createAppShellSlot = (slot: AppShellSlotName): AppShellSlotComponent => {
    const Slot: AppShellSlotComponent = ({ children }) => <>{children}</>;
    Slot.__appShellSlot = slot;
    return Slot;
};

const getAppShellSlotName = (type: unknown): AppShellSlotName | undefined => {
    if (!type) return undefined;
    if (typeof type === "function" || (typeof type === "object" && type !== null)) {
        return (type as { __appShellSlot?: AppShellSlotName }).__appShellSlot;
    }
    return undefined;
};

const AppShellMenuSlot = createAppShellSlot("Menu");
const AppShellContentSlot = createAppShellSlot("Content");
const AppShellListviewSlot = createAppShellSlot("Listview");
const AppShellMainSlot = createAppShellSlot("Main");
const AppShellSidePanelSlot = createAppShellSlot("SidePanel");
const AppShellFooterSlot = createAppShellSlot("Footer");
const AppShellSidePanelSection = ({ children, className = "", ...rest }: AppShellSidePanelSectionProps) => {
    const sectionClassName = ["app-shell__side-panel-section", className].filter(Boolean).join(" ");
    return (
        <section className={sectionClassName} {...rest}>
            {children}
        </section>
    );
};

const hasRenderableContent = (node: React.ReactNode): boolean =>
    React.Children.toArray(node).some((child) => {
        if (typeof child === "string") return child.trim().length > 0;
        return child !== null && child !== undefined && child !== false;
    });

function AppShellComponent({
    layout,
    slots,
    children,
    standalone = false,
    brand = "default",
    theme = "light",
    className = "",
    skipToContent = true,
    skipToContentLabel = "Skip to content",
    mainContentId,
    mobileBrandLabel,
    mobileUserName = "Jane Doe",
    mobileUserInitials = "JD",
    mobileUserAvatarSrc,
    mobileAccountMenuItems = [],
}: AppShellProps) {
    const config = useMemo(() => ({ ...defaultLayout, ...layout }), [layout]);
    const generatedMainId = useId().replace(/[:]/g, "");
    const resolvedMainContentId = mainContentId ?? `app-shell-main-${generatedMainId}`;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const resolvedMobileBrandLabel = mobileBrandLabel ?? (brand === "default" ? "design-system" : brand);
    const normalizedMobileAccountMenuItems = useMemo(
        () => (Array.isArray(mobileAccountMenuItems) ? mobileAccountMenuItems : []),
        [mobileAccountMenuItems]
    );
    const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);
    const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen((prev) => !prev), []);

    useEffect(() => {
        if (!isMobileMenuOpen) return undefined;
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closeMobileMenu();
            }
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [closeMobileMenu, isMobileMenuOpen]);

    const handleSidebarClickCapture = useCallback((event: React.MouseEvent<HTMLElement>) => {
        const target = event.target as Element | null;
        if (!target) return;
        if (target.closest("a")) {
            closeMobileMenu();
        }
    }, [closeMobileMenu]);

    let customMenu: React.ReactNode = null;
    let customContent: React.ReactNode = null;
    let customListview: React.ReactNode = null;
    let customMain: React.ReactNode = null;
    let customSidePanel: React.ReactNode = null;
    let customFooter: React.ReactNode = null;
    let sidePanelWidth: number | string | undefined;
    let sidePanelMaxWidth: number | string | undefined;
    let mainSurface: "primary" | "secondary" = "secondary";
    let sidePanelVariant: "default" | "document-details" = "default";

    const topLevelChildren = React.Children.toArray(children) as React.ReactElement<AppShellSectionProps>[];
    for (const child of topLevelChildren) {
        const slotName = getAppShellSlotName(child.type);
        if (child.type === AppShellMenuSlot || slotName === "Menu") {
            customMenu = child.props.children;
            continue;
        }
        if (child.type === AppShellContentSlot || slotName === "Content") {
            customContent = child.props.children;
            continue;
        }
        if (child.type === AppShellFooterSlot || slotName === "Footer") {
            customFooter = child.props.children;
        }
    }

    const contentChildren = React.Children.toArray(customContent) as React.ReactElement<AppShellSectionProps>[];
    for (const child of contentChildren) {
        const slotName = getAppShellSlotName(child.type);
        if (child.type === AppShellListviewSlot || slotName === "Listview") {
            customListview = child.props.children;
            continue;
        }
        if (child.type === AppShellMainSlot || slotName === "Main") {
            customMain = child.props.children;
            mainSurface = child.props.surface ?? "secondary";
            continue;
        }
        if (child.type === AppShellSidePanelSlot || slotName === "SidePanel") {
            customSidePanel = child.props.children;
            sidePanelWidth = child.props.width;
            sidePanelMaxWidth = child.props.maxWidth;
            sidePanelVariant = child.props.variant ?? "default";
        }
    }
    const resolvedSidePanelWidth = typeof sidePanelWidth === "number" ? `${sidePanelWidth}px` : sidePanelWidth;
    const resolvedSidePanelMaxWidth =
        typeof sidePanelMaxWidth === "number" ? `${sidePanelMaxWidth}px` : sidePanelMaxWidth;
    const sidePanelStyle =
        resolvedSidePanelWidth || resolvedSidePanelMaxWidth
            ? ({
                  ...(resolvedSidePanelWidth
                      ? ({ ["--app-shell-side-panel-width"]: resolvedSidePanelWidth } as React.CSSProperties)
                      : {}),
                  ...(resolvedSidePanelMaxWidth
                      ? ({ ["--app-shell-side-panel-max-width"]: resolvedSidePanelMaxWidth } as React.CSSProperties)
                      : {}),
              } as React.CSSProperties)
            : undefined;

    const resolvedFooter = slots?.Footer ?? customFooter;
    const hasSidebarMenu = !standalone && config.sidebar && hasRenderableContent(customMenu);
    const hasListview = hasRenderableContent(customListview);
    const hasSidePanel = hasRenderableContent(customSidePanel);

    const shellClass = [
        "app-shell",
        `brand-${brand}`,
        `theme-${theme}`,
        `density-${config.density}`,
        `container-${config.container}`,
        `padding-${config.padding}`,
        hasSidebarMenu ? "app-shell--has-nav" : "app-shell--standalone",
        isMobileMenuOpen ? "app-shell--mobile-menu-open" : "",
        className,
    ].join(" ");

    return (
        <div className={shellClass}>
            {skipToContent ? (
                <a className="app-shell__skip-link" href={`#${resolvedMainContentId}`}>
                    {skipToContentLabel}
                </a>
            ) : null}
            {hasSidebarMenu ? (
                <div className="app-shell__mobile-toolbar-wrap">
                    <Toolbar
                        className="app-shell__mobile-toolbar"
                        left={(
                            <Button
                                appearance="text"
                                icon="List"
                                label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                                layout="icon-only"
                                aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                                onClick={toggleMobileMenu}
                            />
                        )}
                        center={(
                            <Branding brand={resolvedMobileBrandLabel} symbol />
                        )}
                        right={(
                            <ActionMenu
                                placement="bottom-end"
                                items={normalizedMobileAccountMenuItems}
                                trigger={(
                                    <button type="button" className="app-shell__mobile-avatar-trigger" aria-label={`${mobileUserName} account menu`}>
                                        <Avatar
                                            src={mobileUserAvatarSrc}
                                            initials={mobileUserInitials}
                                            alt={mobileUserName ? `${mobileUserName} avatar` : "User avatar"}
                                            size="default"
                                        />
                                    </button>
                                )}
                            />
                        )}
                    />
                </div>
            ) : null}
            <div className="app-shell__body">
                {hasSidebarMenu ? (
                    <aside className="app-shell__sidebar" aria-label="Primary" onClickCapture={handleSidebarClickCapture}>
                        {customMenu}
                    </aside>
                ) : null}
                <div className="app-shell__main">
                    <main className="app-shell__content" id={resolvedMainContentId} tabIndex={-1}>
                        {hasListview ? (
                            <aside className="app-shell__listview">{customListview}</aside>
                        ) : null}
                        <section className={`app-shell__main-content app-shell__main-content--surface-${mainSurface}`}>
                            {customMain}
                        </section>
                        {hasSidePanel ? (
                            <aside className={`app-shell__side-panel app-shell__side-panel--${sidePanelVariant}`} style={sidePanelStyle}>{customSidePanel}</aside>
                        ) : null}
                    </main>
                    {config.footer && hasRenderableContent(resolvedFooter) ? resolvedFooter : null}
                </div>
            </div>
            {hasSidebarMenu ? (
                <button
                    type="button"
                    className="app-shell__mobile-backdrop"
                    onClick={closeMobileMenu}
                    aria-label="Close navigation menu"
                />
            ) : null}
        </div>
    );
}

type AppShellCompound = React.FC<AppShellProps> & {
    Menu: typeof AppShellMenuSlot;
    Content: typeof AppShellContentSlot;
    Listview: typeof AppShellListviewSlot;
    Main: typeof AppShellMainSlot;
    SidePanel: typeof AppShellSidePanelSlot;
    SidePanelSection: typeof AppShellSidePanelSection;
    Footer: typeof AppShellFooterSlot;
};

export const AppShell = AppShellComponent as AppShellCompound;
AppShell.Menu = AppShellMenuSlot;
AppShell.Content = AppShellContentSlot;
AppShell.Listview = AppShellListviewSlot;
AppShell.Main = AppShellMainSlot;
AppShell.SidePanel = AppShellSidePanelSlot;
AppShell.SidePanelSection = AppShellSidePanelSection;
AppShell.Footer = AppShellFooterSlot;
