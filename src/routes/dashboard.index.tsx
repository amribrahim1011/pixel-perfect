import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { DashboardOverview } from '@/pages/dashboard/DashboardOverview';

export const Route = createFileRoute('/dashboard/')({
  ssr: false,
  head: () => ({ meta: [{ title: 'Dashboard · Overview — AK Team' }, { name: 'robots', content: 'noindex' }] }),
  component: () => (
    <ProtectedRoute anyPermission={['dashboard.access']}>
      <DashboardLayout>
        <DashboardOverview />
      </DashboardLayout>
    </ProtectedRoute>
  ),
});
