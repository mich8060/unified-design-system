import React, { useEffect } from "react";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Divider from "../ui/Divider/Divider";
import { formatLastUpdated } from "../utils/formatDate";
import Prism from "prismjs";
import "../styles/prism-custom.css";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";

export default function TokensUsage() {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <section className="page">
      <header className="page__header">
        <div className="page__header-container">
          <Breadcrumb />
          <div className="page__header-info">
            <div className="page__header-content">
              <h1 className="page__header-title">CSS Tokens Usage</h1>
              <p className="page__header-description">
                Learn how to use design tokens (CSS custom properties) in your stylesheets.
              </p>
            </div>
            <div className="page__header-metadata">
              <div className="page__metadata-row">
                <p className="page__metadata-label">Last updated</p>
                <p className="page__metadata-value">{formatLastUpdated()}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="page__content">
        <div className="page__examples-section">
          <div className="demo-group">
            <h2 className="demo-group__heading">What are Design Tokens?</h2>
            <p className="demo-group__description">
              Design tokens are CSS custom properties (variables) that store design decisions 
              like colors, spacing, typography, and more. They ensure consistency across your 
              application and make it easy to update the design system.
            </p>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Basic Usage</h2>
            <p className="demo-group__description">
              Reference tokens in your CSS using the <code>var()</code> function:
            </p>
            <pre className="code-block">
              <code className="language-css">{`.my-component {
  color: var(--uds-text-primary);
  background: var(--uds-surface-primary);
  padding: var(--uds-spacing-16);
  border-radius: var(--uds-radius-8);
  border: var(--uds-border-width-1) solid var(--uds-border-primary);
}`}</code>
            </pre>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Token Categories</h2>
            
            <div style={{ marginTop: "16px" }}>
              <h3 className="uds-heading-20-semibold" style={{ marginBottom: "12px" }}>Colors</h3>
              <p className="uds-body-16" style={{ marginBottom: "12px" }}>
                Color tokens follow this naming pattern:
              </p>
              <ul className="uds-body-16" style={{ marginLeft: "24px", marginBottom: "16px" }}>
                <li><code>--uds-color-primary-*</code> - Primary brand colors</li>
                <li><code>--uds-color-secondary-*</code> - Secondary brand colors</li>
                <li><code>--uds-text-*</code> - Text colors</li>
                <li><code>--uds-surface-*</code> - Background/surface colors</li>
                <li><code>--uds-border-*</code> - Border colors</li>
              </ul>
              <pre className="code-block">
                <code className="language-css">{`.card {
  background: var(--uds-surface-primary);
  color: var(--uds-text-primary);
  border: var(--uds-border-width-1) solid var(--uds-border-primary);
}`}</code>
              </pre>
            </div>

            <div style={{ marginTop: "24px" }}>
              <h3 className="uds-heading-20-semibold" style={{ marginBottom: "12px" }}>Spacing</h3>
              <p className="uds-body-16" style={{ marginBottom: "12px" }}>
                Spacing tokens use the pattern <code>--uds-spacing-{`{size}`}</code>:
              </p>
              <pre className="code-block">
                <code className="language-css">{`.container {
  padding: var(--uds-spacing-16);
  margin: var(--uds-spacing-24);
  gap: var(--uds-spacing-8);
}`}</code>
              </pre>
            </div>

            <div style={{ marginTop: "24px" }}>
              <h3 className="uds-heading-20-semibold" style={{ marginBottom: "12px" }}>Typography</h3>
              <p className="uds-body-16" style={{ marginBottom: "12px" }}>
                Typography tokens include font size, line height, and weight:
              </p>
              <pre className="code-block">
                <code className="language-css">{`.custom-text {
  font-family: var(--uds-font-family);
  font-size: var(--uds-font-size-16);
  line-height: var(--uds-line-16);
  font-weight: var(--uds-font-weight-semibold);
}`}</code>
              </pre>
            </div>

            <div style={{ marginTop: "24px" }}>
              <h3 className="uds-heading-20-semibold" style={{ marginBottom: "12px" }}>Border Radius</h3>
              <p className="uds-body-16" style={{ marginBottom: "12px" }}>
                Border radius tokens: <code>--uds-radius-{`{size}`}</code>
              </p>
              <pre className="code-block">
                <code className="language-css">{`.rounded {
  border-radius: var(--uds-radius-8);
}

.rounded-lg {
  border-radius: var(--uds-radius-12);
}`}</code>
              </pre>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Brand and Theme Switching</h2>
            <p className="demo-group__description">
              Tokens automatically adapt based on the <code>data-brand</code> and <code>data-mode</code> 
              attributes on your root HTML element.
            </p>
            <pre className="code-block">
              <code className="language-markup">{`<!-- Light mode, default brand -->
<html data-brand="design-system" data-mode="light">

<!-- Dark mode, CompHealth brand -->
<html data-brand="comphealth" data-mode="dark">`}</code>
            </pre>
            <p className="uds-body-14" style={{ marginTop: "16px", color: "var(--uds-text-secondary)" }}>
              When you change these attributes, all tokens automatically update to match the selected 
              brand and theme. No code changes needed!
            </p>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Inline Styles (React)</h2>
            <p className="demo-group__description">
              You can also use tokens directly in inline styles:
            </p>
            <pre className="code-block">
              <code className="language-markup">{`<div style={{
  color: 'var(--uds-text-primary)',
  padding: 'var(--uds-spacing-16)',
  background: 'var(--uds-surface-secondary)'
}}>
  Content
</div>`}</code>
            </pre>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Animation Tokens</h2>
            <p className="demo-group__description">
              Use animation tokens for consistent motion:
            </p>
            <pre className="code-block">
              <code className="language-css">{`.animated-element {
  transition: all var(--uds-animation-duration-200) var(--uds-animation-ease-standard);
}

.animated-element:hover {
  transform: scale(1.05);
}`}</code>
            </pre>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Button Tokens</h2>
            <p className="demo-group__description">
              Button-specific tokens for consistent button styling:
            </p>
            <pre className="code-block">
              <code className="language-css">{`.custom-button {
  background: var(--uds-button-surface-primary-default);
  color: var(--uds-button-text-default);
  border: var(--uds-border-width-1) solid var(--uds-button-border-primary-default);
}

.custom-button:hover {
  background: var(--uds-button-surface-primary-hover);
  border-color: var(--uds-button-border-primary-hover);
}`}</code>
            </pre>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Exploring Tokens</h2>
            <p className="demo-group__description">
              View all available tokens in the{" "}
              <a href="/figma-variables" style={{ color: "var(--uds-text-brand-primary)" }}>
                Design Tokens
              </a>{" "}
              page, or inspect the <code>tokens.css</code> file directly.
            </p>
          </div>
        </div>

        <Divider variant="solid" />
      </main>
    </section>
  );
}
