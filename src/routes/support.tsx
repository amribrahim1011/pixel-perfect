import { createFileRoute } from '@tanstack/react-router';
import { PublicLayout } from '@/layouts/PublicLayout';
import { SupportPage } from '@/pages/public/SupportPage';

export const Route = createFileRoute('/support')({
  head: () => ({
    meta: [
      { title: 'Support — AK Team' },
      { name: 'description', content: 'Get help with your AK Team order.' },
      { property: 'og:title', content: 'Support — AK Team' },
      { property: 'og:description', content: 'Get help with your AK Team order.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: () => (
    <PublicLayout>
      <SupportPage />
    </PublicLayout>
  ),
});
