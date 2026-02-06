import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../ui/Dropdown/Dropdown";
import Flex from "../ui/Flex/Flex";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Divider from "../ui/Divider/Divider";
import { formatLastUpdated } from "../utils/formatDate";

/**
 * Dropdown Component Demo & Documentation
 *
 * This page demonstrates the Dropdown component and its various configurations.
 *
 * ## Dropdown Component Props:
 *
 * ### Required Props:
 * - `options` (array): Array of option objects with { value, label } or array of strings
 *
 * ### Optional Props:
 * - `value` (string|number): Currently selected value
 * - `onChange` (function): Callback when selection changes (receives new value)
 * - `placeholder` (string): Placeholder text when no option is selected (default: 'Select an option')
 * - `state` (string): Visual state: 'default', 'focused', 'error', 'disabled'
 * - `label` (string): Label text for the dropdown
 * - `disabled` (boolean): Whether the dropdown is disabled
 *
 * ## Usage Examples:
 *
 * Basic dropdown:
 * ```jsx
 * <Dropdown
 *   options={['Option 1', 'Option 2', 'Option 3']}
 *   value={selectedValue}
 *   onChange={setSelectedValue}
 * />
 * ```
 *
 * Dropdown with custom options:
 * ```jsx
 * <Dropdown
 *   options={[
 *     { value: '1', label: 'First Option' },
 *     { value: '2', label: 'Second Option' }
 *   ]}
 *   value={selectedValue}
 *   onChange={setSelectedValue}
 * />
 * ```
 */

const simpleOptions = [
  "Option 1",
  "Option 2",
  "Option 3",
  "Option 4",
  "Option 5",
];

const customOptions = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "date", label: "Date" },
  { value: "elderberry", label: "Elderberry" },
];

export default function DropdownDemo() {
  const [defaultValue, setDefaultValue] = useState("");
  const [focusedValue, setFocusedValue] = useState("");
  const [errorValue, setErrorValue] = useState("");
  const [customValue, setCustomValue] = useState("");
  const [labeledValue, setLabeledValue] = useState("");

  return (
    <section className="page">
      <header className="page__header">
        <div className="page__header-container">
          <Breadcrumb />
          <div className="page__header-info">
            <div className="page__header-content">
              <h1 className="page__header-title">Dropdown</h1>
              <p className="page__header-description">
                The Dropdown component provides a custom select input with support for
          different states, keyboard navigation, and accessibility features. It
          can be used as a replacement for native select elements with enhanced
          styling and functionality.
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
        <div className="page__examples-section">
          <div className="demo-group">
            <h2 className="demo-group__heading">Basic Usage</h2>
            <p className="demo-group__description">
              A simple dropdown with string options. Click to open and select an option from the list.
            </p>
            <div className="demo-content">
              <Dropdown
                options={simpleOptions}
                value={defaultValue}
                onChange={setDefaultValue}
                placeholder="Select an option"
              />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">With Custom Options</h2>
            <p className="demo-group__description">
              Dropdowns can use custom option objects with separate value and label properties. This is useful when the display text differs from the underlying value.
            </p>
            <div className="demo-content">
              <Dropdown
                options={customOptions}
                value={customValue}
                onChange={setCustomValue}
                placeholder="Choose a fruit"
              />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">With Label</h2>
            <p className="demo-group__description">
              Dropdowns can include a label above the control to provide context and improve accessibility.
            </p>
            <div className="demo-content">
              <Dropdown
                options={simpleOptions}
                value={labeledValue}
                onChange={setLabeledValue}
                label="Select an option"
                placeholder="Choose..."
              />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">States</h2>
            <p className="demo-group__description">
              Dropdowns support different visual states including default, focused, error, and disabled. The focused state is automatically applied when the dropdown is active.
            </p>
            <Flex direction="column" gap="16" className="demo-content">
              <Dropdown
                options={simpleOptions}
                value={focusedValue}
                onChange={setFocusedValue}
                state="focused"
                placeholder="Focused state"
              />
              <Dropdown
                options={simpleOptions}
                value={errorValue}
                onChange={setErrorValue}
                state="error"
                placeholder="Error state"
              />
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Disabled State</h2>
            <p className="demo-group__description">
              Disabled dropdowns prevent user interaction and are typically used when the selection is not applicable in the current context.
            </p>
            <div className="demo-content">
              <Dropdown
                options={simpleOptions}
                value="Option 1"
                onChange={() => {}}
                disabled
                placeholder="Disabled dropdown"
              />
            </div>
          </div>
        </div>

        <Divider variant="solid" />

        <div className="page__tabs-content-container">
          <div className="demo-group">
            <div className="page__navigation">
              <Link
                to="/dot-status"
                className="page__nav-link page__nav-link--prev"
              >
                <span className="page__nav-label">Previous</span>
                <span className="page__nav-title">Dot Status</span>
              </Link>
              <Link
                to="/field"
                className="page__nav-link page__nav-link--next"
              >
                <span className="page__nav-label">Next</span>
                <span className="page__nav-title">Field</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
