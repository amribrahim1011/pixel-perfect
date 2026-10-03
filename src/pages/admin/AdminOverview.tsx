import { PageHeader, Card } from '@/components/ak-ui';
import { ShoppingBag, Users, DollarSign, Loader, ShieldCheck, Flame } from 'lucide-react';

const stats = [
  { label: 'Total Orders', value: '0', icon: <ShoppingBag size={20} />, accent: 'text-gold-400' },
  { label: 'Active Orders', value: '0', icon: <Loader size={20} />, accent: 'text-gold-400' },
  { label: 'Total Users', value: '0', icon: <Users size={20} />, accent: 'text-ink-200' },
  { label: 'Active Boosters', value: '0', icon: <ShieldCheck size={20} />, accent: 'text-ink-200' },
  { label: 'Revenue', value: '$0', icon: <DollarSign size={20} />, accent: 'text-success-400' },
  { label: 'Active Deals', value: '0', icon: <Flame size={20} />, accent: 'text-danger-400' },
];

export function AdminOverview() {
  return (
    <div className="space-y-6">
      <PageHeader title="Admin Panel" subtitle="Platform overview and key metrics." />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
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
    </div>
  );
}
