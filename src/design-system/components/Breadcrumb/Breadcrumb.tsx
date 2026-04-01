import React from "react";
import { Link, UNSAFE_LocationContext } from "react-router-dom";
import "./_breadcrumb.scss";
import type { BreadcrumbProps } from "./Breadcrumb.types";
import type { ReactNode } from "react";

// Foundations items
const FOUNDATIONS_ITEMS = [
  { path: "/app-shell", label: "Application" },
  { path: "/border-radius", label: "Border Radius" },
  { path: "/colors", label: "Colors" },
  { path: "/layout", label: "Layout" },
  { path: "/icons", label: "Icons" },
  { path: "/shadows", label: "Shadows" },
  { path: "/spacing", label: "Spacing" },
  { path: "/figma-variables", label: "Design Tokens" },
  { path: "/typography", label: "Typography" },
  { path: "/utilities", label: "Utility Classes" },
  { path: "/vertical-rhythm", label: "Vertical Rhythm" },
];

// Components items
const COMPONENTS_ITEMS = [
  { path: "/accordion", label: "Accordion" },
  { path: "/action-menu", label: "Action Menu" },
  { path: "/avatar", label: "Avatar" },
  { path: "/badge", label: "Badge" },
  { path: "/branding", label: "Branding" },
  { path: "/breadcrumb", label: "Breadcrumb" },
  { path: "/buttons", label: "Buttons" },
  { path: "/calendar", label: "Calendar" },
  { path: "/datepicker", label: "Datepicker" },
  { path: "/checkbox", label: "Checkbox" },
  { path: "/chip", label: "Chip" },
  { path: "/divider", label: "Divider" },
  { path: "/dot-status", label: "Dot Status" },
  { path: "/dropdown", label: "Dropdown" },
  { path: "/event-card", label: "Event Card" },
  { path: "/field", label: "Field" },
  { path: "/file-upload", label: "File Upload" },
  { path: "/image-aspect", label: "Image Aspect" },
  { path: "/input", label: "Text Input" },
  { path: "/key", label: "Key" },
  { path: "/progress-indicator", label: "Progress Indicator" },
  { path: "/progress-circle", label: "Progress Circle" },
  { path: "/radio", label: "Radio" },
  { path: "/slider", label: "Slider" },
  { path: "/status", label: "Status" },
  { path: "/steps", label: "Steps" },
  { path: "/table", label: "Table" },
  { path: "/tabs", label: "Tabs" },
  { path: "/tag", label: "Tag" },
  { path: "/textarea", label: "Textarea" },
  { path: "/toast", label: "Toast" },
  { path: "/toggle", label: "Toggle" },
  { path: "/tooltip", label: "Tooltip" },
];

// Patterns items
const PATTERNS_ITEMS = [
  { path: "/menu", label: "Menu" },
];

interface ResolvedBreadcrumbItem {
  key: string;
  label: ReactNode;
  href?: string;
}

function renderBreadcrumbList(items: ResolvedBreadcrumbItem[], isRouterAvailable: boolean) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol className="breadcrumb__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isExternal =
            typeof item.href === "string" &&
            (item.href.startsWith("http://") || item.href.startsWith("https://"));

          return (
            <React.Fragment key={item.key}>
              <li className={`breadcrumb__item ${isLast ? "breadcrumb__item--current" : ""}`}>
                {item.href && !isLast ? (
                  isExternal ? (
                    <a href={item.href} className="breadcrumb__link" target="_blank" rel="noopener noreferrer">
                      <span className="breadcrumb__text">{item.label}</span>
                    </a>
                  ) : isRouterAvailable ? (
                    <Link to={item.href} className="breadcrumb__link">
                      <span className="breadcrumb__text">{item.label}</span>
                    </Link>
                  ) : (
                    <a href={item.href} className="breadcrumb__link">
                      <span className="breadcrumb__text">{item.label}</span>
                    </a>
                  )
                ) : (
                  <span className="breadcrumb__text">{item.label}</span>
                )}
              </li>
              {!isLast && (
                <li className="breadcrumb__item">
                  <span className="breadcrumb__separator" aria-hidden="true">
                    /
                  </span>
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * Breadcrumb component for page navigation
 * @param {Array} items - Optional array of breadcrumb items (max 5). Each item should have { label: string, href?: string }
 *                        If href is provided, the item will be a link. The last item is always the current page (no link).
 */
export default function Breadcrumb({ items }: BreadcrumbProps) {
  const locationContext = React.useContext(UNSAFE_LocationContext);
  const isRouterAvailable = Boolean(locationContext);
  const pathname =
    locationContext?.location?.pathname ??
    (typeof window !== "undefined" ? window.location.pathname : "/");

  // If custom items are provided, use them
  if (items && items.length > 0) {
    // Limit to 5 items
    const displayItems: ResolvedBreadcrumbItem[] = items.slice(0, 5).map((item, index) => ({
      key: `${String(item.label ?? "item")}-${String(item.href ?? "none")}-${index}`,
      label: item.label,
      href: item.href,
    }));

    return renderBreadcrumbList(displayItems, isRouterAvailable);
  }

  // Default behavior: auto-generate from route
  // Don't show breadcrumb on home page
  if (pathname === "/") {
    return null;
  }

  // Find the current item and determine its category
  const allItems = [...FOUNDATIONS_ITEMS, ...COMPONENTS_ITEMS, ...PATTERNS_ITEMS];
  const currentItem = allItems.find(
    (item) => pathname === item.path || pathname.startsWith(item.path + "/"),
  );

  if (!currentItem) {
    return null;
  }

  // Determine the category
  let category = "Design System";
  if (FOUNDATIONS_ITEMS.some((item) => item.path === currentItem.path)) {
    category = "Foundations";
  } else if (COMPONENTS_ITEMS.some((item) => item.path === currentItem.path)) {
    category = "Components";
  } else if (PATTERNS_ITEMS.some((item) => item.path === currentItem.path)) {
    category = "Patterns";
  }

  return renderBreadcrumbList(
    [
      { key: "uds-home", label: "Unified Design System" },
      { key: "uds-category", label: category },
      { key: "uds-current", label: currentItem.label },
    ],
    isRouterAvailable,
  );
}
