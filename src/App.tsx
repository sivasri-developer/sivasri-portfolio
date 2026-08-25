/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, PageId } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { ProjectModal } from './components/ProjectModal';
import { BackgroundEffect } from './components/BackgroundEffect';
import { Project } from './types';
import { CheckCircle2, ChevronRight, Home, Sparkles } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('sivasri_portfolio_theme');
    if (saved !== null) {
      return saved === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Page Routing State with Hash synchronization
  const [activePage, setActivePage] = useState<PageId>(() => {
    const hash = window.location.hash.replace('#', '') as PageId;
    const validPages: PageId[] = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
    if (validPages.includes(hash)) {
      return hash;
    }
    return 'home';
  });

  const [resumeModalOpen, setResumeModalOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync dark mode class
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('sivasri_portfolio_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('sivasri_portfolio_theme', 'light');
    }
  }, [darkMode]);

  // Handle Hash Synchronization & Browser Back/Forward
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      if (validPages.includes(hash)) {
        setActivePage(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  const navigateToPage = (page: string) => {
    const validPages: PageId[] = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
    if (validPages.includes(page as PageId)) {
      setActivePage(page as PageId);
      window.location.hash = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#f2faf3] dark:bg-[#08120e] text-[#0f1d16] dark:text-[#e8f5f0] transition-colors duration-300 relative selection:bg-emerald-500/30 selection:text-emerald-950 font-sans flex flex-col justify-between">
      
      {/* Ambient background mesh & subtle glow */}
      <BackgroundEffect />

      {/* Main Multi-Page Floating Header Navigation */}
      <div>
        <Navbar
          activePage={activePage}
          onNavigate={(page) => navigateToPage(page)}
          isDark={darkMode}
          onToggleTheme={() => setDarkMode(!darkMode)}
          onOpenResume={() => setResumeModalOpen(true)}
        />

        {/* Subpage Breadcrumb Bar for better UX */}
        {activePage !== 'home' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <div className="flex items-center gap-2 text-xs font-black text-slate-700 dark:text-slate-300">
              <button
                onClick={() => navigateToPage('home')}
                className="hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1 cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </button>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <span className="text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                {activePage}
              </span>
            </div>
          </div>
        )}

        {/* Page Views: Dedicated Single-Page Views */}
        <main className="relative z-10 animate-in fade-in duration-300">
          {activePage === 'home' && (
            <Hero
              onOpenResume={() => setResumeModalOpen(true)}
              onNavigate={(page) => navigateToPage(page)}
              onShowToast={showToast}
            />
          )}

          {activePage === 'about' && (
            <About onNavigate={(page) => navigateToPage(page)} />
          )}

          {activePage === 'skills' && (
            <Skills onNavigate={(page) => navigateToPage(page)} />
          )}

          {activePage === 'projects' && (
            <Projects
              onSelectProject={(project) => setSelectedProject(project)}
              onNavigate={(page) => navigateToPage(page)}
            />
          )}

          {activePage === 'experience' && (
            <Experience onNavigate={(page) => navigateToPage(page)} />
          )}

          {activePage === 'contact' && (
            <Contact onShowToast={showToast} />
          )}
        </main>
      </div>

      {/* Global Footer */}
      <Footer />

      {/* Toast Notification for UX */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-700 text-white shadow-2xl flex items-center gap-3 border-2 border-emerald-400 animate-in slide-in-from-bottom-3 duration-200 max-w-md">
          <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
          <p className="text-xs sm:text-sm font-black leading-snug">{toastMessage}</p>
        </div>
      )}

      {/* Modals */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
