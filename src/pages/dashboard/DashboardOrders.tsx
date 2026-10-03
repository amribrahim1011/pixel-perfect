import { PlaceholderPage } from '@/components/shared/PlaceholderPage';

export function DashboardOrders() {
  return <PlaceholderPage title="My Orders" subtitle="View and manage all your orders." breadcrumbs={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Orders' }]} />;
}
