import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

/**
 * Practical 6 Main App
 * Full-stack integration connecting React UI with Express & MongoDB backend.
 */
export default function App() {
  const [isDark, setIsDark] = useState(true);

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
      <NavBar isDark={isDark} onToggleTheme={toggleTheme} />

      <main style={{ minHeight: '65vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer
        year={2026}
        studentName="Kavya Mrutiya"
        githubUrl="https://github.com/kavyamrutiya"
      />
    </div>
  );
}
