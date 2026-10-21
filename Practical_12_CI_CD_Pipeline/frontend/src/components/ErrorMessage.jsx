import React from 'react';

/**
 * ErrorMessage Component (Practical 3)
 * Displays error state and provides a Retry button to re-trigger the fetch request.
 */
export default function ErrorMessage({ message, onRetry }) {
  return (
    <div style={{
      background: 'rgba(239, 68, 68, 0.1)',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      borderRadius: '0.75rem',
      padding: '2rem',
      textAlign: 'center',
      margin: '1.5rem 0'
    }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⚠️</div>
      <h3 style={{ color: '#ef4444', marginBottom: '0.5rem', fontSize: '1.25rem' }}>
        API Request Failed
      </h3>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem', maxWidth: '500px', margin: '0 auto 1.25rem auto' }}>
        {message}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          style={{
            background: 'var(--accent-gradient)',
            color: '#fff',
            border: 'none',
            padding: '0.6rem 1.5rem',
            borderRadius: '0.5rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'opacity 0.2s'
          }}
        >
          🔄 Retry Fetch
        </button>
      )}
    </div>
  );
}
