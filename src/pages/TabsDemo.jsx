import React, { useState } from "react";
import { Link } from "react-router-dom";
import Tabs from "../ui/Tabs/Tabs";
import Flex from "../ui/Flex/Flex";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Divider from "../ui/Divider/Divider";
import { formatLastUpdated } from "../utils/formatDate";

/**
 * Tabs Component Demo & Documentation
 *
 * This page demonstrates the Tabs component and its various configurations.
 */
export default function TabsDemo() {
  
  const [underlineTab, setUnderlineTab] = useState(0);
  const [blockTab, setBlockTab] = useState(0);
  const [blockInvertedTab, setBlockInvertedTab] = useState(0);
  const [fillTab, setFillTab] = useState(0);

  const basicTabs = [
    { label: "Tab 1" },
    { label: "Tab 2" },
    { label: "Tab 3" },
  ];

  const tabsWithIcons = [
    { label: "Home", icon: "House" },
    { label: "Settings", icon: "Gear" },
    { label: "Profile", icon: "User" },
  ];

  const tabsWithTags = [
    { label: "Inbox", tag: 5, tagVariant: "red" },
    { label: "Drafts", tag: 2, tagVariant: "blue" },
    { label: "Sent", tag: false },
  ];

  const tabsWithIconsAndTags = [
    { label: "Messages", icon: "Envelope", tag: 12, tagVariant: "red" },
    { label: "Notifications", icon: "Bell", tag: 3, tagVariant: "blue" },
    { label: "Tasks", icon: "CheckSquare", tag: false },
  ];

  return (
    <section className="page">
      <header className="page__header">
        <div className="page__header-container">
          <Breadcrumb />
          <div className="page__header-info">
            <div className="page__header-content">
              <h1 className="page__header-title">Tabs</h1>
              <p className="page__header-description">
                The Tabs component provides a way to organize content into multiple
            sections that can be switched between. Supports different
            appearances (underline, block, block-inverted) and optional icons
            and badges.
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
            <h2 className="demo-group__heading">Basic Tabs</h2>
            <p className="demo-group__description">
              Simple tabs with labels. The underline appearance is the default style.
            </p>
            <div className="demo-content">
              <Tabs
                tabs={basicTabs}
                activeTab={underlineTab}
                onTabChange={(index) => setUnderlineTab(index)}
                appearance="underline"
              />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">With Icons</h2>
            <p className="demo-group__description">
              Tabs can include icons alongside labels to provide visual context.
            </p>
            <div className="demo-content">
              <Tabs
                tabs={tabsWithIcons}
                activeTab={underlineTab}
                onTabChange={(index) => setUnderlineTab(index)}
                appearance="underline"
              />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">With Tags</h2>
            <p className="demo-group__description">
              Tabs can display tags (badges) with counts or indicators. Tags can have different color variants.
            </p>
            <div className="demo-content">
              <Tabs
                tabs={tabsWithTags}
                activeTab={underlineTab}
                onTabChange={(index) => setUnderlineTab(index)}
                appearance="underline"
              />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">With Icons and Tags</h2>
            <p className="demo-group__description">
              Tabs can combine icons and tags for rich visual information.
            </p>
            <div className="demo-content">
              <Tabs
                tabs={tabsWithIconsAndTags}
                activeTab={underlineTab}
                onTabChange={(index) => setUnderlineTab(index)}
                appearance="underline"
              />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Block Appearance</h2>
            <p className="demo-group__description">
              The block appearance provides a filled background for the active tab.
            </p>
            <div className="demo-content">
              <Tabs
                tabs={basicTabs}
                activeTab={blockTab}
                onTabChange={(index) => setBlockTab(index)}
                appearance="block"
              />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Block Inverted Appearance</h2>
            <p className="demo-group__description">
              The block-inverted appearance provides an inverted color scheme for the active tab.
            </p>
            <div className="demo-content">
              <Tabs
                tabs={basicTabs}
                activeTab={blockInvertedTab}
                onTabChange={(index) => setBlockInvertedTab(index)}
                appearance="block-inverted"
              />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Fill Width</h2>
            <p className="demo-group__description">
              Tabs can fill the available width, distributing space evenly across all tabs.
            </p>
            <div className="demo-content">
              <Tabs
                tabs={basicTabs}
                activeTab={fillTab}
                onTabChange={(index) => setFillTab(index)}
                appearance="underline"
                fill
              />
            </div>
          </div>
        </div>

        <Divider variant="solid" />

        <div className="page__tabs-content-container">
          <div className="demo-group">
            <div className="page__navigation">
              <Link
                to="/table"
                className="page__nav-link page__nav-link--prev"
              >
                <span className="page__nav-label">Previous</span>
                <span className="page__nav-title">Table</span>
              </Link>
              <Link
                to="/toast"
                className="page__nav-link page__nav-link--next"
              >
                <span className="page__nav-label">Next</span>
                <span className="page__nav-title">Toast</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
