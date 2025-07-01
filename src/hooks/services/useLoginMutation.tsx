import { useMutation } from '@tanstack/react-query';
import type { LoginFormValues } from '@/schemas/form/loginSchema';
import { login } from '@/services/auth';

export function useLoginMutation() {
  async function mutationFn({ email, password }: LoginFormValues) {
    try {
      await login(email, password);
    } catch {
      throw new Error('Invalid credentials');
    }
  }

  return useMutation({
    mutationFn,
  });
}
