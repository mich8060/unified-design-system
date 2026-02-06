import React from "react";
import Icon from "../Icon/Icon";
import "./Steps.scss";

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
  warning: "warning",
};

const sizeClassMap = {
  default: "default",
  compact: "compact",
};

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
}) {
  if (!steps || steps.length === 0) {
    return null;
  }

  const classNames = [
    BASE_CLASS,
    orientationClassMap[orientation] &&
      `${BASE_CLASS}--${orientationClassMap[orientation]}`,
    sizeClassMap[size] && `${BASE_CLASS}--${sizeClassMap[size]}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const getStepPosition = (index, total) => {
    if (index === 0) return "start";
    if (index === total - 1) return "end";
    return "middle";
  };

  const getStepStatus = (step) => {
    return step.status || "incomplete";
  };

  const shouldShowConnector = (index, total) => {
    return index < total - 1;
  };

  const isStepComplete = (stepStatus) => {
    return stepStatus === "complete";
  };

  const isStepActive = (stepStatus) => {
    return stepStatus === "active";
  };

  const isStepIncomplete = (stepStatus) => {
    return stepStatus === "incomplete";
  };

  const isStepError = (stepStatus) => {
    return stepStatus === "error";
  };

  const isStepWarning = (stepStatus) => {
    return stepStatus === "warning";
  };

  const isStepDisabled = (stepStatus) => {
    return stepStatus === "disabled";
  };

  const getConnectorStatus = (currentStepStatus, nextStepStatus) => {
    // Connector is active if current step is complete or active
    if (isStepComplete(currentStepStatus) || isStepActive(currentStepStatus)) {
      return "active";
    }
    return "inactive";
  };

  return (
    <div className={classNames} {...props}>
      {steps.map((step, index) => {
        const stepStatus = getStepStatus(step);
        const stepPosition = getStepPosition(index, steps.length);
        const showConnector = shouldShowConnector(index, steps.length);
        const connectorStatus = showConnector
          ? getConnectorStatus(stepStatus, getStepStatus(steps[index + 1]))
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
                {isStepWarning(stepStatus) && (
                  <div
                    className={`${BASE_CLASS}__indicator-circle ${BASE_CLASS}__indicator-circle--warning`}
                  >
                    <Icon
                      name="WarningCircle"
                      size={12}
                      appearance="bold"
                      className={`${BASE_CLASS}__warning-icon`}
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
