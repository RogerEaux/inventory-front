import Button from '@/components/ui/button';
import Edit from '@/assets/svg/edit.svg?react';
import Trash from '@/assets/svg/trash.svg?react';
import UsersModal from '../UsersModal';
import type { User } from '@/schemas/general/userSchema';

interface Props {
  user: User;
}

export default function UserActions({ user }: Props) {
  return (
    <div className="flex gap-16">
      <UsersModal type="edit" user={user}>
        <Button variant="icon" title="Edit user" className="p-6">
          <Edit />
        </Button>
      </UsersModal>
      <Button variant="icon" title="Delete user" className="p-6">
        <Trash />
      </Button>
    </div>
  );
}
