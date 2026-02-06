import React from "react";
import { Link } from "react-router-dom";
import Key from "../ui/Key/Key";
import Flex from "../ui/Flex/Flex";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Divider from "../ui/Divider/Divider";
import { formatLastUpdated } from "../utils/formatDate";

/**
 * Key Component Demo & Documentation
 *
 * This page demonstrates the Key component and its various configurations.
 *
 * ## Key Component Props:
 *
 * ### Required Props:
 * - `label` (string): The text or symbol to display on the key (e.g., "Esc", "⌘", "Ctrl")
 *
 * ### Optional Props:
 * - `appearance` (string): Visual style variant
 *   - Options: 'light', 'dark'
 *   - Default: 'light'
 *
 * ## Usage Examples:
 *
 * Basic key:
 * ```jsx
 * <Key label="Esc" />
 * ```
 *
 * Dark key:
 * ```jsx
 * <Key label="⌘" appearance="dark" />
 * ```
 *
 * Keyboard shortcut display:
 * ```jsx
 * <div>
 *   <Key label="Ctrl" /> + <Key label="K" />
 * </div>
 * ```
 */

// Common keyboard keys and symbols
const commonKeys = [
  "Esc",
  "⌘",
  "Ctrl",
  "Alt",
  "Shift",
  "Enter",
  "Tab",
  "Space",
  "Delete",
  "Backspace",
  "↑",
  "↓",
  "←",
  "→",
];

export default function KeyDemo() {

  return (
    <section className="page">
      <header className="page__header">
        <div className="page__header-container">
          <Breadcrumb />
          <div className="page__header-info">
            <div className="page__header-content">
              <h1 className="page__header-title">Key</h1>
              <p className="page__header-description">
                The Key component displays keyboard key representations, perfect for
          showing keyboard shortcuts, hotkeys, or keyboard instructions.
          Supports both light and dark appearance styles to match your design
          theme.
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
            <h2 className="demo-group__heading">Common Keys</h2>
            <p className="demo-group__description">
              Display keyboard key representations for shortcuts, hotkeys, or keyboard instructions. The default appearance is light.
            </p>
            <Flex direction="row" gap="8" wrap={true} alignItems="center" className="demo-content">
              {commonKeys.map((key) => (
                <Key key={key} label={key} />
              ))}
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Appearances</h2>
            <p className="demo-group__description">
              Keys support both light and dark appearance styles to match your design theme.
            </p>
            <Flex direction="row" gap="16" wrap={true} alignItems="center" className="demo-content">
              <Flex direction="column" gap="8" alignItems="center">
                <Key label="Esc" appearance="light" />
                <span style={{ fontSize: '12px', color: 'var(--uds-text-secondary)' }}>Light</span>
              </Flex>
              <Flex direction="column" gap="8" alignItems="center">
                <Key label="Esc" appearance="dark" />
                <span style={{ fontSize: '12px', color: 'var(--uds-text-secondary)' }}>Dark</span>
              </Flex>
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Keyboard Shortcuts</h2>
            <p className="demo-group__description">
              Combine multiple keys to display keyboard shortcuts. This is useful for showing command combinations.
            </p>
            <Flex direction="column" gap="16" className="demo-content">
              <Flex direction="row" gap="8" alignItems="center">
                <Key label="Ctrl" /> + <Key label="K" />
              </Flex>
              <Flex direction="row" gap="8" alignItems="center">
                <Key label="⌘" /> + <Key label="C" />
              </Flex>
              <Flex direction="row" gap="8" alignItems="center">
                <Key label="Alt" /> + <Key label="Tab" />
              </Flex>
              <Flex direction="row" gap="8" alignItems="center">
                <Key label="Shift" /> + <Key label="Enter" />
              </Flex>
            </Flex>
          </div>
        </div>

        <Divider variant="solid" />

        <div className="page__tabs-content-container">
          <div className="demo-group">
            <div className="page__navigation">
              <Link
                to="/input"
                className="page__nav-link page__nav-link--prev"
              >
                <span className="page__nav-label">Previous</span>
                <span className="page__nav-title">Text Input</span>
              </Link>
              <Link
                to="/micro-calendar"
                className="page__nav-link page__nav-link--next"
              >
                <span className="page__nav-label">Next</span>
                <span className="page__nav-title">Micro Calendar</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
