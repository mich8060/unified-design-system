import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import Dropdown from "../Dropdown/Dropdown";
import "./Menu.scss";

// Getting Started items
const GETTING_STARTED_ITEMS = [
  { path: "/getting-started/installation", label: "Installation", icon: "SquaresFour" },
  { path: "/getting-started/font", label: "Font Installation", icon: "SquaresFour" },
  { path: "/getting-started/tokens", label: "CSS Tokens", icon: "SquaresFour" },
  { path: "/getting-started/components", label: "Using Components", icon: "SquaresFour" },
];

// Foundations items (alphabetically sorted)
const FOUNDATIONS_ITEMS = [
  { path: "/border-radius", label: "Border Radius", icon: "SquaresFour" },
  { path: "/colors", label: "Colors", icon: "SquaresFour" },
  { path: "/figma-variables", label: "Design Tokens", icon: "SquaresFour" },
  { path: "/flex", label: "Flex Layout", icon: "SquaresFour" },
  { path: "/icons", label: "Icons", icon: "SquaresFour" },
  { path: "/shadows", label: "Shadows", icon: "SquaresFour" },
  { path: "/spacing", label: "Spacing", icon: "SquaresFour" },
  { path: "/typography", label: "Typography", icon: "SquaresFour" },
  { path: "/utilities", label: "Utility Classes", icon: "SquaresFour" },
];

// Components items (alphabetically sorted)
const COMPONENTS_ITEMS = [
  { path: "/accordion", label: "Accordion", icon: "SquaresFour" },
  { path: "/action-menu", label: "Action Menu", icon: "SquaresFour" },
  { path: "/avatar", label: "Avatar", icon: "SquaresFour" },
  { path: "/badge", label: "Badge", icon: "SquaresFour" },
  { path: "/branding", label: "Branding", icon: "SquaresFour" },
  { path: "/breadcrumb", label: "Breadcrumb", icon: "SquaresFour" },
  { path: "/buttons", label: "Buttons", icon: "SquaresFour" },
  { path: "/calendar", label: "Datepicker", icon: "SquaresFour" },
  { path: "/checkbox", label: "Checkbox", icon: "SquaresFour" },
  { path: "/chip", label: "Chip", icon: "SquaresFour" },
  { path: "/divider", label: "Divider", icon: "SquaresFour" },
  { path: "/dot-status", label: "Dot Status", icon: "SquaresFour" },
  { path: "/dropdown", label: "Dropdown", icon: "SquaresFour" },
  { path: "/field", label: "Field", icon: "SquaresFour" },
  { path: "/file-upload", label: "File Upload", icon: "SquaresFour" },
  { path: "/image-aspect", label: "Image Aspect", icon: "SquaresFour" },
  { path: "/input", label: "Text Input", icon: "SquaresFour" },
  { path: "/key", label: "Key", icon: "SquaresFour" },
  { path: "/micro-calendar", label: "Micro Calendar", icon: "SquaresFour" },
  { path: "/pagination", label: "Pagination", icon: "SquaresFour" },
  { path: "/pill-toggle", label: "Pill Toggle", icon: "SquaresFour" },
  {
    path: "/progress-indicator",
    label: "Progress Indicator",
    icon: "SquaresFour",
  },
  { path: "/progress-circle", label: "Progress Circle", icon: "SquaresFour" },
  { path: "/radio", label: "Radio", icon: "SquaresFour" },
  { path: "/slider", label: "Slider", icon: "SquaresFour" },
  { path: "/status", label: "Status", icon: "SquaresFour" },
  { path: "/steps", label: "Steps", icon: "SquaresFour" },
  { path: "/table", label: "Table", icon: "SquaresFour" },
  { path: "/tabs", label: "Tabs", icon: "SquaresFour" },
  { path: "/tag", label: "Tag", icon: "SquaresFour" },
  { path: "/textarea", label: "Textarea", icon: "SquaresFour" },
  { path: "/toast", label: "Toast", icon: "SquaresFour" },
  { path: "/toggle", label: "Toggle", icon: "SquaresFour" },
  { path: "/tooltip", label: "Tooltip", icon: "SquaresFour" },
].sort((a, b) => a.label.localeCompare(b.label));

// Patterns items (alphabetically sorted)
const PATTERNS_ITEMS = [{ path: "/menu", label: "Menu", icon: "SquaresFour" }];

// Brand options with display labels
const BRAND_OPTIONS = [
  { value: "design-system", label: "Design System" },
  { value: "locumsmart", label: "LocumSmart" },
  { value: "wireframe", label: "Wireframe" },
  { value: "connect", label: "Connect" },
  { value: "comphealth", label: "CompHealth" },
  { value: "modio", label: "Modio" },
  { value: "weatherby", label: "Weatherby" },
  { value: "gms", label: "GMS" },
];

export default function Menu({
  activeBrand,
  activeMode,
  onBrandChange,
  onModeChange,
}) {
  const [expanded, setExpanded] = useState(true);
  const [gettingStartedExpanded, setGettingStartedExpanded] = useState(false);
  const [foundationsExpanded, setFoundationsExpanded] = useState(false);
  const [componentsExpanded, setComponentsExpanded] = useState(false);
  const [patternsExpanded, setPatternsExpanded] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const isAnyChildActive = (items) => {
    return items.some((item) => isActive(item.path));
  };

  // Auto-expand accordions if any child is active
  useEffect(() => {
    const checkActive = (path) => {
      if (path === "/") {
        return location.pathname === "/";
      }
      return location.pathname.startsWith(path);
    };

    const gettingStartedActive = GETTING_STARTED_ITEMS.some((item) =>
      checkActive(item.path),
    ) || location.pathname === "/";
    const foundationsActive = FOUNDATIONS_ITEMS.some((item) =>
      checkActive(item.path),
    );
    const componentsActive = COMPONENTS_ITEMS.some((item) =>
      checkActive(item.path),
    );
    const patternsActive = PATTERNS_ITEMS.some((item) =>
      checkActive(item.path),
    );

    if (gettingStartedActive) {
      setGettingStartedExpanded(true);
    }
    if (foundationsActive) {
      setFoundationsExpanded(true);
    }
    if (componentsActive) {
      setComponentsExpanded(true);
    }
  }, [location.pathname]);

  return (
    <aside
      className={`menu ${expanded ? "menu--expanded" : "menu--collapsed"}`}
    >
      {/* Branding Section */}
      <div className="menu__branding">
        <Button
          appearance="text"
          layout="icon-only"
          size="default"
          icon="List"
          iconSize={20}
          aria-label="Toggle menu"
          onClick={() => setExpanded(!expanded)}
          className="menu__toggle"
        />
        {expanded && (
          <div className="menu__brand">
<svg viewBox="0 0 594 132" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M591.799 83.568C591.799 86.448 591.223 89.04 590.071 91.344C588.983 93.584 587.511 95.504 585.655 97.104C583.799 98.64 581.591 99.792 579.031 100.56C576.535 101.392 573.911 101.808 571.159 101.808C566.935 101.808 563.063 101.072 559.543 99.6C556.087 98.064 553.207 96.016 550.903 93.456L552.535 92.016C554.967 94.64 557.783 96.624 560.983 97.968C564.247 99.248 567.607 99.888 571.063 99.888C573.559 99.888 575.927 99.536 578.167 98.832C580.407 98.064 582.391 97.008 584.119 95.664C585.847 94.256 587.191 92.56 588.151 90.576C589.175 88.528 589.687 86.192 589.687 83.568C589.687 80.944 589.143 78.736 588.055 76.944C586.967 75.152 585.559 73.616 583.831 72.336C582.103 71.056 580.119 70 577.879 69.168C575.703 68.272 573.495 67.472 571.255 66.768C568.439 65.872 565.847 64.944 563.479 63.984C561.175 62.96 559.159 61.744 557.431 60.336C555.767 58.864 554.455 57.136 553.495 55.152C552.599 53.104 552.151 50.64 552.151 47.76C552.151 44.944 552.695 42.448 553.783 40.272C554.935 38.032 556.471 36.176 558.391 34.704C560.311 33.168 562.519 32.016 565.015 31.248C567.575 30.416 570.263 30 573.079 30C576.535 30 579.799 30.672 582.871 32.016C586.007 33.296 588.567 35.152 590.551 37.584L588.919 39.024C587.127 36.784 584.823 35.056 582.007 33.84C579.255 32.56 576.247 31.92 572.983 31.92C570.679 31.92 568.407 32.24 566.167 32.88C563.991 33.52 562.007 34.512 560.215 35.856C558.423 37.136 556.983 38.768 555.895 40.752C554.807 42.736 554.263 45.072 554.263 47.76C554.263 50.384 554.743 52.624 555.703 54.48C556.663 56.272 557.943 57.808 559.543 59.088C561.143 60.368 562.935 61.424 564.919 62.256C566.967 63.088 569.047 63.856 571.159 64.56C574.039 65.52 576.727 66.512 579.223 67.536C581.719 68.496 583.895 69.68 585.751 71.088C587.671 72.496 589.143 74.224 590.167 76.272C591.255 78.256 591.799 80.688 591.799 83.568Z" fill="black" fill-opacity="0.3"/>
    <path d="M573.079 29C576.666 29 580.065 29.6978 583.265 31.0967C586.536 32.4345 589.232 34.3845 591.326 36.9521L591.935 37.6973L591.213 38.334L589.581 39.7734L588.794 40.4678L588.139 39.6484C586.456 37.5451 584.288 35.9135 581.611 34.7578L581.599 34.7529L581.586 34.7471C578.976 33.5331 576.113 32.9199 572.983 32.9199C570.773 32.9199 568.594 33.2271 566.442 33.8418C564.382 34.4486 562.509 35.3863 560.815 36.6562L560.806 36.6631L560.797 36.6699C559.131 37.86 557.79 39.3767 556.772 41.2324C555.779 43.0436 555.264 45.2084 555.264 47.7598C555.264 50.2624 555.721 52.3358 556.59 54.0176C557.485 55.6853 558.676 57.1137 560.168 58.3076C561.689 59.5244 563.397 60.5319 565.295 61.3291C567.323 62.153 569.384 62.914 571.476 63.6113C574.374 64.5775 577.083 65.5769 579.603 66.6104H579.602C582.159 67.5957 584.409 68.8168 586.343 70.2812L586.721 70.5664C588.571 72.004 590.016 73.7472 591.044 75.791C592.232 77.9573 592.8 80.5651 592.8 83.5684C592.8 86.5807 592.195 89.3245 590.97 91.7803L590.971 91.7812C589.824 94.1415 588.269 96.171 586.309 97.8613L586.301 97.8682L586.293 97.874C584.33 99.4984 582.009 100.706 579.347 101.508C576.744 102.375 574.013 102.808 571.159 102.808C566.817 102.808 562.812 102.051 559.157 100.522L559.147 100.519L559.137 100.514C555.565 98.9263 552.567 96.7991 550.16 94.125L549.484 93.374L550.242 92.7061L551.874 91.2666L552.605 90.6201L553.269 91.3359C555.604 93.8553 558.299 95.753 561.358 97.04C564.505 98.2726 567.738 98.8877 571.063 98.8877C573.458 98.8877 575.718 98.55 577.851 97.8818C579.983 97.1497 581.86 96.1513 583.487 94.8887C585.002 93.6542 586.198 92.188 587.079 90.4844L587.257 90.1289L587.429 89.7715C588.261 87.9655 588.687 85.9042 588.688 83.5684C588.688 81.0817 588.172 79.0635 587.2 77.4629C586.181 75.7847 584.863 74.3445 583.236 73.1396C581.592 71.9215 579.693 70.9083 577.531 70.1055L577.515 70.0996L577.499 70.0928C575.35 69.2077 573.168 68.4171 570.955 67.7217L570.952 67.7207C568.115 66.8181 565.499 65.8821 563.104 64.9111L563.088 64.9043L563.073 64.8975C560.699 63.8421 558.605 62.582 556.8 61.1113L556.784 61.0986L556.769 61.085C555.006 59.526 553.613 57.6919 552.595 55.5879L552.579 55.5527C551.614 53.3476 551.151 50.7395 551.151 47.7598C551.151 44.8133 551.721 42.1602 552.889 39.8252L552.894 39.8145C554.107 37.4548 555.732 35.4865 557.767 33.9229C559.791 32.3035 562.113 31.0947 564.722 30.292C567.381 29.4294 570.169 29 573.079 29Z" stroke="black" stroke-opacity="0.3" stroke-width="2"/>
    <path d="M537.125 65.9039C537.125 71.7919 536.165 76.8799 534.245 81.1679C532.325 85.3919 529.669 88.9119 526.277 91.7279C522.885 94.4799 518.885 96.5279 514.277 97.8719C509.733 99.2159 504.837 99.8879 499.589 99.8879H480.293V31.9199H499.589C504.837 31.9199 509.733 32.5919 514.277 33.9359C518.885 35.2159 522.885 37.2639 526.277 40.0799C529.669 42.8319 532.325 46.3519 534.245 50.6399C536.165 54.9279 537.125 60.0159 537.125 65.9039ZM482.501 33.8399V97.9679H499.109C504.101 97.9679 508.773 97.3599 513.125 96.1439C517.541 94.8639 521.349 92.9439 524.549 90.3839C527.749 87.7599 530.277 84.4319 532.133 80.3999C533.989 76.3679 534.917 71.5359 534.917 65.9039C534.917 60.2719 533.989 55.4399 532.133 51.4079C530.277 47.3119 527.749 43.9839 524.549 41.4239C521.349 38.7999 517.541 36.8799 513.125 35.6639C508.773 34.4479 504.101 33.8399 499.109 33.8399H482.501Z" fill="black" fill-opacity="0.3"/>
    <path d="M499.589 30.9199L500.585 30.9277C505.545 31.0078 510.206 31.6885 514.561 32.9766H514.56C519.286 34.2914 523.41 36.4 526.916 39.3105H526.915C530.434 42.1677 533.18 45.8149 535.157 50.2314C537.147 54.6762 538.125 59.91 538.125 65.9043C538.125 71.8983 537.147 77.1316 535.157 81.5762L535.155 81.582C533.176 85.9359 530.43 89.5796 526.916 92.4971L526.907 92.5049C523.403 95.348 519.281 97.4525 514.56 98.8301L514.561 98.8311C509.915 100.205 504.923 100.888 499.589 100.888H479.293V30.9199H499.589ZM483.501 96.9678H499.109C504.02 96.9677 508.6 96.3697 512.855 95.1807C517.152 93.9341 520.833 92.0733 523.914 89.6104C526.989 87.0893 529.427 83.886 531.225 79.9814C533.006 76.111 533.917 71.4292 533.917 65.9043C533.917 60.3792 533.006 55.6967 531.225 51.8262L531.222 51.8203C529.424 47.8538 526.989 44.6572 523.924 42.2051L523.915 42.1973C520.834 39.671 517.155 37.8108 512.859 36.6279L512.855 36.627C508.6 35.4379 504.02 34.8399 499.109 34.8398H483.501V96.9678Z" stroke="black" stroke-opacity="0.3" stroke-width="2"/>
    <path d="M454.717 65.7119C454.717 71.6639 453.597 76.8159 451.357 81.1679C449.181 85.4559 446.269 89.0079 442.621 91.8239C439.037 94.5759 434.973 96.6239 430.429 97.9679C425.885 99.2479 421.277 99.8879 416.605 99.8879H391.261V31.9199H415.837C420.637 31.9199 425.373 32.4959 430.045 33.6479C434.717 34.7359 438.877 36.5919 442.525 39.2159C446.173 41.7759 449.117 45.2319 451.357 49.5839C453.597 53.9359 454.717 59.3119 454.717 65.7119ZM437.629 65.7119C437.629 61.8719 436.989 58.7039 435.709 56.2079C434.493 53.6479 432.829 51.6319 430.717 50.1599C428.669 48.6239 426.301 47.5359 423.613 46.8959C420.989 46.2559 418.269 45.9359 415.453 45.9359H407.293V85.6799H415.069C418.013 85.6799 420.829 85.3599 423.517 84.7199C426.269 84.0159 428.669 82.8959 430.717 81.3599C432.829 79.8239 434.493 77.7759 435.709 75.2159C436.989 72.6559 437.629 69.4879 437.629 65.7119Z" fill="black"/>
    <path d="M321.429 99.8879V31.9199H367.125V45.8399H337.269V58.6079H365.493V71.7599H337.269V85.8719H368.853V99.8879H321.429Z" fill="black"/>
    <path d="M279.346 99.8879V31.9199H295.858V99.8879H279.346Z" fill="black"/>
    <path d="M228.738 45.9359V59.9519H255.042V73.4879H228.738V99.8879H212.514V31.9199H257.25V45.9359H228.738Z" fill="black"/>
    <path d="M170.431 99.8879V31.9199H186.943V99.8879H170.431Z" fill="black"/>
    <path d="M126.267 99.8879L98.9074 55.4399H98.6194L99.0034 99.8879H83.0674V31.9199H101.787L129.051 76.2719H129.339L128.955 31.9199H144.891V99.8879H126.267Z" fill="black"/>
    <path d="M58.272 74.2559C58.272 78.3519 57.568 82.0959 56.16 85.4879C54.816 88.8159 52.864 91.6959 50.304 94.1279C47.744 96.4959 44.64 98.3519 40.992 99.6959C37.408 101.04 33.408 101.712 28.992 101.712C24.512 101.712 20.48 101.04 16.896 99.6959C13.312 98.3519 10.272 96.4959 7.776 94.1279C5.28 91.6959 3.36 88.8159 2.016 85.4879C0.672 82.0959 0 78.3519 0 74.2559V31.9199H16.32V72.9119C16.32 74.7679 16.544 76.5279 16.992 78.1919C17.504 79.8559 18.24 81.3599 19.2 82.7039C20.224 83.9839 21.536 85.0079 23.136 85.7759C24.8 86.5439 26.784 86.9279 29.088 86.9279C31.392 86.9279 33.344 86.5439 34.944 85.7759C36.608 85.0079 37.952 83.9839 38.976 82.7039C40 81.3599 40.736 79.8559 41.184 78.1919C41.632 76.5279 41.856 74.7679 41.856 72.9119V31.9199H58.272V74.2559Z" fill="black"/>
</svg>




          </div>
        )}
      </div>

      {/* Search Section */}
      <div className="menu__search">
        {expanded ? (
          <div className="menu__search-input">
            <input
              type="text"
              placeholder="Search..."
              className="menu__search-field"
            />
            <Icon name="MagnifyingGlass" size={16} appearance="regular" />
          </div>
        ) : (
          <div className="menu__search-icon">
            <Icon name="MagnifyingGlass" size={16} appearance="regular" />
          </div>
        )}
      </div>

      {/* Brand Switcher Section */}
      {expanded && (
        <div className="menu__brand-switcher">
          <Dropdown
            options={BRAND_OPTIONS}
            value={activeBrand}
            onChange={onBrandChange}
            id="brand-select"
            className="menu__brand-dropdown"
          />
        </div>
      )}

      {/* Navigation Section */}
      <nav className="menu__nav">
        {/* Getting Started Accordion */}
        {expanded && (
          <div className="menu__accordion">
            <button
              className={`menu__accordion-header ${isAnyChildActive(GETTING_STARTED_ITEMS) || isActive("/") ? "menu__accordion-header--active" : ""}`}
              onClick={() => setGettingStartedExpanded(!gettingStartedExpanded)}
              aria-expanded={gettingStartedExpanded}
            >
              <Icon name="Layout" size={24} appearance="duotone" />
              <span className="menu__item-label">Getting Started</span>
              <Icon
                name="CaretDown"
                size={16}
                appearance="bold"
                className={`menu__accordion-icon ${gettingStartedExpanded ? "menu__accordion-icon--expanded" : ""}`}
              />
            </button>
            <div
              className={`menu__accordion-body ${gettingStartedExpanded ? "menu__accordion-body--expanded" : ""}`}
            >
              <NavLink
                className={`menu__item menu__item--sub ${isActive("/") ? "menu__item--sub--active" : ""}`}
                to="/"
                end
              >
                <span className="menu__item-label">Overview</span>
              </NavLink>
              {GETTING_STARTED_ITEMS.map((item) => {
                const active = isActive(item.path);
                return (
                  <NavLink
                    key={item.path}
                    className={`menu__item menu__item--sub ${active ? "menu__item--sub--active" : ""}`}
                    to={item.path}
                  >
                    <span className="menu__item-label">{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        )}

        {/* Foundations Accordion */}
        {expanded && (
          <div className="menu__accordion">
            <button
              className={`menu__accordion-header ${isAnyChildActive(FOUNDATIONS_ITEMS) ? "menu__accordion-header--active" : ""}`}
              onClick={() => setFoundationsExpanded(!foundationsExpanded)}
              aria-expanded={foundationsExpanded}
            >
              <Icon name="SquaresFour" size={24} appearance="duotone" />
              <span className="menu__item-label">Foundations</span>
              <Icon
                name="CaretDown"
                size={16}
                appearance="bold"
                className={`menu__accordion-icon ${foundationsExpanded ? "menu__accordion-icon--expanded" : ""}`}
              />
            </button>
            <div
              className={`menu__accordion-body ${foundationsExpanded ? "menu__accordion-body--expanded" : ""}`}
            >
              {FOUNDATIONS_ITEMS.map((item) => {
                const active = isActive(item.path);
                return (
                  <NavLink
                    key={item.path}
                    className={`menu__item menu__item--sub ${active ? "menu__item--sub--active" : ""}`}
                    to={item.path}
                  >
                    <span className="menu__item-label">{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        )}

        {/* Components Accordion */}
        {expanded && (
          <div className="menu__accordion">
            <button
              className={`menu__accordion-header ${isAnyChildActive(COMPONENTS_ITEMS) ? "menu__accordion-header--active" : ""}`}
              onClick={() => setComponentsExpanded(!componentsExpanded)}
              aria-expanded={componentsExpanded}
            >
              <Icon name="DiamondsFour" size={24} appearance="duotone" />
              <span className="menu__item-label">Components</span>
              <Icon
                name="CaretDown"
                size={16}
                appearance="bold"
                className={`menu__accordion-icon ${componentsExpanded ? "menu__accordion-icon--expanded" : ""}`}
              />
            </button>
            <div
              className={`menu__accordion-body ${componentsExpanded ? "menu__accordion-body--expanded" : ""}`}
            >
              {COMPONENTS_ITEMS.map((item) => {
                const active = isActive(item.path);
                return (
                  <NavLink
                    key={item.path}
                    className={`menu__item menu__item--sub ${active ? "menu__item--sub--active" : ""}`}
                    to={item.path}
                  >
                    <span className="menu__item-label">{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        )}

        {/* Patterns Accordion */}
        {expanded && (
          <div className="menu__accordion">
            <button
              className={`menu__accordion-header ${isAnyChildActive(PATTERNS_ITEMS) ? "menu__accordion-header--active" : ""}`}
              onClick={() => setPatternsExpanded(!patternsExpanded)}
              aria-expanded={patternsExpanded}
            >
              <Icon name="CirclesThree" size={24} appearance="duotone" />
              <span className="menu__item-label">Patterns</span>
              <Icon
                name="CaretDown"
                size={16}
                appearance="bold"
                className={`menu__accordion-icon ${patternsExpanded ? "menu__accordion-icon--expanded" : ""}`}
              />
            </button>
            <div
              className={`menu__accordion-body ${patternsExpanded ? "menu__accordion-body--expanded" : ""}`}
            >
              {PATTERNS_ITEMS.map((item) => {
                const active = isActive(item.path);
                return (
                  <NavLink
                    key={item.path}
                    className={`menu__item menu__item--sub ${active ? "menu__item--sub--active" : ""}`}
                    to={item.path}
                  >
                    <span className="menu__item-label">{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Mode Toggle Section */}
      <div className="menu__footer">
        <Button
          appearance="outline"
          layout="icon-only"
          size="default"
          icon={activeMode === "light" ? "MoonStars" : "Sun"}
          iconSize={20}
          aria-label={`Switch to ${activeMode === "light" ? "dark" : "light"} mode`}
          onClick={() =>
            onModeChange(activeMode === "light" ? "dark" : "light")
          }
          className="menu__mode-toggle"
        />
        {expanded && (
          <span className="menu__mode-label">
            {activeMode === "light" ? "Dark" : "Light"} Mode
          </span>
        )}
      </div>
    </aside>
  );
}
