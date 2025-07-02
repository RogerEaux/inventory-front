import Button from '@/components/ui/button';
import Plus from '@/assets/svg/plus.svg?react';
import UsersModal from '../users-modal/UsersModal';
import { useUserFormStore } from '@/stores/useUserFormStore';

export default function UsersHeader() {
  const setUser = useUserFormStore((state) => state.setUser);
  const onAdd = () => setUser(null);

  return (
    <div className="flex items-center justify-between gap-32 p-16 max-sm:gap-16">
      <h1 className="text-3xl font-bold text-nowrap max-sm:text-2xl">
        User Management
      </h1>
      <UsersModal>
        <Button
          title="Add user"
          className="max-sm:p-8"
          variant="iconBackground"
          onClick={onAdd}
        >
          <Plus height={24} width={24} strokeWidth={4} />
        </Button>
      </UsersModal>
    </div>
  );
}
