import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import DataTable from './DataTable';
import userEvent from '@testing-library/user-event';

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

const mockData = [
  {
    id: 1,
    value: 'One',
  },
  {
    id: 2,
    value: 'Two',
  },
  {
    id: 3,
    value: 'Three',
  },
];

const mockColumns = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'value',
    header: 'Value',
  },
];

describe('Data Table', () => {
  it('should render given data as cells in a table with given columns', async () => {
    render(<DataTable data={mockData} columns={mockColumns} />);
    const table = screen.getByRole('table');
    const cells = screen.getAllByRole('cell');
    const cellsData = mockData.flatMap(Object.values);

    cells.forEach((cell, index) => {
      expect(table).toContainElement(cell);
      expect(cell.textContent).toBe(cellsData[index].toString());
    });
  });

  it('should filter table entries globally based on search term', async () => {
    const user = userEvent.setup();
    render(<DataTable data={mockData} columns={mockColumns} search />);
    const searchInput = screen.getByRole('searchbox') as HTMLInputElement;

    await user.type(searchInput, '2');

    await waitFor(() => {
      const cells = screen.getAllByRole('cell');
      expect(cells.length).toBe(2);
      expect(cells[0].textContent).toBe('2');
      expect(cells[1].textContent).toBe('Two');
    });

    await user.clear(searchInput);
    await user.type(searchInput, 'Three');

    await waitFor(() => {
      const cells = screen.getAllByRole('cell');

      expect(cells.length).toBe(2);
      expect(cells[0].textContent).toBe('3');
      expect(cells[1].textContent).toBe('Three');
    });
  });

  it('should return no results if search term is not in table', async () => {
    const user = userEvent.setup();
    render(<DataTable data={mockData} columns={mockColumns} search />);
    const searchInput = screen.getByRole('searchbox') as HTMLInputElement;

    await user.type(searchInput, '4');

    await waitFor(() => {
      const cells = screen.getAllByRole('cell');
      expect(cells.length).toBe(1);
      expect(cells[0].textContent).toBe('No results.');
    });
  });
});
