/* ═══════════════════════════════════════════════════════════
   EMAIL SERVICE — SendGrid
   ───────────────────────────────────────────────────────────
   TO CONNECT: Add to server/.env
     SENDGRID_API_KEY=SG.your_key_here
     EMAIL_FROM=no-reply@agroconnect.ng   (optional)
   ═══════════════════════════════════════════════════════════ */

const API_KEY    = process.env['SENDGRID_API_KEY'];
const FROM_EMAIL = process.env['EMAIL_FROM'] ?? 'no-reply@agroconnect.ng';
const FROM_NAME  = 'AgroConnect';
const BASE_URL   = 'https://api.sendgrid.com/v3/mail/send';

const isConfigured = (): boolean => Boolean(API_KEY);

interface SendResult {
  sent:    boolean;
  devMode: boolean;
}

/* ── Core send function ── */
export async function sendEmail(opts: {
  to:      string;
  subject: string;
  html:    string;
  text?:   string;
}): Promise<SendResult> {
  if (!isConfigured()) {
    console.log(`[EMAIL:dev] To: ${opts.to} | Subject: ${opts.subject}`);
    return { sent: true, devMode: true };
  }

  const body = {
    personalizations: [{ to: [{ email: opts.to }] }],
    from:    { email: FROM_EMAIL, name: FROM_NAME },
    subject: opts.subject,
    content: [
      ...(opts.text ? [{ type: 'text/plain', value: opts.text }] : []),
      { type: 'text/html', value: opts.html },
    ],
  };

  const res = await fetch(BASE_URL, {
    method:  'POST',
    headers: {
      Authorization:  `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`SendGrid error ${res.status}: ${err}`);
  }

  return { sent: true, devMode: false };
}

/* ══════════════════════════════════════════
   EMAIL TEMPLATES
   All return { subject, html } — call sendEmail() with these.
══════════════════════════════════════════ */

const base = (content: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <style>
    body { margin:0; padding:0; background:#F9FAFB; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    .wrap { max-width:560px; margin:40px auto; background:white; border-radius:16px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,.08); }
    .header { background:linear-gradient(135deg,#1E8B4C,#25A55A); padding:32px 36px; text-align:center; }
    .header h1 { color:white; font-size:24px; font-weight:800; margin:0; }
    .header p  { color:rgba(255,255,255,.8); font-size:14px; margin:6px 0 0; }
    .body   { padding:32px 36px; }
    .footer { background:#F3F4F6; padding:20px 36px; text-align:center; font-size:12px; color:#9CA3AF; }
    h2  { font-size:20px; font-weight:700; color:#111827; margin:0 0 8px; }
    p   { font-size:15px; color:#374151; line-height:1.6; margin:0 0 16px; }
    .btn { display:inline-block; padding:13px 28px; background:#1E8B4C; color:white; text-decoration:none; border-radius:10px; font-weight:700; font-size:15px; margin:8px 0 16px; }
    .otp-box { font-size:36px; font-weight:800; letter-spacing:10px; color:#1E8B4C; background:#F0FDF4; border:2px solid #BBF7D0; border-radius:12px; padding:16px 24px; text-align:center; margin:16px 0; }
    .item-row { display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #F3F4F6; font-size:14px; color:#374151; }
    .total-row { display:flex; justify-content:space-between; padding:12px 0 0; font-size:16px; font-weight:800; color:#111827; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="header">
      <h1>AgroConnect</h1>
      <p>Nigeria's Digital Farming Platform</p>
    </div>
    <div class="body">${content}</div>
    <div class="footer">
      © ${new Date().getFullYear()} AgroConnect Nigeria · <a href="#" style="color:#9CA3AF;">Unsubscribe</a>
    </div>
  </div>
</body>
</html>`;

/* ── Welcome / Verification ── */
export function welcomeTemplate(name: string) {
  return {
    subject: 'Welcome to AgroConnect! 🌱',
    html: base(`
      <h2>Welcome, ${name}!</h2>
      <p>Your AgroConnect account has been created. You can now browse verified agricultural inputs, connect with experts, and manage your farm finances — all in one place.</p>
      <p>If you have questions, reply to this email and our team will help you.</p>
      <p style="color:#6B7280;font-size:13px;">Happy farming!</p>
    `),
  };
}

/* ── OTP Email (backup to SMS) ── */
export function otpTemplate(name: string, code: string) {
  return {
    subject: `${code} — Your AgroConnect verification code`,
    html: base(`
      <h2>Phone Verification</h2>
      <p>Hi ${name}, use this code to verify your phone number:</p>
      <div class="otp-box">${code}</div>
      <p style="color:#6B7280;font-size:13px;">This code expires in <strong>10 minutes</strong>. If you didn't request this, please ignore this email.</p>
    `),
  };
}

/* ── Order Receipt ── */
export function orderReceiptTemplate(opts: {
  name:        string;
  orderNumber: string;
  items:       Array<{ name: string; qty: number; unit: string; price: number }>;
  deliveryFee: number;
  total:       number;
  paymentMethod: string;
}) {
  const itemRows = opts.items
    .map(i => `<div class="item-row"><span>${i.qty}× ${i.name} (${i.unit})</span><span>₦${(i.price * i.qty).toLocaleString()}</span></div>`)
    .join('');

  return {
    subject: `Order Confirmed — ${opts.orderNumber}`,
    html: base(`
      <h2>Order Confirmed! ✅</h2>
      <p>Hi ${opts.name}, your order has been placed and payment confirmed.</p>
      <p style="background:#F0FDF4;padding:12px 16px;border-radius:8px;font-weight:700;color:#14532D;">Order ID: ${opts.orderNumber}</p>
      <div style="margin:16px 0;">
        ${itemRows}
        <div class="item-row"><span>Delivery Fee</span><span>₦${opts.deliveryFee.toLocaleString()}</span></div>
        <div class="total-row"><span>Total Paid</span><span>₦${opts.total.toLocaleString()}</span></div>
      </div>
      <p style="font-size:13px;color:#6B7280;">Payment method: ${opts.paymentMethod}. You'll receive a tracking update once your order ships.</p>
    `),
  };
}

/* ── Password Reset ── */
export function passwordResetTemplate(name: string, resetUrl: string) {
  return {
    subject: 'Reset your AgroConnect password',
    html: base(`
      <h2>Password Reset Request</h2>
      <p>Hi ${name}, we received a request to reset your password. Click the button below — this link expires in <strong>1 hour</strong>.</p>
      <div style="text-align:center;">
        <a href="${resetUrl}" class="btn">Reset Password</a>
      </div>
      <p style="font-size:13px;color:#6B7280;">If you didn't request a password reset, you can safely ignore this email. Your password won't change.</p>
    `),
  };
}

/* ── KYC Status (under review / approved / rejected) ── */
export function kycStatusTemplate(name: string, status: 'reviewing' | 'approved' | 'rejected', reason?: string) {
  const messages = {
    reviewing: { title: 'Application Under Review ⏳', body: 'Your account documents have been received and are under review. We\'ll notify you within 24-48 hours.' },
    approved:  { title: 'Account Approved! 🎉',        body: 'Your account has been verified. You can now log in and start using all AgroConnect features.' },
    rejected:  { title: 'Application Not Approved',    body: `We were unable to verify your application${reason ? `: ${reason}` : ''}. Please re-apply with the correct documents.` },
  };
  const { title, body } = messages[status];

  return {
    subject: title,
    html: base(`<h2>${title}</h2><p>Hi ${name},</p><p>${body}</p>`),
  };
}
