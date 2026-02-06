/**
 * Format date as "Month Day, Year" (e.g., "March 11, 2025")
 * @param {Date} date - Date object to format (defaults to today)
 * @returns {string} Formatted date string
 */
export function formatLastUpdated(date = new Date()) {
  const months = [
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

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}
