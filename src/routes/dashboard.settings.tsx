import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { DashboardSettings } from '@/pages/dashboard/DashboardSettings';

export const Route = createFileRoute('/dashboard/settings')({
  ssr: false,
  head: () => ({ meta: [{ title: 'Dashboard · Settings — AK Team' }, { name: 'robots', content: 'noindex' }] }),
  component: () => (
    <ProtectedRoute anyPermission={['dashboard.access']}>
      <DashboardLayout>
        <DashboardSettings />
      </DashboardLayout>
    </ProtectedRoute>
  ),
});
