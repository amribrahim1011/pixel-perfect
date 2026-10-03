import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AdminLayout } from '@/layouts/AdminLayout';
import { AdminCategories } from '@/pages/admin/AdminCategories';

export const Route = createFileRoute('/admin/categories')({
  ssr: false,
  head: () => ({ meta: [{ title: 'Admin · Categories — AK Team' }, { name: 'robots', content: 'noindex' }] }),
  component: () => (
    <ProtectedRoute anyPermission={['admin_panel.access']}>
      <AdminLayout>
        <AdminCategories />
      </AdminLayout>
    </ProtectedRoute>
  ),
});
