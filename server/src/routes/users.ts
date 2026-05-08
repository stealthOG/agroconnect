import { Router } from 'express';
import { z } from 'zod';
import { requireAuth, type AuthRequest } from '../middleware/auth';
import { asyncHandler } from '../middleware/asyncHandler';
import { prisma } from '../lib/prisma';
import type { Response } from 'express';

const router = Router();

const patchMeSchema = z.object({
  name:        z.string().min(1).max(100).optional(),
  lga:         z.string().max(100).optional(),
  state:       z.string().max(100).optional(),
  coopName:    z.string().max(200).optional(),
  institution: z.string().max(200).optional(),
});

/* GET /api/v1/users/me */
router.get('/me', requireAuth, asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const user = await prisma.user.findUnique({
    where:  { id: req.user!.userId },
    select: {
      id: true, name: true, email: true, phone: true, role: true,
      accountStatus: true, isPhoneVerified: true, isEmailVerified: true,
      avatarUrl: true, lga: true, state: true, coopName: true,
      coopId: true, institution: true, createdAt: true,
    },
  });

  if (!user) {
    res.status(404).json({ success: false, error: 'User not found' });
    return;
  }

  res.json({ success: true, data: user });
}));

/* PATCH /api/v1/users/me */
router.patch('/me', requireAuth, asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const parsed = patchMeSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(422).json({ success: false, error: parsed.error.flatten() });
    return;
  }

  const updated = await prisma.user.update({
    where: { id: req.user!.userId },
    data:  parsed.data,
    select: {
      id: true, name: true, email: true, phone: true, role: true,
      accountStatus: true, lga: true, state: true, avatarUrl: true,
    },
  });

  res.json({ success: true, data: updated });
}));

export default router;
