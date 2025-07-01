import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';
import { useState } from 'react';
import type { LoginFormValues } from '@/schemas/form/loginSchema';

const mockNavigate = vi.fn();
const mockUser = { email: 'r@email.com', password: 'password' };

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

vi.mock('@/hooks/services/useLoginMutation', () => {
  return {
    useLoginMutation: () => {
      const [pending, setPending] = useState(false);
      const [error, setError] = useState<null | { message: string }>(null);
      return {
        isPending: pending,
        error: error,
        mutate: vi.fn(({ email, password }: LoginFormValues) => {
          mockNavigate('/products');
          setPending(true);
          if (email === mockUser.email && password !== mockUser.password) {
            setError({ message: 'Invalid credentials' });
          }
        }),
      };
    },
  };
});

vi.mock('@/stores/useAuthStore', () => {
  return {
    useAuthStore: vi.fn((selector) =>
      selector({
        user: null,
        token: null,
        roles: [],
        loading: false,
        setAuth: vi.fn(),
        resetAuth: vi.fn(),
      }),
    ),
  };
});

describe('Login form', () => {
  it('should display an error message when no email is given', async () => {
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
      'Please enter email',
    );
  });

  it('should display an error message when the email is invalid', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);
    const loginForm = screen.getByRole('form');
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    const emailInput = screen.getByRole('textbox');

    expect(loginForm).not.toContainElement(
      screen.queryByTestId(/login-error/i),
    );

    await user.type(emailInput, 'email');
    await user.click(submitButton);

    expect(loginForm).toContainElement(screen.getByTestId(/login-error/i));
    expect(screen.queryByTestId(/login-error/i)).toHaveTextContent(
      'Please enter a valid email',
    );
  });

  it('should display an error message when no password is given', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);
    const loginForm = screen.getByRole('form');
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    const emailInput = screen.getByRole('textbox');

    expect(loginForm).not.toContainElement(
      screen.queryByTestId(/login-error/i),
    );

    await user.type(emailInput, 'r@email.com');
    await user.click(submitButton);

    expect(loginForm).toContainElement(screen.getByTestId(/login-error/i));
    expect(screen.queryByTestId(/login-error/i)).toHaveTextContent(
      'Please enter password',
    );
  });

  it('should not show error message and navigate to products if credentials are valid', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);
    const loginForm = screen.getByRole('form');
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, 'r@email.com');
    await user.type(passwordInput, 'password');
    await user.click(submitButton);

    expect(loginForm).not.toContainElement(
      screen.queryByTestId(/login-error/i),
    );
    expect(mockNavigate).toHaveBeenCalledWith('/products');
  });

  it('should disable sign in button if a submission is in progress', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByLabelText(/password/i);

    expect(submitButton).not.toBeDisabled();

    await user.type(emailInput, 'r@email.com');
    await user.type(passwordInput, 'password');
    await user.click(submitButton);

    expect(submitButton).toBeDisabled();
  });

  it('should display invalid credentials error message if credentials are invalid', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);
    const loginForm = screen.getByRole('form');
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByLabelText(/password/i);

    expect(loginForm).not.toContainElement(
      screen.queryByTestId(/login-error/i),
    );

    await user.type(emailInput, 'r@email.com');
    await user.type(passwordInput, 'pass');
    await user.click(submitButton);

    expect(loginForm).toContainElement(screen.getByTestId(/login-error/i));
    expect(screen.queryByTestId(/login-error/i)).toHaveTextContent(
      'Invalid credentials',
    );
  });
});
