import type { Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import type { AuthRequest } from '../middleware/auth';

type EnrollRow = {
  id: string; courseId: string; userId: string; progress: number;
  completedAt: Date | null; enrolledAt: Date; updatedAt: Date;
  course: {
    id: string; title: string; description: string | null;
    expertId: string; price: number; duration: string | null;
    imageUrl: string | null; isPublished: boolean; enrollCount: number;
    modules: { id: string; title: string; videoUrl: string | null; duration: string | null; order: number }[];
    expert: { name: string; avatarUrl: string | null };
  };
};

/* ── GET /api/v1/courses/enrolled ── */
export async function listEnrolled(req: AuthRequest, res: Response): Promise<void> {
  const userId = req.user!.userId;

  const enrollments = await prisma.courseEnrollment.findMany({
    where:   { userId },
    include: {
      course: {
        include: {
          modules: { orderBy: { order: 'asc' } },
          expert:  { select: { name: true, avatarUrl: true } },
        },
      },
    },
    orderBy: { enrolledAt: 'desc' },
  } as Parameters<typeof prisma.courseEnrollment.findMany>[0]) as unknown as EnrollRow[];

  res.json({ success: true, data: enrollments });
}

/* ── POST /api/v1/courses/:id/enrol ── */
export async function enrolInCourse(req: AuthRequest, res: Response): Promise<void> {
  const userId   = req.user!.userId;
  const courseId = req.params['id']!;

  const course = await prisma.course.findUnique({
    where: { id: courseId } as Parameters<typeof prisma.course.findUnique>[0]['where'],
    select: { id: true, price: true, isPublished: true },
  } as Parameters<typeof prisma.course.findUnique>[0]) as { id: string; price: number; isPublished: boolean } | null;

  if (!course || !course.isPublished) {
    res.status(404).json({ success: false, error: 'Course not found' });
    return;
  }

  // Check already enrolled
  const existing = await prisma.courseEnrollment.findUnique({
    where: { userId_courseId: { userId, courseId } } as Parameters<typeof prisma.courseEnrollment.findUnique>[0]['where'],
  } as Parameters<typeof prisma.courseEnrollment.findUnique>[0]);

  if (existing) {
    res.status(409).json({ success: false, error: 'Already enrolled in this course' });
    return;
  }

  // Paid course — expect paystackRef from verified payment
  if (course.price > 0) {
    const { paystackRef } = req.body as { paystackRef?: string };
    if (!paystackRef) {
      res.status(402).json({ success: false, error: 'Payment required', price: course.price });
      return;
    }
    // In production: verify payment reference via Paystack API here
    const enrollment = await prisma.courseEnrollment.create({
      data: { userId, courseId, paystackRef },
    } as Parameters<typeof prisma.courseEnrollment.create>[0]);
    await prisma.course.update({
      where: { id: courseId },
      data:  { enrollCount: { increment: 1 } },
    } as Parameters<typeof prisma.course.update>[0]);
    res.status(201).json({ success: true, data: enrollment });
    return;
  }

  // Free course
  const enrollment = await prisma.courseEnrollment.create({
    data: { userId, courseId },
  } as Parameters<typeof prisma.courseEnrollment.create>[0]);
  await prisma.course.update({
    where: { id: courseId },
    data:  { enrollCount: { increment: 1 } },
  } as Parameters<typeof prisma.course.update>[0]);

  res.status(201).json({ success: true, data: enrollment });
}

/* ── PATCH /api/v1/courses/:id/progress ── */
export async function updateProgress(req: AuthRequest, res: Response): Promise<void> {
  const userId   = req.user!.userId;
  const courseId = req.params['id']!;

  const parsed = z.object({ progress: z.number().int().min(0).max(100) }).safeParse(req.body);
  if (!parsed.success) {
    res.status(422).json({ success: false, error: parsed.error.flatten() });
    return;
  }

  const enrollment = await prisma.courseEnrollment.findUnique({
    where: { userId_courseId: { userId, courseId } } as Parameters<typeof prisma.courseEnrollment.findUnique>[0]['where'],
  } as Parameters<typeof prisma.courseEnrollment.findUnique>[0]) as { id: string } | null;

  if (!enrollment) {
    res.status(404).json({ success: false, error: 'Not enrolled in this course' });
    return;
  }

  const progress     = parsed.data.progress;
  const completedAt  = progress === 100 ? new Date() : null;

  const updated = await prisma.courseEnrollment.update({
    where: { id: enrollment.id } as Parameters<typeof prisma.courseEnrollment.update>[0]['where'],
    data:  { progress, ...(completedAt ? { completedAt } : {}) },
  } as Parameters<typeof prisma.courseEnrollment.update>[0]);

  res.json({ success: true, data: updated });
}

/* ── GET /api/v1/courses/:id (public course detail) ── */
export async function getCourseDetail(req: AuthRequest, res: Response): Promise<void> {
  const userId   = req.user?.userId;
  const courseId = req.params['id']!;

  const course = await prisma.course.findUnique({
    where:   { id: courseId } as Parameters<typeof prisma.course.findUnique>[0]['where'],
    include: {
      modules: { orderBy: { order: 'asc' } },
      expert:  { select: { name: true, avatarUrl: true, lga: true, state: true } },
    },
  } as Parameters<typeof prisma.course.findUnique>[0]) as unknown as {
    id: string; title: string; description: string | null; expertId: string;
    price: number; duration: string | null; imageUrl: string | null;
    isPublished: boolean; enrollCount: number; rating: number;
    modules: { id: string; title: string; videoUrl: string | null; duration: string | null; order: number }[];
    expert: { name: string; avatarUrl: string | null; lga: string | null; state: string | null };
  } | null;

  if (!course || !course.isPublished) {
    res.status(404).json({ success: false, error: 'Course not found' });
    return;
  }

  // Check enrollment status
  let enrollment = null;
  if (userId) {
    enrollment = await prisma.courseEnrollment.findUnique({
      where: { userId_courseId: { userId, courseId } } as Parameters<typeof prisma.courseEnrollment.findUnique>[0]['where'],
      select: { progress: true, completedAt: true },
    } as Parameters<typeof prisma.courseEnrollment.findUnique>[0]);
  }

  res.json({ success: true, data: { ...course, enrollment } });
}
