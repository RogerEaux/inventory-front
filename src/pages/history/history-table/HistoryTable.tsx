import DataTable from '@/components/ui/data-table/DataTable';
import { columns } from './columns';
import Loading from '@/components/ui/Loading';
import ErrorElement from '@/components/ui/ErrorElement';
import { useQueryClient } from '@tanstack/react-query';
import { useMovementLogs } from '@/hooks/services/useMovementLogs';

export default function HistoryTable() {
  const { data, isPending, error } = useMovementLogs();
  const movements = data?.movementLogs.map(
    ({ quantity, date, action, origin, product, user }) => ({
      quantity,
      date,
      action,
      origin,
      productName: product.name,
      userName: user.name,
    }),
  );
  const queryClient = useQueryClient();
  const onRetry = () =>
    queryClient.invalidateQueries({ queryKey: ['movements'] });

  const sorting = [{ id: 'date', desc: true }];

  if (isPending) {
    return (
      <div className="mt-64 flex w-full flex-1 items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <ErrorElement message={error?.message} onRetry={onRetry} />;
  }

  if (movements) {
    return (
      <DataTable
        columns={columns}
        data={movements}
        sorting={sorting}
        search
        pagination
      />
    );
  }
}
