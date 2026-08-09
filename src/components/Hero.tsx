import React from 'react';
import {
  Code2,
  Terminal,
  Lightbulb,
  FileText,
  ChevronRight,
  Sparkles,
  Award,
  GraduationCap,
  Database,
  ExternalLink,
  Phone,
  Mail,
  Trophy,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden min-h-[90vh] flex items-center z-10"
    >
      {/* Background Soft Glow Radial Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-400/20 dark:bg-emerald-600/20 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-teal-300/25 dark:bg-teal-700/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Main Info */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            
            {/* Bright Highlight Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bright-highlight-badge text-xs sm:text-sm mb-6 shadow-md transition-transform hover:scale-105"
              id="hero-status-badge"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block" />
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />
              <span className="tracking-wide font-extrabold uppercase">{PERSONAL_INFO.badge}</span>
            </div>

            {/* Hero Main Bold & Bright Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
              Hi, I'm{' '}
              <span className="bold-bright-gradient-text drop-shadow-sm">
                {PERSONAL_INFO.name}
              </span>
            </h1>

            {/* Subtitle / Role Tag */}
            <h2 className="text-xl sm:text-2xl font-bold text-emerald-700 dark:text-emerald-300 mb-4 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{PERSONAL_INFO.subtitle}</span>
            </h2>

            {/* Description Bio */}
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 max-w-2xl font-medium leading-relaxed mb-8">
              {PERSONAL_INFO.bio}
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10" id="hero-actions">
              <a
                href="#projects"
                onClick={handleScrollToProjects}
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm sm:text-base font-extrabold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 dark:from-emerald-500 dark:to-teal-500 rounded-full shadow-lg hover:shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer active:scale-95"
                id="hero-view-projects-btn"
              >
                <span>View My Projects</span>
                <ChevronRight className="w-5 h-5" />
              </a>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm sm:text-base font-extrabold text-emerald-800 dark:text-emerald-200 bg-emerald-100/90 dark:bg-emerald-950/80 hover:bg-emerald-200 dark:hover:bg-emerald-900/90 rounded-full border-2 border-emerald-400/80 dark:border-emerald-500/80 shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer active:scale-95"
                id="hero-download-resume-btn"
              >
                <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-300" />
                <span>View Resume Details</span>
              </button>
            </div>

            {/* Quick Contact Line */}
            <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-slate-800 dark:text-slate-200 bg-white/70 dark:bg-slate-900/70 p-3.5 rounded-2xl border border-emerald-200 dark:border-emerald-800/80 shadow-xs mb-8">
              <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 hover:underline">
                <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
              <a href={`tel:${PERSONAL_INFO.phone}`} className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 hover:underline">
                <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{PERSONAL_INFO.phone}</span>
              </a>
            </div>

            {/* Horizontal Line Divider */}
            <div className="w-full max-w-xl h-0.5 bg-gradient-to-r from-emerald-300 via-teal-200 to-transparent dark:from-emerald-800 dark:via-teal-900 dark:to-transparent mb-8" />

            {/* Bottom Key Capability Tags */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-100">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                <Code2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Java & Spring Boot</span>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-100/80 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
                <Database className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>SQL / MySQL / Oracle</span>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-100/80 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                <Trophy className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Taekwondo Gold Medalist</span>
              </div>
            </div>

          </div>

          {/* Right Floating Display Cards Stack */}
          <div className="lg:col-span-5 relative min-h-[400px] sm:min-h-[460px] flex items-center justify-center">
            
            {/* Background Soft Emerald Glow Circle */}
            <div className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-emerald-300/30 dark:bg-emerald-500/20 blur-3xl" />

            {/* Floating Card 1: Education & CGPA Highlights */}
            <div
              className="absolute top-0 right-2 sm:right-4 w-[280px] sm:w-[320px] p-5 rounded-2xl glass-card border-2 border-emerald-400/60 dark:border-emerald-500/40 shadow-2xl animate-float transition-all hover:scale-105 z-20 cursor-pointer"
              id="hero-card-1"
            >
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300 block mb-0.5">
                    Academic Record
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    MCA: 8.00 / 10 CGPA
                  </h3>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-1">
                    BCA: 8.67 / 10 CGPA (J.J College)
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Card 2: Primary Tech - Java & SQL Web Systems */}
            <div
              className="absolute top-[140px] sm:top-[150px] left-0 sm:-left-4 w-[290px] sm:w-[330px] p-5 rounded-2xl glass-card border-2 border-teal-400/60 dark:border-teal-500/40 shadow-2xl animate-float-delayed transition-all hover:scale-105 z-30 cursor-pointer"
              id="hero-card-2"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-teal-500 text-white flex items-center justify-center shadow-md shrink-0">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-teal-700 dark:text-teal-300 block">
                    Core Specialization
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                    Java, JSP & MySQL
                  </h3>
                </div>
              </div>
              <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                Online Garment Shop Management System & RS App Hub Platform
              </p>
            </div>

            {/* Floating Card 3: Key Honors & Achievements */}
            <div
              className="absolute top-[280px] sm:top-[300px] right-0 sm:right-2 w-[280px] sm:w-[320px] p-5 rounded-2xl glass-card border-2 border-amber-400/60 dark:border-amber-500/40 shadow-2xl animate-float-slow transition-all hover:scale-105 z-20 cursor-pointer"
              id="hero-card-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-300 block mb-0.5">
                    Honors & Distinction
                  </span>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    District Gold Medalist
                  </h3>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-1">
                    2nd Prize Semantic Memory • 6 Hindi Certs
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
