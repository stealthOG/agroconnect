import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth';
import { asyncHandler } from '../middleware/asyncHandler';
import { listProduce, myListings, createListing, deleteListing } from '../controllers/produce.controller';

const router = Router();

router.get('/',       requireAuth,                          asyncHandler(listProduce));
router.get('/mine',   requireAuth, requireRole('farmer'),   asyncHandler(myListings));
router.post('/',      requireAuth, requireRole('farmer'),   asyncHandler(createListing));
router.delete('/:id', requireAuth, requireRole('farmer'),   asyncHandler(deleteListing));

export default router;
