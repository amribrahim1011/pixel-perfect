import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AdminLayout } from '@/layouts/AdminLayout';
import { AdminSupport } from '@/pages/admin/AdminSupport';

export const Route = createFileRoute('/admin/support')({
  ssr: false,
  head: () => ({ meta: [{ title: 'Admin · Support — AK Team' }, { name: 'robots', content: 'noindex' }] }),
  component: () => (
    <ProtectedRoute anyPermission={['admin_panel.access']}>
      <AdminLayout>
        <AdminSupport />
      </AdminLayout>
    </ProtectedRoute>
  ),
});
