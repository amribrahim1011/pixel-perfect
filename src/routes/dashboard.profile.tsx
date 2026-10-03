import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { DashboardProfile } from '@/pages/dashboard/DashboardProfile';

export const Route = createFileRoute('/dashboard/profile')({
  ssr: false,
  head: () => ({ meta: [{ title: 'Dashboard · Profile — AK Team' }, { name: 'robots', content: 'noindex' }] }),
  component: () => (
    <ProtectedRoute anyPermission={['dashboard.access']}>
      <DashboardLayout>
        <DashboardProfile />
      </DashboardLayout>
    </ProtectedRoute>
  ),
});
