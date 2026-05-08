/* ═══════════════════════════════════════════════════════════
   STORAGE SERVICE — Cloudinary
   ───────────────────────────────────────────────────────────
   TO CONNECT: Add to server/.env
     CLOUDINARY_CLOUD_NAME=your_cloud_name
     CLOUDINARY_API_KEY=your_api_key
     CLOUDINARY_API_SECRET=your_api_secret
   ═══════════════════════════════════════════════════════════ */

import { v2 as cloudinary } from 'cloudinary';

const isConfigured = (): boolean =>
  Boolean(
    process.env['CLOUDINARY_CLOUD_NAME'] &&
    process.env['CLOUDINARY_API_KEY'] &&
    process.env['CLOUDINARY_API_SECRET'],
  );

/* Lazily configure so the server starts without keys during dev */
function getCloudinary() {
  cloudinary.config({
    cloud_name: process.env['CLOUDINARY_CLOUD_NAME'],
    api_key:    process.env['CLOUDINARY_API_KEY'],
    api_secret: process.env['CLOUDINARY_API_SECRET'],
    secure:     true,
  });
  return cloudinary;
}

export type UploadPurpose = 'product-image' | 'avatar' | 'document';

interface UploadResult {
  url:       string;
  publicId:  string;
  width?:    number;
  height?:   number;
  format?:   string;
  devMode:   boolean;
}

/* Placeholder URLs served in dev when Cloudinary is not configured */
const DEV_PLACEHOLDERS: Record<UploadPurpose, string> = {
  'product-image': 'https://placehold.co/400x400/e8f5ee/1E8B4C?text=Product',
  'avatar':        'https://placehold.co/200x200/e8f5ee/1E8B4C?text=Avatar',
  'document':      'https://placehold.co/600x800/f3f4f6/374151?text=Document',
};

const FOLDER_MAP: Record<UploadPurpose, string> = {
  'product-image': 'agroconnect/products',
  'avatar':        'agroconnect/avatars',
  'document':      'agroconnect/documents',
};

/* ── Upload a buffer ── */
export async function uploadFile(
  buffer:  Buffer,
  purpose: UploadPurpose,
  opts?: { filename?: string; mimeType?: string },
): Promise<UploadResult> {
  if (!isConfigured()) {
    console.log(`[STORAGE:dev] Would upload ${opts?.filename ?? 'file'} as ${purpose}`);
    return {
      url:      DEV_PLACEHOLDERS[purpose],
      publicId: `dev/${purpose}/${Date.now()}`,
      devMode:  true,
    };
  }

  const cld     = getCloudinary();
  const folder  = FOLDER_MAP[purpose];
  const isImage = purpose !== 'document';

  return new Promise((resolve, reject) => {
    const uploadStream = cld.uploader.upload_stream(
      {
        folder,
        resource_type: isImage ? 'image' : 'raw',
        transformation: isImage
          ? [{ width: 1200, height: 1200, crop: 'limit', quality: 'auto:good', fetch_format: 'auto' }]
          : undefined,
      },
      (error, result) => {
        if (error)  return reject(new Error(`Cloudinary error: ${error.message}`));
        if (!result) return reject(new Error('No result from Cloudinary'));
        resolve({
          url:      result.secure_url,
          publicId: result.public_id,
          width:    result.width,
          height:   result.height,
          format:   result.format,
          devMode:  false,
        });
      },
    );
    uploadStream.end(buffer);
  });
}

/* ── Delete a file by publicId ── */
export async function deleteFile(publicId: string): Promise<void> {
  if (!isConfigured()) {
    console.log(`[STORAGE:dev] Would delete ${publicId}`);
    return;
  }
  const cld = getCloudinary();
  await cld.uploader.destroy(publicId);
}
