import { PlaceholderPage } from '@/components/shared/PlaceholderPage';
export function AdminDeals() {
  return <PlaceholderPage title="Deals" subtitle="Create and manage promotional deals." breadcrumbs={[{ label: 'Admin', to: '/admin' }, { label: 'Deals' }]} />;
}
