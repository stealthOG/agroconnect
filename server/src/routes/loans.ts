import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth';
import { asyncHandler } from '../middleware/asyncHandler';
import { listLoans, createLoan, updateLoan } from '../controllers/loans.controller';

const router = Router();

router.get('/',      requireAuth,                                     asyncHandler(listLoans));
router.post('/',     requireAuth, requireRole('cooperative'),         asyncHandler(createLoan));
router.patch('/:id', requireAuth, requireRole('institution', 'admin'),asyncHandler(updateLoan));

export default router;
