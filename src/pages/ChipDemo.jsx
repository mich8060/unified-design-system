import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Chip from "../ui/Chip/Chip";
import Flex from "../ui/Flex/Flex";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Divider from "../ui/Divider/Divider";
import { formatLastUpdated } from "../utils/formatDate";
import CopyButton from "../ui/CopyButton/CopyButton";
import Prism from "prismjs";
import "../styles/prism-custom.css";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-javascript";
import "./ChipDemo.scss";

const appearances = ["outline", "primary"];
const shapes = ["pill", "rounded"];

export default function ChipDemo() {
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
              <h1 className="page__header-title">Chip</h1>
              <p className="page__header-description">
                The Chip component is used to display labels, tags, or filters. It
                supports various appearance styles, shapes, and icon placements. Hover
                or click the chips to observe their interactive state styling.
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
            <h2 className="demo-group__heading">Appearances</h2>
            <p className="demo-group__description">
              The appearance prop controls the visual style of the chip. Choose from outline for a bordered style or primary for a filled style with brand colors.
            </p>
            <Flex direction="row" gap="16" wrap={true} className="demo-content">
              {appearances.map((appearance) => (
                <Chip
                  key={appearance}
                  label={appearance}
                  appearance={appearance}
                />
              ))}
            </Flex>
            <div className="chip-demo__code-block-wrapper">
              <CopyButton codeString={`import Chip from "../ui/Chip/Chip";

// Outline style (default)
<Chip label="outline" appearance="outline" />

// Primary style with brand colors
<Chip label="primary" appearance="primary" />`} />
              <pre className="chip-demo__code-block">
                <code className="language-jsx">{`import Chip from "../ui/Chip/Chip";

// Outline style (default)
<Chip label="outline" appearance="outline" />

// Primary style with brand colors
<Chip label="primary" appearance="primary" />`}</code>
              </pre>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Shapes</h2>
            <p className="demo-group__description">
              The shape prop controls the border radius of the chip. Choose from pill for fully rounded corners or rounded for slightly rounded corners.
            </p>
            <Flex direction="row" gap="16" wrap={true} className="demo-content">
              {shapes.map((shape) => (
                <Chip
                  key={shape}
                  label={shape}
                  shape={shape}
                  appearance="outline"
                />
              ))}
            </Flex>
            <div className="chip-demo__code-block-wrapper">
              <CopyButton codeString={`import Chip from "../ui/Chip/Chip";

// Pill shape (fully rounded)
<Chip label="pill" shape="pill" />

// Rounded shape (slightly rounded corners)
<Chip label="rounded" shape="rounded" />`} />
              <pre className="chip-demo__code-block">
                <code className="language-jsx">{`import Chip from "../ui/Chip/Chip";

// Pill shape (fully rounded)
<Chip label="pill" shape="pill" />

// Rounded shape (slightly rounded corners)
<Chip label="rounded" shape="rounded" />`}</code>
              </pre>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">With Icons</h2>
            <p className="demo-group__description">
              Chips can display icons on the left, right, or both sides. Icons are useful for actions like closing or filtering.
            </p>
            <Flex direction="row" gap="16" wrap={true} className="demo-content">
              <Chip
                label="Left icon"
                icon="Funnel"
                iconPlacement="left"
              />
              <Chip
                label="Right icon"
                icon="X"
                iconPlacement="right"
              />
              <Chip
                label="Both icons"
                icon="Funnel"
                iconPlacement="both"
              />
            </Flex>
            <div className="chip-demo__code-block-wrapper">
              <CopyButton codeString={`import Chip from "../ui/Chip/Chip";

// Icon on the left
<Chip label="Left icon" icon="Funnel" iconPlacement="left" />

// Icon on the right (common for remove/close actions)
<Chip label="Right icon" icon="X" iconPlacement="right" />

// Icons on both sides
<Chip label="Both icons" icon="Funnel" iconPlacement="both" />`} />
              <pre className="chip-demo__code-block">
                <code className="language-jsx">{`import Chip from "../ui/Chip/Chip";

// Icon on the left
<Chip label="Left icon" icon="Funnel" iconPlacement="left" />

// Icon on the right (common for remove/close actions)
<Chip label="Right icon" icon="X" iconPlacement="right" />

// Icons on both sides
<Chip label="Both icons" icon="Funnel" iconPlacement="both" />`}</code>
              </pre>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">With Badges</h2>
            <p className="demo-group__description">
              Chips can display a badge count to indicate quantity or notifications. Badges appear on the right side of the chip.
            </p>
            <Flex direction="row" gap="16" wrap={true} className="demo-content">
              <Chip
                label="Notifications"
                badge={5}
                badgeVariant="red"
              />
              <Chip
                label="Messages"
                badge={12}
                badgeVariant="blue"
              />
              <Chip
                label="Items"
                badge={99}
                badgeVariant="green"
              />
            </Flex>
            <div className="chip-demo__code-block-wrapper">
              <CopyButton codeString={`import Chip from "../ui/Chip/Chip";

// Chip with red badge
<Chip label="Notifications" badge={5} badgeVariant="red" />

// Chip with blue badge
<Chip label="Messages" badge={12} badgeVariant="blue" />

// Chip with green badge
<Chip label="Items" badge={99} badgeVariant="green" />`} />
              <pre className="chip-demo__code-block">
                <code className="language-jsx">{`import Chip from "../ui/Chip/Chip";

// Chip with red badge
<Chip label="Notifications" badge={5} badgeVariant="red" />

// Chip with blue badge
<Chip label="Messages" badge={12} badgeVariant="blue" />

// Chip with green badge
<Chip label="Items" badge={99} badgeVariant="green" />`}</code>
              </pre>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Clickable Chips</h2>
            <p className="demo-group__description">
              Chips can be clickable by providing an onClick handler. This is useful for filters, tags, or removable items.
            </p>
            <Flex direction="row" gap="16" wrap={true} className="demo-content">
              <Chip
                label="Clickable chip"
                onClick={() => alert("Chip clicked!")}
              />
              <Chip
                label="Remove"
                icon="X"
                iconPlacement="right"
                onClick={() => alert("Remove clicked!")}
              />
            </Flex>
            <div className="chip-demo__code-block-wrapper">
              <CopyButton codeString={`import Chip from "../ui/Chip/Chip";

// Basic clickable chip
<Chip 
  label="Clickable chip" 
  onClick={() => handleClick()} 
/>

// Removable chip with close icon
<Chip 
  label="Remove" 
  icon="X" 
  iconPlacement="right" 
  onClick={() => handleRemove()} 
/>`} />
              <pre className="chip-demo__code-block">
                <code className="language-jsx">{`import Chip from "../ui/Chip/Chip";

// Basic clickable chip
<Chip 
  label="Clickable chip" 
  onClick={() => handleClick()} 
/>

// Removable chip with close icon
<Chip 
  label="Remove" 
  icon="X" 
  iconPlacement="right" 
  onClick={() => handleRemove()} 
/>`}</code>
              </pre>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Disabled State</h2>
            <p className="demo-group__description">
              Chips can be disabled to prevent interaction. Disabled chips have reduced opacity and cannot be clicked.
            </p>
            <Flex direction="row" gap="16" wrap={true} className="demo-content">
              <Chip
                label="Disabled outline"
                appearance="outline"
                disabled
              />
              <Chip
                label="Disabled primary"
                appearance="primary"
                disabled
              />
              <Chip
                label="Disabled with icon"
                icon="X"
                iconPlacement="right"
                disabled
              />
            </Flex>
            <div className="chip-demo__code-block-wrapper">
              <CopyButton codeString={`import Chip from "../ui/Chip/Chip";

// Disabled outline chip
<Chip label="Disabled outline" appearance="outline" disabled />

// Disabled primary chip
<Chip label="Disabled primary" appearance="primary" disabled />

// Disabled chip with icon
<Chip label="Disabled with icon" icon="X" iconPlacement="right" disabled />`} />
              <pre className="chip-demo__code-block">
                <code className="language-jsx">{`import Chip from "../ui/Chip/Chip";

// Disabled outline chip
<Chip label="Disabled outline" appearance="outline" disabled />

// Disabled primary chip
<Chip label="Disabled primary" appearance="primary" disabled />

// Disabled chip with icon
<Chip label="Disabled with icon" icon="X" iconPlacement="right" disabled />`}</code>
              </pre>
            </div>
          </div>
        </div>

        <Divider variant="solid" />

        <div className="page__tabs-content-container">
          <div className="demo-group">
            <div className="page__navigation">
              <Link
                to="/checkbox"
                className="page__nav-link page__nav-link--prev"
              >
                <span className="page__nav-label">Previous</span>
                <span className="page__nav-title">Checkbox</span>
              </Link>
              <Link
                to="/datepicker"
                className="page__nav-link page__nav-link--next"
              >
                <span className="page__nav-label">Next</span>
                <span className="page__nav-title">Datepicker</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
