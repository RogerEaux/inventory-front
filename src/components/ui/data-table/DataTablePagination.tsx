import type { Table } from '@tanstack/react-table';
import Button from '../button';

interface Props<TData> {
  table: Table<TData>;
}

export default function DataTablePagination<TData>({ table }: Props<TData>) {
  return (
    <div className="mt-4 flex items-center justify-end gap-4 py-4">
      <Button variant="small" onClick={() => table.firstPage()}>
        First
      </Button>
      <Button
        variant="small"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Previous
      </Button>
      <Button
        variant="small"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next
      </Button>
      <Button variant="small" onClick={() => table.lastPage()}>
        Last
      </Button>
    </div>
  );
}
