import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { type PropsWithChildren } from 'react';
import UsersForm from '../users-form/UsersForm';
import { useUserFormStore } from '@/stores/useUserFormStore';

export default function UsersModal({ children }: PropsWithChildren) {
  const user = useUserFormStore((state) => state.user);
  const isEdit = !!user;

  return (
    <Dialog modal>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-white px-48 py-36" aria-describedby="">
        <DialogHeader>
          <DialogTitle asChild className="mb-24">
            <h2 className="text-2xl font-medium">
              {isEdit ? 'Edit User' : 'Add New User'}
            </h2>
          </DialogTitle>
        </DialogHeader>
        <UsersForm />
      </DialogContent>
    </Dialog>
  );
}
