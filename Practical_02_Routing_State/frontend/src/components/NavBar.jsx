import React from 'react';
import { NavLink, Link } from 'react-router-dom';

/**
 * NavBar Component (Practical 2)
 * Renders SPA navigation using NavLink without full page reload.
 * Highlights the active route. Includes dark/light mode toggle.
 */
export default function NavBar({ isDark, onToggleTheme }) {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        Kavya Mrutiya
      </Link>

      <ul className="nav-links">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/projects"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            Projects
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            Contact
          </NavLink>
        </li>
        <li>
          <button
            type="button"
            onClick={onToggleTheme}
            className="theme-toggle-btn"
            title="Toggle Light / Dark mode"
          >
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </button>
        </li>
      </ul>
    </nav>
  );
}
