import { z } from 'zod';

export const incomeSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  amount: z.number().positive('Amount must be positive'),
  categoryId: z.number().int().positive('Invalid category ID'),
  notes: z.string().max(200, 'Notes too long').optional(),
  isRecurring: z.boolean().optional(),
  showInStats: z.boolean().optional(),
});

export const incomeUpdateSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(2, 'Title must be at least 2 characters').optional(),
  amount: z.number().positive('Amount must be positive').optional(),
  categoryId: z.number().int().positive('Invalid category ID').optional(),
  notes: z.string().max(200, 'Notes too long').optional(),
  isRecurring: z.boolean().optional(),
  showInStats: z.boolean().optional(),
});

export type ExpenseInput = z.infer<typeof incomeSchema>;
export type ExpenseUpdateInput = z.infer<typeof incomeUpdateSchema>;
