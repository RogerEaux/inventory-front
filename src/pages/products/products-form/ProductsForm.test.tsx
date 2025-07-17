import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithQueryClient } from '@/lib/test-utils';
import ProductsForm from './ProductsForm';
import { Toaster } from '@/components/ui/sonner';
import { useProductFormStore } from '@/stores/useProductFormStore';
import { useState } from 'react';

vi.mock('@/components/ui/dialog', () => ({
  DialogClose: () => <button></button>,
}));

const mockUpdateMutate = vi.fn((data, { onSuccess, onError }) =>
  data.name === 'Error'
    ? onError(new Error('Failed to update product'))
    : onSuccess(),
);

vi.mock('@/hooks/services/useUpdateProductMutation', () => ({
  useUpdateProductMutation: () => {
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
  mockUpdateMutate.mockClear();
  useProductFormStore.setState({ product: null });
});

describe('Products form', () => {
  it('should display an error message if no product name is given', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<ProductsForm />);
    const productsForm = screen.getByRole('form');
    const submitButton = screen.getByRole('button', { name: /save/i });

    expect(productsForm).not.toContainElement(
      screen.queryByText(/Product name is required/i),
    );

    await user.click(submitButton);

    expect(productsForm).toContainElement(
      screen.getByText(/Product name is required/i),
    );
  });

  it('should display an error message if no category is selected', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<ProductsForm />);

    const productsForm = screen.getByRole('form');
    const submitButton = screen.getByRole('button', { name: /save/i });

    expect(productsForm).not.toContainElement(
      screen.queryByText(/Category is required/i),
    );

    await user.click(submitButton);

    expect(productsForm).toContainElement(
      screen.getByText(/Category is required/i),
    );
  });

  it('should display error messages if minimum stock is invalid', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<ProductsForm />);

    const productsForm = screen.getByRole('form');
    const minimumStock = screen.getByRole('spinbutton', {
      name: /minimum stock/i,
    });
    const submitButton = screen.getByRole('button', { name: /save/i });

    await user.clear(minimumStock);
    await user.click(submitButton);

    expect(productsForm).toContainElement(
      screen.getByText(/Minimum stock must be a number/i),
    );

    await user.type(minimumStock, '0.1');

    expect(productsForm).toContainElement(
      screen.getByText(/Minimum stock must be a whole number/i),
    );

    await user.clear(minimumStock);
    await user.type(minimumStock, '-1');

    expect(productsForm).toContainElement(
      screen.getByText(/Minimum stock must be 0 or more/i),
    );
  });

  it('should display an error message if no image is uploaded', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<ProductsForm />);

    const productsForm = screen.getByRole('form');
    const submitButton = screen.getByRole('button', { name: /save/i });

    expect(productsForm).not.toContainElement(
      screen.queryByText(/Image is required/i),
    );

    await user.click(submitButton);

    expect(productsForm).toContainElement(
      screen.getByText(/Image is required/i),
    );
  });

  it('should display an error message if stock is invalid', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<ProductsForm />);

    const productsForm = screen.getByRole('form');
    const stock = screen.getByRole('spinbutton', {
      name: /Stock/,
    });
    const submitButton = screen.getByRole('button', { name: /save/i });

    await user.clear(stock);
    await user.click(submitButton);

    expect(productsForm).toContainElement(
      screen.getByText(/Stock must be a number/i),
    );

    await user.type(stock, '0.1');

    expect(productsForm).toContainElement(
      screen.getByText(/Stock must be a whole number/i),
    );

    await user.clear(stock);
    await user.type(stock, '-1');

    expect(productsForm).toContainElement(
      screen.getByText(/Stock must be 1 or more/i),
    );
  });

  it('should display an error message if any attribute name is empty', async () => {
    const user = userEvent.setup();

    renderWithQueryClient(<ProductsForm />);

    const productsForm = screen.getByRole('form');
    const submitButton = screen.getByRole('button', { name: /save/i });
    const addAttribute = screen.getByRole('button', { name: /add attribute/i });

    await user.click(addAttribute);

    expect(productsForm).not.toContainElement(
      screen.queryByText(/Name is required/i),
    );

    await user.click(submitButton);

    expect(productsForm).toContainElement(
      screen.getAllByText(/Name is required/i)[1],
    );
  });

  it('should display an error message if any attribute value is empty', async () => {
    const user = userEvent.setup();

    renderWithQueryClient(<ProductsForm />);

    const productsForm = screen.getByRole('form');
    const submitButton = screen.getByRole('button', { name: /save/i });
    const addAttribute = screen.getByRole('button', { name: /add attribute/i });

    await user.click(addAttribute);

    expect(productsForm).not.toContainElement(
      screen.queryByText(/Value is required/i),
    );

    await user.click(submitButton);

    expect(productsForm).toContainElement(
      screen.getByText(/Value is required/i),
    );
  });

  it('should disable save button if a submission is in progress', async () => {
    const user = userEvent.setup();
    const mockProduct = {
      id: '1',
      name: 'Product',
      category: 'Cat',
      minimumStock: 0,
      attributes: [],
    };
    useProductFormStore.setState({ product: mockProduct });

    renderWithQueryClient(<ProductsForm />);

    const saveButton = screen.getByRole('button', { name: /save/i });

    expect(saveButton).not.toBeDisabled();

    await user.click(saveButton);

    expect(saveButton).toBeDisabled();
  });

  it('should show product confirmation toast when valid product form is submitted', async () => {
    const user = userEvent.setup();
    const mockProduct = {
      id: '1',
      name: 'Product',
      category: 'Cat',
      minimumStock: 0,
      attributes: [],
    };
    useProductFormStore.setState({ product: mockProduct });

    renderWithQueryClient(
      <>
        <Toaster />
        <ProductsForm />
      </>,
    );

    const nameInput: HTMLInputElement = screen.getByRole('textbox', {
      name: /name/i,
    });

    await user.clear(nameInput);
    await user.type(nameInput, 'Yad');

    await user.click(screen.getByRole('button', { name: /save/i }));

    expect(
      screen.getByText(/product updated successfully/i),
    ).toBeInTheDocument();
  });

  it('should show product error toast when product mutation fails', async () => {
    const user = userEvent.setup();
    const mockProduct = {
      id: '1',
      name: 'Product',
      category: 'Cat',
      minimumStock: 0,
      attributes: [],
    };
    useProductFormStore.setState({ product: mockProduct });

    renderWithQueryClient(
      <>
        <Toaster />
        <ProductsForm />
      </>,
    );
    const nameInput: HTMLInputElement = screen.getByRole('textbox', {
      name: /name/i,
    });

    await user.clear(nameInput);
    await user.type(nameInput, 'Error');

    await user.click(screen.getByRole('button', { name: /save/i }));

    expect(screen.getByText(/failed to update product/i)).toBeInTheDocument();
  });

  it('should call mutate function when submitting valid product form', async () => {
    const user = userEvent.setup();
    const mockProduct = {
      id: '1',
      name: 'Product',
      category: 'Cat',
      minimumStock: 0,
      attributes: [],
    };
    useProductFormStore.setState({ product: mockProduct });

    renderWithQueryClient(<ProductsForm />);

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
        id: '1',
        fileBase64: '',
        category: 'Cat',
        minimumStock: 0,
        attributes: [],
      },
      {
        onSuccess: expect.any(Function),
        onError: expect.any(Function),
      },
    );
  });
});
