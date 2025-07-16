type StockBarProps = {
  current: number;
  min: number;
};

export default function StockBar({ current, min }: StockBarProps) {
  const max = min * 4;
  const percentage = Math.min((current / max) * 100, 100);
  const minPercent = (min / max) * 100;
  const stockIndicator =
    current <= min
      ? 'bg-stock-red'
      : current <= min * 2
        ? 'bg-stock-yellow'
        : 'bg-stock-green';

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="bg-gray/33 relative h-8 rounded-full">
        <div
          data-testid="stock-indicator"
          className={`animate-fill-bar absolute top-0 left-0 h-full origin-left transition-all delay-500 duration-1000 ease-in-out ${stockIndicator} ${percentage !== 100 ? 'rounded-l-full' : 'rounded-full'}`}
          style={{ width: `${percentage}%` }}
        />
        <div
          className="absolute h-8 w-4 bg-black"
          style={{ left: `${minPercent}%` }}
        >
          <span className="text-gray absolute -top-20 right-1/2 translate-x-1/2 text-sm">
            Min
          </span>
        </div>
      </div>
      <p className="text-gray text-base">Minimum stock: {min}</p>
    </div>
  );
}
