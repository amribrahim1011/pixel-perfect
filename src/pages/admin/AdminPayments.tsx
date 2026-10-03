import { PlaceholderPage } from '@/components/shared/PlaceholderPage';
export function AdminPayments() {
  return <PlaceholderPage title="Payments" subtitle="Monitor and manage payment transactions." breadcrumbs={[{ label: 'Admin', to: '/admin' }, { label: 'Payments' }]} />;
}
