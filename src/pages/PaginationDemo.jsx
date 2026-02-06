import React, { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../ui/Pagination/Pagination";
import Flex from "../ui/Flex/Flex";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Divider from "../ui/Divider/Divider";
import { formatLastUpdated } from "../utils/formatDate";

export default function PaginationDemo() {
  const [currentPage1, setCurrentPage1] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [currentPage3, setCurrentPage3] = useState(1);
  const [currentPage4, setCurrentPage4] = useState(1);
  const [currentPage5, setCurrentPage5] = useState(1);

  return (
    <section className="page">
      <header className="page__header">
        <div className="page__header-container">
          <Breadcrumb />
          <div className="page__header-info">
            <div className="page__header-content">
              <h1 className="page__header-title">Pagination</h1>
              <p className="page__header-description">
                The Pagination component allows users to navigate through multiple
                pages of content. It displays page numbers, navigation controls,
                and optional jump-to-page functionality.
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
            <h2 className="demo-group__heading">Default Variant</h2>
            <p className="demo-group__description">
              The default pagination variant with a solid background for the active page and single previous/next buttons.
            </p>
            <div className="demo-content">
              <Pagination
                currentPage={currentPage1}
                totalPages={10}
                onPageChange={setCurrentPage1}
                variant="default"
              />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Underline Variant</h2>
            <p className="demo-group__description">
              The underline variant displays the active page with blue text and an underline instead of a solid background.
            </p>
            <div className="demo-content">
              <Pagination
                currentPage={currentPage2}
                totalPages={10}
                onPageChange={setCurrentPage2}
                variant="underline"
              />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">With Jump Input</h2>
            <p className="demo-group__description">
              This variant includes a jump-to-page input field and double navigation buttons (first/last and previous/next).
            </p>
            <div className="demo-content">
              <Pagination
                currentPage={currentPage3}
                totalPages={4}
                onPageChange={setCurrentPage3}
                variant="with-jump"
              />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Underline with Jump Input</h2>
            <p className="demo-group__description">
              Combines the underline variant with the jump-to-page input functionality.
            </p>
            <div className="demo-content">
              <Pagination
                currentPage={currentPage4}
                totalPages={4}
                onPageChange={setCurrentPage4}
                variant="underline-with-jump"
              />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Underline with Double Buttons</h2>
            <p className="demo-group__description">
              The underline variant with double navigation buttons (first/last and previous/next) but without the jump input.
            </p>
            <div className="demo-content">
              <Pagination
                currentPage={currentPage5}
                totalPages={10}
                onPageChange={setCurrentPage5}
                variant="underline-double"
              />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Small Page Count</h2>
            <p className="demo-group__description">
              Pagination with a small number of pages shows all page numbers without ellipsis.
            </p>
            <div className="demo-content">
              <Pagination
                currentPage={2}
                totalPages={5}
                onPageChange={(page) => console.log("Page changed to:", page)}
                variant="default"
              />
            </div>
          </div>
        </div>

        <Divider variant="solid" />

        <div className="page__tabs-content-container">
          <div className="demo-group">
            <div className="page__navigation">
              <Link
                to="/tooltip"
                className="page__nav-link page__nav-link--prev"
              >
                <span className="page__nav-label">Previous</span>
                <span className="page__nav-title">Tooltip</span>
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
