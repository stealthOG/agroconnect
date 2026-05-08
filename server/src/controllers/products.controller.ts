import type { Response } from 'express';
import { prisma } from '../lib/prisma';
import type { AuthRequest } from '../middleware/auth';
import {
  createProductSchema,
  updateProductSchema,
  productQuerySchema,
} from '../validators/products';

/* ── shape the product for the frontend ── */
function fmt(p: Record<string, unknown> & { supplier?: Record<string, unknown> }) {
  return {
    id:                 p['id'],
    name:               p['name'],
    fullName:           p['fullName'] ?? p['name'],
    emoji:              p['emoji'] ?? '🌱',
    description:        p['description'] ?? '',
    features:           p['features'] ?? [],
    inputType:          p['inputType'],
    subCategory:        p['subCategory'],
    region:             p['region'],
    price:              p['price'],
    unit:               p['unit'],
    stock:              p['stock'],
    minOrder:           p['minOrder'] ?? 1,
    inStock:            (p['stock'] as number) > 0,
    isActive:           p['isActive'],
    supplierId:         p['supplierId'],
    supplier:           p['supplierName'] ?? (p['supplier'] as Record<string, unknown>)?.['name'] ?? '',
    supplierVerified:   (p['supplier'] as Record<string, unknown>)?.['accountStatus'] === 'verified',
    verification:       p['verification'] ?? null,
    verificationNumber: p['verificationNumber'] ?? null,
    germination:        p['germination'] ?? null,
    purity:             p['purity'] ?? null,
    rating:             p['rating'],
    reviews:            p['reviewCount'],
    images:             p['images'] ?? [],
    createdAt:          p['createdAt'],
  };
}

/* ══════════════════════════════════════════
   GET /api/v1/products
══════════════════════════════════════════ */
export async function listProducts(req: AuthRequest, res: Response): Promise<void> {
  const q = productQuerySchema.safeParse(req.query);
  if (!q.success) {
    res.status(422).json({ success: false, error: q.error.flatten().fieldErrors });
    return;
  }

  const { inputType, subCategory, region, search, supplierId, isActive, page, limit, sort } = q.data;

  const where: Record<string, unknown> = {};

  // Only show active products to non-suppliers; suppliers see their own regardless of status
  if (req.user?.role === 'supplier') {
    where['supplierId'] = req.user.userId;
  } else {
    where['isActive'] = true;
  }

  // Allow explicit isActive override (admin/supplier filtering drafts)
  if (isActive !== undefined && req.user?.role === 'supplier') {
    where['isActive'] = isActive === 'true';
  }

  if (inputType && inputType !== 'all') where['inputType'] = inputType;
  if (subCategory && subCategory !== 'All') where['subCategory'] = subCategory;
  if (region && region !== 'All Regions') where['region'] = { in: [region, 'All Regions'] };
  if (supplierId) where['supplierId'] = supplierId;

  if (search) {
    where['OR'] = [
      { name:        { contains: search, mode: 'insensitive' } },
      { subCategory: { contains: search, mode: 'insensitive' } },
      { supplierName:{ contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ];
  }

  const orderBy: Record<string, string> = {
    price_asc:  'price',
    price_desc: 'price',
    rating:     'rating',
    newest:     'createdAt',
  };

  const skip  = (page - 1) * limit;
  const [total, products] = await Promise.all([
    prisma.product.count({ where } as Parameters<typeof prisma.product.count>[0]),
    prisma.product.findMany({
      where,
      skip,
      take:    limit,
      orderBy: sort
        ? { [orderBy[sort]]: sort === 'price_asc' ? 'asc' : 'desc' }
        : { createdAt: 'desc' },
      include: { supplier: { select: { name: true, accountStatus: true } } },
    } as Parameters<typeof prisma.product.findMany>[0]),
  ]);

  res.json({
    success: true,
    data:    (products as unknown[]).map(p => fmt(p as Record<string, unknown>)),
    meta:    { total, page, limit, pages: Math.ceil(total / limit) },
  });
}

/* ══════════════════════════════════════════
   GET /api/v1/products/:id
══════════════════════════════════════════ */
export async function getProduct(req: AuthRequest, res: Response): Promise<void> {
  const product = await prisma.product.findUnique({
    where:   { id: req.params['id'] },
    include: { supplier: { select: { name: true, accountStatus: true } } },
  } as Parameters<typeof prisma.product.findUnique>[0]);

  if (!product || (!product.isActive && req.user?.userId !== product.supplierId)) {
    res.status(404).json({ success: false, error: 'Product not found' });
    return;
  }

  res.json({ success: true, data: fmt(product as unknown as Record<string, unknown>) });
}

/* ══════════════════════════════════════════
   POST /api/v1/products  (supplier only)
══════════════════════════════════════════ */
export async function createProduct(req: AuthRequest, res: Response): Promise<void> {
  const result = createProductSchema.safeParse(req.body);
  if (!result.success) {
    res.status(422).json({ success: false, error: result.error.flatten().fieldErrors });
    return;
  }

  const supplierUser = await prisma.user.findUnique({ where: { id: req.user!.userId } });
  if (!supplierUser) { res.status(404).json({ success: false, error: 'User not found' }); return; }

  const product = await prisma.product.create({
    data: {
      ...result.data,
      supplierId:   req.user!.userId,
      supplierName: supplierUser.name,
      features:     result.data.features ?? [],
      region:       result.data.region ?? 'All Regions',
      minOrder:     result.data.minOrder ?? 1,
      isActive:     false, // draft until supplier publishes
    },
  } as Parameters<typeof prisma.product.create>[0]);

  res.status(201).json({ success: true, data: fmt(product as unknown as Record<string, unknown>) });
}

/* ══════════════════════════════════════════
   PATCH /api/v1/products/:id  (supplier only)
══════════════════════════════════════════ */
export async function updateProduct(req: AuthRequest, res: Response): Promise<void> {
  const existing = await prisma.product.findUnique({ where: { id: req.params['id'] } } as Parameters<typeof prisma.product.findUnique>[0]);
  if (!existing) { res.status(404).json({ success: false, error: 'Product not found' }); return; }
  if (existing.supplierId !== req.user!.userId) {
    res.status(403).json({ success: false, error: 'You can only edit your own products' });
    return;
  }

  const result = updateProductSchema.safeParse(req.body);
  if (!result.success) {
    res.status(422).json({ success: false, error: result.error.flatten().fieldErrors });
    return;
  }

  const product = await prisma.product.update({
    where: { id: req.params['id'] },
    data:  result.data,
  } as Parameters<typeof prisma.product.update>[0]);

  res.json({ success: true, data: fmt(product as unknown as Record<string, unknown>) });
}

/* ══════════════════════════════════════════
   DELETE /api/v1/products/:id  (supplier only)
══════════════════════════════════════════ */
export async function deleteProduct(req: AuthRequest, res: Response): Promise<void> {
  const existing = await prisma.product.findUnique({ where: { id: req.params['id'] } } as Parameters<typeof prisma.product.findUnique>[0]);
  if (!existing) { res.status(404).json({ success: false, error: 'Product not found' }); return; }
  if (existing.supplierId !== req.user!.userId) {
    res.status(403).json({ success: false, error: 'You can only delete your own products' });
    return;
  }

  await prisma.product.update({
    where: { id: req.params['id'] },
    data:  { isActive: false },
  } as Parameters<typeof prisma.product.update>[0]);

  res.json({ success: true, message: 'Product removed' });
}
