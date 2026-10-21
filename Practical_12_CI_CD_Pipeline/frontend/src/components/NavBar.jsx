import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function NavBar({ isDark, onToggleTheme, user, onOpenAuth, onLogout }) {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        Kavya Mrutiya
      </Link>

      <ul className="nav-links">
        <li>
          <NavLink to="/" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/tasks" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            Tasks (Protected)
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            Contact
          </NavLink>
        </li>
        <li>
          <button type="button" onClick={onToggleTheme} className="theme-toggle-btn" title="Toggle Theme">
            {isDark ? '☀️' : '🌙'}
          </button>
        </li>
        <li>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                👤 {user.name}
              </span>
              <button
                type="button"
                onClick={onLogout}
                style={{
                  background: 'rgba(239, 68, 68, 0.2)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  color: '#ef4444',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenAuth}
              style={{
                background: 'var(--accent-gradient)',
                border: 'none',
                color: '#fff',
                padding: '0.4rem 0.9rem',
                borderRadius: '0.5rem',
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontWeight: 700
              }}
            >
              Sign In / Register
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}
