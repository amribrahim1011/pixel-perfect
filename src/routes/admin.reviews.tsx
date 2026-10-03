import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AdminLayout } from '@/layouts/AdminLayout';
import { AdminReviews } from '@/pages/admin/AdminReviews';

export const Route = createFileRoute('/admin/reviews')({
  ssr: false,
  head: () => ({ meta: [{ title: 'Admin · Reviews — AK Team' }, { name: 'robots', content: 'noindex' }] }),
  component: () => (
    <ProtectedRoute anyPermission={['admin_panel.access']}>
      <AdminLayout>
        <AdminReviews />
      </AdminLayout>
    </ProtectedRoute>
  ),
});
