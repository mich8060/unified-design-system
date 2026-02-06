import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ActionMenu from "../ui/ActionMenu/ActionMenu";
import Icon from "../ui/Icon/Icon";
import Flex from "../ui/Flex/Flex";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import { formatLastUpdated } from "../utils/formatDate";
import Divider from "../ui/Divider/Divider";
import CopyButton from "../ui/CopyButton/CopyButton";
import Button from "../ui/Button/Button";
import Prism from "prismjs";
import "../styles/prism-custom.css";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-javascript";
import "./ActionMenuDemo.scss";

export default function ActionMenuDemo() {
  const [selectedAction, setSelectedAction] = useState(null);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const basicItems = [
    {
      id: "edit",
      label: "Edit",
      icon: "Pencil",
      onClick: () => setSelectedAction("Edit"),
    },
    {
      id: "duplicate",
      label: "Duplicate",
      icon: "Copy",
      onClick: () => setSelectedAction("Duplicate"),
    },
    {
      id: "delete",
      label: "Delete",
      icon: "Trash",
      onClick: () => setSelectedAction("Delete"),
    },
  ];

  const itemsWithDivider = [
    {
      id: "edit",
      label: "Edit",
      icon: "Pencil",
      onClick: () => setSelectedAction("Edit"),
    },
    {
      id: "duplicate",
      label: "Duplicate",
      icon: "Copy",
      onClick: () => setSelectedAction("Duplicate"),
    },
    { divider: true },
    {
      id: "archive",
      label: "Archive",
      icon: "Archive",
      onClick: () => setSelectedAction("Archive"),
    },
    {
      id: "delete",
      label: "Delete",
      icon: "Trash",
      onClick: () => setSelectedAction("Delete"),
    },
  ];

  const itemsWithDisabled = [
    {
      id: "edit",
      label: "Edit",
      icon: "Pencil",
      onClick: () => setSelectedAction("Edit"),
    },
    {
      id: "duplicate",
      label: "Duplicate",
      icon: "Copy",
      onClick: () => setSelectedAction("Duplicate"),
    },
    {
      id: "delete",
      label: "Delete",
      icon: "Trash",
      disabled: true,
      onClick: () => setSelectedAction("Delete"),
    },
  ];

  const itemsWithDestructive = [
    {
      id: "edit",
      label: "Edit",
      icon: "Pencil",
      onClick: () => setSelectedAction("Edit"),
    },
    {
      id: "duplicate",
      label: "Duplicate",
      icon: "Copy",
      onClick: () => setSelectedAction("Duplicate"),
    },
    { divider: true },
    {
      id: "delete",
      label: "Delete",
      icon: "Trash",
      destructive: true,
      onClick: () => setSelectedAction("Delete"),
    },
  ];

  const itemsWithShortcuts = [
    {
      id: "cut",
      label: "Cut",
      icon: "Scissors",
      shortcut: "⌘X",
      onClick: () => setSelectedAction("Cut"),
    },
    {
      id: "copy",
      label: "Copy",
      icon: "Copy",
      shortcut: "⌘C",
      onClick: () => setSelectedAction("Copy"),
    },
    {
      id: "paste",
      label: "Paste",
      icon: "Clipboard",
      shortcut: "⌘V",
      onClick: () => setSelectedAction("Paste"),
    },
  ];

  const itemsWithSubmenu = [
    {
      id: "edit",
      label: "Edit",
      icon: "Pencil",
      onClick: () => setSelectedAction("Edit"),
    },
    {
      id: "share",
      label: "Share",
      icon: "Share",
      items: [
        {
          id: "share-email",
          label: "Email",
          icon: "Envelope",
          onClick: () => setSelectedAction("Share via Email"),
        },
        {
          id: "share-slack",
          label: "Slack",
          icon: "ChatCircle",
          onClick: () => setSelectedAction("Share via Slack"),
        },
        {
          id: "share-link",
          label: "Copy Link",
          icon: "Link",
          onClick: () => setSelectedAction("Copy Link"),
        },
      ],
    },
    {
      id: "export",
      label: "Export",
      icon: "Export",
      items: [
        {
          id: "export-pdf",
          label: "PDF",
          icon: "FilePdf",
          onClick: () => setSelectedAction("Export as PDF"),
        },
        {
          id: "export-csv",
          label: "CSV",
          icon: "FileCsv",
          onClick: () => setSelectedAction("Export as CSV"),
        },
        {
          id: "export-more",
          label: "More Formats",
          icon: "DotsThree",
          items: [
            {
              id: "export-json",
              label: "JSON",
              icon: "FileCode",
              onClick: () => setSelectedAction("Export as JSON"),
            },
            {
              id: "export-xml",
              label: "XML",
              icon: "FileCode",
              onClick: () => setSelectedAction("Export as XML"),
            },
          ],
        },
      ],
    },
    { divider: true },
    {
      id: "delete",
      label: "Delete",
      icon: "Trash",
      onClick: () => setSelectedAction("Delete"),
    },
  ];

  return (
    <section className="page">
      <header className="page__header">
        <div className="page__header-container">
          <Breadcrumb />
          <div className="page__header-info">
            <div className="page__header-content">
              <h1 className="page__header-title">Action Menu</h1>
              <p className="page__header-description">
                The ActionMenu component provides a dropdown menu for displaying
                actions. It's typically triggered by a button (often with an
                ellipsis icon) and displays a list of menu items with optional
                icons, dividers, and keyboard shortcuts.
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
            <h2 className="demo-group__heading">Basic Usage</h2>
            <p className="demo-group__description">
              A simple action menu with basic menu items. Click the button to open the menu.
            </p>
            <Flex direction="row" gap="16" wrap={true} alignItems="center" className="demo-grid">
              <ActionMenu
                trigger={
                    <Button
                        appearance="outline"
                        layout="icon-only"
                        label="More actions"
                        aria-label="More actions"
                        icon={<Icon name="DotsThree" size={24} appearance="bold" />}
                        title="More actions"
                    />
                }
                items={basicItems}
              />
            </Flex>
            {selectedAction && (
              <p style={{ marginTop: "16px", color: "var(--uds-text-secondary)" }}>
                Last selected: {selectedAction}
              </p>
            )}
            <div className="action-menu-demo__code-block-wrapper">
              <CopyButton codeString={`import ActionMenu from "../ui/ActionMenu/ActionMenu";
import Button from "../ui/Button/Button";

const items = [
  {
    id: "edit",
    label: "Edit",
    icon: "Pencil",
    onClick: () => console.log("Edit clicked"),
  },
  {
    id: "duplicate",
    label: "Duplicate",
    icon: "Copy",
    onClick: () => console.log("Duplicate clicked"),
  },
  {
    id: "delete",
    label: "Delete",
    icon: "Trash",
    onClick: () => console.log("Delete clicked"),
  },
];

<ActionMenu
  trigger={<Button appearance="ghost" layout="icon-only" icon="DotsThree" aria-label="More actions" />}
  items={items}
/>`} />
              <pre className="action-menu-demo__code-block">
                <code className="language-jsx">{`import ActionMenu from "../ui/ActionMenu/ActionMenu";
import Button from "../ui/Button/Button";

const items = [
  {
    id: "edit",
    label: "Edit",
    icon: "Pencil",
    onClick: () => console.log("Edit clicked"),
  },
  {
    id: "duplicate",
    label: "Duplicate",
    icon: "Copy",
    onClick: () => console.log("Duplicate clicked"),
  },
  {
    id: "delete",
    label: "Delete",
    icon: "Trash",
    onClick: () => console.log("Delete clicked"),
  },
];

<ActionMenu
  trigger={<Button appearance="ghost" layout="icon-only" icon="DotsThree" aria-label="More actions" />}
  items={items}
/>`}</code>
              </pre>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">With Dividers</h2>
            <p className="demo-group__description">
              Use dividers to visually separate groups of related menu items.
            </p>
            <Flex direction="row" gap="16" wrap={true} alignItems="center" className="demo-grid">
              <ActionMenu
                trigger={
                    <Button
                        appearance="outline"
                        layout="icon-only"
                        label="More actions"
                        aria-label="More actions"
                        icon={<Icon name="DotsThree" size={24} appearance="bold" />}
                        title="More actions"
                    />
                }
                items={itemsWithDivider}
              />
            </Flex>
            <div className="action-menu-demo__code-block-wrapper">
              <CopyButton codeString={`const items = [
  {
    id: "edit",
    label: "Edit",
    icon: "Pencil",
    onClick: () => console.log("Edit clicked"),
  },
  {
    id: "duplicate",
    label: "Duplicate",
    icon: "Copy",
    onClick: () => console.log("Duplicate clicked"),
  },
  { divider: true }, // Add a divider
  {
    id: "archive",
    label: "Archive",
    icon: "Archive",
    onClick: () => console.log("Archive clicked"),
  },
  {
    id: "delete",
    label: "Delete",
    icon: "Trash",
    onClick: () => console.log("Delete clicked"),
  },
];

<ActionMenu items={items} />`} />
              <pre className="action-menu-demo__code-block">
                <code className="language-jsx">{`const items = [
  {
    id: "edit",
    label: "Edit",
    icon: "Pencil",
    onClick: () => console.log("Edit clicked"),
  },
  {
    id: "duplicate",
    label: "Duplicate",
    icon: "Copy",
    onClick: () => console.log("Duplicate clicked"),
  },
  { divider: true }, // Add a divider
  {
    id: "archive",
    label: "Archive",
    icon: "Archive",
    onClick: () => console.log("Archive clicked"),
  },
  {
    id: "delete",
    label: "Delete",
    icon: "Trash",
    onClick: () => console.log("Delete clicked"),
  },
];

<ActionMenu items={items} />`}</code>
              </pre>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">With Disabled Items</h2>
            <p className="demo-group__description">
              Menu items can be disabled to prevent interaction while still showing available actions.
            </p>
            <Flex direction="row" gap="16" wrap={true} alignItems="center" className="demo-grid">
              <ActionMenu
                trigger={
                    <Button
                        appearance="outline"
                        layout="icon-only"
                        label="More actions"
                        aria-label="More actions"
                        icon={<Icon name="DotsThree" size={24} appearance="bold" />}
                        title="More actions"
                    />
                }
                items={itemsWithDisabled}
              />
            </Flex>
            <div className="action-menu-demo__code-block-wrapper">
              <CopyButton codeString={`const items = [
  {
    id: "edit",
    label: "Edit",
    icon: "Pencil",
    onClick: () => console.log("Edit clicked"),
  },
  {
    id: "duplicate",
    label: "Duplicate",
    icon: "Copy",
    onClick: () => console.log("Duplicate clicked"),
  },
  {
    id: "delete",
    label: "Delete",
    icon: "Trash",
    disabled: true, // Disable this item
    onClick: () => console.log("Delete clicked"),
  },
];

<ActionMenu items={items} />`} />
              <pre className="action-menu-demo__code-block">
                <code className="language-jsx">{`const items = [
  {
    id: "edit",
    label: "Edit",
    icon: "Pencil",
    onClick: () => console.log("Edit clicked"),
  },
  {
    id: "duplicate",
    label: "Duplicate",
    icon: "Copy",
    onClick: () => console.log("Duplicate clicked"),
  },
  {
    id: "delete",
    label: "Delete",
    icon: "Trash",
    disabled: true, // Disable this item
    onClick: () => console.log("Delete clicked"),
  },
];

<ActionMenu items={items} />`}</code>
              </pre>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Destructive Actions</h2>
            <p className="demo-group__description">
              Use the destructive style for dangerous actions like "Delete" or "Remove". The icon and text will be styled in red.
            </p>
            <Flex direction="row" gap="16" wrap={true} alignItems="center" className="demo-grid">
              <ActionMenu
                trigger={
                    <Button
                        appearance="outline"
                        layout="icon-only"
                        label="More actions"
                        aria-label="More actions"
                        icon={<Icon name="DotsThree" size={24} appearance="bold" />}
                        title="More actions"
                    />
                }
                items={itemsWithDestructive}
              />
            </Flex>
            <div className="action-menu-demo__code-block-wrapper">
              <CopyButton codeString={`const items = [
  {
    id: "edit",
    label: "Edit",
    icon: "Pencil",
    onClick: () => console.log("Edit clicked"),
  },
  {
    id: "duplicate",
    label: "Duplicate",
    icon: "Copy",
    onClick: () => console.log("Duplicate clicked"),
  },
  { divider: true },
  {
    id: "delete",
    label: "Delete",
    icon: "Trash",
    destructive: true, // Makes the item red
    onClick: () => console.log("Delete clicked"),
  },
];

<ActionMenu items={items} />`} />
              <pre className="action-menu-demo__code-block">
                <code className="language-jsx">{`const items = [
  {
    id: "edit",
    label: "Edit",
    icon: "Pencil",
    onClick: () => console.log("Edit clicked"),
  },
  {
    id: "duplicate",
    label: "Duplicate",
    icon: "Copy",
    onClick: () => console.log("Duplicate clicked"),
  },
  { divider: true },
  {
    id: "delete",
    label: "Delete",
    icon: "Trash",
    destructive: true, // Makes the item red
    onClick: () => console.log("Delete clicked"),
  },
];

<ActionMenu items={items} />`}</code>
              </pre>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">With Keyboard Shortcuts</h2>
            <p className="demo-group__description">
              Menu items can display keyboard shortcuts to help users learn and use keyboard navigation.
            </p>
            <Flex direction="row" gap="16" wrap={true} alignItems="center" className="demo-grid">
              <ActionMenu
                trigger={
                    <Button
                        appearance="outline"
                        layout="icon-only"
                        label="More actions"
                        aria-label="More actions"
                        icon={<Icon name="DotsThree" size={24} appearance="bold" />}
                        title="More actions"
                    />
                }
                items={itemsWithShortcuts}
              />
            </Flex>
            <div className="action-menu-demo__code-block-wrapper">
              <CopyButton codeString={`const items = [
  {
    id: "cut",
    label: "Cut",
    icon: "Scissors",
    shortcut: "⌘X",
    onClick: () => console.log("Cut clicked"),
  },
  {
    id: "copy",
    label: "Copy",
    icon: "Copy",
    shortcut: "⌘C",
    onClick: () => console.log("Copy clicked"),
  },
  {
    id: "paste",
    label: "Paste",
    icon: "Clipboard",
    shortcut: "⌘V",
    onClick: () => console.log("Paste clicked"),
  },
];

<ActionMenu items={items} />`} />
              <pre className="action-menu-demo__code-block">
                <code className="language-jsx">{`const items = [
  {
    id: "cut",
    label: "Cut",
    icon: "Scissors",
    shortcut: "⌘X",
    onClick: () => console.log("Cut clicked"),
  },
  {
    id: "copy",
    label: "Copy",
    icon: "Copy",
    shortcut: "⌘C",
    onClick: () => console.log("Copy clicked"),
  },
  {
    id: "paste",
    label: "Paste",
    icon: "Clipboard",
    shortcut: "⌘V",
    onClick: () => console.log("Paste clicked"),
  },
];

<ActionMenu items={items} />`}</code>
              </pre>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Multilevel Menus</h2>
            <p className="demo-group__description">
              Menu items can have nested submenus for organizing related actions. Hover over items with arrows to reveal submenus.
            </p>
            <Flex direction="row" gap="16" wrap={true} alignItems="center" className="demo-grid">
              <ActionMenu
                trigger={
                    <Button
                        appearance="outline"
                        layout="icon-only"
                        label="More actions"
                        aria-label="More actions"
                        icon={<Icon name="DotsThree" size={24} appearance="bold" />}
                        title="More actions"
                    />
                }
                items={itemsWithSubmenu}
              />
            </Flex>
            <div className="action-menu-demo__code-block-wrapper">
              <CopyButton codeString={`const items = [
  {
    id: "edit",
    label: "Edit",
    icon: "Pencil",
    onClick: () => console.log("Edit clicked"),
  },
  {
    id: "share",
    label: "Share",
    icon: "Share",
    items: [  // Nested submenu
      {
        id: "share-email",
        label: "Email",
        icon: "Envelope",
        onClick: () => console.log("Share via Email"),
      },
      {
        id: "share-slack",
        label: "Slack",
        icon: "ChatCircle",
        onClick: () => console.log("Share via Slack"),
      },
    ],
  },
  {
    id: "export",
    label: "Export",
    icon: "Export",
    items: [
      {
        id: "export-pdf",
        label: "PDF",
        onClick: () => console.log("Export as PDF"),
      },
      {
        id: "export-more",
        label: "More Formats",
        items: [  // Deeply nested submenu
          { id: "export-json", label: "JSON", onClick: () => console.log("JSON") },
          { id: "export-xml", label: "XML", onClick: () => console.log("XML") },
        ],
      },
    ],
  },
];

<ActionMenu items={items} />`} />
              <pre className="action-menu-demo__code-block">
                <code className="language-jsx">{`const items = [
  {
    id: "edit",
    label: "Edit",
    icon: "Pencil",
    onClick: () => console.log("Edit clicked"),
  },
  {
    id: "share",
    label: "Share",
    icon: "Share",
    items: [  // Nested submenu
      {
        id: "share-email",
        label: "Email",
        icon: "Envelope",
        onClick: () => console.log("Share via Email"),
      },
      {
        id: "share-slack",
        label: "Slack",
        icon: "ChatCircle",
        onClick: () => console.log("Share via Slack"),
      },
    ],
  },
  {
    id: "export",
    label: "Export",
    icon: "Export",
    items: [
      {
        id: "export-pdf",
        label: "PDF",
        onClick: () => console.log("Export as PDF"),
      },
      {
        id: "export-more",
        label: "More Formats",
        items: [  // Deeply nested submenu
          { id: "export-json", label: "JSON", onClick: () => console.log("JSON") },
          { id: "export-xml", label: "XML", onClick: () => console.log("XML") },
        ],
      },
    ],
  },
];

<ActionMenu items={items} />`}</code>
              </pre>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Trigger Variations</h2>
            <p className="demo-group__description">
              Use any Button component as a trigger. Common patterns include icon-only buttons, labeled buttons, or buttons with icons.
            </p>
            <Flex direction="row" gap="16" wrap={true} alignItems="center" className="demo-grid">
              <ActionMenu
                trigger={
                    <Button
                        appearance="outline"
                        layout="icon-only"
                        label="More actions"
                        aria-label="More actions"
                        icon={<Icon name="DotsThree" size={24} appearance="bold" />}
                        title="More actions"
                    />
                }
                items={basicItems}
              />
              <ActionMenu
                trigger={<Button appearance="outline" label="Actions" layout="icon-right" icon="CaretDown" />}
                items={basicItems}
              />
              <ActionMenu
                trigger={<Button appearance="primary" label="Options" />}
                items={basicItems}
              />
            </Flex>
            <div className="action-menu-demo__code-block-wrapper">
              <CopyButton codeString={`import ActionMenu from "../ui/ActionMenu/ActionMenu";
import Button from "../ui/Button/Button";

// Icon-only trigger (common for table rows)
<ActionMenu
  trigger={<Button appearance="ghost" layout="icon-only" icon="DotsThree" aria-label="More actions" />}
  items={items}
/>

// Dropdown-style trigger
<ActionMenu
  trigger={<Button appearance="outline" label="Actions" layout="icon-right" icon="CaretDown" />}
  items={items}
/>

// Simple button trigger
<ActionMenu
  trigger={<Button appearance="primary" label="Options" />}
  items={items}
/>`} />
              <pre className="action-menu-demo__code-block">
                <code className="language-jsx">{`import ActionMenu from "../ui/ActionMenu/ActionMenu";
import Button from "../ui/Button/Button";

// Icon-only trigger (common for table rows)
<ActionMenu
  trigger={<Button appearance="ghost" layout="icon-only" icon="DotsThree" aria-label="More actions" />}
  items={items}
/>

// Dropdown-style trigger
<ActionMenu
  trigger={<Button appearance="outline" label="Actions" layout="icon-right" icon="CaretDown" />}
  items={items}
/>

// Simple button trigger
<ActionMenu
  trigger={<Button appearance="primary" label="Options" />}
  items={items}
/>`}</code>
              </pre>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Placement Options</h2>
            <p className="demo-group__description">
              Control where the menu appears relative to the trigger using the placement prop.
            </p>
            <Flex direction="row" gap="16" wrap={true} alignItems="center" className="demo-grid">
              <ActionMenu
                trigger={<Button appearance="outline" label="Bottom Start" size="small" />}
                items={basicItems}
                placement="bottom-start"
              />
              <ActionMenu
                trigger={<Button appearance="outline" label="Bottom End" size="small" />}
                items={basicItems}
                placement="bottom-end"
              />
              <ActionMenu
                trigger={<Button appearance="outline" label="Top Start" size="small" />}
                items={basicItems}
                placement="top-start"
              />
              <ActionMenu
                trigger={<Button appearance="outline" label="Top End" size="small" />}
                items={basicItems}
                placement="top-end"
              />
            </Flex>
            <div className="action-menu-demo__code-block-wrapper">
              <CopyButton codeString={`// Available placement options:
<ActionMenu
  trigger={<Button appearance="outline" label="Bottom Start" />}
  items={items}
  placement="bottom-start"
/>
<ActionMenu
  trigger={<Button appearance="outline" label="Bottom End" />}
  items={items}
  placement="bottom-end"
/>
<ActionMenu
  trigger={<Button appearance="outline" label="Top Start" />}
  items={items}
  placement="top-start"
/>
<ActionMenu
  trigger={<Button appearance="outline" label="Top End" />}
  items={items}
  placement="top-end"
/>`} />
              <pre className="action-menu-demo__code-block">
                <code className="language-jsx">{`// Available placement options:
<ActionMenu
  trigger={<Button appearance="outline" label="Bottom Start" />}
  items={items}
  placement="bottom-start"
/>
<ActionMenu
  trigger={<Button appearance="outline" label="Bottom End" />}
  items={items}
  placement="bottom-end"
/>
<ActionMenu
  trigger={<Button appearance="outline" label="Top Start" />}
  items={items}
  placement="top-start"
/>
<ActionMenu
  trigger={<Button appearance="outline" label="Top End" />}
  items={items}
  placement="top-end"
/>`}</code>
              </pre>
            </div>
          </div>
        </div>

        <Divider variant="solid" />

        <div className="page__tabs-content-container">
          <div className="demo-group">
            <div className="page__navigation">
              <Link
                to="/"
                className="page__nav-link page__nav-link--prev"
              >
                <span className="page__nav-label">Previous</span>
                <span className="page__nav-title">Home</span>
              </Link>
              <Link
                to="/accordion"
                className="page__nav-link page__nav-link--next"
              >
                <span className="page__nav-label">Next</span>
                <span className="page__nav-title">Accordion</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
