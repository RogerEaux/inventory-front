import { type ColumnDef } from '@tanstack/react-table';
import SearchBar from '@/components/ui/SearchBar';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import DataTableStructure from './DataTableStructure';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';

interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  search?: boolean;
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  search,
}: Props<TData, TValue>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') ?? '';
  const [inputValue, setInputValue] = useState(initialSearch);
  const debouncedValue = useDebouncedValue(inputValue, 300);

  useEffect(() => {
    if (debouncedValue) {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set('search', debouncedValue);
        return params;
      });
    } else {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.delete('search');
        return params;
      });
    }
  }, [debouncedValue, setSearchParams]);

  return (
    <div className="flex flex-col gap-32 p-16">
      {search && <SearchBar value={inputValue} onChange={setInputValue} />}
      <DataTableStructure
        data={data}
        columns={columns}
        globalFilter={debouncedValue}
      />
    </div>
  );
}
