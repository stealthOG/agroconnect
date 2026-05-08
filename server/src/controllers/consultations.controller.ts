import type { Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import type { AuthRequest } from '../middleware/auth';
import { randomBytes } from 'crypto';
import { notify } from '../lib/notify';

const slotSchema = z.object({
  startAt: z.string().datetime(),
  endAt:   z.string().datetime(),
  price:   z.number().min(0).default(0),
});

const bookSchema = z.object({
  slotId:     z.string(),
  notes:      z.string().max(500).optional(),
  paystackRef:z.string().optional(),
});

function generateMeetingUrl(): string {
  const id = randomBytes(6).toString('hex');
  return `https://meet.jit.si/agroconnect-${id}`;
}

type SlotRow = {
  id: string; expertId: string; startAt: Date; endAt: Date;
  price: number; isBooked: boolean; createdAt: Date;
};

type ConsultRow = {
  id: string; slotId: string; farmerId: string; expertId: string;
  status: string; meetingUrl: string; paystackRef: string | null;
  notes: string | null; createdAt: Date; updatedAt: Date;
  slot:   { startAt: Date; endAt: Date; price: number };
  farmer: { name: string; phone: string; avatarUrl: string | null };
  expert: { name: string; phone: string; avatarUrl: string | null };
};

/* ── GET /api/v1/experts/:id/slots ── */
export async function listSlots(req: AuthRequest, res: Response): Promise<void> {
  const expertId = req.params['id']!;
  const now      = new Date();

  const slots = await prisma.consultationSlot.findMany({
    where:   { expertId, startAt: { gte: now }, isBooked: false },
    orderBy: { startAt: 'asc' },
    take:    50,
  } as Parameters<typeof prisma.consultationSlot.findMany>[0]) as unknown as SlotRow[];

  res.json({ success: true, data: slots });
}

/* ── POST /api/v1/experts/:id/slots ── (expert creates availability) */
export async function createSlot(req: AuthRequest, res: Response): Promise<void> {
  const expertId = req.user!.userId;

  if (req.user!.role !== 'expert') {
    res.status(403).json({ success: false, error: 'Only experts can create slots' });
    return;
  }

  const parsed = slotSchema.safeParse(req.body);
  if (!parsed.success) { res.status(422).json({ success: false, error: parsed.error.flatten() }); return; }

  const { startAt, endAt, price } = parsed.data;
  if (new Date(startAt) >= new Date(endAt)) {
    res.status(422).json({ success: false, error: 'startAt must be before endAt' });
    return;
  }

  const slot = await prisma.consultationSlot.create({
    data: { expertId, startAt: new Date(startAt), endAt: new Date(endAt), price },
  } as Parameters<typeof prisma.consultationSlot.create>[0]);

  res.status(201).json({ success: true, data: slot });
}

/* ── DELETE /api/v1/experts/slots/:id ── */
export async function deleteSlot(req: AuthRequest, res: Response): Promise<void> {
  const expertId = req.user!.userId;
  const slotId   = req.params['slotId']!;

  const slot = await prisma.consultationSlot.findUnique({
    where: { id: slotId },
  } as Parameters<typeof prisma.consultationSlot.findUnique>[0]) as SlotRow | null;

  if (!slot || slot.expertId !== expertId) {
    res.status(404).json({ success: false, error: 'Slot not found' });
    return;
  }
  if (slot.isBooked) {
    res.status(409).json({ success: false, error: 'Cannot delete a booked slot' });
    return;
  }

  await prisma.consultationSlot.delete({
    where: { id: slotId },
  } as Parameters<typeof prisma.consultationSlot.delete>[0]);

  res.json({ success: true });
}

/* ── POST /api/v1/consultations ── (farmer books a slot) */
export async function bookConsultation(req: AuthRequest, res: Response): Promise<void> {
  const farmerId = req.user!.userId;

  const parsed = bookSchema.safeParse(req.body);
  if (!parsed.success) { res.status(422).json({ success: false, error: parsed.error.flatten() }); return; }

  const { slotId, notes, paystackRef } = parsed.data;

  const slot = await prisma.consultationSlot.findUnique({
    where: { id: slotId },
  } as Parameters<typeof prisma.consultationSlot.findUnique>[0]) as SlotRow | null;

  if (!slot || slot.isBooked) {
    res.status(409).json({ success: false, error: 'Slot not available' });
    return;
  }
  if (slot.startAt <= new Date()) {
    res.status(409).json({ success: false, error: 'Slot has already passed' });
    return;
  }
  if (slot.price > 0 && !paystackRef) {
    res.status(402).json({ success: false, error: 'Payment required', price: slot.price });
    return;
  }

  const meetingUrl = generateMeetingUrl();

  const [consultation] = await prisma.$transaction([
    prisma.consultation.create({
      data: {
        slotId,
        farmerId,
        expertId:   slot.expertId,
        meetingUrl,
        paystackRef: paystackRef ?? null,
        notes:       notes ?? null,
      },
    } as Parameters<typeof prisma.consultation.create>[0]),
    prisma.consultationSlot.update({
      where: { id: slotId },
      data:  { isBooked: true },
    } as Parameters<typeof prisma.consultationSlot.update>[0]),
  ]);

  /* Notify the expert */
  const farmer = await prisma.user.findUnique({
    where: { id: farmerId }, select: { name: true },
  } as Parameters<typeof prisma.user.findUnique>[0]) as { name: string } | null;
  const slotDate = slot.startAt.toLocaleDateString('en-NG', { weekday:'short', day:'numeric', month:'short' });
  await notify(slot.expertId, 'New Consultation Booked', `${farmer?.name ?? 'A farmer'} booked your slot on ${slotDate}.`);

  res.status(201).json({ success: true, data: consultation });
}

/* ── GET /api/v1/consultations ── (farmer or expert) */
export async function listConsultations(req: AuthRequest, res: Response): Promise<void> {
  const userId = req.user!.userId;
  const role   = req.user!.role;

  const where = role === 'expert'
    ? { expertId: userId }
    : { farmerId: userId };

  const consultations = await prisma.consultation.findMany({
    where,
    include: {
      slot:   { select: { startAt: true, endAt: true, price: true } },
      farmer: { select: { name: true, phone: true, avatarUrl: true } },
      expert: { select: { name: true, phone: true, avatarUrl: true } },
    },
    orderBy: { createdAt: 'desc' },
  } as Parameters<typeof prisma.consultation.findMany>[0]) as unknown as ConsultRow[];

  res.json({ success: true, data: consultations });
}

/* ── PATCH /api/v1/consultations/:id ── (expert updates status) */
export async function updateConsultation(req: AuthRequest, res: Response): Promise<void> {
  const expertId = req.user!.userId;
  const id       = req.params['id']!;

  const parsed = z.object({ status: z.enum(['confirmed','completed','cancelled']) }).safeParse(req.body);
  if (!parsed.success) { res.status(422).json({ success: false, error: parsed.error.flatten() }); return; }

  const existing = await prisma.consultation.findUnique({
    where: { id },
  } as Parameters<typeof prisma.consultation.findUnique>[0]) as { expertId: string } | null;

  if (!existing || existing.expertId !== expertId) {
    res.status(404).json({ success: false, error: 'Consultation not found' });
    return;
  }

  const updated = await prisma.consultation.update({
    where: { id },
    data:  { status: parsed.data.status },
  } as Parameters<typeof prisma.consultation.update>[0]);

  res.json({ success: true, data: updated });
}
