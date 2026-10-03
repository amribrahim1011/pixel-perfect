import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

export interface PageHeaderProps {
  title: string;
  subtitle?: string | undefined;
  actions?: ReactNode;
  breadcrumbs?: { label: string; to?: string }[] | undefined;
  className?: string;
}

export function PageHeader({ title, subtitle, actions, breadcrumbs, className }: PageHeaderProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-2 text-sm text-ink-400">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span className="text-base-600">/</span>}
              <span className={cn(i === breadcrumbs.length - 1 && 'text-gold-300')}>
                {crumb.label}
              </span>
            </span>
          ))}
        </nav>
      )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="font-display text-2xl font-bold text-ink-50 sm:text-3xl">{title}</h1>
          {subtitle && <p className="text-ink-400 text-sm sm:text-base max-w-2xl">{subtitle}</p>}
        </div>
        {actions && <div className="flex shrink-0 items-center gap-3">{actions}</div>}
      </div>
    </div>
  );
}
