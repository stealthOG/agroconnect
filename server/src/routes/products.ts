import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth';
import { asyncHandler } from '../middleware/asyncHandler';
import {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/products.controller';
import reviewsRouter from './reviews';

const router = Router();

router.get('/',      requireAuth, asyncHandler(listProducts));
router.get('/:id',   requireAuth, asyncHandler(getProduct));
router.post('/',     requireAuth, requireRole('supplier'), asyncHandler(createProduct));
router.patch('/:id', requireAuth, requireRole('supplier'), asyncHandler(updateProduct));
router.delete('/:id',requireAuth, requireRole('supplier'), asyncHandler(deleteProduct));

router.use('/:id/reviews', reviewsRouter);

export default router;
