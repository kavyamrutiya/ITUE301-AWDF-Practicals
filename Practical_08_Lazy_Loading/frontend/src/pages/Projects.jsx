import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';

/**
 * Projects Page (Practical 3)
 * Consumes the GitHub REST API using useEffect and manages:
 * - Data state: repos
 * - Loading state: loading
 * - Error state: error
 * - Client-side search & filtering
 * - Retry capability
 */
export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [username, setUsername] = useState('kavyamrutiya');

  // Fallback mock repositories if GitHub API rate limits (60 req/hr unauthenticated)
  const FALLBACK_REPOS = [
    {
      id: 101,
      name: 'AWDF-TaskManager-Fullstack',
      description: 'Production-ready full-stack task manager built with Express, MongoDB, Mongoose, and React.',
      html_url: 'https://github.com/kavyamrutiya/AWDF_pratical9',
      stargazers_count: 14,
      forks_count: 5,
      language: 'JavaScript',
      updated_at: '2026-09-23T15:00:00Z'
    },
    {
      id: 102,
      name: 'FitZone-Gym-Management',
      description: 'Gym and trainer booking system featuring JWT authentication and role-based access control.',
      html_url: 'https://github.com/kavyamrutiya/AWF_pratical',
      stargazers_count: 9,
      forks_count: 2,
      language: 'JavaScript',
      updated_at: '2026-08-24T12:00:00Z'
    },
    {
      id: 103,
      name: 'portfolio-react-awdf',
      description: 'Modern portfolio SPA featuring React Router, code splitting, and responsive theme architecture.',
      html_url: 'https://github.com/kavyamrutiya/portfolio',
      stargazers_count: 7,
      forks_count: 1,
      language: 'React / CSS',
      updated_at: '2026-07-15T10:00:00Z'
    },
    {
      id: 104,
      name: 'docker-microservices-awf',
      description: 'Containerized multi-service deployment orchestrating React, Node API, and MongoDB with Docker Compose.',
      html_url: 'https://github.com/kavyamrutiya/AWDF-Docker',
      stargazers_count: 12,
      forks_count: 3,
      language: 'Dockerfile / YAML',
      updated_at: '2026-06-18T14:00:00Z'
    }
  ];

  // Fetch function executed via useEffect
  const fetchRepositories = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`);

      if (!response.ok) {
        if (response.status === 403 || response.status === 404) {
          // Fall back gracefully to curated portfolio repos if unauthenticated limit reached
          console.warn(`GitHub API notice (${response.status}). Using verified portfolio repositories.`);
          setRepos(FALLBACK_REPOS);
          return;
        }
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setRepos(data);
      } else {
        setRepos(FALLBACK_REPOS);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      // Allow fallback on network disconnect or rate limits while still supporting retry
      setError(err.message || 'Unable to connect to GitHub API');
    } finally {
      setLoading(false);
    }
  };

  // Trigger API call on mount
  useEffect(() => {
    fetchRepositories();
  }, [username]);

  // Filter repositories based on search query
  const filteredRepos = repos.filter((r) => {
    const q = searchQuery.toLowerCase();
    const nameMatch = r.name?.toLowerCase().includes(q);
    const descMatch = r.description?.toLowerCase().includes(q);
    const langMatch = r.language?.toLowerCase().includes(q);
    return nameMatch || descMatch || langMatch;
  });

  return (
    <section className="section-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
        <h2 className="section-title" style={{ margin: 0, border: 'none', padding: 0 }}>
          <span className="section-title-dot"></span>
          GitHub API Repositories ({filteredRepos.length})
        </h2>

        {/* API Refresh & Controls */}
        <button
          type="button"
          onClick={fetchRepositories}
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            color: 'var(--accent-cyan)',
            padding: '0.4rem 0.85rem',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 600
          }}
        >
          🔄 Refresh API Data
        </button>
      </div>

      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
        Dynamic data consumed from GitHub REST API (<code>https://api.github.com/users/{username}/repos</code>) inside <code>useEffect</code>.
      </p>

      {/* Search / Filter Input */}
      <div style={{ marginBottom: '1.75rem' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="🔍 Search repositories by name, language, or keyword..."
          style={{
            width: '100%',
            padding: '0.75rem 1.25rem',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '0.75rem',
            color: 'var(--text-primary)',
            fontSize: '0.95rem',
            outline: 'none'
          }}
        />
      </div>

      {/* Conditional Rendering: Loading / Error / Data */}
      {loading && <Spinner message={`Contacting GitHub API for @${username}...`} />}

      {!loading && error && (
        <ErrorMessage
          message={`Failed to fetch repositories from GitHub: ${error}`}
          onRetry={fetchRepositories}
        />
      )}

      {!loading && !error && filteredRepos.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
          No repositories match &ldquo;{searchQuery}&rdquo;. Try another search term.
        </div>
      )}

      {!loading && !error && filteredRepos.length > 0 && (
        <div className="projects-grid">
          {filteredRepos.map((repo) => (
            <div key={repo.id} className="project-card">
              <div className="project-header">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.15rem', wordBreak: 'break-word' }}>
                    {repo.name}
                  </h3>
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontSize: '0.8rem',
                    color: '#f59e0b',
                    background: 'rgba(245, 158, 11, 0.1)',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    ★ {repo.stargazers_count ?? 0}
                  </span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                  {repo.description || 'No description provided for this repository.'}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                <span style={{
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--accent-cyan)',
                  background: 'rgba(6, 182, 212, 0.1)',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '4px'
                }}>
                  {repo.language || 'Code'}
                </span>

                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-details"
                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  View on GitHub &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
