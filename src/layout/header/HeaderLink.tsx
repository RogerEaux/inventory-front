import { Link } from 'react-router-dom';

interface Props {
  name: string;
  path: string;
}

export default function HeaderLink({ name, path, ...props }: Props) {
  return (
    <Link
      to={path}
      {...props}
      className="relative py-6 text-lg font-medium text-black transition-colors duration-300 outline-none after:absolute after:bottom-0 after:left-0 after:h-2 after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full focus-visible:after:w-full"
    >
      {name}
    </Link>
  );
}
