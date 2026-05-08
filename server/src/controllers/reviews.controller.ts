import type { Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import type { AuthRequest } from '../middleware/auth';

const reviewSchema = z.object({
  rating:  z.number().int().min(1).max(5),
  comment: z.string().max(1000).optional(),
});

type ReviewRow = {
  id: string; productId: string; userId: string; rating: number;
  comment: string | null; createdAt: Date;
  user: { name: string; avatarUrl: string | null };
};

/* ── GET /api/v1/products/:id/reviews ── */
export async function listReviews(req: AuthRequest, res: Response): Promise<void> {
  const productId = req.params['id']!;
  const page  = Math.max(1, parseInt(req.query['page'] as string) || 1);
  const limit = Math.min(50, parseInt(req.query['limit'] as string) || 10);

  const [reviews, total] = await Promise.all([
    prisma.review.findMany({
      where:   { productId },
      include: { user: { select: { name: true, avatarUrl: true } } },
      orderBy: { createdAt: 'desc' },
      skip:    (page - 1) * limit,
      take:    limit,
    } as Parameters<typeof prisma.review.findMany>[0]) as unknown as ReviewRow[],
    prisma.review.count({ where: { productId } } as Parameters<typeof prisma.review.count>[0]),
  ]);

  res.json({ success: true, data: reviews, meta: { total, page, limit } });
}

/* ── POST /api/v1/products/:id/reviews ── */
export async function submitReview(req: AuthRequest, res: Response): Promise<void> {
  const userId    = req.user!.userId;
  const productId = req.params['id']!;

  const parsed = reviewSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(422).json({ success: false, error: parsed.error.flatten() });
    return;
  }

  // Verify the user has a delivered order containing this product
  const eligible = await prisma.orderItem.findFirst({
    where: {
      productId,
      order: { farmerId: userId, status: 'delivered' },
    },
  } as Parameters<typeof prisma.orderItem.findFirst>[0]);

  if (!eligible) {
    res.status(403).json({ success: false, error: 'You can only review products from delivered orders' });
    return;
  }

  const review = await prisma.review.upsert({
    where:  { userId_productId: { userId, productId } },
    update: { rating: parsed.data.rating, comment: parsed.data.comment ?? null },
    create: { userId, productId, rating: parsed.data.rating, comment: parsed.data.comment ?? null },
  } as Parameters<typeof prisma.review.upsert>[0]);

  // Recalculate product aggregate rating
  const agg = await prisma.review.aggregate({
    where:  { productId },
    _avg:   { rating: true },
    _count: true,
  } as Parameters<typeof prisma.review.aggregate>[0]) as unknown as { _avg: { rating: number }; _count: number };

  await prisma.product.update({
    where: { id: productId },
    data:  {
      rating:      Math.round((agg._avg?.rating ?? 0) * 10) / 10,
      reviewCount: typeof agg._count === 'number' ? agg._count : 0,
    },
  } as Parameters<typeof prisma.product.update>[0]);

  res.status(201).json({ success: true, data: review });
}
