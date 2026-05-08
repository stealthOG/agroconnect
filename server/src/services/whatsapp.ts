import { prisma } from '../lib/prisma';

/* ── Intent matching ── */
type Intent = 'price' | 'track' | 'balance' | 'help' | 'unknown';

interface ParsedIntent {
  intent: Intent;
  query:  string;
}

export function parseIntent(body: string): ParsedIntent {
  const raw = body.trim().toLowerCase();

  if (/^(price|prices?|cost|how much)\b/.test(raw)) {
    return { intent: 'price', query: raw.replace(/^(price|prices?|cost|how much)\s*/i, '').trim() };
  }
  if (/^(track|order|status)\b/.test(raw)) {
    return { intent: 'track', query: raw.replace(/^(track|order|status)\s*/i, '').trim() };
  }
  if (/^(balance|wallet|my balance|check balance)/.test(raw)) {
    return { intent: 'balance', query: '' };
  }
  if (/^(help|hi|hello|start|menu|\?)/.test(raw)) {
    return { intent: 'help', query: '' };
  }
  return { intent: 'unknown', query: raw };
}

/* ── Intent handlers ── */

export async function handlePrice(query: string): Promise<string> {
  if (!query) {
    return '🌱 *Price Check*\nSend: _price <product name>_\nExample: _price hybrid maize seeds_';
  }

  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      OR: [
        { name:        { contains: query, mode: 'insensitive' } },
        { subCategory: { contains: query, mode: 'insensitive' } },
        { inputType:   { contains: query, mode: 'insensitive' } },
      ],
    },
    select: { name: true, price: true, unit: true, region: true, supplierName: true },
    take: 5,
    orderBy: { price: 'asc' },
  } as Parameters<typeof prisma.product.findMany>[0]) as {
    name: string; price: number; unit: string; region: string; supplierName: string;
  }[];

  if (products.length === 0) {
    return `🌱 No products found matching *"${query}"*.\nTry: _price maize_, _price fertilizer_, _price seeds_`;
  }

  const lines = products.map(p =>
    `• *${p.name}* — ₦${p.price.toLocaleString()}/${p.unit} (${p.region})\n  Seller: ${p.supplierName}`
  );
  return `🌱 *Prices for "${query}"*\n\n${lines.join('\n\n')}\n\n_Visit AgroConnect to order_`;
}

export async function handleTrack(query: string): Promise<string> {
  if (!query) {
    return '📦 *Track Order*\nSend: _track <order number>_\nExample: _track AGR-2026-001234_';
  }

  const order = await prisma.order.findFirst({
    where: {
      OR: [
        { orderNumber: { contains: query.toUpperCase(), mode: 'insensitive' } },
        { orderNumber: { equals: query.toUpperCase() } },
      ],
    },
    select: {
      orderNumber: true,
      status:      true,
      totalAmount: true,
      trackingCode:true,
      createdAt:   true,
      items:       { select: { productName: true, qty: true, unit: true }, take: 3 },
    },
  } as Parameters<typeof prisma.order.findFirst>[0]) as {
    orderNumber: string; status: string; totalAmount: number;
    trackingCode: string | null; createdAt: Date;
    items: { productName: string; qty: number; unit: string }[];
  } | null;

  if (!order) {
    return `📦 Order *${query.toUpperCase()}* not found.\nCheck the order number and try again.`;
  }

  const statusEmoji: Record<string, string> = {
    pending:    '⏳', processing: '🔄', shipped: '🚚',
    in_transit: '🚚', delivered: '✅', cancelled: '❌',
  };
  const emoji    = statusEmoji[order.status] ?? '📦';
  const itemList = order.items.map(i => `  • ${i.productName} × ${i.qty} ${i.unit}`).join('\n');
  const date     = order.createdAt.toLocaleDateString('en-NG', { day:'numeric', month:'short', year:'numeric' });

  return `${emoji} *Order #${order.orderNumber}*\nStatus: *${order.status.replace(/_/g,' ').toUpperCase()}*\nPlaced: ${date}\nTotal: ₦${order.totalAmount.toLocaleString()}\n\nItems:\n${itemList}${order.trackingCode ? `\n\nTracking: ${order.trackingCode}` : ''}`;
}

export async function handleBalance(phone: string): Promise<string> {
  /* Normalise Nigerian phone to E.164 for lookup */
  const normalised = phone.replace(/\D/g, '');
  const local = normalised.startsWith('234') ? '0' + normalised.slice(3) : normalised;

  const wallet = await prisma.wallet.findFirst({
    where: { user: { phone: { in: [phone, '+' + normalised, local] } } },
    select: { balance: true, agricCredit: true },
  } as Parameters<typeof prisma.wallet.findFirst>[0]) as {
    balance: number; agricCredit: number;
  } | null;

  if (!wallet) {
    return '💳 No wallet found for this number.\nSign up at AgroConnect to get started.';
  }

  return `💳 *Your AgroConnect Wallet*\n\nCash Balance: *₦${wallet.balance.toLocaleString()}*\nAgric Credit: *₦${wallet.agricCredit.toLocaleString()}*\nTotal: *₦${(wallet.balance + wallet.agricCredit).toLocaleString()}*\n\n_Top up via the AgroConnect app_`;
}

export function helpMessage(): string {
  return `🌱 *Welcome to AgroConnect Bot!*\n\nWhat can I help you with?\n\n💰 *price* <product> — Check input prices\n📦 *track* <order no> — Track your order\n💳 *balance* — Check your wallet\n\n_Example: price hybrid maize seeds_\n_Example: track AGR-2026-001234_\n\nVisit *agroconnect.ng* for the full experience.`;
}
