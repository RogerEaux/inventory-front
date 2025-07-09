import { PieChart, Pie, Cell } from 'recharts';
import { donutColours } from './donutColours';
import DonutLegend from './DonutLegend';

interface Props {
  data: { name: string; value: number }[];
}

export default function DonutChart({ data }: Props) {
  return (
    <div className="flex h-[15rem] w-full items-center justify-center gap-48 max-sm:h-full max-sm:flex-col">
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
      <DonutLegend data={data} />
    </div>
  );
}
