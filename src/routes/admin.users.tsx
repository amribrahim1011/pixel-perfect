import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AdminLayout } from '@/layouts/AdminLayout';
import { AdminUsers } from '@/pages/admin/AdminUsers';

export const Route = createFileRoute('/admin/users')({
  ssr: false,
  head: () => ({ meta: [{ title: 'Admin · Users — AK Team' }, { name: 'robots', content: 'noindex' }] }),
  component: () => (
    <ProtectedRoute anyPermission={['admin_panel.access']}>
      <AdminLayout>
        <AdminUsers />
      </AdminLayout>
    </ProtectedRoute>
  ),
});
