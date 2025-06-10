import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});
vi.mock('../LoginError.tsx', () => ({
  default: ({ message }: { message: string }) => (
    <p data-testid="login-error">{message}</p>
  ),
}));

describe('Login form', () => {
  it('should display an error message when no inputs are given', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);
    const loginForm = screen.getByRole('form');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    expect(loginForm).not.toContainElement(
      screen.queryByTestId(/login-error/i),
    );

    await user.click(submitButton);

    expect(loginForm).toContainElement(screen.getByTestId(/login-error/i));
    expect(screen.queryByTestId(/login-error/i)).toHaveTextContent(
      'Please enter valid credentials',
    );
  });

  it('should display an error message when the email is invalid', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);
    const loginForm = screen.getByRole('form');
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByLabelText(/password/i);

    expect(loginForm).not.toContainElement(
      screen.queryByTestId(/login-error/i),
    );

    await user.type(emailInput, 'email');
    await user.type(passwordInput, 'password');
    await user.click(submitButton);

    expect(loginForm).toContainElement(screen.getByTestId(/login-error/i));
    expect(screen.queryByTestId(/login-error/i)).toHaveTextContent(
      'Please enter a valid email',
    );
  });

  it('should not show error message and navigate home if credentials are valid', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);
    const loginForm = screen.getByRole('form');
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, 'email@email.com');
    await user.type(passwordInput, 'password');
    await user.click(submitButton);

    expect(loginForm).not.toContainElement(
      screen.queryByTestId(/login-error/i),
    );
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
