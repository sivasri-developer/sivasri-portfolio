import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useProfilePhoto } from '../services/photoManager';
import {
  GraduationCap,
  Award,
  Code2,
  Sparkles,
  CheckCircle2,
  Trophy,
  BookOpen,
  MapPin,
  Briefcase,
  ShieldCheck,
  Languages,
  ArrowRight,
} from 'lucide-react';

interface AboutProps {
  onNavigate?: (page: string) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  const currentPhoto = useProfilePhoto();
  return (
    <section id="about" className="py-12 sm:py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bright-highlight-badge text-xs uppercase tracking-wider mb-3">
            <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />
            <span>Academic & Technical Background</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            About Sivasri R
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-700 dark:text-slate-200 font-medium">
            MCA Scholar at Holy Cross College with hands-on Java enterprise software development, database engineering, and academic excellence.
          </p>
        </div>

        {/* Narrative & Overview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Main Narrative Card */}
          <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl border-2 border-emerald-300/80 dark:border-emerald-500/30 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-emerald-400 dark:border-emerald-500 shadow-md bg-slate-900 shrink-0">
                    <img
                      src={currentPhoto}
                      alt="Sivasri R"
                      className="w-full h-full object-cover object-top"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = PERSONAL_INFO.photoFallback || 'https://github.com/sivasri-developer.png';
                      }}
                    />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                      <span>Professional Biography</span>
                      <Sparkles className="w-5 h-5 text-emerald-500" />
                    </h2>
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                      Sivasri R • MCA Graduate & Full Stack Engineer
                    </p>
                  </div>
                </div>

                <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                  {PERSONAL_INFO.availability}
                </span>
              </div>
              
              <p className="text-slate-700 dark:text-slate-200 text-sm sm:text-base leading-relaxed font-medium mb-6">
                {PERSONAL_INFO.fullBio}
              </p>

              {/* Core Engineering Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
                <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-slate-800/80 border border-emerald-200 dark:border-emerald-800">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-slate-900 dark:text-white mb-1.5">
                    <Code2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>MERN Stack</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                    MongoDB, Express.js, React, Node.js full-stack applications with accessible UI and RESTful APIs.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-slate-800/80 border border-emerald-200 dark:border-emerald-800">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-slate-900 dark:text-white mb-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>Java & Spring Boot</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                    OOP principles, Collections, Servlets/JSP, MVC design patterns, and enterprise logic.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-slate-800/80 border border-emerald-200 dark:border-emerald-800">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-slate-900 dark:text-white mb-1.5">
                    <BookOpen className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    <span>SQL & Databases</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                    Relational MySQL & Oracle design, ACID transactions, stored procedures, and joins.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Meta Footer */}
            <div className="pt-4 border-t border-emerald-200 dark:border-emerald-800 flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Location: <strong className="text-slate-900 dark:text-white">{PERSONAL_INFO.location}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Target Roles: <strong className="text-slate-900 dark:text-white">Software Engineer / Java Developer</strong></span>
              </div>
            </div>
          </div>

          {/* Right Column: Achievements & Distinctions Card */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Honors & Accolades Card */}
            <div className="glass-card p-6 sm:p-7 rounded-3xl border-2 border-emerald-300/80 dark:border-emerald-500/30">
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span>Honors & Extracurriculars</span>
              </h3>

              <div className="space-y-3.5">
                {PERSONAL_INFO.achievements.map((ach, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800"
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm mt-0.5">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-900 dark:text-white">
                          {ach.title}
                        </h4>
                        <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 mb-0.5">
                          {ach.event}
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                          {ach.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Language & Cultural Proficiency Card */}
            <div className="glass-card p-6 rounded-3xl border-2 border-emerald-300/80 dark:border-emerald-500/30">
              <h3 className="text-base font-black text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <Languages className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <span>Multilingual Capabilities</span>
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed mb-3">
                Completed <strong>6 official Hindi certification examinations</strong> via DBHP Sabha, paired with fluent English and Tamil communication.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-lg text-xs font-black bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800">
                  English (Professional)
                </span>
                <span className="px-3 py-1 rounded-lg text-xs font-black bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800">
                  Tamil (Native)
                </span>
                <span className="px-3 py-1 rounded-lg text-xs font-black bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800">
                  Hindi (6 Certifications)
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Academic Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl glass-card text-center border-2 border-emerald-300/80 dark:border-emerald-500/30 transform hover:-translate-y-1 transition-all"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-emerald-700 dark:text-emerald-300 mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-200">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Page Transition Banner */}
        {onNavigate && (
          <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-emerald-100/80 dark:bg-emerald-950/80 border-2 border-emerald-300 dark:border-emerald-800">
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Interested in technical capabilities?
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                Explore programming languages, databases, framework proficiencies, and tools.
              </p>
            </div>
            <button
              onClick={() => onNavigate('skills')}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-black text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md cursor-pointer transition-all active:scale-95"
            >
              <span>View Technical Skills</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
