import React, { useState, useMemo, useEffect } from "react";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import "./MicroCalendar.scss";

const BASE_CLASS = "uds-micro-calendar";

const DAYS_OF_WEEK = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * MicroCalendar component - A compact calendar with expand/collapse functionality
 * @param {Date} value - Selected date (optional)
 * @param {Date} month - Month to display (default: current month)
 * @param {function} onDateSelect - Callback when a date is selected: (date: Date) => void
 * @param {array} unavailableDates - Array of dates that are unavailable
 * @param {object} dateData - Object mapping dates to data (travel, onAssignment)
 * @param {boolean} defaultExpanded - Whether calendar starts expanded (default: true)
 * @param {boolean} showLegend - Whether to show the legend (default: true)
 * @param {boolean} showExpandCollapse - Whether to show the expand/collapse button (default: true)
 * @param {string} className - Additional CSS classes
 * @param {object} props - Additional props
 */
export default function MicroCalendar({
  value,
  month,
  onDateSelect,
  unavailableDates = [],
  dateData = {},
  defaultExpanded = true,
  showLegend = true,
  showExpandCollapse = true,
  className = "",
  ...props
}) {
  const [currentMonth, setCurrentMonth] = useState(month || new Date());
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const year = currentMonth.getFullYear();
  const monthIndex = currentMonth.getMonth();

  // Get first day of month and number of days
  const firstDay = new Date(year, monthIndex, 1);
  const lastDay = new Date(year, monthIndex + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const days = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, monthIndex, day);
      date.setHours(0, 0, 0, 0);
      days.push(date);
    }

    return days;
  }, [year, monthIndex, startingDayOfWeek, daysInMonth]);

  const isToday = (date) => {
    if (!date) return false;
    return date.getTime() === today.getTime();
  };

  const isSelected = (date) => {
    if (!date) return false;
    if (value) {
      const selectedDate = new Date(value);
      selectedDate.setHours(0, 0, 0, 0);
      return date.getTime() === selectedDate.getTime();
    }
    return false;
  };

  const isUnavailable = (date) => {
    if (!date) return false;
    return unavailableDates.some((unavail) => {
      const unavailDate = new Date(unavail);
      unavailDate.setHours(0, 0, 0, 0);
      return date.getTime() === unavailDate.getTime();
    });
  };

  const getDateData = (date) => {
    if (!date) return null;
    const dateKey = date.toISOString().split("T")[0];
    return dateData[dateKey] || null;
  };

  // Check if a date is the first day of a string of on-assignment days
  const isFirstOnAssignmentDay = (date, dateIndex) => {
    if (!date || !getDateData(date)?.onAssignment) return false;
    
    // Check previous day in calendar
    if (dateIndex > 0) {
      const prevDate = calendarDays[dateIndex - 1];
      if (prevDate && getDateData(prevDate)?.onAssignment) {
        return false; // Previous day also has onAssignment
      }
    }
    return true; // This is the first day
  };

  // Check if a date is the last day of a string of on-assignment days
  const isLastOnAssignmentDay = (date, dateIndex) => {
    if (!date || !getDateData(date)?.onAssignment) return false;
    
    // Check next day in calendar
    if (dateIndex < calendarDays.length - 1) {
      const nextDate = calendarDays[dateIndex + 1];
      if (nextDate && getDateData(nextDate)?.onAssignment) {
        return false; // Next day also has onAssignment
      }
    }
    return true; // This is the last day
  };

  const handleDateClick = (date) => {
    if (date && !isUnavailable(date) && onDateSelect) {
      onDateSelect(date);
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, monthIndex - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, monthIndex + 1, 1));
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Check if we're viewing the current month
  const isCurrentMonth = useMemo(() => {
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();
    return monthIndex === todayMonth && year === todayYear;
  }, [monthIndex, year, today]);

  // Calculate which week to show when collapsed
  const weekOffset = useMemo(() => {
    if (isExpanded) return 0;

    // If not viewing current month, always show first week
    if (!isCurrentMonth) {
      return 0;
    }

    // Find the index of today in the calendar
    const todayIndex = calendarDays.findIndex((date) => {
      if (!date) return false;
      return date.getTime() === today.getTime();
    });

    // If today is not in the current month's calendar, show first week
    if (todayIndex === -1) {
      return 0;
    }

    // Find the start of the week (Sunday = 0)
    const weekStartIndex = Math.floor(todayIndex / 7) * 7;
    return weekStartIndex / 7; // Convert to week number (0-based)
  }, [isExpanded, calendarDays, today, isCurrentMonth, monthIndex, year]);


  // Always show all days, we'll use transform to slide to the correct week when collapsed
  const visibleDays = calendarDays;

  // Calculate the number of weeks in the month for height adjustment
  const numberOfWeeks = useMemo(() => {
    return Math.ceil(calendarDays.length / 7);
  }, [calendarDays]);

  const classNames = [BASE_CLASS, className].filter(Boolean).join(" ");

  return (
    <div className={classNames} {...props}>
      {/* Header */}
      <div className={`${BASE_CLASS}__header`}>
        <Button icon="ArrowLeft" size="small" appearance="text" onClick={handlePrevMonth} aria-label="Previous month" />
        <h3 className={`${BASE_CLASS}__title`}>
          {MONTHS[monthIndex]} {year}
        </h3>
        <Button icon="ArrowRight" size="small" appearance="text" onClick={handleNextMonth} aria-label="Next month" />
      </div>

      {/* Weekday Header */}
      <div className={`${BASE_CLASS}__weekdays`}>
        {DAYS_OF_WEEK.map((day, index) => (
          <div key={index} className={`${BASE_CLASS}__weekday`}>
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div 
        key={`grid-${year}-${monthIndex}`}
        className={`${BASE_CLASS}__grid-wrapper ${isExpanded ? `${BASE_CLASS}__grid-wrapper--expanded` : `${BASE_CLASS}__grid-wrapper--collapsed}`}`}
        style={isExpanded ? { height: `${numberOfWeeks * 64.3}px` } : {}}
      >
        <div 
          className={`${BASE_CLASS}__grid`}
          style={{ 
            transform: !isExpanded 
              ? weekOffset === 0 
                ? 'translateY(0px)' 
                : `translateY(-${weekOffset * 64.3 - 1}px)`
              : 'translateY(0px)' 
          }}
        >
          {visibleDays.map((date, index) => {
          if (!date) {
            return (
              <div
                key={`empty-${index}`}
                className={`${BASE_CLASS}__day ${BASE_CLASS}__day--empty`}
              />
            );
          }

          const dateInfo = getDateData(date);
          const travel = dateInfo?.travel || false;
          const onAssignment = dateInfo?.onAssignment || false;
          const unavailable = isUnavailable(date);
          const today = isToday(date);
          const selected = isSelected(date);

          // Determine if this is first or last day of on-assignment string
          const firstOnAssignment = isFirstOnAssignmentDay(date, index);
          const lastOnAssignment = isLastOnAssignmentDay(date, index);

          // Determine icon order based on rules:
          // - First day of on-assignment string with travel: travel comes first
          // - Last day of on-assignment string with both: on-assignment comes first
          // - Default: travel first, then on-assignment
          const showTravelFirst = firstOnAssignment && travel && onAssignment;
          const showAssignmentFirst = lastOnAssignment && travel && onAssignment;

          let dayState = "available";
          if (unavailable) {
            dayState = "unavailable";
          } else if (selected) {
            dayState = "selected";
          } else if (onAssignment && !travel) {
            dayState = "on-assignment";
          }

          return (
            <button
              key={date.toISOString()}
              type="button"
              className={[
                `${BASE_CLASS}__day`,
                `${BASE_CLASS}__day--${dayState}`,
                today && `${BASE_CLASS}__day--today`,
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => handleDateClick(date)}
              disabled={unavailable}
              aria-label={`${date.getDate()} ${MONTHS[monthIndex]} ${year}`}
            >
              <span className={`${BASE_CLASS}__day-number`}>
                {date.getDate()}
              </span>
              {unavailable && (
                <span className={`${BASE_CLASS}__day-unavailable-line`} />
              )}
              {(travel || onAssignment) && (
                <div className={`${BASE_CLASS}__icons`}>
                  {showAssignmentFirst ? (
                    // Last day: on-assignment first, then travel
                    <>
                      {onAssignment && (
                        <span className={`${BASE_CLASS}__icon ${BASE_CLASS}__icon--assignment`}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="8" cy="8" r="7.5" fill="#DBEAFF" stroke="#1D4ED7"/>
                          </svg>
                        </span>
                      )}
                      {travel && (
                        <span className={`${BASE_CLASS}__icon ${BASE_CLASS}__icon--travel`}>
                          <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.5791 15.4736H0.865265L9.22171 1L17.5791 15.4736Z" fill="#DCFCE7" stroke="#157F3D"/>
                          </svg>
                        </span>
                      )}
                    </>
                  ) : (
                    // First day or default: travel first, then on-assignment
                    <>
                      {travel && (
                        <span className={`${BASE_CLASS}__icon ${BASE_CLASS}__icon--travel`}>
                          <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.5791 15.4736H0.865265L9.22171 1L17.5791 15.4736Z" fill="#DCFCE7" stroke="#157F3D"/>
                          </svg>
                        </span>
                      )}
                      {onAssignment && (
                        <span className={`${BASE_CLASS}__icon ${BASE_CLASS}__icon--assignment`}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="8" cy="8" r="7.5" fill="#DBEAFF" stroke="#1D4ED7"/>
                          </svg>
                        </span>
                      )}
                    </>
                  )}
                </div>
              )}
            </button>
          );
        })}
        </div>
      </div>

      {/* Legend */}
      {showLegend && isExpanded && (
        <div className={`${BASE_CLASS}__legend`}>
          <div className={`${BASE_CLASS}__legend-column`}>
            <div className={`${BASE_CLASS}__legend-item`}>
              <div className={`${BASE_CLASS}__legend-square ${BASE_CLASS}__legend-square--available`}>
              </div>
              <span className={`${BASE_CLASS}__legend-label`}>Available</span>
            </div>
            <div className={`${BASE_CLASS}__legend-item`}>
              <div className={`${BASE_CLASS}__legend-square ${BASE_CLASS}__legend-square--unavailable`}>
                <span className={`${BASE_CLASS}__legend-unavailable-line`} />
              </div>
              <span className={`${BASE_CLASS}__legend-label`}>Unavailable</span>
            </div>
          </div>
          <div className={`${BASE_CLASS}__legend-column`}>
            <div className={`${BASE_CLASS}__legend-item`}>
              <div className={`${BASE_CLASS}__legend-square ${BASE_CLASS}__legend-square--assignment`}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${BASE_CLASS}__legend-icon ${BASE_CLASS}__legend-icon--assignment`}>
                  <circle cx="8" cy="8" r="7.5" fill="#DBEAFF" stroke="#1D4ED7"/>
                </svg>
              </div>
              <span className={`${BASE_CLASS}__legend-label`}>On Assignment</span>
            </div>
            <div className={`${BASE_CLASS}__legend-item`}>
              <div className={`${BASE_CLASS}__legend-square ${BASE_CLASS}__legend-square--available`}>
                <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${BASE_CLASS}__legend-icon`}>
                  <path d="M17.5791 15.4736H0.865265L9.22171 1L17.5791 15.4736Z" fill="#DCFCE7" stroke="#157F3D"/>
                </svg>
              </div>
              <span className={`${BASE_CLASS}__legend-label`}>Travel</span>
            </div>
          </div>
        </div>
      )}

      {/* Expand/Collapse Button */}
      {showExpandCollapse && (
        <button
          type="button"
          className={`${BASE_CLASS}__toggle`}
          onClick={toggleExpand}
          aria-label={isExpanded ? "Collapse calendar" : "Expand calendar"}
        >
          <Icon name={isExpanded ? "CaretUp" : "CaretDown"} size={16} />
        </button>
      )}
    </div>
  );
}
