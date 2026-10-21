import React from 'react';

/**
 * ConfirmModal Component (Practical 6 Supplementary)
 * Provides delete confirmation dialog
 */
export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 style={{ fontSize: '1.3rem', color: '#ef4444', marginBottom: '0.75rem' }}>
          ⚠️ {title || 'Confirm Action'}
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          {message || 'Are you sure you want to proceed with this operation?'}
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              padding: '0.55rem 1.15rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            style={{
              background: '#ef4444',
              border: 'none',
              color: '#ffffff',
              padding: '0.55rem 1.15rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: 700
            }}
          >
            Yes, Delete Task
          </button>
        </div>
      </div>
    </div>
  );
}
