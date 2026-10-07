import React, { useState } from 'react';

/**
 * Projects Page (Practical 2)
 * Displays project cards and demonstrates useState variable #2:
 * Modal details visibility toggle.
 */
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'FitZone Gym & Booking System',
      description: 'Comprehensive fitness center platform with trainer scheduling, booking conflict detection, and member dashboards.',
      tags: ['React', 'Express', 'MongoDB', 'JWT'],
      details: 'Full-stack application featuring role-based access control, class capacity validation, and interactive weekly calendar booking views.'
    },
    {
      id: 2,
      title: 'RESTful Task Management Engine',
      description: 'High-throughput task pipeline featuring custom middleware, strict schema validation, and cache invalidation.',
      tags: ['Node.js', 'Express', 'Mongoose', 'REST API'],
      details: 'Engineered complete CRUD operations, request logging, ObjectId format sanitization, and structured JSON error responses.'
    },
    {
      id: 3,
      title: 'Performance-Optimized Portfolio SPA',
      description: 'Single Page Application built using React Router, code splitting, and reactive state management.',
      tags: ['React Router v6', 'Vite', 'State Management'],
      details: 'Demonstrates zero-page-reload routing, controlled form inputs, theme state persistence, and modular components.'
    }
  ];

  return (
    <section className="section-card">
      <h2 className="section-title">
        <span className="section-title-dot"></span>
        Featured Projects
      </h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
        Select a project to toggle details modal (demonstrating UI state toggle via <code>useState</code>):
      </p>

      <div className="projects-grid">
        {projects.map((proj) => (
          <div key={proj.id} className="project-card">
            <div className="project-header">
              <h3>{proj.title}</h3>
              <p>{proj.description}</p>
            </div>
            <ul className="project-tags">
              {proj.tags.map((t) => (
                <li key={t} className="project-tag">{t}</li>
              ))}
            </ul>
            <button
              type="button"
              className="btn-details"
              onClick={() => setSelectedProject(proj)}
            >
              View Details &rarr;
            </button>
          </div>
        ))}
      </div>

      {/* Modal Dialog controlled by useState */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
              {selectedProject.title}
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              {selectedProject.details}
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {selectedProject.tags.map((t) => (
                <span key={t} className="project-tag">{t}</span>
              ))}
            </div>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setSelectedProject(null)}
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
