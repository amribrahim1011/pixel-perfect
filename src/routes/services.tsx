import { createFileRoute } from '@tanstack/react-router';
import { PublicLayout } from '@/layouts/PublicLayout';
import { ServicesPage } from '@/pages/public/ServicesPage';

export const Route = createFileRoute('/services')({
  head: () => ({
    meta: [
      { title: 'Services — AK Team' },
      { name: 'description', content: 'All boosting services from AK Team.' },
      { property: 'og:title', content: 'Services — AK Team' },
      { property: 'og:description', content: 'All boosting services from AK Team.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: () => (
    <PublicLayout>
      <ServicesPage />
    </PublicLayout>
  ),
});
