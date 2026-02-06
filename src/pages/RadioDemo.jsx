import React, { useState } from "react";
import Radio from "../ui/Radio/Radio";
import Flex from "../ui/Flex/Flex";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Divider from "../ui/Divider/Divider";
import { Link } from "react-router-dom";
import { formatLastUpdated } from "../utils/formatDate";

/**
 * Radio Component Demo & Documentation
 *
 * This page demonstrates the Radio component and its various configurations.
 *
 * ## Radio Component Props:
 *
 * ### Required Props:
 * - `name` (string): Name attribute for grouping radio buttons (required for proper functionality)
 *
 * ### Optional Props:
 * - `checked` (boolean): Whether the radio button is checked
 *   - Default: false
 *
 * - `onChange` (function): Callback function when radio button state changes
 *   - Receives the event object as an argument
 *
 * - `value` (string): Value of the radio button
 *
 * - `id` (string): Unique identifier for the radio input
 *   - Auto-generated if not provided
 *
 * - `label` (string): Label text for the radio button
 *
 * - `disabled` (boolean): Whether the radio button is disabled
 *   - Default: false
 *
 * ## Usage Examples:
 *
 * Basic radio button:
 * ```jsx
 * <Radio name="option" label="Option 1" />
 * ```
 *
 * Radio button group:
 * ```jsx
 * const [selected, setSelected] = useState('option1');
 * <Radio name="group" value="option1" checked={selected === 'option1'} onChange={(e) => setSelected(e.target.value)} label="Option 1" />
 * <Radio name="group" value="option2" checked={selected === 'option2'} onChange={(e) => setSelected(e.target.value)} label="Option 2" />
 * ```
 *
 * Disabled radio button:
 * ```jsx
 * <Radio name="option" label="Disabled Option" disabled />
 * ```
 */

export default function RadioDemo() {
  const [selectedOption, setSelectedOption] = useState("option1");
  const [selectedSize, setSelectedSize] = useState("small");
  const [selectedColor, setSelectedColor] = useState("red");
  const [selectedPlan, setSelectedPlan] = useState("basic");
  
  return (
    <section className="page">
      <header className="page__header">
        <div className="page__header-container">
          <Breadcrumb />
          <div className="page__header-info">
            <div className="page__header-content">
              <h1 className="page__header-title">Radio</h1>
              <p className="page__header-description">
                The Radio component allows users to select a single option from a
          group of options. Radio buttons are typically used in groups where
          only one option can be selected at a time. All radio buttons in a
          group must share the same `name` attribute.
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
              Radio buttons allow users to select a single option from a group. All radio buttons in a group must share the same `name` attribute.
            </p>
            <Flex direction="column" gap="16" className="demo-content">
              <Radio
                name="basic"
                value="option1"
                label="Option 1"
                checked={selectedOption === "option1"}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              <Radio
                name="basic"
                value="option2"
                label="Option 2"
                checked={selectedOption === "option2"}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              <Radio
                name="basic"
                value="option3"
                label="Option 3"
                checked={selectedOption === "option3"}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Size Selection</h2>
            <p className="demo-group__description">
              Radio buttons are commonly used for size or option selection where only one choice is allowed.
            </p>
            <Flex direction="row" gap="16" wrap={true} className="demo-content">
              <Radio
                name="size"
                value="small"
                label="Small"
                checked={selectedSize === "small"}
                onChange={(e) => setSelectedSize(e.target.value)}
              />
              <Radio
                name="size"
                value="medium"
                label="Medium"
                checked={selectedSize === "medium"}
                onChange={(e) => setSelectedSize(e.target.value)}
              />
              <Radio
                name="size"
                value="large"
                label="Large"
                checked={selectedSize === "large"}
                onChange={(e) => setSelectedSize(e.target.value)}
              />
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Color Selection</h2>
            <p className="demo-group__description">
              Radio buttons work well for color or style selection where users need to choose one option.
            </p>
            <Flex direction="row" gap="16" wrap={true} className="demo-content">
              <Radio
                name="color"
                value="red"
                label="Red"
                checked={selectedColor === "red"}
                onChange={(e) => setSelectedColor(e.target.value)}
              />
              <Radio
                name="color"
                value="blue"
                label="Blue"
                checked={selectedColor === "blue"}
                onChange={(e) => setSelectedColor(e.target.value)}
              />
              <Radio
                name="color"
                value="green"
                label="Green"
                checked={selectedColor === "green"}
                onChange={(e) => setSelectedColor(e.target.value)}
              />
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Plan Selection</h2>
            <p className="demo-group__description">
              Radio buttons are ideal for subscription or plan selection where users must choose one option.
            </p>
            <Flex direction="column" gap="16" className="demo-content">
              <Radio
                name="plan"
                value="basic"
                label="Basic Plan - $9/month"
                checked={selectedPlan === "basic"}
                onChange={(e) => setSelectedPlan(e.target.value)}
              />
              <Radio
                name="plan"
                value="pro"
                label="Pro Plan - $29/month"
                checked={selectedPlan === "pro"}
                onChange={(e) => setSelectedPlan(e.target.value)}
              />
              <Radio
                name="plan"
                value="enterprise"
                label="Enterprise Plan - $99/month"
                checked={selectedPlan === "enterprise"}
                onChange={(e) => setSelectedPlan(e.target.value)}
              />
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Disabled State</h2>
            <p className="demo-group__description">
              Disabled radio buttons prevent user interaction and are typically used when an option is not available.
            </p>
            <Flex direction="column" gap="16" className="demo-content">
              <Radio
                name="disabled"
                value="option1"
                label="Enabled Option"
                checked={true}
                onChange={() => {}}
              />
              <Radio
                name="disabled"
                value="option2"
                label="Disabled Option"
                checked={false}
                disabled
              />
              <Radio
                name="disabled"
                value="option3"
                label="Disabled Selected"
                checked={true}
                disabled
              />
            </Flex>
          </div>
        </div>

        <Divider variant="solid" />

        <div className="page__tabs-content-container">
          <div className="demo-group">
            <div className="page__navigation">
              <Link
                to="/progress-circle"
                className="page__nav-link page__nav-link--prev"
              >
                <span className="page__nav-label">Previous</span>
                <span className="page__nav-title">Progress Circle</span>
              </Link>
              <Link
                to="/slider"
                className="page__nav-link page__nav-link--next"
              >
                <span className="page__nav-label">Next</span>
                <span className="page__nav-title">Slider</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
