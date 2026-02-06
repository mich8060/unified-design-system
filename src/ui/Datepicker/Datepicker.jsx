import React, { useState, useMemo } from "react";
import Button from "../Button/Button";
import "./Datepicker.scss";

const BASE_CLASS = "uds-datepicker";

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
 * Datepicker component - A calendar component for date selection with range support
 * @param {Date} value - Selected date (optional)
 * @param {Date} startDate - Start date for range selection (optional)
 * @param {Date} endDate - End date for range selection (optional)
 * @param {Date} month - Month to display (default: current month)
 * @param {function} onDateSelect - Callback when a date is selected: (date: Date) => void
 * @param {array} unavailableDates - Array of dates that are unavailable
 * @param {object} dateData - Object mapping dates to data (travel, onAssignment)
 * @param {string} size - Calendar size: 'desktop' or 'mobile' (default: 'desktop')
 * @param {boolean} showWeekdays - Whether to show weekday header (default: true)
 * @param {string} className - Additional CSS classes
 * @param {object} props - Additional props
 */
export default function Datepicker({
  value,
  startDate,
  endDate,
  month,
  onDateSelect,
  unavailableDates = [],
  dateData = {},
  size = "desktop",
  showWeekdays = true,
  className = "",
  ...props
}) {
  const [currentMonth, setCurrentMonth] = useState(month || new Date());
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

  const isInRange = (date) => {
    if (!date || !startDate || !endDate) return false;
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(0, 0, 0, 0);
    return checkDate >= start && checkDate <= end;
  };

  const isRangeStart = (date) => {
    if (!date || !startDate) return false;
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    return checkDate.getTime() === start.getTime();
  };

  const isRangeEnd = (date) => {
    if (!date || !endDate) return false;
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(0, 0, 0, 0);
    return checkDate.getTime() === end.getTime();
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

  const classNames = [
    BASE_CLASS,
    size === "mobile" && `${BASE_CLASS}--mobile`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

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
      {showWeekdays && (
        <div className={`${BASE_CLASS}__weekdays`}>
          {DAYS_OF_WEEK.map((day, index) => (
            <div key={index} className={`${BASE_CLASS}__weekday`}>
              {day}
            </div>
          ))}
        </div>
      )}

      {/* Calendar Grid */}
      <div className={`${BASE_CLASS}__grid`}>
        {calendarDays.map((date, index) => {
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
          const inRange = isInRange(date);
          const rangeStart = isRangeStart(date);
          const rangeEnd = isRangeEnd(date);

          // Determine if this is first or last day of on-assignment string
          const firstOnAssignment = isFirstOnAssignmentDay(date, index);
          const lastOnAssignment = isLastOnAssignmentDay(date, index);

          // Determine icon order based on rules:
          // - First day of on-assignment string with travel: travel comes first
          // - Last day of on-assignment string with both: on-assignment comes first
          // - Default: travel first, then on-assignment
          const showAssignmentFirst = lastOnAssignment && travel && onAssignment;

          let dayState = "available";
          if (unavailable) {
            dayState = "unavailable";
          } else if (selected || rangeStart || rangeEnd) {
            dayState = "selected";
          } else if (inRange) {
            dayState = "range";
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
                rangeStart && `${BASE_CLASS}__day--range-start`,
                rangeEnd && `${BASE_CLASS}__day--range-end`,
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
  );
}
