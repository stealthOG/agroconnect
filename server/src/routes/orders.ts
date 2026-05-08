import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth';
import { asyncHandler } from '../middleware/asyncHandler';
import { listOrders, getOrder, createOrder, updateOrderStatus } from '../controllers/orders.controller';
import { listMessages, sendMessage } from '../controllers/messages.controller';
import { markShipped, getOrderTracking } from '../controllers/logistics.controller';

const router = Router();

router.get('/',             requireAuth, listOrders);
router.post('/',            requireAuth, requireRole('farmer'), createOrder);
router.get('/:id',          requireAuth, getOrder);
router.patch('/:id/status', requireAuth, requireRole('supplier', 'admin'), updateOrderStatus);

router.post('/:id/ship',     requireAuth, requireRole('supplier'), asyncHandler(markShipped));
router.get('/:id/tracking',  requireAuth, asyncHandler(getOrderTracking));
router.get('/:id/messages',  requireAuth, asyncHandler(listMessages));
router.post('/:id/messages', requireAuth, asyncHandler(sendMessage));

export default router;
