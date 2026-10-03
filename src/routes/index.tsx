import { createFileRoute } from '@tanstack/react-router';
import { PublicLayout } from '@/layouts/PublicLayout';
import { HomePage } from '@/pages/public/HomePage';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Premium World of Warcraft Services — AK Team' },
      { name: 'description', content: 'Premium WoW boosting delivered by trusted professionals.' },
      { property: 'og:title', content: 'Premium World of Warcraft Services — AK Team' },
      { property: 'og:description', content: 'Premium WoW boosting delivered by trusted professionals.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: () => (
    <PublicLayout>
      <HomePage />
    </PublicLayout>
  ),
});
