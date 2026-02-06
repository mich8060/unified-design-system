import React, { useState } from "react";
import { Link } from "react-router-dom";
import FileUpload from "../ui/FileUpload/FileUpload";
import Flex from "../ui/Flex/Flex";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Divider from "../ui/Divider/Divider";
import { formatLastUpdated } from "../utils/formatDate";

/**
 * FileUpload Component Demo & Documentation
 *
 * This page demonstrates the FileUpload component and its various configurations.
 */
export default function FileUploadDemo() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFilesMultiple, setSelectedFilesMultiple] = useState([]);

  const handleFileSelect = (files) => {
    setSelectedFiles(Array.from(files));
  };

  const handleFileSelectMultiple = (files) => {
    setSelectedFilesMultiple(Array.from(files));
  };

  return (
    <section className="page">
      <header className="page__header">
        <div className="page__header-container">
          <Breadcrumb />
          <div className="page__header-info">
            <div className="page__header-content">
              <h1 className="page__header-title">File Upload</h1>
              <p className="page__header-description">
                File upload component that supports both drag-and-drop and
                click-to-upload functionality. Users can drag files onto the
                upload area or click to browse and select files.
              </p>
            </div>
            <div className="page__header-metadata">
              <div className="page__metadata-row">
                <p className="page__metadata-label">Author</p>
                <a
                  href="https://chgit.slack.com/team/U06V9C0K06S"
                  className="page__metadata-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @Michael-Stevens
                </a>
              </div>
              <div className="page__metadata-row">
                <p className="page__metadata-label">Last updated</p>
                <p className="page__metadata-value">{formatLastUpdated()}</p>
              </div>
              <div className="page__metadata-row">
                <p className="page__metadata-label">Version</p>
                <Flex direction="row" gap="8" alignItems="center">
                  <p className="page__metadata-value">1.0.0</p>
                  <span className="page__version-badge">BETA</span>
                </Flex>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="page__content">
        <div className="page__examples-section">
          <div className="demo-group">
            <h2 className="demo-group__heading">Basic Usage</h2>
            <p className="demo-group__description">
              A simple file upload component that supports both drag-and-drop and click-to-upload functionality.
            </p>
            <div className="demo-content">
              <FileUpload
                onFileSelect={handleFileSelect}
                instructionText="Drop files here or click to upload"
              />
              {selectedFiles.length > 0 && (
                <div style={{ marginTop: '16px' }}>
                  <p>Selected files:</p>
                  <ul>
                    {selectedFiles.map((file, index) => (
                      <li key={index}>{file.name} ({(file.size / 1024).toFixed(2)} KB)</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Multiple Files</h2>
            <p className="demo-group__description">
              Enable multiple file selection by setting the `multiple` prop to true.
            </p>
            <div className="demo-content">
              <FileUpload
                onFileSelect={handleFileSelectMultiple}
                multiple
                instructionText="Drop multiple files here or click to upload"
              />
              {selectedFilesMultiple.length > 0 && (
                <div style={{ marginTop: '16px' }}>
                  <p>Selected files ({selectedFilesMultiple.length}):</p>
                  <ul>
                    {selectedFilesMultiple.map((file, index) => (
                      <li key={index}>{file.name} ({(file.size / 1024).toFixed(2)} KB)</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">File Type Restrictions</h2>
            <p className="demo-group__description">
              Restrict file uploads to specific file types using the `accept` prop. This example only accepts images.
            </p>
            <div className="demo-content">
              <FileUpload
                onFileSelect={handleFileSelect}
                accept={['image/png', 'image/jpeg', 'image/jpg', 'image/gif']}
                acceptText="PNG, JPG, GIF"
                instructionText="Drop images here or click to upload"
              />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">File Size Limit</h2>
            <p className="demo-group__description">
              Set a maximum file size limit using the `maxSize` prop (in MB). Files exceeding this limit will be rejected.
            </p>
            <div className="demo-content">
              <FileUpload
                onFileSelect={handleFileSelect}
                maxSize={5}
                instructionText="Drop files here or click to upload (max 5MB)"
              />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Disabled State</h2>
            <p className="demo-group__description">
              Disabled file upload components prevent user interaction and are typically used when uploads are not applicable.
            </p>
            <div className="demo-content">
              <FileUpload
                onFileSelect={() => {}}
                disabled
                instructionText="Upload disabled"
              />
            </div>
          </div>
        </div>

        <Divider variant="solid" />

        <div className="page__tabs-content-container">
          <div className="demo-group">
            <div className="page__navigation">
              <Link
                to="/field"
                className="page__nav-link page__nav-link--prev"
              >
                <span className="page__nav-label">Previous</span>
                <span className="page__nav-title">Field</span>
              </Link>
              <Link
                to="/image-aspect"
                className="page__nav-link page__nav-link--next"
              >
                <span className="page__nav-label">Next</span>
                <span className="page__nav-title">Image Aspect</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
