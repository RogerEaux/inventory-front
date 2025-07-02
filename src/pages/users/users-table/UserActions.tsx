import Button from '@/components/ui/button';
import Edit from '@/assets/svg/edit.svg?react';
import Trash from '@/assets/svg/trash.svg?react';
import UsersModal from '../users-modal/UsersModal';
import type { User } from '@/schemas/form/userSchema';
import { useDeleteUserMutation } from '@/hooks/services/useDeleteUserMutation';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from '@/lib/toast';
import { useUserFormStore } from '@/stores/useUserFormStore';
import ConfirmDialog from '@/components/ui/confirm-dialog/ConfirmDialog';

interface Props {
  user: User;
}

export default function UserActions({ user }: Props) {
  const setUser = useUserFormStore((state) => state.setUser);

  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useDeleteUserMutation();

  function onUserMutationSuccess() {
    toast.success('User deleted successfully');
    queryClient.invalidateQueries({ queryKey: ['users'] });
  }

  const onUserMutationError = (error: Error) => {
    toast.error(error.message);
  };

  const onDelete = async () => {
    try {
      await mutateAsync(user.id as string);
      onUserMutationSuccess();
    } catch (error) {
      onUserMutationError(error as Error);
    }
  };

  const onEdit = () => setUser(user);

  return (
    <div className="flex gap-16">
      <UsersModal>
        <Button
          variant="icon"
          title="Edit user"
          className="p-6"
          onClick={onEdit}
        >
          <Edit />
        </Button>
      </UsersModal>
      <ConfirmDialog
        title="Delete User"
        description={`Are you sure you want to delete ${user.name}? This action cannot be undone`}
        onConfirm={onDelete}
        isPending={isPending}
      >
        <Button variant="icon" title="Delete user" className="p-6">
          <Trash />
        </Button>
      </ConfirmDialog>
    </div>
  );
}
