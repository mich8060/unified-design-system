import React from "react";
import "./ImageAspect.scss";

const BASE_CLASS = "uds-image-aspect";

const aspectRatioClassMap = {
  square: "square",
  video: "video",
  "4-3": "4-3",
  "3-2": "3-2",
  "21-9": "21-9",
  portrait: "portrait",
  auto: "auto",
};

/**
 * ImageAspect component for maintaining consistent aspect ratios for images
 * @param {string} ratio - Aspect ratio variant: 'square', 'video', '4-3', '3-2', '21-9', 'portrait', 'auto'
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text for the image
 * @param {string} className - Additional CSS classes
 * @param {object} props - Additional props to pass to the image element
 */
export default function ImageAspect({
  ratio = "square",
  src,
  alt = "",
  className = "",
  ...props
}) {
  const classNames = [
    BASE_CLASS,
    aspectRatioClassMap[ratio] &&
      `${BASE_CLASS}--${aspectRatioClassMap[ratio]}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classNames}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`${BASE_CLASS}__image`}
          {...props}
        />
      ) : (
        <div className={`${BASE_CLASS}__placeholder`}>
          <span className={`${BASE_CLASS}__placeholder-text`}>Image</span>
        </div>
      )}
    </div>
  );
}
