/**
 * Server-only Resend Email Helper.
 * Dispatches notification emails when a new inquiry is submitted.
 * Designed to be strictly best-effort and non-blocking.
 */

if (typeof window !== 'undefined') {
  throw new Error('Email helper cannot be imported into client components.');
}

import { Resend } from 'resend';

export interface SendInquiryNotificationParams {
  id?: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  createdAt?: Date;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Sends an email notification to the studio team when a new project inquiry is saved.
 * Returns { success: boolean, error?: string } and never throws.
 */
export async function sendInquiryNotification(
  params: SendInquiryNotificationParams
): Promise<{ success: boolean; error?: string }> {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.warn(
        '[Email] RESEND_API_KEY is not configured. Inquiry saved in database; email dispatch skipped.'
      );
      return { success: false, error: 'RESEND_API_KEY missing' };
    }

    const recipient = process.env.CONTACT_EMAIL || 'agastya071@gmail.com';
    const fromAddress = process.env.RESEND_FROM_EMAIL || 'SPAN Studio <onboarding@resend.dev>';
    const resend = new Resend(apiKey);
    const timestampStr = (params.createdAt || new Date()).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
    });

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f17; color: #f0f2f5; margin: 0; padding: 24px; }
    .card { background-color: #131820; border: 1px solid #232c3d; border-radius: 12px; padding: 28px; max-width: 600px; margin: 0 auto; }
    .header { border-bottom: 1px solid #232c3d; padding-bottom: 16px; margin-bottom: 20px; }
    .title { color: #B6063D; font-size: 13px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 6px 0; }
    .heading { color: #f0f2f5; font-size: 20px; font-weight: 700; margin: 0; }
    .field { margin-bottom: 14px; }
    .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #7a889b; margin-bottom: 4px; }
    .value { font-size: 15px; color: #f0f2f5; font-weight: 500; }
    .message-box { background-color: #050507; border: 1px solid #232c3d; border-radius: 8px; padding: 14px; margin-top: 6px; white-space: pre-wrap; font-size: 14px; color: #cbd5e1; line-height: 1.5; }
    .footer { font-size: 12px; color: #4e5d71; margin-top: 24px; padding-top: 14px; border-top: 1px solid #1a222e; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="title">SPAN Studio // New Project Inquiry</div>
      <h1 class="heading">${escapeHtml(params.company)} &mdash; ${escapeHtml(params.service)}</h1>
    </div>
    <div class="field">
      <div class="label">Contact Name</div>
      <div class="value">${escapeHtml(params.name)}</div>
    </div>
    <div class="field">
      <div class="label">Email Address</div>
      <div class="value"><a href="mailto:${escapeHtml(params.email)}" style="color: #B6063D;">${escapeHtml(params.email)}</a></div>
    </div>
    <div class="field">
      <div class="label">Phone / WhatsApp</div>
      <div class="value"><a href="tel:${escapeHtml(params.phone)}" style="color: #f0f2f5;">${escapeHtml(params.phone)}</a></div>
    </div>
    <div class="field">
      <div class="label">Company / Facility</div>
      <div class="value">${escapeHtml(params.company)}</div>
    </div>
    <div class="field">
      <div class="label">Primary Service Requested</div>
      <div class="value">${escapeHtml(params.service)}</div>
    </div>
    <div class="field">
      <div class="label">Project Scope &amp; Brief</div>
      <div class="message-box">${escapeHtml(params.message)}</div>
    </div>
    <div class="footer">
      Submitted at ${timestampStr} (IST) &middot; Destination: ${escapeHtml(recipient)}
    </div>
  </div>
</body>
</html>
    `.trim();

    const textContent = `
NEW SPAN STUDIO PROJECT INQUIRY
================================
Company: ${params.company}
Service: ${params.service}
Name: ${params.name}
Email: ${params.email}
Phone: ${params.phone}
Timestamp: ${timestampStr} (IST)

PROJECT SCOPE & OBJECTIVES:
---------------------------
${params.message}
================================
    `.trim();

    const { error } = await resend.emails.send({
      from: fromAddress,
      to: recipient,
      replyTo: params.email,
      subject: `New SPAN Studio Project Inquiry: ${params.company} — ${params.service}`,
      text: textContent,
      html: htmlContent,
    });

    if (error) {
      console.error('[Email] Resend API error (non-blocking):', error.message || error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown email error';
    console.error('[Email] Unexpected error during notification dispatch (non-blocking):', errorMsg);
    return { success: false, error: errorMsg };
  }
}
