import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog';
import Button from '@/components/ui/button';
import { useRef, type PropsWithChildren } from 'react';

interface Props {
  title: string;
  description: string;
  isPending: boolean;
  onConfirm: () => Promise<void>;
}

export default function ConfirmDialog({
  title,
  description,
  isPending,
  onConfirm,
  children,
}: PropsWithChildren<Props>) {
  const closeRef = useRef<HTMLButtonElement>(null);

  async function handleConfirm() {
    await onConfirm();
    closeRef.current?.click();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-1/4 bg-white p-24">
        <DialogHeader className="mb-16">
          <DialogTitle className="mb-8" asChild>
            <h2 className="text-xl font-medium">{title}</h2>
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-8">
          <DialogClose asChild>
            <Button variant="cancel">Cancel</Button>
          </DialogClose>
          <Button onClick={handleConfirm} disabled={isPending}>
            Confirm
          </Button>

          <DialogClose asChild>
            <Button ref={closeRef} type="button" className="hidden"></Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
