import React from "react";
import Icon from "../Icon/Icon";
import "./_steps.scss";
import type { StepsProps } from "./Steps.types";

const BASE_CLASS = "uds-steps";

const orientationClassMap = {
  horizontal: "horizontal",
  vertical: "vertical",
};

const statusClassMap = {
  complete: "complete",
  active: "active",
  incomplete: "incomplete",
  disabled: "disabled",
  error: "error",
};

const sizeClassMap = {
  default: "default",
  compact: "compact",
};

type StepStatus = keyof typeof statusClassMap;
type StepOrientation = keyof typeof orientationClassMap;
type StepSize = keyof typeof sizeClassMap;

interface StepItem {
  label?: React.ReactNode;
  optionalLabel?: React.ReactNode;
  status?: unknown;
}

const isStepStatus = (value: unknown): value is StepStatus =>
  typeof value === "string" && value in statusClassMap;

/**
 * Steps component for displaying multi-step processes
 * @param {array} steps - Array of step objects. Each step should have: { label, optionalLabel, status }
 * @param {string} orientation - Orientation: 'horizontal' or 'vertical'
 * @param {string} size - Size variant: 'default' or 'compact'
 * @param {boolean} displayLabel - Whether to display labels
 * @param {string} className - Additional CSS classes
 * @param {object} props - Additional props to pass to the steps container
 */
export default function Steps({
  steps = [],
  orientation = "horizontal",
  size = "default",
  displayLabel = true,
  className = "",
  ...props
}: StepsProps) {
  const normalizedSteps: StepItem[] = Array.isArray(steps) ? (steps as StepItem[]) : [];
  if (normalizedSteps.length === 0) {
    return null;
  }
  const resolvedOrientation: StepOrientation =
    typeof orientation === "string" && orientation in orientationClassMap
      ? (orientation as StepOrientation)
      : "horizontal";
  const resolvedSize: StepSize =
    typeof size === "string" && size in sizeClassMap
      ? (size as StepSize)
      : "default";

  const classNames = [
    BASE_CLASS,
    `${BASE_CLASS}--${orientationClassMap[resolvedOrientation]}`,
    `${BASE_CLASS}--${sizeClassMap[resolvedSize]}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const getStepPosition = (index: number, total: number): "start" | "middle" | "end" => {
    if (index === 0) return "start";
    if (index === total - 1) return "end";
    return "middle";
  };

  const getStepStatus = (step: StepItem): StepStatus => {
    const rawStatus = step?.status;
    return isStepStatus(rawStatus) ? rawStatus : "incomplete";
  };

  const shouldShowConnector = (index: number, total: number) => {
    return index < total - 1;
  };

  const isStepComplete = (stepStatus: StepStatus) => {
    return stepStatus === "complete";
  };

  const isStepActive = (stepStatus: StepStatus) => {
    return stepStatus === "active";
  };

  const isStepIncomplete = (stepStatus: StepStatus) => {
    return stepStatus === "incomplete";
  };

  const isStepError = (stepStatus: StepStatus) => {
    return stepStatus === "error";
  };

  const isStepDisabled = (stepStatus: StepStatus) => {
    return stepStatus === "disabled";
  };

  const getConnectorStatus = (currentStepStatus: StepStatus) => {
    // Connector is active only after a completed step.
    // Active means "current step in progress", so the outgoing connector stays inactive.
    if (isStepComplete(currentStepStatus)) {
      return "active";
    }
    return "inactive";
  };

  return (
    <div className={classNames} {...props}>
      {normalizedSteps.map((step, index) => {
        const stepStatus = getStepStatus(step);
        const stepPosition = getStepPosition(index, normalizedSteps.length);
        const showConnector = shouldShowConnector(index, normalizedSteps.length);
        const connectorStatus = showConnector
          ? getConnectorStatus(stepStatus)
          : null;

        const stepClassNames = [
          `${BASE_CLASS}__step`,
          statusClassMap[stepStatus] &&
            `${BASE_CLASS}__step--${statusClassMap[stepStatus]}`,
          `${BASE_CLASS}__step--${stepPosition}`,
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <React.Fragment key={index}>
            <div className={stepClassNames}>
              <div className={`${BASE_CLASS}__indicator`}>
                {isStepComplete(stepStatus) && (
                  <div
                    className={`${BASE_CLASS}__indicator-circle ${BASE_CLASS}__indicator-circle--complete`}
                  >
                    <Icon
                      name="Check"
                      size={12}
                      appearance="bold"
                      className={`${BASE_CLASS}__check-icon`}
                    />
                  </div>
                )}
                {isStepActive(stepStatus) && (
                  <div
                    className={`${BASE_CLASS}__indicator-circle ${BASE_CLASS}__indicator-circle--active`}
                  />
                )}
                {isStepIncomplete(stepStatus) && (
                  <div
                    className={`${BASE_CLASS}__indicator-circle ${BASE_CLASS}__indicator-circle--incomplete`}
                  />
                )}
                {isStepError(stepStatus) && (
                  <div
                    className={`${BASE_CLASS}__indicator-circle ${BASE_CLASS}__indicator-circle--error`}
                  >
                    <Icon
                      name="X"
                      size={12}
                      appearance="bold"
                      className={`${BASE_CLASS}__error-icon`}
                    />
                  </div>
                )}
                {isStepDisabled(stepStatus) && (
                  <div
                    className={`${BASE_CLASS}__indicator-circle ${BASE_CLASS}__indicator-circle--disabled`}
                  />
                )}
              </div>
              {displayLabel && (
                <div className={`${BASE_CLASS}__label-container`}>
                  {step.label && (
                    <span className={`${BASE_CLASS}__label`}>{step.label}</span>
                  )}
                  {step.optionalLabel && (
                    <span className={`${BASE_CLASS}__optional-label`}>
                      {step.optionalLabel}
                    </span>
                  )}
                </div>
              )}
            </div>
            {showConnector && (
              <div
                className={`${BASE_CLASS}__connector ${BASE_CLASS}__connector--${connectorStatus}`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
