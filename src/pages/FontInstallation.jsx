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
import "prismjs/components/prism-bash";
import "./FontInstallation.scss";

export default function FontInstallation() {
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
              <h1 className="page__header-title">Font Installation</h1>
              <p className="page__header-description">
                Install and configure the Inter font family for the design system.
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
            <h2 className="demo-group__heading">Font Family</h2>
            <p className="demo-group__description">
              The design system uses <strong>Inter</strong> as the primary font family. 
              Inter is a variable font designed for computer screens with excellent readability.
            </p>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Method 1: Google Fonts (Recommended)</h2>
            <p className="demo-group__description">
              The easiest way to include Inter is via Google Fonts CDN. Add this to your HTML head:
            </p>
            <div style={{ 
              marginTop: "16px", 
              padding: "24px", 
              background: "var(--uds-surface-secondary)", 
              borderRadius: "8px", 
              border: "1px solid var(--uds-border-primary)" 
            }}>
              <div className="font-installation__code-block-wrapper">
                <CopyButton codeString={`<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link 
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
  rel="stylesheet" 
/>`} />
                <pre className="font-installation__code-block">
                  <code className="language-markup">{`<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link 
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
  rel="stylesheet" 
/>`}</code>
                </pre>
              </div>
              <p className="uds-body-14" style={{ marginTop: "16px", marginBottom: 0, color: "var(--uds-text-secondary)" }}>
                This includes Inter in weights 400 (regular), 500 (medium), 600 (semibold), and 700 (bold).
              </p>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Method 2: Self-Hosted Fonts</h2>
            <p className="demo-group__description">
              For better performance and offline support, you can host Inter fonts yourself.
            </p>
            <div style={{ 
              marginTop: "16px", 
              padding: "24px", 
              background: "var(--uds-surface-secondary)", 
              borderRadius: "8px", 
              border: "1px solid var(--uds-border-primary)" 
            }}>
              <h3 className="uds-heading-20-semibold" style={{ marginTop: 0, marginBottom: "12px" }}>
                Step 1: Download Font Files
              </h3>
              <p className="uds-body-16" style={{ marginBottom: "12px" }}>
                Download Inter from{" "}
                <a href="https://rsms.me/inter/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--uds-text-brand-primary)" }}>
                  rsms.me/inter
                </a>{" "}
                or use a package manager:
              </p>
              <div className="font-installation__code-block-wrapper">
                <CopyButton codeString={`npm install inter-ui`} />
                <pre className="font-installation__code-block">
                  <code className="language-bash">{`npm install inter-ui`}</code>
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
                Step 2: Define @font-face
              </h3>
              <div className="font-installation__code-block-wrapper">
                <CopyButton codeString={`@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('./fonts/Inter-Regular.woff2') format('woff2');
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('./fonts/Inter-Medium.woff2') format('woff2');
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('./fonts/Inter-SemiBold.woff2') format('woff2');
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('./fonts/Inter-Bold.woff2') format('woff2');
}`} />
                <pre className="font-installation__code-block">
                  <code className="language-css">{`@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('./fonts/Inter-Regular.woff2') format('woff2');
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('./fonts/Inter-Medium.woff2') format('woff2');
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('./fonts/Inter-SemiBold.woff2') format('woff2');
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('./fonts/Inter-Bold.woff2') format('woff2');
}`}</code>
                </pre>
              </div>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Font Configuration</h2>
            <p className="demo-group__description">
              The design system automatically uses Inter through the CSS token system. 
              The font family is defined in the tokens as:
            </p>
            <div style={{ 
              marginTop: "16px", 
              padding: "24px", 
              background: "var(--uds-surface-secondary)", 
              borderRadius: "8px", 
              border: "1px solid var(--uds-border-primary)" 
            }}>
              <div className="font-installation__code-block-wrapper">
                <CopyButton codeString={`:root {
  --uds-font-family: "Inter", ui-sans-serif, system-ui, 
    -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
}`} />
                <pre className="font-installation__code-block">
                  <code className="language-css">{`:root {
  --uds-font-family: "Inter", ui-sans-serif, system-ui, 
    -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
}`}</code>
                </pre>
              </div>
              <p className="uds-body-14" style={{ marginTop: "16px", marginBottom: 0, color: "var(--uds-text-secondary)" }}>
                The font stack includes fallbacks to system fonts if Inter fails to load.
              </p>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Verification</h2>
            <p className="demo-group__description">
              To verify Inter is loaded correctly, check the computed styles in your browser's 
              developer tools. The font-family should show "Inter" as the primary font.
            </p>
            <div style={{ 
              marginTop: "16px", 
              padding: "24px", 
              background: "var(--uds-surface-secondary)", 
              borderRadius: "8px", 
              border: "1px solid var(--uds-border-primary)" 
            }}>
              <p className="uds-body-16" style={{ margin: 0 }}>
                Open DevTools → Elements → Computed → font-family
              </p>
              <p className="uds-body-14" style={{ marginTop: "8px", marginBottom: 0, color: "var(--uds-text-secondary)" }}>
                You should see: <code>Inter, ui-sans-serif, system-ui, ...</code>
              </p>
            </div>
          </div>
        </div>

        <Divider variant="solid" />
      </main>
    </section>
  );
}
