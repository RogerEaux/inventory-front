import { useState } from 'react';
import EyeHidden from '../../assets/svg/eye-hidden.svg?react';
import EyeShown from '../../assets/svg/eye-shown.svg?react';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';

export default function PasswordInput({ ...inputProps }) {
  const [isShown, setIsShown] = useState(false);

  return (
    <div className="relative">
      <label htmlFor="password" className="hidden">
        Password
      </label>
      <Input
        id="password"
        placeholder="Password"
        variant="login"
        className="w-full rounded-b-md"
        {...inputProps}
        type={isShown ? 'text' : 'password'}
      />
      <Button
        type="button"
        variant="icon"
        className="absolute top-1/2 right-12 -translate-y-1/2 cursor-pointer"
        onClick={() => setIsShown((prevIsShown) => !prevIsShown)}
      >
        {isShown ? (
          <EyeShown className="fill-gray hover:fill-black" />
        ) : (
          <EyeHidden className="fill-gray hover:fill-black" />
        )}
      </Button>
    </div>
  );
}
