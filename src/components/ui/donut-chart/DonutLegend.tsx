import { donutColours } from './donutColours';
import { useFormContext } from 'react-hook-form';
import type { Entry } from './DonutChart';
import Input from '../input';

interface Props {
  entries: Entry[];
  columnNames?: { name: string; value: string };
  onChange: () => void;
}

export default function DonutLegend({
  entries,
  columnNames = { name: 'Name', value: 'Value' },
  onChange,
}: Props) {
  const { register } = useFormContext();

  return (
    <div className="w-full">
      <div className="border-gray flex items-center justify-between border-b text-base font-medium">
        <div className="flex items-center gap-12 px-8 py-4">
          <div className="h-12 w-12 rounded-full" />
          <span>{columnNames.name}</span>
        </div>
        <span>{columnNames.value}</span>
      </div>
      <ul className="flex flex-col gap-4">
        {entries.map((entry, index) => (
          <li
            key={`legend-${index}`}
            className="flex items-center justify-between text-base"
          >
            <div className="flex items-center gap-12 px-8 py-4">
              <div
                className="h-12 w-12 rounded-full"
                style={{
                  backgroundColor: donutColours[index % donutColours.length],
                }}
              />
              <label htmlFor={entry.name}>{entry.name}</label>
            </div>
            <Input
              variant="seamless"
              type="number"
              className="my-4"
              defaultValue={entry.value}
              id={entry.name}
              {...register(`updates.${entry.name}`, { valueAsNumber: true })}
              onChange={onChange}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
