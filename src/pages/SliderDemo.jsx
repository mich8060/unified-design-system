import React, { useState } from "react";
import Slider from "../ui/Slider/Slider";
import Flex from "../ui/Flex/Flex";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Divider from "../ui/Divider/Divider";
import { Link } from "react-router-dom";
import { formatLastUpdated } from "../utils/formatDate";

/**
 * Slider Component Demo & Documentation
 *
 * This page demonstrates the Slider component and its various configurations.
 *
 * ## Slider Component Props:
 *
 * ### Required Props:
 * - None
 *
 * ### Optional Props:
 * - `value` (number|array): Current value(s). For single slider: number. For range slider: [min, max] array
 *   - Default: min (single) or [min, max] (range)
 *
 * - `onChange` (function): Callback function when slider value changes
 *   - Receives the new value(s) as an argument
 *
 * - `min` (number): Minimum value
 *   - Default: 0
 *
 * - `max` (number): Maximum value
 *   - Default: 100
 *
 * - `step` (number): Step increment
 *   - Default: 1
 *
 * - `range` (boolean): Whether to use range mode (two handles)
 *   - Default: false
 *
 * - `showLabels` (boolean): Whether to show value labels
 *   - Default: false
 *
 * - `label` (string): Optional label text to display above the slider
 *
 * - `disabled` (boolean): Whether the slider is disabled
 *   - Default: false
 *
 * ## Usage Examples:
 *
 * Basic single slider:
 * ```jsx
 * const [value, setValue] = useState(50);
 * <Slider value={value} onChange={setValue} />
 * ```
 *
 * Range slider:
 * ```jsx
 * const [value, setValue] = useState([25, 75]);
 * <Slider range value={value} onChange={setValue} />
 * ```
 *
 * With labels:
 * ```jsx
 * <Slider value={value} onChange={setValue} showLabels />
 * ```
 */

export default function SliderDemo() {
  const [singleValue, setSingleValue] = useState(25);
  const [singleValue2, setSingleValue2] = useState(50);
  const [singleValue3, setSingleValue3] = useState(75);
  const [singleValue4, setSingleValue4] = useState(100);
  const [rangeValue1, setRangeValue1] = useState([25, 50]);
  const [rangeValue2, setRangeValue2] = useState([25, 75]);
  const [rangeValue3, setRangeValue3] = useState([50, 75]);
  const [rangeValue4, setRangeValue4] = useState([75, 100]);
  const [labeledSingle, setLabeledSingle] = useState(25);
  const [labeledRange, setLabeledRange] = useState([25, 50]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [volume, setVolume] = useState(50);
  
  return (
    <section className="page">
      <header className="page__header">
        <div className="page__header-container">
          <Breadcrumb />
          <div className="page__header-info">
            <div className="page__header-content">
              <h1 className="page__header-title">Slider</h1>
              <p className="page__header-description">
                The Slider component allows users to select a value or range of values
          by dragging a handle along a track. Supports both single-handle and
          range (two-handle) modes, with optional labels and customizable
          min/max values.
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
              Single-handle sliders allow users to select a value within a range by dragging the handle along the track.
            </p>
            <Flex direction="column" gap="24" className="demo-content">
              <Slider value={singleValue} onChange={setSingleValue} />
              <Slider value={singleValue2} onChange={setSingleValue2} />
              <Slider value={singleValue3} onChange={setSingleValue3} />
              <Slider value={singleValue4} onChange={setSingleValue4} />
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Range Slider</h2>
            <p className="demo-group__description">
              Range sliders have two handles, allowing users to select a range of values. Perfect for price ranges, date ranges, or any min/max selection.
            </p>
            <Flex direction="column" gap="24" className="demo-content">
              <Slider range value={rangeValue1} onChange={setRangeValue1} />
              <Slider range value={rangeValue2} onChange={setRangeValue2} />
              <Slider range value={rangeValue3} onChange={setRangeValue3} />
              <Slider range value={rangeValue4} onChange={setRangeValue4} />
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">With Labels</h2>
            <p className="demo-group__description">
              Sliders can display labels and value indicators to provide context and show current values.
            </p>
            <Flex direction="column" gap="24" className="demo-content">
              <Slider
                value={labeledSingle}
                onChange={setLabeledSingle}
                label="Volume"
                showLabels
              />
              <Slider
                range
                value={labeledRange}
                onChange={setLabeledRange}
                label="Price Range"
                showLabels
              />
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Custom Range</h2>
            <p className="demo-group__description">
              Sliders support custom min and max values, making them suitable for various use cases like price ranges or custom scales.
            </p>
            <div className="demo-content">
              <Slider
                range
                value={priceRange}
                onChange={setPriceRange}
                min={0}
                max={1000}
                label="Price Range ($)"
                showLabels
              />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Disabled State</h2>
            <p className="demo-group__description">
              Disabled sliders prevent user interaction and are typically used when the control is not applicable.
            </p>
            <div className="demo-content">
              <Slider value={50} disabled label="Disabled Slider" />
            </div>
          </div>
        </div>

        <Divider variant="solid" />

        <div className="page__tabs-content-container">
          <div className="demo-group">
            <div className="page__navigation">
              <Link
                to="/radio"
                className="page__nav-link page__nav-link--prev"
              >
                <span className="page__nav-label">Previous</span>
                <span className="page__nav-title">Radio</span>
              </Link>
              <Link
                to="/status"
                className="page__nav-link page__nav-link--next"
              >
                <span className="page__nav-label">Next</span>
                <span className="page__nav-title">Status</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
