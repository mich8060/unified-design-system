import React, { useState } from "react";
import { Link } from "react-router-dom";
import Divider from "../ui/Divider/Divider";
import "./ShadowsDemo.scss";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Tabs from "../ui/Tabs/Tabs";
import { formatLastUpdated } from "../utils/formatDate";
import Flex from "../ui/Flex/Flex";

const SHADOWS = [
  { token: "--uds-shadow-sm", label: "Shadow SM" },
  { token: "--uds-shadow-md", label: "Shadow MD" },
  { token: "--uds-shadow-lg", label: "Shadow LG" },
  { token: "--uds-shadow-xl", label: "Shadow XL" },
  { token: "--uds-shadow-2xl", label: "Shadow 2XL" },
];

function getComputedStyleValue(token) {
  if (typeof window !== "undefined") {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(token)
      .trim();
  }
  return "";
}

export default function ShadowsDemo() {

  return (
    <section className="page shadows-demo">
      <header className="page__header">
        <div className="page__header-container">
          <Breadcrumb />
          <div className="page__header-info">
            <div className="page__header-content">
              <h1 className="page__header-title">Shadows</h1>
              <p className="page__header-description">
                Shadow tokens using <code>--uds-shadow-*</code> variables from
            design-tokens.css.
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
            <h2 className="demo-group__heading">Shadow Tokens</h2>
            <p className="demo-group__description">
              Visual examples of all available shadow tokens. Each card demonstrates the shadow applied to a surface.
            </p>
            <Flex direction="row" gap="24" wrap={true}>
              {SHADOWS.map((shadow) => {
                const computedValue = getComputedStyleValue(shadow.token);
                return (
                  <Flex key={shadow.token} direction="column" gap="8" alignItems="center" style={{ minWidth: "200px" }}>
                    <div
                      style={{
                        width: "100%",
                        height: "120px",
                        backgroundColor: "var(--uds-surface-primary)",
                        borderRadius: "8px",
                        boxShadow: `var(${shadow.token})`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid var(--uds-border-secondary)",
                      }}
                    >
                      <span style={{ fontSize: "14px", color: "var(--uds-text-primary)", fontWeight: "600" }}>
                        {shadow.label}
                      </span>
                    </div>
                    <code style={{ fontSize: "12px", color: "var(--uds-text-secondary)", textAlign: "center" }}>
                      {shadow.token}
                    </code>
                    {computedValue && (
                      <span style={{ fontSize: "11px", color: "var(--uds-text-tertiary)", textAlign: "center", wordBreak: "break-all" }}>
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
