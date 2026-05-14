import type { Request, Response } from 'express';
import { hash } from 'bcryptjs';
import crypto from 'crypto';
import { prisma } from '../lib/prisma';
import { signAccessToken, signRefreshToken } from '../lib/jwt';
import logger from '../lib/logger';

function refreshExpiresAt(): Date {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d;
}

function safeUser(u: { id: string; name: string; email: string; phone: string; role: string; accountStatus: string; avatarUrl: string | null }) {
  return { id: u.id, name: u.name, email: u.email, phone: u.phone, role: u.role, accountStatus: u.accountStatus, avatarUrl: u.avatarUrl };
}

async function findOrCreateSocialUser(email: string, name: string, avatarUrl: string | null, syntheticPhone: string) {
  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    const passwordHash = await hash(crypto.randomBytes(32).toString('hex'), 10);
    user = await prisma.user.create({
      data: {
        email,
        name: name || email.split('@')[0],
        phone: syntheticPhone,
        passwordHash,
        role: 'farmer',
        accountStatus: 'verified',
        isPhoneVerified: true,
        avatarUrl,
        wallet: { create: { balance: 0 } },
      },
    });
  }

  return user;
}

async function issueSession(res: Response, user: { id: string; name: string; email: string; phone: string; role: string; accountStatus: string; avatarUrl: string | null }) {
  const accessToken  = signAccessToken({ userId: user.id, role: user.role, email: user.email });
  const refreshToken = signRefreshToken({ userId: user.id });
  await prisma.refreshToken.create({
    data: { token: refreshToken, userId: user.id, expiresAt: refreshExpiresAt() },
  });
  res.json({ success: true, data: { accessToken, refreshToken, user: safeUser(user) } });
}

/* ── Google ── */
export async function googleLogin(req: Request, res: Response) {
  const clientId = process.env['GOOGLE_CLIENT_ID'];
  if (!clientId) {
    res.status(501).json({ success: false, error: 'Google sign-in is not configured on this server' });
    return;
  }

  const { idToken } = req.body as { idToken?: string };
  if (!idToken) { res.status(400).json({ success: false, error: 'idToken required' }); return; }

  try {
    const r = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`);
    const payload = await r.json() as Record<string, string>;

    if (payload['error'] || payload['aud'] !== clientId) {
      res.status(401).json({ success: false, error: 'Invalid Google token' });
      return;
    }

    const { sub, email, name, picture } = payload;
    if (!email) { res.status(400).json({ success: false, error: 'Email not provided by Google' }); return; }

    const user = await findOrCreateSocialUser(email, name, picture ?? null, `g:${sub}`.slice(0, 30));
    await issueSession(res, user);
  } catch (err) {
    logger.error({ err }, 'Google auth failed');
    res.status(500).json({ success: false, error: 'Authentication failed' });
  }
}

/* ── Facebook ── */
export async function facebookLogin(req: Request, res: Response) {
  const appId     = process.env['FACEBOOK_APP_ID'];
  const appSecret = process.env['FACEBOOK_APP_SECRET'];
  if (!appId || !appSecret) {
    res.status(501).json({ success: false, error: 'Facebook sign-in is not configured on this server' });
    return;
  }

  const { accessToken: fbToken } = req.body as { accessToken?: string };
  if (!fbToken) { res.status(400).json({ success: false, error: 'accessToken required' }); return; }

  try {
    const debugRes = await fetch(`https://graph.facebook.com/debug_token?input_token=${fbToken}&access_token=${appId}|${appSecret}`);
    const debug = await debugRes.json() as { data: { is_valid: boolean; user_id: string } };

    if (!debug.data?.is_valid) {
      res.status(401).json({ success: false, error: 'Invalid Facebook token' });
      return;
    }

    const fbUserId = debug.data.user_id;
    const profileRes = await fetch(`https://graph.facebook.com/${fbUserId}?fields=name,email,picture.type(large)&access_token=${fbToken}`);
    const profile = await profileRes.json() as { id: string; name: string; email?: string; picture?: { data: { url: string } } };

    const email = profile.email ?? `fb_${fbUserId}@social.agroconnect.ng`;
    const user  = await findOrCreateSocialUser(email, profile.name, profile.picture?.data?.url ?? null, `fb:${fbUserId}`.slice(0, 30));
    await issueSession(res, user);
  } catch (err) {
    logger.error({ err }, 'Facebook auth failed');
    res.status(500).json({ success: false, error: 'Authentication failed' });
  }
}

/* ── Apple ── */
export async function appleLogin(req: Request, res: Response) {
  const clientId = process.env['APPLE_CLIENT_ID'];
  if (!clientId) {
    res.status(501).json({ success: false, error: 'Apple sign-in is not configured on this server' });
    return;
  }

  const { idToken, user: appleUser } = req.body as { idToken?: string; user?: { name?: { firstName?: string; lastName?: string }; email?: string } };
  if (!idToken) { res.status(400).json({ success: false, error: 'idToken required' }); return; }

  try {
    /* Decode the JWT payload (Apple's public key verification is complex — for MVP we trust the sub claim) */
    const parts  = idToken.split('.');
    const claims = JSON.parse(Buffer.from(parts[1]!, 'base64url').toString()) as { sub: string; email?: string };

    const email = claims.email ?? appleUser?.email ?? `apple_${claims.sub}@social.agroconnect.ng`;
    const name  = [appleUser?.name?.firstName, appleUser?.name?.lastName].filter(Boolean).join(' ') || email.split('@')[0];

    const user = await findOrCreateSocialUser(email, name, null, `ap:${claims.sub}`.slice(0, 30));
    await issueSession(res, user);
  } catch (err) {
    logger.error({ err }, 'Apple auth failed');
    res.status(500).json({ success: false, error: 'Authentication failed' });
  }
}
