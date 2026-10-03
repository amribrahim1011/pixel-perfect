import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { BoosterLayout } from '@/layouts/BoosterLayout';
import { BoosterOverview } from '@/pages/booster/BoosterOverview';

export const Route = createFileRoute('/booster/')({
  ssr: false,
  head: () => ({ meta: [{ title: 'Booster · Overview — AK Team' }, { name: 'robots', content: 'noindex' }] }),
  component: () => (
    <ProtectedRoute anyPermission={['booster_panel.access']}>
      <BoosterLayout>
        <BoosterOverview />
      </BoosterLayout>
    </ProtectedRoute>
  ),
});
