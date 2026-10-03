import { PlaceholderPage } from '@/components/shared/PlaceholderPage';
export function AdminSupport() {
  return <PlaceholderPage title="Support" subtitle="Manage support tickets and inquiries." breadcrumbs={[{ label: 'Admin', to: '/admin' }, { label: 'Support' }]} />;
}
