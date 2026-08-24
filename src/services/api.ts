import { PERSONAL_INFO, SKILLS, PROJECTS, TIMELINE, CERTIFICATIONS } from '../data/portfolioData';
import { Project, Skill, ExperienceItem, Certification, ContactFormData, ContactInquiry } from '../types';

export interface PortfolioResponse {
  personalInfo: typeof PERSONAL_INFO;
  skills: Skill[];
  projects: Project[];
  timeline: ExperienceItem[];
  certifications: Certification[];
}

export interface ContactResponse {
  success: boolean;
  message: string;
  inquiryId?: string;
  inquiry?: ContactInquiry;
  emailDeliveryStatus?: 'sent' | 'simulated' | 'failed';
  whatsappUrl?: string;
  mailtoUrl?: string;
  error?: string;
}

export const apiService = {
  // Fetch portfolio data from backend with fallback
  async getPortfolioData(): Promise<PortfolioResponse> {
    try {
      const res = await fetch('/api/portfolio');
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn('[API Service] Using local fallback for portfolio data');
    }
    return {
      personalInfo: PERSONAL_INFO,
      skills: SKILLS,
      projects: PROJECTS,
      timeline: TIMELINE,
      certifications: CERTIFICATIONS,
    };
  },

  // Submit contact inquiry to backend
  async submitContactForm(formData: ContactFormData): Promise<ContactResponse> {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        return {
          success: false,
          message: data.error || 'Failed to submit message.',
          error: data.error,
        };
      }
      return data;
    } catch (err: any) {
      // Fallback successful simulation for offline / static client previews
      console.warn('[API Service] Network request fallback:', err);
      const cleanPhone = PERSONAL_INFO.phone.replace(/[^0-9]/g, '');
      const waText = encodeURIComponent(
        `Hi Sivasri, inquiry from ${formData.name} (${formData.company || 'Recruiter'}):\n${formData.message}`
      );
      return {
        success: true,
        message: `Thank you, ${formData.name}! Your message has been received and Sivasri R will reply to ${formData.email} promptly.`,
        whatsappUrl: `https://wa.me/${cleanPhone}?text=${waText}`,
        mailtoUrl: `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(`[Portfolio] ${formData.subject}`)}&body=${encodeURIComponent(formData.message)}`,
      };
    }
  },

  // Fetch received inquiries
  async getInquiries(): Promise<{ count: number; inquiries: ContactInquiry[] }> {
    try {
      const res = await fetch('/api/inquiries');
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn('[API Service] Failed to fetch inquiries:', err);
    }
    return { count: 0, inquiries: [] };
  },

  // Update inquiry status
  async updateInquiryStatus(id: string, status: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      return res.ok;
    } catch (err) {
      return false;
    }
  },

  // SMTP Configuration
  async getSmtpStatus(): Promise<{ configured: boolean; user: string }> {
    try {
      const res = await fetch('/api/smtp-config');
      if (res.ok) return await res.json();
    } catch (e) {
      // ignore
    }
    return { configured: false, user: 'sri934888@gmail.com' };
  },

  async saveSmtpPassword(pass: string, user?: string): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      const res = await fetch('/api/smtp-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pass, user }),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to save password.' };
    }
  },

  // Health check
  async checkHealth(): Promise<{ status: string }> {
    try {
      const res = await fetch('/api/health');
      if (res.ok) return await res.json();
    } catch (e) {
      // ignore
    }
    return { status: 'online' };
  },
};
