import React, { useState } from 'react';
import { registerUser, loginUser } from '../api/api';

/**
 * AuthModal Component (Practical 7)
 * Implements login and register tabs with input validation
 */
export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  if (!isOpen) return null;

  const [isLoginTab, setIsLoginTab] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLoginTab) {
        const res = await loginUser({ email, password });
        onAuthSuccess(res.user);
      } else {
        const res = await registerUser({ name, email, password });
        onAuthSuccess(res.user);
      }
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '420px' }}>
        {/* Tab switchers */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
          <button
            type="button"
            onClick={() => { setIsLoginTab(true); setError(null); }}
            style={{
              flex: 1,
              padding: '0.75rem',
              background: 'none',
              border: 'none',
              color: isLoginTab ? 'var(--accent-cyan)' : 'var(--text-secondary)',
              borderBottom: isLoginTab ? '2px solid var(--accent-cyan)' : 'none',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => { setIsLoginTab(false); setError(null); }}
            style={{
              flex: 1,
              padding: '0.75rem',
              background: 'none',
              border: 'none',
              color: !isLoginTab ? 'var(--accent-cyan)' : 'var(--text-secondary)',
              borderBottom: !isLoginTab ? '2px solid var(--accent-cyan)' : 'none',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Create Account
          </button>
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid #ef4444', color: '#ef4444', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {!isLoginTab && (
            <div>
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Kavya Mrutiya"
                className="form-input"
                style={{ width: '100%', marginTop: '0.35rem' }}
              />
            </div>
          )}

          <div>
            <label className="form-label">Email Address *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. student@charusat.edu.in"
              className="form-input"
              style={{ width: '100%', marginTop: '0.35rem' }}
            />
          </div>

          <div>
            <label className="form-label">Password * (Min 6 chars)</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="form-input"
              style={{ width: '100%', marginTop: '0.35rem' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="form-submit-btn"
            style={{ marginTop: '0.5rem' }}
          >
            {loading ? 'Processing...' : isLoginTab ? 'Log In to System' : 'Register Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
          <button
            type="button"
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.85rem' }}
          >
            Cancel and Close
          </button>
        </div>
      </div>
    </div>
  );
}
