import { Card } from '@/components/ui/card';

type PriceChartProps = {
  prices?: number[];
};

const BINS = [
  { label: '0-50', from: 0, to: 50 },
  { label: '50-100', from: 50, to: 100 },
  { label: '100-150', from: 100, to: 150 },
  { label: '150-200', from: 150, to: 200 },
  { label: '200+', from: 200, to: Infinity },
];

export default function PriceChart({ prices = [] }: PriceChartProps) {
  const counts = BINS.map(({ from, to }) => prices.filter((p) => p >= from && p < to).length);
  const max = Math.max(1, ...counts);

  return (
    <section id="price-chart" className="w-full">
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-2">Price Distribution</h2>
        <div className="grid gap-2">
          {BINS.map((bin, idx) => {
            const value = counts[idx];
            const width = `${Math.round((value / max) * 100)}%`;
            return (
              <div key={bin.label} className="flex items-center gap-3" aria-label={`${bin.label}: ${value}`}>
                <div className="w-24 text-sm text-gray-600">{bin.label}</div>
                <div className="flex-1 h-4 bg-gray-100 rounded">
                  <div className="h-4 bg-blue-500 rounded" style={{ width }} />
                </div>
                <div className="w-10 text-right text-sm tabular-nums">{value}</div>
              </div>
            );
          })}
        </div>
        {prices.length === 0 && (
          <p className="text-sm text-gray-500 mt-3">No data yet.</p>
        )}
      </Card>
    </section>
  );
} 