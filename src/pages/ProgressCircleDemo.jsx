import React, { useState, useEffect } from "react";
import ProgressCircle from "../ui/ProgressCircle/ProgressCircle";
import Flex from "../ui/Flex/Flex";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Divider from "../ui/Divider/Divider";
import { Link } from "react-router-dom";
import { formatLastUpdated } from "../utils/formatDate";

/**
 * ProgressCircle Component Demo & Documentation
 *
 * This page demonstrates the ProgressCircle component and its various configurations.
 *
 * ## ProgressCircle Component Props:
 *
 * ### Required Props:
 * - None
 *
 * ### Optional Props:
 * - `value` (number): Progress value (0-100 or 0-max)
 *   - Default: 40
 *
 * - `max` (number): Maximum value
 *   - Default: 100
 *
 * - `size` (string): Size variant
 *   - Options: 'xxs', 'xs', 'sm', 'md', 'lg'
 *   - Default: 'md'
 *
 * - `shape` (string): Shape variant
 *   - Options: 'circle' (full circle) or 'half-circle' (semi-circle)
 *   - Default: 'circle'
 *
 * - `label` (string): Optional label text to display
 *
 * - `showLabel` (boolean): Whether to show the label (if provided)
 *   - Default: true
 *
 * ## Usage Examples:
 *
 * Basic progress circle:
 * ```jsx
 * <ProgressCircle value={50} />
 * ```
 *
 * With label:
 * ```jsx
 * <ProgressCircle value={75} label="Active users" />
 * ```
 *
 * Half circle:
 * ```jsx
 * <ProgressCircle value={60} shape="half-circle" label="Progress" />
 * ```
 */

export default function ProgressCircleDemo() {
  const [animatedValue, setAnimatedValue] = useState(0);

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

  return (
    <section className="page">
      <header className="page__header">
        <div className="page__header-container">
          <Breadcrumb />
          <div className="page__header-info">
            <div className="page__header-content">
              <h1 className="page__header-title">Progress Circle</h1>
              <p className="page__header-description">
                The ProgressCircle component displays circular progress indicators for
          showing completion status, metrics, or any task that has a measurable
          completion state. Supports multiple sizes, full circle and half-circle
          shapes, and optional labels.
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
              Progress circles display circular progress indicators, perfect for showing completion status in a compact format.
            </p>
            <Flex direction="row" gap="24" wrap={true} alignItems="center" className="demo-content">
              <ProgressCircle value={25} />
              <ProgressCircle value={50} />
              <ProgressCircle value={75} />
              <ProgressCircle value={100} />
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">With Labels</h2>
            <p className="demo-group__description">
              Progress circles can display labels below the circle to provide context about what is being measured.
            </p>
            <Flex direction="row" gap="24" wrap={true} alignItems="center" className="demo-content">
              <ProgressCircle value={45} label="Upload" />
              <ProgressCircle value={67} label="Processing" />
              <ProgressCircle value={89} label="Complete" />
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Sizes</h2>
            <p className="demo-group__description">
              Progress circles are available in five sizes: xxs, xs, sm, md (default), and lg.
            </p>
            <Flex direction="row" gap="24" wrap={true} alignItems="center" className="demo-content">
              <ProgressCircle value={50} size="xxs" label="XXS" />
              <ProgressCircle value={50} size="xs" label="XS" />
              <ProgressCircle value={50} size="sm" label="SM" />
              <ProgressCircle value={50} size="md" label="MD" />
              <ProgressCircle value={50} size="lg" label="LG" />
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Shapes</h2>
            <p className="demo-group__description">
              Progress circles can be displayed as full circles or half-circles (semi-circles).
            </p>
            <Flex direction="row" gap="24" wrap={true} alignItems="center" className="demo-content">
              <ProgressCircle value={60} shape="circle" label="Full Circle" />
              <ProgressCircle value={60} shape="half-circle" label="Half Circle" />
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Animated Progress</h2>
            <p className="demo-group__description">
              Progress circles can be animated to show real-time progress updates.
            </p>
            <div className="demo-content">
              <Flex direction="row" gap="24" alignItems="center">
                <ProgressCircle value={animatedValue} label="Loading..." />
              </Flex>
            </div>
          </div>
        </div>

        <Divider variant="solid" />

        <div className="page__tabs-content-container">
          <div className="demo-group">
            <div className="page__navigation">
              <Link
                to="/progress-indicator"
                className="page__nav-link page__nav-link--prev"
              >
                <span className="page__nav-label">Previous</span>
                <span className="page__nav-title">Progress Indicator</span>
              </Link>
              <Link
                to="/radio"
                className="page__nav-link page__nav-link--next"
              >
                <span className="page__nav-label">Next</span>
                <span className="page__nav-title">Radio</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
