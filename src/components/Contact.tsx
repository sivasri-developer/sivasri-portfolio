import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { apiService, ContactResponse } from '../services/api';
import { ContactFormData } from '../types';
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
  AlertCircle,
  Building,
  Smartphone,
  ShieldCheck,
  RotateCcw,
  MessageSquare,
} from 'lucide-react';

interface ContactProps {
  onShowToast?: (message: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ onShowToast }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastSubmissionResponse, setLastSubmissionResponse] = useState<ContactResponse | null>(null);

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    type: 'Job Opportunity',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    if (onShowToast) onShowToast('Email address copied to clipboard!');
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    if (onShowToast) onShowToast('Phone number copied to clipboard!');
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleCopySummary = () => {
    const summaryText = `[Inquiry for Sivasri R]\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'N/A'}\nCompany: ${formData.company || 'N/A'}\nCategory: ${formData.type}\nSubject: ${formData.subject}\nMessage: ${formData.message}`;
    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    if (onShowToast) onShowToast('Inquiry details copied to clipboard!');
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await apiService.submitContactForm(formData);
      if (response.success) {
        setSubmitted(true);
        setLastSubmissionResponse(response);
        if (onShowToast) onShowToast('Message sent! Notification & confirmation delivered.');
      } else {
        setErrorMessage(response.error || 'Failed to submit form.');
      }
    } catch (err: any) {
      setErrorMessage('Unable to deliver message right now. Please email directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bright-highlight-badge text-xs uppercase tracking-wider mb-3">
            <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />
            <span>Direct Communication & Inquiries</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Contact Sivasri R
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-700 dark:text-slate-200 font-medium">
            Open for Software Engineer positions, Java developer roles, and technical project collaborations.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Availability Highlight Banner */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white shadow-2xl relative overflow-hidden border-2 border-emerald-400">
              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-black mb-3 backdrop-blur-xs border border-white/30">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 animate-pulse" />
                  <span>Immediate Availability</span>
                </span>
                <h2 className="text-2xl font-black mb-1">{PERSONAL_INFO.name}</h2>
                <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed mb-4">
                  MCA Student & Software Developer with hands-on Java enterprise, SQL, and Web Development experience.
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
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-sm font-black text-slate-900 dark:text-white hover:text-emerald-600 transition-colors"
                  >
                    {PERSONAL_INFO.email}
                  </a>
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
                  <a
                    href={`tel:${PERSONAL_INFO.phone}`}
                    className="text-sm font-black text-slate-900 dark:text-white hover:text-teal-600 transition-colors"
                  >
                    {PERSONAL_INFO.phone}
                  </a>
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
                <span className="text-sm font-black text-slate-900 dark:text-white">GitHub</span>
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl glass-card border-2 border-emerald-300 dark:border-emerald-700 hover:border-blue-500 transition-all flex items-center justify-center gap-3 group cursor-pointer"
              >
                <Linkedin className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-black text-slate-900 dark:text-white">LinkedIn</span>
              </a>
            </div>

          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7 glass-card p-8 rounded-3xl border-2 border-emerald-300/80 dark:border-emerald-500/30 shadow-2xl">
            {submitted ? (
              <div className="py-6 space-y-6">
                
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500 text-white mx-auto flex items-center justify-center mb-3 shadow-lg">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-1">
                    Message Dispatched Successfully!
                  </h3>
                  <p className="text-slate-700 dark:text-slate-200 text-sm font-medium max-w-md mx-auto">
                    Thank you, <strong>{formData.name}</strong>! Your inquiry is logged and queued for Sivasri R.
                  </p>
                </div>

                {/* Status Cards */}
                <div className="space-y-3 bg-emerald-50/70 dark:bg-slate-800/80 border border-emerald-300/70 dark:border-emerald-600/40 rounded-2xl p-5 text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase text-emerald-900 dark:text-emerald-300">
                        Direct Notification Sent
                      </h4>
                      <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                        Sent to Sivasri's inbox (<strong>{PERSONAL_INFO.email}</strong>) with all inquiry details.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase text-teal-900 dark:text-teal-300">
                        Confirmation Copy
                      </h4>
                      <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                        Confirmation email dispatched to <strong>{formData.email}</strong>.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    onClick={handleCopySummary}
                    className="flex-1 py-3 px-4 rounded-xl border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 text-xs font-black flex items-center justify-center gap-2 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    {copiedSummary ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedSummary ? 'Summary Copied!' : 'Copy Submission Summary'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        company: '',
                        subject: '',
                        message: '',
                        type: 'Job Opportunity',
                      });
                    }}
                    className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Send Another Message</span>
                  </button>
                </div>

              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-emerald-200 dark:border-emerald-800">
                  <div>
                    <h2 className="text-xl font-black text-slate-900 dark:text-white">
                      Send a Direct Message
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                      Delivers immediately to Sivasri's inbox & phone
                    </p>
                  </div>
                  <span className="text-xs font-black text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-700">
                    ⚡ Auto-Receipt
                  </span>
                </div>

                {errorMessage && (
                  <div className="p-3.5 rounded-2xl bg-rose-100 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Recruiter Name / HR"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold border-2 border-emerald-300 dark:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-1.5">
                      Your Email (For Confirmation) *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. recruiter@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold border-2 border-emerald-300 dark:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-1.5 flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Phone / WhatsApp (Optional)</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold border-2 border-emerald-300 dark:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-1.5 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Company / Org (Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Tech Corp / Startup"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold border-2 border-emerald-300 dark:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-1.5">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold border-2 border-emerald-300 dark:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Job Opportunity">Job Opportunity / Recruitment</option>
                      <option value="Project Collaboration">Software Project Collaboration</option>
                      <option value="General Inquiry">General Technical Inquiry</option>
                      <option value="Mentorship">Technical Mentorship</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Software Developer Opening"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold border-2 border-emerald-300 dark:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-1.5">
                    Message Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Hello Sivasri R, we reviewed your qualifications and projects and would like to discuss an opportunity..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold border-2 border-emerald-300 dark:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                  <span>{loading ? 'Dispatching Message...' : 'Send Message to Sivasri R'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
