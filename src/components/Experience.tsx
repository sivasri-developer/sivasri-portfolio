import React, { useState } from 'react';
import { TIMELINE, CERTIFICATIONS } from '../data/portfolioData';
import {
  GraduationCap,
  Briefcase,
  Award,
  CheckCircle2,
  Calendar,
  MapPin,
  ShieldCheck,
  Trophy,
  ArrowRight,
  Sparkles,
  Layers,
} from 'lucide-react';

interface ExperienceProps {
  onNavigate?: (page: string) => void;
}

export const Experience: React.FC<ExperienceProps> = ({ onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Internship' | 'Education'>('All');

  const internships = TIMELINE.filter((item) => item.type === 'Internship');
  const education = TIMELINE.filter((item) => item.type === 'Education');

  const displayTimeline = TIMELINE.filter((item) => {
    if (activeFilter === 'All') return true;
    return item.type === activeFilter;
  });

  return (
    <section id="experience" className="py-12 sm:py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bright-highlight-badge text-xs uppercase tracking-wider mb-3">
            <Briefcase className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />
            <span>Internships, Education & Certifications</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Experience & Credentials
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-700 dark:text-slate-200 font-medium">
            Industry internships in IoT Sensors and Data Analytics, academic qualifications in Computer Applications, and verified credentials.
          </p>
        </div>

        {/* Filter Selection Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveFilter('All')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all cursor-pointer ${
              activeFilter === 'All'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white dark:from-emerald-500 dark:to-teal-500 shadow-lg scale-105 border-2 border-emerald-400'
                : 'bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 hover:bg-emerald-100 dark:hover:bg-slate-700 border-2 border-emerald-200 dark:border-slate-700'
            }`}
          >
            All Timeline ({TIMELINE.length})
          </button>

          <button
            onClick={() => setActiveFilter('Internship')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all cursor-pointer ${
              activeFilter === 'Internship'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white dark:from-emerald-500 dark:to-teal-500 shadow-lg scale-105 border-2 border-emerald-400'
                : 'bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 hover:bg-emerald-100 dark:hover:bg-slate-700 border-2 border-emerald-200 dark:border-slate-700'
            }`}
          >
            💼 Internships Only ({internships.length})
          </button>

          <button
            onClick={() => setActiveFilter('Education')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all cursor-pointer ${
              activeFilter === 'Education'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white dark:from-emerald-500 dark:to-teal-500 shadow-lg scale-105 border-2 border-emerald-400'
                : 'bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 hover:bg-emerald-100 dark:hover:bg-slate-700 border-2 border-emerald-200 dark:border-slate-700'
            }`}
          >
            🎓 Education Only ({education.length})
          </button>
        </div>

        {/* Dual Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-12">
          
          {/* Left Column: Timeline List */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>
                {activeFilter === 'Internship'
                  ? 'Industry Internships'
                  : activeFilter === 'Education'
                  ? 'Academic Education'
                  : 'Internships & Education Journey'}
              </span>
            </h2>

            <div className="relative pl-6 sm:pl-8 border-l-4 border-emerald-400 dark:border-emerald-600 space-y-8">
              {displayTimeline.map((item) => (
                <div key={item.id} className="relative group">
                  {/* Node Bullet */}
                  <div className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-6 h-6 rounded-full bg-white dark:bg-slate-900 border-4 border-emerald-600 dark:border-emerald-400 group-hover:scale-125 transition-transform shadow-md" />

                  {/* Card Container */}
                  <div className="glass-card p-6 rounded-3xl border-2 border-emerald-300/80 dark:border-emerald-500/30 hover:border-emerald-500 transition-all hover:shadow-xl">
                    
                    {/* Role & Badge Header */}
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <span className={`text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-block mb-1 ${
                          item.type === 'Internship'
                            ? 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                            : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                        }`}>
                          {item.type}
                        </span>
                        <h3 className="text-lg font-black text-slate-900 dark:text-white">
                          {item.role}
                        </h3>
                      </div>

                      {item.achievementBadge && (
                        <span className="px-3.5 py-1 rounded-full text-xs font-black bg-emerald-200 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-200 border border-emerald-400">
                          {item.achievementBadge}
                        </span>
                      )}
                    </div>

                    {/* Organization & Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-xs font-extrabold text-slate-700 dark:text-slate-300 mb-4">
                      <span className="text-emerald-800 dark:text-emerald-300 font-black">{item.organization}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        {item.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        {item.location}
                      </span>
                    </div>

                    {/* Bullet Points */}
                    <ul className="space-y-2 mb-4 text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium">
                      {item.description.map((desc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Skills Used Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-emerald-200 dark:border-emerald-800">
                      {item.skillsUsed.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-md text-[11px] font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Certifications & Honors */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Verified Certifications</span>
            </h2>

            <div className="space-y-4">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.id}
                  className="glass-card p-5 rounded-2xl border-2 border-emerald-300/80 dark:border-emerald-500/30 hover:border-emerald-500 transition-all hover:shadow-xl"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shrink-0 shadow-md">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-900 dark:text-white">
                        {cert.title}
                      </h3>
                      <p className="text-xs font-bold text-slate-600 dark:text-slate-300">
                        {cert.issuer} • {cert.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-emerald-200 dark:border-emerald-800">
                    {cert.skills.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-0.5 rounded text-[11px] font-black bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Extra Distinction Showcase Card */}
            <div className="p-6 rounded-3xl bg-emerald-100/90 dark:bg-emerald-950/90 border-2 border-emerald-400 dark:border-emerald-600 shadow-xl">
              <h3 className="text-base font-black text-emerald-950 dark:text-emerald-100 mb-2 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span>Inter-College & Athletic Distinctions</span>
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-200 font-medium leading-relaxed mb-4">
                • <strong>District Gold Medalist in Taekwondo</strong> & State Level Participant.<br />
                • <strong>2nd Prize Winner</strong> in Inter-College Semantic Memory Competition.<br />
                • <strong>Completed 6 Hindi Certification Examinations</strong> demonstrating multilingual capability.
              </p>
              <div className="text-xs font-black text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Verified Credentials & Validated Records</span>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom CTA */}
        {onNavigate && (
          <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-emerald-100/80 dark:bg-emerald-950/80 border-2 border-emerald-300 dark:border-emerald-800">
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Ready to collaborate or discuss opportunities?
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                Reach out to Sivasri R for full-time software engineering roles and projects.
              </p>
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-black text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md cursor-pointer transition-all active:scale-95"
            >
              <span>Get In Touch</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
