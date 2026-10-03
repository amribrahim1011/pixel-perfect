import { createFileRoute } from '@tanstack/react-router';
import { PublicLayout } from '@/layouts/PublicLayout';
import { BecomeBoosterPage } from '@/pages/public/BecomeBoosterPage';

export const Route = createFileRoute('/become-a-booster')({
  head: () => ({
    meta: [
      { title: 'Become a Booster — AK Team' },
      { name: 'description', content: 'Apply to join the AK Team booster roster.' },
      { property: 'og:title', content: 'Become a Booster — AK Team' },
      { property: 'og:description', content: 'Apply to join the AK Team booster roster.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: () => (
    <PublicLayout>
      <BecomeBoosterPage />
    </PublicLayout>
  ),
});
