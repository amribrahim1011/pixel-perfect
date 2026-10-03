import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { DashboardReviews } from '@/pages/dashboard/DashboardReviews';

export const Route = createFileRoute('/dashboard/reviews')({
  ssr: false,
  head: () => ({ meta: [{ title: 'Dashboard · Reviews — AK Team' }, { name: 'robots', content: 'noindex' }] }),
  component: () => (
    <ProtectedRoute anyPermission={['dashboard.access']}>
      <DashboardLayout>
        <DashboardReviews />
      </DashboardLayout>
    </ProtectedRoute>
  ),
});
