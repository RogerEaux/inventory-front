import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState, type PropsWithChildren } from 'react';
import UsersForm from './users-form/UsersForm';
import type { User } from '@/schemas/general/userSchema';

interface Props {
  type: 'edit' | 'add';
  user?: User;
}

export default function UsersModal({
  type,
  user,
  children,
}: PropsWithChildren<Props>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-white px-48 py-36" aria-describedby="">
        <DialogHeader>
          <DialogTitle asChild className="mb-24">
            <h2 className="text-2xl font-medium">
              {type === 'edit' ? 'Edit User' : 'Add New User'}
            </h2>
          </DialogTitle>
        </DialogHeader>
        <UsersForm
          user={type === 'edit' ? user : undefined}
          type={type}
          onSubmit={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
