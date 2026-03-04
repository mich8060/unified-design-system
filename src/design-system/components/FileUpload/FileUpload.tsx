import React, { useState, useRef } from "react";
import Icon from "../Icon/Icon";
import "./_file-upload.scss";
import type { FileUploadProps } from "./FileUpload.types";

const BASE_CLASS = "uds-file-upload";

/**
 * FileUpload component for drag-and-drop and click-to-upload file selection
 * @param {function} onFileSelect - Callback function when files are selected (receives FileList)
 * @param {array} accept - Array of accepted file types (e.g., ['image/png', 'image/jpg'])
 * @param {number} maxSize - Maximum file size in MB (default: 10)
 * @param {string} acceptText - Text to display accepted file types (e.g., "PNG, JPG")
 * @param {string} instructionText - Custom instruction text (default: "Drop files here or click to upload")
 * @param {boolean} multiple - Whether to allow multiple file selection (default: false)
 * @param {boolean} disabled - Whether the upload is disabled
 * @param {string} className - Additional CSS classes
 * @param {object} props - Additional props to pass to the file input
 */
export default function FileUpload({
  onFileSelect,
  accept = [],
  maxSize = 10,
  acceptText,
  instructionText = "Drop files here or click to upload",
  size = "default",
  multiple = false,
  disabled = false,
  className = "",
  ...props
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const classNames = [
    BASE_CLASS,
    `${BASE_CLASS}--${size}`,
    isDragging && `${BASE_CLASS}--dragging`,
    disabled && `${BASE_CLASS}--disabled`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
    // Reset input so same file can be selected again
    e.target.value = "";
  };

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter((file) => {
      // Check file type
      if (accept.length > 0 && !accept.some((type) => file.type.match(type))) {
        return false;
      }
      // Check file size (convert MB to bytes)
      if (file.size > maxSize * 1024 * 1024) {
        return false;
      }
      return true;
    });

    if (validFiles.length > 0 && onFileSelect) {
      // Create a FileList-like object
      const dataTransfer = new DataTransfer();
      validFiles.forEach((file) => dataTransfer.items.add(file));
      onFileSelect(dataTransfer.files);
    }
  };

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Generate accept text from accept prop if not provided
  const displayAcceptText =
    acceptText ||
    (accept.length > 0
      ? accept
          .map((type) => {
            const ext = type.split("/")[1]?.toUpperCase();
            return ext || type;
          })
          .join(", ")
      : "All files");

  return (
    <div
      className={classNames}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        className={`${BASE_CLASS}__input`}
        accept={accept.length > 0 ? accept.join(",") : undefined}
        multiple={multiple}
        disabled={disabled}
        onChange={handleFileInputChange}
        {...props}
      />
      <div className={`${BASE_CLASS}__content`}>
        <div className={`${BASE_CLASS}__icon`}>
          <Icon name="Upload" size={size === "small" ? 24 : 32} appearance="regular" />
        </div>
        <p className={`${BASE_CLASS}__instruction`}>{instructionText}</p>
        <p className={`${BASE_CLASS}__accept`}>
          {displayAcceptText} up to {maxSize}MB
        </p>
      </div>
    </div>
  );
}
