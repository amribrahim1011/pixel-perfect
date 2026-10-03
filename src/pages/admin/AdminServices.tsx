import { PlaceholderPage } from '@/components/shared/PlaceholderPage';
export function AdminServices() {
  return <PlaceholderPage title="Services" subtitle="Manage service listings and pricing." breadcrumbs={[{ label: 'Admin', to: '/admin' }, { label: 'Services' }]} />;
}
