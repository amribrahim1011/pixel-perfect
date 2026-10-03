import { PageHeader, Card, EmptyState } from '@/components/ak-ui';
import { ShoppingBag, DollarSign, Loader, TrendingUp } from 'lucide-react';

const stats = [
  { label: 'Active Orders', value: '0', icon: <Loader size={20} />, accent: 'text-gold-400' },
  { label: 'Completed Orders', value: '0', icon: <ShoppingBag size={20} />, accent: 'text-ink-200' },
  { label: 'Total Earnings', value: '$0', icon: <DollarSign size={20} />, accent: 'text-success-400' },
  { label: 'Avg Rating', value: '—', icon: <TrendingUp size={20} />, accent: 'text-ink-200' },
];

export function BoosterOverview() {
  return (
    <div className="space-y-6">
      <PageHeader title="Booster Dashboard" subtitle="Manage your boosting activity and earnings." />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-5 space-y-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-base-800 ${s.accent}`}>
              {s.icon}
            </div>
            <div>
              <p className="font-display text-2xl text-ink-50">{s.value}</p>
              <p className="text-sm text-ink-400">{s.label}</p>
            </div>
          </Card>
        ))}
      </div>
      <Card>
        <EmptyState title="No Available Orders" description="When orders matching your specialization become available, they will appear here." />
      </Card>
    </div>
  );
}
