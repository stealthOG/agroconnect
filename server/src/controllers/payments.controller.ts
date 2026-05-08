import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import type { AuthRequest } from '../middleware/auth';
import {
  initializeTransaction,
  verifyTransaction,
  verifyWebhookSignature,
  generateReference,
} from '../services/paystack';
import { sendEmail, orderReceiptTemplate } from '../services/email';
import { createOrderSchema } from '../validators/orders';
import logger from '../lib/logger';

const DELIVERY_FEE = 2500;

/* ── shared: format order for frontend ── */
function fmtOrder(o: Record<string, unknown>) {
  return {
    id:          o['id'],
    orderNumber: o['orderNumber'],
    status:      o['status'],
    totalAmount: o['totalAmount'],
    paidAt:      o['paidAt'],
    paystackRef: o['paystackRef'],
    items:       ((o['items'] as unknown[]) ?? []).map((i) => {
      const item = i as Record<string, unknown>;
      return { id: item['id'], name: item['productName'], emoji: item['emoji'], price: item['price'], qty: item['qty'], unit: item['unit'] };
    }),
  };
}

/* ══════════════════════════════════════════
   POST /api/v1/payments/initialize
   Creates a pending order and returns:
   - If paymentMethod === 'wallet'/'agric-credit': deducts balance, confirms immediately
   - If paymentMethod === 'card'/'transfer': initialises Paystack, returns accessCode
══════════════════════════════════════════ */
export async function initializePayment(req: AuthRequest, res: Response): Promise<void> {
  const result = createOrderSchema.safeParse(req.body);
  if (!result.success) {
    res.status(422).json({ success: false, error: result.error.flatten().fieldErrors });
    return;
  }

  const {
    items, deliveryName, deliveryPhone, deliveryAddress,
    deliveryState, deliveryCity, deliveryMethod, paymentMethod,
  } = result.data;

  /* ── Fetch & validate products ── */
  const productIds = items.map(i => i.productId);
  const products   = await prisma.product.findMany({
    where: { id: { in: productIds }, isActive: true },
  } as Parameters<typeof prisma.product.findMany>[0]);

  if ((products as unknown[]).length !== productIds.length) {
    res.status(422).json({ success: false, error: 'One or more products are unavailable' });
    return;
  }

  /* ── Check stock ── */
  for (const item of items) {
    const product = (products as unknown[]).find(
      p => (p as Record<string, unknown>)['id'] === item.productId
    ) as Record<string, unknown> | undefined;
    if (!product) continue;
    if ((product['stock'] as number) < item.qty) {
      res.status(422).json({
        success: false,
        error: `Insufficient stock for "${product['name']}" — only ${product['stock']} ${product['unit']} available`,
      });
      return;
    }
  }

  /* ── Calculate totals ── */
  const itemsTotal = items.reduce((sum, item) => {
    const p = (products as unknown[]).find(
      x => (x as Record<string, unknown>)['id'] === item.productId
    ) as Record<string, unknown> | undefined;
    return sum + (p ? (p['price'] as number) * item.qty : 0);
  }, 0);
  const totalAmount = itemsTotal + DELIVERY_FEE;

  /* ── Wallet / agric-credit payment: deduct directly ── */
  const isWalletPay = paymentMethod === 'wallet' || paymentMethod === 'agric-credit';

  if (isWalletPay) {
    const wallet = await prisma.wallet.findUnique({
      where: { userId: req.user!.userId },
    } as Parameters<typeof prisma.wallet.findUnique>[0]);

    const w = wallet as Record<string, unknown> | null;
    const available = (w?.['balance'] as number ?? 0) + (w?.['agricCredit'] as number ?? 0);

    if (available < totalAmount) {
      res.status(422).json({
        success: false,
        error: `Insufficient wallet balance. Available: ₦${available.toLocaleString()}, Required: ₦${totalAmount.toLocaleString()}`,
      });
      return;
    }

    /* Create order + deduct wallet in one transaction */
    const order = await prisma.$transaction(async (tx) => {
      const created = await (tx as typeof prisma).order.create({
        data: {
          farmerId: req.user!.userId, status: 'processing', totalAmount,
          deliveryFee: DELIVERY_FEE, deliveryName, deliveryPhone, deliveryAddress,
          deliveryState, deliveryCity, deliveryMethod, paymentMethod,
          paidAt: new Date(),
          items: {
            create: items.map(item => {
              const p = (products as unknown[]).find(
                x => (x as Record<string, unknown>)['id'] === item.productId
              ) as Record<string, unknown>;
              return {
                productId: item.productId, productName: p['name'] as string,
                emoji: (p['emoji'] as string) ?? '🌱', price: p['price'] as number,
                qty: item.qty, unit: p['unit'] as string,
              };
            }),
          },
        },
        include: { items: true },
      } as Parameters<typeof prisma.order.create>[0]);

      for (const item of items) {
        await (tx as typeof prisma).product.update({
          where: { id: item.productId },
          data:  { stock: { decrement: item.qty } },
        } as Parameters<typeof prisma.product.update>[0]);
      }

      /* Deduct from agric-credit first, then balance */
      const agricCredit = w?.['agricCredit'] as number ?? 0;
      let remainingDebt = totalAmount;
      let newAgricCredit = agricCredit;
      let newBalance     = w?.['balance'] as number ?? 0;

      if (agricCredit > 0) {
        const fromCredit = Math.min(agricCredit, remainingDebt);
        newAgricCredit -= fromCredit;
        remainingDebt  -= fromCredit;
      }
      newBalance -= remainingDebt;

      await (tx as typeof prisma).wallet.update({
        where: { userId: req.user!.userId },
        data:  { balance: newBalance, agricCredit: newAgricCredit },
      } as Parameters<typeof prisma.wallet.update>[0]);

      const walletId = w?.['id'] as string;
      await (tx as typeof prisma).transaction.create({
        data: {
          walletId,
          type:      'debit',
          amount:    totalAmount,
          label:     'Order Payment',
          subtitle:  `Order #${(created as Record<string, unknown>)['orderNumber']}`,
          reference: `PAY-WALLET-${(created as Record<string, unknown>)['id']}`,
        },
      } as Parameters<typeof prisma.transaction.create>[0]);

      return created;
    });

    res.status(201).json({
      success: true,
      data: {
        order:            fmtOrder(order as unknown as Record<string, unknown>),
        requiresPaystack: false,
      },
    });
    return;
  }

  /* ── Card / transfer: initialise Paystack ── */
  const reference = generateReference('ORD');
  const user      = await prisma.user.findUnique({ where: { id: req.user!.userId } } as Parameters<typeof prisma.user.findUnique>[0]);
  const u         = user as Record<string, unknown>;

  /* Create pending order first so we can reference it in the metadata */
  const order = await prisma.$transaction(async (tx) => {
    const created = await (tx as typeof prisma).order.create({
      data: {
        farmerId: req.user!.userId, status: 'pending', totalAmount,
        deliveryFee: DELIVERY_FEE, deliveryName, deliveryPhone, deliveryAddress,
        deliveryState, deliveryCity, deliveryMethod, paymentMethod,
        paystackRef: reference,
        items: {
          create: items.map(item => {
            const p = (products as unknown[]).find(
              x => (x as Record<string, unknown>)['id'] === item.productId
            ) as Record<string, unknown>;
            return {
              productId: item.productId, productName: p['name'] as string,
              emoji: (p['emoji'] as string) ?? '🌱', price: p['price'] as number,
              qty: item.qty, unit: p['unit'] as string,
            };
          }),
        },
      },
      include: { items: true },
    } as Parameters<typeof prisma.order.create>[0]);

    /* Decrement stock optimistically (will restore if payment fails) */
    for (const item of items) {
      await (tx as typeof prisma).product.update({
        where: { id: item.productId },
        data:  { stock: { decrement: item.qty } },
      } as Parameters<typeof prisma.product.update>[0]);
    }

    return created;
  });

  const orderId = (order as Record<string, unknown>)['id'] as string;

  /* Initialise Paystack transaction */
  const paystackData = await initializeTransaction({
    email:     u['email'] as string,
    amount:    totalAmount,
    reference,
    metadata:  { orderId, userId: req.user!.userId, type: 'order_payment' },
  });

  res.status(201).json({
    success: true,
    data: {
      order:            fmtOrder(order as unknown as Record<string, unknown>),
      requiresPaystack: true,
      accessCode:       paystackData.access_code,
      authorizationUrl: paystackData.authorization_url,
      reference:        paystackData.reference,
    },
  });
}

/* ══════════════════════════════════════════
   GET /api/v1/payments/verify/:reference
   Called by frontend after Paystack callback
══════════════════════════════════════════ */
export async function verifyPayment(req: AuthRequest, res: Response): Promise<void> {
  const { reference } = req.params as { reference: string };

  const paystackResult = await verifyTransaction(reference);

  if (paystackResult.status !== 'success') {
    res.status(402).json({ success: false, error: `Payment ${paystackResult.status}` });
    return;
  }

  const order = await prisma.order.findFirst({
    where:   { paystackRef: reference },
    include: { items: true },
  } as Parameters<typeof prisma.order.findFirst>[0]);

  const o = order as Record<string, unknown> | null;
  if (!o) { res.status(404).json({ success: false, error: 'Order not found' }); return; }

  /* Idempotent — don't re-process if already confirmed */
  if (o['paidAt']) {
    res.json({ success: true, data: fmtOrder(o) });
    return;
  }

  const updated = await prisma.order.update({
    where:   { id: o['id'] as string },
    data:    { status: 'processing', paidAt: new Date() },
    include: { items: true },
  } as Parameters<typeof prisma.order.update>[0]);

  res.json({ success: true, data: fmtOrder(updated as unknown as Record<string, unknown>) });
}

/* ══════════════════════════════════════════
   POST /api/v1/payments/webhook
   Paystack sends events here. Must use raw body for sig verification.
══════════════════════════════════════════ */
export async function handleWebhook(req: Request, res: Response): Promise<void> {
  const signature = req.headers['x-paystack-signature'] as string | undefined;

  if (!signature) { res.status(400).json({ error: 'Missing signature' }); return; }

  /* req.body is a raw Buffer because we mount with express.raw() */
  const rawBody = req.body as Buffer;

  if (!verifyWebhookSignature(rawBody, signature)) {
    res.status(401).json({ error: 'Invalid signature' });
    return;
  }

  const event = JSON.parse(rawBody.toString()) as {
    event: string;
    data:  {
      reference: string;
      amount:    number;
      status:    string;
      metadata:  { orderId?: string; userId?: string; type?: string };
    };
  };

  /* Acknowledge immediately; process async to avoid timeout */
  res.status(200).json({ received: true });

  if (event.event !== 'charge.success') return;

  const { reference, amount, metadata } = event.data;

  try {
    if (metadata?.type === 'order_payment' && metadata.orderId) {
      await _confirmOrderPayment(metadata.orderId, reference);
    } else if (metadata?.type === 'wallet_topup' && metadata.userId) {
      await _creditWallet(metadata.userId, amount / 100, reference);
    }
  } catch (err) {
    logger.error({ err }, '[webhook] processing error');
  }
}

/* ── internal: confirm order after webhook ── */
async function _confirmOrderPayment(orderId: string, reference: string) {
  const order = await prisma.order.findUnique({
    where:   { id: orderId },
    include: { farmer: true, items: true },
  } as Parameters<typeof prisma.order.findUnique>[0]);
  const o = order as Record<string, unknown> | null;
  if (!o || o['paidAt']) return;  // already processed

  await prisma.order.update({
    where: { id: orderId },
    data:  { status: 'processing', paidAt: new Date() },
  } as Parameters<typeof prisma.order.update>[0]);

  /* Send order receipt email */
  const farmer = o['farmer'] as Record<string, unknown>;
  const items  = (o['items'] as unknown[]).map(i => {
    const item = i as Record<string, unknown>;
    return { name: item['productName'] as string, qty: item['qty'] as number, unit: item['unit'] as string, price: item['price'] as number };
  });
  await sendEmail({
    to: farmer['email'] as string,
    ...orderReceiptTemplate({
      name:          farmer['name'] as string,
      orderNumber:   o['orderNumber'] as string,
      items,
      deliveryFee:   o['deliveryFee'] as number,
      total:         o['totalAmount'] as number,
      paymentMethod: o['paymentMethod'] as string,
    }),
  }).catch(err => logger.error({ err }, '[webhook] receipt email failed'));

  logger.info({ orderId, reference }, '[webhook] order confirmed');
}

/* ── internal: credit wallet after topup webhook ── */
async function _creditWallet(userId: string, amountNaira: number, reference: string) {
  const wallet = await prisma.wallet.findUnique({ where: { userId } } as Parameters<typeof prisma.wallet.findUnique>[0]);
  const w = wallet as Record<string, unknown> | null;
  if (!w) return;

  /* Idempotent check */
  const exists = await prisma.transaction.findUnique({ where: { reference } } as Parameters<typeof prisma.transaction.findUnique>[0]);
  if (exists) return;

  await prisma.$transaction([
    (prisma.wallet.update({
      where: { userId },
      data:  { balance: { increment: amountNaira } },
    } as Parameters<typeof prisma.wallet.update>[0])),
    (prisma.transaction.create({
      data: {
        walletId: w['id'] as string,
        type:     'credit',
        amount:   amountNaira,
        label:    'Wallet Top-up',
        subtitle: 'Via Paystack',
        reference,
      },
    } as Parameters<typeof prisma.transaction.create>[0])),
  ]);

  logger.info({ userId, amountNaira, reference }, '[webhook] wallet credited');
}
