import React, { useState, useCallback } from "react";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import ActionMenu from "../ActionMenu/ActionMenu";
import "./Playground.scss";

// Common icon names for dropdown (subset of most commonly used icons)
const COMMON_ICONS = [
  "Placeholder",
  "ArrowRight",
  "ArrowLeft",
  "ArrowUp",
  "ArrowDown",
  "Check",
  "Close",
  "X",
  "Plus",
  "Minus",
  "Edit",
  "Pencil",
  "Trash",
  "Search",
  "MagnifyingGlass",
  "Settings",
  "Gear",
  "User",
  "Users",
  "Home",
  "House",
  "Star",
  "Heart",
  "Bookmark",
  "Share",
  "Download",
  "Upload",
  "Copy",
  "CopySimple",
  "Code",
  "GearSix",
  "List",
  "SquaresFour",
  "DiamondsFour",
  "CirclesThree",
  "CaretDown",
  "CaretUp",
  "CaretLeft",
  "CaretRight",
  "Info",
  "Warning",
  "CheckCircle",
  "XCircle",
  "Bell",
  "Notification",
  "Mail",
  "Phone",
  "Calendar",
  "Clock",
  "Image",
  "File",
  "Folder",
  "Lock",
  "Unlock",
  "Eye",
  "EyeSlash",
  "Filter",
  "Sort",
  "Grid",
  "Menu",
  "More",
  "DotsThree",
];

/**
 * Playground component for interactive component prop manipulation
 * Matches Figma design with Canvas + Inspector/Code Panel layout
 * @param {React.Component} component - The component to render
 * @param {object} propDefinitions - Object defining props and their controls
 * @param {string} title - Optional title for the playground
 * @param {object} initialProps - Initial prop values
 * @param {function} renderComponent - Optional custom render function
 */
export default function Playground({
  component: Component,
  propDefinitions = {},
  title = "Playground",
  initialProps = {},
  renderComponent,
}) {
  const [viewMode, setViewMode] = useState("inspector"); // 'inspector' or 'code'

  // Initialize state with defaults from propDefinitions
  const getInitialState = () => {
    const state = { ...initialProps };
    Object.keys(propDefinitions).forEach((key) => {
      if (state[key] === undefined) {
        // Check if this is an icon prop
        const isIconProp =
          key.toLowerCase().includes("icon") ||
          propDefinitions[key].type === "icon";
        const propDefault = propDefinitions[key].default;

        if (isIconProp && (propDefault === undefined || propDefault === "")) {
          // For icon props, default to 'Placeholder' if no default or empty string
          state[key] = "Placeholder";
        } else if (propDefault !== undefined) {
          state[key] = propDefault;
        }
      }
    });
    return state;
  };

  const [props, setProps] = useState(getInitialState);

  const updateProp = useCallback((key, value) => {
    setProps((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetProps = useCallback(() => {
    setProps(getInitialState());
  }, []);

  const copyCode = useCallback(() => {
    const componentName = Component?.name || "Component";
    const propsString = Object.entries(props)
      .filter(
        ([_, v]) =>
          v !== undefined && v !== null && v !== "" && v !== "Placeholder",
      )
      .map(([k, v]) => {
        if (typeof v === "string") return `${k}="${v}"`;
        if (typeof v === "boolean") return v ? k : `${k}={false}`;
        return `${k}={${JSON.stringify(v)}}`;
      })
      .join(" ");

    const code = `<${componentName}${propsString ? " " + propsString : ""} />`;
    navigator.clipboard.writeText(code);
  }, [props, Component]);

  const renderControl = (key, definition) => {
    const { type, label, options, min, max, step, placeholder, section } =
      definition;

    // Check if this is an icon prop
    const isIconProp = key.toLowerCase().includes("icon") || type === "icon";

    // For icon props, use Placeholder as default if not set or if default is empty string
    const propDefault = definition.default;
    const defaultValue =
      isIconProp && (propDefault === undefined || propDefault === "")
        ? "Placeholder"
        : (propDefault ?? "");
    const value = props[key] ?? defaultValue;

    // If it's an icon prop and no options provided, use icon options
    const iconOptions =
      isIconProp && !options
        ? COMMON_ICONS.map((icon) => ({ value: icon, label: icon }))
        : options;

    switch (type) {
      case "icon":
      case "select":
        const availableOptions = iconOptions || options || [];
        const selectedOption =
          availableOptions.find((opt) => opt.value === value) ||
          availableOptions[0];
        const selectedLabel = selectedOption
          ? selectedOption.label || selectedOption.value
          : value || "Select...";

        const menuItems = availableOptions.map((opt) => ({
          id: opt.value,
          label: opt.label || opt.value,
          onClick: () => updateProp(key, opt.value),
        }));

        return (
          <div key={key} className="playground__field">
            <div className="playground__field-head">
              <label
                className="playground__field-label"
                htmlFor={`playground-${key}`}
              >
                {label || key}
              </label>
            </div>
            <div className="playground__field-body">
              <ActionMenu
                trigger={
                  <button
                    type="button"
                    className="playground__select-trigger"
                    aria-label={label || key}
                  >
                    <span className="playground__select-value">
                      {selectedLabel}
                    </span>
                    <Icon name="CaretDown" size={16} appearance="regular" />
                  </button>
                }
                items={menuItems}
                placement="bottom-start"
              />
            </div>
          </div>
        );

      case "boolean":
        // Boolean props go in States section
        return (
          <div key={key} className="playground__state-item">
            <label className="playground__state-label">{label || key}</label>
            <input
              type="checkbox"
              className="playground__checkbox"
              checked={value}
              onChange={(e) => updateProp(key, e.target.checked)}
            />
          </div>
        );

      case "number":
        return (
          <div key={key} className="playground__field">
            <div className="playground__field-head">
              <label
                className="playground__field-label"
                htmlFor={`playground-${key}`}
              >
                {label || key}
              </label>
            </div>
            <div className="playground__field-body">
              <input
                id={`playground-${key}`}
                type="number"
                className="playground__input"
                value={value}
                min={min}
                max={max}
                step={step}
                onChange={(e) => updateProp(key, Number(e.target.value))}
              />
            </div>
          </div>
        );

      case "text":
      case "string":
      default:
        // If it's an icon prop but type is string, convert to ActionMenu
        if (isIconProp) {
          const availableOptions = iconOptions || [];
          const selectedOption =
            availableOptions.find((opt) => opt.value === value) ||
            availableOptions[0];
          const selectedLabel = selectedOption
            ? selectedOption.label || selectedOption.value
            : value || "Placeholder";

          const menuItems = availableOptions.map((opt) => ({
            id: opt.value,
            label: opt.label || opt.value,
            onClick: () => updateProp(key, opt.value),
          }));

          return (
            <div key={key} className="playground__field">
              <div className="playground__field-head">
                <label
                  className="playground__field-label"
                  htmlFor={`playground-${key}`}
                >
                  {label || key}
                </label>
              </div>
              <div className="playground__field-body">
                <ActionMenu
                  trigger={
                    <button
                      type="button"
                      className="playground__select-trigger"
                      aria-label={label || key}
                    >
                      <span className="playground__select-value">
                        {selectedLabel}
                      </span>
                      <Icon name="CaretDown" size={16} appearance="regular" />
                    </button>
                  }
                  items={menuItems}
                  placement="bottom-start"
                />
              </div>
            </div>
          );
        }

        return (
          <div key={key} className="playground__field">
            <div className="playground__field-head">
              <label
                className="playground__field-label"
                htmlFor={`playground-${key}`}
              >
                {label || key}
              </label>
            </div>
            <div className="playground__field-body">
              <input
                id={`playground-${key}`}
                type="text"
                className="playground__input"
                value={value}
                placeholder={placeholder}
                onChange={(e) => updateProp(key, e.target.value)}
              />
            </div>
          </div>
        );
    }
  };

  // Separate props into properties and states
  const properties = Object.entries(propDefinitions).filter(
    ([_, def]) => def.type !== "boolean",
  );
  const states = Object.entries(propDefinitions).filter(
    ([_, def]) => def.type === "boolean",
  );

  // Generate code string with syntax highlighting
  const componentName = Component?.name || "Component";
  const propsString = Object.entries(props)
    .filter(
      ([_, v]) =>
        v !== undefined && v !== null && v !== "" && v !== "Placeholder",
    )
    .map(([k, v]) => {
      if (typeof v === "string") return `      ${k}="${v}"`;
      if (typeof v === "boolean")
        return v ? `      ${k}` : `      ${k}={false}`;
      return `      ${k}={${JSON.stringify(v)}}`;
    })
    .join("\n");

  const codeString = `import { ${componentName} } from '@/components/${componentName}';

export function Example() {
  return (
    <${componentName}${propsString ? "\n" + propsString + "\n    " : " "}/>  );
}`;

  // Simple syntax highlighting function
  const highlightCode = (code) => {
    let highlighted = code;
    // Highlight keywords
    highlighted = highlighted.replace(
      /\b(import|export|function|return|from)\b/g,
      '<span style="color: #c085fd;">$1</span>',
    );
    // Highlight strings (handle escaped quotes)
    highlighted = highlighted.replace(
      /(['"])((?:\\.|(?!\1)[^\\])*?)\1/g,
      '<span style="color: #4ade80;">$1$2$1</span>',
    );
    // Highlight JSX tags
    highlighted = highlighted.replace(
      /&lt;(\/?)([A-Z][a-zA-Z0-9]*)/g,
      '<span style="color: #f87070;">&lt;$1$2</span>',
    );
    // Highlight component names (capitalized words)
    highlighted = highlighted.replace(
      /\b([A-Z][a-zA-Z0-9]*)\b(?=\s*[={])/g,
      '<span style="color: #61a5fa;">$1</span>',
    );
    // Highlight attributes
    highlighted = highlighted.replace(
      /(\w+)=/g,
      '<span style="color: #ca8a04;">$1</span>=',
    );
    return highlighted;
  };

  return (
    <div className="playground">
      <div className="playground__container">
        {/* Canvas */}
        <div className="playground__canvas">
          <div className="playground__canvas-content">
            {renderComponent ? (
              renderComponent(props)
            ) : (
              <Component {...props} />
            )}
          </div>
          {/* Floating Action Bar */}
          <div className="playground__actions">
            <Button
              appearance={viewMode === "code" ? "primary" : "text"}
              layout="icon-only"
              size="small"
              icon="Code"
              aria-label="Show code"
              onClick={() => setViewMode("code")}
            />
            <div className="playground__actions-divider" />
            <Button
              appearance={viewMode === "inspector" ? "primary" : "text"}
              layout="icon-only"
              size="small"
              icon="GearSix"
              aria-label="Show inspector"
              onClick={() => setViewMode("inspector")}
            />
          </div>
        </div>

        {/* Inspector/Code Panel */}
        <div className="playground__panel">
          {viewMode === "inspector" ? (
            <>
              {/* Inspector Header */}
              <div className="playground__panel-header">
                <div className="playground__panel-header-content">
                  <div className="playground__panel-title-row">
                    <Icon name="GearSix" size={16} appearance="bold" />
                    <h3 className="playground__panel-title">Inspector</h3>
                  </div>
                  <p className="playground__panel-subtitle">
                    Customize component properties
                  </p>
                </div>
              </div>

              {/* Inspector Content */}
              <div className="playground__panel-content">
                {/* Properties Section */}
                {properties.length > 0 && (
                  <div className="playground__section">
                    <div className="playground__section-title">
                      <Icon name="SquaresFour" size={16} appearance="bold" />
                      <span>Properties</span>
                    </div>
                    <div className="playground__section-content">
                      {properties.map(([key, definition]) =>
                        renderControl(key, definition),
                      )}
                    </div>
                  </div>
                )}

                {/* States Section */}
                {states.length > 0 && (
                  <div className="playground__section">
                    <div className="playground__section-title">
                      <Icon name="SquaresFour" size={16} appearance="bold" />
                      <span>States</span>
                    </div>
                    <div className="playground__section-content">
                      <div className="playground__states-list">
                        {states.map(([key, definition]) =>
                          renderControl(key, definition),
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Code Header */}
              <div className="playground__panel-header">
                <div className="playground__panel-header-content">
                  <div className="playground__panel-title-row">
                    <h3 className="playground__panel-title">Component Code</h3>
                  </div>
                  <p className="playground__panel-subtitle">
                    Copy and paste into your project
                  </p>
                </div>
                <Button
                  appearance="outline"
                  layout="icon-left"
                  size="small"
                  icon="CopySimple"
                  label="Copy"
                  onClick={copyCode}
                />
              </div>

              {/* Code Content */}
              <div className="playground__code-container">
                <div className="playground__code-block">
                  <pre className="playground__code-pre">
                    <code
                      className="playground__code"
                      dangerouslySetInnerHTML={{
                        __html: highlightCode(codeString),
                      }}
                    />
                  </pre>
                </div>
              </div>

              {/* Pro Tips */}
              <div className="playground__pro-tips">
                <p className="playground__pro-tips-title">Pro Tips:</p>
                <ul className="playground__pro-tips-list">
                  <li>Customize props in the inspector to update the code</li>
                  <li>All components are fully typed with TypeScript</li>
                  <li>Use Cmd/Ctrl + K to toggle the panel</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
