import { PlaceholderPage } from '@/components/shared/PlaceholderPage';
export function AdminCategories() {
  return <PlaceholderPage title="Categories" subtitle="Organize services into categories." breadcrumbs={[{ label: 'Admin', to: '/admin' }, { label: 'Categories' }]} />;
}
