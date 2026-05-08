import type { Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import type { AuthRequest } from '../middleware/auth';
import { getTracking } from '../services/logistics';
import { notify } from '../lib/notify';

const shipSchema = z.object({
  carrier:      z.string().min(1).max(50),
  trackingCode: z.string().min(1).max(100),
});

type OrderRow = {
  id: string; orderNumber: string; farmerId: string; status: string;
  carrier: string | null; trackingCode: string | null;
  items: { product: { supplierId: string } | null }[];
};

/* ── POST /api/v1/orders/:id/ship ── (supplier only) */
export async function markShipped(req: AuthRequest, res: Response): Promise<void> {
  const supplierId = req.user!.userId;
  const orderId    = req.params['id'] as string;

  const parsed = shipSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(422).json({ success: false, error: parsed.error.flatten() });
    return;
  }

  const order = await prisma.order.findUnique({
    where:   { id: orderId },
    include: { items: { include: { product: { select: { supplierId: true } } } } },
  } as Parameters<typeof prisma.order.findUnique>[0]) as unknown as OrderRow | null;

  if (!order) { res.status(404).json({ success: false, error: 'Order not found' }); return; }

  const supplierIds = [...new Set(
    order.items.map(i => i.product?.supplierId).filter(Boolean) as string[]
  )];
  if (!supplierIds.includes(supplierId)) {
    res.status(403).json({ success: false, error: 'Not your order' });
    return;
  }
  if (!['pending','processing'].includes(order.status)) {
    res.status(409).json({ success: false, error: 'Order cannot be marked shipped in its current state' });
    return;
  }

  const { carrier, trackingCode } = parsed.data;

  const updated = await prisma.order.update({
    where: { id: orderId },
    data:  { status: 'shipped', carrier, trackingCode },
  } as Parameters<typeof prisma.order.update>[0]);

  await notify(
    order.farmerId,
    'Your order has been shipped',
    `Order #${order.orderNumber} is on its way — tracking: ${trackingCode}`,
  );

  res.json({ success: true, data: updated });
}

/* ── GET /api/v1/orders/:id/tracking ── */
export async function getOrderTracking(req: AuthRequest, res: Response): Promise<void> {
  const userId  = req.user!.userId;
  const orderId = req.params['id'] as string;

  const order = await prisma.order.findUnique({
    where:   { id: orderId },
    include: { items: { include: { product: { select: { supplierId: true } } } } },
  } as Parameters<typeof prisma.order.findUnique>[0]) as unknown as OrderRow | null;

  if (!order) { res.status(404).json({ success: false, error: 'Order not found' }); return; }

  /* Only farmer or one of the order's suppliers can fetch tracking */
  const supplierIds = [...new Set(
    order.items.map(i => i.product?.supplierId).filter(Boolean) as string[]
  )];
  if (order.farmerId !== userId && !supplierIds.includes(userId)) {
    res.status(403).json({ success: false, error: 'Not authorised' });
    return;
  }

  if (!order.carrier || !order.trackingCode) {
    res.json({ success: true, data: null });
    return;
  }

  try {
    const tracking = await getTracking(order.carrier, order.trackingCode);
    res.json({ success: true, data: tracking });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Tracking lookup failed';
    res.status(502).json({ success: false, error: msg });
  }
}
