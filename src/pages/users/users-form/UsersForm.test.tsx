import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserForm from './UsersForm';
import { Toaster } from '@/components/ui/sonner';
import { renderWithQueryClient } from '@/lib/test-utils';
import { useUserFormStore } from '@/stores/useUserFormStore';
import { useAuthStore } from '@/stores/useAuthStore';
import { useState } from 'react';

vi.mock('@/components/ui/dialog', () => ({
  DialogClose: () => <button></button>,
}));

const mockCreateMutate = vi.fn((data, { onSuccess, onError }) =>
  data.name === 'Error'
    ? onError(new Error('Failed to create user'))
    : onSuccess(),
);

vi.mock('@/hooks/services/useCreateUserMutation', () => ({
  useCreateUserMutation: () => {
    const [isPending, setIsPending] = useState(false);

    return {
      isPending: isPending,
      mutate: vi.fn((data, then) => {
        mockCreateMutate(data, then);
        setIsPending(true);
      }),
    };
  },
}));

const mockUpdateMutate = vi.fn((data, { onSuccess, onError }) =>
  data.name === 'Error'
    ? onError(new Error('Failed to update user'))
    : onSuccess(),
);

vi.mock('@/hooks/services/useUpdateUserMutation', () => ({
  useUpdateUserMutation: () => {
    const [isPending, setIsPending] = useState(false);

    return {
      isPending: isPending,
      mutate: vi.fn((data, then) => {
        mockUpdateMutate(data, then);
        setIsPending(true);
      }),
    };
  },
}));

beforeEach(() => {
  mockCreateMutate.mockClear();
  mockUpdateMutate.mockClear();
  useUserFormStore.setState({ user: null });
});

describe('User form', () => {
  it('should display an error message if no name is given', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<UserForm />);
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
    renderWithQueryClient(<UserForm />);

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
    renderWithQueryClient(<UserForm />);

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

  it('should display an error message if no roles are selected', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<UserForm />);

    const userForm = screen.getByRole('form');
    const submitButton = screen.getByRole('button', { name: /save/i });

    expect(userForm).not.toContainElement(
      screen.queryByText(/Invalid email address/i),
    );

    await user.click(submitButton);

    expect(userForm).toContainElement(
      screen.getByText(/At least one role must be selected/i),
    );
  });

  it('should enable department input when roles include admin', async () => {
    useAuthStore.setState({ roles: ['ADMIN'] });

    renderWithQueryClient(<UserForm />);
    const departmentInput = screen.getByRole('combobox', {
      name: /department/i,
    });

    expect(departmentInput).not.toBeDisabled();
  });

  it('should disable department input when roles do not include admin', async () => {
    useAuthStore.setState({ roles: ['EDITOR'] });

    renderWithQueryClient(<UserForm />);
    const departmentInput = screen.getByRole('combobox', {
      name: /department/i,
    });

    expect(departmentInput).toBeDisabled();
  });

  it('should render input with user values if user is given', () => {
    const mockUser = {
      name: 'Rog',
      email: 'email@email.com',
      roles: ['EDITOR'],
      department: 'SWAG',
    };
    useUserFormStore.setState({ user: mockUser });

    renderWithQueryClient(<UserForm />);
    const nameInput: HTMLInputElement = screen.getByRole('textbox', {
      name: /name/i,
    });
    const emailInput: HTMLInputElement = screen.getByRole('textbox', {
      name: /email/i,
    });
    const departmentInput = screen.getByRole('combobox', {
      name: /department/i,
    });
    const rolesInput = screen.getByRole('combobox', {
      name: /roles/i,
    });

    expect(nameInput.value).toBe(mockUser.name);
    expect(emailInput.value).toBe(mockUser.email);
    expect(departmentInput.textContent).toBe(mockUser.department);
    expect(rolesInput.textContent).toBe(mockUser.roles[0]);
  });

  it('should disable save button if a submission is in progress', async () => {
    const user = userEvent.setup();

    renderWithQueryClient(<UserForm />);

    await user.type(screen.getByRole('textbox', { name: /name/i }), 'Roger');
    await user.type(
      screen.getByRole('textbox', { name: /email/i }),
      'r@email.com',
    );

    await user.click(screen.getByRole('combobox', { name: /roles/i }));
    const rolesOptions = screen.getAllByRole('option');

    await user.click(rolesOptions[0]);
    const saveButton = screen.getByRole('button', { name: /save/i });

    expect(saveButton).not.toBeDisabled();

    await user.click(saveButton);

    expect(saveButton).toBeDisabled();
  });

  it('should show new user confirmation toast when valid add user form is submitted', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(
      <>
        <Toaster />
        <UserForm />
      </>,
    );
    const nameInput: HTMLInputElement = screen.getByRole('textbox', {
      name: /name/i,
    });
    const emailInput: HTMLInputElement = screen.getByRole('textbox', {
      name: /email/i,
    });
    const rolesInput = screen.getByRole('combobox', {
      name: /roles/i,
    });

    await user.type(nameInput, 'Roger');
    await user.type(emailInput, 'r@email.com');
    await user.click(rolesInput);

    const rolesOptions = screen.getAllByRole('option');
    await user.click(rolesOptions[0]);

    await user.click(screen.getByRole('button', { name: /save/i }));

    expect(
      screen.getByText(/new user created successfully/i),
    ).toBeInTheDocument();
  });

  it('should show new user error toast when create user mutation fails', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(
      <>
        <Toaster />
        <UserForm />
      </>,
    );
    const nameInput: HTMLInputElement = screen.getByRole('textbox', {
      name: /name/i,
    });
    const emailInput: HTMLInputElement = screen.getByRole('textbox', {
      name: /email/i,
    });
    const rolesInput = screen.getByRole('combobox', {
      name: /roles/i,
    });

    await user.type(nameInput, 'Error');
    await user.type(emailInput, 'r@email.com');
    await user.click(rolesInput);

    const rolesOptions = screen.getAllByRole('option');
    await user.click(rolesOptions[0]);

    await user.click(screen.getByRole('button', { name: /save/i }));

    expect(screen.getByText(/failed to create user/i)).toBeInTheDocument();
  });

  it('should call mutate function when submitting valid create user form', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<UserForm />);

    const nameInput: HTMLInputElement = screen.getByRole('textbox', {
      name: /name/i,
    });
    const emailInput: HTMLInputElement = screen.getByRole('textbox', {
      name: /email/i,
    });
    const rolesInput = screen.getByRole('combobox', {
      name: /roles/i,
    });

    await user.type(nameInput, 'Roger');
    await user.type(emailInput, 'r@email.com');
    await user.click(rolesInput);

    const rolesOptions = screen.getAllByRole('option');
    await user.click(rolesOptions[0]);

    await user.click(screen.getByRole('button', { name: /save/i }));

    expect(mockCreateMutate).toHaveBeenCalledOnce();
    expect(mockCreateMutate).toHaveBeenCalledWith(
      {
        name: 'Roger',
        email: 'r@email.com',
        department: 'SWAG',
        roles: ['ADMIN'],
      },
      {
        onSuccess: expect.any(Function),
        onError: expect.any(Function),
      },
    );
  });

  it('should show updated user confirmation toast when valid edit user form is submitted', async () => {
    const user = userEvent.setup();
    const mockUser = {
      name: 'Rog',
      email: 'email@email.com',
      roles: ['EDITOR'],
      department: 'SWAG',
    };
    useUserFormStore.setState({ user: mockUser });

    renderWithQueryClient(
      <>
        <Toaster />
        <UserForm />
      </>,
    );

    const nameInput: HTMLInputElement = screen.getByRole('textbox', {
      name: /name/i,
    });
    const emailInput: HTMLInputElement = screen.getByRole('textbox', {
      name: /email/i,
    });

    await user.clear(nameInput);
    await user.type(nameInput, 'Yad');
    await user.clear(emailInput);
    await user.type(emailInput, 'y@email.com');

    await user.click(screen.getByRole('button', { name: /save/i }));

    expect(screen.getByText(/user updated successfully/i)).toBeInTheDocument();
  });

  it('should show update user error toast when update user mutation fails', async () => {
    const user = userEvent.setup();
    const mockUser = {
      name: 'Rog',
      email: 'email@email.com',
      roles: ['EDITOR'],
      department: 'SWAG',
    };
    useUserFormStore.setState({ user: mockUser });

    renderWithQueryClient(
      <>
        <Toaster />
        <UserForm />
      </>,
    );
    const nameInput: HTMLInputElement = screen.getByRole('textbox', {
      name: /name/i,
    });

    await user.clear(nameInput);
    await user.type(nameInput, 'Error');

    await user.click(screen.getByRole('button', { name: /save/i }));

    expect(screen.getByText(/failed to update user/i)).toBeInTheDocument();
  });

  it('should call mutate function when submitting valid update user form', async () => {
    const user = userEvent.setup();
    const mockUser = {
      name: 'Rog',
      email: 'email@email.com',
      roles: ['EDITOR'],
      department: 'SWAG',
    };
    useUserFormStore.setState({ user: mockUser });

    renderWithQueryClient(<UserForm />);

    const nameInput: HTMLInputElement = screen.getByRole('textbox', {
      name: /name/i,
    });

    await user.clear(nameInput);
    await user.type(nameInput, 'Yad');

    await user.click(screen.getByRole('button', { name: /save/i }));

    expect(mockUpdateMutate).toHaveBeenCalledOnce();
    expect(mockUpdateMutate).toHaveBeenCalledWith(
      {
        name: 'Yad',
        email: 'email@email.com',
        roles: ['EDITOR'],
        department: 'SWAG',
      },
      {
        onSuccess: expect.any(Function),
        onError: expect.any(Function),
      },
    );
  });
});
