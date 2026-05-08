import type { Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import type { AuthRequest } from '../middleware/auth';
import { notify } from '../lib/notify';

type MsgRow = {
  id: string; orderId: string; senderId: string; body: string;
  isRead: boolean; createdAt: Date;
  sender: { id: string; name: string; role: string; avatarUrl: string | null };
};

type OrderRow = {
  id: string; orderNumber: string; farmerId: string;
  items: { productId: string; product: { supplierId: string } | null }[];
};

/* Resolve who the other party is and verify the requester is part of this order */
async function resolveParties(
  orderId: string,
  requesterId: string,
): Promise<{ order: OrderRow; otherPartyId: string } | null> {
  const order = await prisma.order.findUnique({
    where:   { id: orderId },
    include: { items: { include: { product: { select: { supplierId: true } } } } },
  } as Parameters<typeof prisma.order.findUnique>[0]) as unknown as OrderRow | null;

  if (!order) return null;

  const supplierIds = [
    ...new Set(order.items.map(i => i.product?.supplierId).filter(Boolean) as string[]),
  ];

  if (order.farmerId === requesterId) {
    /* Farmer — other party is the first supplier on the order */
    const supplierId = supplierIds[0];
    if (!supplierId) return null;
    return { order, otherPartyId: supplierId };
  }

  if (supplierIds.includes(requesterId)) {
    return { order, otherPartyId: order.farmerId };
  }

  return null; // not a party to this order
}

/* ── GET /api/v1/orders/:id/messages ── */
export async function listMessages(req: AuthRequest, res: Response): Promise<void> {
  const requesterId = req.user!.userId;
  const orderId     = req.params['id'] as string;

  const parties = await resolveParties(orderId, requesterId);
  if (!parties) {
    res.status(403).json({ success: false, error: 'Not authorised to view these messages' });
    return;
  }

  const messages = await prisma.message.findMany({
    where:   { orderId },
    include: { sender: { select: { id: true, name: true, role: true, avatarUrl: true } } },
    orderBy: { createdAt: 'asc' },
  } as Parameters<typeof prisma.message.findMany>[0]) as unknown as MsgRow[];

  /* Mark unread messages from the other party as read */
  await prisma.message.updateMany({
    where: { orderId, senderId: parties.otherPartyId, isRead: false },
    data:  { isRead: true },
  } as Parameters<typeof prisma.message.updateMany>[0]);

  res.json({ success: true, data: messages, meta: { orderId, otherPartyId: parties.otherPartyId } });
}

/* ── POST /api/v1/orders/:id/messages ── */
export async function sendMessage(req: AuthRequest, res: Response): Promise<void> {
  const senderId = req.user!.userId;
  const orderId  = req.params['id'] as string;

  const parsed = z.object({ body: z.string().min(1).max(2000) }).safeParse(req.body);
  if (!parsed.success) {
    res.status(422).json({ success: false, error: parsed.error.flatten() });
    return;
  }

  const parties = await resolveParties(orderId, senderId);
  if (!parties) {
    res.status(403).json({ success: false, error: 'Not authorised to message on this order' });
    return;
  }

  const message = await prisma.message.create({
    data:    { orderId, senderId, body: parsed.data.body },
    include: { sender: { select: { id: true, name: true, role: true, avatarUrl: true } } },
  } as Parameters<typeof prisma.message.create>[0]) as unknown as MsgRow;

  /* Notify the other party via SSE + DB notification */
  const senderName = message.sender.name;
  const orderNum   = parties.order.orderNumber;
  await notify(
    parties.otherPartyId,
    `New message from ${senderName}`,
    `Re: Order #${orderNum.slice(-8)} — tap to reply`,
    `/order-messages?orderId=${orderId}`,
  );

  res.status(201).json({ success: true, data: message });
}
