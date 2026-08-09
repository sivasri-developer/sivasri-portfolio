import React from 'react';
import { TIMELINE, CERTIFICATIONS } from '../data/portfolioData';
import {
  GraduationCap,
  Briefcase,
  Award,
  CheckCircle2,
  Calendar,
  MapPin,
  ShieldCheck,
  Trophy,
} from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bright-highlight-badge text-xs uppercase tracking-wider mb-3">
            <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />
            <span>Academic & Career Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Education, Internships & Certifications
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-700 dark:text-slate-200 font-medium">
            Sivasri R's academic qualifications in Computer Applications, industry internships, and verified credentials.
          </p>
        </div>

        {/* Dual Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Timeline List */}
          <div className="lg:col-span-7 space-y-8">
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Education & Internship Experience</span>
            </h3>

            <div className="relative pl-6 sm:pl-8 border-l-4 border-emerald-400 dark:border-emerald-600 space-y-10">
              {TIMELINE.map((item) => (
                <div key={item.id} className="relative group">
                  {/* Node Bullet */}
                  <div className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-6 h-6 rounded-full bg-white dark:bg-slate-900 border-4 border-emerald-600 dark:border-emerald-400 group-hover:scale-125 transition-transform shadow-md" />

                  {/* Card Container */}
                  <div className="glass-card p-6 rounded-2xl border-2 border-emerald-300/80 dark:border-emerald-500/30 hover:border-emerald-500 transition-all">
                    
                    {/* Role & Badge Header */}
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <span className="text-xs font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                          {item.type}
                        </span>
                        <h4 className="text-lg font-black text-slate-900 dark:text-white">
                          {item.role}
                        </h4>
                      </div>

                      {item.achievementBadge && (
                        <span className="px-3.5 py-1 rounded-full text-xs font-black bg-emerald-200 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-200 border border-emerald-400">
                          {item.achievementBadge}
                        </span>
                      )}
                    </div>

                    {/* Organization & Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-xs font-extrabold text-slate-700 dark:text-slate-300 mb-4">
                      <span className="text-emerald-800 dark:text-emerald-300 font-black">{item.organization}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        {item.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        {item.location}
                      </span>
                    </div>

                    {/* Bullet Points */}
                    <ul className="space-y-2 mb-4 text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium">
                      {item.description.map((desc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Skills Used Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-emerald-200 dark:border-emerald-800">
                      {item.skillsUsed.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-md text-[11px] font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Certifications & Honors */}
          <div className="lg:col-span-5 space-y-8">
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Verified Certifications & Honors</span>
            </h3>

            <div className="space-y-4">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.id}
                  className="glass-card p-5 rounded-2xl border-2 border-emerald-300/80 dark:border-emerald-500/30 hover:border-emerald-500 transition-all hover:shadow-xl"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shrink-0 shadow-md">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-black text-slate-900 dark:text-white">
                        {cert.title}
                      </h4>
                      <p className="text-xs font-bold text-slate-600 dark:text-slate-300">
                        {cert.issuer} • {cert.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-emerald-200 dark:border-emerald-800">
                    {cert.skills.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-0.5 rounded text-[11px] font-black bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Extra Distinction Showcase Card */}
            <div className="p-6 rounded-3xl bg-emerald-100/90 dark:bg-emerald-950/90 border-2 border-emerald-400 dark:border-emerald-600 shadow-xl">
              <h4 className="text-base font-black text-emerald-950 dark:text-emerald-100 mb-2 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span>Inter-College & Language Honors</span>
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-200 font-medium leading-relaxed mb-4">
                • <strong>District Gold Medalist in Taekwondo</strong> & State Level Participant.<br />
                • <strong>2nd Prize Winner</strong> in Inter-College Semantic Memory Competition.<br />
                • <strong>Completed 6 Hindi Certification Examinations</strong> demonstrating multilingual proficiency.
              </p>
              <div className="text-xs font-black text-emerald-800 dark:text-emerald-300">
                ✓ Validated & Verified Credentials
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
