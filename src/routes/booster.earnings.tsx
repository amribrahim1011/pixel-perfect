import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { BoosterLayout } from '@/layouts/BoosterLayout';
import { BoosterEarnings } from '@/pages/booster/BoosterEarnings';

export const Route = createFileRoute('/booster/earnings')({
  ssr: false,
  head: () => ({ meta: [{ title: 'Booster · Earnings — AK Team' }, { name: 'robots', content: 'noindex' }] }),
  component: () => (
    <ProtectedRoute anyPermission={['booster_panel.access']}>
      <BoosterLayout>
        <BoosterEarnings />
      </BoosterLayout>
    </ProtectedRoute>
  ),
});
