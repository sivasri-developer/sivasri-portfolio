import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, FileText, Sparkles, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode, onOpenResume }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-emerald-50/90 dark:bg-[#08120e]/90 backdrop-blur-md shadow-md border-b-2 border-emerald-300/80 dark:border-emerald-800'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2 group cursor-pointer"
            id="navbar-brand"
          >
            <span className="text-2xl font-black tracking-tight text-emerald-800 dark:text-emerald-300 transition-transform duration-300 group-hover:scale-105">
              {PERSONAL_INFO.name}
            </span>
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" id="desktop-nav">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-3.5 py-1.5 text-xs sm:text-sm font-black rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-emerald-950 dark:text-emerald-200 bg-emerald-200/90 dark:bg-emerald-900/90 border border-emerald-400'
                      : 'text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-100/60 dark:hover:bg-slate-800'
                  }`}
                  id={`nav-link-${item.id}`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full text-slate-800 dark:text-slate-200 hover:bg-emerald-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border-2 border-emerald-300 dark:border-emerald-700"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
              id="theme-toggle-btn"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-amber-400 transition-transform hover:rotate-45" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700 transition-transform hover:-rotate-12" />
              )}
            </button>

            {/* Download Resume Header Button */}
            <button
              onClick={onOpenResume}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-black text-white bg-emerald-600 hover:bg-emerald-700 rounded-full shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer active:scale-95 border border-emerald-400"
              id="download-resume-header-btn"
            >
              <FileText className="w-4 h-4" />
              <span>Resume Details</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-emerald-100 dark:hover:bg-slate-800 cursor-pointer border-2 border-emerald-300 dark:border-emerald-700"
              aria-label="Toggle Menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden mt-2 mx-4 p-4 rounded-2xl glass-panel shadow-2xl border-2 border-emerald-400 dark:border-emerald-600 flex flex-col gap-2 animate-in slide-in-from-top duration-200"
          id="mobile-drawer-menu"
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`px-4 py-2.5 rounded-xl text-sm font-black flex items-center justify-between ${
                activeSection === item.id
                  ? 'bg-emerald-200 dark:bg-emerald-950 text-emerald-950 dark:text-emerald-200 border border-emerald-400'
                  : 'text-slate-800 dark:text-slate-200 hover:bg-emerald-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>{item.label}</span>
              <ArrowUpRight className="w-4 h-4 opacity-70" />
            </a>
          ))}

          <div className="pt-2 mt-2 border-t border-emerald-300 dark:border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-black text-white bg-emerald-600 rounded-xl shadow-md active:scale-95 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Resume Details</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
