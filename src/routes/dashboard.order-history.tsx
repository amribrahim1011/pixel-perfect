import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { DashboardOrderHistory } from '@/pages/dashboard/DashboardOrderHistory';

export const Route = createFileRoute('/dashboard/order-history')({
  ssr: false,
  head: () => ({ meta: [{ title: 'Dashboard · Order History — AK Team' }, { name: 'robots', content: 'noindex' }] }),
  component: () => (
    <ProtectedRoute anyPermission={['dashboard.access']}>
      <DashboardLayout>
        <DashboardOrderHistory />
      </DashboardLayout>
    </ProtectedRoute>
  ),
});
