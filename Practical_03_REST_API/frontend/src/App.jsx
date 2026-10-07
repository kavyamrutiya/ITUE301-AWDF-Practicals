import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

/**
 * Practical 2: Multi-Route Portfolio Application
 * Implements client-side routing with React Router v6:
 * - / (Home)
 * - /projects (Projects)
 * - /contact (Contact)
 * - * (404 NotFound)
 * Implements state management using useState:
 * - isDark theme toggle
 * - controlled form state
 */
export default function App() {
  const [isDark, setIsDark] = useState(true);

  // Apply dark/light class to body
  useEffect(() => {
    if (isDark) {
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div className="portfolio-container">
      {/* Navigation Bar with active routes and theme toggle */}
      <NavBar isDark={isDark} onToggleTheme={toggleTheme} />

      {/* Route Switcher */}
      <main style={{ minHeight: '60vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Reusable Footer from Practical 1 */}
      <Footer
        year={2026}
        studentName="Kavya Mrutiya"
        githubUrl="https://github.com/kavyamrutiya"
      />
    </div>
  );
}
