import { Link } from 'react-router-dom';
import DefaultAvatar from '@/assets/svg/avatar.svg?react';

export default function HeaderProfile() {
  return (
    <Link
      to="/profile"
      className="rounded-full bg-white p-5 transition-all outline-none hover:scale-105 focus-visible:scale-105 focus-visible:ring-2"
    >
      <DefaultAvatar height={30} width={30} />
    </Link>
  );
}
