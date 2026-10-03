import { PlaceholderPage } from '@/components/shared/PlaceholderPage';
export function AdminSettings() {
  return <PlaceholderPage title="Settings" subtitle="Configure platform-wide settings." breadcrumbs={[{ label: 'Admin', to: '/admin' }, { label: 'Settings' }]} />;
}
