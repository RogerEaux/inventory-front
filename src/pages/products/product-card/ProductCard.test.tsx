import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';

const mockProduct = {
  id: '1',
  name: 'Cleaning Spray',
  imageUrl: '',
  category: 'ACCESORIOS',
  minimumStock: 5,
  stockByUse: [{ useType: 'GENERAL', quantity: 5 }],
};

describe('Product card', () => {
  it('renders green indicator for stock quantity > minimum stock * 2 ', () => {
    render(<ProductCard {...mockProduct} stockQuantity={11} />);

    const indicator = screen.getByTestId('stock-indicator');
    expect(indicator).toHaveClass('bg-stock-green');
  });

  it('renders yellow indicator for stock quantity > minimum stock and <= minimum stock * 2', () => {
    render(<ProductCard {...mockProduct} stockQuantity={6} />);

    const indicator = screen.getByTestId('stock-indicator');
    expect(indicator).toHaveClass('bg-stock-yellow');
  });

  it('renders red indicator for stock quantity < minimum stock', () => {
    render(<ProductCard {...mockProduct} stockQuantity={4} />);

    const indicator = screen.getByTestId('stock-indicator');
    expect(indicator).toHaveClass('bg-stock-red');
  });
});
