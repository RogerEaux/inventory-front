import { z } from 'zod';

export const userSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email address'),
    roles: z.array(z.string()).min(1, 'At least one role must be selected'),
    department: z.string().min(1, 'Department is required'),
  })
  .passthrough();

export type User = z.infer<typeof userSchema>;
