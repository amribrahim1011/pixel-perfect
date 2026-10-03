import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { BoosterLayout } from '@/layouts/BoosterLayout';
import { BoosterWithdrawals } from '@/pages/booster/BoosterWithdrawals';

export const Route = createFileRoute('/booster/withdrawals')({
  ssr: false,
  head: () => ({ meta: [{ title: 'Booster · Withdrawals — AK Team' }, { name: 'robots', content: 'noindex' }] }),
  component: () => (
    <ProtectedRoute anyPermission={['booster_panel.access']}>
      <BoosterLayout>
        <BoosterWithdrawals />
      </BoosterLayout>
    </ProtectedRoute>
  ),
});
