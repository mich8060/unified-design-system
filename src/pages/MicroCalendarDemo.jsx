import React, { useState } from "react";
import { Link } from "react-router-dom";
import MicroCalendar from "../ui/MicroCalendar/MicroCalendar";
import Flex from "../ui/Flex/Flex";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Divider from "../ui/Divider/Divider";
import { formatLastUpdated } from "../utils/formatDate";

export default function MicroCalendarDemo() {
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 0, 1)); // January 1, 2026
  const [selectedDate2, setSelectedDate2] = useState(null);

  // Example unavailable dates (matching the design: days 4, 5, 6, 7)
  const unavailableDates = [
    new Date(2026, 0, 4), // January 4
    new Date(2026, 0, 5), // January 5
    new Date(2026, 0, 6), // January 6
    new Date(2026, 0, 7), // January 7
  ];

  // Example date data with travel and assignment flags (matching the design)
  const dateData = {
    "2026-01-01": { travel: false, onAssignment: false }, // Selected - light blue
    "2026-01-08": { travel: false, onAssignment: true }, // On Assignment - dark blue
    "2026-01-25": { travel: true, onAssignment: false }, // Travel - green triangle
    "2026-01-26": { travel: false, onAssignment: true }, // On Assignment - blue circle
    "2026-01-27": { travel: false, onAssignment: true }, // On Assignment - blue circle
    "2026-01-28": { travel: false, onAssignment: true }, // On Assignment - blue circle
    "2026-01-29": { travel: false, onAssignment: true }, // On Assignment - blue circle
    "2026-01-30": { travel: false, onAssignment: true }, // On Assignment - blue circle
    "2026-01-31": { travel: true, onAssignment: true }, // Both - green triangle and blue circle
  };

  return (
    <section className="page">
      <header className="page__header">
        <div className="page__header-container">
          <Breadcrumb />
          <div className="page__header-info">
            <div className="page__header-content">
              <h1 className="page__header-title">Micro Calendar</h1>
              <p className="page__header-description">
                A compact, minimal calendar component perfect for inline date selection
                or displaying dates in small spaces. The micro calendar shows a single
                month view without navigation controls.
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
              A micro calendar with month navigation, date selection, and expand/collapse functionality. Click on any date to select it.
            </p>
            <div className="demo-content">
              <MicroCalendar
                value={selectedDate}
                onDateSelect={setSelectedDate}
                month={new Date(2026, 0, 1)} // January 2026
                showExpandCollapse={false}
              />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">With Date States</h2>
            <p className="demo-group__description">
              The calendar supports multiple date states: Available (white), Selected (light blue), On Assignment (dark blue with circle icon), Unavailable (red line), and Travel (green triangle icon).
            </p>
            <div className="demo-content">
              <MicroCalendar
                value={selectedDate}
                onDateSelect={setSelectedDate}
                unavailableDates={unavailableDates}
                dateData={dateData}
                month={new Date(2026, 0, 1)} // January 2026
              />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Collapsed State</h2>
            <p className="demo-group__description">
              The calendar can start in a collapsed state, showing only the first row of days. Click the expand button to show all days.
            </p>
            <div className="demo-content">
              <MicroCalendar
                value={selectedDate2}
                onDateSelect={setSelectedDate2}
                defaultExpanded={false}
                month={new Date(2026, 0, 1)} // January 2026
              />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Without Legend</h2>
            <p className="demo-group__description">
              The legend can be hidden if you prefer a more compact display.
            </p>
            <div className="demo-content">
              <MicroCalendar
                value={selectedDate}
                onDateSelect={setSelectedDate}
                showLegend={false}
                month={new Date(2026, 0, 1)} // January 2026
              />
            </div>
          </div>
        </div>

        <Divider variant="solid" />

        <div className="page__tabs-content-container">
          <div className="demo-group">
            <div className="page__navigation">
              <Link
                to="/datepicker"
                className="page__nav-link page__nav-link--prev"
              >
                <span className="page__nav-label">Previous</span>
                <span className="page__nav-title">Datepicker</span>
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
