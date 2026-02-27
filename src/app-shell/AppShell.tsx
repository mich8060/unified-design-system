import React, { useMemo } from "react";
import type { ShellLayoutConfig } from "./layout.types";
import { defaultLayout } from "./layout.types";
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
 *     <AppShell.Main>...</AppShell.Main>
 *   </AppShell.Content>
 * </AppShell>
 * ```
 */
export interface AppShellProps {
    layout?: ShellLayoutConfig;
    slots?: AppShellSlots;
    children?: React.ReactNode;
    brand?: string;
    theme?: "light" | "dark";
    className?: string;
}

/** Slot wrapper props used by AppShell compound regions. */
export interface AppShellSectionProps {
    children?: React.ReactNode;
}

const AppShellMenuSlot = ({ children }: AppShellSectionProps) => <>{children}</>;
const AppShellContentSlot = ({ children }: AppShellSectionProps) => <>{children}</>;
const AppShellListviewSlot = ({ children }: AppShellSectionProps) => <>{children}</>;
const AppShellMainSlot = ({ children }: AppShellSectionProps) => <>{children}</>;

function AppShellComponent({
    layout,
    slots,
    children,
    brand = "default",
    theme = "light",
    className = "",
}: AppShellProps) {
    const config = useMemo(() => ({ ...defaultLayout, ...layout }), [layout]);

    const shellClass = [
        "app-shell",
        `brand-${brand}`,
        `theme-${theme}`,
        `density-${config.density}`,
        `container-${config.container}`,
        `padding-${config.padding}`,
        className,
    ].join(" ");


    const Footer = slots?.Footer ?? (
        <footer className="app-shell__footer">
            <span>© {new Date().getFullYear()} UDS Sample</span>
            <span className="app-shell__footerRight">Brand: {brand} · Theme: {theme}</span>
        </footer>
    );

    let customMenu: React.ReactNode = null;
    let customContent: React.ReactNode = null;
    let customListview: React.ReactNode = null;
    let customMain: React.ReactNode = null;

    const topLevelChildren = React.Children.toArray(children) as React.ReactElement<{ children?: React.ReactNode }>[];
    for (const child of topLevelChildren) {
        if (child.type === AppShellMenuSlot) {
            customMenu = child.props.children;
            continue;
        }
        if (child.type === AppShellContentSlot) {
            customContent = child.props.children;
        }
    }

    const contentChildren = React.Children.toArray(customContent) as React.ReactElement<{ children?: React.ReactNode }>[];
    for (const child of contentChildren) {
        if (child.type === AppShellListviewSlot) {
            customListview = child.props.children;
            continue;
        }
        if (child.type === AppShellMainSlot) {
            customMain = child.props.children;
        }
    }

    return (
        <div className={shellClass}>
            <div className="app-shell__body">
                {config.sidebar ? (
                    <aside className="app-shell__sidebar" aria-label="Primary">
                        {customMenu}
                    </aside>
                ) : null}
                <div className="app-shell__main">
                    <main className="app-shell__content" id="main">
                        {customListview ? (
                            <aside className="app-shell__listview">{customListview}</aside>
                        ) : null}
                        <section className="app-shell__main-content">
                            {customMain}
                        </section>
                    </main>
                    {config.footer ? Footer : null}
                </div>
            </div>
        </div>
    );
}

type AppShellCompound = React.FC<AppShellProps> & {
    Menu: typeof AppShellMenuSlot;
    Content: typeof AppShellContentSlot;
    Listview: typeof AppShellListviewSlot;
    Main: typeof AppShellMainSlot;
};

export const AppShell = AppShellComponent as AppShellCompound;
AppShell.Menu = AppShellMenuSlot;
AppShell.Content = AppShellContentSlot;
AppShell.Listview = AppShellListviewSlot;
AppShell.Main = AppShellMainSlot;
