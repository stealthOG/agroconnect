import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { asyncHandler } from '../middleware/asyncHandler';
import { listReviews, submitReview } from '../controllers/reviews.controller';

const router = Router({ mergeParams: true }); // mergeParams to get :id from parent

router.get('/',  asyncHandler(listReviews));
router.post('/', requireAuth, asyncHandler(submitReview));

export default router;
