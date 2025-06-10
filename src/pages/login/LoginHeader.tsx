import LoginIcon from '../../assets/svg/login-icon.svg?react';

export default function LoginHeader() {
  return (
    <header className="-z-10 flex min-h-1/2 w-full flex-col items-center justify-center">
      <div className="my-32 flex max-w-[27rem] flex-col items-center">
        <LoginIcon width={128} height={128} className="mb-40" />
        <h1 className="mb-16 text-xl">Welcome to Grid Dynamics</h1>
        <h2 className="text-dark-gray text-center text-base">
          Please sign in to your account to start using the application
        </h2>
      </div>
    </header>
  );
}
