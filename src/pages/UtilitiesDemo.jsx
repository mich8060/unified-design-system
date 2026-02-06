import React, { useState, useEffect } from "react";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Tabs from "../ui/Tabs/Tabs";
import { formatLastUpdated } from "../utils/formatDate";
import Flex from "../ui/Flex/Flex";
import Divider from "../ui/Divider/Divider";
import CopyButton from "../ui/CopyButton/CopyButton";
import Prism from "prismjs";
import "../styles/prism-custom.css";
import "prismjs/components/prism-markup";
import "./UtilitiesDemo.scss";

const UTILITY_CATEGORIES = [
  { id: "layout", label: "Layout" },
  { id: "flexbox-grid", label: "Flexbox & Grid" },
  { id: "spacing", label: "Spacing" },
  { id: "sizing", label: "Sizing" },
  { id: "typography", label: "Typography" },
  { id: "backgrounds", label: "Backgrounds" },
  { id: "borders-effects", label: "Borders & Effects" },
  { id: "transforms-animation", label: "Transforms & Animation" },
  { id: "interactivity", label: "Interactivity & Accessibility" },
  { id: "variants", label: "Variants" },
];

const UTILITY_EXAMPLES = {
  layout: [
    { class: "block", description: "Display block" },
    { class: "inline", description: "Display inline" },
    { class: "flex", description: "Display flex" },
    { class: "grid", description: "Display grid" },
    { class: "hidden", description: "Display none" },
    { class: "relative", description: "Position relative" },
    { class: "absolute", description: "Position absolute" },
    { class: "fixed", description: "Position fixed" },
    { class: "sticky", description: "Position sticky" },
    { class: "overflow-hidden", description: "Hide overflow" },
    { class: "overflow-auto", description: "Auto overflow" },
    { class: "z-modal", description: "Modal z-index" },
  ],
  "flexbox-grid": [
    { class: "flex-row", description: "Flex direction row" },
    { class: "flex-col", description: "Flex direction column" },
    { class: "flex-wrap", description: "Flex wrap" },
    { class: "items-center", description: "Align items center" },
    { class: "justify-between", description: "Justify space-between" },
    { class: "gap-4", description: "Gap 4px" },
    { class: "gap-8", description: "Gap 8px" },
    { class: "grid-cols-3", description: "Grid 3 columns" },
    { class: "grid-rows-2", description: "Grid 2 rows" },
  ],
  spacing: [
    { class: "p-4", description: "Padding 4px all sides" },
    { class: "px-8", description: "Padding 8px horizontal" },
    { class: "py-12", description: "Padding 12px vertical" },
    { class: "pt-16", description: "Padding-top 16px" },
    { class: "m-8", description: "Margin 8px all sides" },
    { class: "mx-auto", description: "Margin horizontal auto" },
    { class: "my-16", description: "Margin 16px vertical" },
    { class: "mt-24", description: "Margin-top 24px" },
    { class: "space-x-4", description: "Space between children horizontal" },
    { class: "space-y-8", description: "Space between children vertical" },
  ],
  sizing: [
    { class: "w-full", description: "Width 100%" },
    { class: "w-auto", description: "Width auto" },
    { class: "h-screen", description: "Height 100vh" },
    { class: "h-full", description: "Height 100%" },
    { class: "min-w-0", description: "Min-width 0" },
    { class: "max-w-full", description: "Max-width 100%" },
    { class: "size-24", description: "Width & height 24px" },
    { class: "aspect-square", description: "Aspect ratio 1:1" },
  ],
  typography: [
    { class: "text-16", description: "Font size 16px" },
    { class: "text-24", description: "Font size 24px" },
    { class: "font-semibold", description: "Font weight semibold" },
    { class: "font-bold", description: "Font weight bold" },
    { class: "leading-16", description: "Line height 16px" },
    { class: "uppercase", description: "Text transform uppercase" },
    { class: "italic", description: "Font style italic" },
    { class: "underline", description: "Text underline" },
    { class: "truncate", description: "Truncate text with ellipsis" },
    { class: "line-clamp-2", description: "Clamp to 2 lines" },
  ],
  backgrounds: [
    { class: "bg-primary", description: "Background primary" },
    { class: "bg-secondary", description: "Background secondary" },
    { class: "bg-brand-primary", description: "Background brand primary" },
    { class: "bg-cover", description: "Background size cover" },
    { class: "bg-center", description: "Background position center" },
  ],
  "borders-effects": [
    { class: "border", description: "Border width 1px" },
    { class: "border-2", description: "Border width 2px" },
    { class: "border-primary", description: "Border color primary" },
    { class: "rounded-8", description: "Border radius 8px" },
    { class: "rounded-full", description: "Border radius full" },
    { class: "shadow-md", description: "Box shadow medium" },
    { class: "shadow-lg", description: "Box shadow large" },
    { class: "opacity-50", description: "Opacity 50%" },
    { class: "blur-sm", description: "Blur filter small" },
  ],
  "transforms-animation": [
    { class: "scale-105", description: "Scale 105%" },
    { class: "rotate-45", description: "Rotate 45deg" },
    { class: "translate-x-4", description: "Translate X 4px" },
    { class: "transition", description: "Transition all" },
    { class: "duration-300", description: "Transition duration 300ms" },
    { class: "ease-in-out", description: "Ease in-out timing" },
  ],
  interactivity: [
    { class: "cursor-pointer", description: "Cursor pointer" },
    { class: "cursor-not-allowed", description: "Cursor not-allowed" },
    { class: "select-none", description: "User select none" },
    { class: "sr-only", description: "Screen reader only" },
    { class: "focus-visible:ring", description: "Focus visible ring" },
  ],
  variants: [
    { class: "hover:bg-secondary", description: "Hover background" },
    { class: "hover:opacity-75", description: "Hover opacity" },
    { class: "focus:ring", description: "Focus ring" },
    { class: "active:scale-95", description: "Active scale" },
    { class: "disabled:opacity-50", description: "Disabled opacity" },
    { class: "dark:bg-primary", description: "Dark mode background" },
  ],
};

const gettingStartedCode = `<div class="flex items-center gap-4 p-8 rounded-8 shadow-md">
  <span class="text-16 font-semibold">Hello World</span>
</div>`;

export default function UtilitiesDemo() {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const UtilityExample = ({ utilityClass, description }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(utilityClass);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="utility-example">
        <div className="utility-example__preview">
          <div className={`utility-example__demo ${utilityClass}`}>
            {utilityClass.includes("text") && <span>Sample Text</span>}
            {utilityClass.includes("bg") && !utilityClass.includes("text") && (
              <span style={{ padding: "8px" }}>Background</span>
            )}
            {utilityClass.includes("border") && (
              <div style={{ padding: "16px", minHeight: "40px" }}>Border</div>
            )}
            {utilityClass.includes("rounded") && (
              <div style={{ padding: "16px", minHeight: "40px" }}>Rounded</div>
            )}
            {utilityClass.includes("shadow") && (
              <div style={{ padding: "16px", minHeight: "40px" }}>Shadow</div>
            )}
            {utilityClass.includes("p-") && !utilityClass.includes("px") && !utilityClass.includes("py") && !utilityClass.includes("pt") && !utilityClass.includes("pr") && !utilityClass.includes("pb") && !utilityClass.includes("pl") && (
              <div style={{ background: "var(--uds-surface-secondary)", borderRadius: "4px" }}>
                Padding
              </div>
            )}
            {(utilityClass.includes("px-") || utilityClass.includes("py-") || utilityClass.includes("pt-") || utilityClass.includes("pr-") || utilityClass.includes("pb-") || utilityClass.includes("pl-")) && (
              <div style={{ background: "var(--uds-surface-secondary)", borderRadius: "4px" }}>
                Padding
              </div>
            )}
            {utilityClass.includes("m-") && !utilityClass.includes("mx") && !utilityClass.includes("my") && !utilityClass.includes("mt") && !utilityClass.includes("mr") && !utilityClass.includes("mb") && !utilityClass.includes("ml") && (
              <div style={{ background: "var(--uds-surface-secondary)", borderRadius: "4px" }}>
                Margin
              </div>
            )}
            {(utilityClass.includes("mx-") || utilityClass.includes("my-") || utilityClass.includes("mt-") || utilityClass.includes("mr-") || utilityClass.includes("mb-") || utilityClass.includes("ml-")) && (
              <div style={{ background: "var(--uds-surface-secondary)", borderRadius: "4px" }}>
                Margin
              </div>
            )}
            {utilityClass.includes("space-") && (
              <div style={{ display: "flex", gap: utilityClass.includes("x") ? "0" : "0", flexDirection: utilityClass.includes("x") ? "row" : "column" }}>
                <div style={{ padding: "8px", background: "var(--uds-surface-secondary)", borderRadius: "4px" }}>1</div>
                <div style={{ padding: "8px", background: "var(--uds-surface-secondary)", borderRadius: "4px" }}>2</div>
                <div style={{ padding: "8px", background: "var(--uds-surface-secondary)", borderRadius: "4px" }}>3</div>
              </div>
            )}
            {utilityClass.includes("flex") && (
              <div style={{ display: "flex", gap: "8px" }}>
                <div style={{ padding: "8px", background: "var(--uds-surface-secondary)" }}>1</div>
                <div style={{ padding: "8px", background: "var(--uds-surface-secondary)" }}>2</div>
                <div style={{ padding: "8px", background: "var(--uds-surface-secondary)" }}>3</div>
              </div>
            )}
            {utilityClass.includes("grid") && (
              <div style={{ display: "grid", gap: "8px", gridTemplateColumns: "repeat(3, 1fr)" }}>
                <div style={{ padding: "8px", background: "var(--uds-surface-secondary)" }}>1</div>
                <div style={{ padding: "8px", background: "var(--uds-surface-secondary)" }}>2</div>
                <div style={{ padding: "8px", background: "var(--uds-surface-secondary)" }}>3</div>
              </div>
            )}
            {!utilityClass.includes("text") &&
              !utilityClass.includes("bg") &&
              !utilityClass.includes("border") &&
              !utilityClass.includes("rounded") &&
              !utilityClass.includes("shadow") &&
              !utilityClass.includes("p-") &&
              !utilityClass.includes("m-") &&
              !utilityClass.includes("flex") &&
              !utilityClass.includes("grid") && (
                <span>Example</span>
              )}
          </div>
        </div>
        <div className="utility-example__info">
          <div className="utility-example__code">
            <code>{utilityClass}</code>
            <button
              className="utility-example__copy"
              onClick={handleCopy}
              aria-label="Copy class name"
            >
              {copied ? "✓ Copied" : "Copy"}
            </button>
          </div>
          <p className="utility-example__description">{description}</p>
        </div>
      </div>
    );
  };

  return (
    <section className="page utilities-demo">
      <header className="page__header">
        <div className="page__header-container">
          <Breadcrumb />
          <div className="page__header-info">
            <div className="page__header-content">
              <h1 className="page__header-title">Utility Classes</h1>
              <p className="page__header-description">
                Tailwind-inspired utility classes using design tokens. These utilities provide
                quick access to common CSS patterns while maintaining consistency with your design
                system. All utilities use design tokens, so they automatically respect theme and
                brand settings.
              </p>
            </div>
            <div className="page__header-metadata">
              <div className="page__metadata-row">
                <p className="page__metadata-label">Author</p>
                <a
                  href="https://chgit.slack.com/team/U06V9C0K06S"
                  className="page__metadata-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @Michael-Stevens
                </a>
              </div>
              <div className="page__metadata-row">
                <p className="page__metadata-label">Last updated</p>
                <p className="page__metadata-value">{formatLastUpdated()}</p>
              </div>
              <div className="page__metadata-row">
                <p className="page__metadata-label">Version</p>
                <Flex direction="row" gap="8" alignItems="center">
                  <p className="page__metadata-value">1.0.0</p>
                  <span className="page__version-badge">BETA</span>
                </Flex>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="page__content">
        <div className="utilities-demo__intro">
          <h2>Getting Started</h2>
          <p>
            Utility classes are included in <code>tokens.css</code> and are available
            throughout your application. Simply add the class names to your HTML elements:
          </p>
          <div className="utilities-demo__code-block-wrapper">
            <CopyButton textToCopy={gettingStartedCode} />
            <pre className="utilities-demo__code-block">
              <code className="language-markup">{gettingStartedCode}</code>
            </pre>
          </div>
        </div>

        <Divider variant="solid" />

        <div className="page__tabs-container">
          <Tabs
            tabs={UTILITY_CATEGORIES.map((cat) => ({
              id: cat.id,
              label: cat.label,
            }))}
            activeTab={activeTab}
            onTabChange={(index, tab) => {
              setActiveTab(index);
            }}
            scrollable={true}
          />
        </div>

        <div className="utilities-demo__content">
          {UTILITY_CATEGORIES.map((category, index) => (
            <div
              key={category.id}
              className={`utilities-demo__category ${
                activeTab === index ? "utilities-demo__category--active" : ""
              }`}
            >
              <h2 className="utilities-demo__category-title">{category.label}</h2>
              <p className="utilities-demo__category-description">
                {category.id === "layout" &&
                  "Display, positioning, overflow, and z-index utilities for layout control."}
                {category.id === "flexbox-grid" &&
                  "Flexbox and grid utilities for creating flexible layouts."}
                {category.id === "spacing" &&
                  "Padding, margin, and space-between utilities using spacing tokens."}
                {category.id === "sizing" &&
                  "Width, height, and aspect ratio utilities using sizing tokens."}
                {category.id === "typography" &&
                  "Font size, weight, line height, and text styling utilities."}
                {category.id === "backgrounds" &&
                  "Background color, gradient, and positioning utilities."}
                {category.id === "borders-effects" &&
                  "Border, radius, shadow, opacity, and blur utilities."}
                {category.id === "transforms-animation" &&
                  "Transform and transition utilities for animations."}
                {category.id === "interactivity" &&
                  "Cursor, pointer events, selection, and accessibility utilities."}
                {category.id === "variants" &&
                  "Hover, focus, active, disabled, and responsive variant utilities."}
              </p>
              <div className="utilities-demo__grid">
                {UTILITY_EXAMPLES[category.id]?.map((example) => (
                  <UtilityExample
                    key={example.class}
                    utilityClass={example.class}
                    description={example.description}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <Divider variant="solid" />

        <div className="utilities-demo__notes">
          <h2>Notes</h2>
          <ul>
            <li>
              All utilities use design tokens (e.g., <code>var(--uds-spacing-8)</code>), so they
              automatically respect your theme and brand settings.
            </li>
            <li>
              Utility classes follow a consistent naming pattern similar to Tailwind CSS for
              familiarity.
            </li>
            <li>
              Variants like <code>hover:</code>, <code>focus:</code>, and <code>dark:</code> can
              be combined with other utilities.
            </li>
            <li>
              For a complete list of available utilities, see{" "}
              <code>src/styles/_utilities.scss</code>.
            </li>
          </ul>
        </div>
      </main>
    </section>
  );
}
