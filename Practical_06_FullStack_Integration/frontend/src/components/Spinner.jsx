import React from 'react';

/**
 * Spinner Component (Practical 3)
 * Provides visual loading feedback while asynchronous API fetch is pending.
 */
export default function Spinner({ message = 'Fetching GitHub repositories...' }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3.5rem 1rem',
      gap: '1rem'
    }}>
      <div style={{
        width: '45px',
        height: '45px',
        border: '3px solid rgba(6, 182, 212, 0.2)',
        borderTop: '3px solid var(--accent-cyan)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{message}</p>
    </div>
  );
}
