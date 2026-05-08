import type { Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import type { AuthRequest } from '../middleware/auth';

const querySchema = z.object({
  unreadOnly: z.coerce.boolean().optional(),
  page:  z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(30),
});

function fmt(n: Record<string, unknown>) {
  return {
    id:        n['id'],
    title:     n['title'],
    body:      n['body'],
    isRead:    n['isRead'],
    link:      n['link'],
    createdAt: n['createdAt'],
  };
}

/* GET /api/v1/notifications */
export async function listNotifications(req: AuthRequest, res: Response): Promise<void> {
  const q = querySchema.safeParse(req.query);
  if (!q.success) { res.status(422).json({ success: false, error: q.error.flatten().fieldErrors }); return; }
  const { unreadOnly, page, limit } = q.data;
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = { userId: req.user!.userId };
  if (unreadOnly) where['isRead'] = false;

  const [total, unread, notifications] = await Promise.all([
    prisma.notification.count({ where } as Parameters<typeof prisma.notification.count>[0]),
    prisma.notification.count({ where: { userId: req.user!.userId, isRead: false } } as Parameters<typeof prisma.notification.count>[0]),
    prisma.notification.findMany({
      where, skip, take: limit,
      orderBy: { createdAt: 'desc' },
    } as Parameters<typeof prisma.notification.findMany>[0]),
  ]);

  res.json({
    success: true,
    data:    (notifications as unknown[]).map(n => fmt(n as Record<string, unknown>)),
    meta:    { total, unread, page, limit, pages: Math.ceil(total / limit) },
  });
}

/* PATCH /api/v1/notifications/:id/read */
export async function markRead(req: AuthRequest, res: Response): Promise<void> {
  const notif = await prisma.notification.findUnique({ where: { id: req.params['id'] } } as Parameters<typeof prisma.notification.findUnique>[0]);
  const n = notif as Record<string, unknown> | null;
  if (!n || n['userId'] !== req.user!.userId) { res.status(404).json({ success: false, error: 'Notification not found' }); return; }

  await prisma.notification.update({ where: { id: req.params['id'] }, data: { isRead: true } } as Parameters<typeof prisma.notification.update>[0]);
  res.json({ success: true });
}

/* PATCH /api/v1/notifications/read-all */
export async function markAllRead(req: AuthRequest, res: Response): Promise<void> {
  await prisma.notification.updateMany({
    where: { userId: req.user!.userId, isRead: false },
    data:  { isRead: true },
  } as Parameters<typeof prisma.notification.updateMany>[0]);

  res.json({ success: true });
}
