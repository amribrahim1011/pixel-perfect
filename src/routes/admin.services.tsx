import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AdminLayout } from '@/layouts/AdminLayout';
import { AdminServices } from '@/pages/admin/AdminServices';

export const Route = createFileRoute('/admin/services')({
  ssr: false,
  head: () => ({ meta: [{ title: 'Admin · Services — AK Team' }, { name: 'robots', content: 'noindex' }] }),
  component: () => (
    <ProtectedRoute anyPermission={['admin_panel.access']}>
      <AdminLayout>
        <AdminServices />
      </AdminLayout>
    </ProtectedRoute>
  ),
});
