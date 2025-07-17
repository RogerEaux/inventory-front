import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductsHeader from './ProductsHeader';
import { renderWithQueryClient } from '@/lib/test-utils';

vi.mock('@/pages/users/users-form/UsersForm.tsx', () => ({
  default: () => <form role="form"></form>,
}));

describe('Products header', () => {
  it('should open add product form when add button is clicked', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<ProductsHeader />);
    const addButton = screen.getByRole('button', { name: /add product/i });
    let usersFormModal = screen.queryByRole('dialog');

    expect(usersFormModal).not.toBeInTheDocument();

    await user.click(addButton);

    usersFormModal = screen.getByRole('dialog');

    expect(usersFormModal).toBeInTheDocument();
    expect(usersFormModal).toContainElement(screen.getByRole('form'));
    expect(usersFormModal).toContainElement(
      screen.getByRole('heading', { name: /add product/i }),
    );
  });
});
