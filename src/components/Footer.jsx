import React from 'react';
import { Zap, Mail, MapPin, Globe, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-800/80">
          {/* Column 1: Brand Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-slate-950 shadow-md shadow-orange-500/20">
                <Zap className="h-4 w-4 fill-current" />
              </div>
              <span className="font-extrabold text-white tracking-tight">
                IEDC BOOTCAMP CEC
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Innovation and Entrepreneurship Development Cell, College of Engineering Chengannur,
              Alappuzha, Kerala 689121.
            </p>
          </div>

          {/* Column 2: Contact Details */}
          <div className="space-y-2.5 text-xs sm:text-sm">
            <h3 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
              Contact &amp; Headquarters
            </h3>
            <p className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
              <span>IEDC Room, College of Engineering Chengannur</span>
            </p>
            <p className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
              <a
                href="mailto:iedc@ceconline.edu"
                className="hover:text-white transition-colors"
              >
                iedc@ceconline.edu
              </a>
            </p>
            <p className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
              <a
                href="https://iedcbootcampcec.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                iedcbootcampcec.org
              </a>
            </p>
          </div>

          {/* Column 3: Official Instagram & LinkedIn Icon Links */}
          <div className="space-y-3">
            <h3 className="font-bold text-white uppercase tracking-wider text-xs">
              Official Social Channels
            </h3>
            <p className="text-xs text-slate-400">
              Tap an icon below to visit our official pages:
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {/* Official Instagram Icon Link */}
              <a
                href="https://www.instagram.com/iedcbootcampcec?srtk=bTBlaXk1NHZqa3U1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Official IEDC BOOTCAMP CEC Instagram"
                title="Official IEDC BOOTCAMP CEC Instagram"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-xs font-bold text-slate-200 transition-all hover:border-pink-500/60 hover:bg-pink-500/10 hover:text-white shadow-sm"
              >
                <svg
                  className="w-4 h-4 fill-current text-pink-400"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span>Instagram</span>
              </a>

              {/* Official LinkedIn Icon Link */}
              <a
                href="https://www.linkedin.com/company/iedc-bootcamp-cec/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Official IEDC BOOTCAMP CEC LinkedIn"
                title="Official IEDC BOOTCAMP CEC LinkedIn"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-xs font-bold text-slate-200 transition-all hover:border-cyan-400/60 hover:bg-cyan-500/10 hover:text-white shadow-sm"
              >
                <svg
                  className="w-4 h-4 fill-current text-cyan-400"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
                <span>LinkedIn</span>
              </a>

              {/* Scroll To Top Button */}
              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Scroll back to top"
                className="ml-auto inline-flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2.5 text-xs font-bold text-slate-300 hover:border-orange-500/50 hover:text-white cursor-pointer transition-all"
              >
                <span>Top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© 2026 IEDC BOOTCAMP CEC. Built for Web Manager Selection Task 1.</p>
          <p className="font-mono text-emerald-400">
            STATUS // ALL SYSTEMS OPERATIONAL
          </p>
        </div>
      </div>
    </footer>
  );
}