import React from "react";
import Tag from "../Tag/Tag";
import Icon from "../Icon/Icon";
import "./_event-card.scss";
import type { EventCardProps } from "./EventCard.types";

const BASE_CLASS = "uds-event-card";

/**
 * EventCard (Blade) — A visual scheduling event bar for calendars and lists.
 *
 * Displays events as colored bars with type-based coloring (travel, assignment,
 * unassigned), status styling (active, past, pending), optional badge, and
 * optional expand icon. Supports startCap/endCap for multi-day spanning.
 *
 * @param {string}   title       - Event title text
 * @param {string}   type        - Color type: "travel" | "assignment" | "unassigned"
 * @param {string}   status      - Visual status: "active" | "past" | "pending"
 * @param {string}   badge       - Badge label text (falsy to hide)
 * @param {boolean}  icon        - Show CornersOut expand icon
 * @param {boolean}  startCap    - Rounded left corners (true = start of event)
 * @param {boolean}  endCap      - Rounded right corners (true = end of event)
 * @param {function} onClick     - Click handler (renders as <button>)
 * @param {string}   className   - Additional CSS classes
 */
export default function EventCard({
  title = "Title",
  type = "travel",
  status = "active",
  color,
  badge,
  icon = false,
  startCap = true,
  endCap = true,
  onClick,
  className = "",
  ...rest
}: EventCardProps) {
  // Content is shown when startCap is true, or when there's an icon or badge
  const showContent = startCap || icon || !!badge;

  const classNames = [
    BASE_CLASS,
    `${BASE_CLASS}--${type}`,
    `${BASE_CLASS}--${status}`,
    color && `${BASE_CLASS}--color-${color}`,
    !startCap && `${BASE_CLASS}--no-start-cap`,
    !endCap && `${BASE_CLASS}--no-end-cap`,
    !showContent && `${BASE_CLASS}--bar-only`,
    onClick && `${BASE_CLASS}--clickable`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const Element = onClick ? "button" : "div";

  return (
    <Element
      className={classNames}
      onClick={onClick}
      type={onClick ? "button" : undefined}
      title={title}
      {...rest}
    >
      <div className={`${BASE_CLASS}__container`}>
        {status === "pending" && (
          <div className={`${BASE_CLASS}__pattern`} aria-hidden="true" />
        )}
        {showContent && (
          <div className={`${BASE_CLASS}__content`}>
            <span className={`${BASE_CLASS}__title`}>{title}</span>
            {badge && (
              <Tag
                label={badge}
                color="inverse"
                solid
                rounded
                size="compact"
              />
            )}
          </div>
        )}
        {icon && (
          <Icon
            name="CornersOut"
            size={16}
            appearance="regular"
            className={`${BASE_CLASS}__icon`}
          />
        )}
      </div>
    </Element>
  );
}
