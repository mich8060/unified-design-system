import React, { useState } from "react";
import PillToggle from "../ui/PillToggle/PillToggle";
import Flex from "../ui/Flex/Flex";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Divider from "../ui/Divider/Divider";
import { Link } from "react-router-dom";
import { formatLastUpdated } from "../utils/formatDate";

/**
 * PillToggle Component Demo & Documentation
 *
 * This page demonstrates the PillToggle component and its various configurations.
 *
 * ## PillToggle Component Props:
 *
 * ### Required Props:
 * - None
 *
 * ### Optional Props:
 * - `label` (string): The text content of the toggle
 *   - Default: 'Label States'
 *
 * - `selected` (boolean): Whether the toggle is selected
 *   - Default: false
 *
 * - `onChange` (function): Callback function when toggle state changes
 *   - Receives the new checked state as a boolean argument
 *
 * - `id` (string): Unique identifier for the toggle input
 *   - Auto-generated if not provided
 *
 * - `disabled` (boolean): Whether the toggle is disabled
 *   - Default: false
 *
 * ## Usage Examples:
 *
 * Basic toggle:
 * ```jsx
 * <PillToggle label="Option 1" />
 * ```
 *
 * Controlled toggle:
 * ```jsx
 * const [selected, setSelected] = useState(false);
 * <PillToggle label="Option 1" selected={selected} onChange={setSelected} />
 * ```
 *
 * Disabled toggle:
 * ```jsx
 * <PillToggle label="Option 1" disabled />
 * ```
 */

export default function PillToggleDemo() {
  const [selected1, setSelected1] = useState(false);
  const [selected2, setSelected2] = useState(false);
  const [selected3, setSelected3] = useState(false);
  const [selected4, setSelected4] = useState(false);
  const [selected5, setSelected5] = useState(false);
  const [selected6, setSelected6] = useState(false);
  const [selected7, setSelected7] = useState(false);
  const [selected8, setSelected8] = useState(false);
  
  return (
    <section className="page">
      <header className="page__header">
        <div className="page__header-container">
          <Breadcrumb />
          <div className="page__header-info">
            <div className="page__header-content">
              <h1 className="page__header-title">Pill Toggle</h1>
              <p className="page__header-description">
                The PillToggle component is a pill-shaped button that toggles between
          selected and unselected states. Perfect for filters, tabs, or any
          binary selection interface. When selected, it displays with a
          brand-colored background and white text.
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
              Pill toggles switch between selected and unselected states. When selected, they display with a brand-colored background and white text.
            </p>
            <Flex direction="row" gap="16" wrap={true} className="demo-content">
              <PillToggle
                label="Option 1"
                selected={selected1}
                onChange={setSelected1}
              />
              <PillToggle
                label="Option 2"
                selected={selected2}
                onChange={setSelected2}
              />
              <PillToggle
                label="Option 3"
                selected={selected3}
                onChange={setSelected3}
              />
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Selected States</h2>
            <p className="demo-group__description">
              Toggle states can be controlled programmatically. Selected toggles are highlighted with the brand color.
            </p>
            <Flex direction="row" gap="16" wrap={true} className="demo-content">
              <PillToggle
                label="Unselected"
                selected={selected4}
                onChange={setSelected4}
              />
              <PillToggle
                label="Selected"
                selected={selected5}
                onChange={setSelected5}
              />
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Filter Group</h2>
            <p className="demo-group__description">
              Pill toggles are commonly used in filter groups where multiple options can be selected simultaneously.
            </p>
            <Flex direction="row" gap="16" wrap={true} className="demo-content">
              <PillToggle
                label="All"
                selected={selected6}
                onChange={setSelected6}
              />
              <PillToggle
                label="Active"
                selected={selected7}
                onChange={setSelected7}
              />
              <PillToggle
                label="Pending"
                selected={selected8}
                onChange={setSelected8}
              />
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Disabled State</h2>
            <p className="demo-group__description">
              Disabled pill toggles are non-interactive and visually indicate they cannot be used.
            </p>
            <Flex direction="row" gap="16" wrap={true} className="demo-content">
              <PillToggle label="Disabled Unselected" disabled />
              <PillToggle label="Disabled Selected" selected disabled />
            </Flex>
          </div>
        </div>

        <Divider variant="solid" />

        <div className="page__tabs-content-container">
          <div className="demo-group">
            <div className="page__navigation">
              <Link
                to="/pagination"
                className="page__nav-link page__nav-link--prev"
              >
                <span className="page__nav-label">Previous</span>
                <span className="page__nav-title">Pagination</span>
              </Link>
              <Link
                to="/progress-indicator"
                className="page__nav-link page__nav-link--next"
              >
                <span className="page__nav-label">Next</span>
                <span className="page__nav-title">Progress Indicator</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
