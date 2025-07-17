import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import StockBar from './StockBar';

describe('Stock bar', () => {
  it('renders green indicator for stock quantity > minimum stock * 2 ', () => {
    render(<StockBar current={7} min={3} />);

    const indicator = screen.getByTestId('stock-indicator');
    expect(indicator).toHaveClass('bg-stock-green');
  });

  it('renders yellow indicator for stock quantity > minimum stock and <= minimum stock * 2', () => {
    render(<StockBar current={4} min={3} />);

    const indicator = screen.getByTestId('stock-indicator');
    expect(indicator).toHaveClass('bg-stock-yellow');
  });

  it('renders red indicator for stock quantity < minimum stock', () => {
    render(<StockBar current={2} min={3} />);

    const indicator = screen.getByTestId('stock-indicator');
    expect(indicator).toHaveClass('bg-stock-red');
  });
});
