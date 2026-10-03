import { createFileRoute } from '@tanstack/react-router';
import { PublicLayout } from '@/layouts/PublicLayout';
import { DealsPage } from '@/pages/public/DealsPage';

export const Route = createFileRoute('/deals')({
  head: () => ({
    meta: [
      { title: 'Deals — AK Team' },
      { name: 'description', content: 'Limited-time boosting deals and bundles.' },
      { property: 'og:title', content: 'Deals — AK Team' },
      { property: 'og:description', content: 'Limited-time boosting deals and bundles.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: () => (
    <PublicLayout>
      <DealsPage />
    </PublicLayout>
  ),
});
