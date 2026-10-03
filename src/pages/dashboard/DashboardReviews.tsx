import { PlaceholderPage } from '@/components/shared/PlaceholderPage';

export function DashboardReviews() {
  return <PlaceholderPage title="My Reviews" subtitle="Manage reviews you have submitted." breadcrumbs={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Reviews' }]} />;
}
