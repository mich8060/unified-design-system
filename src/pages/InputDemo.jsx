import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../ui/Input/Input";
import Field from "../ui/Field/Field";
import Flex from "../ui/Flex/Flex";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Divider from "../ui/Divider/Divider";
import { formatLastUpdated } from "../utils/formatDate";

/**
 * Input Component Demo & Documentation
 *
 * This page demonstrates the Input component and its various configurations.
 *
 * ## Input Component Props:
 *
 * ### Required Props:
 * - `value` (string): The value of the input
 * - `onChange` (function): Callback function when value changes
 *
 * ### Optional Props:
 * - `placeholder` (string): Placeholder text
 * - `type` (string): Input type: 'text', 'email', 'password', etc. (default: 'text')
 * - `size` (string): Size variant: 'compact' or 'default' (default: 'default')
 * - `state` (string): State variant: 'default', 'focused', 'error', or 'disabled'
 * - `disabled` (boolean): Whether the input is disabled (overrides state)
 * - `id` (string): Unique identifier for the input
 * - `className` (string): Additional CSS classes
 *
 * ## Usage Examples:
 *
 * Basic input:
 * ```jsx
 * <Input
 *   value={value}
 *   onChange={(e) => setValue(e.target.value)}
 *   placeholder="Enter text"
 * />
 * ```
 *
 * Input with Field wrapper:
 * ```jsx
 * <Field label="Email">
 *   <Input
 *     type="email"
 *     value={email}
 *     onChange={(e) => setEmail(e.target.value)}
 *     placeholder="Enter your email"
 *   />
 * </Field>
 * ```
 */

export default function InputDemo() {
  const [basicValue, setBasicValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [compactValue, setCompactValue] = useState("");
  const [errorValue, setErrorValue] = useState("");
  const [disabledValue, setDisabledValue] = useState("Disabled value");

  return (
    <section className="page">
      <header className="page__header">
        <div className="page__header-container">
          <Breadcrumb />
          <div className="page__header-info">
            <div className="page__header-content">
              <h1 className="page__header-title">Text Input</h1>
              <p className="page__header-description">
                Single-line text input component for form fields. Supports multiple
          input types (text, email, password), sizes, and states (default,
          focused, error, disabled).
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
              Single-line text input component for form fields. The default size is 'default' and state is 'default'.
            </p>
            <div className="demo-content">
              <Input
                value={basicValue}
                onChange={(e) => setBasicValue(e.target.value)}
                placeholder="Enter text"
              />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Input Types</h2>
            <p className="demo-group__description">
              Input components support various HTML input types including text, email, and password.
            </p>
            <Flex direction="column" gap="16" className="demo-content">
              <Field label="Email">
                <Input
                  type="email"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  placeholder="Enter your email"
                />
              </Field>
              <Field label="Password">
                <Input
                  type="password"
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  placeholder="Enter your password"
                />
              </Field>
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Sizes</h2>
            <p className="demo-group__description">
              Input components are available in two sizes: default and compact.
            </p>
            <Flex direction="column" gap="16" className="demo-content">
              <Field label="Default Size">
                <Input
                  value={basicValue}
                  onChange={(e) => setBasicValue(e.target.value)}
                  placeholder="Default size input"
                  size="default"
                />
              </Field>
              <Field label="Compact Size">
                <Input
                  value={compactValue}
                  onChange={(e) => setCompactValue(e.target.value)}
                  placeholder="Compact size input"
                  size="compact"
                />
              </Field>
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">States</h2>
            <p className="demo-group__description">
              Input components support different visual states: default, focused, error, and disabled.
            </p>
            <Flex direction="column" gap="16" className="demo-content">
              <Field label="Default State">
                <Input
                  value={basicValue}
                  onChange={(e) => setBasicValue(e.target.value)}
                  placeholder="Default state"
                  state="default"
                />
              </Field>
              <Field label="Focused State">
                <Input
                  value={basicValue}
                  onChange={(e) => setBasicValue(e.target.value)}
                  placeholder="Focused state"
                  state="focused"
                />
              </Field>
              <Field label="Error State" helperMessage="This field has an error">
                <Input
                  value={errorValue}
                  onChange={(e) => setErrorValue(e.target.value)}
                  placeholder="Error state"
                  state="error"
                />
              </Field>
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Disabled State</h2>
            <p className="demo-group__description">
              Disabled inputs prevent user interaction and are typically used when the field is not applicable.
            </p>
            <div className="demo-content">
              <Field label="Disabled Input">
                <Input
                  value={disabledValue}
                  onChange={(e) => setDisabledValue(e.target.value)}
                  placeholder="Disabled input"
                  disabled
                />
              </Field>
            </div>
          </div>
        </div>

        <Divider variant="solid" />

        <div className="page__tabs-content-container">
          <div className="demo-group">
            <div className="page__navigation">
              <Link
                to="/tooltip"
                className="page__nav-link page__nav-link--prev"
              >
                <span className="page__nav-label">Previous</span>
                <span className="page__nav-title">Tooltip</span>
              </Link>
              <Link
                to="/key"
                className="page__nav-link page__nav-link--next"
              >
                <span className="page__nav-label">Next</span>
                <span className="page__nav-title">Key</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
