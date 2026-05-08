import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth';
import { asyncHandler } from '../middleware/asyncHandler';
import { prisma } from '../lib/prisma';
import type { AuthRequest } from '../middleware/auth';
import type { Response } from 'express';
import { listSlots, createSlot, deleteSlot } from '../controllers/consultations.controller';

const router = Router();

/* ── GET /api/v1/experts ── list verified experts */
router.get('/', requireAuth, asyncHandler(async (req: AuthRequest, res: Response) => {
  const experts = await prisma.user.findMany({
    where:   { role: 'expert', accountStatus: 'verified' },
    select:  { id: true, name: true, avatarUrl: true, lga: true, state: true, institution: true },
    orderBy: { name: 'asc' },
  } as Parameters<typeof prisma.user.findMany>[0]);
  res.json({ success: true, data: experts });
}));

/* ── GET /api/v1/experts/:id ── expert profile */
router.get('/:id', requireAuth, asyncHandler(async (req: AuthRequest, res: Response) => {
  const expert = await prisma.user.findUnique({
    where:  { id: req.params['id'] } as Parameters<typeof prisma.user.findUnique>[0]['where'],
    select: { id: true, name: true, avatarUrl: true, lga: true, state: true, institution: true, role: true, accountStatus: true },
  } as Parameters<typeof prisma.user.findUnique>[0]);
  if (!expert || expert.role !== 'expert') {
    res.status(404).json({ success: false, error: 'Expert not found' });
    return;
  }
  res.json({ success: true, data: expert });
}));

/* ── GET /api/v1/experts/:id/slots ── */
router.get('/:id/slots', requireAuth, asyncHandler(listSlots));

/* ── POST /api/v1/experts/:id/slots ── (expert only) */
router.post('/:id/slots', requireAuth, requireRole('expert'), asyncHandler(createSlot));

/* ── DELETE /api/v1/experts/:id/slots/:slotId ── (expert only) */
router.delete('/:id/slots/:slotId', requireAuth, requireRole('expert'), asyncHandler(deleteSlot));

export default router;
