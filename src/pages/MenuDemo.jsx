import React, { useState } from "react";
import { Link } from "react-router-dom";
import Menu from "../ui/Menu/Menu";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Flex from "../ui/Flex/Flex";
import { formatLastUpdated } from "../utils/formatDate";
import Divider from "../ui/Divider/Divider";

/**
 * Menu Component Demo & Documentation
 *
 * This page demonstrates the Menu component and its various configurations.
 */
export default function MenuDemo() {
  const [activeBrand, setActiveBrand] = useState("locumsmart");
  const [activeMode, setActiveMode] = useState("light");

  
  

  return (
    <section className="page">
      <header className="page__header">
        <div className="page__header-container">
          <Breadcrumb />
          <div className="page__header-info">
            <div className="page__header-content">
              <h1 className="page__header-title">Menu</h1>
              <p className="page__header-description">
                The Menu component provides a collapsible navigation sidebar
                with accordion sections for organizing navigation items. It
                supports both expanded and collapsed states, with automatic
                expansion of sections when child items are active.
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
        {/* Component Examples Section - Above Tabs */}
        <div className="page__examples-section">
          <div className="demo-group">
                <h2 className="demo-group__heading">Basic Usage</h2>
                <p className="demo-group__description">
                  The Menu component provides a navigation sidebar with
                  collapsible sections. It automatically expands sections when
                  their child routes are active.
                </p>
                <div className="demo-content">
                  <div className="demo-card">
                    <h3>Menu Component</h3>
                    <p>
                      The menu is typically used as a fixed sidebar in the
                      application layout. It includes:
                    </p>
                    <ul>
                      <li>Collapsible/expandable state</li>
                      <li>
                        Accordion sections for Foundations, Components, and
                        Patterns
                      </li>
                      <li>
                        Auto-expansion of sections when child routes are active
                      </li>
                      <li>Search functionality (placeholder)</li>
                      <li>Brand and mode selection controls</li>
                    </ul>
                    <div
                      style={{
                        position: "relative",
                        height: "600px",
                        border: "1px solid var(--uds-border-primary)",
                        borderRadius: "var(--uds-radius-8)",
                        overflow: "hidden",
                        marginTop: "var(--uds-gap-24)",
                      }}
                    >
                      <Menu
                        activeBrand={activeBrand}
                        activeMode={activeMode}
                        onBrandChange={setActiveBrand}
                        onModeChange={setActiveMode}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

        <Divider variant="solid" />

        <div className="page__tabs-content-container">
          <div className="demo-group">
            <div className="page__navigation">
              <Link
                to="/key"
                className="page__nav-link page__nav-link--prev"
              >
                <span className="page__nav-label">Previous</span>
                <span className="page__nav-title">Key</span>
              </Link>
              <Link
                to="/pill-toggle"
                className="page__nav-link page__nav-link--next"
              >
                <span className="page__nav-label">Next</span>
                <span className="page__nav-title">Pill Toggle</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
