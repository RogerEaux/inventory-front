import { type ColumnDef, type SortingState } from '@tanstack/react-table';
import SearchBar from '@/components/ui/SearchBar';
import { useSearchSync } from '@/hooks/utils/useSearchSync';
import DataTableStructure from './DataTableStructure';

interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  search?: boolean;
  pagination?: boolean;
  sorting?: SortingState;
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  search,
  pagination,
  sorting,
}: Props<TData, TValue>) {
  const { inputValue, setInputValue, debouncedValue } = useSearchSync();

  return (
    <div className="flex flex-col gap-32 p-16">
      {search && <SearchBar value={inputValue} onChange={setInputValue} />}
      <DataTableStructure
        data={data}
        columns={columns}
        globalFilter={debouncedValue}
        pagination={pagination}
        sorting={sorting}
      />
    </div>
  );
}
