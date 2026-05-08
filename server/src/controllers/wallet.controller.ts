import type { Response } from 'express';
import { prisma } from '../lib/prisma';
import type { AuthRequest } from '../middleware/auth';
import { z } from 'zod';
import { initializeTransaction, generateReference } from '../services/paystack';

const topupSchema = z.object({
  amount: z.number().positive().min(100, 'Minimum top-up is ₦100'),
});

const txQuerySchema = z.object({
  type:  z.enum(['credit', 'debit']).optional(),
  page:  z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(20),
});

/* ══════════════════════════════════════════
   GET /api/v1/wallet
══════════════════════════════════════════ */
export async function getWallet(req: AuthRequest, res: Response): Promise<void> {
  let wallet = await prisma.wallet.findUnique({
    where: { userId: req.user!.userId },
  } as Parameters<typeof prisma.wallet.findUnique>[0]);

  // Auto-create wallet on first access (belt + suspenders over registration)
  if (!wallet) {
    wallet = await prisma.wallet.create({
      data: { userId: req.user!.userId },
    } as Parameters<typeof prisma.wallet.create>[0]);
  }

  const w = wallet as unknown as Record<string, unknown>;

  // Compute stats from recent transactions
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const [totalCredit, totalDebit, monthCredit] = await Promise.all([
    prisma.transaction.aggregate({
      where: { walletId: w['id'] as string, type: 'credit' },
      _sum:  { amount: true },
    } as Parameters<typeof prisma.transaction.aggregate>[0]),
    prisma.transaction.aggregate({
      where: { walletId: w['id'] as string, type: 'debit' },
      _sum:  { amount: true },
    } as Parameters<typeof prisma.transaction.aggregate>[0]),
    prisma.transaction.aggregate({
      where: { walletId: w['id'] as string, type: 'credit', createdAt: { gte: thirtyDaysAgo } },
      _sum:  { amount: true },
    } as Parameters<typeof prisma.transaction.aggregate>[0]),
  ]);

  res.json({
    success: true,
    data: {
      balance:     w['balance'],
      agricCredit: w['agricCredit'],
      stats: {
        totalIncome: (totalCredit  as unknown as Record<string, Record<string, number>>)['_sum']?.['amount'] ?? 0,
        totalSpent:  (totalDebit   as unknown as Record<string, Record<string, number>>)['_sum']?.['amount'] ?? 0,
        thisMonth:   (monthCredit  as unknown as Record<string, Record<string, number>>)['_sum']?.['amount'] ?? 0,
      },
    },
  });
}

/* ══════════════════════════════════════════
   GET /api/v1/wallet/transactions
══════════════════════════════════════════ */
export async function listTransactions(req: AuthRequest, res: Response): Promise<void> {
  const q = txQuerySchema.safeParse(req.query);
  if (!q.success) {
    res.status(422).json({ success: false, error: q.error.flatten().fieldErrors });
    return;
  }

  const { type, page, limit } = q.data;

  const wallet = await prisma.wallet.findUnique({
    where: { userId: req.user!.userId },
  } as Parameters<typeof prisma.wallet.findUnique>[0]);

  if (!wallet) {
    res.json({ success: true, data: [], meta: { total: 0, page: 1, limit, pages: 0 } });
    return;
  }

  const w = wallet as unknown as Record<string, unknown>;
  const where: Record<string, unknown> = { walletId: w['id'] };
  if (type) where['type'] = type;

  const skip = (page - 1) * limit;
  const [total, transactions] = await Promise.all([
    prisma.transaction.count({ where } as Parameters<typeof prisma.transaction.count>[0]),
    prisma.transaction.findMany({
      where,
      skip,
      take:    limit,
      orderBy: { createdAt: 'desc' },
    } as Parameters<typeof prisma.transaction.findMany>[0]),
  ]);

  const formatted = (transactions as unknown[]).map((t) => {
    const tx = t as Record<string, unknown>;
    return {
      id:        tx['id'],
      type:      tx['type'],
      label:     tx['label'],
      sub:       tx['subtitle'] ?? '',
      date:      tx['createdAt'],
      amount:    tx['amount'],
      reference: tx['reference'],
    };
  });

  res.json({
    success: true,
    data:    formatted,
    meta:    { total, page, limit, pages: Math.ceil(total / limit) },
  });
}

/* ══════════════════════════════════════════
   POST /api/v1/wallet/topup
   Initialize a Paystack transaction to fund the wallet
══════════════════════════════════════════ */
export async function initializeTopup(req: AuthRequest, res: Response): Promise<void> {
  const result = topupSchema.safeParse(req.body);
  if (!result.success) {
    res.status(422).json({ success: false, error: result.error.flatten().fieldErrors });
    return;
  }

  const { amount } = result.data;

  const user = await prisma.user.findUnique({ where: { id: req.user!.userId } } as Parameters<typeof prisma.user.findUnique>[0]);
  if (!user) { res.status(404).json({ success: false, error: 'User not found' }); return; }

  const u         = user as Record<string, unknown>;
  const reference = generateReference('TOPUP');

  const paystackData = await initializeTransaction({
    email:     u['email'] as string,
    amount,
    reference,
    metadata:  { type: 'wallet_topup', userId: req.user!.userId },
  });

  res.json({
    success: true,
    data: {
      accessCode:       paystackData.access_code,
      authorizationUrl: paystackData.authorization_url,
      reference:        paystackData.reference,
      amount,
    },
  });
}
