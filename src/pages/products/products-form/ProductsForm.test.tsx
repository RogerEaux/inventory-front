import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithQueryClient } from '@/lib/test-utils';
import ProductsForm from './ProductsForm';

vi.mock('@/components/ui/dialog', () => ({
  DialogClose: () => <button></button>,
}));

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

  it('should display an error message if any stock type is empty', async () => {
    const user = userEvent.setup();

    renderWithQueryClient(<ProductsForm />);

    const productsForm = screen.getByRole('form');
    const submitButton = screen.getByRole('button', { name: /save/i });
    const addStock = screen.getByRole('button', { name: /add stock/i });

    await user.click(addStock);

    expect(productsForm).not.toContainElement(
      screen.queryByText(/Type is required/i),
    );

    await user.click(submitButton);

    expect(productsForm).toContainElement(
      screen.getByText(/Type is required/i),
    );
  });

  it('should display an error message if any stock quantity is invalid', async () => {
    const user = userEvent.setup();

    renderWithQueryClient(<ProductsForm />);

    const productsForm = screen.getByRole('form');
    const submitButton = screen.getByRole('button', { name: /save/i });
    const stockQuantity = screen.getByRole('spinbutton', { name: /quantity/i });

    expect(productsForm).not.toContainElement(
      screen.queryByText(/Type is required/i),
    );

    await user.clear(stockQuantity);
    await user.click(submitButton);

    expect(productsForm).toContainElement(
      screen.getByText(/Quantity must be a number/i),
    );

    await user.type(stockQuantity, '0.1');

    expect(productsForm).toContainElement(
      screen.getByText(/Quantity must be a whole number/i),
    );

    await user.clear(stockQuantity);
    await user.type(stockQuantity, '-1');

    expect(productsForm).toContainElement(
      screen.getByText(/Quantity must be 0 or more/i),
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

  it('should disable the general stock type input', () => {
    renderWithQueryClient(<ProductsForm />);

    const generalStock = screen.getByRole('textbox', { name: /type/i });

    expect(generalStock).toBeDisabled();
  });
});
