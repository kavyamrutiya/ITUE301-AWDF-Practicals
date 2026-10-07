import React, { useState } from 'react';

/**
 * Contact Page (Practical 2)
 * Demonstrates Controlled Form Input with useState:
 * - captures input on every keystroke (value + onChange)
 * - displays live character counter
 * - renders live preview of user message in real time
 */
export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submittedMessage, setSubmittedMessage] = useState(null);

  const MAX_CHARS = 250;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    setSubmittedMessage({
      name: formData.name,
      email: formData.email,
      message: formData.message,
      timestamp: new Date().toLocaleTimeString()
    });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="section-card">
      <h2 className="section-title">
        <span className="section-title-dot"></span>
        Get In Touch (Controlled State Demonstration)
      </h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        This contact form uses controlled components tied to React <code>useState</code>. Every keystroke updates state synchronously.
      </p>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label className="form-label" htmlFor="name">Your Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Kavya Mrutiya"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. student@charusat.edu.in"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="message">Message *</label>
          <textarea
            id="message"
            name="message"
            required
            rows="4"
            maxLength={MAX_CHARS}
            value={formData.message}
            onChange={handleChange}
            placeholder="Type your message here..."
            className="form-textarea"
          />
          <div className="char-counter">
            {formData.message.length} / {MAX_CHARS} characters
          </div>
        </div>

        {/* Live Preview Box */}
        {formData.message && (
          <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 'bold' }}>LIVE PREVIEW:</span>
            <p style={{ fontStyle: 'italic', color: 'var(--text-primary)', marginTop: '0.25rem' }}>
              &ldquo;{formData.message}&rdquo;
            </p>
          </div>
        )}

        <button type="submit" className="form-submit-btn">
          Send Message
        </button>
      </form>

      {/* Submission Confirmation */}
      {submittedMessage && (
        <div className="form-feedback">
          <strong>Message Sent Successfully!</strong>
          <p style={{ marginTop: '0.35rem' }}>
            Thank you, {submittedMessage.name}! Received at {submittedMessage.timestamp}:
          </p>
          <p style={{ marginTop: '0.25rem', fontStyle: 'italic' }}>
            &ldquo;{submittedMessage.message}&rdquo;
          </p>
        </div>
      )}
    </section>
  );
}
