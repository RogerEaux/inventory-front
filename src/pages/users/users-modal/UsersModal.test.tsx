import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UsersModal from './UsersModal';
import { renderWithQueryClient } from '@/lib/test-utils';

vi.mock('@/hooks/services/useCreateUserMutation', () => ({
  useCreateUserMutation: () => ({
    mutate: vi.fn((_, { onSuccess }) => onSuccess()),
    isPending: false,
  }),
}));

describe('Users modal', () => {
  it('should open modal when trigger is clicked', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(
      <UsersModal>
        <button>Add user</button>
      </UsersModal>,
    );
    const addButton = screen.getByRole('button', { name: /add user/i });
    let usersFormModal = screen.queryByRole('dialog');

    expect(usersFormModal).not.toBeInTheDocument();

    await user.click(addButton);

    usersFormModal = screen.getByRole('dialog');
    expect(usersFormModal).toBeInTheDocument();
  });

  it('should close modal when cancel button is clicked', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(
      <UsersModal>
        <button>Add user</button>
      </UsersModal>,
    );
    const addButton = screen.getByRole('button', { name: /add user/i });

    await user.click(addButton);

    const usersFormModal = screen.getByRole('dialog');
    const cancelButton = screen.getByRole('button', { name: /cancel/i });

    await user.click(cancelButton);

    expect(usersFormModal).not.toBeInTheDocument();
  });

  it('should not close modal when invalid form save button is clicked', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(
      <UsersModal>
        <button>Add user</button>
      </UsersModal>,
    );
    const addButton = screen.getByRole('button', { name: /add user/i });

    await user.click(addButton);

    const saveButton = screen.getByRole('button', { name: /save/i });
    const usersFormModal = screen.getByRole('dialog');

    await user.click(saveButton);

    expect(usersFormModal).toBeInTheDocument();
  });

  it('should close modal when valid form save button is clicked', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(
      <UsersModal>
        <button>Add user</button>
      </UsersModal>,
    );
    const addButton = screen.getByRole('button', { name: /add user/i });

    await user.click(addButton);

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

    const saveButton = screen.getByRole('button', { name: /save/i });
    const usersFormModal = screen.getAllByRole('dialog')[0];

    await user.click(saveButton);

    expect(usersFormModal).not.toBeInTheDocument();
  });
});
