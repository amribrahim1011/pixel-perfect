import { PlaceholderPage } from '@/components/shared/PlaceholderPage';

export function DashboardOrderHistory() {
  return <PlaceholderPage title="Order History" subtitle="Your completed and past orders." breadcrumbs={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Order History' }]} />;
}
