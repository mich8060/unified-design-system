import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button/Button";
import Icon from "../ui/Icon/Icon";
import Flex from "../ui/Flex/Flex";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import { formatLastUpdated } from "../utils/formatDate";
import Divider from "../ui/Divider/Divider";
import CopyButton from "../ui/CopyButton/CopyButton";
import Prism from "prismjs";
import "../styles/prism-custom.css";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-javascript";
import "./ButtonDemo.scss";

const appearances = [
  "primary",
  "soft",
  "outline",
  "text",
  "ghost",
  "destructive",
  "disabled",
];
const layouts = ["label-only", "icon-left", "icon-right", "icon-only"];
const sizes = ["large", "default", "small", "xsmall"];

export default function ButtonDemo() {
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
              <h1 className="page__header-title">Button</h1>
              <p className="page__header-description">
                The Button component provides a flexible, accessible way to
                create interactive buttons with various appearance styles,
                sizes, and icon layouts. Icon sizes are automatically controlled
                through CSS based on the button size. Hover or focus the buttons
                to observe their interactive state styling.
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
              The appearance prop controls the visual style of the button. Choose from primary for main actions, soft for secondary actions, outline for outlined buttons, text for text-only buttons, ghost for minimal style, destructive for dangerous actions, or disabled for non-interactive states.
            </p>
            <Flex direction="row" gap="16" wrap={true} className="demo-grid">
              {appearances.map((appearance) => (
                <Button
                  key={appearance}
                  appearance={appearance}
                  label={appearance}
                />
              ))}
            </Flex>
            <div className="button-demo__code-block-wrapper">
              <CopyButton codeString={`import Button from "../ui/Button/Button";

// Basic button with appearance
<Button appearance="primary" label="Primary" />
<Button appearance="soft" label="Soft" />
<Button appearance="outline" label="Outline" />
<Button appearance="text" label="Text" />
<Button appearance="ghost" label="Ghost" />
<Button appearance="destructive" label="Destructive" />
<Button appearance="disabled" label="Disabled" />

// With onClick handler
<Button 
  appearance="primary" 
  label="Click Me" 
  onClick={() => console.log("Button clicked")} 
/>`} />
              <pre className="button-demo__code-block">
                <code className="language-jsx">{`import Button from "../ui/Button/Button";

// Basic button with appearance
<Button appearance="primary" label="Primary" />
<Button appearance="soft" label="Soft" />
<Button appearance="outline" label="Outline" />
<Button appearance="text" label="Text" />
<Button appearance="ghost" label="Ghost" />
<Button appearance="destructive" label="Destructive" />
<Button appearance="disabled" label="Disabled" />

// With onClick handler
<Button 
  appearance="primary" 
  label="Click Me" 
  onClick={() => console.log("Button clicked")} 
/>`}</code>
              </pre>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Sizes</h2>
            <p className="demo-group__description">
              The size prop controls the button dimensions and padding. Icon sizes are automatically controlled through CSS. Available sizes include large (20px icons), default (16px icons), small (14px icons), and xsmall (12px icons).
            </p>
            <Flex direction="row" gap="16" wrap={true} className="demo-grid">
              {sizes.map((size) => (
                <Button
                  key={size}
                  appearance="primary"
                  size={size}
                  label={size}
                />
              ))}
            </Flex>
            <div className="button-demo__code-block-wrapper">
              <CopyButton codeString={`import Button from "../ui/Button/Button";

// Different sizes (icons automatically scale)
<Button appearance="primary" size="large" label="Large" />
<Button appearance="primary" size="default" label="Default" />
<Button appearance="primary" size="small" label="Small" />
<Button appearance="primary" size="xsmall" label="XSmall" />

// Size affects icon dimensions:
// - large: 20px icons
// - default: 16px icons
// - small: 14px icons
// - xsmall: 12px icons`} />
              <pre className="button-demo__code-block">
                <code className="language-jsx">{`import Button from "../ui/Button/Button";

// Different sizes (icons automatically scale)
<Button appearance="primary" size="large" label="Large" />
<Button appearance="primary" size="default" label="Default" />
<Button appearance="primary" size="small" label="Small" />
<Button appearance="primary" size="xsmall" label="XSmall" />

// Size affects icon dimensions:
// - large: 20px icons
// - default: 16px icons
// - small: 14px icons
// - xsmall: 12px icons`}</code>
              </pre>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Layouts</h2>
            <p className="demo-group__description">
              The layout prop controls how button content is arranged. When using icons, pass the icon name as a string to the icon prop. Options include label-only (text only, no icon), icon-left (icon before label), icon-right (icon after label), and icon-only (only icon visible, requires aria-label for accessibility).
            </p>
            <Flex direction="row" gap="16" wrap={true} className="demo-grid">
              {layouts.map((layout) => (
                <Button
                  key={layout}
                  appearance="primary"
                  layout={layout}
                  label="Primary"
                  icon="Square"
                />
              ))}
            </Flex>
            <div className="button-demo__code-block-wrapper">
              <CopyButton codeString={`import Button from "../ui/Button/Button";

// Label only (default)
<Button appearance="primary" label="Label Only" />

// Icon on the left
<Button 
  appearance="primary" 
  layout="icon-left" 
  label="Icon Left" 
  icon="Square" 
/>

// Icon on the right
<Button 
  appearance="primary" 
  layout="icon-right" 
  label="Icon Right" 
  icon="Square" 
/>

// Icon only (requires aria-label for accessibility)
<Button 
  appearance="primary" 
  layout="icon-only" 
  icon="Square" 
  aria-label="Square icon button" 
/>`} />
              <pre className="button-demo__code-block">
                <code className="language-jsx">{`import Button from "../ui/Button/Button";

// Label only (default)
<Button appearance="primary" label="Label Only" />

// Icon on the left
<Button 
  appearance="primary" 
  layout="icon-left" 
  label="Icon Left" 
  icon="Square" 
/>

// Icon on the right
<Button 
  appearance="primary" 
  layout="icon-right" 
  label="Icon Right" 
  icon="Square" 
/>

// Icon only (requires aria-label for accessibility)
<Button 
  appearance="primary" 
  layout="icon-only" 
  icon="Square" 
  aria-label="Square icon button" 
/>`}</code>
              </pre>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Size & Layout Combinations</h2>
            <p className="demo-group__description">
              Icons automatically scale with button size. The SVG icon dimensions are controlled through CSS, so you don't need to specify icon sizes manually when using the icon prop with a string value.
            </p>

            <h3>Large Size (20px icons)</h3>
            <Flex direction="row" gap="16" wrap={true}>
              <Button
                appearance="primary"
                size="large"
                label="Large"
                icon="Square"
              />
              <Button
                appearance="primary"
                layout="icon-left"
                size="large"
                label="Large"
                icon="Square"
              />
              <Button
                appearance="primary"
                layout="icon-right"
                size="large"
                label="Large"
                icon="Square"
              />
              <Button
                appearance="primary"
                layout="icon-only"
                size="large"
                label="Large"
                icon="Square"
              />
            </Flex>

            <h3>Default Size (16px icons)</h3>
            <Flex direction="row" gap="16" wrap={true}>
              <Button appearance="primary" label="Default" />
              <Button
                appearance="primary"
                layout="icon-left"
                label="Default"
                icon="Square"
              />
              <Button
                appearance="primary"
                layout="icon-right"
                label="Default"
                icon="Square"
              />
              <Button
                appearance="primary"
                layout="icon-only"
                label="Default"
                icon="Square"
              />
            </Flex>

            <h3>Small Size (14px icons)</h3>
            <Flex direction="row" gap="16" wrap={true}>
              <Button
                appearance="primary"
                size="small"
                label="Small"
                icon="Square"
              />
              <Button
                appearance="primary"
                layout="icon-left"
                size="small"
                label="Small"
                icon="Square"
              />
              <Button
                appearance="primary"
                layout="icon-right"
                size="small"
                label="Small"
                icon="Square"
              />
              <Button
                appearance="primary"
                layout="icon-only"
                size="small"
                label="Small"
                icon="Square"
              />
            </Flex>

            <h3>XSmall Size (12px icons)</h3>
            <Flex direction="row" gap="16" wrap={true}>
              <Button
                appearance="primary"
                size="xsmall"
                label="XSmall"
                icon="Square"
              />
              <Button
                appearance="primary"
                layout="icon-left"
                size="xsmall"
                label="XSmall"
                icon="Square"
              />
              <Button
                appearance="primary"
                layout="icon-right"
                size="xsmall"
                label="XSmall"
                icon="Square"
              />
              <Button
                appearance="primary"
                layout="icon-only"
                size="xsmall"
                label="XSmall"
                icon="Square"
              />
            </Flex>
            <div className="button-demo__code-block-wrapper">
              <CopyButton codeString={`import Button from "../ui/Button/Button";

// Combining size and layout
<Button 
  appearance="primary" 
  size="large" 
  layout="icon-left" 
  label="Large with Icon" 
  icon="Square" 
/>

<Button 
  appearance="primary" 
  size="default" 
  layout="icon-right" 
  label="Default with Icon" 
  icon="Square" 
/>

<Button 
  appearance="primary" 
  size="small" 
  layout="icon-only" 
  icon="Square" 
  aria-label="Small icon button" 
/>

// Icons automatically scale based on button size
// No need to specify iconSize when using icon prop with string`} />
              <pre className="button-demo__code-block">
                <code className="language-jsx">{`import Button from "../ui/Button/Button";

// Combining size and layout
<Button 
  appearance="primary" 
  size="large" 
  layout="icon-left" 
  label="Large with Icon" 
  icon="Square" 
/>

<Button 
  appearance="primary" 
  size="default" 
  layout="icon-right" 
  label="Default with Icon" 
  icon="Square" 
/>

<Button 
  appearance="primary" 
  size="small" 
  layout="icon-only" 
  icon="Square" 
  aria-label="Small icon button" 
/>

// Icons automatically scale based on button size
// No need to specify iconSize when using icon prop with string`}</code>
              </pre>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Icon Weights</h2>
            <p className="demo-group__description">
              To customize the icon weight, pass an Icon component directly instead of a string. Available weights: regular, bold, thin, light, duotone, and fill.
            </p>
            <Flex direction="row" gap="16" wrap={true} className="demo-grid">
              <Button
                appearance="outline"
                layout="icon-left"
                label="Regular"
                icon={<Icon name="Star" size={16} appearance="regular" />}
              />
              <Button
                appearance="outline"
                layout="icon-left"
                label="Bold"
                icon={<Icon name="Star" size={16} appearance="bold" />}
              />
              <Button
                appearance="outline"
                layout="icon-left"
                label="Light"
                icon={<Icon name="Star" size={16} appearance="light" />}
              />
              <Button
                appearance="outline"
                layout="icon-left"
                label="Fill"
                icon={<Icon name="Star" size={16} appearance="fill" />}
              />
              <Button
                appearance="outline"
                layout="icon-left"
                label="Duotone"
                icon={<Icon name="Star" size={16} appearance="duotone" />}
              />
            </Flex>
            <div className="button-demo__code-block-wrapper">
              <CopyButton codeString={`import Button from "../ui/Button/Button";
import Icon from "../ui/Icon/Icon";

// Default (regular weight) - using string
<Button layout="icon-left" label="Regular" icon="Star" />

// Bold weight - pass Icon component directly
<Button
  layout="icon-left"
  label="Bold"
  icon={<Icon name="Star" size={16} appearance="bold" />}
/>

// Light weight
<Button
  layout="icon-left"
  label="Light"
  icon={<Icon name="Star" size={16} appearance="light" />}
/>

// Fill weight (solid)
<Button
  layout="icon-left"
  label="Fill"
  icon={<Icon name="Star" size={16} appearance="fill" />}
/>

// Duotone weight
<Button
  layout="icon-left"
  label="Duotone"
  icon={<Icon name="Star" size={16} appearance="duotone" />}
/>`} />
              <pre className="button-demo__code-block">
                <code className="language-jsx">{`import Button from "../ui/Button/Button";
import Icon from "../ui/Icon/Icon";

// Default (regular weight) - using string
<Button layout="icon-left" label="Regular" icon="Star" />

// Bold weight - pass Icon component directly
<Button
  layout="icon-left"
  label="Bold"
  icon={<Icon name="Star" size={16} appearance="bold" />}
/>

// Light weight
<Button
  layout="icon-left"
  label="Light"
  icon={<Icon name="Star" size={16} appearance="light" />}
/>

// Fill weight (solid)
<Button
  layout="icon-left"
  label="Fill"
  icon={<Icon name="Star" size={16} appearance="fill" />}
/>

// Duotone weight
<Button
  layout="icon-left"
  label="Duotone"
  icon={<Icon name="Star" size={16} appearance="duotone" />}
/>`}</code>
              </pre>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Complete Example</h2>
            <p className="demo-group__description">
              A complete example showing all Button features working together.
            </p>
            <Flex direction="row" gap="16" wrap={true} className="demo-grid">
              <Button
                appearance="primary"
                size="default"
                layout="icon-left"
                label="Save"
                icon="FloppyDisk"
                onClick={() => console.log("Save clicked")}
              />
              <Button
                appearance="outline"
                size="default"
                layout="icon-right"
                label="Cancel"
                icon="X"
                onClick={() => console.log("Cancel clicked")}
              />
              <Button
                appearance="ghost"
                size="small"
                layout="icon-only"
                icon="Trash"
                aria-label="Delete"
                onClick={() => console.log("Delete clicked")}
              />
            </Flex>
            <div className="button-demo__code-block-wrapper">
              <CopyButton codeString={`import Button from "../ui/Button/Button";

function MyComponent() {
  const handleSave = () => {
    console.log("Save clicked");
    // Save logic here
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
    // Cancel logic here
  };

  const handleDelete = () => {
    console.log("Delete clicked");
    // Delete logic here
  };

  return (
    <div>
      <Button
        appearance="primary"
        size="default"
        layout="icon-left"
        label="Save"
        icon="FloppyDisk"
        onClick={handleSave}
      />
      <Button
        appearance="outline"
        size="default"
        layout="icon-right"
        label="Cancel"
        icon="X"
        onClick={handleCancel}
      />
      <Button
        appearance="ghost"
        size="small"
        layout="icon-only"
        icon="Trash"
        aria-label="Delete"
        onClick={handleDelete}
      />
    </div>
  );
}`} />
              <pre className="button-demo__code-block">
                <code className="language-jsx">{`import Button from "../ui/Button/Button";

function MyComponent() {
  const handleSave = () => {
    console.log("Save clicked");
    // Save logic here
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
    // Cancel logic here
  };

  const handleDelete = () => {
    console.log("Delete clicked");
    // Delete logic here
  };

  return (
    <div>
      <Button
        appearance="primary"
        size="default"
        layout="icon-left"
        label="Save"
        icon="FloppyDisk"
        onClick={handleSave}
      />
      <Button
        appearance="outline"
        size="default"
        layout="icon-right"
        label="Cancel"
        icon="X"
        onClick={handleCancel}
      />
      <Button
        appearance="ghost"
        size="small"
        layout="icon-only"
        icon="Trash"
        aria-label="Delete"
        onClick={handleDelete}
      />
    </div>
  );
}`}</code>
              </pre>
            </div>
          </div>
        </div>

        <Divider variant="solid" />

        <div className="page__tabs-content-container">
          <div className="demo-group">
            <div className="page__navigation">
              <Link
                to="/breadcrumb"
                className="page__nav-link page__nav-link--prev"
              >
                <span className="page__nav-label">Previous</span>
                <span className="page__nav-title">Breadcrumb</span>
              </Link>
              <Link
                to="/calendar"
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
