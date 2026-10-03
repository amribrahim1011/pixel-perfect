import { PlaceholderPage } from '@/components/shared/PlaceholderPage';
export function AdminOrders() {
  return <PlaceholderPage title="Orders" subtitle="Manage all platform orders." breadcrumbs={[{ label: 'Admin', to: '/admin' }, { label: 'Orders' }]} />;
}
