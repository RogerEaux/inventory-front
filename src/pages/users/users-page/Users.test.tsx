import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Users from './Users';

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
vi.mock('@/pages/users/users-table/usersData', () => ({
  usersData: [
    {
      name: 'Roger',
      email: 'r@mail.com',
    },
    {
      name: 'Yadi',
      email: 'y@mail.com',
    },
  ],
}));

describe('User page', () => {
  it('should open add user form when add button is clicked', async () => {
    const user = userEvent.setup();
    render(<Users />);
    const addButton = screen.getByRole('button', { name: /add user/i });
    let usersFormModal = screen.queryByRole('dialog');

    expect(usersFormModal).not.toBeInTheDocument();

    await user.click(addButton);

    usersFormModal = screen.getByRole('dialog');

    expect(usersFormModal).toBeInTheDocument();
    expect(usersFormModal).toContainElement(screen.getByRole('form'));
    expect(usersFormModal).toContainElement(
      screen.getByRole('heading', { name: /add new user/i }),
    );
  });

  it('should open edit user form when any edit button is clicked', async () => {
    const user = userEvent.setup();
    render(<Users />);
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
    render(<Users />);
    const editButton = screen.getAllByRole('button', { name: /edit user/i })[0];
    let usersFormModal = screen.queryByRole('dialog');

    expect(usersFormModal).not.toBeInTheDocument();

    await user.click(editButton);

    usersFormModal = screen.getByRole('dialog');
    const nameInput: HTMLInputElement = screen.getByRole('textbox', {
      name: /name/i,
    });
    const emalInput: HTMLInputElement = screen.getByRole('textbox', {
      name: /email/i,
    });

    expect(nameInput.value).toBe('Roger');
    expect(emalInput.value).toBe('r@mail.com');
  });

  it('should close user form when cancel button is clicked', async () => {
    const user = userEvent.setup();
    render(<Users />);
    const addButton = screen.getByRole('button', { name: /add user/i });
    let usersFormModal = screen.queryByRole('dialog');

    expect(usersFormModal).not.toBeInTheDocument();

    await user.click(addButton);

    usersFormModal = screen.getByRole('dialog');
    const cancelButton = screen.getByRole('button', { name: /cancel/i });

    await user.click(cancelButton);

    expect(usersFormModal).not.toBeInTheDocument();
  });

  it('should close user form when valid form save button is clicked', async () => {
    const user = userEvent.setup();
    render(<Users />);
    const editButton = screen.getAllByRole('button', { name: /edit user/i })[0];
    let usersFormModal = screen.queryByRole('dialog');

    expect(usersFormModal).not.toBeInTheDocument();

    await user.click(editButton);

    usersFormModal = screen.getByRole('dialog');
    const saveButton = screen.getByRole('button', { name: /save/i });

    await user.click(saveButton);

    expect(usersFormModal).not.toBeInTheDocument();
  });
});
