import DonutChart from '@/components/ui/donut-chart/DonutChart';
import StockBar from '@/components/ui/StockBar';
import type { StockByUse } from '@/schemas/form/productSchema';

interface Props {
  stockByUse: StockByUse[];
  minimumStock: number;
}

export default function ProductStock({ stockByUse, minimumStock }: Props) {
  const stockData = stockByUse.map((sto) => ({
    name: sto.useType,
    value: sto.quantity,
  }));
  const stockQuantity = stockByUse.reduce(
    (acc, curr) => acc + curr.quantity,
    0,
  );

  return (
    <section className="mb-16 flex w-full max-w-4/5 flex-col px-24 py-16 max-sm:max-w-full">
      <h3 className="mb-12 text-lg font-semibold">Stock</h3>
      <div className="flex items-center gap-64 max-xl:flex-col">
        <DonutChart data={stockData} />
        <StockBar min={minimumStock} current={stockQuantity} />
      </div>
    </section>
  );
}
