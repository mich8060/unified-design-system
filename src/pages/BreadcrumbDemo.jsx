import React, { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Flex from "../ui/Flex/Flex";
import { formatLastUpdated } from "../utils/formatDate";
import Divider from "../ui/Divider/Divider";

/**
 * Breadcrumb Component Demo & Documentation
 *
 * This page demonstrates the Breadcrumb component and its various configurations.
 */
export default function BreadcrumbDemo() {

  return (
    <section className="page">
      <header className="page__header">
        <div className="page__header-container">
          <Breadcrumb />
          <div className="page__header-info">
            <div className="page__header-content">
              <h1 className="page__header-title">Breadcrumb</h1>
              <p className="page__header-description">
                The Breadcrumb component provides navigation context by showing
                the user's current location within the application hierarchy. It
                helps users understand where they are and provides quick
                navigation to parent pages.
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
            <h2 className="demo-group__heading">Single Level</h2>
            <p className="demo-group__description">
              A simple breadcrumb with just one level showing the current page.
            </p>
            <div className="demo-content">
              <Breadcrumb items={[
                { label: "Home" }
              ]} />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Two Levels</h2>
            <p className="demo-group__description">
              A breadcrumb with two levels showing the parent and current page.
            </p>
            <div className="demo-content">
              <Breadcrumb items={[
                { label: "Home", href: "/" },
                { label: "Products" }
              ]} />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Three Levels</h2>
            <p className="demo-group__description">
              A breadcrumb with three levels showing the navigation hierarchy.
            </p>
            <div className="demo-content">
              <Breadcrumb items={[
                { label: "Home", href: "/" },
                { label: "Products", href: "/products" },
                { label: "Electronics" }
              ]} />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Four Levels</h2>
            <p className="demo-group__description">
              A breadcrumb with four levels for deeper navigation hierarchies.
            </p>
            <div className="demo-content">
              <Breadcrumb items={[
                { label: "Home", href: "/" },
                { label: "Products", href: "/products" },
                { label: "Electronics", href: "/products/electronics" },
                { label: "Computers" }
              ]} />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Five Levels</h2>
            <p className="demo-group__description">
              A breadcrumb with the maximum of five levels for complex navigation structures.
            </p>
            <div className="demo-content">
              <Breadcrumb items={[
                { label: "Home", href: "/" },
                { label: "Products", href: "/products" },
                { label: "Electronics", href: "/products/electronics" },
                { label: "Computers", href: "/products/electronics/computers" },
                { label: "Laptops" }
              ]} />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">More Than Five Levels</h2>
            <p className="demo-group__description">
              When more than five levels are provided, only the first five are displayed.
            </p>
            <div className="demo-content">
              <Breadcrumb items={[
                { label: "Home", href: "/" },
                { label: "Products", href: "/products" },
                { label: "Electronics", href: "/products/electronics" },
                { label: "Computers", href: "/products/electronics/computers" },
                { label: "Laptops", href: "/products/electronics/computers/laptops" },
                { label: "Gaming Laptops" }
              ]} />
            </div>
          </div>
        </div>

        <Divider variant="solid" />

        <div className="page__tabs-content-container">
          <div className="demo-group">
            <div className="page__navigation">
              <Link
                to="/badge"
                className="page__nav-link page__nav-link--prev"
              >
                <span className="page__nav-label">Previous</span>
                <span className="page__nav-title">Badge</span>
              </Link>
              <Link
                to="/buttons"
                className="page__nav-link page__nav-link--next"
              >
                <span className="page__nav-label">Next</span>
                <span className="page__nav-title">Buttons</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
