import { PlaceholderPage } from '@/components/shared/PlaceholderPage';

export function DashboardMessages() {
  return <PlaceholderPage title="Messages" subtitle="Chat with your boosters and support." breadcrumbs={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Messages' }]} />;
}
