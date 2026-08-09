import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-emerald-100/60 dark:bg-[#060e0a] border-t-2 border-emerald-300 dark:border-emerald-800 transition-colors relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left Brand */}
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black tracking-tight text-emerald-800 dark:text-emerald-300">
              {PERSONAL_INFO.name}
            </span>
          </div>

          {/* Center Copyright String */}
          <div className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-200 text-center">
            © {new Date().getFullYear()} SIVASRI R. MCA Student & Software Developer. Built with precision.
          </div>

          {/* Right Links & Scroll Top */}
          <div className="flex items-center gap-6">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-800 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors text-xs font-black"
            >
              GitHub
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-xs font-black"
            >
              LinkedIn
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-slate-800 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors text-xs font-black"
            >
              Email
            </a>

            <button
              onClick={handleScrollToTop}
              className="p-3 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 shadow-md transition-all cursor-pointer border border-emerald-400"
              title="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};
