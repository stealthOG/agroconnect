import type { Response } from 'express';
import { uploadFile, deleteFile, type UploadPurpose } from '../services/storage';
import type { AuthRequest } from '../middleware/auth';
import { prisma } from '../lib/prisma';

const VALID_PURPOSES: UploadPurpose[] = ['product-image', 'avatar', 'document'];

/* ══════════════════════════════════════════
   POST /api/v1/uploads
   Body: multipart/form-data
     file    — the file
     purpose — "product-image" | "avatar" | "document"
     entityId — (optional) productId or userId to update immediately
══════════════════════════════════════════ */
export async function handleUpload(req: AuthRequest, res: Response): Promise<void> {
  if (!req.file) {
    res.status(400).json({ success: false, error: 'No file provided' });
    return;
  }

  const purpose = req.body['purpose'] as UploadPurpose | undefined;
  if (!purpose || !VALID_PURPOSES.includes(purpose)) {
    res.status(422).json({
      success: false,
      error:   `purpose must be one of: ${VALID_PURPOSES.join(', ')}`,
    });
    return;
  }

  const result = await uploadFile(req.file.buffer, purpose, {
    filename: req.file.originalname,
    mimeType: req.file.mimetype,
  });

  /* Side effects: update related records immediately */
  const entityId = req.body['entityId'] as string | undefined;

  if (purpose === 'avatar' && req.user) {
    await prisma.user.update({
      where: { id: req.user.userId },
      data:  { avatarUrl: result.url },
    } as Parameters<typeof prisma.user.update>[0]);
  }

  if (purpose === 'product-image' && entityId) {
    const product = await prisma.product.findUnique({
      where: { id: entityId },
    } as Parameters<typeof prisma.product.findUnique>[0]);
    const p = product as Record<string, unknown> | null;

    if (p && p['supplierId'] === req.user?.userId) {
      const images = (p['images'] as string[]) ?? [];
      await prisma.product.update({
        where: { id: entityId },
        data:  { images: [...images, result.url] },
      } as Parameters<typeof prisma.product.update>[0]);
    }
  }

  res.json({
    success: true,
    data: {
      url:      result.url,
      publicId: result.publicId,
      devMode:  result.devMode,
    },
  });
}

/* ══════════════════════════════════════════
   DELETE /api/v1/uploads/:publicId
══════════════════════════════════════════ */
export async function handleDelete(req: AuthRequest, res: Response): Promise<void> {
  const raw      = req.params['publicId'];
  const publicId = decodeURIComponent(Array.isArray(raw) ? raw[0] ?? '' : raw ?? '');
  if (!publicId) { res.status(400).json({ success: false, error: 'publicId required' }); return; }

  await deleteFile(publicId);
  res.json({ success: true });
}
