import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Please enter email')
    .email('Please enter a valid email'),
  password: z.string().min(1, 'Please enter password'),
});
export type LoginFormValues = z.infer<typeof loginSchema>;
