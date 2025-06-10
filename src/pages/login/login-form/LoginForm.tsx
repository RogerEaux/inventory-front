import { useForm } from 'react-hook-form';
import {
  loginSchema,
  type LoginFormValues,
} from '../../../schemas/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import PasswordInput from '../../../components/password-input/PasswordInput';
import Input from '@/components/ui/input';
import LoginError from '../LoginError';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/button';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();

  function onValidSumbit(data: LoginFormValues) {
    console.log('Submitting:', data);
    navigate('/');
  }

  return (
    <form
      className="relative mt-56"
      onSubmit={handleSubmit(onValidSumbit)}
      aria-label="login"
      noValidate
    >
      {(errors.login?.message && (
        <LoginError message={errors.login.message} />
      )) ||
        (errors.email?.message && (
          <LoginError message={errors.email.message} />
        ))}

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
      <Button type="submit" className="mt-32 w-full text-lg">
        Sign in
      </Button>
    </form>
  );
}
