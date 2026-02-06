import React, { useEffect } from "react";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Divider from "../ui/Divider/Divider";
import Flex from "../ui/Flex/Flex";
import { formatLastUpdated } from "../utils/formatDate";
import CopyButton from "../ui/CopyButton/CopyButton";
import Prism from "prismjs";
import "../styles/prism-custom.css";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-css";
import "./Installation.scss";

export default function ComponentsUsage() {
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
              <h1 className="page__header-title">Using Components</h1>
              <p className="page__header-description">
                Learn how to install and import components from the design system npm package.
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
            <h2 className="demo-group__heading">Installation</h2>
            <p className="demo-group__description">
              Install the design system package from npm:
            </p>
            <div style={{ 
              marginTop: "16px", 
              padding: "24px", 
              background: "var(--uds-surface-secondary)", 
              borderRadius: "8px", 
              border: "1px solid var(--uds-border-primary)" 
            }}>
              <h3 className="uds-heading-20-semibold" style={{ marginTop: 0, marginBottom: "12px" }}>
                npm
              </h3>
              <div className="installation__code-block-wrapper">
                <CopyButton codeString={`npm install @chg/design-system`} />
                <pre className="code-block">
                  <code className="language-bash">{`npm install @chg/design-system`}</code>
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
                yarn
              </h3>
              <div className="installation__code-block-wrapper">
                <CopyButton codeString={`yarn add @chg/design-system`} />
                <pre className="code-block">
                  <code className="language-bash">{`yarn add @chg/design-system`}</code>
                </pre>
              </div>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Import Styles</h2>
            <p className="demo-group__description">
              Import the design system CSS in your application's entry point (e.g., <code>index.js</code> or <code>App.js</code>):
            </p>
            <div style={{ 
              marginTop: "16px", 
              padding: "24px", 
              background: "var(--uds-surface-secondary)", 
              borderRadius: "8px", 
              border: "1px solid var(--uds-border-primary)" 
            }}>
              <div className="installation__code-block-wrapper">
                <CopyButton codeString={`// Import tokens (CSS custom properties)
import '@chg/design-system/tokens.css';

// Or import the full stylesheet (includes tokens + typography + utilities)
import '@chg/design-system/styles.css';`} />
                <pre className="code-block">
                  <code className="language-javascript">{`// Import tokens (CSS custom properties)
import '@chg/design-system/tokens.css';

// Or import the full stylesheet (includes tokens + typography + utilities)
import '@chg/design-system/styles.css';`}</code>
                </pre>
              </div>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Import Components</h2>
            <p className="demo-group__description">
              Import individual components as needed:
            </p>
            <div style={{ 
              marginTop: "16px", 
              padding: "24px", 
              background: "var(--uds-surface-secondary)", 
              borderRadius: "8px", 
              border: "1px solid var(--uds-border-primary)" 
            }}>
              <h3 className="uds-heading-20-semibold" style={{ marginTop: 0, marginBottom: "12px" }}>
                Named Imports (Recommended)
              </h3>
              <div className="installation__code-block-wrapper">
                <CopyButton codeString={`import { Button, Input, Checkbox, Avatar } from '@chg/design-system';`} />
                <pre className="code-block">
                  <code className="language-javascript">{`import { Button, Input, Checkbox, Avatar } from '@chg/design-system';`}</code>
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
                Individual Imports (Tree-shaking)
              </h3>
              <div className="installation__code-block-wrapper">
                <CopyButton codeString={`import Button from '@chg/design-system/Button';
import Input from '@chg/design-system/Input';
import Checkbox from '@chg/design-system/Checkbox';`} />
                <pre className="code-block">
                  <code className="language-javascript">{`import Button from '@chg/design-system/Button';
import Input from '@chg/design-system/Input';
import Checkbox from '@chg/design-system/Checkbox';`}</code>
                </pre>
              </div>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Basic Usage Example</h2>
            <p className="demo-group__description">
              Here's a complete example of a simple form using design system components:
            </p>
            <div style={{ 
              marginTop: "16px", 
              padding: "24px", 
              background: "var(--uds-surface-secondary)", 
              borderRadius: "8px", 
              border: "1px solid var(--uds-border-primary)" 
            }}>
              <div className="installation__code-block-wrapper">
                <CopyButton codeString={`import React, { useState } from 'react';
import { Button, Input, Checkbox, Flex } from '@chg/design-system';
import '@chg/design-system/styles.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, remember });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" gap="16">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <Checkbox
          label="Remember me"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
        />
        <Button
          appearance="primary"
          label="Sign In"
          type="submit"
        />
      </Flex>
    </form>
  );
}`} />
                <pre className="code-block">
                  <code className="language-jsx">{`import React, { useState } from 'react';
import { Button, Input, Checkbox, Flex } from '@chg/design-system';
import '@chg/design-system/styles.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, remember });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" gap="16">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <Checkbox
          label="Remember me"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
        />
        <Button
          appearance="primary"
          label="Sign In"
          type="submit"
        />
      </Flex>
    </form>
  );
}`}</code>
                </pre>
              </div>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Available Components</h2>
            <p className="demo-group__description">
              The design system includes the following components:
            </p>
            <div style={{ marginTop: "16px" }}>
              <Flex wrap="wrap" gap="8">
                {[
                  'Accordion', 'ActionMenu', 'Avatar', 'Badge', 'Breadcrumb',
                  'Button', 'Checkbox', 'Chip', 'Datepicker', 'Divider',
                  'DotStatus', 'Dropdown', 'Field', 'FileUpload', 'Flex',
                  'Icon', 'ImageAspect', 'Input', 'Key', 'Menu',
                  'MicroCalendar', 'Pagination', 'PillToggle', 'ProgressCircle',
                  'ProgressIndicator', 'Radio', 'Slider', 'Status', 'Steps',
                  'Table', 'Tabs', 'Tag', 'Textarea', 'Toast', 'Toggle', 'Tooltip'
                ].map(component => (
                  <code 
                    key={component}
                    style={{
                      padding: '4px 8px',
                      background: 'var(--uds-surface-tertiary)',
                      borderRadius: 'var(--uds-radius-4)',
                      fontSize: 'var(--uds-font-size-14)'
                    }}
                  >
                    {component}
                  </code>
                ))}
              </Flex>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">TypeScript Support</h2>
            <p className="demo-group__description">
              All components include TypeScript definitions. Import types directly:
            </p>
            <div style={{ 
              marginTop: "16px", 
              padding: "24px", 
              background: "var(--uds-surface-secondary)", 
              borderRadius: "8px", 
              border: "1px solid var(--uds-border-primary)" 
            }}>
              <div className="installation__code-block-wrapper">
                <CopyButton codeString={`import type { ButtonProps, InputProps } from '@chg/design-system';

// Use types for custom components
interface MyButtonProps extends ButtonProps {
  customProp?: string;
}`} />
                <pre className="code-block">
                  <code className="language-javascript">{`import type { ButtonProps, InputProps } from '@chg/design-system';

// Use types for custom components
interface MyButtonProps extends ButtonProps {
  customProp?: string;
}`}</code>
                </pre>
              </div>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Setting Up Theming</h2>
            <p className="demo-group__description">
              Configure the brand and mode attributes on your root HTML element to enable theming:
            </p>
            <div style={{ 
              marginTop: "16px", 
              padding: "24px", 
              background: "var(--uds-surface-secondary)", 
              borderRadius: "8px", 
              border: "1px solid var(--uds-border-primary)" 
            }}>
              <div className="installation__code-block-wrapper">
                <CopyButton codeString={`// In your App.js or index.js
useEffect(() => {
  document.documentElement.setAttribute('data-brand', 'design-system');
  document.documentElement.setAttribute('data-mode', 'light'); // or 'dark'
}, []);`} />
                <pre className="code-block">
                  <code className="language-jsx">{`// In your App.js or index.js
useEffect(() => {
  document.documentElement.setAttribute('data-brand', 'design-system');
  document.documentElement.setAttribute('data-mode', 'light'); // or 'dark'
}, []);`}</code>
                </pre>
              </div>
              <p className="uds-body-14" style={{ marginTop: "16px", marginBottom: 0 }}>
                Available brands: <code>design-system</code>, <code>comphealth</code>, <code>locumsmart</code>, 
                <code>modio</code>, <code>wireframe</code>, <code>connect</code>, <code>weatherby</code>
              </p>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Next Steps</h2>
            <Flex direction="column" gap="12">
              <div>
                <a href="/buttons" className="uds-body-16-semibold" style={{ color: "var(--uds-text-brand-primary)" }}>
                  → Button Component
                </a>
                <p className="uds-body-14" style={{ marginTop: "4px", color: "var(--uds-text-secondary)" }}>
                  View all button variants and usage examples
                </p>
              </div>
              <div>
                <a href="/input" className="uds-body-16-semibold" style={{ color: "var(--uds-text-brand-primary)" }}>
                  → Input Component
                </a>
                <p className="uds-body-14" style={{ marginTop: "4px", color: "var(--uds-text-secondary)" }}>
                  Learn about text inputs, labels, and validation
                </p>
              </div>
              <div>
                <a href="/getting-started/tokens" className="uds-body-16-semibold" style={{ color: "var(--uds-text-brand-primary)" }}>
                  → CSS Tokens Usage
                </a>
                <p className="uds-body-14" style={{ marginTop: "4px", color: "var(--uds-text-secondary)" }}>
                  Use design tokens for custom styling
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
