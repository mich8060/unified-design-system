import React, { useEffect } from "react";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Divider from "../ui/Divider/Divider";
import Flex from "../ui/Flex/Flex";
import { formatLastUpdated } from "../utils/formatDate";
import CopyButton from "../ui/CopyButton/CopyButton";
import Prism from "prismjs";
import "../styles/prism-custom.css";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "./Installation.scss";

export default function Installation() {
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
              <h1 className="page__header-title">Installation</h1>
              <p className="page__header-description">
                Get started with the design system by following these installation steps.
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
            <h2 className="demo-group__heading">Overview</h2>
            <p className="demo-group__description">
              The design system consists of CSS custom properties (tokens), typography classes, 
              utility classes, and React components. This guide will walk you through setting 
              up the design system in your project.
            </p>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Step 1: Include CSS Tokens</h2>
            <p className="demo-group__description">
              Add the design tokens CSS file to your project. This file contains all color, 
              spacing, typography, and other design tokens.
            </p>
            <div style={{ 
              marginTop: "16px", 
              padding: "24px", 
              background: "var(--uds-surface-secondary)", 
              borderRadius: "8px", 
              border: "1px solid var(--uds-border-primary)" 
            }}>
              <h3 className="uds-heading-20-semibold" style={{ marginTop: 0, marginBottom: "12px" }}>
                Option A: Link to CSS file
              </h3>
              <div className="installation__code-block-wrapper">
                <CopyButton codeString={`<link rel="stylesheet" href="/path/to/tokens.css" />`} />
                <pre className="installation__code-block">
                  <code className="language-markup">{`<link rel="stylesheet" href="/path/to/tokens.css" />`}</code>
                </pre>
              </div>
            </div>

            <div style={{ 
              marginTop: "16px", 
              padding: "24px", 
              background: "var(--uds-surface-secondary)", 
              borderRadius: "8px", 
              border: "1px solid var(--uds-border-primary)" 
            }}>
              <h3 className="uds-heading-20-semibold" style={{ marginTop: 0, marginBottom: "12px" }}>
                Option B: Import in CSS/SCSS
              </h3>
              <div className="installation__code-block-wrapper">
                <CopyButton codeString={`@import './path/to/tokens.css';`} />
                <pre className="installation__code-block">
                  <code className="language-css">{`@import './path/to/tokens.css';`}</code>
                </pre>
              </div>
            </div>

            <div style={{ 
              marginTop: "16px", 
              padding: "24px", 
              background: "var(--uds-surface-secondary)", 
              borderRadius: "8px", 
              border: "1px solid var(--uds-border-primary)" 
            }}>
              <h3 className="uds-heading-20-semibold" style={{ marginTop: 0, marginBottom: "12px" }}>
                Option C: Import in JavaScript/React
              </h3>
              <div className="installation__code-block-wrapper">
                <CopyButton codeString={`import './path/to/tokens.css';`} />
                <pre className="installation__code-block">
                  <code className="language-javascript">{`import './path/to/tokens.css';`}</code>
                </pre>
              </div>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Step 2: Install Font</h2>
            <p className="demo-group__description">
              The design system uses the Inter font family. See the{" "}
              <a href="/getting-started/font" style={{ color: "var(--uds-text-brand-primary)" }}>
                Font Installation
              </a>{" "}
              page for detailed instructions.
            </p>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Step 3: Set Brand and Theme</h2>
            <p className="demo-group__description">
              Apply brand and theme attributes to your root HTML element to activate 
              brand-specific tokens and dark mode.
            </p>
            <div style={{ 
              marginTop: "16px", 
              padding: "24px", 
              background: "var(--uds-surface-secondary)", 
              borderRadius: "8px", 
              border: "1px solid var(--uds-border-primary)" 
            }}>
              <div className="installation__code-block-wrapper">
                <CopyButton codeString={`<html data-brand="design-system" data-theme="light">
  <!-- or -->
<html data-brand="comphealth" data-theme="dark">`} />
                <pre className="installation__code-block">
                  <code className="language-markup">{`<html data-brand="design-system" data-theme="light">
  <!-- or -->
<html data-brand="comphealth" data-theme="dark">`}</code>
                </pre>
              </div>
              <p className="uds-body-14" style={{ marginTop: "16px", marginBottom: 0 }}>
                Available brands: <code>design-system</code>, <code>comphealth</code>, <code>locumsmart</code>, 
                <code>modio</code>, <code>wireframe</code>, <code>connect</code>, <code>weatherby</code>
              </p>
              <p className="uds-body-14" style={{ marginTop: "8px", marginBottom: 0 }}>
                Available themes: <code>light</code>, <code>dark</code>
              </p>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Step 4: Use Typography Classes</h2>
            <p className="demo-group__description">
              Apply typography classes to your HTML elements. See the{" "}
              <a href="/typography" style={{ color: "var(--uds-text-brand-primary)" }}>
                Typography
              </a>{" "}
              page for all available classes.
            </p>
            <div style={{ 
              marginTop: "16px", 
              padding: "24px", 
              background: "var(--uds-surface-secondary)", 
              borderRadius: "8px", 
              border: "1px solid var(--uds-border-primary)" 
            }}>
              <div className="installation__code-block-wrapper">
                <CopyButton codeString={`<h1 className="uds-display-48-semibold">Large Heading</h1>
<p className="uds-body-16">Body text content</p>
<h2 className="uds-heading-24-bold">Section Title</h2>`} />
                <pre className="installation__code-block">
                  <code className="language-jsx">{`<h1 className="uds-display-48-semibold">Large Heading</h1>
<p className="uds-body-16">Body text content</p>
<h2 className="uds-heading-24-bold">Section Title</h2>`}</code>
                </pre>
              </div>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Step 5: Use CSS Tokens</h2>
            <p className="demo-group__description">
              Reference design tokens in your CSS using CSS custom properties. See the{" "}
              <a href="/getting-started/tokens" style={{ color: "var(--uds-text-brand-primary)" }}>
                CSS Tokens
              </a>{" "}
              page for detailed usage examples.
            </p>
            <div style={{ 
              marginTop: "16px", 
              padding: "24px", 
              background: "var(--uds-surface-secondary)", 
              borderRadius: "8px", 
              border: "1px solid var(--uds-border-primary)" 
            }}>
              <div className="installation__code-block-wrapper">
                <CopyButton codeString={`.my-component {
  color: var(--uds-text-primary);
  background: var(--uds-surface-primary);
  padding: var(--uds-spacing-16);
  border-radius: var(--uds-radius-8);
}`} />
                <pre className="installation__code-block">
                  <code className="language-css">{`.my-component {
  color: var(--uds-text-primary);
  background: var(--uds-surface-primary);
  padding: var(--uds-spacing-16);
  border-radius: var(--uds-radius-8);
}`}</code>
                </pre>
              </div>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Next Steps</h2>
            <Flex direction="column" gap="12">
              <div>
                <a href="/getting-started/font" className="uds-body-16-semibold" style={{ color: "var(--uds-text-brand-primary)" }}>
                  → Font Installation Guide
                </a>
                <p className="uds-body-14" style={{ marginTop: "4px", color: "var(--uds-text-secondary)" }}>
                  Learn how to install and configure the Inter font
                </p>
              </div>
              <div>
                <a href="/getting-started/tokens" className="uds-body-16-semibold" style={{ color: "var(--uds-text-brand-primary)" }}>
                  → CSS Tokens Usage
                </a>
                <p className="uds-body-14" style={{ marginTop: "4px", color: "var(--uds-text-secondary)" }}>
                  Comprehensive guide to using design tokens
                </p>
              </div>
              <div>
                <a href="/typography" className="uds-body-16-semibold" style={{ color: "var(--uds-text-brand-primary)" }}>
                  → Typography Classes
                </a>
                <p className="uds-body-14" style={{ marginTop: "4px", color: "var(--uds-text-secondary)" }}>
                  Browse all available typography classes
                </p>
              </div>
            </Flex>
          </div>
        </div>

        <Divider variant="solid" />
      </main>
    </section>
  );
}
