import React, { useState } from "react";
import { Link } from "react-router-dom";
import Field from "../ui/Field/Field";
import Flex from "../ui/Flex/Flex";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Divider from "../ui/Divider/Divider";
import { formatLastUpdated } from "../utils/formatDate";

/**
 * Field Component Demo & Documentation
 *
 * This page demonstrates the Field component and its various configurations.
 *
 * ## Field Component Props:
 *
 * ### Optional Props:
 * - `label` (string): Label text for the field
 * - `required` (boolean): Whether the field is required (adds asterisk to label)
 * - `helperMessage` (string): Helper text displayed below the input
 * - `infoIcon` (string): Icon name for info icon (e.g., "Info")
 * - `onInfoClick` (function): Callback when info icon is clicked
 * - `maxLength` (number): Maximum character length (enables character count)
 * - `value` (number|string): Current value (for character count calculation)
 * - `id` (string): Unique identifier for the field
 * - `children` (React.ReactNode): The input element to wrap
 *
 * ## Usage Examples:
 *
 * Basic field:
 * ```jsx
 * <Field label="Name">
 *   <input type="text" />
 * </Field>
 * ```
 *
 * Field with helper message:
 * ```jsx
 * <Field label="Email" helperMessage="We'll never share your email">
 *   <input type="email" />
 * </Field>
 * ```
 *
 * Field with character count:
 * ```jsx
 * <Field label="Description" maxLength={100} value={description}>
 *   <textarea />
 * </Field>
 * ```
 */

export default function FieldDemo() {
  const [basicValue, setBasicValue] = useState("");
  const [requiredValue, setRequiredValue] = useState("");
  const [helperValue, setHelperValue] = useState("");
  const [countValue, setCountValue] = useState("");
  const [allFeaturesValue, setAllFeaturesValue] = useState("");
  const [requiredAllValue, setRequiredAllValue] = useState("");
  
  return (
    <section className="page">
      <header className="page__header">
        <div className="page__header-container">
          <Breadcrumb />
          <div className="page__header-info">
            <div className="page__header-content">
              <h1 className="page__header-title">Field</h1>
              <p className="page__header-description">
                The Field component provides a consistent wrapper for form inputs with
          labels, helper messages, character counts, and optional info icons. It
          can wrap any input type (text, email, textarea, etc.) and provides a
          unified styling and behavior pattern.
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
              A simple field wrapper with a label. The Field component wraps any input element and provides consistent styling and structure.
            </p>
            <div className="demo-content">
              <Field label="Name">
                <input
                  type="text"
                  value={basicValue}
                  onChange={(e) => setBasicValue(e.target.value)}
                  placeholder="Enter your name"
                />
              </Field>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Required Field</h2>
            <p className="demo-group__description">
              Required fields display an asterisk (*) next to the label to indicate that the field must be filled out.
            </p>
            <div className="demo-content">
              <Field label="Email" required>
                <input
                  type="email"
                  value={requiredValue}
                  onChange={(e) => setRequiredValue(e.target.value)}
                  placeholder="Enter your email"
                />
              </Field>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">With Helper Message</h2>
            <p className="demo-group__description">
              Helper messages provide additional context or instructions to help users understand what to enter in the field.
            </p>
            <div className="demo-content">
              <Field
                label="Password"
                helperMessage="Must be at least 8 characters long"
                required
              >
                <input
                  type="password"
                  value={helperValue}
                  onChange={(e) => setHelperValue(e.target.value)}
                  placeholder="Enter your password"
                />
              </Field>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">With Character Count</h2>
            <p className="demo-group__description">
              Fields can display a character count when a maxLength is specified. This is useful for textareas or inputs with character limits.
            </p>
            <div className="demo-content">
              <Field
                label="Description"
                maxLength={100}
                value={countValue}
                helperMessage="Brief description of your item"
              >
                <textarea
                  value={countValue}
                  onChange={(e) => setCountValue(e.target.value)}
                  placeholder="Enter a description"
                  rows={4}
                />
              </Field>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">With Info Icon</h2>
            <p className="demo-group__description">
              Fields can include an info icon that can trigger additional information or tooltips when clicked.
            </p>
            <div className="demo-content">
              <Field
                label="Account Number"
                infoIcon="Info"
                onInfoClick={() => alert("Account numbers are 8-12 digits long")}
                helperMessage="Your unique account identifier"
              >
                <input
                  type="text"
                  value={allFeaturesValue}
                  onChange={(e) => setAllFeaturesValue(e.target.value)}
                  placeholder="Enter account number"
                />
              </Field>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">All Features Combined</h2>
            <p className="demo-group__description">
              A field with all available features: label, required indicator, helper message, info icon, and character count.
            </p>
            <div className="demo-content">
              <Field
                label="Product Description"
                required
                helperMessage="Provide a detailed description of your product"
                infoIcon="Info"
                onInfoClick={() => alert("Include key features and benefits")}
                maxLength={200}
                value={requiredAllValue}
              >
                <textarea
                  value={requiredAllValue}
                  onChange={(e) => setRequiredAllValue(e.target.value)}
                  placeholder="Enter product description"
                  rows={5}
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
                to="/dropdown"
                className="page__nav-link page__nav-link--prev"
              >
                <span className="page__nav-label">Previous</span>
                <span className="page__nav-title">Dropdown</span>
              </Link>
              <Link
                to="/file-upload"
                className="page__nav-link page__nav-link--next"
              >
                <span className="page__nav-label">Next</span>
                <span className="page__nav-title">File Upload</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
