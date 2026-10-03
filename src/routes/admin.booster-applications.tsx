import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AdminLayout } from '@/layouts/AdminLayout';
import { AdminBoosterApplications } from '@/pages/admin/AdminBoosterApplications';

export const Route = createFileRoute('/admin/booster-applications')({
  ssr: false,
  head: () => ({ meta: [{ title: 'Admin · Booster Applications — AK Team' }, { name: 'robots', content: 'noindex' }] }),
  component: () => (
    <ProtectedRoute anyPermission={['admin_panel.access']}>
      <AdminLayout>
        <AdminBoosterApplications />
      </AdminLayout>
    </ProtectedRoute>
  ),
});
