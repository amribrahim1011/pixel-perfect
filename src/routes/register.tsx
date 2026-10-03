import { createFileRoute } from '@tanstack/react-router';
import { PublicLayout } from '@/layouts/PublicLayout';
import { RegisterPage } from '@/pages/auth/RegisterPage';

export const Route = createFileRoute('/register')({
  head: () => ({
    meta: [
      { title: 'Create Account — AK Team' },
      { name: 'description', content: 'Create your AK Team account.' },
      { property: 'og:title', content: 'Create Account — AK Team' },
      { property: 'og:description', content: 'Create your AK Team account.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: () => (
    <PublicLayout>
      <RegisterPage />
    </PublicLayout>
  ),
});
