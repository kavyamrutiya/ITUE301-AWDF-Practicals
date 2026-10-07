import React from 'react';
import Header from '../components/Header';
import About from '../components/About';
import Skills from '../components/Skills';

/**
 * Home Page (Practical 2)
 * Inherits and composes Practical 1 components: Header, About, Skills
 */
export default function Home() {
  const studentSkills = [
    'React 18 & Hooks',
    'React Router v6',
    'Component Architecture',
    'Controlled State (useState)',
    'Modern JavaScript (ES6+)',
    'Node.js & Express',
    'RESTful API Design',
    'MongoDB & Mongoose'
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Header
        name="Kavya Mrutiya"
        role="Full Stack Developer & Computer Engineering Student"
        tagline="Demonstrating client-side routing, controlled state management, and reusable component hierarchies."
        themeColor="#06b6d4"
      />
      <About />
      <Skills skillList={studentSkills} />
    </div>
  );
}
