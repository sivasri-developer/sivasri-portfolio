import React, { useState } from 'react';
import { PERSONAL_INFO, SKILLS, PROJECTS, TIMELINE, CERTIFICATIONS } from '../data/portfolioData';
import { useProfilePhoto } from '../services/photoManager';
import {
  X,
  Printer,
  Copy,
  Check,
  FileText,
  Mail,
  MapPin,
  GraduationCap,
  Briefcase,
  Code2,
  Phone,
  Award,
  Trophy,
} from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const currentPhoto = useProfilePhoto();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const textResume = `
SIVASRI R - SOFTWARE DEVELOPER
Phone: ${PERSONAL_INFO.phone} | Email: ${PERSONAL_INFO.email} | Location: ${PERSONAL_INFO.location}
GitHub: ${PERSONAL_INFO.github} | LinkedIn: ${PERSONAL_INFO.linkedin}

PROFILE SUMMARY
${PERSONAL_INFO.fullBio}

EDUCATION
- Master of Computer Applications (MCA) | Holy Cross College (Autonomous) | 2025 - 2027 | CGPA: 8.00 / 10
- Bachelor of Computer Applications (BCA) | J.J College of Arts and Science (Autonomous) | 2022 - 2025 | CGPA: 8.67 / 10

TECHNICAL SKILLS
- Full Stack & Web: MERN Stack (MongoDB, Express.js, React, Node.js), Java, Advanced Java, Spring Boot, SQL, MySQL, Oracle, HTML5, CSS3, JavaScript, PHP, Python
- Tools & Platforms: VS Code, Apache NetBeans, Power BI, Linux, Git & GitHub, MS Office

KEY PROJECTS
1. smileSteps (MERN Stack, MongoDB, Express.js, React, Node.js)
   - Child-friendly learning & activity platform with visual guidance, voice assistance, mood tracking, and positive reward milestones.
   - GitHub: https://github.com/sivasri-developer/smileSteps
2. Online Garment Shop Management System (Java, JSP, Servlets, MySQL)
   - Comprehensive web app for inventory, employee shift records, sales logging, and supplier billing.
   - GitHub: https://github.com/sivasri-developer/garment-shop-management
3. RS App Hub (HTML5, CSS3, JavaScript)
   - Centralized application portal with live DOM search, multi-filter navigation, and responsive themes.
   - GitHub: https://github.com/sivasri-developer/rs-app-hub

INTERNSHIPS & CERTIFICATIONS
- Data Analytics Intern @ T4TEQ (2026) - Power BI, SQL, Python
- IoT Sensor Intern @ HCC IIC (2025) - Telemetry logging & SQL databases
- Core Java & Advanced Java Certification - CCI
- Python & C++ Certification - CCI
- Soft Skill Development Certification - SWAYAM (NPTEL)
- Six Hindi Certification Examinations - DBHP Sabha

DISTINCTIONS & HONORS
- 2nd Prize Winner - Semantic Memory Inter-College Competition
- District Gold Medalist in Taekwondo | State-Level Participant
    `.trim();

    navigator.clipboard.writeText(textResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-emerald-400 dark:border-emerald-600 shadow-2xl relative flex flex-col">
        
        {/* Modal Header Controls */}
        <div className="sticky top-0 z-20 bg-emerald-50 dark:bg-slate-900 px-6 py-4 border-b-2 border-emerald-300 dark:border-emerald-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              SIVASRI_R_Resume.pdf
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 border-2 border-emerald-300 dark:border-slate-700 hover:bg-emerald-100 transition-colors cursor-pointer"
              title="Copy text version"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy Text CV'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-black text-white bg-emerald-600 hover:bg-emerald-700 transition-colors cursor-pointer shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-emerald-100 dark:hover:bg-slate-800 cursor-pointer text-lg font-bold"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Formatted CV Content View */}
        <div className="p-6 sm:p-10 space-y-8 text-slate-800 dark:text-slate-200 font-sans leading-relaxed">
          
          {/* Resume Name Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 border-b-2 border-emerald-200 dark:border-emerald-800">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-emerald-400 dark:border-emerald-500 shadow-md shrink-0 bg-slate-900">
              <img
                src={currentPhoto}
                alt="Sivasri R"
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = PERSONAL_INFO.photoFallback || 'https://github.com/sivasri-developer.png';
                }}
              />
            </div>

            <div className="text-center sm:text-left flex-1">
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-1">
                {PERSONAL_INFO.name}
              </h1>
              <p className="text-sm font-black text-emerald-700 dark:text-emerald-300 uppercase tracking-wider mb-3">
                Software Developer • MCA Student • MERN Stack, Java, SQL & Web Specialist
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-extrabold text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  {PERSONAL_INFO.phone}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-emerald-600" />
                  {PERSONAL_INFO.email}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  {PERSONAL_INFO.location}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Summary */}
          <div>
            <h2 className="text-sm font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300 mb-2 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-600" />
              <span>Career Profile Summary</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium">
              {PERSONAL_INFO.fullBio}
            </p>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-sm font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300 mb-3 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              <span>Academic Qualifications</span>
            </h2>
            <div className="space-y-4">
              {TIMELINE.filter((t) => t.type === 'Education').map((edu) => (
                <div key={edu.id} className="text-xs sm:text-sm p-3.5 rounded-xl bg-emerald-50 dark:bg-slate-800/80 border border-emerald-200 dark:border-slate-700">
                  <div className="flex justify-between font-black text-slate-900 dark:text-white">
                    <span>{edu.role}</span>
                    <span className="text-emerald-700 dark:text-emerald-300 font-extrabold">{edu.period}</span>
                  </div>
                  <div className="text-slate-700 dark:text-slate-300 font-extrabold mt-1">
                    {edu.organization} ({edu.location}) — <span className="text-emerald-700 dark:text-emerald-300 font-black">{edu.achievementBadge}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-sm font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300 mb-3">
              Technical Core Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-emerald-100/70 dark:bg-slate-800/80 rounded-xl border border-emerald-200 dark:border-slate-700">
                <strong className="block text-slate-900 dark:text-white mb-1 font-black">Full Stack & Web Architecture:</strong>
                <span className="text-slate-700 dark:text-slate-200 font-medium">MERN Stack (MongoDB, Express.js, React, Node.js), HTML5, CSS3, JavaScript ES6+, Responsive Design</span>
              </div>
              <div className="p-3.5 bg-emerald-100/70 dark:bg-slate-800/80 rounded-xl border border-emerald-200 dark:border-slate-700">
                <strong className="block text-slate-900 dark:text-white mb-1 font-black">Programming & Backend:</strong>
                <span className="text-slate-700 dark:text-slate-200 font-medium">Java, Advanced Java, Spring Boot, PHP, Python, Servlets, JSP</span>
              </div>
              <div className="p-3.5 bg-emerald-100/70 dark:bg-slate-800/80 rounded-xl border border-emerald-200 dark:border-slate-700">
                <strong className="block text-slate-900 dark:text-white mb-1 font-black">Databases & Querying:</strong>
                <span className="text-slate-700 dark:text-slate-200 font-medium">MongoDB NoSQL, SQL, MySQL, Oracle, Relational Modeling</span>
              </div>
              <div className="p-3.5 bg-emerald-100/70 dark:bg-slate-800/80 rounded-xl border border-emerald-200 dark:border-slate-700">
                <strong className="block text-slate-900 dark:text-white mb-1 font-black">Development Tools & Analytics:</strong>
                <span className="text-slate-700 dark:text-slate-200 font-medium">VS Code, Apache NetBeans, Power BI, Linux, Git & GitHub, MS Office</span>
              </div>
            </div>
          </div>

          {/* Key Projects */}
          <div>
            <h2 className="text-sm font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300 mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-600" />
              <span>Featured Software Development Projects</span>
            </h2>
            <div className="space-y-4">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="text-xs sm:text-sm p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-emerald-200 dark:border-slate-700">
                  <div className="font-black text-slate-900 dark:text-white flex items-center justify-between">
                    <span>{proj.title}</span>
                    <span className="text-xs font-black text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full">{proj.category}</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-200 font-medium mt-1">
                    {proj.fullDescription}
                  </p>
                  <div className="text-[11px] text-emerald-800 dark:text-emerald-300 font-extrabold mt-2">
                    Technologies: {proj.tags.join(' • ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Distinctions & Certifications */}
          <div>
            <h2 className="text-sm font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300 mb-2 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Certifications & Extracurricular Distinctions</span>
            </h2>
            <ul className="list-disc list-inside text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium space-y-1.5">
              {CERTIFICATIONS.map((c) => (
                <li key={c.id}>
                  <strong>{c.title}</strong> — {c.issuer}
                </li>
              ))}
              <li><strong>2nd Prize Winner</strong> in Inter-College Semantic Memory Competition</li>
              <li><strong>District Gold Medalist in Taekwondo</strong> (State-Level Participant)</li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};
