import { createFileRoute } from '@tanstack/react-router';
import { PublicLayout } from '@/layouts/PublicLayout';
import { PlaceholderPage } from '@/components/shared/PlaceholderPage';

export const Route = createFileRoute('/terms')({
  head: () => ({
    meta: [
      { title: 'Terms of Service — AK Team' },
      { name: 'description', content: 'Our terms and conditions.' },
      { property: 'og:title', content: 'Terms of Service — AK Team' },
      { property: 'og:description', content: 'Our terms and conditions.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: () => (
    <PublicLayout>
      <PlaceholderPage title='Terms of Service' subtitle='Our terms and conditions.' />
    </PublicLayout>
  ),
});
