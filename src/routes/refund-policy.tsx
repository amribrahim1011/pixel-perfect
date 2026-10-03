import { createFileRoute } from '@tanstack/react-router';
import { PublicLayout } from '@/layouts/PublicLayout';
import { PlaceholderPage } from '@/components/shared/PlaceholderPage';

export const Route = createFileRoute('/refund-policy')({
  head: () => ({
    meta: [
      { title: 'Refund Policy — AK Team' },
      { name: 'description', content: 'Our refund and cancellation policy.' },
      { property: 'og:title', content: 'Refund Policy — AK Team' },
      { property: 'og:description', content: 'Our refund and cancellation policy.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: () => (
    <PublicLayout>
      <PlaceholderPage title='Refund Policy' subtitle='Our refund and cancellation policy.' />
    </PublicLayout>
  ),
});
