import React, { useState } from "react";
import { Link } from "react-router-dom";
import Branding from "../ui/Branding/Branding";
import Flex from "../ui/Flex/Flex";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Divider from "../ui/Divider/Divider";
import { formatLastUpdated } from "../utils/formatDate";

/**
 * Branding Component Demo & Documentation
 *
 * This page demonstrates the Branding component and its various configurations.
 *
 * ## Branding Component Props:
 *
 * ### Required Props:
 * - `brands` (array): Array of brand objects with { name, logo?, description? }
 *
 * ### Optional Props:
 * - `layout` (string): Layout variant: 'vertical' | 'horizontal' | 'grid'
 *   - Default: 'vertical'
 *
 * - `size` (string): Size variant: 'small' | 'default' | 'large'
 *   - Default: 'default'
 *
 * ## Usage Examples:
 *
 * Basic branding:
 * ```jsx
 * <Branding brands={[
 *   { name: 'CHG Healthcare', logo: '/path/to/logo.png' },
 *   { name: 'Locumsmart', logo: '/path/to/logo.png' }
 * ]} />
 * ```
 */

// Sample brand data based on the design system brands
const SAMPLE_BRANDS = [
  {
    name: "CHG Healthcare",
    description: "CHG Healthcare logo with colored letters",
  },
  {
    name: "CHG Connect.",
    description: "CHG Connect logo with registered trademark",
  },
  {
    name: "Locumsmart.",
    description: "Locumsmart logo with LS icon",
  },
  {
    name: "modio",
    description: "modio logo with starburst icon",
  },
  {
    name: "MyWeatherby",
    description: "MyWeatherby script logo",
  },
  {
    name: "myCompHealth",
    description: "myCompHealth script logo",
  },
  {
    name: "UnifiedDS",
    description: "UnifiedDS logo with overlapping squares",
  },
];

export default function BrandingDemo() {

  return (
    <section className="page">
      <header className="page__header">
        <div className="page__header-container">
          <Breadcrumb />
          <div className="page__header-info">
            <div className="page__header-content">
              <h1 className="page__header-title">Branding</h1>
              <p className="page__header-description">
                The Branding component displays brand logos and names in various
            layouts. Use this component to showcase brand identities, partner
            logos, or brand guidelines.
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
        
      </main>
    </section>
  );
}
