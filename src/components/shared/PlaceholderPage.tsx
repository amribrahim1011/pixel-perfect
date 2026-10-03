import { PageHeader, EmptyState } from '@/components/ak-ui';
import { Construction } from 'lucide-react';
import { brand } from '@/lib/brand';

interface PlaceholderPageProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; to?: string }[];
}

export function PlaceholderPage({ title, subtitle, breadcrumbs }: PlaceholderPageProps) {
  return (
    <div className="container-ak py-8 lg:py-12">
      <PageHeader title={title} subtitle={subtitle} breadcrumbs={breadcrumbs} />
      <div className="mt-8">
        <EmptyState
          icon={<Construction size={28} />}
          title="Coming Soon"
          description={`This section of ${brand.name} is under construction. Full functionality will be available in a future update.`}
        />
      </div>
    </div>
  );
}
