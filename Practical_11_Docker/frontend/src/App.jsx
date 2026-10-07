import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import { getStoredUser, removeStoredToken } from './api/api';

// Route-level code splitting using React.lazy()
// Chunks are loaded on-demand only when user navigates to the route
const Home = lazy(() => import('./pages/Home'));
const Tasks = lazy(() => import('./pages/Tasks'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

/**
 * Route Loading Fallback Component
 * Renders during dynamic chunk fetching under Suspense
 */
function RouteFallback() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '55vh',
      gap: '1rem'
    }}>
      <div style={{
        width: '44px',
        height: '44px',
        border: '3px solid rgba(6, 182, 212, 0.2)',
        borderTop: '3px solid var(--accent-cyan)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
      <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontFamily: 'var(--font-mono)' }}>
        ⚡ Loading route chunk via React.lazy()...
      </span>
    </div>
  );
}

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

      {/* Suspense wrapper with meaningful fallback UI */}
      <main style={{ minHeight: '65vh' }}>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<Tasks user={user} onRequireLogin={() => setAuthModalOpen(true)} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
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
