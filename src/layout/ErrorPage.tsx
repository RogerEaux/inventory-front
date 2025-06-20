import Button from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import gridCog from '@/assets/images/grid-cog.png';
import Header from './header/Header';

export default function ErrorPage() {
  const navigate = useNavigate();

  const goBack = () => navigate('/');

  return (
    <div className="flex flex-col">
      <Header />

      <main className="flex w-full max-w-4/5 flex-col gap-16 self-center p-16 max-sm:max-w-none max-sm:px-8">
        <div className="p-16">
          <h1 className="mb-8 text-3xl font-bold text-nowrap max-sm:text-2xl">
            Error
          </h1>
          <p className="text-lg">Looks like this page doesn't exist yet...</p>
        </div>
        <img
          src={gridCog}
          alt="A hand putting cogs in place"
          className="h-auto w-3xl self-center max-md:w-xl max-sm:w-md"
        />
        <Button onClick={goBack} className="self-center">
          Go to home page
        </Button>
      </main>
    </div>
  );
}
