import React from "react";
import Flex from "../ui/Flex/Flex";
import Card from "../ui/Card";

export default function Home() {
  return (
    <section className="page">
      <header className="page__header">
        <div className="page__header-container">
          <h1 className="page__header-title">Unified Design System</h1>
          <p className="page__header-description">
            Explore interactive demos for the components included in this
            project. Use the links below to jump straight into sandbox
            environments for buttons and icons.
          </p>
        </div>
      </header>

      <main className="page__content">
        <div className="page__examples-section">
          <Flex direction="row" gap="24" wrap={true} className="page__grid">
          <Card
            to="/buttons"
            title="Button Variants"
            description="Button appearances, layouts, and states."
            icon={
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Primary button */}
                <rect
                  x="4"
                  y="8"
                  width="40"
                  height="12"
                  rx="3"
                  fill="currentColor"
                  opacity="0.9"
                >
                  <animate
                    attributeName="opacity"
                    values="0.9;0.7;0.9"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </rect>
                <text
                  x="24"
                  y="17"
                  textAnchor="middle"
                  fontSize="6"
                  fill="white"
                  fontWeight="600"
                >
                  Primary
                </text>

                {/* Outline button */}
                <rect
                  x="4"
                  y="24"
                  width="40"
                  height="12"
                  rx="3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.7"
                >
                  <animate
                    attributeName="opacity"
                    values="0.7;1;0.7"
                    dur="1.5s"
                    repeatCount="indefinite"
                    begin="0.5s"
                  />
                </rect>
                <text
                  x="24"
                  y="33"
                  textAnchor="middle"
                  fontSize="6"
                  fill="currentColor"
                  fontWeight="600"
                  opacity="0.8"
                >
                  Outline
                </text>

                {/* Ghost button */}
                <rect
                  x="4"
                  y="40"
                  width="40"
                  height="12"
                  rx="3"
                  fill="currentColor"
                  opacity="0.1"
                >
                  <animate
                    attributeName="opacity"
                    values="0.1;0.3;0.1"
                    dur="1.5s"
                    repeatCount="indefinite"
                    begin="1s"
                  />
                </rect>
                <text
                  x="24"
                  y="49"
                  textAnchor="middle"
                  fontSize="6"
                  fill="currentColor"
                  fontWeight="600"
                  opacity="0.6"
                >
                  Ghost
                </text>
              </svg>
            }
          />

          <Card
            to="/calendar"
            title="Datepicker"
            description="Calendar component for date selection with various states and icons."
            icon={
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Calendar grid */}
                <rect
                  x="4"
                  y="4"
                  width="40"
                  height="40"
                  rx="2"
                  fill="white"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.8"
                />
                {/* Calendar header */}
                <rect
                  x="4"
                  y="4"
                  width="40"
                  height="8"
                  fill="currentColor"
                  opacity="0.1"
                />
                <line x1="4" y1="12" x2="44" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                {/* Calendar grid lines */}
                <line x1="10" y1="12" x2="10" y2="44" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
                <line x1="16" y1="12" x2="16" y2="44" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
                <line x1="22" y1="12" x2="22" y2="44" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
                <line x1="28" y1="12" x2="28" y2="44" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
                <line x1="34" y1="12" x2="34" y2="44" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
                <line x1="40" y1="12" x2="40" y2="44" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
                {/* Horizontal grid lines */}
                <line x1="4" y1="20" x2="44" y2="20" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
                <line x1="4" y1="28" x2="44" y2="28" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
                <line x1="4" y1="36" x2="44" y2="36" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
                {/* Date numbers */}
                <text x="8" y="18" fontSize="4" fill="currentColor" opacity="0.7">1</text>
                <text x="14" y="18" fontSize="4" fill="currentColor" opacity="0.7">2</text>
                <text x="20" y="18" fontSize="4" fill="currentColor" opacity="0.7">3</text>
                {/* Selected date */}
                <rect x="18" y="26" width="6" height="6" rx="1" fill="#3B82F6" opacity="0.8" />
                <text x="21" y="30" fontSize="4" fill="white" textAnchor="middle">15</text>
                {/* Icons on dates */}
                <circle cx="30" cy="30" r="1.5" fill="#3B82F6" opacity="0.8" />
                <path d="M34 28 L36 30 L34 32" fill="#10B981" opacity="0.8" />
              </svg>
            }
          />

          <Card
            to="/icons"
            title="Icon Gallery"
            description="Browse and preview SVG icons from the design system."
            icon={<svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Square icon */}
                <rect
                  x="8"
                  y="8"
                  width="12"
                  height="12"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.8"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    values="0 14 14;360 14 14"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </rect>

                {/* Circle icon */}
                <circle
                  cx="36"
                  cy="14"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.7"
                >
                  <animate
                    attributeName="opacity"
                    values="0.7;1;0.7"
                    dur="2s"
                    repeatCount="indefinite"
                    begin="0.5s"
                  />
                </circle>

                {/* Arrow icon */}
                <path
                  d="M14 34 L24 44 L34 34"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  opacity="0.6"
                >
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    values="0,0; 0,-4; 0,0"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </path>

                {/* Star icon */}
                <path
                  d="M36 34 L38 40 L44 40 L39 44 L41 50 L36 46 L31 50 L33 44 L28 40 L34 40 Z"
                  fill="currentColor"
                  opacity="0.5"
                >
                  <animate
                    attributeName="opacity"
                    values="0.5;1;0.5"
                    dur="2s"
                    repeatCount="indefinite"
                    begin="1s"
                  />
                </path>
              </svg>
            }
          />

          <Card
            to="/flex"
            title="Flex Layout"
            description="Flexible layout component for consistent, responsive designs."
            icon={<svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Flex container */}
                <rect
                  x="4"
                  y="4"
                  width="40"
                  height="40"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                  fill="none"
                  opacity="0.3"
                />

                {/* Flex items - row layout */}
                <rect
                  x="8"
                  y="10"
                  width="10"
                  height="8"
                  rx="1"
                  fill="currentColor"
                  opacity="0.7"
                >
                  <animate
                    attributeName="width"
                    values="10;14;10"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </rect>
                <rect
                  x="22"
                  y="10"
                  width="10"
                  height="8"
                  rx="1"
                  fill="currentColor"
                  opacity="0.6"
                >
                  <animate
                    attributeName="width"
                    values="10;12;10"
                    dur="2s"
                    repeatCount="indefinite"
                    begin="0.5s"
                  />
                </rect>
                <rect
                  x="34"
                  y="10"
                  width="6"
                  height="8"
                  rx="1"
                  fill="currentColor"
                  opacity="0.5"
                >
                  <animate
                    attributeName="width"
                    values="6;10;6"
                    dur="2s"
                    repeatCount="indefinite"
                    begin="1s"
                  />
                </rect>

                {/* Flex items - wrapping to new line */}
                <rect
                  x="8"
                  y="22"
                  width="12"
                  height="8"
                  rx="1"
                  fill="currentColor"
                  opacity="0.7"
                >
                  <animate
                    attributeName="x"
                    values="8;20;8"
                    dur="2.5s"
                    repeatCount="indefinite"
                  />
                </rect>
                <rect
                  x="24"
                  y="22"
                  width="12"
                  height="8"
                  rx="1"
                  fill="currentColor"
                  opacity="0.6"
                >
                  <animate
                    attributeName="x"
                    values="24;8;24"
                    dur="2.5s"
                    repeatCount="indefinite"
                    begin="1.25s"
                  />
                </rect>

                {/* Flex items - column/vertical alignment */}
                <rect
                  x="8"
                  y="34"
                  width="8"
                  height="6"
                  rx="1"
                  fill="currentColor"
                  opacity="0.7"
                >
                  <animate
                    attributeName="y"
                    values="34;38;34"
                    dur="1.8s"
                    repeatCount="indefinite"
                  />
                </rect>
                <rect
                  x="20"
                  y="34"
                  width="8"
                  height="6"
                  rx="1"
                  fill="currentColor"
                  opacity="0.6"
                >
                  <animate
                    attributeName="y"
                    values="34;38;34"
                    dur="1.8s"
                    repeatCount="indefinite"
                    begin="0.6s"
                  />
                </rect>
                <rect
                  x="32"
                  y="34"
                  width="8"
                  height="6"
                  rx="1"
                  fill="currentColor"
                  opacity="0.5"
                >
                  <animate
                    attributeName="y"
                    values="34;38;34"
                    dur="1.8s"
                    repeatCount="indefinite"
                    begin="1.2s"
                  />
                </rect>
              </svg>
            }
          />

          <Card
            to="/accordion"
            title="Accordion"
            description="Expand and collapse content sections for better organization."
            icon={<svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Accordion item 1 - expanded */}
                <rect
                  x="4"
                  y="4"
                  width="40"
                  height="12"
                  rx="2"
                  fill="currentColor"
                  opacity="0.1"
                />
                <line
                  x1="8"
                  y1="10"
                  x2="32"
                  y2="10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  opacity="0.8"
                />
                <path
                  d="M36 6 L40 10 L36 14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.8"
                />

                {/* Accordion content */}
                <rect
                  x="8"
                  y="18"
                  width="32"
                  height="6"
                  rx="1"
                  fill="currentColor"
                  opacity="0.05"
                />

                {/* Accordion item 2 - collapsed */}
                <rect
                  x="4"
                  y="28"
                  width="40"
                  height="12"
                  rx="2"
                  fill="currentColor"
                  opacity="0.1"
                />
                <line
                  x1="8"
                  y1="34"
                  x2="32"
                  y2="34"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  opacity="0.8"
                />
                <path
                  d="M36 30 L40 34 L36 38"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.8"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    values="0 38 34;180 38 34;0 38 34"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </path>

                {/* Accordion item 3 - collapsed */}
                <rect
                  x="4"
                  y="44"
                  width="40"
                  height="12"
                  rx="2"
                  fill="currentColor"
                  opacity="0.1"
                />
                <line
                  x1="8"
                  y1="50"
                  x2="32"
                  y2="50"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  opacity="0.8"
                />
                <path
                  d="M36 46 L40 50 L36 54"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.8"
                />
              </svg>
            }
          />

          <Card
            to="/action-menu"
            title="Action Menu"
            description="Dropdown menu for contextual actions, typically triggered by an ellipsis button."
            icon={<svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Ellipsis button */}
                <circle
                  cx="24"
                  cy="12"
                  r="2"
                  fill="currentColor"
                  opacity="0.8"
                />
                <circle
                  cx="32"
                  cy="12"
                  r="2"
                  fill="currentColor"
                  opacity="0.8"
                />
                <circle
                  cx="40"
                  cy="12"
                  r="2"
                  fill="currentColor"
                  opacity="0.8"
                />

                {/* Dropdown menu */}
                <rect
                  x="30"
                  y="18"
                  width="16"
                  height="24"
                  rx="2"
                  fill="white"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.9"
                />
                <rect
                  x="32"
                  y="20"
                  width="12"
                  height="4"
                  rx="1"
                  fill="currentColor"
                  opacity="0.1"
                />
                <line
                  x1="34"
                  y1="22"
                  x2="40"
                  y2="22"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.6"
                />
                <rect
                  x="32"
                  y="26"
                  width="12"
                  height="4"
                  rx="1"
                  fill="currentColor"
                  opacity="0.1"
                />
                <line
                  x1="34"
                  y1="28"
                  x2="40"
                  y2="28"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.6"
                />
                <line
                  x1="32"
                  y1="32"
                  x2="44"
                  y2="32"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  opacity="0.3"
                />
                <rect
                  x="32"
                  y="34"
                  width="12"
                  height="4"
                  rx="1"
                  fill="currentColor"
                  opacity="0.1"
                />
                <line
                  x1="34"
                  y1="36"
                  x2="40"
                  y2="36"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.6"
                />
              </svg>
            }
          />

          <Card
            to="/breadcrumb"
            title="Breadcrumb"
            description="Navigation showing the user's location within the app hierarchy."
            icon={<svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Breadcrumb path */}
                <circle
                  cx="8"
                  cy="24"
                  r="2"
                  fill="currentColor"
                  opacity="0.8"
                />
                <line
                  x1="12"
                  y1="24"
                  x2="16"
                  y2="24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  opacity="0.6"
                />
                <circle
                  cx="20"
                  cy="24"
                  r="2"
                  fill="currentColor"
                  opacity="0.8"
                />
                <line
                  x1="24"
                  y1="24"
                  x2="28"
                  y2="24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  opacity="0.6"
                />
                <circle
                  cx="32"
                  cy="24"
                  r="2"
                  fill="currentColor"
                  opacity="0.8"
                />
                <line
                  x1="36"
                  y1="24"
                  x2="40"
                  y2="24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  opacity="0.6"
                />

                {/* Text labels */}
                <text
                  x="8"
                  y="18"
                  fontSize="4"
                  fill="currentColor"
                  opacity="0.7"
                  textAnchor="middle"
                >
                  Home
                </text>
                <text
                  x="20"
                  y="18"
                  fontSize="4"
                  fill="currentColor"
                  opacity="0.7"
                  textAnchor="middle"
                >
                  Page
                </text>
                <text
                  x="32"
                  y="18"
                  fontSize="4"
                  fill="currentColor"
                  opacity="0.9"
                  textAnchor="middle"
                  fontWeight="600"
                >
                  Current
                </text>

                {/* Active indicator */}
                <rect
                  x="28"
                  y="20"
                  width="8"
                  height="8"
                  rx="1"
                  fill="currentColor"
                  opacity="0.1"
                />
              </svg>
            }
          />

          <Card
            to="/avatar"
            title="Avatar"
            description="User profile pictures or initials with status indicators."
            icon={<svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Avatar circles */}
                <circle
                  cx="12"
                  cy="12"
                  r="8"
                  fill="currentColor"
                  opacity="0.1"
                />
                <text
                  x="12"
                  y="16"
                  textAnchor="middle"
                  fontSize="6"
                  fill="currentColor"
                  fontWeight="700"
                  opacity="0.8"
                >
                  EB
                </text>

                <circle cx="36" cy="12" r="8" fill="currentColor" opacity="0.1">
                  <animate
                    attributeName="r"
                    values="8;9;8"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <text
                  x="36"
                  y="16"
                  textAnchor="middle"
                  fontSize="6"
                  fill="currentColor"
                  fontWeight="700"
                  opacity="0.8"
                >
                  JD
                </text>

                {/* Status indicator */}
                <circle cx="18" cy="18" r="3" fill="#23C55E" opacity="0.9">
                  <circle
                    cx="18"
                    cy="18"
                    r="2.5"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                  />
                </circle>

                {/* Large avatar */}
                <circle
                  cx="24"
                  cy="36"
                  r="10"
                  fill="currentColor"
                  opacity="0.1"
                />
                <text
                  x="24"
                  y="41"
                  textAnchor="middle"
                  fontSize="8"
                  fill="currentColor"
                  fontWeight="700"
                  opacity="0.8"
                >
                  AB
                </text>
              </svg>
            }
          />

          <Card
            to="/checkbox"
            title="Checkbox"
            description="Select one or more options with multiple states support."
            icon={<svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Checkbox unchecked */}
                <rect
                  x="8"
                  y="8"
                  width="16"
                  height="16"
                  rx="2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  opacity="0.7"
                />

                {/* Checkbox checked */}
                <rect
                  x="8"
                  y="28"
                  width="16"
                  height="16"
                  rx="2"
                  fill="currentColor"
                  opacity="0.2"
                >
                  <animate
                    attributeName="opacity"
                    values="0.2;0.4;0.2"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </rect>
                <path
                  d="M12 36 L16 40 L24 32"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  opacity="0.8"
                >
                  <animate
                    attributeName="opacity"
                    values="0.8;1;0.8"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </path>

                {/* Checkbox indeterminate */}
                <rect
                  x="28"
                  y="8"
                  width="16"
                  height="16"
                  rx="2"
                  fill="currentColor"
                  opacity="0.2"
                />
                <line
                  x1="32"
                  y1="16"
                  x2="40"
                  y2="16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.8"
                />

                {/* Checkbox disabled */}
                <rect
                  x="28"
                  y="28"
                  width="16"
                  height="16"
                  rx="2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="2,2"
                  opacity="0.4"
                />
              </svg>
            }
          />

          <Card
            to="/chip"
            title="Chip"
            description="Display labels, tags, or filters with multiple appearances and shapes."
            icon={<svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Outline chip - pill shape */}
                <rect
                  x="4"
                  y="12"
                  width="40"
                  height="12"
                  rx="6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  opacity="0.7"
                >
                  <animate
                    attributeName="opacity"
                    values="0.7;1;0.7"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </rect>
                <text
                  x="24"
                  y="21"
                  textAnchor="middle"
                  fontSize="6"
                  fill="currentColor"
                  fontWeight="600"
                  opacity="0.8"
                >
                  Label
                </text>

                {/* Primary chip - rounded shape */}
                <rect
                  x="4"
                  y="28"
                  width="40"
                  height="12"
                  rx="2"
                  fill="currentColor"
                  opacity="0.2"
                >
                  <animate
                    attributeName="opacity"
                    values="0.2;0.4;0.2"
                    dur="2s"
                    repeatCount="indefinite"
                    begin="0.5s"
                  />
                </rect>
                <text
                  x="24"
                  y="37"
                  textAnchor="middle"
                  fontSize="6"
                  fill="currentColor"
                  fontWeight="600"
                  opacity="0.8"
                >
                  Label
                </text>

                {/* Chip with icon */}
                <rect
                  x="4"
                  y="44"
                  width="40"
                  height="12"
                  rx="6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  opacity="0.6"
                />
                <circle cx="10" cy="50" r="2" fill="currentColor" opacity="0.7">
                  <animate
                    attributeName="r"
                    values="2;2.5;2"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </circle>
                <text
                  x="24"
                  y="53"
                  textAnchor="middle"
                  fontSize="6"
                  fill="currentColor"
                  fontWeight="600"
                  opacity="0.8"
                >
                  Label
                </text>
                <circle cx="38" cy="50" r="2" fill="currentColor" opacity="0.7">
                  <animate
                    attributeName="r"
                    values="2;2.5;2"
                    dur="1.5s"
                    repeatCount="indefinite"
                    begin="0.75s"
                  />
                </circle>
              </svg>
            }
          />

          <Card
            to="/badge"
            title="Badge"
            description="Compact pill-shaped badges for notifications and counts."
            icon={<svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Red badge */}
                <rect
                  x="8"
                  y="8"
                  width="32"
                  height="16"
                  rx="8"
                  fill="#EF4444"
                  opacity="0.9"
                >
                  <animate
                    attributeName="opacity"
                    values="0.9;1;0.9"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </rect>
                <text
                  x="24"
                  y="20"
                  textAnchor="middle"
                  fontSize="8"
                  fill="white"
                  fontWeight="700"
                >
                  99+
                </text>

                {/* Blue badge */}
                <rect
                  x="8"
                  y="28"
                  width="32"
                  height="16"
                  rx="8"
                  fill="#3B82F6"
                  opacity="0.8"
                >
                  <animate
                    attributeName="opacity"
                    values="0.8;1;0.8"
                    dur="2s"
                    repeatCount="indefinite"
                    begin="0.5s"
                  />
                </rect>
                <text
                  x="24"
                  y="40"
                  textAnchor="middle"
                  fontSize="8"
                  fill="white"
                  fontWeight="700"
                >
                  12
                </text>
              </svg>
            }
          />

          <Card
            to="/divider"
            title="Divider"
            description="Visual separators with optional labels and flexible alignment."
            icon={<svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Divider line */}
                <line
                  x1="4"
                  y1="12"
                  x2="44"
                  y2="12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  opacity="0.6"
                >
                  <animate
                    attributeName="opacity"
                    values="0.6;1;0.6"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </line>

                {/* Divider with label */}
                <line
                  x1="4"
                  y1="24"
                  x2="44"
                  y2="24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  opacity="0.6"
                />
                <rect
                  x="18"
                  y="18"
                  width="12"
                  height="12"
                  rx="2"
                  fill="currentColor"
                  opacity="0.1"
                />
                <text
                  x="24"
                  y="26"
                  textAnchor="middle"
                  fontSize="4"
                  fill="currentColor"
                  fontWeight="600"
                  opacity="0.8"
                >
                  Label
                </text>

                {/* Divider with icon */}
                <line
                  x1="4"
                  y1="36"
                  x2="44"
                  y2="36"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  opacity="0.6"
                >
                  <animate
                    attributeName="opacity"
                    values="0.6;1;0.6"
                    dur="2s"
                    repeatCount="indefinite"
                    begin="1s"
                  />
                </line>
                <circle
                  cx="24"
                  cy="36"
                  r="4"
                  fill="currentColor"
                  opacity="0.1"
                />
                <text
                  x="24"
                  y="39"
                  textAnchor="middle"
                  fontSize="6"
                  fill="currentColor"
                  fontWeight="700"
                  opacity="0.8"
                >
                  +
                </text>
              </svg>
            }
          />

          <Card
            to="/dot-status"
            title="Dot Status"
            description="Circular status indicators in multiple colors and sizes."
            icon={<svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Small dots */}
                <circle cx="8" cy="8" r="2" fill="#3B82F6" opacity="0.9">
                  <animate
                    attributeName="opacity"
                    values="0.9;1;0.9"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="20" cy="8" r="3" fill="#22C55E" opacity="0.8">
                  <animate
                    attributeName="opacity"
                    values="0.8;1;0.8"
                    dur="2s"
                    repeatCount="indefinite"
                    begin="0.5s"
                  />
                </circle>

                {/* Medium dots */}
                <circle cx="8" cy="24" r="3" fill="#EF4444" opacity="0.9">
                  <animate
                    attributeName="opacity"
                    values="0.9;1;0.9"
                    dur="2s"
                    repeatCount="indefinite"
                    begin="1s"
                  />
                </circle>
                <circle cx="20" cy="24" r="4" fill="#F97316" opacity="0.8">
                  <animate
                    attributeName="opacity"
                    values="0.8;1;0.8"
                    dur="2s"
                    repeatCount="indefinite"
                    begin="1.5s"
                  />
                </circle>

                {/* Large dots with outline */}
                <circle
                  cx="32"
                  cy="8"
                  r="2"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="1"
                  opacity="0.7"
                />
                <circle
                  cx="40"
                  cy="24"
                  r="4"
                  fill="none"
                  stroke="#22C55E"
                  strokeWidth="1"
                  opacity="0.7"
                >
                  <animate
                    attributeName="opacity"
                    values="0.7;1;0.7"
                    dur="2s"
                    repeatCount="indefinite"
                    begin="0.3s"
                  />
                </circle>

                {/* Status indicators */}
                <circle cx="8" cy="40" r="3" fill="#22C55E" opacity="0.9">
                  <animate
                    attributeName="r"
                    values="3;3.5;3"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="24" cy="40" r="3" fill="#EF4444" opacity="0.9">
                  <animate
                    attributeName="r"
                    values="3;3.5;3"
                    dur="1.5s"
                    repeatCount="indefinite"
                    begin="0.75s"
                  />
                </circle>
              </svg>
            }
          />

          <Card
            to="/dropdown"
            title="Dropdown"
            description="Custom select dropdown with keyboard navigation and accessibility."
            icon={<svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Default state */}
                <rect
                  x="4"
                  y="4"
                  width="40"
                  height="12"
                  rx="2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  opacity="0.6"
                />
                <text
                  x="12"
                  y="13"
                  fontSize="5"
                  fill="currentColor"
                  opacity="0.7"
                >
                  Select an option
                </text>
                <path
                  d="M36 8 L40 12 L36 16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.6"
                />

                {/* Focused state */}
                <rect
                  x="4"
                  y="20"
                  width="40"
                  height="12"
                  rx="2"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="1.5"
                  opacity="0.9"
                >
                  <animate
                    attributeName="opacity"
                    values="0.9;1;0.9"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </rect>
                <text
                  x="12"
                  y="29"
                  fontSize="5"
                  fill="currentColor"
                  opacity="0.8"
                >
                  Select an option
                </text>
                <path
                  d="M36 24 L40 28 L36 32"
                  stroke="#3B82F6"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.9"
                />

                {/* Error state */}
                <rect
                  x="4"
                  y="36"
                  width="40"
                  height="12"
                  rx="2"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="1.5"
                  opacity="0.8"
                />
                <text x="12" y="45" fontSize="5" fill="#EF4444" opacity="0.8">
                  Select an option
                </text>
                <path
                  d="M36 40 L40 44 L36 48"
                  stroke="#EF4444"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.8"
                />
              </svg>
            }
          />

          <Card
            to="/field"
            title="Field"
            description="Form field wrapper with labels, helper text, and validation."
            icon={<svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Label */}
                <text
                  x="4"
                  y="8"
                  fontSize="5"
                  fill="currentColor"
                  opacity="0.8"
                  fontWeight="600"
                >
                  Label
                </text>

                {/* Input field */}
                <rect
                  x="4"
                  y="12"
                  width="40"
                  height="10"
                  rx="2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="2,2"
                  opacity="0.6"
                >
                  <animate
                    attributeName="opacity"
                    values="0.6;1;0.6"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </rect>
                <text
                  x="8"
                  y="19"
                  fontSize="4"
                  fill="currentColor"
                  opacity="0.6"
                >
                  Instance Slot
                </text>

                {/* Helper message */}
                <text
                  x="4"
                  y="26"
                  fontSize="4"
                  fill="currentColor"
                  opacity="0.6"
                >
                  Helper Message
                </text>

                {/* Character count */}
                <text
                  x="36"
                  y="26"
                  fontSize="4"
                  fill="currentColor"
                  opacity="0.6"
                >
                  99/99
                </text>

                {/* Info icon */}
                <circle
                  cx="42"
                  cy="6"
                  r="3"
                  fill="currentColor"
                  opacity="0.3"
                />
                <text
                  x="42"
                  y="8"
                  textAnchor="middle"
                  fontSize="4"
                  fill="currentColor"
                  opacity="0.8"
                  fontWeight="700"
                >
                  i
                </text>

                {/* Required asterisk */}
                <text x="20" y="8" fontSize="5" fill="#EF4444" opacity="0.9">
                  *
                </text>
              </svg>
            }
          />

          <Card
            to="/file-upload"
            title="File Upload"
            description="Drag-and-drop file upload with type and size restrictions."
            icon={<svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* File upload box */}
                <rect
                  x="4"
                  y="8"
                  width="40"
                  height="28"
                  rx="2"
                  fill="currentColor"
                  opacity="0.05"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="3,3"
                />

                {/* Upload icon */}
                <rect
                  x="18"
                  y="14"
                  width="12"
                  height="12"
                  rx="1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  opacity="0.6"
                />
                <path
                  d="M20 18 L24 14 L28 18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  opacity="0.6"
                />
                <line
                  x1="24"
                  y1="14"
                  x2="24"
                  y2="22"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.6"
                />

                {/* Text lines */}
                <line
                  x1="12"
                  y1="30"
                  x2="36"
                  y2="30"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.5"
                />
                <line
                  x1="14"
                  y1="34"
                  x2="34"
                  y2="34"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  opacity="0.4"
                />
              </svg>
            }
          />

          <Card
            to="/image-aspect"
            title="Image Aspect"
            description="Maintain consistent aspect ratios for images and media."
            icon={<svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Square aspect */}
                <rect
                  x="4"
                  y="4"
                  width="12"
                  height="12"
                  rx="2"
                  fill="currentColor"
                  opacity="0.2"
                >
                  <animate
                    attributeName="opacity"
                    values="0.2;0.4;0.2"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </rect>

                {/* Video aspect */}
                <rect
                  x="20"
                  y="8"
                  width="24"
                  height="4"
                  rx="1"
                  fill="currentColor"
                  opacity="0.3"
                >
                  <animate
                    attributeName="opacity"
                    values="0.3;0.5;0.3"
                    dur="2s"
                    repeatCount="indefinite"
                    begin="0.5s"
                  />
                </rect>

                {/* Portrait aspect */}
                <rect
                  x="4"
                  y="20"
                  width="8"
                  height="12"
                  rx="2"
                  fill="currentColor"
                  opacity="0.2"
                >
                  <animate
                    attributeName="opacity"
                    values="0.2;0.4;0.2"
                    dur="2s"
                    repeatCount="indefinite"
                    begin="1s"
                  />
                </rect>

                {/* Grid of squares */}
                <rect
                  x="16"
                  y="20"
                  width="6"
                  height="6"
                  rx="1"
                  fill="currentColor"
                  opacity="0.3"
                />
                <rect
                  x="24"
                  y="20"
                  width="6"
                  height="6"
                  rx="1"
                  fill="currentColor"
                  opacity="0.3"
                />
                <rect
                  x="32"
                  y="20"
                  width="6"
                  height="6"
                  rx="1"
                  fill="currentColor"
                  opacity="0.3"
                />
                <rect
                  x="40"
                  y="20"
                  width="6"
                  height="6"
                  rx="1"
                  fill="currentColor"
                  opacity="0.3"
                />

                {/* Placeholder indicator */}
                <line
                  x1="8"
                  y1="8"
                  x2="12"
                  y2="12"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.5"
                />
                <line
                  x1="12"
                  y1="8"
                  x2="8"
                  y2="12"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.5"
                />
              </svg>
            }
          />

          <Card
            to="/key"
            title="Key"
            description="Display keyboard keys for shortcuts with light and dark styles."
            icon={<svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Light key - Esc */}
                <rect
                  x="4"
                  y="8"
                  width="16"
                  height="10"
                  rx="2"
                  fill="white"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  opacity="0.7"
                />
                <text
                  x="12"
                  y="15"
                  textAnchor="middle"
                  fontSize="5"
                  fill="currentColor"
                  opacity="0.7"
                  fontWeight="600"
                >
                  Esc
                </text>

                {/* Light key - Command */}
                <rect
                  x="24"
                  y="8"
                  width="20"
                  height="10"
                  rx="2"
                  fill="white"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  opacity="0.7"
                >
                  <animate
                    attributeName="opacity"
                    values="0.7;1;0.7"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </rect>
                <text
                  x="34"
                  y="15"
                  textAnchor="middle"
                  fontSize="6"
                  fill="currentColor"
                  opacity="0.7"
                  fontWeight="700"
                >
                  ⌘
                </text>

                {/* Dark key - Esc */}
                <rect
                  x="4"
                  y="22"
                  width="16"
                  height="10"
                  rx="2"
                  fill="#374151"
                  opacity="0.9"
                >
                  <animate
                    attributeName="opacity"
                    values="0.9;1;0.9"
                    dur="2s"
                    repeatCount="indefinite"
                    begin="0.5s"
                  />
                </rect>
                <text
                  x="12"
                  y="29"
                  textAnchor="middle"
                  fontSize="5"
                  fill="white"
                  fontWeight="600"
                >
                  Esc
                </text>

                {/* Dark key - Command */}
                <rect
                  x="24"
                  y="22"
                  width="20"
                  height="10"
                  rx="2"
                  fill="#374151"
                  opacity="0.9"
                >
                  <animate
                    attributeName="opacity"
                    values="0.9;1;0.9"
                    dur="2s"
                    repeatCount="indefinite"
                    begin="1s"
                  />
                </rect>
                <text
                  x="34"
                  y="29"
                  textAnchor="middle"
                  fontSize="6"
                  fill="white"
                  fontWeight="700"
                >
                  ⌘
                </text>

                {/* Keyboard shortcut example */}
                <rect
                  x="4"
                  y="36"
                  width="12"
                  height="8"
                  rx="1.5"
                  fill="white"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.6"
                />
                <text
                  x="10"
                  y="41"
                  textAnchor="middle"
                  fontSize="4"
                  fill="currentColor"
                  opacity="0.7"
                >
                  Ctrl
                </text>
                <text
                  x="18"
                  y="41"
                  fontSize="4"
                  fill="currentColor"
                  opacity="0.7"
                >
                  +
                </text>
                <rect
                  x="22"
                  y="36"
                  width="8"
                  height="8"
                  rx="1.5"
                  fill="white"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.6"
                />
                <text
                  x="26"
                  y="41"
                  textAnchor="middle"
                  fontSize="4"
                  fill="currentColor"
                  opacity="0.7"
                >
                  K
                </text>
              </svg>
            }
          />

          <Card
            to="/pill-toggle"
            title="Pill Toggle"
            description="Pill-shaped toggle buttons for filters and binary selections."
            icon={<svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Unselected pill toggle */}
                <rect
                  x="4"
                  y="12"
                  width="40"
                  height="16"
                  rx="8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  opacity="0.7"
                >
                  <animate
                    attributeName="opacity"
                    values="0.7;1;0.7"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </rect>
                <text
                  x="24"
                  y="23"
                  textAnchor="middle"
                  fontSize="6"
                  fill="currentColor"
                  opacity="0.8"
                  fontWeight="500"
                >
                  Label
                </text>

                {/* Selected pill toggle */}
                <rect
                  x="4"
                  y="32"
                  width="40"
                  height="16"
                  rx="8"
                  fill="#3B82F6"
                  opacity="0.9"
                >
                  <animate
                    attributeName="opacity"
                    values="0.9;1;0.9"
                    dur="2s"
                    repeatCount="indefinite"
                    begin="0.5s"
                  />
                </rect>
                <text
                  x="24"
                  y="43"
                  textAnchor="middle"
                  fontSize="6"
                  fill="white"
                  fontWeight="500"
                >
                  Label
                </text>
              </svg>
            }
          />

          <Card
            to="/progress-indicator"
            title="Progress Indicator"
            description="Progress bars with multiple sizes and color variants."
            icon={<svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Progress bar track */}
                <rect
                  x="4"
                  y="18"
                  width="40"
                  height="4"
                  rx="2"
                  fill="currentColor"
                  opacity="0.1"
                />

                {/* Progress bar fill - 25% */}
                <rect
                  x="4"
                  y="18"
                  width="10"
                  height="4"
                  rx="2"
                  fill="#3B82F6"
                  opacity="0.7"
                >
                  <animate
                    attributeName="opacity"
                    values="0.7;1;0.7"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </rect>

                {/* Progress bar fill - 50% */}
                <rect
                  x="4"
                  y="26"
                  width="20"
                  height="4"
                  rx="2"
                  fill="#3B82F6"
                  opacity="0.8"
                >
                  <animate
                    attributeName="opacity"
                    values="0.8;1;0.8"
                    dur="2s"
                    repeatCount="indefinite"
                    begin="0.3s"
                  />
                </rect>

                {/* Progress bar fill - 75% */}
                <rect
                  x="4"
                  y="34"
                  width="30"
                  height="4"
                  rx="2"
                  fill="#3B82F6"
                  opacity="0.9"
                >
                  <animate
                    attributeName="opacity"
                    values="0.9;1;0.9"
                    dur="2s"
                    repeatCount="indefinite"
                    begin="0.6s"
                  />
                </rect>

                {/* Label text */}
                <text
                  x="4"
                  y="12"
                  fontSize="5"
                  fill="currentColor"
                  opacity="0.8"
                  fontWeight="500"
                >
                  Progress
                </text>
              </svg>
            }
          />

          <Card
            to="/progress-circle"
            title="Progress Circle"
            description="Circular progress indicators with full and half-circle shapes."
            icon={<svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Full circle progress */}
                <circle
                  cx="24"
                  cy="24"
                  r="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  opacity="0.1"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="18"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeDasharray="113"
                  strokeDashoffset="68"
                  strokeLinecap="round"
                  opacity="0.8"
                >
                  <animate
                    attributeName="opacity"
                    values="0.8;1;0.8"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Percentage text */}
                <text
                  x="24"
                  y="28"
                  textAnchor="middle"
                  fontSize="8"
                  fill="currentColor"
                  opacity="0.8"
                  fontWeight="600"
                >
                  40%
                </text>

                {/* Half circle progress */}
                <circle
                  cx="24"
                  cy="40"
                  r="6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  opacity="0.1"
                />
                <path
                  d="M 18 40 A 6 6 0 0 1 24 34"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.7"
                >
                  <animate
                    attributeName="opacity"
                    values="0.7;1;0.7"
                    dur="2s"
                    repeatCount="indefinite"
                    begin="0.5s"
                  />
                </path>
              </svg>
            }
          />

          <Card
            to="/radio"
            title="Radio"
            description="Select a single option from a group of choices."
            icon={<svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Unchecked radio */}
                <circle
                  cx="12"
                  cy="12"
                  r="8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  opacity="0.7"
                >
                  <animate
                    attributeName="opacity"
                    values="0.7;1;0.7"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Checked radio */}
                <circle
                  cx="12"
                  cy="28"
                  r="8"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="1.5"
                  opacity="0.9"
                >
                  <animate
                    attributeName="opacity"
                    values="0.9;1;0.9"
                    dur="2s"
                    repeatCount="indefinite"
                    begin="0.5s"
                  />
                </circle>
                <circle cx="12" cy="28" r="4" fill="#3B82F6" opacity="0.9" />

                {/* Radio group */}
                <circle
                  cx="36"
                  cy="12"
                  r="8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  opacity="0.6"
                />
                <circle
                  cx="36"
                  cy="28"
                  r="8"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="1.5"
                  opacity="0.8"
                />
                <circle cx="36" cy="28" r="4" fill="#3B82F6" opacity="0.8" />

                {/* Labels */}
                <text
                  x="24"
                  y="16"
                  fontSize="5"
                  fill="currentColor"
                  opacity="0.7"
                >
                  Label
                </text>
                <text
                  x="24"
                  y="32"
                  fontSize="5"
                  fill="currentColor"
                  opacity="0.7"
                >
                  Label
                </text>
              </svg>
            }
          />

          <Card
            to="/slider"
            title="Slider"
            description="Select values by dragging a handle. Supports single and range modes."
            icon={<svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Slider track */}
                <line
                  x1="4"
                  y1="24"
                  x2="44"
                  y2="24"
                  stroke="currentColor"
                  strokeWidth="2"
                  opacity="0.2"
                />

                {/* Single slider - active fill */}
                <line
                  x1="4"
                  y1="12"
                  x2="16"
                  y2="12"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  opacity="0.8"
                >
                  <animate
                    attributeName="opacity"
                    values="0.8;1;0.8"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </line>

                {/* Single slider - thumb */}
                <circle
                  cx="16"
                  cy="12"
                  r="6"
                  fill="white"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  opacity="0.8"
                />

                {/* Range slider - active fill */}
                <line
                  x1="4"
                  y1="36"
                  x2="20"
                  y2="36"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  opacity="0.7"
                >
                  <animate
                    attributeName="opacity"
                    values="0.7;1;0.7"
                    dur="2s"
                    repeatCount="indefinite"
                    begin="0.5s"
                  />
                </line>
                <line
                  x1="20"
                  y1="36"
                  x2="32"
                  y2="36"
                  stroke="currentColor"
                  strokeWidth="2"
                  opacity="0.2"
                />

                {/* Range slider - thumbs */}
                <circle
                  cx="20"
                  cy="36"
                  r="6"
                  fill="white"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  opacity="0.7"
                />
                <circle
                  cx="32"
                  cy="36"
                  r="6"
                  fill="white"
                  stroke="#3B82F6"
                  strokeWidth="1.5"
                  opacity="0.8"
                />
              </svg>
            }
          />

          <Card
            to="/status"
            title="Status"
            description="Status indicators with labels and colored dots."
            icon={<svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Status with dot - pill shape */}
                <rect
                  x="4"
                  y="8"
                  width="40"
                  height="16"
                  rx="8"
                  fill="currentColor"
                  opacity="0.1"
                />
                <circle cx="12" cy="16" r="3" fill="#3B82F6" opacity="0.9">
                  <animate
                    attributeName="opacity"
                    values="0.9;1;0.9"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <text
                  x="24"
                  y="19"
                  textAnchor="middle"
                  fontSize="6"
                  fill="currentColor"
                  opacity="0.8"
                  fontWeight="500"
                >
                  Label
                </text>

                {/* Status with dot - rounded shape */}
                <rect
                  x="4"
                  y="28"
                  width="40"
                  height="16"
                  rx="2"
                  fill="white"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  opacity="0.7"
                >
                  <animate
                    attributeName="opacity"
                    values="0.7;1;0.7"
                    dur="2s"
                    repeatCount="indefinite"
                    begin="0.5s"
                  />
                </rect>
                <circle cx="12" cy="36" r="3" fill="#3B82F6" opacity="0.8" />
                <text
                  x="24"
                  y="39"
                  textAnchor="middle"
                  fontSize="6"
                  fill="currentColor"
                  opacity="0.8"
                  fontWeight="500"
                >
                  Label
                </text>
              </svg>
            }
          />

          <Card
            to="/steps"
            title="Steps"
            description="Multi-step progress indicator with horizontal and vertical layouts."
            icon={<svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Horizontal steps */}
                <circle cx="8" cy="12" r="6" fill="#3B82F6" opacity="0.9">
                  <animate
                    attributeName="opacity"
                    values="0.9;1;0.9"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <line
                  x1="16"
                  y1="12"
                  x2="20"
                  y2="12"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  opacity="0.8"
                />
                <circle
                  cx="24"
                  cy="12"
                  r="6"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  opacity="0.7"
                />
                <line
                  x1="32"
                  y1="12"
                  x2="36"
                  y2="12"
                  stroke="currentColor"
                  strokeWidth="2"
                  opacity="0.3"
                />
                <circle
                  cx="40"
                  cy="12"
                  r="6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  opacity="0.5"
                />

                {/* Vertical steps */}
                <circle cx="12" cy="28" r="4" fill="#3B82F6" opacity="0.8" />
                <line
                  x1="12"
                  y1="34"
                  x2="12"
                  y2="36"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  opacity="0.7"
                />
                <circle
                  cx="12"
                  cy="40"
                  r="4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  opacity="0.5"
                />

                {/* Labels */}
                <text
                  x="8"
                  y="24"
                  fontSize="4"
                  fill="currentColor"
                  opacity="0.7"
                >
                  Step 1
                </text>
                <text
                  x="24"
                  y="24"
                  fontSize="4"
                  fill="currentColor"
                  opacity="0.7"
                >
                  Step 2
                </text>
              </svg>
            }
          />

          <Card
            to="/table"
            title="Table"
            description="Display tabular data with sortable columns and custom cells."
            icon={<svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Table structure */}
                <rect
                  x="4"
                  y="8"
                  width="40"
                  height="32"
                  rx="2"
                  fill="white"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  opacity="0.8"
                />

                {/* Header row */}
                <rect
                  x="4"
                  y="8"
                  width="40"
                  height="8"
                  fill="currentColor"
                  opacity="0.1"
                />
                <line
                  x1="16"
                  y1="8"
                  x2="16"
                  y2="16"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.3"
                />
                <line
                  x1="28"
                  y1="8"
                  x2="28"
                  y2="16"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.3"
                />

                {/* Data rows */}
                <line
                  x1="4"
                  y1="16"
                  x2="44"
                  y2="16"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.2"
                />
                <line
                  x1="16"
                  y1="16"
                  x2="16"
                  y2="40"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.2"
                />
                <line
                  x1="28"
                  y1="16"
                  x2="28"
                  y2="40"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.2"
                />
                <line
                  x1="4"
                  y1="24"
                  x2="44"
                  y2="24"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.2"
                />
                <line
                  x1="4"
                  y1="32"
                  x2="44"
                  y2="32"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.2"
                />

                {/* Cell content indicators */}
                <circle
                  cx="10"
                  cy="12"
                  r="1.5"
                  fill="currentColor"
                  opacity="0.6"
                />
                <circle
                  cx="22"
                  cy="12"
                  r="1.5"
                  fill="currentColor"
                  opacity="0.6"
                />
                <circle
                  cx="34"
                  cy="12"
                  r="1.5"
                  fill="currentColor"
                  opacity="0.6"
                />
              </svg>
            }
          />

          <Card
            to="/tag"
            title="Tag"
            description="Display labels or metadata with multiple sizes and colors."
            icon={<svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Tag - pill shape */}
                <rect
                  x="4"
                  y="14"
                  width="40"
                  height="12"
                  rx="6"
                  fill="currentColor"
                  opacity="0.1"
                />
                <text
                  x="24"
                  y="23"
                  textAnchor="middle"
                  fontSize="6"
                  fill="currentColor"
                  opacity="0.8"
                  fontWeight="600"
                >
                  Tag
                </text>

                {/* Tag with icon - rounded */}
                <rect
                  x="4"
                  y="30"
                  width="40"
                  height="12"
                  rx="2"
                  fill="#3B82F6"
                  opacity="0.2"
                >
                  <animate
                    attributeName="opacity"
                    values="0.2;0.4;0.2"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </rect>
                <circle
                  cx="10"
                  cy="36"
                  r="3"
                  fill="currentColor"
                  opacity="0.7"
                />
                <text
                  x="24"
                  y="39"
                  textAnchor="middle"
                  fontSize="6"
                  fill="currentColor"
                  opacity="0.8"
                  fontWeight="600"
                >
                  Label
                </text>
              </svg>
            }
          />

          <Card
            to="/textarea"
            title="Textarea"
            description="Multi-line text input with multiple sizes and states."
            icon={<svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Textarea field */}
                <rect
                  x="4"
                  y="8"
                  width="40"
                  height="20"
                  rx="2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  opacity="0.7"
                >
                  <animate
                    attributeName="opacity"
                    values="0.7;1;0.7"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </rect>

                {/* Placeholder text lines */}
                <line
                  x1="8"
                  y1="14"
                  x2="20"
                  y2="14"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.4"
                />
                <line
                  x1="8"
                  y1="18"
                  x2="28"
                  y2="18"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.4"
                />
                <line
                  x1="8"
                  y1="22"
                  x2="24"
                  y2="22"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.4"
                />

                {/* Resize handle */}
                <path
                  d="M 38 24 L 40 26 L 38 28"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                  opacity="0.5"
                />
              </svg>
            }
          />

          <Card
            to="/toast"
            title="Toast"
            description="Temporary notifications for feedback and system status."
            icon={<svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Toast notification */}
                <rect
                  x="4"
                  y="8"
                  width="40"
                  height="24"
                  rx="4"
                  fill="currentColor"
                  opacity="0.1"
                />
                <rect
                  x="8"
                  y="12"
                  width="32"
                  height="16"
                  rx="2"
                  fill="white"
                  opacity="0.9"
                  stroke="currentColor"
                  strokeWidth="1"
                />

                {/* Toast icon */}
                <circle cx="16" cy="20" r="3" fill="#10B981" opacity="0.8">
                  <animate
                    attributeName="opacity"
                    values="0.8;1;0.8"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Toast message lines */}
                <line
                  x1="22"
                  y1="18"
                  x2="32"
                  y2="18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  opacity="0.7"
                />
                <line
                  x1="22"
                  y1="22"
                  x2="28"
                  y2="22"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.5"
                />

                {/* Close button */}
                <circle cx="36" cy="20" r="4" fill="currentColor" opacity="0.2">
                  <animate
                    attributeName="opacity"
                    values="0.2;0.4;0.2"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </circle>
                <line
                  x1="34"
                  y1="18"
                  x2="38"
                  y2="22"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.6"
                />
                <line
                  x1="38"
                  y1="18"
                  x2="34"
                  y2="22"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.6"
                />
              </svg>
            }
          />

          <Card
            to="/input"
            title="Input"
            description="Single-line text input with multiple types and states."
            icon={<svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Input field */}
                <rect
                  x="4"
                  y="16"
                  width="40"
                  height="12"
                  rx="2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  opacity="0.7"
                >
                  <animate
                    attributeName="opacity"
                    values="0.7;1;0.7"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </rect>

                {/* Placeholder text */}
                <line
                  x1="8"
                  y1="22"
                  x2="28"
                  y2="22"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.4"
                />

                {/* Focused state */}
                <rect
                  x="4"
                  y="32"
                  width="40"
                  height="12"
                  rx="2"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="1.5"
                  opacity="0.9"
                >
                  <animate
                    attributeName="opacity"
                    values="0.9;1;0.9"
                    dur="2s"
                    repeatCount="indefinite"
                    begin="1s"
                  />
                </rect>
                <line
                  x1="8"
                  y1="38"
                  x2="24"
                  y2="38"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.6"
                />
              </svg>
            }
          />

          <Card
            to="/toggle"
            title="Toggle"
            description="Toggle switches for on/off states with multiple sizes."
            icon={<svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Toggle off state */}
                <rect
                  x="4"
                  y="12"
                  width="32"
                  height="16"
                  rx="8"
                  fill="currentColor"
                  opacity="0.2"
                />
                <circle cx="12" cy="20" r="6" fill="white" opacity="0.9">
                  <animate
                    attributeName="cx"
                    values="12;28;12"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Toggle on state */}
                <rect
                  x="4"
                  y="32"
                  width="32"
                  height="16"
                  rx="8"
                  fill="#3B82F6"
                  opacity="0.9"
                >
                  <animate
                    attributeName="opacity"
                    values="0.9;1;0.9"
                    dur="2s"
                    repeatCount="indefinite"
                    begin="1s"
                  />
                </rect>
                <circle cx="28" cy="40" r="6" fill="white" opacity="0.9">
                  <animate
                    attributeName="opacity"
                    values="0.9;1;0.9"
                    dur="2s"
                    repeatCount="indefinite"
                    begin="1s"
                  />
                </circle>

                {/* Icons */}
                <circle
                  cx="16"
                  cy="20"
                  r="3"
                  fill="currentColor"
                  opacity="0.4"
                />
                <circle cx="20" cy="40" r="3" fill="white" opacity="0.6" />
              </svg>
            }
          />

          <Card
            to="/tooltip"
            title="Tooltip"
            description="Contextual information on hover with smooth animations."
            icon={<svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Tooltip box */}
                <rect
                  x="8"
                  y="8"
                  width="32"
                  height="20"
                  rx="2"
                  fill="currentColor"
                  opacity="0.1"
                />
                <rect
                  x="10"
                  y="10"
                  width="28"
                  height="16"
                  rx="2"
                  fill="white"
                  opacity="0.9"
                  stroke="currentColor"
                  strokeWidth="1"
                />

                {/* Tooltip text */}
                <line
                  x1="14"
                  y1="16"
                  x2="26"
                  y2="16"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.7"
                />
                <line
                  x1="14"
                  y1="20"
                  x2="30"
                  y2="20"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.5"
                />

                {/* Tooltip arrow pointing down */}
                <path
                  d="M24 28 L20 32 L28 32 Z"
                  fill="currentColor"
                  opacity="0.8"
                />

                {/* Trigger element (button) */}
                <rect
                  x="18"
                  y="36"
                  width="12"
                  height="8"
                  rx="2"
                  fill="currentColor"
                  opacity="0.3"
                >
                  <animate
                    attributeName="opacity"
                    values="0.3;0.5;0.3"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </rect>
              </svg>
            }
          />
          </Flex>
        </div>
      </main>
    </section>
  );
}
