import Toast from '@/components/ui/Toast';
import { toast as sonnerToast } from 'sonner';

export const toast = {
  success: (message: string) =>
    sonnerToast.custom((id) => (
      <Toast type="success" id={id} message={message} />
    )),
  error: (message: string) =>
    sonnerToast.custom((id) => (
      <Toast type="error" id={id} message={message} />
    )),
};
