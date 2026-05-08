import type { Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import type { AuthRequest } from '../middleware/auth';
import { notify } from '../lib/notify';
import { emitToUser } from '../lib/stream';

/* ── GET /admin/stats ── */
export async function getStats(_req: AuthRequest, res: Response): Promise<void> {
  const [totalUsers, pendingKYC, totalOrders, pendingLoans, gmvResult, recentUsers] = await Promise.all([
    prisma.user.count({ where: { role: { not: 'admin' } } } as Parameters<typeof prisma.user.count>[0]),
    prisma.user.count({ where: { accountStatus: 'pending', role: { not: 'admin' } } } as Parameters<typeof prisma.user.count>[0]),
    prisma.order.count(),
    prisma.loanApplication.count({ where: { status: 'pending' } } as Parameters<typeof prisma.loanApplication.count>[0]),
    prisma.order.aggregate({ _sum: { totalAmount: true } } as Parameters<typeof prisma.order.aggregate>[0]),
    prisma.user.findMany({
      where:   { role: { not: 'admin' } } as any,
      orderBy: { createdAt: 'desc' },
      take:    6,
      select:  { id: true, name: true, email: true, role: true, accountStatus: true, createdAt: true },
    } as Parameters<typeof prisma.user.findMany>[0]),
  ]);

  res.json({
    success: true,
    data: {
      totalUsers,
      pendingKYC,
      totalOrders,
      pendingLoans,
      gmv: (gmvResult as unknown as { _sum: { totalAmount: number | null } })._sum?.totalAmount ?? 0,
      recentUsers,
    },
  });
}

/* ── GET /admin/users ── */
const usersQuerySchema = z.object({
  role:   z.string().optional(),
  status: z.string().optional(),
  q:      z.string().optional(),
  page:   z.coerce.number().int().positive().default(1),
  limit:  z.coerce.number().int().positive().max(100).default(30),
});

export async function listUsers(req: AuthRequest, res: Response): Promise<void> {
  const parsed = usersQuerySchema.safeParse(req.query);
  if (!parsed.success) { res.status(422).json({ success: false, error: parsed.error.flatten() }); return; }
  const { role, status, q, page, limit } = parsed.data;
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = { role: { not: 'admin' } };
  if (role)   where['role']          = role;
  if (status) where['accountStatus'] = status;
  if (q)      where['OR'] = [
    { name:  { contains: q, mode: 'insensitive' } },
    { email: { contains: q, mode: 'insensitive' } },
    { phone: { contains: q } },
  ];

  const [total, users] = await Promise.all([
    prisma.user.count({ where } as Parameters<typeof prisma.user.count>[0]),
    prisma.user.findMany({
      where, skip, take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true, name: true, email: true, phone: true,
        role: true, accountStatus: true, createdAt: true,
        isPhoneVerified: true, state: true,
      },
    } as Parameters<typeof prisma.user.findMany>[0]),
  ]);

  res.json({ success: true, data: users, meta: { total, page, limit, pages: Math.ceil(total / limit) } });
}

/* ── PATCH /admin/users/:id/status ── */
const statusSchema = z.object({
  accountStatus: z.enum(['verified', 'rejected', 'suspended', 'pending']),
  reason: z.string().max(500).optional(),
});

export async function updateUserStatus(req: AuthRequest, res: Response): Promise<void> {
  const id = req.params['id'] as string;
  const body = statusSchema.safeParse(req.body);
  if (!body.success) { res.status(422).json({ success: false, error: body.error.flatten() }); return; }
  const { accountStatus, reason } = body.data;

  const user = await prisma.user.findUnique({ where: { id } } as Parameters<typeof prisma.user.findUnique>[0]) as Record<string, unknown> | null;
  if (!user) { res.status(404).json({ success: false, error: 'User not found' }); return; }

  await prisma.user.update({ where: { id }, data: { accountStatus } } as Parameters<typeof prisma.user.update>[0]);

  const notifMap: Record<string, { title: string; body: string }> = {
    verified:  { title: 'Account Approved ✅', body: 'Your account has been verified. You now have full access.' },
    rejected:  { title: 'Application Not Approved', body: reason ? `Reason: ${reason}` : 'Your application was not approved. Please contact support.' },
    suspended: { title: 'Account Suspended', body: reason ? `Your account has been suspended: ${reason}` : 'Your account has been suspended. Please contact support.' },
    pending:   { title: 'Account Under Review', body: 'Your account has been placed back under review.' },
  };
  const notif = notifMap[accountStatus];
  if (notif) await notify(id, notif.title, notif.body);

  res.json({ success: true });
}

/* ── GET /admin/loans ── */
export async function listLoans(req: AuthRequest, res: Response): Promise<void> {
  const page   = Math.max(1, Number(req.query['page'])  || 1);
  const limit  = Math.min(50, Number(req.query['limit']) || 20);
  const status = req.query['status'] as string | undefined;
  const skip   = (page - 1) * limit;

  const where: Record<string, unknown> = {};
  if (status) where['status'] = status;

  const [total, loans] = await Promise.all([
    prisma.loanApplication.count({ where } as Parameters<typeof prisma.loanApplication.count>[0]),
    prisma.loanApplication.findMany({
      where, skip, take: limit,
      orderBy: { createdAt: 'desc' },
      include: { applicant: { select: { id: true, name: true, email: true, role: true } } },
    } as Parameters<typeof prisma.loanApplication.findMany>[0]),
  ]);

  res.json({ success: true, data: loans, meta: { total, page, limit, pages: Math.ceil(total / limit) } });
}

/* ── PATCH /admin/loans/:id ── */
const loanUpdateSchema = z.object({
  status:      z.enum(['reviewing', 'approved', 'rejected', 'disbursed']),
  reviewNotes: z.string().max(1000).optional(),
});

export async function updateLoan(req: AuthRequest, res: Response): Promise<void> {
  const id = req.params['id'] as string;
  const body = loanUpdateSchema.safeParse(req.body);
  if (!body.success) { res.status(422).json({ success: false, error: body.error.flatten() }); return; }
  const { status, reviewNotes } = body.data;

  const loan = await prisma.loanApplication.findUnique({
    where: { id },
    include: { applicant: { select: { id: true } } },
  } as Parameters<typeof prisma.loanApplication.findUnique>[0]) as Record<string, unknown> | null;
  if (!loan) { res.status(404).json({ success: false, error: 'Loan not found' }); return; }

  await prisma.loanApplication.update({
    where: { id },
    data:  { status, ...(reviewNotes !== undefined ? { reviewNotes } : {}) },
  } as Parameters<typeof prisma.loanApplication.update>[0]);

  const applicantId = (loan['applicant'] as Record<string, unknown>)?.['id'] as string | undefined;
  const amount = Number(loan['amount']).toLocaleString();
  const notifMap: Record<string, { title: string; body: string }> = {
    approved:  { title: 'Loan Approved! 🎉', body: `Your ₦${amount} loan application has been approved.` },
    disbursed: { title: 'Loan Disbursed', body: `₦${amount} has been disbursed to your wallet.` },
    rejected:  { title: 'Loan Not Approved', body: reviewNotes ?? 'Your loan application was not approved at this time.' },
    reviewing: { title: 'Loan Under Review', body: 'Your application is currently being reviewed.' },
  };
  const notif = notifMap[status];
  if (notif && applicantId) await notify(applicantId, notif.title, notif.body);

  res.json({ success: true });
}

/* ── POST /admin/notifications/broadcast ── */
const broadcastSchema = z.object({
  title:      z.string().min(1).max(200),
  body:       z.string().min(1).max(1000),
  targetRole: z.enum(['farmer', 'supplier', 'expert', 'cooperative', 'institution']).optional(),
});

export async function broadcastNotification(req: AuthRequest, res: Response): Promise<void> {
  const parsed = broadcastSchema.safeParse(req.body);
  if (!parsed.success) { res.status(422).json({ success: false, error: parsed.error.flatten() }); return; }
  const { title, body, targetRole } = parsed.data;

  const where: Record<string, unknown> = { role: { not: 'admin' } };
  if (targetRole) where['role'] = targetRole;

  const users = await prisma.user.findMany({ where, select: { id: true } } as Parameters<typeof prisma.user.findMany>[0]) as { id: string }[];

  if (users.length === 0) { res.json({ success: true, data: { sent: 0 } }); return; }

  await prisma.notification.createMany({
    data: users.map(u => ({ userId: u.id, title, body })),
  } as Parameters<typeof prisma.notification.createMany>[0]);

  /* Push via SSE to any connected users */
  users.forEach(u => emitToUser(u.id, 'notification', { title, body, createdAt: new Date() }));

  res.json({ success: true, data: { sent: users.length } });
}
