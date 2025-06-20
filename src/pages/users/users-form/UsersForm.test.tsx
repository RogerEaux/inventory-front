import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserForm from './UsersForm';
import { Toaster } from '@/components/ui/sonner';

vi.mock('@/components/ui/dialog', () => ({ DialogClose: () => <div></div> }));

describe('User form', () => {
  it('should display an error message if no name is given', async () => {
    const user = userEvent.setup();
    render(<UserForm type="add" onSubmit={vi.fn()} />);
    const userForm = screen.getByRole('form');
    const submitButton = screen.getByRole('button', { name: /save/i });

    expect(userForm).not.toContainElement(
      screen.queryByText(/Name is required/i),
    );

    await user.click(submitButton);

    expect(userForm).toContainElement(screen.getByText(/Name is required/i));
  });

  it('should display an error message if no email is given', async () => {
    const user = userEvent.setup();
    render(<UserForm type="add" onSubmit={vi.fn()} />);

    const userForm = screen.getByRole('form');
    const submitButton = screen.getByRole('button', { name: /save/i });

    expect(userForm).not.toContainElement(
      screen.queryByText(/Email is required/i),
    );

    await user.click(submitButton);

    expect(userForm).toContainElement(screen.getByText(/Email is required/i));
  });

  it('should display an error message if email is invalid', async () => {
    const user = userEvent.setup();
    render(<UserForm type="add" onSubmit={vi.fn()} />);

    const userForm = screen.getByRole('form');
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const submitButton = screen.getByRole('button', { name: /save/i });

    expect(userForm).not.toContainElement(
      screen.queryByText(/Invalid email address/i),
    );

    await user.type(emailInput, 'Not an email');
    await user.click(submitButton);

    expect(userForm).toContainElement(
      screen.getByText(/Invalid email address/i),
    );
  });

  it('should render input with user values if user is given', () => {
    const mockUser = { name: 'Rog', email: 'email@email.com' };
    render(<UserForm type="edit" user={mockUser} onSubmit={vi.fn()} />);
    const nameInput: HTMLInputElement = screen.getByRole('textbox', {
      name: /name/i,
    });
    const emailInput: HTMLInputElement = screen.getByRole('textbox', {
      name: /email/i,
    });

    expect(nameInput.value).toBe(mockUser.name);
    expect(emailInput.value).toBe(mockUser.email);
  });

  it('should show new user confirmation toast when valid add user form is submitted', async () => {
    const user = userEvent.setup();
    render(
      <>
        <Toaster />
        <UserForm type="add" onSubmit={vi.fn()} />
      </>,
    );
    const nameInput: HTMLInputElement = screen.getByRole('textbox', {
      name: /name/i,
    });
    const emailInput: HTMLInputElement = screen.getByRole('textbox', {
      name: /email/i,
    });

    await user.type(nameInput, 'Roger');
    await user.type(emailInput, 'r@email.com');

    await user.click(screen.getByRole('button', { name: /save/i }));

    expect(
      screen.getByText(/new user created successfully/i),
    ).toBeInTheDocument();
  });

  it('should show updated user confirmation toast when valid edit user form is submitted', async () => {
    const user = userEvent.setup();
    const mockUser = { name: 'Rog', email: 'email@email.com' };
    render(
      <>
        <Toaster />
        <UserForm type="edit" onSubmit={vi.fn()} user={mockUser} />
      </>,
    );
    const nameInput: HTMLInputElement = screen.getByRole('textbox', {
      name: /name/i,
    });

    await user.clear(nameInput);
    await user.type(nameInput, 'Yadi');

    await user.click(screen.getByRole('button', { name: /save/i }));

    expect(screen.getByText(/user updated successfully/i)).toBeInTheDocument();
  });
});
