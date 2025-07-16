import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithQueryClient } from '@/lib/test-utils';
import DonutValueForm from './DonutValueForm';
import { Toaster } from '@/components/ui/sonner';
import { useState } from 'react';
import type { UpdateProductStockInput } from '@/hooks/services/useUpdateProductStockMutation';

const mockMutate = vi.fn((data: UpdateProductStockInput) => {
  if (data.useType === 'ERROR') {
    throw new Error('Failed to update product stock');
  }
});

vi.mock('@/hooks/services/useUpdateProductStockMutation', () => ({
  useUpdateProductStockMutation: () => {
    const [isPending, setIsPending] = useState(false);

    async function mutateAsync(data: UpdateProductStockInput) {
      mockMutate(data);
      setIsPending(true);
    }

    return { mutateAsync, isPending };
  },
}));

const mockEntries = [
  {
    name: 'GENERAL',
    value: 2,
  },
  {
    name: 'WELCOME_KIT',
    value: 10,
  },
  {
    name: 'INTERN_KIT',
    value: 5,
  },
];

beforeEach(() => {
  mockMutate.mockClear();
});

describe('Stock value form', () => {
  it('should show save button when any stock input is modified', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<DonutValueForm entries={mockEntries} />);

    const generalInput = screen.getByRole('spinbutton', {
      name: mockEntries[0].name,
    });

    await user.clear(generalInput);

    const saveButton = screen.getByRole('button', { name: /save/i });

    expect(saveButton).toBeInTheDocument();
  });

  it('should display an error message if stock is invalid', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<DonutValueForm entries={mockEntries} />);

    const stockForm = screen.getByRole('form');
    const generalInput = screen.getByRole('spinbutton', {
      name: mockEntries[0].name,
    });

    await user.clear(generalInput);

    const saveButton = screen.getByRole('button', { name: /save/i });

    await user.click(saveButton);

    expect(stockForm).toContainElement(
      screen.getByText(/Stock must be a number/i),
    );

    await user.type(generalInput, '0.1');
    await user.click(saveButton);

    expect(stockForm).toContainElement(
      screen.getByText(/Stock must be a whole number/i),
    );

    await user.clear(generalInput);
    await user.type(generalInput, '-1');
    await user.click(saveButton);

    expect(stockForm).toContainElement(
      screen.getByText(/Stock must be 0 or more/i),
    );
  });

  it('should hide save button if a submission is completed', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<DonutValueForm entries={mockEntries} />);

    const generalInput = screen.getByRole('spinbutton', {
      name: mockEntries[0].name,
    });

    await user.type(generalInput, '1');

    const saveButton = screen.getByRole('button', { name: /save/i });

    await user.click(saveButton);

    expect(saveButton).not.toBeInTheDocument();
  });

  it('should call mutate function with stock updates on valid submit', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<DonutValueForm entries={mockEntries} />);

    const generalInput = screen.getByRole('spinbutton', {
      name: mockEntries[0].name,
    });

    await user.clear(generalInput);
    await user.type(generalInput, '1');

    const saveButton = screen.getByRole('button', { name: /save/i });

    await user.click(saveButton);

    expect(mockMutate).toHaveBeenCalledWith({
      useType: mockEntries[0].name,
      quantity: -1,
      productId: '',
    });
  });

  it('should call mutate function multiple times if there are multiple stock updates', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<DonutValueForm entries={mockEntries} />);

    const generalInput = screen.getByRole('spinbutton', {
      name: mockEntries[0].name,
    });
    const kitInput = screen.getByRole('spinbutton', {
      name: mockEntries[1].name,
    });

    await user.clear(generalInput);
    await user.type(generalInput, '1');

    await user.clear(kitInput);
    await user.type(kitInput, '5');

    const saveButton = screen.getByRole('button', { name: /save/i });

    await user.click(saveButton);

    expect(mockMutate).toHaveBeenCalledTimes(2);
  });

  it('should show stock update confirmation toast when mutation succeeds', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(
      <>
        <Toaster />
        <DonutValueForm entries={mockEntries} />
      </>,
    );

    const generalInput = screen.getByRole('spinbutton', {
      name: mockEntries[0].name,
    });

    await user.type(generalInput, '1');

    const saveButton = screen.getByRole('button', { name: /save/i });

    await user.click(saveButton);

    expect(screen.getByText(/Stock updated successfully/i)).toBeInTheDocument();
  });

  it('should show stock update error toast when mutation fails', async () => {
    const mockErrorEntries = [
      {
        name: 'ERROR',
        value: 2,
      },
    ];
    const user = userEvent.setup();
    renderWithQueryClient(
      <>
        <Toaster />
        <DonutValueForm entries={mockErrorEntries} />
      </>,
    );

    const generalInput = screen.getByRole('spinbutton', {
      name: mockErrorEntries[0].name,
    });

    await user.type(generalInput, '1');

    const saveButton = screen.getByRole('button', { name: /save/i });

    await user.click(saveButton);

    expect(
      screen.getByText(/Failed to update product stock/i),
    ).toBeInTheDocument();
  });
});
