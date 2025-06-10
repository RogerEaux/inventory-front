import { z } from 'zod';

export const loginSchema = z
  .object({
    email: z.string().email('Please enter a valid email'),
    password: z.string(),
  })
  .refine((data) => data.email.trim() !== '' && data.password.trim() !== '', {
    message: 'Please enter valid credentials',
    path: ['login'],
  });

export type LoginFormValues = z.infer<typeof loginSchema> & { login?: string };
