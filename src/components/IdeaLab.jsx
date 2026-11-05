import React, { useState } from 'react';
import {
  Sparkles,
  Shuffle,
  Lock,
  Unlock,
  CheckCircle2,
  RefreshCw,
  ArrowRight,
  Compass,
} from 'lucide-react';
import {
  IDEA_DOMAINS,
  IDEA_TECHS,
  IDEA_CHALLENGES,
  ROLE_QUIZ,
  ROLE_DETAILS,
} from '../data/eventData';

export default function IdeaLab({ onApplyIdea, onApplyRole }) {
  const [activeTab, setActiveTab] = useState('generator'); // 'generator' | 'quiz'

  // Idea Generator State
  const [domainIdx, setDomainIdx] = useState(0);
  const [techIdx, setTechIdx] = useState(0);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [locked, setLocked] = useState({ domain: false, tech: false, challenge: false });

  // Role Quiz State
  const [answers, setAnswers] = useState({});
  const [calculatedRole, setCalculatedRole] = useState(null);

  const currentDomain = IDEA_DOMAINS[domainIdx];
  const currentTech = IDEA_TECHS[techIdx];
  const currentChallenge = IDEA_CHALLENGES[challengeIdx];

  const generatedPitch = `Build a ${currentDomain.label} solution powered by ${currentTech.label} (${currentTech.stack}) ${currentChallenge.label}.`;

  const spinReels = () => {
    if (!locked.domain) {
      setDomainIdx(Math.floor(Math.random() * IDEA_DOMAINS.length));
    }
    if (!locked.tech) {
      setTechIdx(Math.floor(Math.random() * IDEA_TECHS.length));
    }
    if (!locked.challenge) {
      setChallengeIdx(Math.floor(Math.random() * IDEA_CHALLENGES.length));
    }
  };

  const toggleLock = (key) => {
    setLocked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleQuizSelect = (qIndex, role) => {
    const updated = { ...answers, [qIndex]: role };
    setAnswers(updated);

    if (Object.keys(updated).length === ROLE_QUIZ.length) {
      const counts = { Hacker: 0, Hipster: 0, Hustler: 0 };
      Object.values(updated).forEach((r) => {
        counts[r] = (counts[r] || 0) + 1;
      });
      const winner = Object.keys(counts).reduce((a, b) => (counts[a] >= counts[b] ? a : b));
      setCalculatedRole(winner);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setCalculatedRole(null);
  };

  return (
    <section
      id="idealab"
      aria-labelledby="idealab-heading"
      className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
            Interactive Builder Playground
          </span>
          <h2 id="idealab-heading" className="mt-1 text-3xl sm:text-4xl font-black text-white">
            Volt&apos;s Idea Matrix &amp; Role Matcher
          </h2>
          <p className="mt-2 text-slate-400 max-w-2xl text-sm sm:text-base">
            Stuck without a startup statement or unsure of your squad role? Spin a problem statement
            or take the 3-step builder quiz, then send your result straight to your registration form.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="inline-flex rounded-xl border border-slate-800 bg-slate-900 p-1 self-start">
          <button
            type="button"
            onClick={() => setActiveTab('generator')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'generator'
                ? 'bg-orange-500 text-slate-950 shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            1. Idea Generator
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'quiz'
                ? 'bg-cyan-400 text-slate-950 shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Compass className="w-4 h-4" />
            2. Team Role Quiz
          </button>
        </div>
      </div>

      {activeTab === 'generator' ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Reel 1: Domain */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
                  01 // Problem Domain
                </span>
                <button
                  type="button"
                  onClick={() => toggleLock('domain')}
                  aria-label="Lock or unlock domain"
                  className="text-slate-400 hover:text-white p-1"
                >
                  {locked.domain ? (
                    <Lock className="w-4 h-4 text-orange-400" />
                  ) : (
                    <Unlock className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-lg font-extrabold text-white">{currentDomain.label}</p>
              <span className="mt-3 inline-block self-start rounded-md bg-slate-900 px-2.5 py-1 text-xs font-medium text-slate-300 border border-slate-800">
                Track: {currentDomain.tag}
              </span>
            </div>

            {/* Reel 2: Technology */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  02 // Core Enabler
                </span>
                <button
                  type="button"
                  onClick={() => toggleLock('tech')}
                  aria-label="Lock or unlock core technology"
                  className="text-slate-400 hover:text-white p-1"
                >
                  {locked.tech ? (
                    <Lock className="w-4 h-4 text-cyan-400" />
                  ) : (
                    <Unlock className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-lg font-extrabold text-white">{currentTech.label}</p>
              <span className="mt-3 inline-block self-start rounded-md bg-slate-900 px-2.5 py-1 text-xs font-mono text-cyan-300 border border-slate-800">
                {currentTech.stack}
              </span>
            </div>

            {/* Reel 3: Target Challenge */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  03 // Target Impact
                </span>
                <button
                  type="button"
                  onClick={() => toggleLock('challenge')}
                  aria-label="Lock or unlock target impact"
                  className="text-slate-400 hover:text-white p-1"
                >
                  {locked.challenge ? (
                    <Lock className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Unlock className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-lg font-extrabold text-white">{currentChallenge.label}</p>
              <span className="mt-3 inline-block self-start rounded-md bg-slate-900 px-2.5 py-1 text-xs font-medium text-emerald-300 border border-slate-800">
                Goal: {currentChallenge.metric}
              </span>
            </div>
          </div>

          {/* Generated Statement Output */}
          <div className="rounded-2xl border border-orange-500/30 bg-slate-950 p-5 sm:p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-orange-400">
                Synthesized Sprint Statement
              </span>
              <p className="mt-1 text-base sm:text-lg font-bold text-white">{generatedPitch}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0 w-full lg:w-auto">
              <button
                type="button"
                onClick={spinReels}
                className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:border-orange-400"
              >
                <Shuffle className="w-4 h-4 text-orange-400" />
                Spin New Idea
              </button>
              <button
                type="button"
                onClick={() => onApplyIdea(generatedPitch)}
                className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-extrabold text-slate-950 hover:bg-orange-400"
              >
                Use in Registration
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {ROLE_QUIZ.map((item, qIdx) => (
              <div
                key={qIdx}
                className="rounded-2xl border border-slate-800 bg-slate-950 p-5 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono uppercase text-cyan-400">
                    Question 0{qIdx + 1}
                  </span>
                  <h3 className="mt-1 text-base font-bold text-white mb-4">{item.question}</h3>
                </div>
                <div className="space-y-2.5">
                  {item.options.map((opt) => {
                    const selected = answers[qIdx] === opt.role;
                    return (
                      <button
                        key={opt.role}
                        type="button"
                        onClick={() => handleQuizSelect(qIdx, opt.role)}
                        className={`w-full text-left rounded-xl border p-3 text-xs sm:text-sm transition-all ${
                          selected
                            ? 'border-cyan-400 bg-cyan-500/15 text-white font-semibold'
                            : 'border-slate-800 bg-slate-900/70 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {opt.text}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {calculatedRole && (
            <div className="rounded-2xl border border-cyan-500/40 bg-slate-950 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-cyan-400">
                  <CheckCircle2 className="w-4 h-4" />
                  {ROLE_DETAILS[calculatedRole].badge}
                </span>
                <h4 className="mt-1 text-xl font-black text-white">
                  {ROLE_DETAILS[calculatedRole].title}
                </h4>
                <p className="mt-1 text-sm text-slate-300 max-w-2xl">
                  {ROLE_DETAILS[calculatedRole].description}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={resetQuiz}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs font-bold text-slate-300 hover:text-white"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => onApplyRole(calculatedRole)}
                  className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-2.5 text-xs sm:text-sm font-extrabold text-slate-950 hover:bg-cyan-300"
                >
                  Apply Role to Form
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}