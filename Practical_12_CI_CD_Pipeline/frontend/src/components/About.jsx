import React from 'react';

/**
 * About Component (Reusable Component 2)
 * Displays student background, academic institution, and engineering focus
 */
export default function About() {
  return (
    <section className="section-card">
      <h2 className="section-title">
        <span className="section-title-dot"></span>
        About Me
      </h2>
      <p style={{ color: '#cbd5e1', fontSize: '1.05rem', marginBottom: '1.25rem' }}>
        I am a 3rd-year Computer Engineering undergraduate specializing in modern full-stack web architectures,
        scalable REST API design, and distributed systems. Passionate about building modular, accessible,
        and high-performance web applications using React, Node.js, and cloud ecosystems.
      </p>

      <div className="about-grid">
        <div className="about-item">
          <div className="about-item-label">University</div>
          <div className="about-item-value">Charotar University of Science and Technology (CHARUSAT)</div>
        </div>
        <div className="about-item">
          <div className="about-item-label">Department</div>
          <div className="about-item-value">Faculty of Technology and Engineering (FTE)</div>
        </div>
        <div className="about-item">
          <div className="about-item-label">Course / Semester</div>
          <div className="about-item-value">Advanced Web Development Frameworks (ITUE301) | Semester 5</div>
        </div>
        <div className="about-item">
          <div className="about-item-label">Focus Areas</div>
          <div className="about-item-value">Component Driven Architecture, API Pipelines, Containerization</div>
        </div>
      </div>
    </section>
  );
}
