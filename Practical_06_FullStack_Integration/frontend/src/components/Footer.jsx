import React from 'react';

/**
 * Footer Component (Reusable Component 4)
 * Receives props: year, studentName, githubUrl
 */
export default function Footer({ year = 2026, studentName = 'Kavya Mrutiya', githubUrl = 'https://github.com/kavyamrutiya' }) {
  return (
    <footer className="footer-card">
      <ul className="footer-links">
        <li>
          <a href={githubUrl} target="_blank" rel="noreferrer" className="footer-link">
            GitHub Profile
          </a>
        </li>
        <li>
          <a href="mailto:contact@kavyamrutiya.dev" className="footer-link">
            Email Inquiries
          </a>
        </li>
        <li>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer-link">
            LinkedIn
          </a>
        </li>
      </ul>
      <p>
        &copy; {year} {studentName}. Built with React & Vite for ITUE301 Practical Submission.
      </p>
      <span className="footer-badge">Charotar University of Science and Technology • FTE</span>
    </footer>
  );
}
