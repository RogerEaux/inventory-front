import { userSchema, type User } from '@/schemas/table/userSchema';
import DataTable from '@/components/ui/data-table/DataTable';
import { usersData } from './usersData';
import { columns } from './columns';

export default function UsersTable() {
  const validatedData = usersData.filter(
    (user) => userSchema.safeParse(user).success,
  ) as User[];

  return <DataTable columns={columns} data={validatedData} search />;
}
