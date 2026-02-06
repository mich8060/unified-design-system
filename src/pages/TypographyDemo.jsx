import React, { useEffect } from "react";
import Divider from "../ui/Divider/Divider";
import "./TypographyDemo.scss";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import { formatLastUpdated } from "../utils/formatDate";
import Flex from "../ui/Flex/Flex";
import CopyButton from "../ui/CopyButton/CopyButton";
import Prism from "prismjs";
import "../styles/prism-custom.css";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";

const TYPOGRAPHY_STYLES = {
  Display: [
    { class: "uds-display-128", label: "Display 128" },
    { class: "uds-display-128-medium", label: "Display 128 Medium" },
    { class: "uds-display-128-semibold", label: "Display 128 Semibold" },
    { class: "uds-display-128-bold", label: "Display 128 Bold" },
    { class: "uds-display-96", label: "Display 96" },
    { class: "uds-display-96-medium", label: "Display 96 Medium" },
    { class: "uds-display-96-semibold", label: "Display 96 Semibold" },
    { class: "uds-display-96-bold", label: "Display 96 Bold" },
    { class: "uds-display-72", label: "Display 72" },
    { class: "uds-display-72-medium", label: "Display 72 Medium" },
    { class: "uds-display-72-semibold", label: "Display 72 Semibold" },
    { class: "uds-display-72-bold", label: "Display 72 Bold" },
    { class: "uds-display-60", label: "Display 60" },
    { class: "uds-display-60-medium", label: "Display 60 Medium" },
    { class: "uds-display-60-semibold", label: "Display 60 Semibold" },
    { class: "uds-display-60-bold", label: "Display 60 Bold" },
    { class: "uds-display-48", label: "Display 48" },
    { class: "uds-display-48-medium", label: "Display 48 Medium" },
    { class: "uds-display-48-semibold", label: "Display 48 Semibold" },
    { class: "uds-display-48-bold", label: "Display 48 Bold" },
    { class: "uds-display-36", label: "Display 36" },
    { class: "uds-display-36-medium", label: "Display 36 Medium" },
    { class: "uds-display-36-semibold", label: "Display 36 Semibold" },
    { class: "uds-display-36-bold", label: "Display 36 Bold" },
  ],
  Heading: [
    { class: "uds-heading-32", label: "Heading 32" },
    { class: "uds-heading-32-medium", label: "Heading 32 Medium" },
    { class: "uds-heading-32-semibold", label: "Heading 32 Semibold" },
    { class: "uds-heading-32-bold", label: "Heading 32 Bold" },
    { class: "uds-heading-28", label: "Heading 28" },
    { class: "uds-heading-28-medium", label: "Heading 28 Medium" },
    { class: "uds-heading-28-semibold", label: "Heading 28 Semibold" },
    { class: "uds-heading-28-bold", label: "Heading 28 Bold" },
    { class: "uds-heading-24", label: "Heading 24" },
    { class: "uds-heading-24-medium", label: "Heading 24 Medium" },
    { class: "uds-heading-24-semibold", label: "Heading 24 Semibold" },
    { class: "uds-heading-24-bold", label: "Heading 24 Bold" },
    { class: "uds-heading-20", label: "Heading 20" },
    { class: "uds-heading-20-medium", label: "Heading 20 Medium" },
    { class: "uds-heading-20-semibold", label: "Heading 20 Semibold" },
    { class: "uds-heading-20-bold", label: "Heading 20 Bold" },
  ],
  Body: [
    { class: "uds-body-20", label: "Body 20" },
    { class: "uds-body-20-medium", label: "Body 20 Medium" },
    { class: "uds-body-20-semibold", label: "Body 20 Semibold" },
    { class: "uds-body-20-bold", label: "Body 20 Bold" },
    { class: "uds-body-16", label: "Body 16" },
    { class: "uds-body-16-medium", label: "Body 16 Medium" },
    { class: "uds-body-16-semibold", label: "Body 16 Semibold" },
    { class: "uds-body-16-bold", label: "Body 16 Bold" },
    { class: "uds-body-14", label: "Body 14" },
    { class: "uds-body-14-medium", label: "Body 14 Medium" },
    { class: "uds-body-14-semibold", label: "Body 14 Semibold" },
    { class: "uds-body-14-bold", label: "Body 14 Bold" },
    { class: "uds-body-12", label: "Body 12" },
    { class: "uds-body-12-medium", label: "Body 12 Medium" },
    { class: "uds-body-12-semibold", label: "Body 12 Semibold" },
    { class: "uds-body-12-bold", label: "Body 12 Bold" },
  ],
  Paragraph: [
    { class: "uds-paragraph-20", label: "Paragraph 20" },
    { class: "uds-paragraph-20-medium", label: "Paragraph 20 Medium" },
    { class: "uds-paragraph-20-semibold", label: "Paragraph 20 Semibold" },
    { class: "uds-paragraph-20-bold", label: "Paragraph 20 Bold" },
    { class: "uds-paragraph-18", label: "Paragraph 18" },
    { class: "uds-paragraph-18-medium", label: "Paragraph 18 Medium" },
    { class: "uds-paragraph-18-semi-bold", label: "Paragraph 18 Semibold" },
    { class: "uds-paragraph-18-bold", label: "Paragraph 18 Bold" },
    { class: "uds-paragraph-16", label: "Paragraph 16" },
    { class: "uds-paragraph-16-medium", label: "Paragraph 16 Medium" },
    { class: "uds-paragraph-16-semibold", label: "Paragraph 16 Semibold" },
    { class: "uds-paragraph-16-bold", label: "Paragraph 16 Bold" },
    { class: "uds-paragraph-14", label: "Paragraph 14" },
    { class: "uds-paragraph-14-medium", label: "Paragraph 14 Medium" },
    { class: "uds-paragraph-14-semibold", label: "Paragraph 14 Semibold" },
    { class: "uds-paragraph-14-bold", label: "Paragraph 14 Bold" },
    { class: "uds-paragraph-12", label: "Paragraph 12" },
    { class: "uds-paragraph-12-medium", label: "Paragraph 12 Medium" },
    { class: "uds-paragraph-12-semibold", label: "Paragraph 12 Semibold" },
    { class: "uds-paragraph-12-bold", label: "Paragraph 12 Bold" },
  ],
};

export default function TypographyDemo() {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const usageCode = `<h1 className="uds-display-48-semibold">Large Heading</h1>
<p className="uds-body-16">Body text content</p>
<span className="uds-heading-24-bold">Subheading</span>`;

  const namingCode = `.uds-{type}-{size}-{weight}`;

  return (
    <section className="page typography-demo">
      <header className="page__header">
        <div className="page__header-container">
          <Breadcrumb />
          <div className="page__header-info">
            <div className="page__header-content">
              <h1 className="page__header-title">Typography</h1>
              <p className="page__header-description">
                Typography styles for the design system. Use these classes or mixins
            to ensure consistent typography across the application.
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
            <h2 className="demo-group__heading">Typography Classes</h2>
            <p className="demo-group__description">
              Typography classes provide consistent text styling across the design system. 
              Each class includes font size, line height, font family, font weight, and letter spacing.
            </p>
            
            <div style={{ marginTop: "24px", padding: "24px", background: "var(--uds-surface-secondary)", borderRadius: "8px", border: "1px solid var(--uds-border-primary)" }}>
              <h3 style={{ marginTop: 0, marginBottom: "16px" }} className="uds-heading-20-semibold">Usage</h3>
              <p className="uds-body-16" style={{ marginBottom: "16px" }}>
                Apply typography classes directly to HTML elements:
              </p>
              <div className="typography-demo__code-block-wrapper">
                <CopyButton textToCopy={usageCode} />
                <pre className="typography-demo__code-block">
                  <code className="language-markup">{usageCode}</code>
                </pre>
              </div>
            </div>

            <div style={{ marginTop: "24px", padding: "24px", background: "var(--uds-surface-secondary)", borderRadius: "8px", border: "1px solid var(--uds-border-primary)" }}>
              <h3 style={{ marginTop: 0, marginBottom: "16px" }} className="uds-heading-20-semibold">Class Naming Convention</h3>
              <p className="uds-body-16" style={{ marginBottom: "12px" }}>
                Typography classes follow this pattern:
              </p>
              <div className="typography-demo__code-block-wrapper">
                <CopyButton textToCopy={namingCode} />
                <pre className="typography-demo__code-block">
                  <code className="language-css">{namingCode}</code>
                </pre>
              </div>
              <ul style={{ marginTop: "16px", paddingLeft: "24px" }} className="uds-body-16">
                <li><strong>type</strong>: display, heading, body, or paragraph</li>
                <li><strong>size</strong>: Font size in pixels (e.g., 128, 96, 48, 32, 24, 20, 16, 14, 12)</li>
                <li><strong>weight</strong>: Optional - medium, semibold, or bold (default is regular/400)</li>
              </ul>
            </div>

            <div style={{ marginTop: "24px", padding: "24px", background: "var(--uds-surface-secondary)", borderRadius: "8px", border: "1px solid var(--uds-border-primary)" }}>
              <h3 style={{ marginTop: 0, marginBottom: "16px" }} className="uds-heading-20-semibold">Available Types</h3>
              <ul style={{ marginTop: "0", paddingLeft: "24px" }} className="uds-body-16">
                <li><strong>Display</strong>: Large, attention-grabbing text for hero sections (128px, 96px, 72px, 60px, 48px, 36px)</li>
                <li><strong>Heading</strong>: Section headings and titles (32px, 28px, 24px, 20px)</li>
                <li><strong>Body</strong>: Standard text content (20px, 16px, 14px, 12px)</li>
                <li><strong>Paragraph</strong>: Long-form content with optimized line spacing (20px, 18px, 16px, 14px, 12px)</li>
              </ul>
            </div>
          </div>

          {Object.entries(TYPOGRAPHY_STYLES).map(([category, styles]) => (
            <div key={category} className="demo-group">
              <h2 className="demo-group__heading">{category}</h2>
              <p className="demo-group__description">
                {category} typography styles with various weights and sizes.
              </p>
              <Flex direction="column" gap="16">
                {styles.map((style) => (
                  <div key={style.class} style={{ padding: "16px", background: "var(--uds-surface-secondary)", borderRadius: "8px", border: "1px solid var(--uds-border-primary)" }}>
                    <p className={style.class} style={{ margin: 0 }}>
                      {style.label}
                    </p>
                    <code style={{ fontSize: "12px", color: "var(--uds-text-tertiary)", marginTop: "8px", display: "block", fontFamily: "Monaco, Menlo, 'Ubuntu Mono', monospace" }}>
                      .{style.class}
                    </code>
                  </div>
                ))}
              </Flex>
            </div>
          ))}
        </div>

        <Divider variant="solid" />
      </main>
    </section>
  );
}
