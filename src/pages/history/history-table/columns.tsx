import MovementAction from '@/components/ui/MovementAction';
import type { ActionType } from '@/components/ui/MovementAction';
import { type ColumnDef } from '@tanstack/react-table';

interface Movement {
  date: string;
  action: ActionType;
  quantity: number;
  origin: string;
  userName: string;
  productName: string;
}

export const columns: ColumnDef<Movement>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ getValue }) => (getValue() as string).slice(0, 10),
  },
  {
    accessorKey: 'userName',
    header: 'User',
  },
  {
    accessorKey: 'productName',
    header: 'Product',
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ getValue }) => {
      const action = getValue<ActionType>();

      return <MovementAction action={action} />;
    },
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
  },
  {
    accessorKey: 'origin',
    header: 'From',
  },
];
