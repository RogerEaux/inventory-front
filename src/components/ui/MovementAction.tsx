import ArrowDownLeft from '@/assets/svg/arrow-down-left.svg?react';
import ArrowUpRight from '@/assets/svg/arrow-up-right.svg?react';

export type ActionType = 'INGRESO' | 'RETIRO' | 'CREACION';

interface Props {
  action: ActionType;
}

export default function MovementAction({ action }: Props) {
  return (
    <div className="flex gap-4">
      {action === 'CREACION' ? (
        <>
          <ArrowDownLeft className="text-[#0067A5]" />
          <span>New</span>
        </>
      ) : action === 'INGRESO' ? (
        <>
          <ArrowDownLeft className="text-stock-green" />
          <span>In</span>
        </>
      ) : action === 'RETIRO' ? (
        <>
          <ArrowUpRight className="text-stock-red" />
          <span>Out</span>
        </>
      ) : (
        action
      )}
    </div>
  );
}
