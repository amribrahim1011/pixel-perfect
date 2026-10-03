import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AdminLayout } from '@/layouts/AdminLayout';
import { AdminCoupons } from '@/pages/admin/AdminCoupons';

export const Route = createFileRoute('/admin/coupons')({
  ssr: false,
  head: () => ({ meta: [{ title: 'Admin · Coupons — AK Team' }, { name: 'robots', content: 'noindex' }] }),
  component: () => (
    <ProtectedRoute anyPermission={['admin_panel.access']}>
      <AdminLayout>
        <AdminCoupons />
      </AdminLayout>
    </ProtectedRoute>
  ),
});
