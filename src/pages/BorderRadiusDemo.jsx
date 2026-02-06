import React, { useState } from "react";
import { Link } from "react-router-dom";
import Divider from "../ui/Divider/Divider";
import "./BorderRadiusDemo.scss";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Tabs from "../ui/Tabs/Tabs";
import { formatLastUpdated } from "../utils/formatDate";
import Flex from "../ui/Flex/Flex";

const RADIUS_VALUES = ["2", "4", "6", "8", "12", "16", "20", "24", "9999"];

function getComputedStyleValue(token) {
  if (typeof window !== "undefined") {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(token)
      .trim();
  }
  return "";
}

export default function BorderRadiusDemo() {

  return (
    <section className="page border-radius-demo">
      <header className="page__header">
        <div className="page__header-container">
          <Breadcrumb />
          <div className="page__header-info">
            <div className="page__header-content">
              <h1 className="page__header-title">Border Radius</h1>
              <p className="page__header-description">
                Border radius tokens using <code>--uds-radius-*</code> variables
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
            <h2 className="demo-group__heading">Border Radius Tokens</h2>
            <p className="demo-group__description">
              Visual examples of all available border radius tokens. Each box demonstrates the radius value applied to all corners.
            </p>
            <Flex direction="row" gap="24" wrap={true}>
              {RADIUS_VALUES.map((value) => {
                const token = `--uds-radius-${value}`;
                const computedValue = getComputedStyleValue(token);
                return (
                  <Flex key={value} direction="column" gap="8" alignItems="center">
                    <div
                      style={{
                        width: "120px",
                        height: "120px",
                        backgroundColor: "var(--uds-surface-secondary)",
                        border: "1px solid var(--uds-border-primary)",
                        borderRadius: `var(${token})`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span style={{ fontSize: "12px", color: "var(--uds-text-secondary)" }}>
                        {value}px
                      </span>
                    </div>
                    <code style={{ fontSize: "12px", color: "var(--uds-text-secondary)" }}>
                      {token}
                    </code>
                    {computedValue && (
                      <span style={{ fontSize: "11px", color: "var(--uds-text-tertiary)" }}>
                        {computedValue}
                      </span>
                    )}
                  </Flex>
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
