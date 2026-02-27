import React from "react";
import Icon from "../Icon/Icon";
import "./_table.scss";
import type { TableProps } from "./Table.types";

const BASE_CLASS = "uds-table";

/**
 * Table component for displaying tabular data
 * @param {array} columns - Array of column definitions
 * @param {array} data - Array of data rows
 * @param {string} className - Additional CSS classes
 * @param {object} props - Additional props to pass to the table element
 */
export default function Table({
  columns = [],
  data = [],
  className = "",
  bodyWeight = "medium",
  ...props
}: TableProps) {
  const classNames = [
    BASE_CLASS,
    `${BASE_CLASS}--body-weight-${bodyWeight}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`${BASE_CLASS}__wrapper`}>
      <table className={classNames} {...props}>
        {columns.length > 0 && (
          <thead className={`${BASE_CLASS}__head`}>
            <tr className={`${BASE_CLASS}__row`}>
              {columns.map((column, index) => (
                <TableCell
                  key={column.key || index}
                  type="header"
                  column={column}
                  index={index}
                />
              ))}
            </tr>
          </thead>
        )}
        <tbody className={`${BASE_CLASS}__body`}>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={`${BASE_CLASS}__row`}>
              {columns.map((column, colIndex) => (
                <TableCell
                  key={column.key || colIndex}
                  type="cell"
                  column={column}
                  row={row}
                  rowIndex={rowIndex}
                  colIndex={colIndex}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * TableCell component - flexible cell that can render different content types
 * @param {string} type - Cell type: 'header' or 'cell'
 * @param {object} column - Column definition
 * @param {object} row - Row data (for data cells)
 * @param {number} rowIndex - Row index
 * @param {number} colIndex - Column index
 */
function TableCell({ type, column, row, rowIndex, colIndex }) {
  const isHeader = type === "header";
  const Element = isHeader ? "th" : "td";
  const cellValue = isHeader
    ? column.label
    : (row?.[column.key] ?? column.render?.(row, rowIndex, colIndex));

  const classNames = [
    `${BASE_CLASS}__cell`,
    isHeader && `${BASE_CLASS}__cell--header`,
    column.align && `${BASE_CLASS}__cell--${column.align}`,
    column.className,
  ]
    .filter(Boolean)
    .join(" ");

  // Handle different cell content types
  const renderCellContent = () => {
    // If column has a render function, use it
    if (!isHeader && column.render) {
      return column.render(row, rowIndex, colIndex);
    }

    // If cellValue is already a React element, return it
    if (React.isValidElement(cellValue)) {
      return cellValue;
    }

    // Handle header cells with icons
    if (isHeader) {
      return (
        <div className={`${BASE_CLASS}__cell-content`}>
          {column.icon && (
            <Icon
              name={column.icon}
              size={16}
              appearance="regular"
              className={`${BASE_CLASS}__cell-icon`}
            />
          )}
          {column.label && (
            <span className={`${BASE_CLASS}__cell-label`}>{column.label}</span>
          )}
          {column.sortable && (
            <Icon
              name="CaretUpDown"
              size={16}
              appearance="regular"
              className={`${BASE_CLASS}__cell-sort-icon`}
            />
          )}
          {column.filterable && (
            <Icon
              name="Funnel"
              size={16}
              appearance="regular"
              className={`${BASE_CLASS}__cell-filter-icon`}
            />
          )}
        </div>
      );
    }

    // Handle data cells
    return (
      <div className={`${BASE_CLASS}__cell-content`}>
        {cellValue != null ? String(cellValue) : ""}
      </div>
    );
  };

  return <Element className={classNames}>{renderCellContent()}</Element>;
}

// Export TableCell for external use if needed
Table.Cell = TableCell;
