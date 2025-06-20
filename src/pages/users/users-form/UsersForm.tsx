import Input from '@/components/ui/input';
import Label from '@/components/ui/Label';
import { userSchema, type User } from '@/schemas/general/userSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import UsersFormButtons from './UsersFormButtons';
import { toast } from 'sonner';
import Toast from '@/components/ui/Toast';

interface Props {
  user?: User;
  type: 'edit' | 'add';
  onSubmit: () => void;
}

export default function UsersForm({ user, type, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(userSchema),
  });

  function onValidSumbit(data: User) {
    console.log('Submitting:', data);
    onSubmit();
    toast.custom((id) => (
      <Toast
        id={id}
        message={
          type === 'edit'
            ? 'User updated successfully'
            : 'New user created successfully'
        }
      />
    ));
  }

  return (
    <form onSubmit={handleSubmit(onValidSumbit)} aria-label="login" noValidate>
      <div className="col mb-40 flex w-full gap-32 max-md:flex-col">
        <Label id="name" label="*Name" error={errors.name?.message ?? ''}>
          <Input
            id="name"
            placeholder="Name"
            {...register('name')}
            defaultValue={user?.name}
          />
        </Label>
        <Label id="email" label="*Email" error={errors.email?.message ?? ''}>
          <Input
            id="email"
            placeholder="Email"
            type="email"
            {...register('email')}
            defaultValue={user?.email}
          />
        </Label>
      </div>
      <UsersFormButtons />
    </form>
  );
}
