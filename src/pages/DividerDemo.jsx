import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Divider from "../ui/Divider/Divider";
import Flex from "../ui/Flex/Flex";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import { formatLastUpdated } from "../utils/formatDate";
import CopyButton from "../ui/CopyButton/CopyButton";
import Prism from "prismjs";
import "../styles/prism-custom.css";
import "prismjs/components/prism-jsx";

const alignments = ["left", "center", "right"];

export default function DividerDemo() {
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
              <h1 className="page__header-title">Divider</h1>
              <p className="page__header-description">
                The Divider component provides a visual separator between content
                sections. It can include optional labels or icons positioned at
                different alignments (left, center, or right) to provide context or
                actions.
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
            <h2 className="demo-group__heading">Basic Divider</h2>
            <p className="demo-group__description">
              A simple divider line without any label or icon.
            </p>
            <div
              className="demo-content"
              style={{
                padding: "24px",
                background: "var(--uds-surface-secondary)",
                borderRadius: "8px",
              }}
            >
              <div>Content above</div>
              <Divider />
              <div>Content below</div>
            </div>
            <div style={{ marginTop: "16px", position: "relative" }}>
              <CopyButton codeString={`import Divider from "@chg/design-system/Divider";

<Divider />`} />
              <pre className="code-block">
                <code className="language-jsx">{`import Divider from "@chg/design-system/Divider";

<Divider />`}</code>
              </pre>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Solid Divider Variant</h2>
            <p className="demo-group__description">
              A solid divider variant that creates an 8px tall box spanning the full width.
            </p>
            <div
              className="demo-content"
              style={{
                padding: "24px",
                background: "var(--uds-surface-secondary)",
                borderRadius: "8px",
              }}
            >
              <div>Content above</div>
              <Divider variant="solid" />
              <div>Content below</div>
            </div>
            <div style={{ marginTop: "16px", position: "relative" }}>
              <CopyButton codeString={`<Divider variant="solid" />`} />
              <pre className="code-block">
                <code className="language-jsx">{`<Divider variant="solid" />`}</code>
              </pre>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Divider with Labels</h2>
            <p className="demo-group__description">
              Dividers can include text labels positioned at different alignments.
            </p>
            <Flex direction="column" gap="24" className="demo-content">
              <div
                style={{
                  padding: "24px",
                  background: "var(--uds-surface-secondary)",
                  borderRadius: "8px",
                }}
              >
                <Divider label="Divider Label" alignment="left" />
              </div>
              <div
                style={{
                  padding: "24px",
                  background: "var(--uds-surface-secondary)",
                  borderRadius: "8px",
                }}
              >
                <Divider label="Divider Label" alignment="center" />
              </div>
              <div
                style={{
                  padding: "24px",
                  background: "var(--uds-surface-secondary)",
                  borderRadius: "8px",
                }}
              >
                <Divider label="Divider Label" alignment="right" />
              </div>
            </Flex>
            <div style={{ marginTop: "16px", position: "relative" }}>
              <CopyButton codeString={`// Left aligned label
<Divider label="Divider Label" alignment="left" />

// Center aligned label
<Divider label="Divider Label" alignment="center" />

// Right aligned label
<Divider label="Divider Label" alignment="right" />`} />
              <pre className="code-block">
                <code className="language-jsx">{`// Left aligned label
<Divider label="Divider Label" alignment="left" />

// Center aligned label
<Divider label="Divider Label" alignment="center" />

// Right aligned label
<Divider label="Divider Label" alignment="right" />`}</code>
              </pre>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Divider with Icons</h2>
            <p className="demo-group__description">
              Dividers can include icons positioned at different alignments.
            </p>
            <Flex direction="column" gap="24" className="demo-content">
              <div
                style={{
                  padding: "24px",
                  background: "var(--uds-surface-secondary)",
                  borderRadius: "8px",
                }}
              >
                <Divider icon="Plus" alignment="left" />
              </div>
              <div
                style={{
                  padding: "24px",
                  background: "var(--uds-surface-secondary)",
                  borderRadius: "8px",
                }}
              >
                <Divider icon="Plus" alignment="center" />
              </div>
              <div
                style={{
                  padding: "24px",
                  background: "var(--uds-surface-secondary)",
                  borderRadius: "8px",
                }}
              >
                <Divider icon="Plus" alignment="right" />
              </div>
            </Flex>
            <div style={{ marginTop: "16px", position: "relative" }}>
              <CopyButton codeString={`// Left aligned icon
<Divider icon="Plus" alignment="left" />

// Center aligned icon
<Divider icon="Plus" alignment="center" />

// Right aligned icon
<Divider icon="Plus" alignment="right" />`} />
              <pre className="code-block">
                <code className="language-jsx">{`// Left aligned icon
<Divider icon="Plus" alignment="left" />

// Center aligned icon
<Divider icon="Plus" alignment="center" />

// Right aligned icon
<Divider icon="Plus" alignment="right" />`}</code>
              </pre>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Alignment Options</h2>
            <p className="demo-group__description">
              Labels and icons can be aligned to the left, center, or right.
            </p>
            <Flex direction="column" gap="24" className="demo-content">
              {alignments.map((alignment) => (
                <div
                  key={alignment}
                  style={{
                    padding: "24px",
                    background: "var(--uds-surface-secondary)",
                    borderRadius: "8px",
                  }}
                >
                  <Divider
                    label={`Divider Label (${alignment})`}
                    alignment={alignment}
                  />
                </div>
              ))}
            </Flex>
            <div style={{ marginTop: "16px", position: "relative" }}>
              <CopyButton codeString={`// Alignment options: "left" | "center" | "right"
<Divider label="Left aligned" alignment="left" />
<Divider label="Center aligned" alignment="center" />
<Divider label="Right aligned" alignment="right" />`} />
              <pre className="code-block">
                <code className="language-jsx">{`// Alignment options: "left" | "center" | "right"
<Divider label="Left aligned" alignment="left" />
<Divider label="Center aligned" alignment="center" />
<Divider label="Right aligned" alignment="right" />`}</code>
              </pre>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Props</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ 
                width: "100%", 
                borderCollapse: "collapse",
                fontSize: "var(--uds-font-size-14)"
              }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--uds-border-primary)" }}>
                    <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600 }}>Prop</th>
                    <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600 }}>Type</th>
                    <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600 }}>Default</th>
                    <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600 }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid var(--uds-border-secondary)" }}>
                    <td style={{ padding: "12px 16px" }}><code>variant</code></td>
                    <td style={{ padding: "12px 16px" }}><code>"default" | "solid"</code></td>
                    <td style={{ padding: "12px 16px" }}><code>"default"</code></td>
                    <td style={{ padding: "12px 16px" }}>Visual style of the divider</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--uds-border-secondary)" }}>
                    <td style={{ padding: "12px 16px" }}><code>label</code></td>
                    <td style={{ padding: "12px 16px" }}><code>string</code></td>
                    <td style={{ padding: "12px 16px" }}>—</td>
                    <td style={{ padding: "12px 16px" }}>Text label to display</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--uds-border-secondary)" }}>
                    <td style={{ padding: "12px 16px" }}><code>icon</code></td>
                    <td style={{ padding: "12px 16px" }}><code>string</code></td>
                    <td style={{ padding: "12px 16px" }}>—</td>
                    <td style={{ padding: "12px 16px" }}>Phosphor icon name to display</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--uds-border-secondary)" }}>
                    <td style={{ padding: "12px 16px" }}><code>alignment</code></td>
                    <td style={{ padding: "12px 16px" }}><code>"left" | "center" | "right"</code></td>
                    <td style={{ padding: "12px 16px" }}><code>"center"</code></td>
                    <td style={{ padding: "12px 16px" }}>Position of label or icon</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <Divider variant="solid" />

        <div className="page__tabs-content-container">
          <div className="demo-group">
            <div className="page__navigation">
              <Link
                to="/chip"
                className="page__nav-link page__nav-link--prev"
              >
                <span className="page__nav-label">Previous</span>
                <span className="page__nav-title">Chip</span>
              </Link>
              <Link
                to="/dot-status"
                className="page__nav-link page__nav-link--next"
              >
                <span className="page__nav-label">Next</span>
                <span className="page__nav-title">Dot Status</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
