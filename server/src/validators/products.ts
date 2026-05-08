import { z } from 'zod';

const INPUT_TYPES = ['seeds', 'fertilizers', 'crop-protect', 'equipment', 'post-harvest'] as const;
const VERIFICATION = ['nasc', 'nafdac', 'supplier'] as const;

export const createProductSchema = z.object({
  name:               z.string().min(2).max(200),
  fullName:           z.string().max(300).optional(),
  emoji:              z.string().max(10).optional(),
  description:        z.string().max(2000).optional(),
  features:           z.array(z.string().max(200)).max(10).optional(),
  inputType:          z.enum(INPUT_TYPES),
  subCategory:        z.string().min(1).max(100),
  region:             z.string().max(100).optional(),
  price:              z.number().positive(),
  unit:               z.string().min(1).max(50),
  stock:              z.number().int().nonnegative(),
  minOrder:           z.number().int().positive().optional(),
  verification:       z.enum(VERIFICATION).optional(),
  verificationNumber: z.string().max(100).optional(),
  germination:        z.string().max(20).optional(),
  purity:             z.string().max(20).optional(),
});

export const updateProductSchema = createProductSchema.partial().extend({
  isActive: z.boolean().optional(),
});

export const productQuerySchema = z.object({
  inputType:   z.string().optional(),
  subCategory: z.string().optional(),
  region:      z.string().optional(),
  search:      z.string().max(200).optional(),
  supplierId:  z.string().optional(),
  isActive:    z.enum(['true', 'false']).optional(),
  page:        z.coerce.number().int().positive().default(1),
  limit:       z.coerce.number().int().positive().max(100).default(20),
  sort:        z.enum(['price_asc', 'price_desc', 'rating', 'newest']).optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type ProductQuery       = z.infer<typeof productQuerySchema>;
