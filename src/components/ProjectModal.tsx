import React, { useState } from 'react';
import { Project } from '../types';
import {
  X,
  ExternalLink,
  Github,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  Terminal,
  Play,
  RotateCcw,
} from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'sandbox'>('overview');
  const [sandboxLog, setSandboxLog] = useState<string[]>([]);
  const [isRunningSandbox, setIsRunningSandbox] = useState(false);

  if (!project) return null;

  const handleSimulateDemo = () => {
    setIsRunningSandbox(true);
    setSandboxLog([`Initializing ${project.title} runtime sandbox...`]);

    setTimeout(() => {
      setSandboxLog((prev) => [...prev, `[200 OK] Connected to API server...`]);
    }, 400);

    setTimeout(() => {
      setSandboxLog((prev) => [
        ...prev,
        `[DB] Authenticated user session & loaded collections...`,
        `[Render] Mount React component tree (0.04s)...`,
      ]);
    }, 800);

    setTimeout(() => {
      setSandboxLog((prev) => [
        ...prev,
        `[SUCCESS] Application state synchronized. All features operational!`,
      ]);
      setIsRunningSandbox(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl relative flex flex-col overflow-hidden max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#006c49] text-white">
              {project.category}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate max-w-md">
              {project.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Image Hero */}
        <div className="relative h-48 sm:h-64 bg-slate-950 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
          
          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((t) => (
                <span key={t} className="px-2.5 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-xs font-mono border border-white/20">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-md text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Source</span>
              </a>
            </div>
          </div>
        </div>

        {/* Tab Selection Bar */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'border-[#006c49] text-[#006c49] dark:border-[#4edea3] dark:text-[#4edea3]'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Overview & Features
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'architecture'
                ? 'border-[#006c49] text-[#006c49] dark:border-[#4edea3] dark:text-[#4edea3]'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Architecture
          </button>

          <button
            onClick={() => setActiveTab('sandbox')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'sandbox'
                ? 'border-[#006c49] text-[#006c49] dark:border-[#4edea3] dark:text-[#4edea3]'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Live Sandbox
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Project Description
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {project.fullDescription}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Key Technical Features
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feat, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#006c49] dark:text-[#4edea3] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#0058be] dark:text-[#38bdf8]" />
                  <span>System Design Notes</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {project.architectureNotes ||
                    'Designed with strict modular separation of concerns. The frontend maintains synchronized client state, while backend REST services execute database operations with ACID compliance.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 rounded-xl bg-[#0f172a] text-slate-300 border border-slate-800">
                  <strong className="block text-emerald-400 mb-1 font-sans font-bold text-xs">
                    Client Tier
                  </strong>
                  React + TypeScript + Tailwind CSS with responsive layout and state synchronization.
                </div>
                <div className="p-4 rounded-xl bg-[#0f172a] text-slate-300 border border-slate-800">
                  <strong className="block text-cyan-400 mb-1 font-sans font-bold text-xs">
                    Backend Tier
                  </strong>
                  Express REST Controllers / Spring Boot Services with ORM mapping and validation.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sandbox' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  Interactive Logic Simulator
                </span>
                <button
                  onClick={handleSimulateDemo}
                  disabled={isRunningSandbox}
                  className="px-4 py-1.5 bg-[#006c49] dark:bg-[#10b981] hover:bg-[#005236] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{isRunningSandbox ? 'Simulating...' : 'Test Run Endpoint'}</span>
                </button>
              </div>

              <div className="bg-[#0f172a] text-emerald-400 p-4 rounded-2xl font-mono text-xs min-h-[160px] border border-slate-800 space-y-2">
                {sandboxLog.length === 0 ? (
                  <span className="text-slate-500">Click "Test Run Endpoint" to simulate app boot and API interaction logs...</span>
                ) : (
                  sandboxLog.map((log, i) => <div key={i}>{log}</div>)
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
