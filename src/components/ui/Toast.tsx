import Success from '@/assets/svg/success.svg?react';
import Close from '@/assets/svg/close.svg?react';
import Alert from '@/assets/svg/alert.svg?react';
import Button from './button';
import { toast } from 'sonner';

interface Props {
  id: string | number;
  message: string;
  type: 'success' | 'error';
}

export default function Toast({ id, message, type }: Props) {
  return (
    <div
      className="flex w-max max-w-[35rem] items-center gap-8 rounded-md bg-white px-16 py-24 text-black shadow-lg"
      aria-label="notification"
    >
      {type === 'success' && (
        <Success height={24} width={24} className="fill-highlights" />
      )}
      {type === 'error' && (
        <Alert height={24} width={24} className="fill-error" />
      )}
      <p className="text-base font-semibold text-black">{message}</p>
      <Button variant="icon" onClick={() => toast.dismiss(id)} className="ml-8">
        <Close height={14} width={14} />
      </Button>
    </div>
  );
}
