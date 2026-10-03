import { createFileRoute } from '@tanstack/react-router';
import { PublicLayout } from '@/layouts/PublicLayout';
import { GameDetailPage } from '@/pages/public/GameDetailPage';

export const Route = createFileRoute('/games/$slug')({
  head: () => ({
    meta: [
      { title: 'Game Services — AK Team' },
      { name: 'description', content: 'Boosting services for this game.' },
      { property: 'og:title', content: 'Game Services — AK Team' },
      { property: 'og:description', content: 'Boosting services for this game.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: () => (
    <PublicLayout>
      <GameDetailPage />
    </PublicLayout>
  ),
});
