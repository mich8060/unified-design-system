import React, { useState } from "react";
import { Link } from "react-router-dom";
import Flex from "../ui/Flex/Flex";
import Divider from "../ui/Divider/Divider";
import "./FlexDemo.scss";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Tabs from "../ui/Tabs/Tabs";
import { formatLastUpdated } from "../utils/formatDate";

export default function FlexDemo() {

  return (
    <section className="page">
      <header className="page__header">
        <div className="page__header-container">
          <Breadcrumb />
          <div className="page__header-info">
            <div className="page__header-content">
              <h1 className="page__header-title">Flex Layout</h1>
              <p className="page__header-description">
                A flexible layout component that provides a consistent way to create
            flexbox-based layouts throughout the application. Supports all
            common flexbox properties with convenient props.
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
            <h2 className="demo-group__heading">Direction</h2>
            <p className="demo-group__description">
              Control the direction of flex items using the `direction` prop.
            </p>
            <Flex direction="column" gap="24">
              <div>
                <p style={{ marginBottom: "8px", fontSize: "14px", color: "var(--uds-text-secondary)" }}>Row (default)</p>
                <Flex direction="row" gap="8">
                  <div style={{ padding: "12px", background: "var(--uds-surface-secondary)", borderRadius: "4px" }}>Item 1</div>
                  <div style={{ padding: "12px", background: "var(--uds-surface-secondary)", borderRadius: "4px" }}>Item 2</div>
                  <div style={{ padding: "12px", background: "var(--uds-surface-secondary)", borderRadius: "4px" }}>Item 3</div>
                </Flex>
              </div>
              <div>
                <p style={{ marginBottom: "8px", fontSize: "14px", color: "var(--uds-text-secondary)" }}>Column</p>
                <Flex direction="column" gap="8">
                  <div style={{ padding: "12px", background: "var(--uds-surface-secondary)", borderRadius: "4px" }}>Item 1</div>
                  <div style={{ padding: "12px", background: "var(--uds-surface-secondary)", borderRadius: "4px" }}>Item 2</div>
                  <div style={{ padding: "12px", background: "var(--uds-surface-secondary)", borderRadius: "4px" }}>Item 3</div>
                </Flex>
              </div>
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Gap</h2>
            <p className="demo-group__description">
              Control spacing between flex items using the `gap` prop with UDS gap tokens.
            </p>
            <Flex direction="column" gap="24">
              {["4", "8", "16", "24", "32"].map((gap) => (
                <div key={gap}>
                  <p style={{ marginBottom: "8px", fontSize: "14px", color: "var(--uds-text-secondary)" }}>Gap {gap}px</p>
                  <Flex direction="row" gap={gap}>
                    <div style={{ padding: "12px", background: "var(--uds-surface-secondary)", borderRadius: "4px" }}>Item 1</div>
                    <div style={{ padding: "12px", background: "var(--uds-surface-secondary)", borderRadius: "4px" }}>Item 2</div>
                    <div style={{ padding: "12px", background: "var(--uds-surface-secondary)", borderRadius: "4px" }}>Item 3</div>
                  </Flex>
                </div>
              ))}
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Alignment</h2>
            <p className="demo-group__description">
              Control alignment of flex items using `alignItems` and `justifyContent` props.
            </p>
            <Flex direction="column" gap="24">
              <div>
                <p style={{ marginBottom: "8px", fontSize: "14px", color: "var(--uds-text-secondary)" }}>Align Items: Center</p>
                <Flex direction="row" gap="8" alignItems="center" style={{ height: "80px", background: "var(--uds-surface-tertiary)", padding: "8px" }}>
                  <div style={{ padding: "12px", background: "var(--uds-surface-secondary)", borderRadius: "4px" }}>Item 1</div>
                  <div style={{ padding: "20px", background: "var(--uds-surface-secondary)", borderRadius: "4px" }}>Item 2</div>
                  <div style={{ padding: "16px", background: "var(--uds-surface-secondary)", borderRadius: "4px" }}>Item 3</div>
                </Flex>
              </div>
              <div>
                <p style={{ marginBottom: "8px", fontSize: "14px", color: "var(--uds-text-secondary)" }}>Justify Content: Space Between</p>
                <Flex direction="row" gap="8" justifyContent="space-between" style={{ background: "var(--uds-surface-tertiary)", padding: "8px" }}>
                  <div style={{ padding: "12px", background: "var(--uds-surface-secondary)", borderRadius: "4px" }}>Item 1</div>
                  <div style={{ padding: "12px", background: "var(--uds-surface-secondary)", borderRadius: "4px" }}>Item 2</div>
                  <div style={{ padding: "12px", background: "var(--uds-surface-secondary)", borderRadius: "4px" }}>Item 3</div>
                </Flex>
              </div>
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Wrap</h2>
            <p className="demo-group__description">
              Allow flex items to wrap to the next line using the `wrap` prop.
            </p>
            <Flex direction="row" gap="8" wrap={true} style={{ maxWidth: "300px" }}>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div key={num} style={{ padding: "12px", background: "var(--uds-surface-secondary)", borderRadius: "4px", minWidth: "80px" }}>
                  Item {num}
                </div>
              ))}
            </Flex>
          </div>
        </div>

        <Divider variant="solid" />
      </main>
    </section>
  );
}
