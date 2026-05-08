import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth';
import { asyncHandler } from '../middleware/asyncHandler';
import {
  getStats,
  listUsers,
  updateUserStatus,
  listLoans,
  updateLoan,
  broadcastNotification,
} from '../controllers/admin.controller';

const router = Router();

router.use(requireAuth, requireRole('admin'));

router.get('/stats',                    asyncHandler(getStats));
router.get('/users',                    asyncHandler(listUsers));
router.patch('/users/:id/status',       asyncHandler(updateUserStatus));
router.get('/loans',                    asyncHandler(listLoans));
router.patch('/loans/:id',              asyncHandler(updateLoan));
router.post('/notifications/broadcast', asyncHandler(broadcastNotification));

export default router;
