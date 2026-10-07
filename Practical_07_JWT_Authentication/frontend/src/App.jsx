import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { getStoredUser, removeStoredToken } from './api/api';

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [user, setUser] = useState(getStoredUser());
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
    }
  }, [isDark]);

  // Listen for 401 Unauthorized event dispatched by api.js
  useEffect(() => {
    const handleUnauthorized = () => {
      setUser(null);
      setAuthModalOpen(true);
    };
    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, []);

  const handleLogout = () => {
    removeStoredToken();
    setUser(null);
  };

  return (
    <div className="portfolio-container">
      <NavBar
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
        user={user}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      <main style={{ minHeight: '65vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks user={user} onRequireLogin={() => setAuthModalOpen(true)} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer
        year={2026}
        studentName="Kavya Mrutiya"
        githubUrl="https://github.com/kavyamrutiya"
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={(u) => setUser(u)}
      />
    </div>
  );
}
