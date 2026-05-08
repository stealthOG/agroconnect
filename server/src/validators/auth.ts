import { z } from 'zod';

const ROLES = ['farmer', 'supplier', 'expert', 'cooperative', 'institution'] as const;

const nigerianPhone = z
  .string()
  .regex(/^\+234[789][01]\d{8}$/, 'Phone must be a valid Nigerian number (+234XXXXXXXXXX)');

export const registerSchema = z.object({
  name:     z.string().min(2).max(100),
  email:    z.email().toLowerCase(),
  phone:    nigerianPhone,
  password: z.string().min(8).max(72),
  role:     z.enum(ROLES),
  lga:      z.string().max(100).optional(),
  state:    z.string().max(100).optional(),
});

export const loginSchema = z.object({
  email:    z.email().toLowerCase(),
  password: z.string().min(1),
});

export const otpVerifySchema = z.object({
  phone: nigerianPhone,
  code:  z.string().length(6).regex(/^\d{6}$/, 'OTP must be 6 digits'),
});

export const otpSendSchema = z.object({
  phone: nigerianPhone,
});

export const passwordResetRequestSchema = z.object({
  email: z.email().toLowerCase(),
});

export const passwordResetSchema = z.object({
  token:    z.string().min(1),
  password: z.string().min(8).max(72),
});

export type RegisterInput  = z.infer<typeof registerSchema>;
export type LoginInput     = z.infer<typeof loginSchema>;
export type OtpVerifyInput = z.infer<typeof otpVerifySchema>;
