import React, { useState } from "react";
import { Link } from "react-router-dom";
import Status from "../ui/Status/Status";
import Flex from "../ui/Flex/Flex";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Divider from "../ui/Divider/Divider";
import { formatLastUpdated } from "../utils/formatDate";

/**
 * Status Component Demo & Documentation
 *
 * This page demonstrates the Status component and its various configurations.
 *
 * ## Status Component Props:
 *
 * ### Required Props:
 * - `label` (string): The text content of the status
 *
 * ### Optional Props:
 * - `variant` (string): Color variant for the status dot
 *   - Options: 'light-gray', 'red', 'orange', 'yellow', 'light-green', 'green', 'blue', 'dark-blue', 'teal', 'purple', 'pink', 'magenta', 'dark-red', 'dark-gray'
 *   - Default: 'blue'
 *
 * - `appearance` (string): Background appearance variant
 *   - Options: 'light-gray', 'white'
 *   - Default: 'light-gray'
 *
 * - `shape` (string): Shape variant
 *   - Options: 'pill' (fully rounded) or 'rounded' (slightly rounded)
 *   - Default: 'pill'
 *
 * - `onClick` (function): Click handler function
 *
 * - `disabled` (boolean): Whether the status is disabled
 *   - Default: false
 *
 * ## Usage Examples:
 *
 * Basic status:
 * ```jsx
 * <Status label="Active" />
 * ```
 *
 * With different variants:
 * ```jsx
 * <Status label="Success" variant="green" />
 * <Status label="Warning" variant="orange" />
 * <Status label="Error" variant="red" />
 * ```
 *
 * Different shapes and appearances:
 * ```jsx
 * <Status label="Status" shape="pill" appearance="light-gray" />
 * <Status label="Status" shape="rounded" appearance="white" />
 * ```
 */

export default function StatusDemo() {
  
  return (
    <section className="page">
      <header className="page__header">
        <div className="page__header-container">
          <Breadcrumb />
          <div className="page__header-info">
            <div className="page__header-content">
              <h1 className="page__header-title">Status</h1>
              <p className="page__header-description">
                The Status component displays status indicators with labels, perfect
          for showing system status, task states, or categorical information.
          Features a colored dot indicator and supports multiple color variants,
          shapes, and background appearances.
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
            <h2 className="demo-group__heading">Color Variants</h2>
            <p className="demo-group__description">
              Status components support multiple color variants to indicate different states or categories.
            </p>
            <Flex direction="row" gap="16" wrap={true} className="demo-content">
              <Status label="Active" variant="green" />
              <Status label="Pending" variant="yellow" />
              <Status label="Error" variant="red" />
              <Status label="Info" variant="blue" />
              <Status label="Warning" variant="orange" />
              <Status label="Inactive" variant="light-gray" />
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Appearances</h2>
            <p className="demo-group__description">
              Status components can have different background appearances: light-gray (default) or white.
            </p>
            <Flex direction="row" gap="16" wrap={true} className="demo-content">
              <Status label="Light Gray" variant="blue" appearance="light-gray" />
              <Status label="White" variant="blue" appearance="white" />
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Shapes</h2>
            <p className="demo-group__description">
              Status components support two shape variants: pill (fully rounded, default) or rounded (slightly rounded).
            </p>
            <Flex direction="row" gap="16" wrap={true} className="demo-content">
              <Status label="Pill Shape" variant="green" shape="pill" />
              <Status label="Rounded Shape" variant="green" shape="rounded" />
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Usage Examples</h2>
            <p className="demo-group__description">
              Common applications for the Status component in real-world scenarios.
            </p>
            <Flex direction="column" gap="16" className="demo-content">
              <Flex direction="row" gap="8" alignItems="center">
                <Status label="Online" variant="green" />
                <Status label="Offline" variant="red" />
                <Status label="Away" variant="yellow" />
              </Flex>
              <Flex direction="row" gap="8" alignItems="center">
                <Status label="Published" variant="green" />
                <Status label="Draft" variant="orange" />
                <Status label="Archived" variant="light-gray" />
              </Flex>
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Disabled State</h2>
            <p className="demo-group__description">
              Disabled status components are non-interactive and visually indicate they cannot be used.
            </p>
            <Flex direction="row" gap="16" wrap={true} className="demo-content">
              <Status label="Disabled" variant="blue" disabled />
            </Flex>
          </div>
        </div>

        <Divider variant="solid" />

        <div className="page__tabs-content-container">
          <div className="demo-group">
            <div className="page__navigation">
              <Link
                to="/slider"
                className="page__nav-link page__nav-link--prev"
              >
                <span className="page__nav-label">Previous</span>
                <span className="page__nav-title">Slider</span>
              </Link>
              <Link
                to="/steps"
                className="page__nav-link page__nav-link--next"
              >
                <span className="page__nav-label">Next</span>
                <span className="page__nav-title">Steps</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
