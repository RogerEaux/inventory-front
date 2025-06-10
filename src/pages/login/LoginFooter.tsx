import GridLogo from '../../assets/svg/grid-icon.svg?react';
import LoginForm from './login-form/LoginForm';

export default function LoginFooter() {
  return (
    <footer className="shadow-background bg-light-gray relative z-10 flex min-h-1/2 w-full flex-col items-center justify-between">
      <div className="flex flex-1 items-center">
        <LoginForm />
      </div>
      <section className="max-xs:px-16 max-xs:p-16 max-xs:flex-col max-xs:items-center max-xs:gap-8 flex w-full justify-between px-64 py-24">
        <div className="flex gap-12">
          <GridLogo />
          <p className="text-lg">Grid Dynamics</p>
        </div>
        <p className="text-dark-gray text-lg">
          Grid Dynamics© 2006-{new Date().getFullYear()}
        </p>
      </section>
    </footer>
  );
}
