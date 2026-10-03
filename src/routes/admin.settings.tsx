import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AdminLayout } from '@/layouts/AdminLayout';
import { AdminSettings } from '@/pages/admin/AdminSettings';

export const Route = createFileRoute('/admin/settings')({
  ssr: false,
  head: () => ({ meta: [{ title: 'Admin · Settings — AK Team' }, { name: 'robots', content: 'noindex' }] }),
  component: () => (
    <ProtectedRoute anyPermission={['admin_panel.access']}>
      <AdminLayout>
        <AdminSettings />
      </AdminLayout>
    </ProtectedRoute>
  ),
});
