import { type User } from '@/schemas/table/userSchema';
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
    accessorKey: 'actions',
    header: 'Actions',
    cell: () => {
      return <UserActions />;
    },
  },
];
