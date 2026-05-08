/* ═══════════════════════════════════════════════════════════
   SMS SERVICE — Termii (Nigeria)
   ───────────────────────────────────────────────────────────
   TO CONNECT: Add to server/.env
     TERMII_API_KEY=your_key_here
     TERMII_SENDER_ID=AgroConnect   (optional, defaults below)
   ═══════════════════════════════════════════════════════════ */

const API_KEY   = process.env['TERMII_API_KEY'];
const SENDER_ID = process.env['TERMII_SENDER_ID'] ?? 'AgroConnect';
const BASE_URL  = 'https://api.ng.termii.com/api';

const isConfigured = (): boolean => Boolean(API_KEY);

interface SmsResult {
  sent:      boolean;
  messageId?: string;
  devMode:   boolean;
}

/* ── Send a plain SMS ── */
export async function sendSms(to: string, message: string): Promise<SmsResult> {
  if (!isConfigured()) {
    console.log(`[SMS:dev] To: ${to} | Message: ${message}`);
    return { sent: true, devMode: true };
  }

  const res = await fetch(`${BASE_URL}/sms/send`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({
      to,
      from:    SENDER_ID,
      sms:     message,
      type:    'plain',
      api_key: API_KEY,
      channel: 'dnd',        // 'dnd' bypasses Do-Not-Disturb; use 'generic' for international
    }),
  });

  const json = await res.json() as { message_id?: string; message?: string };

  if (!res.ok) {
    throw new Error(`Termii error: ${json.message ?? res.status}`);
  }

  return { sent: true, messageId: json.message_id, devMode: false };
}

/* ── Send an OTP specifically ── */
export async function sendOtpSms(phone: string, code: string): Promise<SmsResult> {
  const message = `Your AgroConnect OTP is ${code}. Valid for 10 minutes. Do not share this code.`;
  return sendSms(phone, message);
}
