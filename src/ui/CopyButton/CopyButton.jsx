import React, { useState } from "react";
import "./CopyButton.scss";

export default function CopyButton({ codeRef, codeString, className = "" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      let textToCopy = "";
      
      // If codeRef is provided, get text from the DOM element
      if (codeRef && codeRef.current) {
        textToCopy = codeRef.current.textContent || codeRef.current.innerText;
      } else if (codeString) {
        // Otherwise use the provided string
        textToCopy = codeString;
      } else {
        console.warn("CopyButton: No code content provided");
        return;
      }

      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = codeRef?.current?.textContent || codeString || "";
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackErr) {
        console.error("Fallback copy failed: ", fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <button
      className={`copy-button ${className} ${copied ? "copy-button--copied" : ""}`}
      onClick={handleCopy}
      aria-label={copied ? "Copied!" : "Copy code"}
      title={copied ? "Copied!" : "Copy code"}
    >
      {copied ? (
        <>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="copy-button__icon"
          >
            <path
              d="M13.3333 4L6 11.3333L2.66667 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Copied!</span>
        </>
      ) : (
        <>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="copy-button__icon"
          >
            <path
              d="M5.33333 2.66667H11.3333C12.0697 2.66667 12.6667 3.26362 12.6667 4V12C12.6667 12.7364 12.0697 13.3333 11.3333 13.3333H5.33333C4.59695 13.3333 4 12.7364 4 12V4C4 3.26362 4.59695 2.66667 5.33333 2.66667Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.6667 2.66667V1.33333C10.6667 0.596954 10.0697 0 9.33333 0H2.66667C1.93029 0 1.33333 0.596954 1.33333 1.33333V9.33333C1.33333 10.0697 1.93029 10.6667 2.66667 10.6667H4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Copy</span>
        </>
      )}
    </button>
  );
}
