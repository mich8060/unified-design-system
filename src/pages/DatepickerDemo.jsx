import React, { useState } from "react";
import { Link } from "react-router-dom";
import Datepicker from "../ui/Datepicker/Datepicker";
import Flex from "../ui/Flex/Flex";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Divider from "../ui/Divider/Divider";
import { formatLastUpdated } from "../utils/formatDate";

/**
 * Datepicker Component Demo & Documentation
 *
 * This page demonstrates the Datepicker component and its various configurations.
 */
export default function DatepickerDemo() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);

  // Example unavailable dates
  const unavailableDates = [
    new Date(2025, 3, 5), // April 5
    new Date(2025, 3, 12), // April 12
    new Date(2025, 3, 19), // April 19
  ];

  // Example date data with travel and assignment flags
  const dateData = {
    "2025-04-25": { travel: true, onAssignment: true },
    "2025-04-26": { travel: true, onAssignment: false },
    "2025-04-27": { travel: true, onAssignment: false },
    "2025-04-28": { travel: false, onAssignment: true },
    "2025-04-29": { travel: true, onAssignment: true },
    "2025-04-30": { travel: true, onAssignment: false },
  };

  const handleDateSelect = (date) => {
    if (!rangeStart || (rangeStart && rangeEnd)) {
      // Start new range
      setRangeStart(date);
      setRangeEnd(null);
      setSelectedDate(date);
    } else {
      // Complete range
      if (date < rangeStart) {
        setRangeEnd(rangeStart);
        setRangeStart(date);
      } else {
        setRangeEnd(date);
      }
      setSelectedDate(date);
    }
  };

  const clearSelection = () => {
    setSelectedDate(null);
    setRangeStart(null);
    setRangeEnd(null);
  };

  return (
    <section className="page">
      <header className="page__header">
        <div className="page__header-container">
          <Breadcrumb />
          <div className="page__header-info">
            <div className="page__header-content">
              <h1 className="page__header-title">Datepicker</h1>
              <p className="page__header-description">
                A compact calendar component for displaying dates with various
                states, icons, and selection capabilities. Perfect for
                availability calendars, date pickers, and scheduling interfaces.
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
              A simple datepicker for selecting a single date. Click on any date to select it.
            </p>
            <div className="demo-content">
              <Datepicker
                value={selectedDate}
                onDateSelect={setSelectedDate}
              />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Date Range Selection</h2>
            <p className="demo-group__description">
              Select a range of dates by clicking a start date and then an end date. The range will be highlighted.
            </p>
            <div className="demo-content">
              <Datepicker
                startDate={rangeStart}
                endDate={rangeEnd}
                onDateSelect={handleDateSelect}
              />
              {(rangeStart || rangeEnd) && (
                <div style={{ marginTop: "16px" }}>
                  <p>
                    Range: {rangeStart?.toLocaleDateString()} - {rangeEnd?.toLocaleDateString() || "Select end date"}
                  </p>
                  <button onClick={clearSelection} style={{ marginTop: "8px" }}>
                    Clear Selection
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">With Unavailable Dates</h2>
            <p className="demo-group__description">
              Some dates can be marked as unavailable and will be disabled for selection.
            </p>
            <div className="demo-content">
              <Datepicker
                value={selectedDate}
                onDateSelect={setSelectedDate}
                unavailableDates={unavailableDates}
              />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">With Date Data</h2>
            <p className="demo-group__description">
              Dates can display additional information such as travel status or assignment indicators.
            </p>
            <div className="demo-content">
              <Datepicker
                value={selectedDate}
                onDateSelect={setSelectedDate}
                dateData={dateData}
              />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Mobile Size</h2>
            <p className="demo-group__description">
              The datepicker can be displayed in a smaller mobile size for compact layouts.
            </p>
            <div className="demo-content">
              <Datepicker
                value={selectedDate}
                onDateSelect={setSelectedDate}
                size="mobile"
              />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Without Weekday Header</h2>
            <p className="demo-group__description">
              The weekday header can be hidden for a more compact display.
            </p>
            <div className="demo-content">
              <Datepicker
                value={selectedDate}
                onDateSelect={setSelectedDate}
                showWeekdays={false}
              />
            </div>
          </div>
        </div>

        <Divider variant="solid" />

        <div className="page__tabs-content-container">
          <div className="demo-group">
            <div className="page__navigation">
              <Link
                to="/chip"
                className="page__nav-link page__nav-link--prev"
              >
                <span className="page__nav-label">Previous</span>
                <span className="page__nav-title">Chip</span>
              </Link>
              <Link
                to="/divider"
                className="page__nav-link page__nav-link--next"
              >
                <span className="page__nav-label">Next</span>
                <span className="page__nav-title">Divider</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
