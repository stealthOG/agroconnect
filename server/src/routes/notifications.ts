import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import { requireAuth } from '../middleware/auth';
import { asyncHandler } from '../middleware/asyncHandler';
import { listNotifications, markRead, markAllRead } from '../controllers/notifications.controller';
import { sseStream } from '../controllers/stream.controller';

const router = Router();

/* Rate-limit the SSE endpoint — max 5 concurrent connections per IP */
const sseLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { success: false, error: 'Too many stream connections' },
  keyGenerator: (req) => req.ip ?? 'unknown',
});

router.get('/stream',   sseLimit, sseStream);
router.get('/',         requireAuth, asyncHandler(listNotifications));
router.patch('/read-all',requireAuth, asyncHandler(markAllRead));
router.patch('/:id/read',requireAuth, asyncHandler(markRead));

export default router;
