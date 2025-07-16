import { PieChart, Pie, Cell } from 'recharts';
import { donutColours } from './donutColours';
import DonutValueForm from './DonutValueForm';

export interface Entry {
  name: string;
  value: number;
}

interface Props {
  data: Entry[];
  columnNames?: { name: string; value: string };
}

export default function DonutChart({ data, columnNames }: Props) {
  return (
    <div className="flex w-full items-center justify-center gap-48 max-md:flex-col max-sm:h-full">
      <div className="h-[15rem]">
        <PieChart width={150} height={150}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={75}
            dataKey="value"
            paddingAngle={2}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={donutColours[index % donutColours.length]}
              />
            ))}
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-2xl font-semibold"
            >
              {data.reduce((acc, curr) => acc + curr.value, 0)}
            </text>
          </Pie>
        </PieChart>
      </div>
      <DonutValueForm entries={data} columnNames={columnNames} />
    </div>
  );
}
