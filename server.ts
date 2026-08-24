import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import nodemailer from 'nodemailer';
import { createServer as createViteServer } from 'vite';
import { PERSONAL_INFO, SKILLS, PROJECTS, TIMELINE, CERTIFICATIONS } from './src/data/portfolioData';

interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  type: string;
  timestamp: string;
  status: 'New' | 'Viewed' | 'Responded' | 'Archived';
  emailDeliveryStatus: 'sent' | 'simulated' | 'failed';
  confirmationSent: boolean;
}

const INQUIRIES_FILE = path.join(process.cwd(), 'inquiries.json');
const SMTP_CONFIG_FILE = path.join(process.cwd(), 'smtp-config.json');

// Helper to load persistent inquiries
function loadInquiries(): ContactInquiry[] {
  try {
    if (fs.existsSync(INQUIRIES_FILE)) {
      const data = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Failed to read inquiries file:', err);
  }
  return [];
}

// Helper to save persistent inquiries
function saveInquiries(inquiries: ContactInquiry[]) {
  try {
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2));
  } catch (err) {
    console.error('Failed to save inquiries file:', err);
  }
}

const inquiriesStore: ContactInquiry[] = loadInquiries();

// Helper to load SMTP config if saved via UI
function loadSmtpConfig(): { user: string; pass: string } | null {
  try {
    if (fs.existsSync(SMTP_CONFIG_FILE)) {
      const data = fs.readFileSync(SMTP_CONFIG_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Failed to read smtp config file:', err);
  }
  return null;
}

// Lazy Nodemailer Transporter
function getMailTransporter() {
  const customConfig = loadSmtpConfig();
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = customConfig?.user || process.env.SMTP_USER || process.env.NOTIFICATION_EMAIL || 'sri934888@gmail.com';
  const pass = customConfig?.pass || process.env.SMTP_PASS;

  if (!pass) {
    return null;
  }

  return {
    transporter: nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user, pass },
    }),
    senderEmail: user,
  };
}

async function sendNotificationAndConfirmationEmails(inquiry: ContactInquiry) {
  const mailSetup = getMailTransporter();
  const receiverEmail = process.env.NOTIFICATION_EMAIL || PERSONAL_INFO.email;

  if (!mailSetup) {
    console.log(`[Email Dispatch Simulation]
    To Sivasri: ${receiverEmail}
    From Recruiter: ${inquiry.name} <${inquiry.email}>
    Subject: ${inquiry.subject}
    Company: ${inquiry.company || 'N/A'}
    Phone: ${inquiry.phone || 'N/A'}
    Message: ${inquiry.message}
    (Set SMTP_USER and SMTP_PASS in secrets for live SMTP transport)`);
    return { delivered: false, simulated: true, adminSent: false, recruiterSent: false };
  }

  const { transporter, senderEmail } = mailSetup;
  let adminSent = false;
  let recruiterSent = false;

  try {
    // 1. Send alert email to Sivasri
    const info1 = await transporter.sendMail({
      from: `"Sivasri R (Portfolio Alerts)" <${senderEmail}>`,
      to: receiverEmail,
      replyTo: inquiry.email,
      subject: `🚀 [New Inquiry] ${inquiry.subject} — From ${inquiry.name} (${inquiry.company || 'Recruiter'})`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; color: #1e293b;">
          <div style="background: linear-gradient(135deg, #059669 0%, #0d9488 100%); padding: 28px; color: #ffffff;">
            <h1 style="margin: 0 0 6px; font-size: 22px; font-weight: 800;">New Recruiter / Direct Inquiry</h1>
            <p style="margin: 0; font-size: 14px; opacity: 0.9;">Received via your personal portfolio website</p>
          </div>
          <div style="padding: 24px;">
            <div style="background: #f8fafc; border-left: 4px solid #10b981; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 0 0 8px; font-size: 14px;"><strong>From:</strong> ${inquiry.name}</p>
              <p style="margin: 0 0 8px; font-size: 14px;"><strong>Email:</strong> <a href="mailto:${inquiry.email}" style="color: #059669; text-decoration: none;">${inquiry.email}</a></p>
              <p style="margin: 0 0 8px; font-size: 14px;"><strong>Phone / Contact:</strong> ${inquiry.phone || 'Not provided'}</p>
              <p style="margin: 0 0 8px; font-size: 14px;"><strong>Company / Org:</strong> ${inquiry.company || 'Not provided'}</p>
              <p style="margin: 0; font-size: 14px;"><strong>Category:</strong> ${inquiry.type}</p>
            </div>
            
            <h3 style="margin: 0 0 10px; font-size: 16px; color: #0f172a;">Message:</h3>
            <div style="background: #ffffff; border: 1px solid #cbd5e1; padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${inquiry.message}</div>

            <div style="margin-top: 24px; text-align: center;">
              <a href="mailto:${inquiry.email}?subject=Re:%20${encodeURIComponent(inquiry.subject)}" style="display: inline-block; background: #059669; color: #ffffff; font-weight: bold; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; margin-right: 10px;">Reply to Recruiter</a>
              ${inquiry.phone ? `<a href="https://wa.me/${inquiry.phone.replace(/[^0-9]/g, '')}" style="display: inline-block; background: #25D366; color: #ffffff; font-weight: bold; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px;">Chat on WhatsApp</a>` : ''}
            </div>
          </div>
          <div style="background: #f1f5f9; padding: 14px 24px; font-size: 12px; color: #64748b; text-align: center;">
            Timestamp: ${new Date(inquiry.timestamp).toLocaleString()} • Sivasri R Portfolio
          </div>
        </div>
      `,
    });
    console.log('✅ Admin alert sent via Gmail SMTP:', info1.messageId);
    adminSent = true;
  } catch (adminErr) {
    console.error('❌ Failed to send admin email:', adminErr);
  }

  try {
    // 2. Send automated confirmation email to the recruiter
    const info2 = await transporter.sendMail({
      from: `"Sivasri R" <${senderEmail}>`,
      to: inquiry.email,
      replyTo: senderEmail,
      subject: `Thank you for reaching out, ${inquiry.name}! — Sivasri R`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; color: #1e293b;">
          <div style="background: linear-gradient(135deg, #059669 0%, #0d9488 100%); padding: 28px; color: #ffffff; text-align: center;">
            <h1 style="margin: 0 0 6px; font-size: 24px; font-weight: 800;">Message Received!</h1>
            <p style="margin: 0; font-size: 14px; opacity: 0.9;">Thank you for contacting Sivasri R</p>
          </div>
          <div style="padding: 28px;">
            <p style="font-size: 15px; line-height: 1.6; margin: 0 0 16px;">Dear <strong>${inquiry.name}</strong>,</p>
            <p style="font-size: 14px; line-height: 1.6; color: #334155; margin: 0 0 16px;">
              Thank you for connecting with me regarding <strong>"${inquiry.subject}"</strong>. I have received your message and will review it and get back to you promptly at this email address (<strong>${inquiry.email}</strong>).
            </p>
            
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin: 20px 0;">
              <h4 style="margin: 0 0 10px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b;">Summary of your inquiry:</h4>
              <p style="margin: 0 0 6px; font-size: 13px;"><strong>Topic:</strong> ${inquiry.type}</p>
              <p style="margin: 0; font-size: 13px; color: #475569; font-style: italic;">"${inquiry.message}"</p>
            </div>

            <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 24px;">
              <h4 style="margin: 0 0 10px; font-size: 14px; color: #0f172a;">Direct Contact Details:</h4>
              <p style="margin: 0 0 4px; font-size: 13px;">📧 Email: <a href="mailto:${PERSONAL_INFO.email}" style="color: #059669; text-decoration: none;">${PERSONAL_INFO.email}</a></p>
              <p style="margin: 0 0 4px; font-size: 13px;">📱 Phone / WhatsApp: <a href="tel:${PERSONAL_INFO.phone}" style="color: #059669; text-decoration: none;">${PERSONAL_INFO.phone}</a></p>
              <p style="margin: 0 0 4px; font-size: 13px;">💼 LinkedIn: <a href="${PERSONAL_INFO.linkedin}" style="color: #0284c7; text-decoration: none;">linkedin.com/in/sivasri-ravi-369000299</a></p>
              <p style="margin: 0 0 4px; font-size: 13px;">🐙 GitHub: <a href="${PERSONAL_INFO.github}" style="color: #0f172a; text-decoration: none;">github.com/sivasri-developer</a></p>
            </div>
          </div>
          <div style="background: #f1f5f9; padding: 14px 24px; font-size: 12px; color: #64748b; text-align: center;">
            Sivasri R • Master of Computer Applications (MCA) • Software Developer
          </div>
        </div>
      `,
    });
    console.log('✅ Recruiter confirmation sent via Gmail SMTP:', info2.messageId);
    recruiterSent = true;
  } catch (recruiterErr) {
    console.error('❌ Failed to send recruiter confirmation email:', recruiterErr);
  }

  console.log(`[Email Dispatch Result] Admin sent: ${adminSent}, Recruiter confirmation sent: ${recruiterSent}`);
  return { delivered: adminSent || recruiterSent, adminSent, recruiterSent, simulated: false };
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for JSON body parsing with large payload support for images
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // ==================== REST API ENDPOINTS ====================

  // 1. Photo Upload Endpoint for Custom Profile Photos
  app.post('/api/upload-photo', (req: Request, res: Response) => {
    try {
      const { imageBase64 } = req.body;
      if (!imageBase64 || typeof imageBase64 !== 'string') {
        return res.status(400).json({ error: 'Missing imageBase64 data' });
      }
      const matches = imageBase64.match(/^data:image\/[a-zA-Z0-9+]+;base64,(.+)$/);
      const rawData = matches ? matches[1] : imageBase64;
      const buffer = Buffer.from(rawData, 'base64');
      const publicDir = path.join(process.cwd(), 'public');
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }
      fs.writeFileSync(path.join(publicDir, 'sivasri_photo.png'), buffer);
      fs.writeFileSync(path.join(publicDir, 'profile.jpg'), buffer);

      // Also copy to dist if dist exists
      const distDir = path.join(process.cwd(), 'dist');
      if (fs.existsSync(distDir)) {
        fs.writeFileSync(path.join(distDir, 'sivasri_photo.png'), buffer);
        fs.writeFileSync(path.join(distDir, 'profile.jpg'), buffer);
      }

      console.log('✅ Successfully saved uploaded profile photo to public/sivasri_photo.png');
      return res.json({ success: true, url: `/sivasri_photo.png?t=${Date.now()}` });
    } catch (err) {
      console.error('Failed to save profile photo:', err);
      return res.status(500).json({ error: 'Failed to save profile photo' });
    }
  });

  // 2. Health & Server Status Endpoint
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'online',
      service: 'Sivasri R Portfolio Backend Service',
      version: '2.0.0',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  });

  // 2. Full Portfolio Data Endpoint
  app.get('/api/portfolio', (req: Request, res: Response) => {
    res.json({
      personalInfo: PERSONAL_INFO,
      skills: SKILLS,
      projects: PROJECTS,
      timeline: TIMELINE,
      certifications: CERTIFICATIONS,
    });
  });

  // 3. Skills by Category Endpoint
  app.get('/api/skills', (req: Request, res: Response) => {
    const { category } = req.query;
    if (category && typeof category === 'string' && category !== 'All') {
      const filtered = SKILLS.filter(
        (s) => s.category.toLowerCase() === category.toLowerCase()
      );
      return res.json(filtered);
    }
    res.json(SKILLS);
  });

  // 4. Projects Endpoint
  app.get('/api/projects', (req: Request, res: Response) => {
    res.json(PROJECTS);
  });

  // 5. Internships & Experience Endpoint
  app.get('/api/experience', (req: Request, res: Response) => {
    const { type } = req.query;
    if (type && typeof type === 'string') {
      const filtered = TIMELINE.filter(
        (t) => t.type.toLowerCase() === type.toLowerCase()
      );
      return res.json(filtered);
    }
    res.json(TIMELINE);
  });

  // 6. Contact Form Submission (POST)
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      const { name, email, phone, company, subject, message, type } = req.body;

      // Validation
      if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return res.status(400).json({
          success: false,
          error: 'Please provide a valid name (at least 2 characters).',
        });
      }

      if (
        !email ||
        typeof email !== 'string' ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ) {
        return res.status(400).json({
          success: false,
          error: 'Please provide a valid email address.',
        });
      }

      if (!message || typeof message !== 'string' || message.trim().length < 5) {
        return res.status(400).json({
          success: false,
          error: 'Please provide a detailed message (at least 5 characters).',
        });
      }

      const inquiry: ContactInquiry = {
        id: `inq_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        name: name.trim(),
        email: email.trim(),
        phone: phone ? phone.trim() : undefined,
        company: company ? company.trim() : undefined,
        subject: subject ? subject.trim() : 'Portfolio Contact Inquiry',
        message: message.trim(),
        type: type || 'General Inquiry',
        timestamp: new Date().toISOString(),
        status: 'New',
        emailDeliveryStatus: 'simulated',
        confirmationSent: true,
      };

      // Attempt sending email to Sivasri and automated confirmation to recruiter
      const emailResult = await sendNotificationAndConfirmationEmails(inquiry);
      inquiry.emailDeliveryStatus = emailResult.delivered
        ? 'sent'
        : emailResult.simulated
        ? 'simulated'
        : 'failed';

      inquiriesStore.unshift(inquiry);
      saveInquiries(inquiriesStore);

      console.log(`[Contact Service] New inquiry saved & processed from ${inquiry.name} (${inquiry.email})`);

      // Construct direct WhatsApp dispatch URL for instant mobile reach
      const cleanPhone = PERSONAL_INFO.phone.replace(/[^0-9]/g, '');
      const waText = encodeURIComponent(
        `Hi Sivasri, I submitted an inquiry through your portfolio website:\n\n` +
        `👤 Name: ${inquiry.name}\n` +
        `🏢 Company: ${inquiry.company || 'N/A'}\n` +
        `📧 Email: ${inquiry.email}\n` +
        `📱 Phone: ${inquiry.phone || 'N/A'}\n` +
        `📌 Topic: ${inquiry.type}\n` +
        `📝 Subject: ${inquiry.subject}\n` +
        `💬 Message: ${inquiry.message}`
      );
      const whatsappUrl = `https://wa.me/${cleanPhone}?text=${waText}`;

      // Construct direct Mailto URL
      const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
        `[Portfolio] ${inquiry.subject} - ${inquiry.name}`
      )}&body=${encodeURIComponent(
        `From: ${inquiry.name} (${inquiry.email})\nCompany: ${inquiry.company || 'N/A'}\nPhone: ${inquiry.phone || 'N/A'}\n\nMessage:\n${inquiry.message}`
      )}`;

      return res.status(201).json({
        success: true,
        message: `Thank you, ${inquiry.name}! Sivasri R has received your message. A confirmation copy has been queued for ${inquiry.email}.`,
        inquiryId: inquiry.id,
        inquiry,
        emailDeliveryStatus: inquiry.emailDeliveryStatus,
        whatsappUrl,
        mailtoUrl,
      });
    } catch (err: any) {
      console.error('[Contact Service Error]', err);
      return res.status(500).json({
        success: false,
        error: 'Failed to process inquiry. Please try again later or email sri934888@gmail.com directly.',
      });
    }
  });

  // 7. Get Recent Inquiries (For Sivasri's management portal)
  app.get('/api/inquiries', (req: Request, res: Response) => {
    res.json({
      count: inquiriesStore.length,
      inquiries: inquiriesStore,
    });
  });

  // 8. Update Inquiry Status (e.g. mark as Viewed, Responded, Archived)
  app.patch('/api/inquiries/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const item = inquiriesStore.find((i) => i.id === id);
    if (!item) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }
    if (status) {
      item.status = status;
      saveInquiries(inquiriesStore);
    }
    res.json({ success: true, inquiry: item });
  });

  // 9. Delete / Clear Inquiry
  app.delete('/api/inquiries/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const index = inquiriesStore.findIndex((i) => i.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }
    inquiriesStore.splice(index, 1);
    saveInquiries(inquiriesStore);
    res.json({ success: true, message: 'Inquiry removed' });
  });

  // 10. SMTP App Password Configuration Endpoints
  app.get('/api/smtp-config', (req: Request, res: Response) => {
    const cfg = loadSmtpConfig();
    res.json({
      configured: !!(cfg?.pass || process.env.SMTP_PASS),
      user: cfg?.user || process.env.SMTP_USER || 'sri934888@gmail.com',
    });
  });

  app.post('/api/smtp-config', (req: Request, res: Response) => {
    try {
      const { user, pass } = req.body;
      if (!pass || typeof pass !== 'string' || pass.trim().length < 8) {
        return res.status(400).json({ error: 'Please provide a valid 16-character App Password.' });
      }
      const cleanPass = pass.replace(/\s+/g, '');
      const config = {
        user: (user && user.trim()) || 'sri934888@gmail.com',
        pass: cleanPass,
      };
      fs.writeFileSync(SMTP_CONFIG_FILE, JSON.stringify(config, null, 2));
      console.log('✅ Successfully saved custom SMTP App Password config');
      res.json({ success: true, message: 'Gmail App Password saved and active!' });
    } catch (err: any) {
      console.error('Failed to save smtp config:', err);
      res.status(500).json({ error: 'Failed to save configuration.' });
    }
  });

  // ==================== VITE CLIENT INTEGRATION ====================

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend & Frontend Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
