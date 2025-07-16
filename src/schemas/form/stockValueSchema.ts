import { z } from 'zod';

export const stockValueSchema = z.object({
  updates: z.record(
    z.string(),
    z
      .number({ invalid_type_error: 'Stock must be a number' })
      .int('Stock must be a whole number')
      .nonnegative('Stock must be 0 or more'),
  ),
});

export type StockValue = z.infer<typeof stockValueSchema>;
