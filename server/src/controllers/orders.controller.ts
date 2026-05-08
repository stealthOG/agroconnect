import type { Response } from 'express';
import { prisma } from '../lib/prisma';
import type { AuthRequest } from '../middleware/auth';
import { createOrderSchema, updateOrderStatusSchema, orderQuerySchema } from '../validators/orders';
import { notify } from '../lib/notify';

const DELIVERY_FEE = 2500;

/* ── format order for frontend ── */
function fmtOrder(order: Record<string, unknown>) {
  return {
    id:              order['id'],
    orderNumber:     order['orderNumber'],
    status:          order['status'],
    date:            order['createdAt'],
    total:           order['totalAmount'],
    deliveryFee:     order['deliveryFee'],
    deliveryName:    order['deliveryName'],
    deliveryPhone:   order['deliveryPhone'],
    deliveryAddress: order['deliveryAddress'],
    deliveryState:   order['deliveryState'],
    deliveryCity:    order['deliveryCity'],
    deliveryMethod:  order['deliveryMethod'],
    paymentMethod:   order['paymentMethod'],
    trackingCode:    order['trackingCode'],
    paidAt:          order['paidAt'],
    items:           ((order['items'] as unknown[]) ?? []).map((i) => {
      const item = i as Record<string, unknown>;
      return {
        id:          item['id'],
        productId:   item['productId'],
        name:        item['productName'],
        emoji:       item['emoji'],
        price:       item['price'],
        qty:         item['qty'],
        unit:        item['unit'],
      };
    }),
  };
}

/* ══════════════════════════════════════════
   GET /api/v1/orders
══════════════════════════════════════════ */
export async function listOrders(req: AuthRequest, res: Response): Promise<void> {
  const q = orderQuerySchema.safeParse(req.query);
  if (!q.success) {
    res.status(422).json({ success: false, error: q.error.flatten().fieldErrors });
    return;
  }

  const { status, page, limit } = q.data;
  const isFarmer   = req.user!.role === 'farmer';
  const isSupplier = req.user!.role === 'supplier';

  const where: Record<string, unknown> = {};

  if (isFarmer) {
    where['farmerId'] = req.user!.userId;
  } else if (isSupplier) {
    // Supplier sees orders that contain their products
    where['items'] = { some: { product: { supplierId: req.user!.userId } } };
  }

  if (status) where['status'] = status;

  const skip = (page - 1) * limit;
  const [total, orders] = await Promise.all([
    prisma.order.count({ where } as Parameters<typeof prisma.order.count>[0]),
    prisma.order.findMany({
      where,
      skip,
      take:    limit,
      orderBy: { createdAt: 'desc' },
      include: { items: true },
    } as Parameters<typeof prisma.order.findMany>[0]),
  ]);

  res.json({
    success: true,
    data:    (orders as unknown[]).map(o => fmtOrder(o as Record<string, unknown>)),
    meta:    { total, page, limit, pages: Math.ceil(total / limit) },
  });
}

/* ══════════════════════════════════════════
   GET /api/v1/orders/:id
══════════════════════════════════════════ */
export async function getOrder(req: AuthRequest, res: Response): Promise<void> {
  const order = await prisma.order.findUnique({
    where:   { id: req.params['id'] },
    include: { items: true },
  } as Parameters<typeof prisma.order.findUnique>[0]);

  if (!order) { res.status(404).json({ success: false, error: 'Order not found' }); return; }

  const o = order as unknown as Record<string, unknown>;
  if (o['farmerId'] !== req.user!.userId && req.user!.role !== 'admin') {
    res.status(403).json({ success: false, error: 'Access denied' });
    return;
  }

  res.json({ success: true, data: fmtOrder(o) });
}

/* ══════════════════════════════════════════
   POST /api/v1/orders
══════════════════════════════════════════ */
export async function createOrder(req: AuthRequest, res: Response): Promise<void> {
  const result = createOrderSchema.safeParse(req.body);
  if (!result.success) {
    res.status(422).json({ success: false, error: result.error.flatten().fieldErrors });
    return;
  }

  const { items, deliveryName, deliveryPhone, deliveryAddress, deliveryState, deliveryCity, deliveryMethod, paymentMethod } = result.data;

  // Fetch all products in one query
  const productIds = items.map(i => i.productId);
  const products   = await prisma.product.findMany({
    where: { id: { in: productIds }, isActive: true },
  } as Parameters<typeof prisma.product.findMany>[0]);

  if (products.length !== productIds.length) {
    res.status(422).json({ success: false, error: 'One or more products are unavailable' });
    return;
  }

  // Validate stock for each item
  for (const item of items) {
    const product = (products as unknown[]).find((p) => (p as Record<string, unknown>)['id'] === item.productId) as Record<string, unknown> | undefined;
    if (!product) continue;
    if ((product['stock'] as number) < item.qty) {
      res.status(422).json({
        success: false,
        error:   `Insufficient stock for "${product['name']}" — only ${product['stock']} ${product['unit']} available`,
      });
      return;
    }
  }

  // Calculate totals
  const itemsTotal = items.reduce((sum, item) => {
    const product = (products as unknown[]).find((p) => (p as Record<string, unknown>)['id'] === item.productId) as Record<string, unknown> | undefined;
    return sum + (product ? (product['price'] as number) * item.qty : 0);
  }, 0);
  const totalAmount = itemsTotal + DELIVERY_FEE;

  // Create order + decrement stock in a transaction
  const order = await prisma.$transaction(async (tx) => {
    const created = await (tx as typeof prisma).order.create({
      data: {
        farmerId:  req.user!.userId,
        status:    'pending',
        totalAmount,
        deliveryFee: DELIVERY_FEE,
        deliveryName, deliveryPhone, deliveryAddress, deliveryState, deliveryCity, deliveryMethod, paymentMethod,
        items: {
          create: items.map((item) => {
            const product = (products as unknown[]).find((p) => (p as Record<string, unknown>)['id'] === item.productId) as Record<string, unknown>;
            return {
              productId:   item.productId,
              productName: product['name'] as string,
              emoji:       (product['emoji'] as string) ?? '🌱',
              price:       product['price'] as number,
              qty:         item.qty,
              unit:        product['unit'] as string,
            };
          }),
        },
      },
      include: { items: true },
    } as Parameters<typeof prisma.order.create>[0]);

    // Decrement stock for each product
    for (const item of items) {
      await (tx as typeof prisma).product.update({
        where: { id: item.productId },
        data:  { stock: { decrement: item.qty } },
      } as Parameters<typeof prisma.product.update>[0]);
    }

    return created;
  });

  /* Notify each unique supplier about the new order */
  const supplierIds = [...new Set(
    (products as unknown as { supplierId: string }[]).map(p => p.supplierId)
  )];
  await Promise.all(supplierIds.map(sid =>
    notify(sid, 'New Order Received', `You have a new order — check your Orders screen.`, '/orders-received')
  ));

  res.status(201).json({ success: true, data: fmtOrder(order as unknown as Record<string, unknown>) });
}

/* ══════════════════════════════════════════
   PATCH /api/v1/orders/:id/status  (supplier / admin)
══════════════════════════════════════════ */
export async function updateOrderStatus(req: AuthRequest, res: Response): Promise<void> {
  const result = updateOrderStatusSchema.safeParse(req.body);
  if (!result.success) {
    res.status(422).json({ success: false, error: result.error.flatten().fieldErrors });
    return;
  }

  const order = await prisma.order.findUnique({
    where:   { id: req.params['id'] },
    include: { items: true },
  } as Parameters<typeof prisma.order.findUnique>[0]);

  if (!order) { res.status(404).json({ success: false, error: 'Order not found' }); return; }

  const updated = await prisma.order.update({
    where:   { id: req.params['id'] },
    data:    { status: result.data.status as Parameters<typeof prisma.order.update>[0]['data']['status'], trackingCode: result.data.trackingCode },
    include: { items: true },
  } as Parameters<typeof prisma.order.update>[0]);

  /* Notify farmer of status change */
  const o = order as unknown as { farmerId: string; orderNumber: string };
  const statusLabels: Record<string, string> = {
    processing: 'Your order is being processed',
    shipped:    'Your order has been shipped',
    in_transit: 'Your order is on its way',
    delivered:  'Your order has been delivered',
    cancelled:  'Your order has been cancelled',
  };
  const label = statusLabels[result.data.status];
  if (label) {
    await notify(o.farmerId, label, `Order #${o.orderNumber}`, '/order-history');
  }

  res.json({ success: true, data: fmtOrder(updated as unknown as Record<string, unknown>) });
}
