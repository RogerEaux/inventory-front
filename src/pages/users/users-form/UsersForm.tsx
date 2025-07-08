import Input from '@/components/ui/input';
import Label from '@/components/ui/Label';
import { userSchema, type User } from '@/schemas/form/userSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from '@/lib/toast';
import MultiSelectInput from '@/components/ui/MultiSelectInput';
import { departmentOptions, roleOptions } from './roleOptions';
import SelectInput from '@/components/ui/SelectInput';
import { useCreateUserMutation } from '@/hooks/services/useCreateUserMutation';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/useAuthStore';
import { useUserFormStore } from '@/stores/useUserFormStore';
import { useRef } from 'react';
import { FormButtons } from '@/components/ui/form/FormButtons';
import { useUpdateUserMutation } from '@/hooks/services/useUpdateUserMutation';

export default function UsersForm() {
  const user = useUserFormStore((state) => state.user);
  const roles = useAuthStore((state) => state.roles);
  const department = useAuthStore((state) => state.department);

  const closeRef = useRef<HTMLButtonElement>(null);
  const isEdit = !!user;
  const isAdmin = roles?.includes('ADMIN');

  const defaultValues = {
    name: user?.name ?? '',
    email: user?.email ?? '',
    roles: user?.roles ?? [],
    department: user?.department ?? department ?? 'SWAG',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: defaultValues,
  });

  const queryClient = useQueryClient();
  const createUserMutation = useCreateUserMutation();
  const updateUserMutation = useUpdateUserMutation();
  const isPending =
    createUserMutation.isPending || updateUserMutation.isPending;

  function onUserMutationSuccess() {
    const message = isEdit
      ? 'User updated successfully'
      : 'New user created successfully';
    toast.success(message);
    queryClient.invalidateQueries({ queryKey: ['users'] });
    closeRef.current?.click();
  }

  function onUserMutationError(error: Error) {
    toast.error(error.message);
    closeRef.current?.click();
  }

  function onValidSumbit(data: User) {
    if (isEdit) {
      updateUserMutation.mutate(
        { ...data, id: user.id },
        {
          onSuccess: () => onUserMutationSuccess(),
          onError: (error) => onUserMutationError(error),
        },
      );
    } else {
      createUserMutation.mutate(data, {
        onSuccess: () => onUserMutationSuccess(),
        onError: (error) => onUserMutationError(error),
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onValidSumbit)}
      aria-label="User form"
      noValidate
    >
      <div className="col mb-40 grid w-full grid-cols-2 gap-32 max-md:grid-cols-1">
        <Label id="name" label="*Name" error={errors.name?.message ?? ''}>
          <Input
            autoComplete="name"
            id="name"
            placeholder="Name"
            {...register('name')}
          />
        </Label>

        <Label id="email" label="*Email" error={errors.email?.message ?? ''}>
          <Input
            autoComplete="email"
            id="email"
            placeholder="Email"
            type="email"
            {...register('email')}
          />
        </Label>

        <Label
          id="department"
          label="*Department"
          error={errors.department?.message ?? ''}
        >
          <Controller
            name="department"
            control={control}
            render={({ field }) => (
              <SelectInput
                id="department"
                options={departmentOptions}
                value={field.value}
                onChange={field.onChange}
                disabled={!isAdmin}
              />
            )}
          />
        </Label>

        <Label id="roles" label="*Roles" error={errors.roles?.message ?? ''}>
          <Controller
            name="roles"
            control={control}
            render={({ field }) => (
              <MultiSelectInput
                id="roles"
                options={roleOptions}
                value={field.value}
                onChange={field.onChange}
                placeholder="Select roles"
              />
            )}
          />
        </Label>
      </div>

      <FormButtons isPending={isPending} ref={closeRef} />
    </form>
  );
}
