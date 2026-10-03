import { createFileRoute } from '@tanstack/react-router';
import { PublicLayout } from '@/layouts/PublicLayout';
import { HowItWorksPage } from '@/pages/public/HowItWorksPage';

export const Route = createFileRoute('/how-it-works')({
  head: () => ({
    meta: [
      { title: 'How It Works — AK Team' },
      { name: 'description', content: 'How ordering a boost with AK Team works.' },
      { property: 'og:title', content: 'How It Works — AK Team' },
      { property: 'og:description', content: 'How ordering a boost with AK Team works.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: () => (
    <PublicLayout>
      <HowItWorksPage />
    </PublicLayout>
  ),
});
