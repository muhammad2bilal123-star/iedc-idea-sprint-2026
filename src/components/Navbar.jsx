import React, { useState } from 'react';
import {
  Zap,
  Menu,
  X,
  ArrowUpRight,
  Sparkles,
  Calendar,
  Users,
  Sun,
  Moon,
} from 'lucide-react';

export default function Navbar({ theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navButtons = [
    { id: 'hero', name: 'Overview', icon: Zap },
    { id: 'idealab', name: 'Idea Lab', icon: Sparkles },
    { id: 'schedule', name: 'Schedule', icon: Calendar },
    { id: 'register', name: 'Registration', icon: Users },
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <nav
        aria-label="Main Navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
      >
        {/* Brand Logo Button */}
        <button
          type="button"
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-slate-950 shadow-lg shadow-orange-500/20 transition-transform group-hover:scale-105">
            <Zap className="h-5 w-5 fill-current" />
          </div>
          <div>
            <span className="block text-xs font-bold tracking-widest text-orange-400 uppercase">
              IEDC BOOTCAMP CEC
            </span>
            <span className="block text-base font-extrabold tracking-tight text-white">
              IDEA SPRINT <span className="text-slate-400">2026</span>
            </span>
          </div>
        </button>

        {/* Desktop Interactive Button Dock */}
        <div className="hidden md:flex md:items-center md:gap-2 rounded-2xl border border-slate-800 bg-slate-900/90 p-1.5 shadow-inner">
          {navButtons.map((btn) => {
            const Icon = btn.icon;
            const isActive = activeSection === btn.id;
            return (
              <button
                key={btn.id}
                type="button"
                onClick={() => scrollToSection(btn.id)}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-800 text-orange-400 border border-orange-500/40 shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white border border-transparent'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {btn.name}
              </button>
            );
          })}
        </div>

        {/* Right Controls: Theme Switcher Button + Claim Pass Button */}
        <div className="hidden md:flex md:items-center md:gap-3">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Switch between Dark and Bright mode"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-xs font-bold text-slate-200 hover:border-orange-400 cursor-pointer transition-all"
          >
            {theme === 'bright' ? (
              <>
                <Moon className="h-4 w-4 text-slate-700" />
                <span>Dark Mode</span>
              </>
            ) : (
              <>
                <Sun className="h-4 w-4 text-amber-400" />
                <span>Bright Mode</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('register')}
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider text-slate-950 shadow-md shadow-orange-500/20 transition-all hover:from-orange-400 hover:to-amber-400 cursor-pointer"
          >
            Claim Squad Pass
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        {/* Mobile Controls: Theme Button + Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="inline-flex items-center justify-center rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-slate-300 cursor-pointer"
          >
            {theme === 'bright' ? (
              <Moon className="h-5 w-5 text-slate-700" />
            ) : (
              <Sun className="h-5 w-5 text-amber-400" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
            className="inline-flex items-center justify-center rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Button Drawer */}
      {menuOpen && (
        <div className="border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-5 md:hidden">
          <div className="grid grid-cols-2 gap-2.5">
            {navButtons.map((btn) => {
              const Icon = btn.icon;
              const isActive = activeSection === btn.id;
              return (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => scrollToSection(btn.id)}
                  className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'border-orange-500/50 bg-orange-500/15 text-orange-300'
                      : 'border-slate-800 bg-slate-900 text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {btn.name}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => scrollToSection('register')}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-center text-xs font-extrabold uppercase tracking-wider text-slate-950 cursor-pointer"
          >
            Register Squad Now
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </header>
  );
}