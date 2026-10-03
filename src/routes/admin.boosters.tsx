import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AdminLayout } from '@/layouts/AdminLayout';
import { AdminBoosters } from '@/pages/admin/AdminBoosters';

export const Route = createFileRoute('/admin/boosters')({
  ssr: false,
  head: () => ({ meta: [{ title: 'Admin · Boosters — AK Team' }, { name: 'robots', content: 'noindex' }] }),
  component: () => (
    <ProtectedRoute anyPermission={['admin_panel.access']}>
      <AdminLayout>
        <AdminBoosters />
      </AdminLayout>
    </ProtectedRoute>
  ),
});
