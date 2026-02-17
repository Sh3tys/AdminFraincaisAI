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
    <header className="nav-header">
      <div className="brand">
        <span className="brand-icon">✦</span>
        <h1 className="brand-name">AdminFrançais AI</h1>
      </div>
      
      <button className="theme-toggle" onClick={toggleTheme} style={{opacity: 0.7}}>
        <span className="theme-toggle-icon">{isDark ? '✺' : '✹'}</span>
        <span>{isDark ? 'Matrix' : 'Neon'}</span>
      </button>
    </header>
  );
}
