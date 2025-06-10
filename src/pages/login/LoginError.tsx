import AlertIcon from '../../assets/svg/alert.svg?react';

interface Props {
  message: string;
}

export default function LoginError({ message }: Props) {
  return (
    <div className="bg-error absolute -top-48 flex w-full items-center gap-12 rounded-md px-12 py-8">
      <AlertIcon className="fill-white" />
      <p className="text- text-base text-white">{message}</p>
    </div>
  );
}
