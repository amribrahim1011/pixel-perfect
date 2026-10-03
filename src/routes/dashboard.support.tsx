import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { DashboardSupport } from '@/pages/dashboard/DashboardSupport';

export const Route = createFileRoute('/dashboard/support')({
  ssr: false,
  head: () => ({ meta: [{ title: 'Dashboard · Support — AK Team' }, { name: 'robots', content: 'noindex' }] }),
  component: () => (
    <ProtectedRoute anyPermission={['dashboard.access']}>
      <DashboardLayout>
        <DashboardSupport />
      </DashboardLayout>
    </ProtectedRoute>
  ),
});
