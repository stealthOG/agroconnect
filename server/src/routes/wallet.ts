import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { asyncHandler } from '../middleware/asyncHandler';
import { getWallet, listTransactions, initializeTopup } from '../controllers/wallet.controller';

const router = Router();

router.get('/',             requireAuth, asyncHandler(getWallet));
router.get('/transactions', requireAuth, asyncHandler(listTransactions));
router.post('/topup',       requireAuth, asyncHandler(initializeTopup));

export default router;
