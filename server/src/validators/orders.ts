import { z } from 'zod';

export const createOrderSchema = z.object({
  items: z.array(z.object({
    productId: z.string().min(1),
    qty:       z.number().int().positive(),
  })).min(1, 'Cart cannot be empty'),

  deliveryName:    z.string().min(2).max(100),
  deliveryPhone:   z.string().min(7).max(20),
  deliveryAddress: z.string().min(5).max(300),
  deliveryState:   z.string().min(1).max(100),
  deliveryCity:    z.string().min(1).max(100),
  deliveryMethod:  z.enum(['standard', 'express']).default('standard'),
  paymentMethod:   z.enum(['agric-credit', 'wallet', 'card', 'transfer']),
  promoCode:       z.string().max(30).optional(),
});

export const updateOrderStatusSchema = z.object({
  status:       z.enum(['processing', 'shipped', 'in_transit', 'delivered', 'cancelled']),
  trackingCode: z.string().max(100).optional(),
});

export const orderQuerySchema = z.object({
  status: z.string().optional(),
  page:   z.coerce.number().int().positive().default(1),
  limit:  z.coerce.number().int().positive().max(50).default(20),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
