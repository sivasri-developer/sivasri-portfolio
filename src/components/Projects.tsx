import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import {
  FolderGit2,
  ExternalLink,
  Github,
  Star,
  Sparkles,
  Layers,
  ChevronRight,
  Code2,
  Briefcase,
  ArrowRight,
} from 'lucide-react';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
  onNavigate?: (page: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'MERN', 'Java', 'Web App'];

  const filteredProjects = PROJECTS.filter((proj) => {
    if (selectedCategory === 'All') return true;
    return proj.category === selectedCategory;
  });

  return (
    <section id="projects" className="py-12 sm:py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bright-highlight-badge text-xs uppercase tracking-wider mb-3">
            <FolderGit2 className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />
            <span>Software Engineering Projects</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Featured Development Projects
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-700 dark:text-slate-200 font-medium">
            Software applications engineered by Sivasri R utilizing MERN Stack (MongoDB, Express, React, Node.js), Java/JSP, MySQL, Servlets, and Modern Web interfaces.
          </p>
        </div>

        {/* Note banner clarifying Internship segregation */}
        <div className="mb-10 p-4 rounded-2xl bg-emerald-50/90 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-medium">
            <Briefcase className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Looking for IoT Sensors and Data Analytics? They are documented under the <strong>Internships & Experience</strong> section!</span>
          </div>
          {onNavigate && (
            <button
              onClick={() => onNavigate('experience')}
              className="font-black text-emerald-700 dark:text-emerald-300 hover:underline inline-flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span>View Internships</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white dark:from-emerald-500 dark:to-teal-500 shadow-lg scale-105 border-2 border-emerald-400'
                  : 'bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 hover:bg-emerald-100 dark:hover:bg-slate-700 border-2 border-emerald-200 dark:border-slate-700'
              }`}
            >
              {cat === 'All' ? 'All Development Projects' : `${cat} Projects`}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-3xl overflow-hidden border-2 border-emerald-300/80 dark:border-emerald-500/30 hover:border-emerald-500 transition-all hover:shadow-2xl flex flex-col justify-between group transform hover:-translate-y-1.5"
            >
              <div>
                {/* Image & Overlay Header */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-600 text-white shadow-md border border-emerald-400">
                      {project.category}
                    </span>
                    {project.highlighted && (
                      <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-400 text-slate-950 shadow-md flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Core Resume Project</span>
                      </span>
                    )}
                  </div>

                  {project.stars && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-slate-950/90 backdrop-blur-md text-amber-300 text-xs font-black flex items-center gap-1 border border-amber-400/40">
                      <Star className="w-3.5 h-3.5 fill-amber-300" />
                      <span>{project.stars} Stars</span>
                    </div>
                  )}

                  {/* Title Overlay over image bottom */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-emerald-300 transition-colors drop-shadow-md">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium leading-relaxed mb-6">
                    {project.shortDescription}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-lg bg-emerald-100/90 dark:bg-emerald-950/90 text-emerald-900 dark:text-emerald-300 text-xs font-extrabold border border-emerald-300 dark:border-emerald-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 pb-6 pt-3 border-t border-emerald-200 dark:border-emerald-800/80 flex items-center justify-between gap-3">
                <button
                  onClick={() => onSelectProject(project)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-5 py-3 text-xs sm:text-sm font-black text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-all cursor-pointer active:scale-95"
                >
                  <span>Project Details & Architecture</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-emerald-100 dark:hover:bg-slate-800 border-2 border-emerald-300 dark:border-emerald-700 transition-colors cursor-pointer"
                  title="View GitHub Repository"
                >
                  <Github className="w-5 h-5" />
                </a>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-emerald-100 dark:hover:bg-slate-800 border-2 border-emerald-300 dark:border-emerald-700 transition-colors cursor-pointer"
                    title="Live Web Application"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        {onNavigate && (
          <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-emerald-100/80 dark:bg-emerald-950/80 border-2 border-emerald-300 dark:border-emerald-800">
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Discover internship experience & qualifications
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                View the IoT Sensor and Data Analytics internships, MCA & BCA degrees, and certifications.
              </p>
            </div>
            <button
              onClick={() => onNavigate('experience')}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-black text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md cursor-pointer transition-all active:scale-95"
            >
              <span>View Experience & Internships</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
