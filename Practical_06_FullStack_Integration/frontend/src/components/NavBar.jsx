import React from 'react';
import { NavLink, Link } from 'react-router-dom';

/**
 * NavBar Component (Practical 6 Full Stack)
 * Includes routes: Home, Tasks, Contact, and Light/Dark toggle.
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
            to="/tasks"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            Tasks (FullStack)
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
