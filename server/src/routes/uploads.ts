import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { uploadAny, uploadProductImages } from '../middleware/upload';
import { handleUpload, handleDelete } from '../controllers/uploads.controller';

const router = Router();

router.post('/',              requireAuth, uploadAny,           handleUpload);
router.post('/product-images',requireAuth, uploadProductImages, handleUpload);
router.delete('/:publicId',   requireAuth, handleDelete);

export default router;
