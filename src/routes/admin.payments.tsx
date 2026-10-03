import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AdminLayout } from '@/layouts/AdminLayout';
import { AdminPayments } from '@/pages/admin/AdminPayments';

export const Route = createFileRoute('/admin/payments')({
  ssr: false,
  head: () => ({ meta: [{ title: 'Admin · Payments — AK Team' }, { name: 'robots', content: 'noindex' }] }),
  component: () => (
    <ProtectedRoute anyPermission={['admin_panel.access']}>
      <AdminLayout>
        <AdminPayments />
      </AdminLayout>
    </ProtectedRoute>
  ),
});
