import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import {
  Mail,
  Send,
  MapPin,
  Github,
  Linkedin,
  Phone,
  Copy,
  Check,
  CheckCircle2,
  Sparkles,
  MessageSquare,
} from 'lucide-react';

export const Contact: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'Job Opportunity',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section id="contact" className="py-20 relative bg-emerald-50/50 dark:bg-[#0b1612] z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bright-highlight-badge text-xs uppercase tracking-wider mb-3">
            <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />
            <span>Connect & Contact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Let's Connect & Build Scalable Applications
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-700 dark:text-slate-200 font-medium">
            Open for Software Engineer roles, Web Development positions, and technical inquiries.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Availability Highlight Banner */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white shadow-2xl relative overflow-hidden border-2 border-emerald-400">
              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-black mb-3 backdrop-blur-xs border border-white/30">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 animate-pulse" />
                  <span>Immediate Availability</span>
                </span>
                <h3 className="text-2xl font-black mb-2">{PERSONAL_INFO.name}</h3>
                <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed mb-4">
                  MCA Student & Software Developer with hands-on Java, SQL, Spring Boot, and Web Development experience.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-black bg-black/30 p-2.5 rounded-xl border border-white/20">
                    <Mail className="w-4 h-4 text-emerald-300 shrink-0" />
                    <span className="truncate">{PERSONAL_INFO.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-black bg-black/30 p-2.5 rounded-xl border border-white/20">
                    <Phone className="w-4 h-4 text-emerald-300 shrink-0" />
                    <span>{PERSONAL_INFO.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="glass-card p-6 rounded-3xl border-2 border-emerald-300/80 dark:border-emerald-500/30 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-black text-emerald-800 dark:text-emerald-300 block uppercase">
                    Email Address
                  </span>
                  <span className="text-sm font-black text-slate-900 dark:text-white">
                    {PERSONAL_INFO.email}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="p-3 rounded-xl text-emerald-800 dark:text-emerald-200 hover:bg-emerald-100 dark:hover:bg-slate-800 border-2 border-emerald-300 dark:border-emerald-700 transition-colors cursor-pointer"
                title="Copy Email Address"
              >
                {copiedEmail ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>

            {/* Phone Card */}
            <div className="glass-card p-6 rounded-3xl border-2 border-emerald-300/80 dark:border-emerald-500/30 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-500 text-white flex items-center justify-center shrink-0 shadow-md">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-black text-teal-800 dark:text-teal-300 block uppercase">
                    Phone Number
                  </span>
                  <span className="text-sm font-black text-slate-900 dark:text-white">
                    {PERSONAL_INFO.phone}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCopyPhone}
                className="p-3 rounded-xl text-emerald-800 dark:text-emerald-200 hover:bg-emerald-100 dark:hover:bg-slate-800 border-2 border-emerald-300 dark:border-emerald-700 transition-colors cursor-pointer"
                title="Copy Phone Number"
              >
                {copiedPhone ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>

            {/* Location Card */}
            <div className="glass-card p-6 rounded-3xl border-2 border-emerald-300/80 dark:border-emerald-500/30 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-black text-emerald-800 dark:text-emerald-300 block uppercase">
                  Location
                </span>
                <span className="text-sm font-black text-slate-900 dark:text-white">
                  {PERSONAL_INFO.location}
                </span>
              </div>
            </div>

            {/* Social Profiles Grid */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl glass-card border-2 border-emerald-300 dark:border-emerald-700 hover:border-emerald-500 transition-all flex items-center justify-center gap-3 group cursor-pointer"
              >
                <Github className="w-6 h-6 text-slate-900 dark:text-white group-hover:scale-110 transition-transform" />
                <span className="text-sm font-black text-slate-900 dark:text-white">GitHub Profile</span>
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl glass-card border-2 border-emerald-300 dark:border-emerald-700 hover:border-blue-500 transition-all flex items-center justify-center gap-3 group cursor-pointer"
              >
                <Linkedin className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-black text-slate-900 dark:text-white">LinkedIn Profile</span>
              </a>
            </div>

          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7 glass-card p-8 rounded-3xl border-2 border-emerald-300/80 dark:border-emerald-500/30 shadow-2xl">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-emerald-500 text-white mx-auto flex items-center justify-center mb-4 shadow-lg">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                  Message Delivered!
                </h3>
                <p className="text-slate-700 dark:text-slate-200 text-sm font-medium max-w-md mx-auto mb-6">
                  Thank you for reaching out, {formData.name}! Sivasri R will get back to you at {formData.email} promptly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '', type: 'Job Opportunity' });
                  }}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-full text-xs sm:text-sm cursor-pointer shadow-md"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-emerald-200 dark:border-emerald-800">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    Send a Direct Message
                  </h3>
                  <span className="text-xs font-black text-emerald-700 dark:text-emerald-300">
                    ⚡ Fast Response
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hiring Manager"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold border-2 border-emerald-300 dark:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. recruiter@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold border-2 border-emerald-300 dark:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-2">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold border-2 border-emerald-300 dark:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Job Opportunity">Job Opportunity / Recruitment</option>
                      <option value="Project Collaboration">Software Project Collaboration</option>
                      <option value="General Inquiry">General Technical Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-2">
                      Subject Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Software Developer Role"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold border-2 border-emerald-300 dark:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-2">
                    Message Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Hello Sivasri R, we reviewed your resume and would like to invite you for an interview..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold border-2 border-emerald-300 dark:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                  <span>{loading ? 'Sending Message...' : 'Send Message To Sivasri R'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
