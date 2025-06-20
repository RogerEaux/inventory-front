import Button from '@/components/ui/button';
import Plus from '@/assets/svg/plus.svg?react';
import UsersTable from '../users-table/UsersTable';
import UsersModal from '../UsersModal';

export default function User() {
  return (
    <main className="flex flex-col items-center">
      <div className="w-full max-w-4/5 px-8 py-16 max-sm:max-w-full">
        <div className="flex items-center justify-between gap-32 p-16 max-sm:gap-16">
          <h1 className="text-3xl font-bold text-nowrap max-sm:text-2xl">
            User Management
          </h1>
          <UsersModal type="add">
            <Button
              title="Add user"
              className="max-sm:p-8"
              variant="iconBackground"
            >
              <Plus height={24} width={24} strokeWidth={4} />
            </Button>
          </UsersModal>
        </div>
        <UsersTable />
      </div>
    </main>
  );
}
