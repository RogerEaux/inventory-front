import Button from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { forwardRef } from 'react';

interface Props {
  isPending: boolean;
}

export const FormButtons = forwardRef<HTMLButtonElement, Props>(
  ({ isPending }, ref) => {
    return (
      <div className="flex justify-end gap-12">
        <DialogClose asChild>
          <Button type="button" variant="cancel">
            Cancel
          </Button>
        </DialogClose>

        <Button type="submit" disabled={isPending}>
          Save
        </Button>

        <DialogClose asChild>
          <Button ref={ref} type="button" className="hidden"></Button>
        </DialogClose>
      </div>
    );
  },
);
