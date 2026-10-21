import React from 'react';
import { Link } from 'react-router-dom';

/**
 * NotFound Component (Practical 2)
 * Catch-all route (*), renders custom 404 message and navigation back home.
 */
export default function NotFound() {
  return (
    <section className="section-card notfound-container">
      <div className="notfound-code">404</div>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto' }}>
        The route you navigated to does not exist in this Single Page Application.
      </p>
      <Link to="/" className="notfound-link">
        &larr; Return to Home Page
      </Link>
    </section>
  );
}
