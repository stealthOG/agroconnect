import multer from 'multer';
import type { Request } from 'express';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const ALLOWED_DOC_TYPES   = ['application/pdf'];
const ALLOWED_ALL_TYPES   = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_DOC_TYPES];

function makeUpload(allowedTypes: string[], maxMb: number) {
  return multer({
    storage: multer.memoryStorage(),
    limits:  { fileSize: maxMb * 1024 * 1024 },
    fileFilter: (_req: Request, file, cb) => {
      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error(`File type ${file.mimetype} not allowed. Accepted: ${allowedTypes.join(', ')}`));
      }
    },
  });
}

/* Single-file uploads for different purposes */
export const uploadImage    = makeUpload(ALLOWED_IMAGE_TYPES, 5).single('file');
export const uploadDocument = makeUpload(ALLOWED_DOC_TYPES, 10).single('file');
export const uploadAny      = makeUpload(ALLOWED_ALL_TYPES, 10).single('file');

/* Multiple images (up to 5) for product listings */
export const uploadProductImages = makeUpload(ALLOWED_IMAGE_TYPES, 5).array('files', 5);
