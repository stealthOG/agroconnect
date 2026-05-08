import type { Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import type { AuthRequest } from '../middleware/auth';

const memberSchema = z.object({
  name:     z.string().min(2).max(100),
  phone:    z.string().min(7).max(20),
  lga:      z.string().max(100).optional(),
  state:    z.string().max(100).optional(),
  farmType: z.string().max(200).optional(),
  duesPaid: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

/* ── GET /api/v1/coop/members ── */
export async function listMembers(req: AuthRequest, res: Response): Promise<void> {
  const coopId = req.user!.userId;
  const status = req.query['status'] as string | undefined;

  const where: Record<string, unknown> = { coopId };
  if (status === 'active')   where['isActive'] = true;
  if (status === 'inactive') where['isActive'] = false;
  if (status === 'unpaid')   where['duesPaid'] = false;

  const members = await prisma.coopMember.findMany({
    where, orderBy: { joinedAt: 'desc' },
  } as Parameters<typeof prisma.coopMember.findMany>[0]) as {
    id: string; name: string; phone: string; lga: string | null;
    state: string | null; farmType: string | null;
    isActive: boolean; duesPaid: boolean; joinedAt: Date;
  }[];

  const [total, active, inactive, unpaid] = await Promise.all([
    prisma.coopMember.count({ where: { coopId } } as Parameters<typeof prisma.coopMember.count>[0]),
    prisma.coopMember.count({ where: { coopId, isActive: true } } as Parameters<typeof prisma.coopMember.count>[0]),
    prisma.coopMember.count({ where: { coopId, isActive: false } } as Parameters<typeof prisma.coopMember.count>[0]),
    prisma.coopMember.count({ where: { coopId, duesPaid: false } } as Parameters<typeof prisma.coopMember.count>[0]),
  ]);

  res.json({
    success: true,
    data:    members,
    meta:    { total, active, inactive, unpaid },
  });
}

/* ── POST /api/v1/coop/members ── */
export async function addMember(req: AuthRequest, res: Response): Promise<void> {
  const coopId = req.user!.userId;
  const parsed = memberSchema.safeParse(req.body);
  if (!parsed.success) { res.status(422).json({ success: false, error: parsed.error.flatten() }); return; }

  const member = await prisma.coopMember.create({
    data: { coopId, ...parsed.data },
  } as Parameters<typeof prisma.coopMember.create>[0]);

  res.status(201).json({ success: true, data: member });
}

/* ── PATCH /api/v1/coop/members/:id ── */
export async function updateMember(req: AuthRequest, res: Response): Promise<void> {
  const coopId = req.user!.userId;
  const id     = req.params['id']!;
  const parsed = memberSchema.partial().safeParse(req.body);
  if (!parsed.success) { res.status(422).json({ success: false, error: parsed.error.flatten() }); return; }

  const existing = await prisma.coopMember.findUnique({ where: { id } } as Parameters<typeof prisma.coopMember.findUnique>[0]) as { coopId: string } | null;
  if (!existing || existing.coopId !== coopId) {
    res.status(404).json({ success: false, error: 'Member not found' });
    return;
  }

  const updated = await prisma.coopMember.update({
    where: { id }, data: parsed.data,
  } as Parameters<typeof prisma.coopMember.update>[0]);

  res.json({ success: true, data: updated });
}

/* ── DELETE /api/v1/coop/members/:id ── */
export async function removeMember(req: AuthRequest, res: Response): Promise<void> {
  const coopId = req.user!.userId;
  const id     = req.params['id']!;

  const existing = await prisma.coopMember.findUnique({ where: { id } } as Parameters<typeof prisma.coopMember.findUnique>[0]) as { coopId: string } | null;
  if (!existing || existing.coopId !== coopId) {
    res.status(404).json({ success: false, error: 'Member not found' });
    return;
  }

  await prisma.coopMember.delete({ where: { id } } as Parameters<typeof prisma.coopMember.delete>[0]);
  res.json({ success: true });
}
