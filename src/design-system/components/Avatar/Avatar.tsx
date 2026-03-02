import React from "react";
import "./_avatar.scss";
import type { AvatarProps } from "./Avatar.types";
import Icon from "../Icon/Icon";

/**
 * Avatar component for displaying user photos or initials
 * @param {string} src - Image source URL for user photo
 * @param {string} initials - Initials to display (e.g., "EB", "JD")
 * @param {boolean} status - Whether to show the status indicator (green dot)
 * @param {string} size - Size of the avatar: 'small', 'default', 'large' (default: 'default')
 * - small: 36x36
 * - default: 48x48
 * - large: 64x64
 * @param {string} className - Additional CSS classes
 * @param {string} alt - Alt text for the image
 * @param {boolean} showCameraButton - Whether to show the camera action button overlay
 * @param {string} cameraButtonAriaLabel - Accessible label for camera action button
 * @param {function} onCameraClick - Callback for camera action button click
 * @param {object} props - Additional props to pass to the avatar container
 */
export default function Avatar({
  src,
  initials,
  status = false,
  size = "default",
  showCameraButton = false,
  cameraButtonAriaLabel = "Change avatar photo",
  onCameraClick,
  className = "",
  alt = "",
  name,
  ...props
}: AvatarProps) {
  // Generate initials from name if provided but no initials
  const getInitials = () => {
    if (initials) return initials;
    if (name) {
      const names = name.trim().split(/\s+/);
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
      {showCameraButton ? (
        <button
          type="button"
          className="avatar__camera-button"
          aria-label={cameraButtonAriaLabel}
          onClick={onCameraClick}
        >
          <Icon name="Camera" size={16} appearance="regular" className="avatar__camera-icon" />
        </button>
      ) : (
        status && <span className="avatar__status" aria-label="Online status" />
      )}
    </div>
  );
}
