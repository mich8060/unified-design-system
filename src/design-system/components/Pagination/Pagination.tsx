import React, { useState } from "react";
import Icon from "../Icon/Icon";
import "./_pagination.scss";
import type { PaginationProps } from "./Pagination.types";

type PageToken = number | "ellipsis-start" | "ellipsis-end";

/**
 * Pagination component
 * @param {number} currentPage - Current active page (1-indexed)
 * @param {number} totalPages - Total number of pages
 * @param {function} onPageChange - Callback when page changes: (page: number) => void
 * @param {string} variant - Variant style: "default" | "line"
 * @param {boolean} showJumpInput - Toggle jump-to-page input
 * @param {boolean} showDoubleButtons - Toggle first/last page buttons
 * @param {boolean} showFirstLast - Backward-compatible alias for showDoubleButtons
 * @param {string} className - Additional CSS classes
 */
export default function Pagination({
  currentPage = 1,
  totalPages = 10,
  onPageChange,
  variant = "default",
  showJumpInput = false,
  showDoubleButtons = false,
  showFirstLast = false,
  className = "",
}: PaginationProps) {
  const [jumpToPage, setJumpToPage] = useState(currentPage.toString());

  // Ensure currentPage is within valid range
  const safeCurrentPage = Math.max(1, Math.min(currentPage, totalPages));

  // Calculate which page numbers to show
  const getPageNumbers = () => {
    const pages: PageToken[] = [];
    const maxVisible = 5; // Show up to 5 page numbers

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate start and end of middle range
      let start = Math.max(2, safeCurrentPage - 1);
      let end = Math.min(totalPages - 1, safeCurrentPage + 1);

      // Adjust if we're near the beginning
      if (safeCurrentPage <= 3) {
        end = Math.min(4, totalPages - 1);
      }

      // Adjust if we're near the end
      if (safeCurrentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - 3);
      }

      // Add ellipsis before middle range if needed
      if (start > 2) {
        pages.push("ellipsis-start");
      }

      // Add middle range
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis after middle range if needed
      if (end < totalPages - 1) {
        pages.push("ellipsis-end");
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePageClick = (page: number) => {
    if (page !== safeCurrentPage && page >= 1 && page <= totalPages && onPageChange) {
      onPageChange(page);
    }
  };

  const handlePrevious = () => {
    if (safeCurrentPage > 1) {
      handlePageClick(safeCurrentPage - 1);
    }
  };

  const handleNext = () => {
    if (safeCurrentPage < totalPages) {
      handlePageClick(safeCurrentPage + 1);
    }
  };

  const handleFirst = () => {
    handlePageClick(1);
  };

  const handleLast = () => {
    handlePageClick(totalPages);
  };

  const handleJumpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const page = parseInt(jumpToPage, 10);
    if (page >= 1 && page <= totalPages) {
      handlePageClick(page);
    } else {
      setJumpToPage(safeCurrentPage.toString());
    }
  };

  const handleJumpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJumpToPage(e.target.value);
  };

  const pageNumbers = getPageNumbers();
  const isLineVariant = variant === "line";
  const hasJumpInput = showJumpInput;
  const hasDoubleButtons = showDoubleButtons || showFirstLast;
  const hasEllipsis = pageNumbers.some(
    (page) => page === "ellipsis-start" || page === "ellipsis-end"
  );

  const centerItems = (() => {
    if (!hasJumpInput || !hasEllipsis) {
      return pageNumbers;
    }

    let jumpInserted = false;
    return pageNumbers.reduce<(PageToken | "jump")[]>(
      (accumulator, page) => {
        if (page === "ellipsis-start" || page === "ellipsis-end") {
          if (!jumpInserted) {
            accumulator.push("jump");
            jumpInserted = true;
          }
          return accumulator;
        }

        accumulator.push(page);
        return accumulator;
      },
      []
    );
  })();

  return (
    <nav className={`uds-pagination ${className}`} aria-label="Pagination">
      <div className={`uds-pagination__container ${isLineVariant ? "uds-pagination__container--underline" : ""} ${hasDoubleButtons ? "uds-pagination__container--double" : ""}`}>
        {/* First page button (only for double button variants) */}
        {hasDoubleButtons && (
          <button
            type="button"
            className="uds-pagination__cap uds-pagination__cap--first"
            onClick={handleFirst}
            disabled={safeCurrentPage === 1}
            aria-label="First page"
          >
            <Icon name="CaretDoubleLeft" size={16} />
          </button>
        )}

        {/* Previous page button */}
        <button
          type="button"
          className="uds-pagination__cap uds-pagination__cap--prev"
          onClick={handlePrevious}
          disabled={safeCurrentPage === 1}
          aria-label="Previous page"
        >
          <Icon name="CaretLeft" size={16} />
        </button>

        {/* Page numbers */}
        {centerItems.map((page, index) => {
          if (page === "jump") {
            return (
              <div key={`jump-${index}`} className="uds-pagination__jump">
                <form onSubmit={handleJumpSubmit}>
                  <input
                    type="number"
                    className="uds-pagination__jump-input"
                    value={jumpToPage}
                    onChange={handleJumpChange}
                    min="1"
                    max={totalPages}
                    aria-label="Jump to page"
                  />
                </form>
                <span className="uds-pagination__jump-label">of {totalPages}</span>
              </div>
            );
          }

          if (page === "ellipsis-start" || page === "ellipsis-end") {
            return (
              <button
                key={`ellipsis-${index}`}
                type="button"
                className="uds-pagination__item uds-pagination__item--ellipsis"
                disabled
                aria-hidden="true"
              >
                ...
              </button>
            );
          }

          const isActive = page === safeCurrentPage;

          return (
            <button
              key={page}
              type="button"
              className={`uds-pagination__item ${
                isActive ? "uds-pagination__item--active" : ""
              } ${isLineVariant ? "uds-pagination__item--underline" : ""}`}
              onClick={() => handlePageClick(page)}
              aria-label={`Page ${page}`}
              aria-current={isActive ? "page" : undefined}
            >
              {page}
            </button>
          );
        })}

        {/* Next page button */}
        <button
          type="button"
          className="uds-pagination__cap uds-pagination__cap--next"
          onClick={handleNext}
          disabled={safeCurrentPage === totalPages}
          aria-label="Next page"
        >
          <Icon name="CaretRight" size={16} />
        </button>

        {/* Last page button (only for double button variants) */}
        {hasDoubleButtons && (
          <button
            type="button"
            className="uds-pagination__cap uds-pagination__cap--last"
            onClick={handleLast}
            disabled={safeCurrentPage === totalPages}
            aria-label="Last page"
          >
            <Icon name="CaretDoubleRight" size={16} />
          </button>
        )}
      </div>
    </nav>
  );
}
