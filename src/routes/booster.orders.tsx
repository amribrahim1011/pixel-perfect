import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { BoosterLayout } from '@/layouts/BoosterLayout';
import { BoosterOrders } from '@/pages/booster/BoosterOrders';

export const Route = createFileRoute('/booster/orders')({
  ssr: false,
  head: () => ({ meta: [{ title: 'Booster · Orders — AK Team' }, { name: 'robots', content: 'noindex' }] }),
  component: () => (
    <ProtectedRoute anyPermission={['booster_panel.access']}>
      <BoosterLayout>
        <BoosterOrders />
      </BoosterLayout>
    </ProtectedRoute>
  ),
});
