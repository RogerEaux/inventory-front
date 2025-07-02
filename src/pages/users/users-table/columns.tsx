import { type User } from '@/schemas/form/userSchema';
import { type ColumnDef } from '@tanstack/react-table';
import UserActions from './UserActions';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'department',
    header: 'Department',
  },
  {
    accessorKey: 'roles',
    header: 'Roles',
    accessorFn: (row) => row.roles.join(', '),
    cell: ({ getValue }) => <p>{getValue() as string}</p>,
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const user = row.original;
      return <UserActions user={user} />;
    },
  },
];
