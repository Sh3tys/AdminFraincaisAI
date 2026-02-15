'use client';

import { useState, useEffect } from 'react';

export default function Header() {
  const [isDark, setIsDark] = useState(false);

  // Load theme preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    setIsDark(initialTheme === 'dark');
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <header className="header">
      <button className="theme-toggle" onClick={toggleTheme} title={isDark ? 'Mode clair' : 'Mode sombre'}>
        <span className="theme-toggle-icon">{isDark ? '◐' : '◑'}</span>
        <span>{isDark ? 'Clair' : 'Sombre'}</span>
      </button>
      
      <div className="header-content">
        <div className="logo">
          <h1 className="logo-text">Démarches Simplifiées</h1>
        </div>
        <p className="tagline">Assistant intelligent pour vos démarches administratives</p>
      </div>
    </header>
  );
}
