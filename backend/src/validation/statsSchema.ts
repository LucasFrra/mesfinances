import { z } from 'zod';

export const monthlyStatsSchema = z.object({
  month: z.number().int().min(1, 'Invalid month').max(12, 'Invalid month'),
  year: z.number().int().min(2000, 'Invalid year').max(2100, 'Invalid year'),
});

export const yearlyStatsSchema = z.object({
  year: z.number().int().min(2000, 'Invalid year').max(2100, 'Invalid year'),
});

export const compareMonthsSchema = z.object({
  monthA: z.number().int().min(1, 'Invalid month').max(12, 'Invalid month'),
  monthB: z.number().int().min(1, 'Invalid month').max(12, 'Invalid month'),
  year: z.number().int().min(2000, 'Invalid year').max(2100, 'Invalid year'),
});
