import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./Breadcrumb.scss";

// Foundations items
const FOUNDATIONS_ITEMS = [
  { path: "/border-radius", label: "Border Radius" },
  { path: "/colors", label: "Colors" },
  { path: "/flex", label: "Flex Layout" },
  { path: "/icons", label: "Icons" },
  { path: "/shadows", label: "Shadows" },
  { path: "/spacing", label: "Spacing" },
  { path: "/tokens", label: "Tokens" },
  { path: "/typography", label: "Typography" },
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
  { path: "/calendar", label: "Datepicker" },
  { path: "/checkbox", label: "Checkbox" },
  { path: "/chip", label: "Chip" },
  { path: "/divider", label: "Divider" },
  { path: "/dot-status", label: "Dot Status" },
  { path: "/dropdown", label: "Dropdown" },
  { path: "/field", label: "Field" },
  { path: "/file-upload", label: "File Upload" },
  { path: "/image-aspect", label: "Image Aspect" },
  { path: "/input", label: "Text Input" },
  { path: "/key", label: "Key" },
  { path: "/pill-toggle", label: "Pill Toggle" },
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

/**
 * Breadcrumb component for page navigation
 * @param {Array} items - Optional array of breadcrumb items (max 5). Each item should have { label: string, href?: string }
 *                        If href is provided, the item will be a link. The last item is always the current page (no link).
 */
export default function Breadcrumb({ items }) {
  const location = useLocation();
  const pathname = location.pathname;

  // If custom items are provided, use them
  if (items && items.length > 0) {
    // Limit to 5 items
    const displayItems = items.slice(0, 5);
    
    return (
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <ol className="breadcrumb__list">
          {displayItems.map((item, index) => {
            const isLast = index === displayItems.length - 1;
            const isExternal = item.href && (item.href.startsWith("http://") || item.href.startsWith("https://"));
            
            return (
              <React.Fragment key={index}>
                <li className={`breadcrumb__item ${isLast ? "breadcrumb__item--current" : ""}`}>
                  {item.href && !isLast ? (
                    isExternal ? (
                      <a href={item.href} className="breadcrumb__link" target="_blank" rel="noopener noreferrer">
                        <span className="breadcrumb__text">{item.label}</span>
                      </a>
                    ) : (
                      <Link to={item.href} className="breadcrumb__link">
                        <span className="breadcrumb__text">{item.label}</span>
                      </Link>
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

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol className="breadcrumb__list">
        <li className="breadcrumb__item">
          <span className="breadcrumb__text">Unified Design System</span>
        </li>
        <li className="breadcrumb__item">
          <span className="breadcrumb__separator" aria-hidden="true">
            /
          </span>
        </li>
        <li className="breadcrumb__item">
          <span className="breadcrumb__text">{category}</span>
        </li>
        <li className="breadcrumb__item">
          <span className="breadcrumb__separator" aria-hidden="true">
            /
          </span>
        </li>
        <li className="breadcrumb__item breadcrumb__item--current">
          <span className="breadcrumb__text">{currentItem.label}</span>
        </li>
      </ol>
    </nav>
  );
}
