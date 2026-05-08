import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth';
import { asyncHandler } from '../middleware/asyncHandler';
import { listMembers, addMember, updateMember, removeMember } from '../controllers/coop.controller';

const router = Router();

router.use(requireAuth, requireRole('cooperative'));

router.get('/',       asyncHandler(listMembers));
router.post('/',      asyncHandler(addMember));
router.patch('/:id',  asyncHandler(updateMember));
router.delete('/:id', asyncHandler(removeMember));

export default router;
