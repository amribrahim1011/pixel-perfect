import { PlaceholderPage } from '@/components/shared/PlaceholderPage';

export function DashboardActiveOrders() {
  return <PlaceholderPage title="Active Orders" subtitle="Track your in-progress orders in real-time." breadcrumbs={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Active Orders' }]} />;
}
