import React from "react";
import { Link } from "react-router-dom";
import ImageAspect from "../ui/ImageAspect/ImageAspect";
import Flex from "../ui/Flex/Flex";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Divider from "../ui/Divider/Divider";
import { formatLastUpdated } from "../utils/formatDate";

/**
 * ImageAspect Component Demo & Documentation
 *
 * This page demonstrates the ImageAspect component and its various configurations.
 *
 * ## ImageAspect Component Props:
 *
 * ### Optional Props:
 * - `ratio` (string): Aspect ratio variant
 *   - Options: 'square', 'video', '4-3', '3-2', '21-9', 'portrait', 'auto'
 *   - Default: 'square'
 *
 * - `src` (string): Image source URL
 * - `alt` (string): Alt text for the image
 *
 * ## Usage Examples:
 *
 * Basic image aspect:
 * ```jsx
 * <ImageAspect ratio="square" src="/path/to/image.jpg" alt="Description" />
 * ```
 *
 * Video aspect ratio:
 * ```jsx
 * <ImageAspect ratio="video" src="/path/to/image.jpg" alt="Description" />
 * ```
 *
 * Portrait aspect ratio:
 * ```jsx
 * <ImageAspect ratio="portrait" src="/path/to/image.jpg" alt="Description" />
 * ```
 */

const ratios = ["square", "video", "4-3", "3-2", "21-9", "portrait", "auto"];

// Placeholder image URL (using a placeholder service)
const placeholderImage = "https://via.placeholder.com/400";

export default function ImageAspectDemo() {

  return (
    <section className="page">
      <header className="page__header">
        <div className="page__header-container">
          <Breadcrumb />
          <div className="page__header-info">
            <div className="page__header-content">
              <h1 className="page__header-title">Image Aspect</h1>
              <p className="page__header-description">
                The Image Aspect component maintains consistent aspect ratios for
          images, ensuring they display correctly regardless of their original
          dimensions. Perfect for creating uniform image grids, galleries, or
          maintaining brand logo consistency across different sizes.
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
            <h2 className="demo-group__heading">Aspect Ratios</h2>
            <p className="demo-group__description">
              The Image Aspect component maintains consistent aspect ratios for images. Choose from various predefined ratios to ensure uniform display across different image sizes.
            </p>
            <Flex direction="row" gap="16" wrap={true} className="demo-content">
              {ratios.map((ratio) => (
                <Flex key={ratio} direction="column" gap="8" alignItems="center">
                  <ImageAspect
                    ratio={ratio}
                    src={placeholderImage}
                    alt={`${ratio} aspect ratio`}
                  />
                  <span style={{ fontSize: '12px', color: 'var(--uds-text-secondary)' }}>
                    {ratio}
                  </span>
                </Flex>
              ))}
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Placeholder</h2>
            <p className="demo-group__description">
              When no image source is provided, the component displays a placeholder with the aspect ratio maintained.
            </p>
            <Flex direction="row" gap="16" wrap={true} className="demo-content">
              <ImageAspect ratio="square" alt="Square placeholder" />
              <ImageAspect ratio="video" alt="Video placeholder" />
              <ImageAspect ratio="portrait" alt="Portrait placeholder" />
            </Flex>
          </div>
        </div>

        <Divider variant="solid" />

        <div className="page__tabs-content-container">
          <div className="demo-group">
            <div className="page__navigation">
              <Link
                to="/file-upload"
                className="page__nav-link page__nav-link--prev"
              >
                <span className="page__nav-label">Previous</span>
                <span className="page__nav-title">File Upload</span>
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
