import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { DashboardMessages } from '@/pages/dashboard/DashboardMessages';

export const Route = createFileRoute('/dashboard/messages')({
  ssr: false,
  head: () => ({ meta: [{ title: 'Dashboard · Messages — AK Team' }, { name: 'robots', content: 'noindex' }] }),
  component: () => (
    <ProtectedRoute anyPermission={['dashboard.access']}>
      <DashboardLayout>
        <DashboardMessages />
      </DashboardLayout>
    </ProtectedRoute>
  ),
});
