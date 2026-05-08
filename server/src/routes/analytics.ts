import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth';
import { asyncHandler } from '../middleware/asyncHandler';
import { supplierAnalytics, expertAnalytics } from '../controllers/analytics.controller';

const router = Router();

router.get('/supplier', requireAuth, requireRole('supplier'), asyncHandler(supplierAnalytics));
router.get('/expert',   requireAuth, requireRole('expert'),   asyncHandler(expertAnalytics));

export default router;
