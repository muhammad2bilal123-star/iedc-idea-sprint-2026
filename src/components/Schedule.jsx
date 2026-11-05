import React, { useState } from 'react';
import { Calendar, Clock, MapPin, CheckSquare, Square } from 'lucide-react';
import { SCHEDULE_DATA } from '../data/eventData';

export default function Schedule() {
  const [activeDay, setActiveDay] = useState('day1');
  const [completedMilestones, setCompletedMilestones] = useState({});

  const toggleMilestone = (id) => {
    setCompletedMilestones((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const currentItems = SCHEDULE_DATA[activeDay];

  return (
    <section
      id="schedule"
      aria-labelledby="schedule-heading"
      className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-orange-400">
            24-Hour Execution Roadmap
          </span>
          <h2 id="schedule-heading" className="mt-1 text-3xl sm:text-4xl font-black text-white">
            Event Schedule: Day 1 &amp; Day 2
          </h2>
          <p className="mt-2 text-slate-400 max-w-2xl text-sm sm:text-base">
            Track every milestone from check-in on November 14 to the final jury pitch on November 15.
            Check off deliverables as you plan your sprint.
          </p>
        </div>

        {/* Day Switcher Tabs */}
        <div className="inline-flex rounded-xl border border-slate-800 bg-slate-900 p-1 self-start">
          <button
            type="button"
            onClick={() => setActiveDay('day1')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs sm:text-sm font-bold transition-all ${
              activeDay === 'day1'
                ? 'bg-orange-500 text-slate-950 shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Day 1 • Nov 14 (Ideate)
          </button>
          <button
            type="button"
            onClick={() => setActiveDay('day2')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs sm:text-sm font-bold transition-all ${
              activeDay === 'day2'
                ? 'bg-orange-500 text-slate-950 shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Day 2 • Nov 15 (Pitch)
          </button>
        </div>
      </div>

      {/* Timeline List */}
      <div className="space-y-4">
        {currentItems.map((item, idx) => {
          const isChecked = !!completedMilestones[item.id];
          return (
            <div
              key={item.id}
              className={`rounded-2xl border p-5 sm:p-6 transition-all ${
                isChecked
                  ? 'border-emerald-500/40 bg-emerald-950/10'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {item.time}
                    </span>
                    <span className="text-xs font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-md">
                      {item.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {item.venue}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    0{idx + 1}. {item.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">{item.details}</p>
                </div>

                {/* Deliverable Checkbox */}
                <button
                  type="button"
                  onClick={() => toggleMilestone(item.id)}
                  className={`inline-flex items-center gap-2.5 self-start lg:self-center shrink-0 rounded-xl border px-4 py-2.5 text-xs font-bold transition-all ${
                    isChecked
                      ? 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300'
                      : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-500" />
                  )}
                  <span>Goal: {item.deliverable}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}