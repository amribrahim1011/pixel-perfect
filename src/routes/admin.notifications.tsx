import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AdminLayout } from '@/layouts/AdminLayout';
import { AdminNotifications } from '@/pages/admin/AdminNotifications';

export const Route = createFileRoute('/admin/notifications')({
  ssr: false,
  head: () => ({ meta: [{ title: 'Admin · Notifications — AK Team' }, { name: 'robots', content: 'noindex' }] }),
  component: () => (
    <ProtectedRoute anyPermission={['admin_panel.access']}>
      <AdminLayout>
        <AdminNotifications />
      </AdminLayout>
    </ProtectedRoute>
  ),
});
