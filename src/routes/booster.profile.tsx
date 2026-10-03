import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { BoosterLayout } from '@/layouts/BoosterLayout';
import { BoosterProfile } from '@/pages/booster/BoosterProfile';

export const Route = createFileRoute('/booster/profile')({
  ssr: false,
  head: () => ({ meta: [{ title: 'Booster · Profile — AK Team' }, { name: 'robots', content: 'noindex' }] }),
  component: () => (
    <ProtectedRoute anyPermission={['booster_panel.access']}>
      <BoosterLayout>
        <BoosterProfile />
      </BoosterLayout>
    </ProtectedRoute>
  ),
});
