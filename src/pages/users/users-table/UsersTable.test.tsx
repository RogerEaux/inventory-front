import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UsersTable from './UsersTable';
import { renderWithQueryClient } from '@/lib/test-utils';
import { useState } from 'react';
import { Toaster } from 'sonner';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  const setSearchParams = vi.fn();
  return {
    ...actual,
    useSearchParams: () => [
      new URLSearchParams({ search: '' }),
      setSearchParams,
    ],
  };
});

const mockMutate = vi.fn((id) => {
  if (id === 'Error') {
    throw new Error('Failed to delete user');
  }
});
vi.mock('@/hooks/services/useDeleteUserMutation', () => ({
  useDeleteUserMutation: () => {
    const [isPending, setIsPending] = useState(false);

    async function mutateAsync(id: string) {
      mockMutate(id);
      setIsPending(true);
    }

    return { mutateAsync, isPending };
  },
}));

vi.mock('@/hooks/services/useGetAllUsersQuery', () => {
  return {
    useGetAllUsersQuery: () => {
      return {
        isPending: false,
        data: {
          getAllUsers: [
            {
              id: '1',
              name: 'Roger',
              email: 'r@mail.com',
              roles: [{ department: 'SWAG', role: 'EDITOR' }],
            },
            {
              id: 'Error',
              name: 'Yadi',
              email: 'y@mail.com',
              roles: [{ department: 'IT', role: 'ADMIN' }],
            },
          ],
        },
      };
    },
  };
});

describe('Users table', () => {
  it('should open edit user form when any edit button is clicked', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<UsersTable />);
    const editButton = screen.getAllByRole('button', { name: /edit user/i })[0];
    let usersFormModal = screen.queryByRole('dialog');

    expect(usersFormModal).not.toBeInTheDocument();

    await user.click(editButton);

    usersFormModal = screen.getByRole('dialog');

    expect(usersFormModal).toBeInTheDocument();
    expect(usersFormModal).toContainElement(screen.getByRole('form'));
    expect(usersFormModal).toContainElement(
      screen.getByRole('heading', { name: /edit user/i }),
    );
  });

  it('should populate the edit form with the user data of the row where the button was clicked', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<UsersTable />);
    const editButton = screen.getAllByRole('button', { name: /edit user/i })[0];

    await user.click(editButton);

    const nameInput: HTMLInputElement = screen.getByRole('textbox', {
      name: /name/i,
    });
    const emalInput: HTMLInputElement = screen.getByRole('textbox', {
      name: /email/i,
    });
    const departmentInput = screen.getByRole('combobox', {
      name: /department/i,
    });
    const rolesInput = screen.getByRole('combobox', {
      name: /roles/i,
    });

    expect(nameInput.value).toBe('Roger');
    expect(emalInput.value).toBe('r@mail.com');
    expect(departmentInput.textContent).toBe('SWAG');
    expect(rolesInput.textContent).toBe('EDITOR');
  });

  it('should disable confirm button if a submission is in progress', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<UsersTable />);

    const deleteButton = screen.getAllByRole('button', {
      name: /delete user/i,
    })[0];

    await user.click(deleteButton);

    const confirmButton = screen.getByRole('button', { name: /confirm/i });
    expect(confirmButton).not.toBeDisabled();

    await user.click(confirmButton);

    expect(confirmButton).toBeDisabled();
  });

  it('should show user delete confirmation toast when confirm button is clicked', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(
      <>
        <Toaster />
        <UsersTable />
      </>,
    );

    const deleteButton = screen.getAllByRole('button', {
      name: /delete user/i,
    })[0];

    await user.click(deleteButton);

    const confirmButton = screen.getByRole('button', { name: /confirm/i });

    await user.click(confirmButton);

    expect(screen.getByText(/User deleted successfully/i)).toBeInTheDocument();
  });

  it('should show user delete error toast when mutation fails', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(
      <>
        <Toaster />
        <UsersTable />
      </>,
    );

    const deleteButton = screen.getAllByRole('button', {
      name: /delete user/i,
    })[1];

    await user.click(deleteButton);

    const confirmButton = screen.getByRole('button', { name: /confirm/i });

    await user.click(confirmButton);

    expect(screen.getByText(/failed to delete user/i)).toBeInTheDocument();
  });
});
