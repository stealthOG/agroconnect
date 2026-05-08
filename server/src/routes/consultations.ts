import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth';
import { asyncHandler } from '../middleware/asyncHandler';
import {
  bookConsultation,
  listConsultations,
  updateConsultation,
} from '../controllers/consultations.controller';

const router = Router();

router.get('/',     requireAuth, asyncHandler(listConsultations));
router.post('/',    requireAuth, asyncHandler(bookConsultation));
router.patch('/:id',requireAuth, requireRole('expert'), asyncHandler(updateConsultation));

export default router;
