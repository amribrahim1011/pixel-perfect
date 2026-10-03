import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AdminLayout } from '@/layouts/AdminLayout';
import { AdminGames } from '@/pages/admin/AdminGames';

export const Route = createFileRoute('/admin/games')({
  ssr: false,
  head: () => ({ meta: [{ title: 'Admin · Games — AK Team' }, { name: 'robots', content: 'noindex' }] }),
  component: () => (
    <ProtectedRoute anyPermission={['admin_panel.access']}>
      <AdminLayout>
        <AdminGames />
      </AdminLayout>
    </ProtectedRoute>
  ),
});
