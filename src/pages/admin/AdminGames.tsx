import { PlaceholderPage } from '@/components/shared/PlaceholderPage';
export function AdminGames() {
  return <PlaceholderPage title="Games" subtitle="Manage supported games on the platform." breadcrumbs={[{ label: 'Admin', to: '/admin' }, { label: 'Games' }]} />;
}
