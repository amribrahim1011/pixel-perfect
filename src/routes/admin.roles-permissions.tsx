import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AdminLayout } from '@/layouts/AdminLayout';
import { AdminRolesPermissions } from '@/pages/admin/AdminRolesPermissions';

export const Route = createFileRoute('/admin/roles-permissions')({
  ssr: false,
  head: () => ({ meta: [{ title: 'Admin · Roles Permissions — AK Team' }, { name: 'robots', content: 'noindex' }] }),
  component: () => (
    <ProtectedRoute anyPermission={['roles.view']}>
      <AdminLayout>
        <AdminRolesPermissions />
      </AdminLayout>
    </ProtectedRoute>
  ),
});
