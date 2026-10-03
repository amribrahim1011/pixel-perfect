import { PlaceholderPage } from '@/components/shared/PlaceholderPage';

export function BoosterOrders() {
  return <PlaceholderPage title="Available Orders" subtitle="Browse and claim orders that match your skills." breadcrumbs={[{ label: 'Booster', to: '/booster' }, { label: 'Orders' }]} />;
}
