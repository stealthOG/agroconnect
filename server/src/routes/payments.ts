import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import { requireAuth, requireRole } from '../middleware/auth';
import { initializePayment, verifyPayment } from '../controllers/payments.controller';

const router = Router();

const paymentLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { success: false, error: 'Too many payment requests' },
});

/* POST /webhook is registered separately in app.ts with raw body middleware */
router.post('/initialize',          requireAuth, requireRole('farmer'), paymentLimit, initializePayment);
router.get('/verify/:reference',    requireAuth, verifyPayment);

export default router;
