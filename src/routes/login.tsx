import { createFileRoute } from '@tanstack/react-router';
import { PublicLayout } from '@/layouts/PublicLayout';
import { LoginPage } from '@/pages/auth/LoginPage';

export const Route = createFileRoute('/login')({
  head: () => ({
    meta: [
      { title: 'Sign In — AK Team' },
      { name: 'description', content: 'Sign in to your AK Team account.' },
      { property: 'og:title', content: 'Sign In — AK Team' },
      { property: 'og:description', content: 'Sign in to your AK Team account.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: () => (
    <PublicLayout>
      <LoginPage />
    </PublicLayout>
  ),
});
