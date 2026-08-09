import React, { useState } from 'react';
import { SKILLS } from '../data/portfolioData';
import { Skill } from '../types';
import {
  Code2,
  Database,
  Cpu,
  Layers,
  Search,
  CheckCircle,
  Terminal,
  Grid,
  List,
  Sparkles,
} from 'lucide-react';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSkillModal, setActiveSkillModal] = useState<Skill | null>(null);

  const categories = ['All', 'Languages', 'Frontend', 'Backend', 'Databases', 'Tools & Platforms'];

  const filteredSkills = SKILLS.filter((skill) => {
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getBadgeStyle = (level: Skill['level']) => {
    switch (level) {
      case 'Advanced':
        return 'bg-emerald-200 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-400 dark:border-emerald-600 font-extrabold';
      case 'Proficient':
        return 'bg-blue-200 text-blue-900 dark:bg-blue-950 dark:text-blue-300 border-blue-400 dark:border-blue-600 font-extrabold';
      case 'Intermediate':
        return 'bg-purple-200 text-purple-900 dark:bg-purple-950 dark:text-purple-300 border-purple-400 dark:border-purple-600 font-extrabold';
      default:
        return 'bg-slate-200 text-slate-900 font-bold';
    }
  };

  return (
    <section id="skills" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bright-highlight-badge text-xs uppercase tracking-wider mb-3">
            <Cpu className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Programming Languages, Frameworks & Tools
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-700 dark:text-slate-200 font-medium">
            Core tech stack proficiency developed across academic coursework, projects, and internships.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white dark:from-emerald-500 dark:to-teal-500 shadow-lg scale-105 border-2 border-emerald-400'
                    : 'bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 hover:bg-emerald-100 dark:hover:bg-slate-700 border-2 border-emerald-200 dark:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600 dark:text-emerald-400" />
            <input
              type="text"
              placeholder="Search skills (e.g. Java, SQL)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-900 dark:text-white text-xs sm:text-sm font-semibold border-2 border-emerald-300 dark:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              onClick={() => setActiveSkillModal(skill)}
              className="glass-card p-6 rounded-2xl border-2 border-emerald-300/80 dark:border-emerald-500/30 hover:border-emerald-500 transition-all hover:shadow-2xl cursor-pointer group transform hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Category & Level Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black uppercase text-emerald-700 dark:text-emerald-400">
                    {skill.category}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs border ${getBadgeStyle(
                      skill.level
                    )}`}
                  >
                    {skill.level}
                  </span>
                </div>

                {/* Skill Name & Experience */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                    {skill.name}
                  </h3>
                  <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300 font-mono bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-300 dark:border-emerald-800">
                    {skill.years}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed mb-6 line-clamp-2">
                  {skill.description}
                </p>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between text-xs font-black mb-1.5">
                  <span className="text-slate-700 dark:text-slate-300">Proficiency</span>
                  <span className="text-emerald-700 dark:text-emerald-300 font-mono font-black">
                    {skill.proficiency}%
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-emerald-100 dark:bg-slate-800 overflow-hidden border border-emerald-300 dark:border-emerald-900">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-16 text-slate-600 dark:text-slate-300 font-semibold">
            No matching skills found for "{searchQuery}". Try a different term or category.
          </div>
        )}

      </div>

      {/* Skill Detail Modal */}
      {activeSkillModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border-2 border-emerald-400 dark:border-emerald-600 shadow-2xl relative">
            <button
              onClick={() => setActiveSkillModal(null)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 dark:hover:text-white p-2 rounded-full text-xl cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black text-xl shadow-md">
                {activeSkillModal.name.charAt(0)}
              </div>
              <div>
                <span className="text-xs uppercase font-black text-emerald-600 dark:text-emerald-400">
                  {activeSkillModal.category}
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  {activeSkillModal.name}
                </h3>
              </div>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-200 font-medium leading-relaxed mb-6">
              {activeSkillModal.description}
            </p>

            <div className="space-y-3 mb-6 bg-emerald-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-700 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400 font-bold">Proficiency Rating:</span>
                <span className="font-black text-emerald-700 dark:text-emerald-300">{activeSkillModal.proficiency}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400 font-bold">Experience Level:</span>
                <span className="font-extrabold text-slate-900 dark:text-white">{activeSkillModal.level} ({activeSkillModal.years})</span>
              </div>
            </div>

            <button
              onClick={() => setActiveSkillModal(null)}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl transition-colors cursor-pointer shadow-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
