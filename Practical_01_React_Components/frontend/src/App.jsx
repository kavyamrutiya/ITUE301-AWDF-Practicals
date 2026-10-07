import React from 'react';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Footer from './components/Footer';

/**
 * Practical 1: Main Portfolio Application
 * Composes Header, About, Skills, and Footer into a single coherent layout.
 * Passes props to Header (name, role, tagline, themeColor) and Skills (skillList array).
 */
export default function App() {
  const studentSkills = [
    'React.js (v18+)',
    'Vite Build Tool',
    'Component Architecture',
    'Props & Data Flow',
    'Modern JavaScript (ES6+)',
    'Node.js & Express',
    'RESTful API Design',
    'MongoDB & Mongoose',
    'Docker & Containerization',
    'Git & GitHub Workflows'
  ];

  return (
    <div className="portfolio-container">
      {/* Component 1: Header with props */}
      <Header
        name="Kavya Mrutiya"
        role="Full Stack Web Developer & Computer Engineering Student"
        tagline="Building scalable web applications, robust REST APIs, and modern responsive user interfaces with modular component architectures."
        themeColor="#06b6d4"
      />

      {/* Component 2: About section */}
      <About />

      {/* Component 3: Skills list receiving array prop */}
      <Skills skillList={studentSkills} />

      {/* Component 4: Footer */}
      <Footer
        year={2026}
        studentName="Kavya Mrutiya"
        githubUrl="https://github.com/kavyamrutiya"
      />
    </div>
  );
}
