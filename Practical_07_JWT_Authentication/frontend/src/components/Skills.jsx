import React from 'react';

/**
 * Skills Component (Reusable Component 3)
 * Receives props: skillList (array of strings)
 * Renders dynamically using map() with key attributes
 */
export default function Skills({ skillList = [] }) {
  return (
    <section className="section-card">
      <h2 className="section-title">
        <span className="section-title-dot"></span>
        Technical Skills & Proficiencies ({skillList.length})
      </h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.95rem' }}>
        Dynamic skill tags rendered via parent props array:
      </p>
      <div className="skills-container">
        <ul className="skills-list">
          {skillList.map((skill, index) => (
            <li key={`${skill}-${index}`} className="skill-pill">
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
