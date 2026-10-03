import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AdminLayout } from '@/layouts/AdminLayout';
import { AdminOrders } from '@/pages/admin/AdminOrders';

export const Route = createFileRoute('/admin/orders')({
  ssr: false,
  head: () => ({ meta: [{ title: 'Admin · Orders — AK Team' }, { name: 'robots', content: 'noindex' }] }),
  component: () => (
    <ProtectedRoute anyPermission={['admin_panel.access']}>
      <AdminLayout>
        <AdminOrders />
      </AdminLayout>
    </ProtectedRoute>
  ),
});
