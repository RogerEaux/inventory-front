import Button from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';

export default function UsersFormButtons() {
  return (
    <div className="flex justify-end gap-12">
      <DialogClose asChild>
        <Button type="button" variant="cancel">
          Cancel
        </Button>
      </DialogClose>
      <Button type="submit">Save</Button>
    </div>
  );
}
