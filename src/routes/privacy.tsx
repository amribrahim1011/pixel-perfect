import { createFileRoute } from '@tanstack/react-router';
import { PublicLayout } from '@/layouts/PublicLayout';
import { PlaceholderPage } from '@/components/shared/PlaceholderPage';

export const Route = createFileRoute('/privacy')({
  head: () => ({
    meta: [
      { title: 'Privacy Policy — AK Team' },
      { name: 'description', content: 'How we handle your data.' },
      { property: 'og:title', content: 'Privacy Policy — AK Team' },
      { property: 'og:description', content: 'How we handle your data.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: () => (
    <PublicLayout>
      <PlaceholderPage title='Privacy Policy' subtitle='How we handle your data.' />
    </PublicLayout>
  ),
});
