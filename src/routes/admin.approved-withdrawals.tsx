import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AdminLayout } from '@/layouts/AdminLayout';
import { AdminApprovedWithdrawals } from '@/pages/admin/AdminApprovedWithdrawals';

export const Route = createFileRoute('/admin/approved-withdrawals')({
  ssr: false,
  head: () => ({ meta: [{ title: 'Admin · Approved Withdrawals — AK Team' }, { name: 'robots', content: 'noindex' }] }),
  component: () => (
    <ProtectedRoute anyPermission={['admin_panel.access']}>
      <AdminLayout>
        <AdminApprovedWithdrawals />
      </AdminLayout>
    </ProtectedRoute>
  ),
});
