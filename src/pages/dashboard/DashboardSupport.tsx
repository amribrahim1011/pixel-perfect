import { PlaceholderPage } from '@/components/shared/PlaceholderPage';

export function DashboardSupport() {
  return <PlaceholderPage title="Support" subtitle="Get help with your orders and account." breadcrumbs={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Support' }]} />;
}
