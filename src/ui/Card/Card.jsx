import React from "react";
import { Link } from "react-router-dom";
import "./Card.scss";

/**
 * Card component for navigation items on the overview page
 * 
 * @param {Object} props
 * @param {string} props.to - The route path to navigate to
 * @param {string} props.title - The card title
 * @param {string} props.description - The card description
 * @param {React.ReactNode} props.icon - The SVG icon to display
 * @param {string} [props.className] - Additional CSS classes
 */
export default function Card({ to, title, description, icon, className = "" }) {
  return (
    <Link className={`card ${className}`.trim()} to={to}>
      <div className="card__icon">{icon}</div>
      <div className="card__content">
        <h2 className="card__title">{title}</h2>
        <p className="card__description">{description}</p>
      </div>
    </Link>
  );
}
