import Success from '@/assets/svg/success.svg?react';
import Close from '@/assets/svg/close.svg?react';
import Button from './button';
import { toast } from 'sonner';

interface Props {
  id: string | number;
  message: string;
}

export default function Toast({ id, message }: Props) {
  return (
    <div
      className="flex w-max max-w-[35rem] items-center gap-8 rounded-md bg-white px-16 py-24 text-black shadow-lg"
      aria-label="notification"
    >
      <Success height={20} width={20} />
      <p className="text-base font-semibold text-black">{message}</p>
      <Button
        variant="icon"
        onClick={() => toast.dismiss(id)}
        className="ml-16"
      >
        <Close height={12} width={12} />
      </Button>
    </div>
  );
}
