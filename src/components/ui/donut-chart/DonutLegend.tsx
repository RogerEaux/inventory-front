import { donutColours } from './donutColours';

interface Props {
  data: { name: string; value: number }[];
  columnNames?: { name: string; value: string };
}

export default function DonutLegend({
  data,
  columnNames = { name: 'Name', value: 'Value' },
}: Props) {
  return (
    <div className="w-full max-w-[30rem]">
      <div className="border-gray flex items-center justify-between border-b text-base font-medium">
        <div className="flex items-center gap-12 px-8 py-4">
          <div className="h-12 w-12 rounded-full" />
          <span>{columnNames.name}</span>
        </div>
        <span>{columnNames.value}</span>
      </div>
      <ul className="flex max-w-[30rem] flex-col gap-4">
        {data.map((entry, index) => (
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
              <span>{entry.name}</span>
            </div>
            <span>{entry.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
