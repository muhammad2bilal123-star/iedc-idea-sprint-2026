import React, { useState, useEffect } from 'react';
import { Flame, Calendar, MapPin, Users, ArrowRight, Sparkles, Clock } from 'lucide-react';

export default function Hero() {
  // Target event start: November 14, 2026 at 09:00 AM IST
  const targetDate = new Date('2026-11-14T09:00:00+05:30').getTime();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = Math.max(0, targetDate - now);
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Left Column: Event Identity & CTAs */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-300 text-xs font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping" />
            <span>24-HOUR FLAGSHIP STUDENT IDEATHON • CEC CHENGANNUR</span>
          </div>

          <h1
            id="hero-heading"
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none text-white"
          >
            IEDC IDEA{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-cyan-400">
              SPRINT 2026
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl leading-relaxed">
            <strong className="text-white">Ideate. Validate. Pitch in 24 Hours.</strong> Hosted by{' '}
            <span className="text-orange-400 font-semibold">IEDC BOOTCAMP CEC</span> at College of
            Engineering Chengannur. Team up with hackers, hipsters, and hustlers to transform
            campus and regional problems into investor-ready prototypes.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
            <a
              href="#register"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-4 text-base font-extrabold text-slate-950 shadow-lg shadow-orange-500/25 transition-all hover:from-orange-400 hover:to-amber-400"
            >
              Register Your Squad
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#idealab"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-4 text-base font-bold text-slate-200 transition-all hover:border-cyan-400/50 hover:text-cyan-300"
            >
              <Sparkles className="w-5 h-5 text-cyan-400" />
              Try Idea Generator
            </a>
          </div>

          {/* Quick Metadata Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2.5 bg-slate-900/60 border border-slate-800/80 rounded-xl p-3">
              <Calendar className="w-4 h-4 text-orange-400 shrink-0" />
              <span>Nov 14–15, 2026 (24 Hrs)</span>
            </div>
            <div className="flex items-center gap-2.5 bg-slate-900/60 border border-slate-800/80 rounded-xl p-3">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>CEC Campus, Chengannur</span>
            </div>
            <div className="flex items-center gap-2.5 bg-slate-900/60 border border-slate-800/80 rounded-xl p-3">
              <Users className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>2–4 Builders / Squad</span>
            </div>
          </div>
        </div>

        {/* Right Column: Live Countdown Card */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
                  Live Sprint Countdown
                </span>
              </div>
              <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
                Spots Open
              </span>
            </div>

            <div
              role="timer"
              aria-live="polite"
              className="grid grid-cols-4 gap-2.5 sm:gap-3 text-center"
            >
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds },
              ].map((unit) => (
                <div
                  key={unit.label}
                  className="rounded-2xl border border-slate-800 bg-slate-950 p-3 sm:p-4"
                >
                  <span className="block font-mono text-2xl sm:text-4xl font-black text-white">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                  <span className="mt-1 block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Prize & Highlights Box */}
            <div className="mt-6 space-y-3 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-orange-300 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-orange-400" />
                  Pre-Incubation Pool
                </span>
                <span className="text-lg font-black text-white">₹50,000 + KSUM Fast-Track</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Top 3 squads receive direct seed prototyping support from IEDC BOOTCAMP CEC,
                24/7 FabLab access, and 1-on-1 founder mentorship.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}