import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AdminLayout } from '@/layouts/AdminLayout';
import { AdminDeals } from '@/pages/admin/AdminDeals';

export const Route = createFileRoute('/admin/deals')({
  ssr: false,
  head: () => ({ meta: [{ title: 'Admin · Deals — AK Team' }, { name: 'robots', content: 'noindex' }] }),
  component: () => (
    <ProtectedRoute anyPermission={['admin_panel.access']}>
      <AdminLayout>
        <AdminDeals />
      </AdminLayout>
    </ProtectedRoute>
  ),
});
