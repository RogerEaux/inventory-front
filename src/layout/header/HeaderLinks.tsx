import { SheetClose } from '@/components/ui/sheet';
import { Link } from 'react-router-dom';

interface LinkData {
  name: string;
  path: string;
}

interface Props {
  links: LinkData[];
  drawer?: boolean;
}

const HeaderLink = ({ name, path }: LinkData) => (
  <Link
    className="relative py-6 text-lg font-medium text-black transition-colors duration-300 outline-none after:absolute after:bottom-0 after:left-0 after:h-2 after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full focus-visible:after:w-full"
    to={path}
  >
    {name}
  </Link>
);

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
                <HeaderLink {...link} />
              </SheetClose>
            ) : (
              <HeaderLink {...link} />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
