export interface Project {
  id: string;
  title: string;
  category: 'MERN' | 'Java' | 'Full Stack' | 'Web App';
  shortDescription: string;
  fullDescription: string;
  image: string;
  tags: string[];
  features: string[];
  githubUrl: string;
  liveUrl?: string;
  architectureNotes?: string;
  stars?: number;
  highlighted?: boolean;
}

export interface Skill {
  name: string;
  category: 'Languages' | 'Frontend' | 'Backend' | 'Databases' | 'Tools & Platforms';
  proficiency: number; // 0-100
  level: 'Advanced' | 'Proficient' | 'Intermediate';
  icon: string; // Lucide icon name or SVG representation
  years: string;
  color: string;
  description: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  type: 'Education' | 'Internship' | 'Project' | 'Certification';
  period: string;
  location: string;
  description: string[];
  skillsUsed: string[];
  achievementBadge?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  skills: string[];
  badgeColor: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: 'General Inquiry' | 'Job Opportunity' | 'Project Collaboration' | 'Mentorship';
}
