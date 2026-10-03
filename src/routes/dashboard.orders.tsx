import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { DashboardOrders } from '@/pages/dashboard/DashboardOrders';

export const Route = createFileRoute('/dashboard/orders')({
  ssr: false,
  head: () => ({ meta: [{ title: 'Dashboard · Orders — AK Team' }, { name: 'robots', content: 'noindex' }] }),
  component: () => (
    <ProtectedRoute anyPermission={['dashboard.access']}>
      <DashboardLayout>
        <DashboardOrders />
      </DashboardLayout>
    </ProtectedRoute>
  ),
});
