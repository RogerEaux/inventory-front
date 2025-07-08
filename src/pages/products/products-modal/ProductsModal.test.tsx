import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductsModal from './ProductsModal';
import { renderWithQueryClient } from '@/lib/test-utils';

describe('Products modal', () => {
  it('should not close modal when invalid form save button is clicked', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(
      <ProductsModal>
        <button>Add product</button>
      </ProductsModal>,
    );
    const addButton = screen.getByRole('button', { name: /add product/i });

    await user.click(addButton);

    const saveButton = screen.getByRole('button', { name: /save/i });
    const usersFormModal = screen.getByRole('dialog');

    await user.click(saveButton);

    expect(usersFormModal).toBeInTheDocument();
  });
});
