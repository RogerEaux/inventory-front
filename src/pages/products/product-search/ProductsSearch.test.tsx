import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import ProductSearch from './ProductsSearch';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  const setSearchParams = vi.fn();
  return {
    ...actual,
    useSearchParams: () => [
      new URLSearchParams({ search: '' }),
      setSearchParams,
    ],
    Link: ({ children }: { children: ReactNode }) => <a href="/">{children}</a>,
  };
});

vi.mock('@/pages/products/product-search/productsData.ts', () => {
  return {
    productsData: [
      {
        id: '1',
        name: 'Cleaning Spray',
        imageUrl: '',
        category: 'ACCESORIOS',
        minimumStock: 3,
        stockByUse: [
          { useType: 'GENERAL', quantity: 12 },
          { useType: 'WELCOME_KIT', quantity: 4 },
        ],
        attributes: [{ name: 'Size', value: 'Big' }],
      },
      {
        id: '2',
        name: 'Organic Cotton T-Shirt',
        imageUrl: '',
        category: 'ROPA_Y_TEXTILES',
        minimumStock: 2,
        stockByUse: [{ useType: 'EVENT', quantity: 4 }],
        attributes: [
          { name: 'Size', value: 'Medium' },
          { name: 'Color', value: 'White' },
          { name: 'Material', value: 'Organic Cotton' },
        ],
      },
      {
        id: '3',
        name: 'Reusable Water Bottle',
        imageUrl: '',
        category: 'ACCESORIOS',
        minimumStock: 4,
        stockByUse: [
          { useType: 'GENERAL', quantity: 0 },
          { useType: 'WELCOME_KIT', quantity: 3 },
        ],
        attributes: [
          { name: 'Capacity', value: '750ml' },
          { name: 'Material', value: 'Stainless Steel' },
          { name: 'Color', value: 'Blue' },
        ],
      },
    ],
  };
});

describe('Product search', () => {
  it('should filter product list based on search term and product name', async () => {
    const user = userEvent.setup();
    render(<ProductSearch />);
    const searchInput = screen.getByRole('searchbox') as HTMLInputElement;

    await user.type(searchInput, 'Organic');

    await waitFor(() => {
      const productName = screen.getByRole('heading');
      expect(productName.textContent).toBe('Organic Cotton T-Shirt');
    });
  });

  it('should return no results if search term is not in product names', async () => {
    const user = userEvent.setup();
    render(<ProductSearch />);
    const searchInput = screen.getByRole('searchbox') as HTMLInputElement;

    await user.type(searchInput, '4');

    await waitFor(() => {
      const productName = screen.getByRole('paragraph');
      expect(productName.textContent).toBe('No results');
    });
  });
});
