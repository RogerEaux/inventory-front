import Button from './button';
import Alert from '@/assets/svg/alert.svg?react';

interface Props {
  message?: string;
  onRetry: () => void;
}

export default function ErrorElement({
  message = 'An unexpected error occurred',
  onRetry,
}: Props) {
  return (
    <div className="flex flex-col items-center py-16">
      <div className="mb-16 flex items-center gap-12">
        <Alert width={24} height={24} />
        <p className="text-lg">{message}</p>
      </div>
      <Button className="btn-primary" onClick={onRetry} type="button">
        Retry
      </Button>
    </div>
  );
}
