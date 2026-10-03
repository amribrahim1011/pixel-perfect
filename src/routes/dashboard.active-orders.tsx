import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { DashboardActiveOrders } from '@/pages/dashboard/DashboardActiveOrders';

export const Route = createFileRoute('/dashboard/active-orders')({
  ssr: false,
  head: () => ({ meta: [{ title: 'Dashboard · Active Orders — AK Team' }, { name: 'robots', content: 'noindex' }] }),
  component: () => (
    <ProtectedRoute anyPermission={['dashboard.access']}>
      <DashboardLayout>
        <DashboardActiveOrders />
      </DashboardLayout>
    </ProtectedRoute>
  ),
});
