import React, { useState } from "react";
import { Link } from "react-router-dom";
import Tooltip from "../ui/Tooltip/Tooltip";
import Button from "../ui/Button/Button";
import Icon from "../ui/Icon/Icon";
import Flex from "../ui/Flex/Flex";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Divider from "../ui/Divider/Divider";
import { formatLastUpdated } from "../utils/formatDate";

const tooltipContent =
  "A message which appears when a cursor is positioned over an icon, image, hyperlink, or other element in a graphical user interface.";

/**
 * Tooltip Component Demo & Documentation
 *
 * This page demonstrates the Tooltip component and its various configurations.
 */
export default function TooltipDemo() {

  return (
    <section className="page">
      <header className="page__header">
        <div className="page__header-container">
          <Breadcrumb />
          <div className="page__header-info">
            <div className="page__header-content">
              <h1 className="page__header-title">Tooltip</h1>
              <p className="page__header-description">
                Tooltips provide additional context or information when users
                hover over or focus on an element. They appear temporarily and
                disappear when the user moves their cursor away.
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
            <h2 className="demo-group__heading">Placement</h2>
            <p className="demo-group__description">
              Tooltips can be positioned on any side of the trigger element: top, bottom, left, or right. The default placement is top.
            </p>
            <Flex direction="row" gap="24" wrap={true} alignItems="center" className="demo-content">
              <Tooltip content={tooltipContent} placement="top">
                <Button appearance="outline">Top</Button>
              </Tooltip>
              <Tooltip content={tooltipContent} placement="bottom">
                <Button appearance="outline">Bottom</Button>
              </Tooltip>
              <Tooltip content={tooltipContent} placement="left">
                <Button appearance="outline">Left</Button>
              </Tooltip>
              <Tooltip content={tooltipContent} placement="right">
                <Button appearance="outline">Right</Button>
              </Tooltip>
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">With Icons</h2>
            <p className="demo-group__description">
              Tooltips work well with icon buttons to provide additional context without cluttering the interface.
            </p>
            <Flex direction="row" gap="16" wrap={true} alignItems="center" className="demo-content">
              <Tooltip content="Edit this item" placement="top">
                <Button appearance="text" layout="icon-only" icon="Pencil" size="small" />
              </Tooltip>
              <Tooltip content="Delete this item" placement="top">
                <Button appearance="text" layout="icon-only" icon="Trash" size="small" />
              </Tooltip>
              <Tooltip content="More information" placement="top">
                <Button appearance="text" layout="icon-only" icon="Info" size="small" />
              </Tooltip>
              <Tooltip content="Settings" placement="top">
                <Button appearance="text" layout="icon-only" icon="Gear" size="small" />
              </Tooltip>
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">With Text</h2>
            <p className="demo-group__description">
              Tooltips can be attached to any element, including text links or labels, to provide helpful context.
            </p>
            <Flex direction="column" gap="16" className="demo-content">
              <p>
                This is a paragraph with a{" "}
                <Tooltip content="This is a helpful tooltip" placement="top">
                  <a href="#" style={{ color: 'var(--uds-text-link-primary-default)', textDecoration: 'underline' }}>
                    tooltip on a link
                  </a>
                </Tooltip>
                .
              </p>
              <p>
                Hover over this{" "}
                <Tooltip content="Additional information appears here" placement="bottom">
                  <span style={{ borderBottom: '1px dotted', cursor: 'help' }}>dotted text</span>
                </Tooltip>
                {" "}to see the tooltip.
              </p>
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Disabled Tooltip</h2>
            <p className="demo-group__description">
              Tooltips can be disabled when they are not needed or should not be displayed.
            </p>
            <div className="demo-content">
              <Tooltip content="This tooltip is disabled" placement="top" disabled>
                <Button appearance="outline">Hover me (tooltip disabled)</Button>
              </Tooltip>
            </div>
          </div>
        </div>

        <Divider variant="solid" />

        <div className="page__tabs-content-container">
          <div className="demo-group">
            <div className="page__navigation">
              <Link
                to="/toggle"
                className="page__nav-link page__nav-link--prev"
              >
                <span className="page__nav-label">Previous</span>
                <span className="page__nav-title">Toggle</span>
              </Link>
              <Link
                to="/input"
                className="page__nav-link page__nav-link--next"
              >
                <span className="page__nav-label">Next</span>
                <span className="page__nav-title">Text Input</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
