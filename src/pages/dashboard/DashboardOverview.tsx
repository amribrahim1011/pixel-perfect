import { PageHeader, Card, EmptyState } from '@/components/ak-ui';
import { ShoppingBag, Loader, Star, MessageSquare } from 'lucide-react';

const stats = [
  { label: 'Active Orders', value: '0', icon: <Loader size={20} />, accent: 'text-gold-400' },
  { label: 'Total Orders', value: '0', icon: <ShoppingBag size={20} />, accent: 'text-ink-200' },
  { label: 'Reviews Given', value: '0', icon: <Star size={20} />, accent: 'text-ink-200' },
  { label: 'Unread Messages', value: '0', icon: <MessageSquare size={20} />, accent: 'text-ink-200' },
];

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" subtitle="Welcome back. Here is an overview of your account." />
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
        <EmptyState title="No Active Orders" description="When you place an order, it will appear here for tracking." />
      </Card>
    </div>
  );
}
