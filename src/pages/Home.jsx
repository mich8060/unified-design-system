import React from "react";
import { Link } from "react-router-dom";
import Icon from "../ui/Icon/Icon";
import "./Home.scss";

const PRINCIPLES = [
  {
    icon: "Columns",
    title: "Composable Layout",
    description:
      "Build application layouts by composing discrete panels — Menu, Listview, Main, Panel — rather than configuring a monolithic shell.",
  },
  {
    icon: "Palette",
    title: "Brand Aware",
    description:
      "Every element inherits brand tokens automatically. Switch brands via a single attribute and the entire UI adapts.",
  },
  {
    icon: "ArrowsOutSimple",
    title: "Progressive Disclosure",
    description:
      "Start simple and layer in a Listview, Panel, or Modal as the experience demands.",
  },
  {
    icon: "NavigationArrow",
    title: "Navigation First",
    description:
      "The collapsible sidebar is the primary wayfinding mechanism with accordion groups, active-state tracking, and keyboard navigation.",
  },
  {
    icon: "Stack",
    title: "Layered Interactions",
    description:
      "Modals and fullscreen dialogs render above the shell via portals, with proper focus trapping and backdrop management.",
  },
  {
    icon: "GitBranch",
    title: "Consistent Structure",
    description:
      "Every CHG application uses the same shell structure. Users build muscle memory once and carry it across products.",
  },
];

const COMPONENT_CARDS = [
  { to: "/accordion", icon: "List", label: "Accordion" },
  { to: "/action-menu", icon: "DotsThreeOutline", label: "Action Menu" },
  { to: "/avatar", icon: "UserCircle", label: "Avatar" },
  { to: "/badge", icon: "NumberCircleFive", label: "Badge" },
  { to: "/branding", icon: "Diamond", label: "Branding" },
  { to: "/breadcrumb", icon: "ArrowRight", label: "Breadcrumb" },
  { to: "/buttons", icon: "CursorClick", label: "Buttons" },
  { to: "/calendar", icon: "CalendarBlank", label: "Calendar" },
  { to: "/checkbox", icon: "CheckSquare", label: "Checkbox" },
  { to: "/chip", icon: "Tag", label: "Chip" },
  { to: "/datepicker", icon: "CalendarDots", label: "Datepicker" },
  { to: "/divider", icon: "SplitHorizontal", label: "Divider" },
  { to: "/dot-status", icon: "Circle", label: "Dot Status" },
  { to: "/dropdown", icon: "CaretDown", label: "Dropdown" },
  { to: "/event-card", icon: "CalendarCheck", label: "Event Card" },
  { to: "/field", icon: "TextAa", label: "Field" },
  { to: "/file-upload", icon: "UploadSimple", label: "File Upload" },
  { to: "/image-aspect", icon: "Image", label: "Image Aspect" },
  { to: "/input", icon: "TextT", label: "Text Input" },
  { to: "/key", icon: "Keyboard", label: "Key" },
  { to: "/micro-calendar", icon: "CalendarBlank", label: "Micro Calendar" },
  { to: "/modal", icon: "FrameCorners", label: "Modal" },
  { to: "/pagination", icon: "ArrowsLeftRight", label: "Pagination" },
  { to: "/pill-toggle", icon: "ToggleLeft", label: "Pill Toggle" },
  { to: "/progress-indicator", icon: "Percent", label: "Progress Bar" },
  { to: "/progress-circle", icon: "CircleNotch", label: "Progress Circle" },
  { to: "/radio", icon: "RadioButton", label: "Radio" },
  { to: "/slider", icon: "Sliders", label: "Slider" },
  { to: "/status", icon: "Pulse", label: "Status" },
  { to: "/steps", icon: "ListNumbers", label: "Steps" },
  { to: "/table", icon: "Table", label: "Table" },
  { to: "/tabs", icon: "Tabs", label: "Tabs" },
  { to: "/tag", icon: "TagSimple", label: "Tag" },
  { to: "/textarea", icon: "TextAlignLeft", label: "Textarea" },
  { to: "/toast", icon: "Bell", label: "Toast" },
  { to: "/toggle", icon: "ToggleRight", label: "Toggle" },
  { to: "/tooltip", icon: "ChatCenteredText", label: "Tooltip" },
];

const FOUNDATION_CARDS = [
  { to: "/app-shell", icon: "Layout", label: "Application" },
  { to: "/border-radius", icon: "BoundingBox", label: "Border Radius" },
  { to: "/colors", icon: "Palette", label: "Colors" },
  { to: "/figma-variables", icon: "Sliders", label: "Design Tokens" },
  { to: "/flex", icon: "Rows", label: "Flex Layout" },
  { to: "/icons", icon: "Shapes", label: "Icons" },
  { to: "/shadows", icon: "Drop", label: "Shadows" },
  { to: "/spacing", icon: "ArrowsOutLineHorizontal", label: "Spacing" },
  { to: "/typography", icon: "TextAa", label: "Typography" },
  { to: "/utilities", icon: "Wrench", label: "Utility Classes" },
];

export default function Home() {
  return (
    <section className="page">
      <header className="page__header">
        <div className="page__header-container">
          <h1 className="page__header-title">Unified Design System</h1>
          <p className="page__header-description">
            Explore interactive demos for the components included in this
            project. Use the links below to jump straight into sandbox
            environments for buttons and icons.
          </p>
        </div>
      </header>

      <main className="page__content">
        <div className="page__principles-section">
          <h2 className="page__section-title">Principles</h2>
          <div className="page__principles">
            {PRINCIPLES.map((p) => (
              <div className="page__principle" key={p.title}>
                <div className="page__principle-icon">
                  <Icon name={p.icon} size={24} />
                </div>
                <div className="page__principle-content">
                  <h4>{p.title}</h4>
                  <p>{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="home-section">
          <h2 className="home-section__title">Foundations</h2>
          <p className="home-section__description">
            Core primitives that power every component in the system.
          </p>
          <div className="home-grid">
            {FOUNDATION_CARDS.map((card) => (
              <Link key={card.to} to={card.to} className="home-card">
                <span className="home-card__icon">
                  <Icon name={card.icon} size={24} appearance="duotone" />
                </span>
                <span className="home-card__label">{card.label}</span>
                <span className="home-card__arrow">
                  <Icon name="ArrowRight" size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="home-section">
          <h2 className="home-section__title">Components</h2>
          <p className="home-section__description">
            Ready-to-use UI building blocks with full accessibility and brand theming.
          </p>
          <div className="home-grid home-grid--components">
            {COMPONENT_CARDS.map((card) => (
              <Link key={card.to} to={card.to} className="home-card">
                <span className="home-card__icon">
                  <Icon name={card.icon} size={24} appearance="duotone" />
                </span>
                <span className="home-card__label">{card.label}</span>
                <span className="home-card__arrow">
                  <Icon name="ArrowRight" size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </section>
  );
}
