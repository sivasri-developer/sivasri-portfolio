import React from 'react';
import {
  Code2,
  Terminal,
  FileText,
  ChevronRight,
  Sparkles,
  Award,
  GraduationCap,
  Database,
  Phone,
  Mail,
  Trophy,
  Briefcase,
  ArrowRight,
  ShieldCheck,
  FolderGit2,
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, TIMELINE } from '../data/portfolioData';
import { useProfilePhoto } from '../services/photoManager';

interface HeroProps {
  onOpenResume: () => void;
  onNavigate: (page: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume, onNavigate }) => {
  const internships = TIMELINE.filter((t) => t.type === 'Internship');
  const currentPhoto = useProfilePhoto();

  return (
    <div className="relative py-8 sm:py-12 z-10">
      {/* Hero Section */}
      <section className="relative min-h-[75vh] flex items-center mb-16">
        {/* Background Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-400/20 dark:bg-emerald-600/20 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-teal-300/25 dark:bg-teal-700/20 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
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
              <div className="flex flex-wrap items-center gap-4 mb-8" id="hero-actions">
                <button
                  onClick={() => onNavigate('projects')}
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm sm:text-base font-extrabold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 dark:from-emerald-500 dark:to-teal-500 rounded-full shadow-lg hover:shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer active:scale-95"
                  id="hero-view-projects-btn"
                >
                  <FolderGit2 className="w-5 h-5" />
                  <span>Explore Projects</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('experience')}
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm sm:text-base font-extrabold text-emerald-900 dark:text-emerald-100 bg-emerald-100/90 dark:bg-emerald-950/80 hover:bg-emerald-200 dark:hover:bg-emerald-900 rounded-full border-2 border-emerald-400/80 dark:border-emerald-500/80 shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer active:scale-95"
                  id="hero-view-internships-btn"
                >
                  <Briefcase className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span>View Internships</span>
                </button>

                <button
                  onClick={onOpenResume}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm sm:text-base font-extrabold text-slate-800 dark:text-slate-200 bg-white/90 dark:bg-slate-800/90 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full border-2 border-emerald-300 dark:border-slate-700 shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer active:scale-95"
                  id="hero-download-resume-btn"
                >
                  <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-300" />
                  <span>Resume Details</span>
                </button>
              </div>

              {/* Quick Contact Line */}
              <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-slate-800 dark:text-slate-200 bg-white/80 dark:bg-slate-900/80 p-3.5 rounded-2xl border border-emerald-200 dark:border-emerald-800 shadow-xs mb-8">
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

              {/* Key Highlights Tags */}
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-100">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-100/80 dark:bg-teal-950/80 text-teal-900 dark:text-teal-300 border border-teal-300 dark:border-teal-800">
                  <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>MERN Full Stack</span>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  <Code2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Java Enterprise & Spring Boot</span>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-100/80 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
                  <Database className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>SQL Relational Databases</span>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-100/80 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                  <Trophy className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>District Gold (Taekwondo)</span>
                </div>
              </div>

            </div>

            {/* Right Profile Photo & Highlights Showcase */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end z-10">
              
              {/* Themed Portrait Card */}
              <div className="relative group w-full max-w-[320px] sm:max-w-[360px]">
                
                {/* Ambient Glowing Backdrop */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-emerald-500/30 via-teal-500/25 to-emerald-600/35 rounded-[32px] blur-xl opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />
                
                {/* Main Glass Photo Frame */}
                <div className="relative rounded-[28px] p-2 sm:p-2.5 bg-gradient-to-b from-white/90 via-emerald-50/70 to-teal-100/60 dark:from-slate-800/90 dark:via-emerald-950/40 dark:to-slate-900/90 backdrop-blur-xl border-2 border-emerald-300/80 dark:border-emerald-500/40 shadow-2xl overflow-hidden">
                  
                  {/* Photo Container */}
                  <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-[3/4] max-h-[420px] shadow-inner group/photo">
                    <img
                      src={currentPhoto}
                      alt="Sivasri R - Software Developer"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/photo:scale-105"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = PERSONAL_INFO.photoFallback || 'https://github.com/sivasri-developer.png';
                      }}
                    />
                    
                    {/* Subtle Gradient & Identification Overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent flex flex-col justify-end p-4">
                      <div className="flex items-center gap-1.5 text-xs font-black text-emerald-300 uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Software Developer</span>
                      </div>
                      <p className="text-base font-black text-white drop-shadow-md">
                        Sivasri R, MCA
                      </p>
                      <p className="text-[11px] font-bold text-emerald-200/90">
                        Holy Cross College (Autonomous)
                      </p>
                    </div>

                    {/* Floating Status Pill */}
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-emerald-400/60 text-[11px] font-extrabold text-emerald-300 flex items-center gap-1.5 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>Available for Roles</span>
                    </div>
                  </div>

                  {/* Quick Highlights Underneath Portrait */}
                  <div className="mt-3 px-1 pb-1 grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-emerald-200/80 dark:border-emerald-800/80 text-center shadow-xs">
                      <span className="block font-black text-emerald-700 dark:text-emerald-300 text-xs">8.67 / 8.00</span>
                      <span className="text-slate-600 dark:text-slate-300 font-bold text-[10px]">BCA / MCA CGPA</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-amber-200/80 dark:border-amber-800/80 text-center shadow-xs">
                      <span className="block font-black text-amber-600 dark:text-amber-300 text-xs">District Gold</span>
                      <span className="text-slate-600 dark:text-slate-300 font-bold text-[10px]">Taekwondo</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3 Core Highlight Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Card 1: Academic Excellence */}
          <div
            onClick={() => onNavigate('about')}
            className="p-5 rounded-3xl glass-card border-2 border-emerald-300/80 dark:border-emerald-500/30 hover:border-emerald-500 transition-all hover:shadow-xl cursor-pointer group"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase text-emerald-700 dark:text-emerald-300 block">
                    Academic Qualifications
                  </span>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    MCA: 8.00 CGPA • BCA: 8.67 CGPA
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 font-medium">
                    Holy Cross College (Autonomous) & J.J College of Arts and Science
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-emerald-600 group-hover:translate-x-1 transition-transform shrink-0 mt-2" />
            </div>
          </div>

          {/* Card 2: Software Development Projects */}
          <div
            onClick={() => onNavigate('projects')}
            className="p-5 rounded-3xl glass-card border-2 border-teal-300/80 dark:border-teal-500/30 hover:border-teal-500 transition-all hover:shadow-xl cursor-pointer group"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-teal-500 text-white flex items-center justify-center shadow-md shrink-0">
                  <Code2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase text-teal-700 dark:text-teal-300 block">
                    Featured Projects
                  </span>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    smileSteps & Garment Shop
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 font-medium">
                    MERN Stack, Java/JSP, Servlets, MySQL & Responsive UI
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-teal-600 group-hover:translate-x-1 transition-transform shrink-0 mt-2" />
            </div>
          </div>

          {/* Card 3: Internships in IoT & Data Analytics */}
          <div
            onClick={() => onNavigate('experience')}
            className="p-5 rounded-3xl glass-card border-2 border-amber-300/80 dark:border-amber-500/30 hover:border-amber-500 transition-all hover:shadow-xl cursor-pointer group"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shrink-0">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase text-amber-700 dark:text-amber-300 block">
                    Industry Internships
                  </span>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    IoT Sensor & Data Analytics
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 font-medium">
                    HCC IIC (Sensor Telemetry) & T4TEQ (Power BI & SQL)
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-amber-600 group-hover:translate-x-1 transition-transform shrink-0 mt-2" />
            </div>
          </div>

        </div>
      </section>

      {/* Stats Counter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl glass-card text-center border-2 border-emerald-300/80 dark:border-emerald-500/30 hover:border-emerald-500 transition-all transform hover:-translate-y-1"
            >
              <div className="text-3xl sm:text-4xl font-black text-emerald-700 dark:text-emerald-300 mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-200">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Explore Page Navigation Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Explore Portfolio Sections
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 font-medium">
            Browse through dedicated pages detailing academic credentials, skills, projects, and internships.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div
            onClick={() => onNavigate('about')}
            className="glass-card p-6 rounded-3xl border-2 border-emerald-300 dark:border-emerald-700 hover:border-emerald-500 cursor-pointer group transition-all"
          >
            <GraduationCap className="w-8 h-8 text-emerald-600 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">About & Bio</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mb-4">
              Academic background, Taekwondo gold distinction, and core principles.
            </p>
            <span className="text-xs font-black text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
              <span>Read Biography</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <div
            onClick={() => onNavigate('skills')}
            className="glass-card p-6 rounded-3xl border-2 border-emerald-300 dark:border-emerald-700 hover:border-emerald-500 cursor-pointer group transition-all"
          >
            <Code2 className="w-8 h-8 text-teal-600 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">Skills & Stack</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mb-4">
              Interactive proficiency matrix for Java, SQL, Spring Boot, and Web.
            </p>
            <span className="text-xs font-black text-teal-700 dark:text-teal-300 flex items-center gap-1">
              <span>View Skill Matrix</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <div
            onClick={() => onNavigate('projects')}
            className="glass-card p-6 rounded-3xl border-2 border-emerald-300 dark:border-emerald-700 hover:border-emerald-500 cursor-pointer group transition-all"
          >
            <FolderGit2 className="w-8 h-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">Projects</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mb-4">
              Garment Shop Management System and RS App Hub platform.
            </p>
            <span className="text-xs font-black text-blue-700 dark:text-blue-300 flex items-center gap-1">
              <span>Explore Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <div
            onClick={() => onNavigate('experience')}
            className="glass-card p-6 rounded-3xl border-2 border-emerald-300 dark:border-emerald-700 hover:border-emerald-500 cursor-pointer group transition-all"
          >
            <Briefcase className="w-8 h-8 text-amber-600 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">Experience</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mb-4">
              IoT Sensor & Data Analytics internships, degrees, and certificates.
            </p>
            <span className="text-xs font-black text-amber-700 dark:text-amber-300 flex items-center gap-1">
              <span>View Experience</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
