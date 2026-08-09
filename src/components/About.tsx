import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import {
  GraduationCap,
  Award,
  Terminal,
  Code2,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  Play,
  Trophy,
  BookOpen,
} from 'lucide-react';

export const About: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const sampleCode = `// Sivasri R - Software Developer Profile
class DeveloperProfile {
    private String name = "${PERSONAL_INFO.name}";
    private String education = "MCA @ Holy Cross College (8.00 CGPA)";
    private String bcaAcademic = "BCA @ J.J College (8.67 CGPA)";
    private String[] skills = {"Java", "Spring Boot", "SQL", "Web Dev", "Python"};

    public void displayStats() {
        System.out.println("District Gold Medalist in Taekwondo | State Participant");
        System.out.println("2nd Prize - Semantic Memory Inter-College Contest");
        System.out.println("Completed 6 Hindi Certification Exams");
    }
}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(sampleCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleRunLogic = () => {
    setIsExecuting(true);
    setTerminalOutput(null);
    setTimeout(() => {
      setIsExecuting(false);
      setTerminalOutput(
        `> javac DeveloperProfile.java\n> java DeveloperProfile\n> Output: "Sivasri R: MCA Student & Software Developer ready for high-impact software engineering roles!"`
      );
    }, 600);
  };

  return (
    <section id="about" className="py-20 relative bg-emerald-50/40 dark:bg-[#0b1612] z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bright-highlight-badge text-xs uppercase tracking-wider mb-3">
            <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />
            <span>Academic & Technical Profile</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Bridging Academic Excellence & Enterprise Software Engineering
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-700 dark:text-slate-200 font-medium">
            Master of Computer Applications (MCA) scholar at Holy Cross College with hands-on Java/JSP and MySQL application development experience.
          </p>
        </div>

        {/* Bio & Terminal Code Dual Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-16">
          
          {/* Left Narrative Column */}
          <div className="lg:col-span-7 flex flex-col justify-between glass-card p-6 sm:p-8 rounded-3xl border-2 border-emerald-300/80 dark:border-emerald-500/30">
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span>About {PERSONAL_INFO.name}</span>
                <Sparkles className="w-5 h-5 text-emerald-500" />
              </h3>
              
              <p className="text-slate-700 dark:text-slate-200 text-base leading-relaxed font-medium mb-6">
                {PERSONAL_INFO.fullBio}
              </p>

              {/* Achievements Showcase Section */}
              <div className="mb-6">
                <h4 className="text-sm font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 mb-3 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>Key Achievements & Distinctions</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {PERSONAL_INFO.achievements.map((ach, i) => (
                    <div key={i} className="p-3.5 rounded-2xl bg-emerald-100/70 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800">
                      <div className="text-xs font-black text-emerald-900 dark:text-emerald-200 mb-1">{ach.title}</div>
                      <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">{ach.event}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                <div className="p-4 rounded-2xl bg-white/90 dark:bg-slate-800/80 border border-emerald-200 dark:border-emerald-800">
                  <div className="flex items-center gap-2 text-sm font-black text-slate-900 dark:text-white mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Java & Spring Boot</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                    Strong OOP principles, Collections, Servlets/JSP, and Spring Boot REST architecture.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/90 dark:bg-slate-800/80 border border-emerald-200 dark:border-emerald-800">
                  <div className="flex items-center gap-2 text-sm font-black text-slate-900 dark:text-white mb-1">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>SQL & Database Systems</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                    Designing MySQL & Oracle relational schemas, ACID transactions, and optimized queries.
                  </p>
                </div>
              </div>
            </div>

            {/* Location & Contact Summary */}
            <div className="pt-4 border-t border-emerald-200 dark:border-emerald-800 flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-slate-700 dark:text-slate-300">
              <div>📍 Location: <span className="text-slate-900 dark:text-white">{PERSONAL_INFO.location}</span></div>
              <div className="text-emerald-800 dark:text-emerald-300 bg-emerald-200/80 dark:bg-emerald-950 px-3 py-1 rounded-full border border-emerald-400/50">
                {PERSONAL_INFO.availability}
              </div>
            </div>
          </div>

          {/* Right Terminal Code Sandbox Card */}
          <div className="lg:col-span-5 bg-[#0a1510] text-slate-200 rounded-3xl p-6 shadow-2xl border-2 border-emerald-500/40 flex flex-col justify-between font-mono text-xs sm:text-sm">
            <div>
              {/* Terminal Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-emerald-900/60">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-emerald-400 text-xs ml-2 font-sans font-bold">DeveloperProfile.java</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyCode}
                    className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Copy snippet"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={handleRunLogic}
                    disabled={isExecuting}
                    className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-sans font-bold cursor-pointer transition-all active:scale-95 disabled:opacity-50"
                  >
                    <Play className="w-3 h-3" />
                    <span>{isExecuting ? 'Running...' : 'Run Java Code'}</span>
                  </button>
                </div>
              </div>

              {/* Code Snippet Box */}
              <pre className="text-emerald-300/90 leading-relaxed overflow-x-auto whitespace-pre-wrap font-mono text-xs">
                <code>{sampleCode}</code>
              </pre>
            </div>

            {/* Terminal Execution Result Console */}
            <div className="mt-6 pt-4 border-t border-emerald-900/60 font-mono text-xs">
              <div className="text-emerald-400/80 mb-1 font-sans font-bold text-[11px] uppercase tracking-wider flex items-center gap-1">
                <Terminal className="w-3 h-3" />
                <span>Console Output</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-emerald-900/80 text-emerald-400 min-h-[60px] flex items-center">
                {isExecuting ? (
                  <span className="text-emerald-300 animate-pulse">Compiling bytecode...</span>
                ) : terminalOutput ? (
                  <span className="whitespace-pre-line text-emerald-300">{terminalOutput}</span>
                ) : (
                  <span className="text-slate-500">Click "Run Java Code" above to execute...</span>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Highlight Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
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

      </div>
    </section>
  );
};
