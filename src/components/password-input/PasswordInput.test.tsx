import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PasswordInput from './PasswordInput';

vi.mock('../../assets/svg/eye-hidden.svg', () => ({
  default: () => <svg data-testid="mock-icon" />,
}));
vi.mock('../../assets/svg/eye-shown.svg', () => ({
  default: () => <svg data-testid="mock-icon" />,
}));

describe('Password input', () => {
  it('should hide password by default', () => {
    render(<PasswordInput />);
    const passwordInput = screen.getByLabelText(/password/i);

    expect(passwordInput).toHaveProperty('type', 'password');
  });

  it('should toggle between show/hide password when eye icon is clicked', async () => {
    const user = userEvent.setup();
    render(<PasswordInput />);
    const passwordInput = screen.getByLabelText(/password/i);
    const showPassword = screen.getByRole('button');

    await user.click(showPassword);

    expect(passwordInput).toHaveProperty('type', 'text');

    await user.click(showPassword);

    expect(passwordInput).toHaveProperty('type', 'password');
  });
});
