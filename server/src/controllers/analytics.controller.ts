import type { Response } from 'express';
import { prisma } from '../lib/prisma';
import type { AuthRequest } from '../middleware/auth';

/* ── GET /api/v1/analytics/supplier ── */
export async function supplierAnalytics(req: AuthRequest, res: Response): Promise<void> {
  const supplierId = req.user!.userId;

  // All products owned by this supplier
  const products = await prisma.product.findMany({
    where:  { supplierId } as Parameters<typeof prisma.product.findMany>[0],
    select: { id: true, name: true, inputType: true },
  } as Parameters<typeof prisma.product.findMany>[0]) as { id: string; name: string; inputType: string }[];

  const productIds = products.map(p => p.id);

  if (productIds.length === 0) {
    res.json({ success: true, data: emptySupplierStats() });
    return;
  }

  // All order items for those products (include parent order)
  const items = await prisma.orderItem.findMany({
    where: { productId: { in: productIds } },
    include: { order: { select: { status: true, createdAt: true, farmerId: true } } },
  } as Parameters<typeof prisma.orderItem.findMany>[0]) as unknown as {
    productId: string; productName: string; price: number; qty: number; unit: string;
    orderId: string;
    order: { status: string; createdAt: Date; farmerId: string };
  }[];

  // ── KPIs ──────────────────────────────────────────────────────────────────
  const delivered   = items.filter(i => i.order.status === 'delivered');
  const cancelled   = items.filter(i => i.order.status === 'cancelled');
  const totalRevenue= delivered.reduce((s, i) => s + i.price * i.qty, 0);
  const totalUnits  = delivered.reduce((s, i) => s + i.qty, 0);
  const orderIds    = [...new Set(items.map(i => i.orderId))];
  const deliveredIds= [...new Set(delivered.map(i => i.orderId))];
  const cancelledIds= [...new Set(cancelled.map(i => i.orderId))];
  const avgOrderValue = deliveredIds.length > 0 ? totalRevenue / deliveredIds.length : 0;
  const fulfilmentRate = orderIds.length > 0
    ? Math.round((deliveredIds.length / orderIds.length) * 100)
    : 100;
  const cancelRate = orderIds.length > 0
    ? +((cancelledIds.length / orderIds.length) * 100).toFixed(1)
    : 0;

  // Repeat customers (farmers who ordered more than once)
  const farmerOrderCounts: Record<string, number> = {};
  items.forEach(i => { farmerOrderCounts[i.order.farmerId] = (farmerOrderCounts[i.order.farmerId] || 0) + 1; });
  const totalFarmers   = Object.keys(farmerOrderCounts).length;
  const repeatFarmers  = Object.values(farmerOrderCounts).filter(c => c > 1).length;
  const repeatPct = totalFarmers > 0 ? Math.round((repeatFarmers / totalFarmers) * 100) : 0;

  // ── Monthly revenue (last 12 months) ─────────────────────────────────────
  const now   = new Date();
  const monthly = Array.from({ length: 12 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 11 + i, 1);
    return { year: d.getFullYear(), month: d.getMonth(), label: d.toLocaleString('en-NG', { month: 'short' }), revenue: 0 };
  });
  delivered.forEach(item => {
    const d  = new Date(item.order.createdAt);
    const idx = monthly.findIndex(m => m.year === d.getFullYear() && m.month === d.getMonth());
    if (idx !== -1) monthly[idx].revenue += item.price * item.qty;
  });

  // ── Top products ─────────────────────────────────────────────────────────
  const productRevMap: Record<string, { name: string; units: number; revenue: number }> = {};
  delivered.forEach(item => {
    if (!productRevMap[item.productId]) {
      productRevMap[item.productId] = { name: item.productName, units: 0, revenue: 0 };
    }
    productRevMap[item.productId].units   += item.qty;
    productRevMap[item.productId].revenue += item.price * item.qty;
  });
  const topProducts = Object.values(productRevMap)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  // ── Category breakdown ────────────────────────────────────────────────────
  const catRevMap: Record<string, number> = {};
  const productTypeMap: Record<string, string> = {};
  products.forEach(p => { productTypeMap[p.id] = p.inputType; });
  delivered.forEach(item => {
    const cat = productTypeMap[item.productId] || 'other';
    catRevMap[cat] = (catRevMap[cat] || 0) + item.price * item.qty;
  });
  const catTotal = Object.values(catRevMap).reduce((s, v) => s + v, 0) || 1;
  const catColors: Record<string, string> = {
    seeds: '#1E8B4C', fertilizers: '#2563EB', 'crop-protect': '#D97706',
    equipment: '#7C3AED', 'post-harvest': '#0EA5E9',
  };
  const topCats = Object.entries(catRevMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 4)
    .map(([cat, rev]) => ({
      name:  cat.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      pct:   Math.round((rev / catTotal) * 100),
      color: catColors[cat] || '#6B7280',
    }));

  res.json({
    success: true,
    data: {
      totalRevenue,
      totalOrders: deliveredIds.length,
      totalUnits,
      avgOrderValue: Math.round(avgOrderValue),
      fulfilmentRate,
      cancelRate,
      repeatPct,
      monthlyRevenue: monthly.map(m => ({ label: m.label, revenue: Math.round(m.revenue) })),
      topProducts,
      topCats,
    },
  });
}

function emptySupplierStats() {
  const months = Array.from({ length: 12 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - 11 + i);
    return { label: d.toLocaleString('en-NG', { month: 'short' }), revenue: 0 };
  });
  return {
    totalRevenue: 0, totalOrders: 0, totalUnits: 0,
    avgOrderValue: 0, fulfilmentRate: 100, cancelRate: 0, repeatPct: 0,
    monthlyRevenue: months, topProducts: [], topCats: [],
  };
}

/* ── GET /api/v1/analytics/expert ── */
export async function expertAnalytics(req: AuthRequest, res: Response): Promise<void> {
  const expertId = req.user!.userId;

  const courses = await prisma.course.findMany({
    where:   { expertId } as Parameters<typeof prisma.course.findMany>[0],
    include: { enrollments: { select: { progress: true, completedAt: true } } },
    orderBy: { createdAt: 'desc' },
  } as Parameters<typeof prisma.course.findMany>[0]) as unknown as {
    id: string; title: string; price: number; isPublished: boolean;
    duration: string | null; enrollCount: number; rating: number; createdAt: Date;
    enrollments: { progress: number; completedAt: Date | null }[];
  }[];

  const totalCourses   = courses.length;
  const published      = courses.filter(c => c.isPublished).length;
  const totalStudents  = courses.reduce((s, c) => s + c.enrollments.length, 0);
  const totalRevenue   = courses.reduce((s, c) => s + c.price * c.enrollments.length, 0);
  const completedAll   = courses.reduce((s, c) => s + c.enrollments.filter(e => e.completedAt).length, 0);
  const completionRate = totalStudents > 0 ? Math.round((completedAll / totalStudents) * 100) : 0;
  const ratedCourses   = courses.filter(c => c.rating > 0);
  const avgRating      = ratedCourses.length
    ? +(ratedCourses.reduce((s, c) => s + c.rating, 0) / ratedCourses.length).toFixed(1)
    : 0;

  res.json({
    success: true,
    data: {
      totalCourses,
      published,
      totalStudents,
      totalRevenue,
      avgRating,
      completionRate,
      courses: courses.map(c => ({
        id:          c.id,
        title:       c.title,
        price:       c.price,
        isPublished: c.isPublished,
        duration:    c.duration ?? '',
        students:    c.enrollments.length,
        rating:      c.rating,
        revenue:     c.price * c.enrollments.length,
        status:      c.isPublished ? 'Published' : 'Draft',
      })),
    },
  });
}
