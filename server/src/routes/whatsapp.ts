import { Router } from 'express';
import express from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { whatsappWebhook } from '../controllers/whatsapp.controller';

const router = Router();

/* Twilio sends URL-encoded POST — needs its own body parser before the global one */
router.post('/webhook', express.urlencoded({ extended: false }), asyncHandler(whatsappWebhook));

export default router;
