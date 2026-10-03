import { createFileRoute } from '@tanstack/react-router';
import { PublicLayout } from '@/layouts/PublicLayout';
import { GamesPage } from '@/pages/public/GamesPage';

export const Route = createFileRoute('/games/')({
  head: () => ({
    meta: [
      { title: 'Games — AK Team' },
      { name: 'description', content: 'Browse every game AK Team boosts.' },
      { property: 'og:title', content: 'Games — AK Team' },
      { property: 'og:description', content: 'Browse every game AK Team boosts.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: () => (
    <PublicLayout>
      <GamesPage />
    </PublicLayout>
  ),
});
