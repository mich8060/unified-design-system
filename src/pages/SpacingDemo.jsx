import React, { useState } from "react";
import { Link } from "react-router-dom";
import Divider from "../ui/Divider/Divider";
import "./SpacingDemo.scss";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Tabs from "../ui/Tabs/Tabs";
import { formatLastUpdated } from "../utils/formatDate";
import Flex from "../ui/Flex/Flex";

const SPACING_VALUES = [
  "0",
  "2",
  "4",
  "6",
  "8",
  "10",
  "12",
  "14",
  "16",
  "18",
  "20",
  "24",
  "32",
  "48",
  "64",
  "80",
];

function getComputedStyleValue(token) {
  if (typeof window !== "undefined") {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(token)
      .trim();
  }
  return "";
}

export default function SpacingDemo() {

  return (
    <section className="page spacing-demo">
      <header className="page__header">
        <div className="page__header-container">
          <Breadcrumb />
          <div className="page__header-info">
            <div className="page__header-content">
              <h1 className="page__header-title">Spacing</h1>
              <p className="page__header-description">
                Spacing tokens using <code>--uds-space-*</code>,{" "}
            <code>--uds-padding-*</code>, and <code>--uds-gap-*</code> variables
            from design-tokens.css.
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
            <h2 className="demo-group__heading">Spacing Tokens</h2>
            <p className="demo-group__description">
              Visual examples of all available spacing tokens. Each bar demonstrates the spacing value.
            </p>
            <Flex direction="column" gap="16">
              {SPACING_VALUES.map((value) => {
                const spaceToken = `--uds-spacing-${value}`;
                const gapToken = `--uds-gap-${value}`;
                const paddingToken = `--uds-padding-${value}`;
                const spaceValue = getComputedStyleValue(spaceToken);
                return (
                  <div key={value} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{ minWidth: "120px", fontSize: "14px", color: "var(--uds-text-secondary)" }}>
                      {value === "0" ? "0px" : `${value}px`}
                    </div>
                    <div
                      style={{
                        width: `var(${spaceToken})`,
                        height: "32px",
                        backgroundColor: "var(--uds-surface-brand-secondary)",
                        borderRadius: "4px",
                        border: "1px solid var(--uds-border-brand-primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {value !== "0" && (
                        <span style={{ fontSize: "11px", color: "var(--uds-text-brand-primary)" }}>
                          {spaceValue || `${value}px`}
                        </span>
                      )}
                    </div>
                    <code style={{ fontSize: "12px", color: "var(--uds-text-tertiary)" }}>
                      {spaceToken}
                    </code>
                  </div>
                );
              })}
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Gap Tokens</h2>
            <p className="demo-group__description">
              Gap tokens are used for spacing between flex or grid items.
            </p>
            <Flex direction="column" gap="16">
              {["4", "8", "16", "24", "32"].map((value) => {
                const gapToken = `--uds-gap-${value}`;
                const gapValue = getComputedStyleValue(gapToken);
                return (
                  <div key={value}>
                    <p style={{ marginBottom: "8px", fontSize: "14px", color: "var(--uds-text-secondary)" }}>
                      Gap {value}px
                    </p>
                    <Flex direction="row" gap={value}>
                      <div style={{ padding: "12px", background: "var(--uds-surface-secondary)", borderRadius: "4px" }}>Item 1</div>
                      <div style={{ padding: "12px", background: "var(--uds-surface-secondary)", borderRadius: "4px" }}>Item 2</div>
                      <div style={{ padding: "12px", background: "var(--uds-surface-secondary)", borderRadius: "4px" }}>Item 3</div>
                    </Flex>
                    <code style={{ fontSize: "12px", color: "var(--uds-text-tertiary)", marginTop: "4px", display: "block" }}>
                      {gapToken}
                    </code>
                  </div>
                );
              })}
            </Flex>
          </div>
        </div>

        <Divider variant="solid" />
      </main>
    </section>
  );
}
