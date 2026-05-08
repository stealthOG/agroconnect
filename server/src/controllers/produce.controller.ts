import type { Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import type { AuthRequest } from '../middleware/auth';

const createSchema = z.object({
  produceType:  z.string().min(1).max(100),
  quantity:     z.number().positive(),
  unit:         z.string().min(1).max(50),
  pricePerUnit: z.number().positive(),
  harvestDate:  z.string().optional(),
  location:     z.string().min(2).max(200),
  notes:        z.string().max(500).optional(),
});

const listQuerySchema = z.object({
  page:  z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(20),
});

/* ── format for frontend ── */
function fmt(p: Record<string, unknown>) {
  return {
    id:           p['id'],
    produceType:  p['produceType'],
    quantity:     p['quantity'],
    unit:         p['unit'],
    pricePerUnit: p['pricePerUnit'],
    harvestDate:  p['harvestDate'],
    location:     p['location'],
    notes:        p['notes'],
    isActive:     p['isActive'],
    createdAt:    p['createdAt'],
  };
}

/* GET /api/v1/produce — list all active listings (marketplace view) */
export async function listProduce(req: AuthRequest, res: Response): Promise<void> {
  const q = listQuerySchema.safeParse(req.query);
  if (!q.success) { res.status(422).json({ success: false, error: q.error.flatten().fieldErrors }); return; }

  const { page, limit } = q.data;
  const skip = (page - 1) * limit;

  const [total, listings] = await Promise.all([
    prisma.produceListing.count({ where: { isActive: true } } as Parameters<typeof prisma.produceListing.count>[0]),
    prisma.produceListing.findMany({
      where:   { isActive: true },
      skip, take: limit,
      orderBy: { createdAt: 'desc' },
    } as Parameters<typeof prisma.produceListing.findMany>[0]),
  ]);

  res.json({ success: true, data: (listings as unknown[]).map(p => fmt(p as Record<string, unknown>)), meta: { total, page, limit, pages: Math.ceil(total / limit) } });
}

/* GET /api/v1/produce/mine — farmer's own listings */
export async function myListings(req: AuthRequest, res: Response): Promise<void> {
  const listings = await prisma.produceListing.findMany({
    where:   { farmerId: req.user!.userId },
    orderBy: { createdAt: 'desc' },
  } as Parameters<typeof prisma.produceListing.findMany>[0]);

  res.json({ success: true, data: (listings as unknown[]).map(p => fmt(p as Record<string, unknown>)) });
}

/* POST /api/v1/produce */
export async function createListing(req: AuthRequest, res: Response): Promise<void> {
  const result = createSchema.safeParse(req.body);
  if (!result.success) { res.status(422).json({ success: false, error: result.error.flatten().fieldErrors }); return; }

  const { produceType, quantity, unit, pricePerUnit, harvestDate, location, notes } = result.data;

  const listing = await prisma.produceListing.create({
    data: {
      farmerId: req.user!.userId,
      produceType, quantity, unit, pricePerUnit,
      harvestDate: harvestDate ? new Date(harvestDate) : undefined,
      location, notes,
    },
  } as Parameters<typeof prisma.produceListing.create>[0]);

  res.status(201).json({ success: true, data: fmt(listing as unknown as Record<string, unknown>) });
}

/* DELETE /api/v1/produce/:id */
export async function deleteListing(req: AuthRequest, res: Response): Promise<void> {
  const listing = await prisma.produceListing.findUnique({ where: { id: req.params['id'] } } as Parameters<typeof prisma.produceListing.findUnique>[0]);
  const l = listing as Record<string, unknown> | null;
  if (!l) { res.status(404).json({ success: false, error: 'Listing not found' }); return; }
  if (l['farmerId'] !== req.user!.userId) { res.status(403).json({ success: false, error: 'Access denied' }); return; }

  await prisma.produceListing.update({ where: { id: req.params['id'] }, data: { isActive: false } } as Parameters<typeof prisma.produceListing.update>[0]);
  res.json({ success: true });
}
