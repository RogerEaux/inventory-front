import DataTable from '@/components/ui/data-table/DataTable';
import { columns } from './columns';
import { useGetAllUsersQuery } from '@/hooks/services/useGetAllUsersQuery';
import Loading from '@/components/ui/Loading';
import ErrorElement from '@/components/ui/ErrorElement';
import { useQueryClient } from '@tanstack/react-query';

export default function UsersTable() {
  const { data, isPending, error } = useGetAllUsersQuery();
  const users = data?.getAllUsers.map((user) => ({
    ...user,
    roles: user.roles.map((role) => role.role),
    department: user.roles[0].department,
  }));
  const queryClient = useQueryClient();

  const onRetry = () => queryClient.invalidateQueries({ queryKey: ['users'] });

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

  if (users) {
    return <DataTable columns={columns} data={users} search />;
  }
}
