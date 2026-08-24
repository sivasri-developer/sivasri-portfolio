import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import {
  Sun,
  Moon,
  Menu,
  X,
  FileText,
  Home,
  User,
  Cpu,
  FolderGit2,
  Briefcase,
  Mail,
  Sparkles,
} from 'lucide-react';

export type PageId = 'home' | 'about' | 'skills' | 'projects' | 'experience' | 'contact';

interface NavbarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  isDark,
  onToggleTheme,
  onOpenResume,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string; icon: any }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Cpu },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleNavClick = (id: PageId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4">
        <nav
          className="glass-panel rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between shadow-lg border-2 border-emerald-300 dark:border-emerald-700/60"
          aria-label="Main Navigation"
        >
          {/* Logo / Brand */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-black text-sm shadow-md group-hover:scale-105 transition-transform border border-emerald-300">
              SR
            </div>
            <div className="flex flex-col">
              <span className="font-black text-slate-900 dark:text-white text-sm sm:text-base tracking-tight leading-none">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-400 leading-tight">
                MCA Developer
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1 bg-emerald-100/60 dark:bg-slate-900/60 p-1.5 rounded-full border border-emerald-300 dark:border-emerald-800">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md scale-105'
                      : 'text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-200/50 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Action Icons (Theme Toggle + Resume Button) */}
          <div className="flex items-center gap-2">
            {/* Resume Button */}
            <button
              onClick={onOpenResume}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 border-2 border-emerald-300 dark:border-emerald-700 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Resume</span>
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2.5 rounded-full text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-emerald-100 dark:hover:bg-slate-700 border-2 border-emerald-300 dark:border-emerald-700 transition-colors cursor-pointer shadow-xs"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle visual theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-emerald-700" />
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 border-2 border-emerald-300 dark:border-emerald-700 transition-colors cursor-pointer"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 p-4 rounded-3xl glass-panel border-2 border-emerald-300 dark:border-emerald-700 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-2 mb-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-white/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 hover:bg-emerald-100 dark:hover:bg-slate-700 border border-emerald-200 dark:border-slate-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                onOpenResume();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl text-xs font-black text-slate-800 dark:text-slate-200 bg-white/90 dark:bg-slate-800/90 border-2 border-emerald-300 dark:border-emerald-700"
            >
              <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>View Resume Details</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
