import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Accordion, { AccordionItem } from "../ui/Accordion";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Divider from "../ui/Divider/Divider";
import { formatLastUpdated } from "../utils/formatDate";
import Flex from "../ui/Flex/Flex";
import CopyButton from "../ui/CopyButton/CopyButton";
import Prism from "prismjs";
import "../styles/prism-custom.css";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-javascript";
import "./AccordionDemo.scss";

export default function AccordionDemo() {
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
              <h1 className="page__header-title">Accordion</h1>
              <p className="page__header-description">
                The Accordion component allows users to expand and collapse sections
                of content. Use it to organize information in a space-efficient way.
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
              A simple accordion with a single item that can be expanded or collapsed.
            </p>
            <Accordion>
              <AccordionItem label="Accordion Item">
                <p>This is the content inside the accordion item. It can contain any React components or HTML elements.</p>
              </AccordionItem>
            </Accordion>
            <div className="accordion-demo__code-block-wrapper">
              <CopyButton codeString={`import Accordion, { AccordionItem } from "../ui/Accordion";

<Accordion>
  <AccordionItem label="Accordion Item">
    <p>This is the content inside the accordion item. It can contain any React components or HTML elements.</p>
  </AccordionItem>
</Accordion>`} />
              <pre className="accordion-demo__code-block">
                <code className="language-jsx">{`import Accordion, { AccordionItem } from "../ui/Accordion";

<Accordion>
  <AccordionItem label="Accordion Item">
    <p>This is the content inside the accordion item. It can contain any React components or HTML elements.</p>
  </AccordionItem>
</Accordion>`}</code>
              </pre>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Multiple Items</h2>
            <p className="demo-group__description">
              An accordion can contain multiple items. Each item can be expanded or collapsed independently.
            </p>
            <Accordion>
              <AccordionItem label="First Item">
                <p>Content for the first accordion item.</p>
              </AccordionItem>
              <AccordionItem label="Second Item">
                <p>Content for the second accordion item.</p>
              </AccordionItem>
              <AccordionItem label="Third Item">
                <p>Content for the third accordion item.</p>
              </AccordionItem>
            </Accordion>
            <div className="accordion-demo__code-block-wrapper">
              <CopyButton codeString={`import Accordion, { AccordionItem } from "../ui/Accordion";

<Accordion>
  <AccordionItem label="First Item">
    <p>Content for the first accordion item.</p>
  </AccordionItem>
  <AccordionItem label="Second Item">
    <p>Content for the second accordion item.</p>
  </AccordionItem>
  <AccordionItem label="Third Item">
    <p>Content for the third accordion item.</p>
  </AccordionItem>
</Accordion>`} />
              <pre className="accordion-demo__code-block">
                <code className="language-jsx">{`import Accordion, { AccordionItem } from "../ui/Accordion";

<Accordion>
  <AccordionItem label="First Item">
    <p>Content for the first accordion item.</p>
  </AccordionItem>
  <AccordionItem label="Second Item">
    <p>Content for the second accordion item.</p>
  </AccordionItem>
  <AccordionItem label="Third Item">
    <p>Content for the third accordion item.</p>
  </AccordionItem>
</Accordion>`}</code>
              </pre>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Default Expanded</h2>
            <p className="demo-group__description">
              Accordion items can be set to be expanded by default using the defaultExpanded prop.
            </p>
            <Accordion>
              <AccordionItem label="Expanded by Default" defaultExpanded>
                <p>This accordion item is expanded by default when the page loads.</p>
              </AccordionItem>
              <AccordionItem label="Collapsed by Default">
                <p>This accordion item is collapsed by default.</p>
              </AccordionItem>
            </Accordion>
            <div className="accordion-demo__code-block-wrapper">
              <CopyButton codeString={`import Accordion, { AccordionItem } from "../ui/Accordion";

<Accordion>
  <AccordionItem label="Expanded by Default" defaultExpanded>
    <p>This accordion item is expanded by default when the page loads.</p>
  </AccordionItem>
  <AccordionItem label="Collapsed by Default">
    <p>This accordion item is collapsed by default.</p>
  </AccordionItem>
</Accordion>`} />
              <pre className="accordion-demo__code-block">
                <code className="language-jsx">{`import Accordion, { AccordionItem } from "../ui/Accordion";

<Accordion>
  <AccordionItem label="Expanded by Default" defaultExpanded>
    <p>This accordion item is expanded by default when the page loads.</p>
  </AccordionItem>
  <AccordionItem label="Collapsed by Default">
    <p>This accordion item is collapsed by default.</p>
  </AccordionItem>
</Accordion>`}</code>
              </pre>
            </div>
          </div>
        </div>

        <Divider variant="solid" />

        <div className="page__tabs-content-container">
          <div className="demo-group">
            <div className="page__navigation">
              <Link
                to="/action-menu"
                className="page__nav-link page__nav-link--prev"
              >
                <span className="page__nav-label">Previous</span>
                <span className="page__nav-title">Action Menu</span>
              </Link>
              <Link
                to="/badge"
                className="page__nav-link page__nav-link--next"
              >
                <span className="page__nav-label">Next</span>
                <span className="page__nav-title">Badge</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
