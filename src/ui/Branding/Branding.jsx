import React from "react";
import "./Branding.scss";

const BASE_CLASS = "uds-branding";

/**
 * Branding component for displaying brand logos and names
 * @param {Array} brands - Array of brand objects with { name, logo, description? }
 * @param {string} layout - Layout variant: 'vertical' | 'horizontal' | 'grid'
 * @param {string} size - Size variant: 'small' | 'default' | 'large'
 * @param {string} className - Additional CSS classes
 * @param {object} props - Additional props to pass to the branding container
 */
export default function Branding({
  brands = [],
  layout = "vertical",
  size = "default",
  className = "",
  ...props
}) {
  const classNames = [
    BASE_CLASS,
    `${BASE_CLASS}--${layout}`,
    `${BASE_CLASS}--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (!brands || brands.length === 0) {
    return null;
  }

  return (
    <div className={classNames} {...props}>
      {brands.map((brand, index) => (
        <div key={index} className={`${BASE_CLASS}__item`}>
          {brand.logo && (
            <div className={`${BASE_CLASS}__logo`}>
              {typeof brand.logo === "string" ? (
                <img
                  src={brand.logo}
                  alt={brand.name || `Brand ${index + 1}`}
                  className={`${BASE_CLASS}__logo-image`}
                />
              ) : (
                <div className={`${BASE_CLASS}__logo-placeholder`}>
                  {brand.logo}
                </div>
              )}
            </div>
          )}
          {brand.name && (
            <div className={`${BASE_CLASS}__name`}>{brand.name}</div>
          )}
          {brand.description && (
            <div className={`${BASE_CLASS}__description`}>
              {brand.description}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
