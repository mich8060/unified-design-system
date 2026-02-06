import React, { useState } from "react";
import Steps from "../ui/Steps/Steps";
import Flex from "../ui/Flex/Flex";
import Button from "../ui/Button/Button";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Divider from "../ui/Divider/Divider";
import { Link } from "react-router-dom";
import { formatLastUpdated } from "../utils/formatDate";

/**
 * Steps Component Demo & Documentation
 *
 * This page demonstrates the Steps component and its various configurations.
 *
 * ## Steps Component Props:
 *
 * ### Required Props:
 * - `steps` (array): Array of step objects. Each step should have: { label, optionalLabel, status }
 *
 * ### Optional Props:
 * - `orientation` (string): Orientation of the steps
 *   - Options: 'horizontal', 'vertical'
 *   - Default: 'horizontal'
 *
 * - `size` (string): Size variant
 *   - Options: 'default', 'compact'
 *   - Default: 'default'
 *
 * - `displayLabel` (boolean): Whether to display labels
 *   - Default: true
 *
 * ## Step Object Properties:
 * - `label` (string): Main label text for the step
 * - `optionalLabel` (string): Optional secondary label text
 * - `status` (string): Status of the step: 'complete', 'active', 'incomplete', 'disabled', 'error', 'warning'
 *
 * ## Usage Examples:
 *
 * Basic steps:
 * ```jsx
 * const steps = [
 *   { label: 'Step 1', status: 'complete' },
 *   { label: 'Step 2', status: 'active' },
 *   { label: 'Step 3', status: 'incomplete' },
 * ];
 * <Steps steps={steps} />
 * ```
 *
 * Vertical steps:
 * ```jsx
 * <Steps steps={steps} orientation="vertical" />
 * ```
 */

const basicSteps = [
  { label: "Step 1", optionalLabel: "Optional", status: "complete" },
  { label: "Step 2", optionalLabel: "Optional", status: "active" },
  { label: "Step 3", optionalLabel: "Optional", status: "incomplete" },
];

const multiStepExample = [
  { label: "Step 1", status: "complete" },
  { label: "Step 2", status: "complete" },
  { label: "Step 3", status: "active" },
  { label: "Step 4", status: "incomplete" },
  { label: "Step 5", status: "incomplete" },
];

export default function StepsDemo() {
  const [currentStep, setCurrentStep] = useState(2);

  const processSteps = [
    { label: "Order Placed", optionalLabel: "Jan 15", status: "complete" },
    { label: "Processing", optionalLabel: "Jan 16", status: "complete" },
    { label: "Shipped", optionalLabel: "Jan 18", status: "active" },
    { label: "Delivered", optionalLabel: "Jan 20", status: "incomplete" },
  ];

  const errorSteps = [
    { label: "Step 1", status: "complete" },
    { label: "Step 2", status: "complete" },
    { label: "Step 3", status: "error" },
    { label: "Step 4", status: "incomplete" },
  ];

  const warningSteps = [
    { label: "Step 1", status: "complete" },
    { label: "Step 2", status: "warning" },
    { label: "Step 3", status: "incomplete" },
  ];

  const disabledSteps = [
    { label: "Step 1", status: "complete" },
    { label: "Step 2", status: "active" },
    { label: "Step 3", status: "disabled" },
    { label: "Step 4", status: "incomplete" },
  ];

  const dynamicSteps = [
    { label: "Step 1", status: currentStep >= 1 ? "complete" : "incomplete" },
    {
      label: "Step 2",
      status:
        currentStep >= 2
          ? "complete"
          : currentStep === 2
            ? "active"
            : "incomplete",
    },
    {
      label: "Step 3",
      status:
        currentStep >= 3
          ? "complete"
          : currentStep === 3
            ? "active"
            : "incomplete",
    },
    {
      label: "Step 4",
      status:
        currentStep >= 4
          ? "complete"
          : currentStep === 4
            ? "active"
            : "incomplete",
    },
  ];
  
  return (
    <section className="page">
      <header className="page__header">
        <div className="page__header-container">
          <Breadcrumb />
          <div className="page__header-info">
            <div className="page__header-content">
              <h1 className="page__header-title">Steps</h1>
              <p className="page__header-description">
                The Steps component displays a multi-step process or timeline, showing
          progress through a sequence of steps. Supports horizontal and vertical
          orientations, multiple status states, and optional labels for each
          step.
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
            <h2 className="demo-group__heading">Basic Steps</h2>
            <p className="demo-group__description">
              Steps display a multi-step process with different status states: complete, active, and incomplete.
            </p>
            <div className="demo-content">
              <Steps steps={basicSteps} />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Multi-Step Process</h2>
            <p className="demo-group__description">
              Steps can display longer processes with multiple stages, showing progress through a sequence.
            </p>
            <div className="demo-content">
              <Steps steps={multiStepExample} />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">With Optional Labels</h2>
            <p className="demo-group__description">
              Steps can include optional secondary labels, such as dates or additional context.
            </p>
            <div className="demo-content">
              <Steps steps={processSteps} />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Error State</h2>
            <p className="demo-group__description">
              Steps can display error states to indicate that a step has failed or encountered an issue.
            </p>
            <div className="demo-content">
              <Steps steps={errorSteps} />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Warning State</h2>
            <p className="demo-group__description">
              Steps can display warning states to indicate that a step needs attention or has a non-critical issue.
            </p>
            <div className="demo-content">
              <Steps steps={warningSteps} />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Disabled State</h2>
            <p className="demo-group__description">
              Steps can be disabled to indicate that certain steps are not yet available or cannot be accessed.
            </p>
            <div className="demo-content">
              <Steps steps={disabledSteps} />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Vertical Orientation</h2>
            <p className="demo-group__description">
              Steps can be displayed vertically, which is useful for sidebars or when horizontal space is limited.
            </p>
            <div className="demo-content">
              <Steps steps={basicSteps} orientation="vertical" />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Compact Size</h2>
            <p className="demo-group__description">
              Steps are available in a compact size variant for use in tighter spaces.
            </p>
            <div className="demo-content">
              <Steps steps={multiStepExample} size="compact" />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Dynamic Steps</h2>
            <p className="demo-group__description">
              Steps can be controlled dynamically, updating their status based on user actions or process completion.
            </p>
            <div className="demo-content">
              <Steps steps={dynamicSteps} />
              <Flex direction="row" gap="8" style={{ marginTop: '16px' }}>
                <Button
                  appearance="outline"
                  size="small"
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                >
                  Previous
                </Button>
                <Button
                  appearance="primary"
                  size="small"
                  onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                  disabled={currentStep === 4}
                >
                  Next
                </Button>
              </Flex>
            </div>
          </div>
        </div>

        <Divider variant="solid" />

        <div className="page__tabs-content-container">
          <div className="demo-group">
            <div className="page__navigation">
              <Link
                to="/status"
                className="page__nav-link page__nav-link--prev"
              >
                <span className="page__nav-label">Previous</span>
                <span className="page__nav-title">Status</span>
              </Link>
              <Link
                to="/table"
                className="page__nav-link page__nav-link--next"
              >
                <span className="page__nav-label">Next</span>
                <span className="page__nav-title">Table</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
