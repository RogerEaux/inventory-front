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
  {
    id: 4,
    value: 'Four',
  },
  {
    id: 5,
    value: 'Five',
  },
  {
    id: 6,
    value: 'Six',
  },
  {
    id: 7,
    value: 'Seven',
  },
  {
    id: 8,
    value: 'Eight',
  },
  {
    id: 9,
    value: 'Nine',
  },
  {
    id: 10,
    value: 'Ten',
  },
  {
    id: 11,
    value: 'Eleven',
  },
  {
    id: 12,
    value: 'Twelve',
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

    await user.type(searchInput, '7');

    await waitFor(() => {
      const cells = screen.getAllByRole('cell');
      expect(cells.length).toBe(2);
      expect(cells[0].textContent).toBe('7');
      expect(cells[1].textContent).toBe('Seven');
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

  it('should sort table entries based on passed sorting state', () => {
    const sorting = [{ id: 'value', desc: false }];
    render(
      <DataTable data={mockData} columns={mockColumns} sorting={sorting} />,
    );

    const cells = screen.getAllByRole('cell');

    expect(cells[0].textContent).toBe('8');
    expect(cells[2].textContent).toBe('11');
    expect(cells[4].textContent).toBe('5');
    expect(cells[6].textContent).toBe('4');
    expect(cells[8].textContent).toBe('9');
  });

  it('should paginate tables entries to 10 items per page if flag is active', () => {
    render(<DataTable data={mockData} columns={mockColumns} pagination />);

    const cells = screen.getAllByRole('cell');

    expect(cells.length).toBe(20);
  });

  it('should go to corresponding pagination buttons pages ', async () => {
    const user = userEvent.setup();
    render(<DataTable data={mockData} columns={mockColumns} pagination />);

    const [first, previous, next, last] = screen.getAllByRole('button');

    let cells = screen.getAllByRole('cell');

    expect(cells[0].textContent).toBe('1');

    await user.click(next);
    cells = screen.getAllByRole('cell');

    expect(cells[0].textContent).toBe('11');

    await user.click(previous);
    cells = screen.getAllByRole('cell');

    expect(cells[0].textContent).toBe('1');

    await user.click(last);
    cells = screen.getAllByRole('cell');

    expect(cells[0].textContent).toBe('11');

    await user.click(first);
    cells = screen.getAllByRole('cell');

    expect(cells[0].textContent).toBe('1');
  });

  it('should return no results if search term is not in table', async () => {
    const user = userEvent.setup();
    render(<DataTable data={mockData} columns={mockColumns} search />);
    const searchInput = screen.getByRole('searchbox') as HTMLInputElement;

    await user.type(searchInput, 'Not in table');

    await waitFor(() => {
      const cells = screen.getAllByRole('cell');
      expect(cells.length).toBe(1);
      expect(cells[0].textContent).toBe('No results.');
    });
  });
});
