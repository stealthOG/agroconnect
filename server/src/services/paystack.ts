import crypto from 'crypto';

// Read at call-time so tests can patch process.env without re-importing
const secret = () => process.env['PAYSTACK_SECRET_KEY'] ?? '';
const BASE_URL = 'https://api.paystack.co';

/* ── low-level fetch wrapper ── */
async function paystackRequest<T>(
  method: 'GET' | 'POST',
  path: string,
  body?: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${secret()}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const json = (await res.json()) as { status: boolean; message: string; data: T };

  if (!json.status) {
    throw Object.assign(new Error(json.message ?? 'Paystack error'), { status: 502 });
  }

  return json.data;
}

/* ── types ── */
export interface PaystackInitResult {
  authorization_url: string;
  access_code:       string;
  reference:         string;
}

export interface PaystackVerifyResult {
  status:    'success' | 'failed' | 'abandoned' | 'pending';
  amount:    number;   // kobo
  reference: string;
  metadata:  Record<string, unknown>;
}

/* ══════════════════════════════════════════
   Initialize a transaction
══════════════════════════════════════════ */
export async function initializeTransaction(opts: {
  email:     string;
  amount:    number;   // Naira — we convert to kobo here
  reference: string;
  callbackUrl?: string;
  metadata?: Record<string, unknown>;
}): Promise<PaystackInitResult> {
  return paystackRequest<PaystackInitResult>('POST', '/transaction/initialize', {
    email:        opts.email,
    amount:       Math.round(opts.amount * 100),  // Naira → kobo
    reference:    opts.reference,
    callback_url: opts.callbackUrl,
    metadata:     opts.metadata ?? {},
  });
}

/* ══════════════════════════════════════════
   Verify a transaction
══════════════════════════════════════════ */
export async function verifyTransaction(reference: string): Promise<PaystackVerifyResult> {
  return paystackRequest<PaystackVerifyResult>('GET', `/transaction/verify/${reference}`);
}

/* ══════════════════════════════════════════
   Verify webhook signature
   Paystack sends X-Paystack-Signature: HMAC-SHA512 of raw body
══════════════════════════════════════════ */
export function verifyWebhookSignature(rawBody: Buffer, signature: string): boolean {
  const expected = crypto
    .createHmac('sha512', secret())
    .update(rawBody)
    .digest('hex');
  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  } catch {
    // timingSafeEqual throws if buffers have different lengths — treat as invalid
    return false;
  }
}

/* ══════════════════════════════════════════
   Generate a unique transaction reference
══════════════════════════════════════════ */
export function generateReference(prefix: string): string {
  const rand = crypto.randomBytes(8).toString('hex').toUpperCase();
  return `AGC-${prefix}-${rand}`;
}
