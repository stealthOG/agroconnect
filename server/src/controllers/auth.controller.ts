import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../lib/jwt';
import crypto from 'crypto';
import { sendOtpSms } from '../services/sms';
import { sendEmail, welcomeTemplate, otpTemplate, kycStatusTemplate, passwordResetTemplate } from '../services/email';
import logger from '../lib/logger';
import {
  registerSchema,
  loginSchema,
  otpVerifySchema,
  otpSendSchema,
} from '../validators/auth';

/* ── helpers ── */

function generateOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function otpExpiresAt(): Date {
  return new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
}

function refreshExpiresAt(): Date {
  return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
}

function safeUser(user: { id: string; name: string; email: string; phone: string; role: string; accountStatus: string; isPhoneVerified: boolean; lga: string | null; state: string | null; avatarUrl: string | null }) {
  return {
    id:              user.id,
    name:            user.name,
    email:           user.email,
    phone:           user.phone,
    role:            user.role,
    accountStatus:   user.accountStatus,
    isPhoneVerified: user.isPhoneVerified,
    lga:             user.lga,
    state:           user.state,
    avatarUrl:       user.avatarUrl,
  };
}

/* ══════════════════════════════════════════
   POST /api/v1/auth/register
══════════════════════════════════════════ */
export async function register(req: Request, res: Response): Promise<void> {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    res.status(422).json({ success: false, error: result.error.flatten().fieldErrors });
    return;
  }

  const { name, email, phone, password, role, lga, state } = result.data;

  const existing = await prisma.user.findFirst({
    where: { OR: [{ email }, { phone }] },
  });
  if (existing) {
    const field = existing.email === email ? 'email' : 'phone';
    res.status(409).json({ success: false, error: `That ${field} is already registered` });
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  // Farmers are auto-verified; all other roles need KYC review
  const accountStatus = role === 'farmer' ? 'verified' : 'pending';

  const user = await prisma.user.create({
    data: { name, email, phone, passwordHash, role, lga, state, accountStatus },
  });

  // Create wallet for all users
  await prisma.wallet.create({ data: { userId: user.id } });

  /* Send welcome email + KYC status for non-farmer roles */
  await sendEmail({ to: email, ...welcomeTemplate(name) }).catch(() => null);
  if (accountStatus === 'pending') {
    await sendEmail({ to: email, ...kycStatusTemplate(name, 'reviewing') }).catch(() => null);
  }

  // Send OTP for phone verification
  const otp = generateOtp();
  await prisma.otpCode.create({
    data: {
      userId:    user.id,
      code:      otp,
      purpose:   'phone_verify',
      expiresAt: otpExpiresAt(),
    },
  });

  /* Send OTP via SMS (Termii) + email backup */
  await sendOtpSms(phone, otp).catch(err => logger.error({ err, phone }, '[auth] SMS send failed'));
  await sendEmail({ to: email, ...otpTemplate(name, otp) }).catch(err => logger.error({ err }, '[auth] OTP email failed'));

  res.status(201).json({
    success: true,
    data: {
      user:          safeUser(user),
      nextStep:      'verify_phone',
      message:       'Account created. Please verify your phone number.',
    },
  });
}

/* ══════════════════════════════════════════
   POST /api/v1/auth/otp/send
══════════════════════════════════════════ */
export async function sendOtp(req: Request, res: Response): Promise<void> {
  const result = otpSendSchema.safeParse(req.body);
  if (!result.success) {
    res.status(422).json({ success: false, error: result.error.flatten().fieldErrors });
    return;
  }

  const user = await prisma.user.findUnique({ where: { phone: result.data.phone } });
  if (!user) {
    // Return generic message to prevent phone enumeration
    res.json({ success: true, message: 'If that number is registered, an OTP has been sent.' });
    return;
  }

  // Invalidate any previous unused OTPs
  await prisma.otpCode.updateMany({
    where: { userId: user.id, purpose: 'phone_verify', usedAt: null },
    data:  { usedAt: new Date() },
  });

  const otp = generateOtp();
  await prisma.otpCode.create({
    data: { userId: user.id, code: otp, purpose: 'phone_verify', expiresAt: otpExpiresAt() },
  });

  const u = user as Record<string, unknown>;
  await sendOtpSms(result.data.phone, otp).catch(err => logger.error({ err }, '[auth] SMS resend failed'));
  await sendEmail({ to: u['email'] as string, ...otpTemplate(u['name'] as string, otp) }).catch(() => null);

  res.json({ success: true, message: 'OTP sent.' });
}

/* ══════════════════════════════════════════
   POST /api/v1/auth/otp/verify
══════════════════════════════════════════ */
export async function verifyOtp(req: Request, res: Response): Promise<void> {
  const result = otpVerifySchema.safeParse(req.body);
  if (!result.success) {
    res.status(422).json({ success: false, error: result.error.flatten().fieldErrors });
    return;
  }

  const { phone, code } = result.data;

  const user = await prisma.user.findUnique({ where: { phone } });
  if (!user) {
    res.status(400).json({ success: false, error: 'Invalid OTP or phone number' });
    return;
  }

  const otpRecord = await prisma.otpCode.findFirst({
    where: {
      userId:    user.id,
      purpose:   'phone_verify',
      usedAt:    null,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: 'desc' },
  });

  if (!otpRecord) {
    res.status(400).json({ success: false, error: 'OTP expired or not found. Request a new one.' });
    return;
  }

  // Increment attempt counter and enforce max
  const attempts = otpRecord.attempts + 1;
  if (attempts > 3) {
    await prisma.otpCode.update({ where: { id: otpRecord.id }, data: { usedAt: new Date() } });
    res.status(400).json({ success: false, error: 'Too many OTP attempts. Request a new code.' });
    return;
  }
  await prisma.otpCode.update({ where: { id: otpRecord.id }, data: { attempts } });

  if (otpRecord.code !== code) {
    res.status(400).json({ success: false, error: 'Incorrect OTP' });
    return;
  }

  // Mark OTP as used and verify phone
  await prisma.otpCode.update({ where: { id: otpRecord.id }, data: { usedAt: new Date() } });
  await prisma.user.update({ where: { id: user.id }, data: { isPhoneVerified: true } });

  // Issue tokens
  const accessToken  = signAccessToken({ userId: user.id, role: user.role, email: user.email });
  const refreshToken = signRefreshToken({ userId: user.id });
  await prisma.refreshToken.create({
    data: { token: refreshToken, userId: user.id, expiresAt: refreshExpiresAt() },
  });

  res.json({
    success: true,
    data: { accessToken, refreshToken, user: safeUser(user) },
  });
}

/* ══════════════════════════════════════════
   POST /api/v1/auth/login
══════════════════════════════════════════ */
export async function login(req: Request, res: Response): Promise<void> {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    res.status(422).json({ success: false, error: result.error.flatten().fieldErrors });
    return;
  }

  const { email, password } = result.data;

  const user = await prisma.user.findUnique({ where: { email } });
  // Use constant-time comparison to prevent timing attacks
  const passwordMatch = user
    ? await bcrypt.compare(password, user.passwordHash)
    : await bcrypt.compare(password, '$2b$12$placeholder_hash_for_timing');

  if (!user || !passwordMatch) {
    res.status(401).json({ success: false, error: 'Invalid email or password' });
    return;
  }

  if (user.accountStatus === 'suspended') {
    res.status(403).json({ success: false, error: 'Account suspended. Contact support.' });
    return;
  }

  if (!user.isPhoneVerified) {
    res.status(403).json({
      success: false,
      error:   'Phone not verified',
      nextStep: 'verify_phone',
    });
    return;
  }

  const accessToken  = signAccessToken({ userId: user.id, role: user.role, email: user.email });
  const refreshToken = signRefreshToken({ userId: user.id });
  await prisma.refreshToken.create({
    data: { token: refreshToken, userId: user.id, expiresAt: refreshExpiresAt() },
  });

  res.json({
    success: true,
    data: { accessToken, refreshToken, user: safeUser(user) },
  });
}

/* ══════════════════════════════════════════
   POST /api/v1/auth/refresh
══════════════════════════════════════════ */
export async function refreshTokens(req: Request, res: Response): Promise<void> {
  const { refreshToken } = req.body as { refreshToken?: string };
  if (!refreshToken) {
    res.status(400).json({ success: false, error: 'Refresh token required' });
    return;
  }

  let payload: { userId: string };
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    res.status(401).json({ success: false, error: 'Invalid refresh token' });
    return;
  }

  const stored = await prisma.refreshToken.findUnique({ where: { token: refreshToken } });
  if (!stored || stored.expiresAt < new Date()) {
    res.status(401).json({ success: false, error: 'Refresh token expired or revoked' });
    return;
  }

  const user = await prisma.user.findUnique({ where: { id: payload.userId } });
  if (!user) {
    res.status(401).json({ success: false, error: 'User not found' });
    return;
  }

  // Rotate refresh token
  await prisma.refreshToken.delete({ where: { token: refreshToken } });
  const newRefresh = signRefreshToken({ userId: user.id });
  await prisma.refreshToken.create({
    data: { token: newRefresh, userId: user.id, expiresAt: refreshExpiresAt() },
  });

  const accessToken = signAccessToken({ userId: user.id, role: user.role, email: user.email });
  res.json({ success: true, data: { accessToken, refreshToken: newRefresh } });
}

/* ══════════════════════════════════════════
   POST /api/v1/auth/logout
══════════════════════════════════════════ */
export async function logout(req: Request, res: Response): Promise<void> {
  const { refreshToken } = req.body as { refreshToken?: string };
  if (refreshToken) {
    await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
  }
  res.json({ success: true, message: 'Logged out' });
}

/* ══════════════════════════════════════════
   POST /api/v1/auth/password-reset/request
══════════════════════════════════════════ */
export async function requestPasswordReset(req: Request, res: Response): Promise<void> {
  const { email } = req.body as { email?: string };
  if (!email || !email.includes('@')) {
    res.status(422).json({ success: false, error: 'Valid email required' });
    return;
  }

  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });

  // Always return success to prevent email enumeration
  res.json({ success: true, message: 'If that email is registered, a reset link has been sent.' });

  if (!user) return;

  const token     = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await prisma.user.update({
    where: { id: user.id },
    data:  { resetToken: token, resetTokenExpiresAt: expiresAt },
  });

  const frontendUrl = process.env['FRONTEND_URL'] ?? 'http://localhost:3000';
  const resetUrl    = `${frontendUrl}?reset=${token}`;

  await sendEmail({ to: user.email, ...passwordResetTemplate(user.name, resetUrl) })
    .catch(err => logger.error({ err }, '[auth] password reset email failed'));
}

/* ══════════════════════════════════════════
   POST /api/v1/auth/password-reset/confirm
══════════════════════════════════════════ */
export async function confirmPasswordReset(req: Request, res: Response): Promise<void> {
  const { token, password } = req.body as { token?: string; password?: string };

  if (!token || !password || password.length < 8) {
    res.status(422).json({ success: false, error: 'Valid token and password (min 8 chars) required' });
    return;
  }

  const user = await prisma.user.findFirst({
    where: { resetToken: token, resetTokenExpiresAt: { gt: new Date() } },
  });

  if (!user) {
    res.status(400).json({ success: false, error: 'Reset link is invalid or has expired' });
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.update({
    where: { id: user.id },
    data:  { passwordHash, resetToken: null, resetTokenExpiresAt: null },
  });

  // Revoke all existing refresh tokens
  await prisma.refreshToken.deleteMany({ where: { userId: user.id } });

  res.json({ success: true, message: 'Password updated. Please log in.' });
}
