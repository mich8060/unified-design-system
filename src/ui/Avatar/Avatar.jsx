import React from "react";
import "./Avatar.scss";

/**
 * Avatar component for displaying user photos or initials
 * @param {string} src - Image source URL for user photo
 * @param {string} initials - Initials to display (e.g., "EB", "JD")
 * @param {boolean} status - Whether to show the status indicator (green dot)
 * @param {string} size - Size of the avatar: 'small', 'default', 'large' (default: 'default')
 * @param {string} className - Additional CSS classes
 * @param {string} alt - Alt text for the image
 * @param {object} props - Additional props to pass to the avatar container
 */
export default function Avatar({
  src,
  initials,
  status = false,
  size = "default",
  className = "",
  alt = "",
  ...props
}) {
  // Generate initials from name if provided but no initials
  const getInitials = () => {
    if (initials) return initials;
    if (props.name) {
      const names = props.name.trim().split(/\s+/);
      if (names.length >= 2) {
        return (names[0][0] + names[names.length - 1][0]).toUpperCase();
      }
      return names[0][0].toUpperCase();
    }
    return "?";
  };

  const sizeClass = size !== "default" ? `avatar--${size}` : "";
  const classes = ["avatar", sizeClass, className].filter(Boolean).join(" ");

  return (
    <div className={classes} {...props}>
      {src ? (
        <img src={src} alt={alt || "User avatar"} className="avatar__image" />
      ) : (
        <span className="avatar__initials">{getInitials()}</span>
      )}
      {status && <span className="avatar__status" aria-label="Online status" />}
    </div>
  );
}
