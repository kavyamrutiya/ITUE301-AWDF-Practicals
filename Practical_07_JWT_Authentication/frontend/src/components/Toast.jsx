import React from 'react';

/**
 * Toast Notification Component (Practical 6 Supplementary)
 */
export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const isSuccess = toast.type === 'success';

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      zIndex: 999,
      background: isSuccess ? '#065f46' : '#991b1b',
      border: `1px solid ${isSuccess ? '#10b981' : '#ef4444'}`,
      color: '#ffffff',
      padding: '0.85rem 1.35rem',
      borderRadius: '0.75rem',
      boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      fontSize: '0.95rem',
      fontWeight: '500',
      animation: 'slideIn 0.3s ease'
    }}>
      <span>{isSuccess ? '✅' : '❌'}</span>
      <span>{toast.message}</span>
      <button
        type="button"
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
          fontWeight: 'bold',
          marginLeft: '0.5rem'
        }}
      >
        ✕
      </button>
    </div>
  );
}
