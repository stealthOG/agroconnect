import type { Request, Response } from 'express';
import { createHmac, timingSafeEqual } from 'crypto';
import { parseIntent, handlePrice, handleTrack, handleBalance, helpMessage } from '../services/whatsapp';
import logger from '../lib/logger';

/* Verify Twilio request signature */
function verifyTwilio(req: Request): boolean {
  const authToken = process.env['TWILIO_AUTH_TOKEN'];
  if (!authToken) {
    if (process.env['NODE_ENV'] === 'production') return false; // fail closed in prod
    return true; // dev mode — skip verification
  }

  const signature = req.headers['x-twilio-signature'] as string | undefined;
  if (!signature) return false;

  const url  = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const body = req.body as Record<string, string>;

  /* Build the string to sign: URL + sorted key=value pairs */
  const params = Object.keys(body).sort().reduce((s, k) => s + k + body[k], url);
  const expected = createHmac('sha1', authToken).update(params).digest('base64');

  try {
    return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}

/* Build TwiML response */
function twiml(message: string): string {
  const escaped = message
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${escaped}</Message></Response>`;
}

/* POST /api/v1/whatsapp/webhook */
export async function whatsappWebhook(req: Request, res: Response): Promise<void> {
  if (!verifyTwilio(req)) {
    res.status(403).send('Forbidden');
    return;
  }

  const body = (req.body as Record<string, string>);
  const from = body['From'] ?? '';           // e.g. "whatsapp:+2348012345678"
  const text = (body['Body'] ?? '').trim();
  const phone = from.replace('whatsapp:', '');

  logger.info({ from, text: text.slice(0, 80) }, 'WhatsApp message received');

  let reply: string;
  try {
    const { intent, query } = parseIntent(text);

    switch (intent) {
      case 'price':   reply = await handlePrice(query);   break;
      case 'track':   reply = await handleTrack(query);   break;
      case 'balance': reply = await handleBalance(phone); break;
      case 'help':    reply = helpMessage();               break;
      default:
        reply = `I didn't understand that. Send *help* to see what I can do.`;
    }
  } catch (err) {
    logger.error({ err }, 'WhatsApp handler error');
    reply = '⚠️ Something went wrong. Please try again in a moment.';
  }

  res.setHeader('Content-Type', 'text/xml');
  res.send(twiml(reply));
}
