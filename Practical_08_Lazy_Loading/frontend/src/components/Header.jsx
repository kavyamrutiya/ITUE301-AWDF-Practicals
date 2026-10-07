import React from 'react';

/**
 * Header Component (Reusable Component 1)
 * Receives props: name, role, tagline, themeColor
 */
export default function Header({ name, role, tagline, themeColor = '#06b6d4' }) {
  return (
    <header className="header-card" style={{ borderTop: `4px solid ${themeColor}` }}>
      <span className="header-badge">ITUE301 • Practical 1 Demonstration</span>
      <h1 className="header-name">{name}</h1>
      <h2 className="header-title">{role}</h2>
      <p className="header-tagline">{tagline}</p>
    </header>
  );
}
