import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import IdeaLab from './components/IdeaLab';
import Schedule from './components/Schedule';
import Registration from './components/Registration';
import Footer from './components/Footer';

export default function App() {
  const [prefilledIdea, setPrefilledIdea] = useState('');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('iedc_theme') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('iedc_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'bright' : 'dark'));
  };

  const handleApplyIdea = (ideaText) => {
    setPrefilledIdea(ideaText);
    const registerEl = document.getElementById('register');
    if (registerEl) registerEl.scrollIntoView({ behavior: 'smooth' });
  };

  const handleApplyRole = (roleName) => {
    setPrefilledIdea((prev) => {
      const cleaned = prev.replace(/\s*\[Lead Builder Profile:.*?\]/g, '').trim();
      return cleaned
        ? `${cleaned} [Lead Builder Profile: ${roleName}]`
        : `Lead Builder Profile: ${roleName} — Ready to build a 24-hour prototype at CEC.`;
    });
    const registerEl = document.getElementById('register');
    if (registerEl) registerEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 bg-slate-950 text-slate-100 selection:bg-orange-500 selection:text-slate-950 ${
        theme === 'bright' ? 'bright-mode' : ''
      }`}
    >
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <IdeaLab onApplyIdea={handleApplyIdea} onApplyRole={handleApplyRole} />
        <Schedule />
        <Registration prefilledIdea={prefilledIdea} />
      </main>
      <Footer />
    </div>
  );
}