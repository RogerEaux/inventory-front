import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductFacts from './ProductFacts';
import { renderWithQueryClient } from '@/lib/test-utils';
import { Toaster } from 'sonner';
import { useState } from 'react';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  const setSearchParams = vi.fn();
  return {
    ...actual,
    useSearchParams: () => [
      new URLSearchParams({ search: '' }),
      setSearchParams,
    ],
    useNavigate: () => mockNavigate,
  };
});

const mockMutate = vi.fn((id) => {
  if (id === 'Error') {
    throw new Error('Failed to delete product');
  }
});

vi.mock('@/hooks/services/useDeleteProductMutation', () => ({
  useDeleteProductMutation: () => {
    const [isPending, setIsPending] = useState(false);

    async function mutateAsync(id: string) {
      mockMutate(id);
      setIsPending(true);
    }

    return { mutateAsync, isPending };
  },
}));

describe('Product facts', () => {
  it('should populate the edit form with the product data of the current product in details page', async () => {
    const user = userEvent.setup();
    const mockProduct = {
      id: '1',
      imageUrl: '',
      name: 'Product',
      category: 'Cat',
      minimumStock: 0,
      attributes: [],
      stockByUse: [{ useType: 'GENERAL', quantity: 5 }],
    };
    renderWithQueryClient(<ProductFacts product={mockProduct} />);
    const editButton = screen.getAllByRole('button', { name: /edit/i })[0];

    await user.click(editButton);

    const nameInput: HTMLInputElement = screen.getByRole('textbox', {
      name: /name/i,
    });

    expect(nameInput.value).toBe(mockProduct.name);
  });

  it('should disable confirm button if a submission is in progress', async () => {
    const mockProduct = {
      id: '1',
      imageUrl: '',
      name: 'Product',
      category: 'Cat',
      minimumStock: 0,
      attributes: [],
      stockByUse: [],
    };
    const user = userEvent.setup();
    renderWithQueryClient(<ProductFacts product={mockProduct} />);

    const deleteButton = screen.getByRole('button', { name: /delete/i });

    await user.click(deleteButton);

    const confirmButton = screen.getByRole('button', { name: /confirm/i });
    expect(confirmButton).not.toBeDisabled();

    await user.click(confirmButton);

    expect(confirmButton).toBeDisabled();
  });

  it('should show user delete confirmation toast when confirm button is clicked', async () => {
    const mockProduct = {
      id: '1',
      imageUrl: '',
      name: 'Product',
      category: 'Cat',
      minimumStock: 0,
      attributes: [],
      stockByUse: [],
    };
    const user = userEvent.setup();
    renderWithQueryClient(
      <>
        <Toaster />
        <ProductFacts product={mockProduct} />
      </>,
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });

    await user.click(deleteButton);

    const confirmButton = screen.getByRole('button', { name: /confirm/i });

    await user.click(confirmButton);

    expect(
      screen.getByText(/Product deleted successfully/i),
    ).toBeInTheDocument();
  });

  it('should show user delete error toast when mutation fails', async () => {
    const mockProduct = {
      id: 'Error',
      imageUrl: '',
      name: 'Product',
      category: 'Cat',
      minimumStock: 0,
      attributes: [],
      stockByUse: [],
    };
    const user = userEvent.setup();
    renderWithQueryClient(
      <>
        <Toaster />
        <ProductFacts product={mockProduct} />
      </>,
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });

    await user.click(deleteButton);

    const confirmButton = screen.getByRole('button', { name: /confirm/i });

    await user.click(confirmButton);

    expect(screen.getByText(/Failed to delete product/i)).toBeInTheDocument();
  });

  it('should redirect to /products after successfully deleting the product', async () => {
    const mockProduct = {
      id: '1',
      imageUrl: '',
      name: 'Product',
      category: 'Cat',
      minimumStock: 0,
      attributes: [],
      stockByUse: [],
    };
    const user = userEvent.setup();
    renderWithQueryClient(
      <>
        <Toaster />
        <ProductFacts product={mockProduct} />
      </>,
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });

    await user.click(deleteButton);

    const confirmButton = screen.getByRole('button', { name: /confirm/i });

    await user.click(confirmButton);

    expect(mockNavigate).toHaveBeenCalledWith('/products');
  });
});
