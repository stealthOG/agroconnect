import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth';
import { asyncHandler } from '../middleware/asyncHandler';
import { listCourses, getCourse, createCourse, updateCourse } from '../controllers/courses.controller';
import { listEnrolled, enrolInCourse, updateProgress, getCourseDetail } from '../controllers/enrollment.controller';

const router = Router();

router.get('/enrolled', requireAuth, asyncHandler(listEnrolled));
router.get('/',         requireAuth, listCourses);
router.get('/:id',      requireAuth, asyncHandler(getCourseDetail));
router.post('/',        requireAuth, requireRole('expert'), createCourse);
router.patch('/:id',    requireAuth, requireRole('expert'), updateCourse);

router.post('/:id/enrol',    requireAuth, asyncHandler(enrolInCourse));
router.patch('/:id/progress',requireAuth, asyncHandler(updateProgress));

export default router;
