import type { Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import type { AuthRequest } from '../middleware/auth';

const createSchema = z.object({
  amount:          z.number().positive().min(10000, 'Minimum loan amount is ₦10,000'),
  purpose:         z.string().min(3).max(300),
  repaymentMonths: z.number().int().min(1).max(60),
  institution:     z.string().max(200).optional(),
});

const updateSchema = z.object({
  status:      z.enum(['reviewing', 'approved', 'rejected', 'disbursed']),
  reviewNotes: z.string().max(500).optional(),
});

const querySchema = z.object({
  status: z.string().optional(),
  page:   z.coerce.number().int().positive().default(1),
  limit:  z.coerce.number().int().positive().max(50).default(20),
});

function fmt(l: Record<string, unknown>) {
  const applicant = l['applicant'] as Record<string, unknown> | undefined;
  return {
    id:              l['id'],
    amount:          l['amount'],
    purpose:         l['purpose'],
    repaymentMonths: l['repaymentMonths'],
    status:          l['status'],
    reviewNotes:     l['reviewNotes'],
    applicantId:     l['applicantId'],
    applicantName:   applicant?.['name'] ?? '',
    createdAt:       l['createdAt'],
    updatedAt:       l['updatedAt'],
  };
}

/* GET /api/v1/loans */
export async function listLoans(req: AuthRequest, res: Response): Promise<void> {
  const q = querySchema.safeParse(req.query);
  if (!q.success) { res.status(422).json({ success: false, error: q.error.flatten().fieldErrors }); return; }
  const { status, page, limit } = q.data;
  const skip = (page - 1) * limit;

  const isInstitution = req.user!.role === 'institution' || req.user!.role === 'admin';
  const where: Record<string, unknown> = isInstitution
    ? (status ? { status } : {})
    : { applicantId: req.user!.userId, ...(status ? { status } : {}) };

  const [total, loans] = await Promise.all([
    prisma.loanApplication.count({ where } as Parameters<typeof prisma.loanApplication.count>[0]),
    prisma.loanApplication.findMany({
      where, skip, take: limit,
      orderBy: { createdAt: 'desc' },
      include: { applicant: { select: { name: true } } },
    } as Parameters<typeof prisma.loanApplication.findMany>[0]),
  ]);

  res.json({ success: true, data: (loans as unknown[]).map(l => fmt(l as Record<string, unknown>)), meta: { total, page, limit, pages: Math.ceil(total / limit) } });
}

/* POST /api/v1/loans — cooperative only */
export async function createLoan(req: AuthRequest, res: Response): Promise<void> {
  const result = createSchema.safeParse(req.body);
  if (!result.success) { res.status(422).json({ success: false, error: result.error.flatten().fieldErrors }); return; }

  const loan = await prisma.loanApplication.create({
    data: {
      applicantId:     req.user!.userId,
      amount:          result.data.amount,
      purpose:         result.data.purpose,
      repaymentMonths: result.data.repaymentMonths,
    },
    include: { applicant: { select: { name: true } } },
  } as Parameters<typeof prisma.loanApplication.create>[0]);

  res.status(201).json({ success: true, data: fmt(loan as unknown as Record<string, unknown>) });
}

/* PATCH /api/v1/loans/:id — institution / admin only */
export async function updateLoan(req: AuthRequest, res: Response): Promise<void> {
  const result = updateSchema.safeParse(req.body);
  if (!result.success) { res.status(422).json({ success: false, error: result.error.flatten().fieldErrors }); return; }

  const loan = await prisma.loanApplication.update({
    where: { id: req.params['id'] },
    data:  { status: result.data.status as Parameters<typeof prisma.loanApplication.update>[0]['data']['status'], reviewNotes: result.data.reviewNotes },
    include: { applicant: { select: { name: true } } },
  } as Parameters<typeof prisma.loanApplication.update>[0]);

  res.json({ success: true, data: fmt(loan as unknown as Record<string, unknown>) });
}
