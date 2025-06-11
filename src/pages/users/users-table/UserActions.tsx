import Button from '@/components/ui/button';
import Edit from '@/assets/svg/edit.svg?react';
import Trash from '@/assets/svg/trash.svg?react';

export default function UserActions() {
  return (
    <div className="flex gap-16">
      <Button variant="icon" title="Edit user" className="p-6">
        <Edit />
      </Button>
      <Button variant="icon" title="Delete user" className="p-6">
        <Trash />
      </Button>
    </div>
  );
}
