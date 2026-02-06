import React, { useState, useEffect } from "react";
import ProgressIndicator from "../ui/ProgressIndicator/ProgressIndicator";
import Flex from "../ui/Flex/Flex";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Divider from "../ui/Divider/Divider";
import { Link } from "react-router-dom";
import { formatLastUpdated } from "../utils/formatDate";

/**
 * ProgressIndicator Component Demo & Documentation
 *
 * This page demonstrates the ProgressIndicator component and its various configurations.
 *
 * ## ProgressIndicator Component Props:
 *
 * ### Required Props:
 * - None
 *
 * ### Optional Props:
 * - `value` (number): Progress value (0-100 or 0-max)
 *   - Default: 0
 *
 * - `max` (number): Maximum value
 *   - Default: 100
 *
 * - `variant` (string): Color variant
 *   - Options: 'default', 'blue', 'green', 'success', 'orange', 'warning', 'red', 'error', 'purple'
 *   - Default: 'default'
 *
 * - `size` (string): Size variant
 *   - Options: 'small', 'medium', 'large'
 *   - Default: 'medium'
 *
 * - `label` (string): Optional label text to display above the progress bar
 *
 * - `showValue` (boolean): Whether to show the percentage value
 *   - Default: false
 *
 * - `showLabel` (boolean): Whether to show the label (if provided)
 *   - Default: true
 *
 * ## Usage Examples:
 *
 * Basic progress bar:
 * ```jsx
 * <ProgressIndicator value={50} />
 * ```
 *
 * With label and value:
 * ```jsx
 * <ProgressIndicator value={75} label="Upload Progress" showValue />
 * ```
 *
 * Different variants:
 * ```jsx
 * <ProgressIndicator value={60} variant="success" />
 * <ProgressIndicator value={40} variant="warning" />
 * <ProgressIndicator value={20} variant="error" />
 * ```
 */

export default function ProgressIndicatorDemo() {
  const [animatedValue, setAnimatedValue] = useState(0);
  
  const [autoProgress, setAutoProgress] = useState(0);

  // Animated progress example
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedValue((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Auto-progress example
  useEffect(() => {
    const interval = setInterval(() => {
      setAutoProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="page">
      <header className="page__header">
        <div className="page__header-container">
          <Breadcrumb />
          <div className="page__header-info">
            <div className="page__header-content">
              <h1 className="page__header-title">Progress Indicator</h1>
              <p className="page__header-description">
                The ProgressIndicator component displays progress bars for showing
          completion status, upload progress, or any task that has a measurable
          completion state. Supports multiple sizes, color variants, and
          optional labels and values.
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
              Progress indicators display completion status for tasks, uploads, or any measurable process. The default variant uses the brand color.
            </p>
            <Flex direction="column" gap="16" className="demo-content">
              <ProgressIndicator value={25} />
              <ProgressIndicator value={50} />
              <ProgressIndicator value={75} />
              <ProgressIndicator value={100} />
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">With Label and Value</h2>
            <p className="demo-group__description">
              Progress indicators can display a label and optional percentage value to provide more context.
            </p>
            <Flex direction="column" gap="16" className="demo-content">
              <ProgressIndicator value={45} label="Upload Progress" showValue />
              <ProgressIndicator value={67} label="Processing" showValue />
              <ProgressIndicator value={89} label="Complete" showValue />
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Color Variants</h2>
            <p className="demo-group__description">
              Different color variants can be used to indicate different states or types of progress.
            </p>
            <Flex direction="column" gap="16" className="demo-content">
              <ProgressIndicator value={60} variant="default" label="Default" />
              <ProgressIndicator value={60} variant="blue" label="Blue" />
              <ProgressIndicator value={60} variant="green" label="Success" />
              <ProgressIndicator value={60} variant="orange" label="Warning" />
              <ProgressIndicator value={60} variant="red" label="Error" />
              <ProgressIndicator value={60} variant="purple" label="Purple" />
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Sizes</h2>
            <p className="demo-group__description">
              Progress indicators are available in three sizes: small, medium (default), and large.
            </p>
            <Flex direction="column" gap="16" className="demo-content">
              <ProgressIndicator value={50} size="small" label="Small" />
              <ProgressIndicator value={50} size="medium" label="Medium" />
              <ProgressIndicator value={50} size="large" label="Large" />
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Animated Progress</h2>
            <p className="demo-group__description">
              Progress indicators can be animated to show real-time progress updates.
            </p>
            <div className="demo-content">
              <ProgressIndicator value={animatedValue} label="Loading..." showValue />
            </div>
          </div>
        </div>

        <Divider variant="solid" />

        <div className="page__tabs-content-container">
          <div className="demo-group">
            <div className="page__navigation">
              <Link
                to="/pill-toggle"
                className="page__nav-link page__nav-link--prev"
              >
                <span className="page__nav-label">Previous</span>
                <span className="page__nav-title">Pill Toggle</span>
              </Link>
              <Link
                to="/progress-circle"
                className="page__nav-link page__nav-link--next"
              >
                <span className="page__nav-label">Next</span>
                <span className="page__nav-title">Progress Circle</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
