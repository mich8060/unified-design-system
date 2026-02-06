import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Badge from "../ui/Badge/Badge";
import Flex from "../ui/Flex/Flex";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Divider from "../ui/Divider/Divider";
import { formatLastUpdated } from "../utils/formatDate";
import CopyButton from "../ui/CopyButton/CopyButton";
import Prism from "prismjs";
import "../styles/prism-custom.css";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-javascript";
import "./BadgeDemo.scss";

const variants = [
  "red",
  "orange",
  "yellow",
  "green",
  "dark-green",
  "blue",
  "dark-blue",
  "purple",
  "pink",
  "gray",
  "outline",
];

export default function BadgeDemo() {
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
              <h1 className="page__header-title">Badge</h1>
              <p className="page__header-description">
                The Badge component displays numerical counts in a compact,
                pill-shaped format. Badges are perfect for showing notification
                counts, item quantities, or status indicators.
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
                <p className="page__metadata-value">
                  {formatLastUpdated()}
                </p>
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
            <h2 className="demo-group__heading">Variants</h2>
            <p className="demo-group__description">
              Badge variants provide different color schemes for various use cases. Choose from red, orange, yellow, green, dark-green, blue, dark-blue, purple, pink, gray, or outline.
            </p>
            <Flex direction="row" gap="16" wrap={true} className="demo-grid">
              {variants.map((variant) => (
                <Badge key={variant} count={5} variant={variant} />
              ))}
            </Flex>
            <div className="badge-demo__code-block-wrapper">
              <CopyButton codeString={`import Badge from "../ui/Badge/Badge";

// Color variants
<Badge count={5} variant="red" />
<Badge count={5} variant="orange" />
<Badge count={5} variant="yellow" />
<Badge count={5} variant="green" />
<Badge count={5} variant="dark-green" />
<Badge count={5} variant="blue" />
<Badge count={5} variant="dark-blue" />
<Badge count={5} variant="purple" />
<Badge count={5} variant="pink" />
<Badge count={5} variant="gray" />
<Badge count={5} variant="outline" />`} />
              <pre className="badge-demo__code-block">
                <code className="language-jsx">{`import Badge from "../ui/Badge/Badge";

// Color variants
<Badge count={5} variant="red" />
<Badge count={5} variant="orange" />
<Badge count={5} variant="yellow" />
<Badge count={5} variant="green" />
<Badge count={5} variant="dark-green" />
<Badge count={5} variant="blue" />
<Badge count={5} variant="dark-blue" />
<Badge count={5} variant="purple" />
<Badge count={5} variant="pink" />
<Badge count={5} variant="gray" />
<Badge count={5} variant="outline" />`}</code>
              </pre>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Count Values</h2>
            <p className="demo-group__description">
              Badges display numerical counts. Use them to show notification counts, quantities, or any numeric indicator.
            </p>
            <Flex direction="row" gap="16" wrap={true} className="demo-grid">
              <Badge count={1} variant="blue" />
              <Badge count={5} variant="blue" />
              <Badge count={10} variant="blue" />
              <Badge count={99} variant="blue" />
              <Badge count={100} variant="blue" />
            </Flex>
            <div className="badge-demo__code-block-wrapper">
              <CopyButton codeString={`import Badge from "../ui/Badge/Badge";

<Badge count={1} variant="blue" />
<Badge count={5} variant="blue" />
<Badge count={10} variant="blue" />
<Badge count={99} variant="blue" />
<Badge count={100} variant="blue" />`} />
              <pre className="badge-demo__code-block">
                <code className="language-jsx">{`import Badge from "../ui/Badge/Badge";

<Badge count={1} variant="blue" />
<Badge count={5} variant="blue" />
<Badge count={10} variant="blue" />
<Badge count={99} variant="blue" />
<Badge count={100} variant="blue" />`}</code>
              </pre>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Use Cases</h2>
            <p className="demo-group__description">
              Common use cases for badges include notification indicators, status counts, and item quantities.
            </p>
            <Flex direction="row" gap="24" wrap={true} className="demo-grid">
              <Flex direction="row" gap="8" alignItems="center">
                <span>Messages</span>
                <Badge count={3} variant="red" />
              </Flex>
              <Flex direction="row" gap="8" alignItems="center">
                <span>Tasks</span>
                <Badge count={12} variant="orange" />
              </Flex>
              <Flex direction="row" gap="8" alignItems="center">
                <span>Completed</span>
                <Badge count={8} variant="green" />
              </Flex>
              <Flex direction="row" gap="8" alignItems="center">
                <span>Pending</span>
                <Badge count={5} variant="gray" />
              </Flex>
            </Flex>
            <div className="badge-demo__code-block-wrapper">
              <CopyButton codeString={`import Badge from "../ui/Badge/Badge";

// Notification indicator
<Flex direction="row" gap="8" alignItems="center">
  <span>Messages</span>
  <Badge count={3} variant="red" />
</Flex>

// Task count
<Flex direction="row" gap="8" alignItems="center">
  <span>Tasks</span>
  <Badge count={12} variant="orange" />
</Flex>

// Status indicator
<Flex direction="row" gap="8" alignItems="center">
  <span>Completed</span>
  <Badge count={8} variant="green" />
</Flex>`} />
              <pre className="badge-demo__code-block">
                <code className="language-jsx">{`import Badge from "../ui/Badge/Badge";

// Notification indicator
<Flex direction="row" gap="8" alignItems="center">
  <span>Messages</span>
  <Badge count={3} variant="red" />
</Flex>

// Task count
<Flex direction="row" gap="8" alignItems="center">
  <span>Tasks</span>
  <Badge count={12} variant="orange" />
</Flex>

// Status indicator
<Flex direction="row" gap="8" alignItems="center">
  <span>Completed</span>
  <Badge count={8} variant="green" />
</Flex>`}</code>
              </pre>
            </div>
          </div>
        </div>

        <Divider variant="solid" />

        <div className="page__tabs-content-container">
          <div className="demo-group">
            <div className="page__navigation">
              <Link
                to="/avatar"
                className="page__nav-link page__nav-link--prev"
              >
                <span className="page__nav-label">Previous</span>
                <span className="page__nav-title">Avatar</span>
              </Link>

              <Link
                to="/branding"
                className="page__nav-link page__nav-link--next"
              >
                <span className="page__nav-label">Next</span>
                <span className="page__nav-title">Branding</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
