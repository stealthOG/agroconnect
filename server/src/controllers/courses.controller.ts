import type { Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import type { AuthRequest } from '../middleware/auth';

const courseSchema = z.object({
  title:       z.string().min(3).max(200),
  description: z.string().max(2000).optional(),
  price:       z.number().nonnegative().default(0),
  duration:    z.string().max(50).optional(),
  imageUrl:    z.string().url().optional().or(z.literal('')),
  isPublished: z.boolean().optional(),
});

const querySchema = z.object({
  page:  z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(20),
  mine:  z.coerce.boolean().optional(),
});

function fmt(c: Record<string, unknown>) {
  const expert = c['expert'] as Record<string, unknown> | undefined;
  return {
    id:          c['id'],
    title:       c['title'],
    description: c['description'],
    price:       c['price'],
    duration:    c['duration'],
    imageUrl:    c['imageUrl'],
    isPublished: c['isPublished'],
    enrollCount: c['enrollCount'],
    rating:      c['rating'],
    expertId:    c['expertId'],
    expertName:  expert?.['name'] ?? '',
    createdAt:   c['createdAt'],
  };
}

/* GET /api/v1/courses */
export async function listCourses(req: AuthRequest, res: Response): Promise<void> {
  const q = querySchema.safeParse(req.query);
  if (!q.success) { res.status(422).json({ success: false, error: q.error.flatten().fieldErrors }); return; }
  const { page, limit, mine } = q.data;
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = mine
    ? { expertId: req.user!.userId }
    : { isPublished: true };

  const [total, courses] = await Promise.all([
    prisma.course.count({ where } as Parameters<typeof prisma.course.count>[0]),
    prisma.course.findMany({
      where, skip, take: limit,
      orderBy: { createdAt: 'desc' },
      include: { expert: { select: { name: true } } },
    } as Parameters<typeof prisma.course.findMany>[0]),
  ]);

  res.json({ success: true, data: (courses as unknown[]).map(c => fmt(c as Record<string, unknown>)), meta: { total, page, limit } });
}

/* GET /api/v1/courses/:id */
export async function getCourse(req: AuthRequest, res: Response): Promise<void> {
  const course = await prisma.course.findUnique({
    where:   { id: req.params['id'] },
    include: { expert: { select: { name: true } } },
  } as Parameters<typeof prisma.course.findUnique>[0]);

  if (!course || (!(course as Record<string, unknown>)['isPublished'] && (course as Record<string, unknown>)['expertId'] !== req.user?.userId)) {
    res.status(404).json({ success: false, error: 'Course not found' }); return;
  }
  res.json({ success: true, data: fmt(course as unknown as Record<string, unknown>) });
}

/* POST /api/v1/courses — expert only */
export async function createCourse(req: AuthRequest, res: Response): Promise<void> {
  const result = courseSchema.safeParse(req.body);
  if (!result.success) { res.status(422).json({ success: false, error: result.error.flatten().fieldErrors }); return; }

  const { title, description, price, duration, imageUrl, isPublished } = result.data;
  const course = await prisma.course.create({
    data: { expertId: req.user!.userId, title, description, price, duration, imageUrl: imageUrl || undefined, isPublished: isPublished ?? false },
    include: { expert: { select: { name: true } } },
  } as Parameters<typeof prisma.course.create>[0]);

  res.status(201).json({ success: true, data: fmt(course as unknown as Record<string, unknown>) });
}

/* PATCH /api/v1/courses/:id — expert only */
export async function updateCourse(req: AuthRequest, res: Response): Promise<void> {
  const existing = await prisma.course.findUnique({ where: { id: req.params['id'] } } as Parameters<typeof prisma.course.findUnique>[0]);
  if (!existing || (existing as Record<string, unknown>)['expertId'] !== req.user!.userId) {
    res.status(404).json({ success: false, error: 'Course not found' }); return;
  }

  const result = courseSchema.partial().safeParse(req.body);
  if (!result.success) { res.status(422).json({ success: false, error: result.error.flatten().fieldErrors }); return; }

  const course = await prisma.course.update({
    where: { id: req.params['id'] }, data: result.data,
    include: { expert: { select: { name: true } } },
  } as Parameters<typeof prisma.course.update>[0]);

  res.json({ success: true, data: fmt(course as unknown as Record<string, unknown>) });
}
