import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  color: z.string().optional(),
  icon: z.string().optional(),
  type: z.enum(['EXPENSE', 'INCOME']),
});

export const categoryUpdateSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(2).optional(),
  color: z.string().optional(),
  icon: z.string().optional(),
});

export type CategoryInput = z.infer<typeof categorySchema>;
export type CategoryUpdateInput = z.infer<typeof categoryUpdateSchema>;
