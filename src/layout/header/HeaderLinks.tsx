import { SheetClose } from '@/components/ui/sheet';
import { Link } from 'react-router-dom';

interface Props {
  links: {
    name: string;
    path: string;
  }[];
  drawer?: boolean;
}

export default function HeaderLinks({ links, drawer }: Props) {
  return (
    <nav>
      <ul
        className={`flex gap-36 ${drawer ? 'flex-col items-start px-36 py-24' : 'items-center'}`}
      >
        {links.map((link) => (
          <li key={link.name}>
            {drawer ? (
              <SheetClose asChild>
                <Link
                  className="relative py-6 text-lg font-medium text-black transition-colors duration-300 outline-none after:absolute after:bottom-0 after:left-0 after:h-2 after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full focus-visible:after:w-full"
                  to={link.path}
                >
                  {link.name}
                </Link>
              </SheetClose>
            ) : (
              <Link
                className="relative py-6 text-lg font-medium text-black transition-colors duration-300 outline-none after:absolute after:bottom-0 after:left-0 after:h-2 after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full focus-visible:after:w-full"
                to={link.path}
              >
                {link.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
