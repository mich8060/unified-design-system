import React, { useState } from "react";
import { Link } from "react-router-dom";
import Toast from "../ui/Toast/Toast";
import Flex from "../ui/Flex/Flex";
import Button from "../ui/Button/Button";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Divider from "../ui/Divider/Divider";
import { formatLastUpdated } from "../utils/formatDate";

/**
 * Toast Component Demo & Documentation
 *
 * This page demonstrates the Toast component and its various configurations.
 */
export default function ToastDemo() {
  const [toasts, setToasts] = useState([]);

  const addToast = (variant, title, message) => {
    const id = Date.now();
    const newToast = { id, variant, title, message };
    setToasts([...toasts, newToast]);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id) => {
    setToasts(toasts.filter((toast) => toast.id !== id));
  };

  const clearAll = () => {
    setToasts([]);
  };

  return (
    <section className="page">
      <header className="page__header">
        <div className="page__header-container">
          <Breadcrumb />
          <div className="page__header-info">
            <div className="page__header-content">
              <h1 className="page__header-title">Toast</h1>
              <p className="page__header-description">
                Toast notifications provide feedback to users about actions or
                system status. They appear temporarily and can be dismissed
                manually or automatically.
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
            <h2 className="demo-group__heading">Toast Variants</h2>
            <p className="demo-group__description">
              Toast notifications support four variants: success, error, warning, and info. Each variant has a distinct color and icon.
            </p>
            <Flex direction="column" gap="16" className="demo-content">
              <Button
                appearance="primary"
                onClick={() => addToast("success", "Success", "Operation completed successfully")}
              >
                Show Success Toast
              </Button>
              <Button
                appearance="primary"
                onClick={() => addToast("error", "Error", "Something went wrong")}
              >
                Show Error Toast
              </Button>
              <Button
                appearance="primary"
                onClick={() => addToast("warning", "Warning", "Please review your input")}
              >
                Show Warning Toast
              </Button>
              <Button
                appearance="primary"
                onClick={() => addToast("info", "Info", "Here's some helpful information")}
              >
                Show Info Toast
              </Button>
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">With Title</h2>
            <p className="demo-group__description">
              Toast notifications can include both a title and a message for more detailed information.
            </p>
            <div className="demo-content">
              <Button
                appearance="primary"
                onClick={() => addToast("success", "File Uploaded", "Your file has been successfully uploaded to the server.")}
              >
                Show Toast with Title
              </Button>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Multiple Toasts</h2>
            <p className="demo-group__description">
              Multiple toast notifications can be displayed simultaneously, stacking vertically.
            </p>
            <div className="demo-content">
              <Flex direction="row" gap="8">
                <Button
                  appearance="primary"
                  onClick={() => {
                    addToast("success", "Success", "First notification");
                    setTimeout(() => addToast("info", "Info", "Second notification"), 300);
                    setTimeout(() => addToast("warning", "Warning", "Third notification"), 600);
                  }}
                >
                  Show Multiple Toasts
                </Button>
                <Button
                  appearance="outline"
                  onClick={clearAll}
                >
                  Clear All
                </Button>
              </Flex>
            </div>
          </div>
        </div>

        {/* Toast Container */}
        <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              variant={toast.variant}
              title={toast.title}
              message={toast.message}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </div>

        <Divider variant="solid" />

        <div className="page__tabs-content-container">
          <div className="demo-group">
            <div className="page__navigation">
              <Link
                to="/tabs"
                className="page__nav-link page__nav-link--prev"
              >
                <span className="page__nav-label">Previous</span>
                <span className="page__nav-title">Tabs</span>
              </Link>
              <Link
                to="/toggle"
                className="page__nav-link page__nav-link--next"
              >
                <span className="page__nav-label">Next</span>
                <span className="page__nav-title">Toggle</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
