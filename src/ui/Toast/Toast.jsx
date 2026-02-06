import React from "react";
import Icon from "../Icon/Icon";
import "./Toast.scss";

const BASE_CLASS = "uds-toast";

const variantClassMap = {
  success: "success",
  error: "error",
  warning: "warning",
  info: "info",
};

const iconMap = {
  success: "CheckCircle",
  error: "XCircle",
  warning: "Warning",
  info: "Info",
};

/**
 * Toast component for displaying notification messages
 * @param {string} message - The message text to display
 * @param {string} variant - Toast variant: 'success', 'error', 'warning', 'info' (default: 'info')
 * @param {string} title - Optional title text
 * @param {boolean} showIcon - Whether to show an icon (default: true)
 * @param {boolean} showClose - Whether to show a close button (default: true)
 * @param {function} onClose - Callback function when toast is closed
 * @param {string} className - Additional CSS classes
 * @param {object} props - Additional props to pass to the toast element
 */
export default function Toast({
  message,
  variant = "info",
  title,
  showIcon = true,
  showClose = true,
  onClose,
  className = "",
  ...props
}) {
  const classNames = [
    BASE_CLASS,
    variantClassMap[variant] && `${BASE_CLASS}--${variantClassMap[variant]}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const iconName = iconMap[variant] || "Info";

  return (
    <div className={classNames} role="alert" {...props}>
      {showIcon && (
        <div className={`${BASE_CLASS}__icon`}>
          <Icon name={iconName} size={20} appearance="fill" />
        </div>
      )}
      <div className={`${BASE_CLASS}__content`}>
        {title && <div className={`${BASE_CLASS}__title`}>{title}</div>}
        {message && <div className={`${BASE_CLASS}__message`}>{message}</div>}
      </div>
      {showClose && onClose && (
        <button
          type="button"
          className={`${BASE_CLASS}__close`}
          onClick={onClose}
          aria-label="Close toast"
        >
          <Icon name="X" size={16} appearance="regular" />
        </button>
      )}
    </div>
  );
}
