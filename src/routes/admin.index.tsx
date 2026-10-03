import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AdminLayout } from '@/layouts/AdminLayout';
import { AdminOverview } from '@/pages/admin/AdminOverview';

export const Route = createFileRoute('/admin/')({
  ssr: false,
  head: () => ({ meta: [{ title: 'Admin · Overview — AK Team' }, { name: 'robots', content: 'noindex' }] }),
  component: () => (
    <ProtectedRoute anyPermission={['admin_panel.access']}>
      <AdminLayout>
        <AdminOverview />
      </AdminLayout>
    </ProtectedRoute>
  ),
});
