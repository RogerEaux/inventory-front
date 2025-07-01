import { useForm } from 'react-hook-form';
import { loginSchema, type LoginFormValues } from '@/schemas/form/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import PasswordInput from '@/components/ui/password-input/PasswordInput';
import Input from '@/components/ui/input';
import LoginError from '../LoginError';
import Button from '@/components/ui/button';
import { useLoginMutation } from '@/hooks/services/useLoginMutation';
import { useAuthRedirect } from '@/hooks/utils/useAuthRedirect';
import { useAuthStore } from '@/stores/useAuthStore';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
  useAuthRedirect();
  const { mutate, isPending, error } = useLoginMutation();
  const loading = useAuthStore((state) => state.loading);

  const errorMessage =
    errors.email?.message ?? errors.password?.message ?? error?.message;

  function onValidSumbit(data: LoginFormValues) {
    mutate({ email: data.email, password: data.password });
  }

  return (
    <form
      className="relative mt-56"
      onSubmit={handleSubmit(onValidSumbit)}
      aria-label="login"
      noValidate
    >
      {errorMessage && <LoginError message={errorMessage} />}
      <div>
        <label htmlFor="email" className="hidden"></label>
        <Input
          id="email"
          placeholder="Email"
          className="mb-2 rounded-t-md"
          variant="login"
          type="email"
          {...register('email')}
        />
      </div>
      <PasswordInput {...register('password')} />
      <Button
        type="submit"
        className="mt-32 w-full text-lg"
        disabled={isPending || loading}
      >
        Sign in
      </Button>
    </form>
  );
}
